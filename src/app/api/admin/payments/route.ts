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

    // Try Redis first
    try {
      if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        const [listRaw, totalRevenueRaw, countRaw] = await Promise.all([
          redis.lrange("payments:list", 0, 50),
          redis.get("payments:total_revenue"),
          redis.get("payments:count"),
        ]);

        // Parse payments safely
        const payments = (listRaw || []).map((p: string) => {
          try {
            return typeof p === 'string' ? JSON.parse(p) : p;
          } catch {
            return null;
          }
        }).filter(Boolean);

        // Parse revenue and count
        totalRevenue = typeof totalRevenueRaw === 'string' 
          ? parseFloat(totalRevenueRaw) || 0 
          : (totalRevenueRaw as number) || 0;
        
        count = typeof countRaw === 'string' 
          ? parseInt(countRaw, 10) || 0 
          : (countRaw as number) || 0;

        // Format payments
        formattedPayments = payments.map((p: any) => ({
          id: p.id,
          amount: p.amount,
          currency: p.currency,
          status: p.status || 'succeeded',
          customerEmail: p.email || 'unknown',
          customerName: p.email ? p.email.split('@')[0] : 'Customer',
          createdAt: new Date(p.time).toISOString(),
          description: `Payment - ${p.currency} ${p.amount}`,
          stripeChargeId: p.id,
        }));
      }
    } catch (redisError) {
      console.warn('⚠️ Redis fetch failed, falling back to Stripe API:', redisError);
    }

    // If Redis is empty or failed, fetch directly from Stripe
    if ((formattedPayments.length === 0 || !process.env.KV_REST_API_URL) && stripe) {
      console.log('📊 Fetching payments directly from Stripe API...');
      
      try {
        // Fetch checkout sessions (most reliable for payment links)
        const sessions = await stripe.checkout.sessions.list({
          limit: 100,
          expand: ['data.customer', 'data.payment_intent'],
        });

        // Fetch payment intents as fallback
        const paymentIntents = await stripe.paymentIntents.list({
          limit: 100,
        });

        // Combine and deduplicate
        const allPayments: any[] = [];
        const seenIds = new Set<string>();

        // Process checkout sessions
        sessions.data.forEach((session: any) => {
          if (session.payment_status === 'paid' && session.amount_total && !seenIds.has(session.id)) {
            seenIds.add(session.id);
            allPayments.push({
              id: session.id,
              amount: session.amount_total / 100,
              currency: (session.currency || 'aed').toUpperCase(),
              status: 'succeeded',
              customerEmail: session.customer_details?.email || session.customer_email || 'unknown',
              customerName: session.customer_details?.name || session.customer_details?.email?.split('@')[0] || 'Customer',
              createdAt: new Date(session.created * 1000).toISOString(),
              description: session.metadata?.productName || `Payment - ${session.currency} ${session.amount_total / 100}`,
              stripeChargeId: session.payment_intent?.id || session.id,
              metadata: session.metadata,
            });
          }
        });

        // Process payment intents
        paymentIntents.data.forEach((pi: any) => {
          if (pi.status === 'succeeded' && pi.amount && !seenIds.has(pi.id)) {
            seenIds.add(pi.id);
            allPayments.push({
              id: pi.id,
              amount: pi.amount / 100,
              currency: (pi.currency || 'aed').toUpperCase(),
              status: 'succeeded',
              customerEmail: pi.receipt_email || 'unknown',
              customerName: pi.receipt_email?.split('@')[0] || 'Customer',
              createdAt: new Date(pi.created * 1000).toISOString(),
              description: `Payment Intent - ${pi.currency} ${pi.amount / 100}`,
              stripeChargeId: pi.id,
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
