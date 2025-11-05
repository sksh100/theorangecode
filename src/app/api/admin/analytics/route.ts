import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import MailerLite from '@mailerlite/mailerlite-nodejs'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-10-29.clover',
})

export async function GET(request: NextRequest) {
  try {
    // Fetch payments for analytics
    const payments = await stripe.paymentIntents.list({ limit: 100 })
    const successfulPayments = payments.data.filter(p => p.status === 'succeeded')
    
    // Fetch subscribers for analytics
    let subscriberStats = {
      total: 0,
      today: 0,
      monthly: 0,
    }
    
    try {
      const mailerlite = new MailerLite({
        api_key: process.env.MAILERLITE_API_KEY || '',
      })
      
      const allSubscribers = await mailerlite.subscribers.get({
        filter: { status: 'active' },
        limit: 10000,
      })
      
      const now = new Date()
      const today = new Date()
      
      subscriberStats = {
        total: allSubscribers.data?.length || 0,
        today: allSubscribers.data?.filter((sub: any) => {
          const date = new Date(sub.created_at)
          return date.toDateString() === today.toDateString()
        }).length || 0,
        monthly: allSubscribers.data?.filter((sub: any) => {
          const date = new Date(sub.created_at)
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
        }).length || 0,
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
    
    // Calculate subscriber growth by date (last 30 days)
    const subscriberGrowthByDate: { [key: string]: number } = {}
    last30Days.forEach(date => {
      subscriberGrowthByDate[date] = 0
    })
    
    // Total revenue
    const totalRevenue = successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0) / 100
    
    // Today's revenue
    const todayRevenue = successfulPayments
      .filter(p => {
        const date = new Date(p.created * 1000)
        const today = new Date()
        return date.toDateString() === today.toDateString()
      })
      .reduce((sum, p) => sum + (p.amount || 0), 0) / 100
    
    // Monthly revenue
    const monthlyRevenue = successfulPayments
      .filter(p => {
        const date = new Date(p.created * 1000)
        const now = new Date()
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      })
      .reduce((sum, p) => sum + (p.amount || 0), 0) / 100
    
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
          total: successfulPayments.length,
          today: successfulPayments.filter(p => {
            const date = new Date(p.created * 1000)
            const today = new Date()
            return date.toDateString() === today.toDateString()
          }).length,
          monthly: successfulPayments.filter(p => {
            const date = new Date(p.created * 1000)
            const now = new Date()
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

