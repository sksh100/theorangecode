import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import MailerLite from '@mailerlite/mailerlite-nodejs'

export const dynamic = 'force-dynamic'

// Stripe will be initialized in the function

export async function GET(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      return NextResponse.json({
        success: true,
        data: {
          revenue: { total: 0, today: 0, monthly: 0, byDate: [] },
          subscribers: { total: 0, today: 0, monthly: 0 },
          payments: { total: 0, today: 0, monthly: 0 },
        },
      })
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-10-29.clover',
    })

    // Fetch ALL payments (same logic as payments API)
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
    
    const paymentIntentIds = new Set(allPaymentIntents.map(p => p.id))
    const successfulPayments = allPaymentIntents
      .filter(p => p.status === 'succeeded' && p.amount)
      .map(p => ({
        amount: p.amount,
        created: p.created,
      }))
    
    // Add charges not linked to payment intents
    allCharges.forEach(c => {
      if (c.status === 'succeeded' && c.paid && c.amount) {
        const linkedToPI = c.payment_intent && typeof c.payment_intent === 'string' && paymentIntentIds.has(c.payment_intent)
        if (!linkedToPI) {
          successfulPayments.push({
            amount: c.amount,
            created: c.created,
          })
        }
      }
    })
    
    // Fetch subscribers for analytics (same logic as subscribers API)
    let subscriberStats = {
      total: 0,
      today: 0,
      monthly: 0,
    }
    
    try {
      const apiKey = process.env.MAILERLITE_API_KEY
      if (apiKey) {
        const mailerlite = new MailerLite({
          api_key: apiKey,
        })
        
        const allSubscribers = await mailerlite.subscribers.get({
          limit: 10000,
        })
        
        const now = new Date()
        const today = new Date()
        
        // Handle MailerLite response - data might be an array or object
        let subscribersArray: any[] = []
        if (allSubscribers?.data) {
          if (Array.isArray(allSubscribers.data)) {
            subscribersArray = allSubscribers.data
          } else if (typeof allSubscribers.data === 'object' && (allSubscribers.data as any)?.data) {
            subscribersArray = Array.isArray((allSubscribers.data as any).data) 
              ? (allSubscribers.data as any).data 
              : []
          }
        }
        
        subscriberStats = {
          total: subscribersArray.length || 0,
          today: subscribersArray.filter((sub: any) => {
            if (!sub.created_at && !sub.subscribed_at) return false
            const date = new Date(sub.created_at || sub.subscribed_at)
            return date.toDateString() === today.toDateString()
          }).length || 0,
          monthly: subscribersArray.filter((sub: any) => {
            if (!sub.created_at && !sub.subscribed_at) return false
            const date = new Date(sub.created_at || sub.subscribed_at)
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
          }).length || 0,
        }
      }
    } catch (error) {
      console.error('Error fetching subscriber stats:', error)
    }
    
    // Calculate revenue by date (last 30 days)
    const revenueByDate: { [key: string]: number } = {}
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split('T')[0]
    })
    
    last30Days.forEach(date => {
      revenueByDate[date] = 0
    })
    
    successfulPayments.forEach(payment => {
      const date = new Date(payment.created * 1000).toISOString().split('T')[0]
      if (revenueByDate[date] !== undefined) {
        revenueByDate[date] += payment.amount / 100
      }
    })
    
    // Total revenue
    const totalRevenue = successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0) / 100
    
    // Today's revenue
    const today = new Date()
    const todayRevenue = successfulPayments
      .filter(p => {
        const date = new Date(p.created * 1000)
        return date.toDateString() === today.toDateString()
      })
      .reduce((sum, p) => sum + (p.amount || 0), 0) / 100
    
    // Monthly revenue
    const now = new Date()
    const monthlyRevenue = successfulPayments
      .filter(p => {
        const date = new Date(p.created * 1000)
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      })
      .reduce((sum, p) => sum + (p.amount || 0), 0) / 100
    
    // Total payments count
    const totalPayments = successfulPayments.length
    
    return NextResponse.json({
      success: true,
      data: {
        revenue: {
          total: totalRevenue,
          today: todayRevenue,
          monthly: monthlyRevenue,
          byDate: Object.entries(revenueByDate).map(([date, amount]) => ({
            date,
            amount,
          })).reverse(),
        },
        subscribers: subscriberStats,
        payments: {
          total: totalPayments,
          today: successfulPayments.filter(p => {
            const date = new Date(p.created * 1000)
            return date.toDateString() === today.toDateString()
          }).length,
          monthly: successfulPayments.filter(p => {
            const date = new Date(p.created * 1000)
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
          }).length,
        },
      },
    })
  } catch (error: any) {
    console.error('Error fetching analytics:', error)
    
    // Return empty analytics data instead of error
    return NextResponse.json({
      success: true,
      data: {
        revenue: {
          total: 0,
          today: 0,
          monthly: 0,
          byDate: [],
        },
        subscribers: {
          total: 0,
          today: 0,
          monthly: 0,
        },
        payments: {
          total: 0,
          today: 0,
          monthly: 0,
        },
      },
    })
  }
}

