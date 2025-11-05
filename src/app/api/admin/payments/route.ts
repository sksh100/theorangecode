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
    
    // Fetch PaymentIntents
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    })
    console.log(`✅ Fetched ${paymentIntents.data.length} PaymentIntents from Stripe`)
    
    // Also fetch Charges (for Payment Links and direct charges)
    const charges = await stripe.charges.list({
      limit: 100,
    })
    console.log(`✅ Fetched ${charges.data.length} Charges from Stripe`)
    
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
      type: 'payment_intent' | 'charge'
    }> = []
    
    // Process PaymentIntents
    paymentIntents.data.forEach(p => {
      if (p.status === 'succeeded' && p.amount) {
        allPayments.push({
          id: p.id,
          amount: p.amount,
          currency: p.currency,
          status: p.status,
          customerEmail: p.receipt_email || (p.metadata as any)?.email || 'N/A',
          customerName: (p.metadata as any)?.customer_name || (p.metadata as any)?.name || 'N/A',
          createdAt: p.created,
          description: p.description || 'Payment',
          type: 'payment_intent',
        })
      }
    })
    
    // Process Charges (excluding those already covered by PaymentIntents)
    const paymentIntentIds = new Set(paymentIntents.data.map(p => p.id))
    charges.data.forEach(c => {
      if (c.status === 'succeeded' && c.paid && c.amount) {
        // Skip if this charge is already linked to a PaymentIntent we processed
        const linkedToPI = c.payment_intent && typeof c.payment_intent === 'string' && paymentIntentIds.has(c.payment_intent)
        if (!linkedToPI) {
          allPayments.push({
            id: c.id,
            amount: c.amount,
            currency: c.currency,
            status: c.status,
            customerEmail: c.billing_details?.email || c.receipt_email || 'N/A',
            customerName: c.billing_details?.name || 'N/A',
            createdAt: c.created,
            description: c.description || 'Payment',
            type: 'charge',
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

