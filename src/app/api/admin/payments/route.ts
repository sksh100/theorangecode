import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import Stripe from 'stripe';

export const dynamic = 'force-dynamic'

// Initialize Stripe
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-10-29.clover',
  });
}

export async function GET(_req: NextRequest) {
  try {
    const stripe = getStripe();
    let formattedPayments: any[] = [];
    let totalRevenue = 0;
    let count = 0;

    // Always fetch from Stripe API for accurate payment amounts
    // Redis cache may have stale/incorrect amounts, so we fetch fresh data from Stripe
    if (stripe) {
      console.log('📊 Fetching payments directly from Stripe API (always use Stripe for accurate amounts)...');
      
      try {
        // Fetch checkout sessions (most reliable for payment links)
        const sessions = await stripe.checkout.sessions.list({
          limit: 100,
          expand: ['data.customer', 'data.payment_intent'],
        });

        // Fetch payment intents with expanded charges to get actual amounts
        const paymentIntents = await stripe.paymentIntents.list({
          limit: 100,
          expand: ['data.latest_charge'],
        });

        // Fetch ALL charges (paginate to get all, not just 100)
        const allCharges: any[] = [];
        let hasMoreCharges = true;
        let lastChargeId: string | undefined = undefined;
        
        while (hasMoreCharges) {
          const chargesResult: Stripe.ApiList<Stripe.Charge> = await stripe.charges.list({
            limit: 100,
            ...(lastChargeId ? { starting_after: lastChargeId } : {}),
          });
          allCharges.push(...chargesResult.data);
          hasMoreCharges = chargesResult.has_more;
          if (chargesResult.data.length > 0) {
            lastChargeId = chargesResult.data[chargesResult.data.length - 1].id;
          } else {
            hasMoreCharges = false;
          }
        }

        // Create a map of payment intent ID to charge amount
        // Priority: Use latest_charge from payment intent if available, otherwise use charges list
        const chargeMap = new Map<string, { amount: number; currency: string; receipt_email?: string; chargeId?: string }>();
        
        // First, map charges from the charges list
        allCharges.forEach((charge: any) => {
          if (charge.payment_intent && typeof charge.payment_intent === 'string') {
            // Use the charge amount (actual amount charged, accounting for refunds)
            const chargeAmount = charge.amount - (charge.amount_refunded || 0);
            chargeMap.set(charge.payment_intent, {
              amount: chargeAmount,
              currency: charge.currency,
              receipt_email: charge.receipt_email,
              chargeId: charge.id,
            });
            
            // Log for debugging payment amount discrepancies
            if (chargeAmount !== charge.amount) {
              console.log(`⚠️ Charge ${charge.id} has refunds: original ${charge.amount / 100}, net ${chargeAmount / 100}`);
            }
          }
        });
        
        // Then, update with latest_charge from payment intents (most accurate)
        paymentIntents.data.forEach((pi: any) => {
          if (pi.latest_charge) {
            const chargeId = typeof pi.latest_charge === 'string' ? pi.latest_charge : pi.latest_charge.id;
            // Fetch the full charge object if we have it
            const charge = allCharges.find(c => c.id === chargeId);
            if (charge) {
              const chargeAmount = charge.amount - (charge.amount_refunded || 0);
              chargeMap.set(pi.id, {
                amount: chargeAmount,
                currency: charge.currency,
                receipt_email: charge.receipt_email,
                chargeId: charge.id,
              });
            } else if (typeof pi.latest_charge === 'object' && pi.latest_charge.amount) {
              // Use the expanded charge data directly
              const chargeAmount = pi.latest_charge.amount - (pi.latest_charge.amount_refunded || 0);
              chargeMap.set(pi.id, {
                amount: chargeAmount,
                currency: pi.latest_charge.currency,
                receipt_email: pi.latest_charge.receipt_email,
                chargeId: chargeId,
              });
            }
          }
        });
        
        console.log(`📊 Created charge map with ${chargeMap.size} charges from ${allCharges.length} total charges`);

        // Combine and deduplicate
        const allPayments: any[] = [];
        const seenIds = new Set<string>();

        // Process checkout sessions (most reliable - use session amount_total to match Stripe invoices)
        sessions.data.forEach((session: any) => {
          if (session.payment_status === 'paid' && session.amount_total && !seenIds.has(session.id)) {
            seenIds.add(session.id);
            const paymentIntentId = typeof session.payment_intent === 'string' 
              ? session.payment_intent 
              : session.payment_intent?.id;
            
            // Always use session.amount_total to match Stripe invoice amounts
            // This is what the customer actually paid and what Stripe invoices show
            const actualAmount = session.amount_total / 100;
            const actualCurrency = (session.currency || 'aed').toUpperCase();
            
            allPayments.push({
              id: session.id,
              amount: actualAmount,
              currency: actualCurrency,
              status: 'succeeded',
              customerEmail: session.customer_details?.email || session.customer_email || 'unknown',
              customerName: session.customer_details?.name || session.customer_details?.email?.split('@')[0] || 'Customer',
              createdAt: new Date(session.created * 1000).toISOString(),
              description: session.metadata?.productName || `Payment - ${actualCurrency} ${actualAmount}`,
              stripeChargeId: paymentIntentId || session.id,
              metadata: session.metadata,
            });
          }
        });

        // Process payment intents - use payment intent amount to match Stripe invoices
        paymentIntents.data.forEach((pi: any) => {
          if (pi.status === 'succeeded' && pi.amount && !seenIds.has(pi.id)) {
            seenIds.add(pi.id);
            
            // Always use payment intent amount to match Stripe invoice amounts
            // This is what was intended to be charged and what Stripe invoices show
            const actualAmount = pi.amount / 100;
            const actualCurrency = (pi.currency || 'aed').toUpperCase();
            
            // Get charge for receipt email if available
            const charge = chargeMap.get(pi.id);
            
            allPayments.push({
              id: pi.id,
              amount: actualAmount,
              currency: actualCurrency,
              status: 'succeeded',
              customerEmail: pi.receipt_email || charge?.receipt_email || 'unknown',
              customerName: (pi.receipt_email || charge?.receipt_email)?.split('@')[0] || 'Customer',
              createdAt: new Date(pi.created * 1000).toISOString(),
              description: `Payment Intent - ${actualCurrency} ${actualAmount}`,
              stripeChargeId: charge?.chargeId || pi.id,
            });
          }
        });

        // Sort by date (newest first)
        allPayments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        formattedPayments = allPayments.slice(0, 100); // Limit to 100 most recent
        totalRevenue = allPayments.reduce((sum, p) => sum + p.amount, 0);
        count = allPayments.length;

        console.log(`✅ Fetched ${formattedPayments.length} payments from Stripe API`);
      } catch (stripeError: any) {
        console.error('❌ Error fetching from Stripe:', stripeError.message);
      }
    }

    console.log('📊 Payments API response:', {
      paymentsCount: formattedPayments.length,
      totalRevenue,
      count,
      source: formattedPayments.length > 0 ? (process.env.KV_REST_API_URL ? 'Redis' : 'Stripe API') : 'None'
    });

    return NextResponse.json({
      success: true,
      payments: formattedPayments,
      stats: {
        totalRevenue,
        count,
      },
    });
  } catch (error: any) {
    console.error('Error fetching payments:', error);
    
    return NextResponse.json({
      success: true,
      payments: [],
      stats: {
        totalRevenue: 0,
        count: 0,
      },
    });
  }
}
