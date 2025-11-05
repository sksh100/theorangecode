import { NextRequest, NextResponse } from 'next/server'
import MailerLite from '@mailerlite/mailerlite-nodejs'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.MAILERLITE_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'MailerLite not configured' },
        { status: 500 }
      )
    }
    
    const mailerlite = new MailerLite({
      api_key: apiKey,
    })
    
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50')
    
    // Fetch subscribers from MailerLite
    const subscribersResponse = await mailerlite.subscribers.get({
      filter: {
        status: 'active',
      },
      limit,
    })
    
    // Get total subscriber count
    const allSubscribers = await mailerlite.subscribers.get({
      filter: {
        status: 'active',
      },
      limit: 10000,
    })
    
    // Handle MailerLite response - data might be an array or object
    const subscribersArray = Array.isArray(allSubscribers.data) 
      ? allSubscribers.data 
      : (allSubscribers.data as any)?.data || []
    
    // Calculate statistics
    const totalSubscribers = subscribersArray.length || 0
    const todaySubscribers = subscribersArray.filter((sub: any) => {
      const date = new Date(sub.created_at)
      const today = new Date()
      return date.toDateString() === today.toDateString()
    }).length || 0
    
    const monthlySubscribers = subscribersArray.filter((sub: any) => {
      const date = new Date(sub.created_at)
      const now = new Date()
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }).length || 0
    
    // Handle MailerLite response for subscribersResponse
    const subscribersList = Array.isArray(subscribersResponse.data) 
      ? subscribersResponse.data 
      : (subscribersResponse.data as any)?.data || []
    
    return NextResponse.json({
      success: true,
      data: {
        subscribers: subscribersList.map((sub: any) => ({
          id: sub.id,
          email: sub.email,
          name: sub.fields?.name || sub.fields?.first_name || 'N/A',
          firstName: sub.fields?.first_name || '',
          lastName: sub.fields?.last_name || '',
          phone: sub.fields?.phone || '',
          status: sub.status,
          source: sub.fields?.source || 'N/A',
          createdAt: sub.created_at,
          subscribedAt: sub.subscribed_at,
        })),
        stats: {
          totalSubscribers,
          todaySubscribers,
          monthlySubscribers,
        },
      },
    })
  } catch (error: any) {
    console.error('Error fetching subscribers:', error)
    
    // If MailerLite is not configured, return empty data instead of error
    const apiKey = process.env.MAILERLITE_API_KEY
    if (!apiKey || error.message?.includes('api_key')) {
      return NextResponse.json({
        success: true,
        data: {
          subscribers: [],
          stats: {
            totalSubscribers: 0,
            todaySubscribers: 0,
            monthlySubscribers: 0,
          },
        },
      })
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

