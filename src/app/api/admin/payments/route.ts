import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Check if Stripe is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      console.log('⚠️ Stripe not configured - STRIPE_SECRET_KEY missing')
      return NextResponse.json({
        success: true,
        data: {
          payments: [],
          stats: {
            totalRevenue: 0,
            todayRevenue: 0,
            monthlyRevenue: 0,
            totalPayments: 0,
            todayPayments: 0,
          },
        },
      })
    }

    // Initialize Stripe with the API key
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-10-29.clover',
    })
    
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')
    const startingAfter = searchParams.get('starting_after') || undefined
    
    console.log('📊 Fetching payments from Stripe...', { hasApiKey: !!stripeSecretKey, limit })
    
    // Fetch ALL PaymentIntents (paginate through all)
    const allPaymentIntents = []
    let hasMorePIs = true
    let lastPaymentIntentId: string | undefined = undefined
    
    while (hasMorePIs) {
      const paymentIntents = await stripe.paymentIntents.list({
        limit: 100,
        ...(lastPaymentIntentId ? { starting_after: lastPaymentIntentId } : {}),
      })
      allPaymentIntents.push(...paymentIntents.data)
      hasMorePIs = paymentIntents.has_more
      if (paymentIntents.data.length > 0) {
        lastPaymentIntentId = paymentIntents.data[paymentIntents.data.length - 1].id
      } else {
        hasMorePIs = false
      }
    }
    console.log(`✅ Fetched ${allPaymentIntents.length} PaymentIntents from Stripe`)
    
    // Fetch ALL Charges (paginate through all)
    const allCharges = []
    let hasMoreCharges = true
    let lastChargeId: string | undefined = undefined
    
    while (hasMoreCharges) {
      const charges = await stripe.charges.list({
        limit: 100,
        ...(lastChargeId ? { starting_after: lastChargeId } : {}),
      })
      allCharges.push(...charges.data)
      hasMoreCharges = charges.has_more
      if (charges.data.length > 0) {
        lastChargeId = charges.data[charges.data.length - 1].id
      } else {
        hasMoreCharges = false
      }
    }
    console.log(`✅ Fetched ${allCharges.length} Charges from Stripe`)
    
    // Also fetch Checkout Sessions (for Payment Links)
    const allCheckoutSessions = []
    let hasMoreSessions = true
    let lastSessionId: string | undefined = undefined
    
    while (hasMoreSessions) {
      const sessions = await stripe.checkout.sessions.list({
        limit: 100,
        ...(lastSessionId ? { starting_after: lastSessionId } : {}),
      })
      allCheckoutSessions.push(...sessions.data)
      hasMoreSessions = sessions.has_more
      if (sessions.data.length > 0) {
        lastSessionId = sessions.data[sessions.data.length - 1].id
      } else {
        hasMoreSessions = false
      }
    }
    console.log(`✅ Fetched ${allCheckoutSessions.length} Checkout Sessions from Stripe`)
    
    // Combine and process all payments
    const allPayments: Array<{
      id: string
      amount: number
      currency: string
      status: string
      customerEmail: string
      customerName: string
      createdAt: number
      description: string
      type: 'payment_intent' | 'charge' | 'checkout_session'
    }> = []
    
    // Process PaymentIntents
    allPaymentIntents.forEach(p => {
      if (p.status === 'succeeded' && p.amount) {
        allPayments.push({
          id: p.id,
          amount: p.amount,
          currency: p.currency,
          status: p.status,
          customerEmail: p.receipt_email || (p.metadata as any)?.email || 'N/A',
          customerName: (p.metadata as any)?.customer_name || (p.metadata as any)?.name || (p.metadata as any)?.customer_name || 'N/A',
          createdAt: p.created,
          description: p.description || 'Payment',
          type: 'payment_intent',
        })
      }
    })
    
    // Process Charges (excluding those already covered by PaymentIntents)
    const paymentIntentIds = new Set(allPaymentIntents.map(p => p.id))
    const processedChargeIds = new Set<string>()
    
    allCharges.forEach(c => {
      if (c.status === 'succeeded' && c.paid && c.amount) {
        // Skip if this charge is already linked to a PaymentIntent we processed
        const linkedToPI = c.payment_intent && typeof c.payment_intent === 'string' && paymentIntentIds.has(c.payment_intent)
        if (!linkedToPI && !processedChargeIds.has(c.id)) {
          processedChargeIds.add(c.id)
          allPayments.push({
            id: c.id,
            amount: c.amount,
            currency: c.currency,
            status: c.status,
            customerEmail: c.billing_details?.email || c.receipt_email || (c.metadata as any)?.email || 'N/A',
            customerName: c.billing_details?.name || (c.metadata as any)?.customer_name || (c.metadata as any)?.name || 'N/A',
            createdAt: c.created,
            description: c.description || (c.metadata as any)?.description || 'Payment',
            type: 'charge',
          })
        }
      }
    })
    
    // Process Checkout Sessions (for Payment Links)
    allCheckoutSessions.forEach(s => {
      if (s.payment_status === 'paid' && s.amount_total) {
        // Get customer email from customer_details or metadata
        const customerEmail = s.customer_details?.email || s.customer_email || (s.metadata as any)?.email || 'N/A'
        const customerName = s.customer_details?.name || (s.metadata as any)?.customer_name || (s.metadata as any)?.name || 'N/A'
        
        // Only add if we haven't already processed this payment via charge or payment intent
        const sessionId = s.id
        const alreadyProcessed = allPayments.some(p => 
          (p.customerEmail === customerEmail && Math.abs(p.createdAt - s.created) < 60) ||
          (s.payment_intent && typeof s.payment_intent === 'string' && paymentIntentIds.has(s.payment_intent))
        )
        
        if (!alreadyProcessed && !processedChargeIds.has(sessionId)) {
          allPayments.push({
            id: sessionId,
            amount: s.amount_total,
            currency: s.currency || 'aed',
            status: s.payment_status,
            customerEmail,
            customerName,
            createdAt: s.created,
            description: s.metadata?.description || s.description || 'Payment Link',
            type: 'checkout_session',
          })
        }
      }
    })
    
    // Sort by creation date (newest first)
    allPayments.sort((a, b) => b.createdAt - a.createdAt)
    
    console.log(`✅ Total processed payments: ${allPayments.length}`)
    
    // Calculate statistics
    const successfulPayments = allPayments
    const totalRevenue = successfulPayments.reduce((sum, p) => sum + p.amount, 0)
    const todayRevenue = successfulPayments
      .filter(p => {
        const date = new Date(p.createdAt * 1000)
        const today = new Date()
        return date.toDateString() === today.toDateString()
      })
      .reduce((sum, p) => sum + p.amount, 0)
    
    const monthlyRevenue = successfulPayments
      .filter(p => {
        const date = new Date(p.createdAt * 1000)
        const now = new Date()
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      })
      .reduce((sum, p) => sum + p.amount, 0)
    
    return NextResponse.json({
      success: true,
      data: {
        payments: allPayments.slice(0, limit).map(p => ({
          id: p.id,
          amount: p.amount / 100, // Convert from cents to currency units
          currency: p.currency.toUpperCase(),
          status: p.status,
          customerEmail: p.customerEmail,
          customerName: p.customerName,
          createdAt: new Date(p.createdAt * 1000).toISOString(),
          description: p.description,
          type: p.type,
        })),
        stats: {
          totalRevenue: totalRevenue / 100,
          todayRevenue: todayRevenue / 100,
          monthlyRevenue: monthlyRevenue / 100,
          totalPayments: successfulPayments.length,
          todayPayments: successfulPayments.filter(p => {
            const date = new Date(p.createdAt * 1000)
            const today = new Date()
            return date.toDateString() === today.toDateString()
          }).length,
        },
      },
    })
  } catch (error: any) {
    console.error('❌ Error fetching payments:', error)
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      hasApiKey: !!process.env.STRIPE_SECRET_KEY,
    })
    
    // Return empty data instead of error to prevent dashboard from breaking
    return NextResponse.json({
      success: true,
      data: {
        payments: [],
        stats: {
          totalRevenue: 0,
          todayRevenue: 0,
          monthlyRevenue: 0,
          totalPayments: 0,
          todayPayments: 0,
        },
      },
    })
  }
}

