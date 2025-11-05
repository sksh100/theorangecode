import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-10-29.clover',
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')
    const startingAfter = searchParams.get('starting_after') || undefined
    
    // Fetch recent payments from Stripe
    const payments = await stripe.paymentIntents.list({
      limit,
      starting_after: startingAfter,
    })
    
    // Get payment statistics
    const allPayments = await stripe.paymentIntents.list({ limit: 100 })
    const successfulPayments = allPayments.data.filter(p => p.status === 'succeeded')
    
    const totalRevenue = successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0)
    const todayRevenue = successfulPayments
      .filter(p => {
        const date = new Date(p.created * 1000)
        const today = new Date()
        return date.toDateString() === today.toDateString()
      })
      .reduce((sum, p) => sum + (p.amount || 0), 0)
    
    const monthlyRevenue = successfulPayments
      .filter(p => {
        const date = new Date(p.created * 1000)
        const now = new Date()
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      })
      .reduce((sum, p) => sum + (p.amount || 0), 0)
    
    return NextResponse.json({
      success: true,
      data: {
        payments: payments.data.map(p => ({
          id: p.id,
          amount: p.amount / 100, // Convert from cents
          currency: p.currency.toUpperCase(),
          status: p.status,
          customerEmail: p.receipt_email || p.metadata?.email || 'N/A',
          customerName: p.metadata?.customer_name || p.metadata?.name || 'N/A',
          createdAt: new Date(p.created * 1000).toISOString(),
          description: p.description || 'Payment',
        })),
        stats: {
          totalRevenue: totalRevenue / 100,
          todayRevenue: todayRevenue / 100,
          monthlyRevenue: monthlyRevenue / 100,
          totalPayments: successfulPayments.length,
          todayPayments: successfulPayments.filter(p => {
            const date = new Date(p.created * 1000)
            const today = new Date()
            return date.toDateString() === today.toDateString()
          }).length,
        },
      },
    })
  } catch (error: any) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

