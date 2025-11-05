import { NextRequest, NextResponse } from 'next/server'
import MailerLite from '@mailerlite/mailerlite-nodejs'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.MAILERLITE_API_KEY
    
    if (!apiKey) {
      console.log('⚠️ MailerLite not configured - MAILERLITE_API_KEY missing')
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
    
    const mailerlite = new MailerLite({
      api_key: apiKey,
    })
    
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')
    
    console.log('📧 Fetching subscribers from MailerLite...', { hasApiKey: !!apiKey, limit })
    
    // Fetch subscribers from MailerLite - try without filter first to get all
    let subscribersResponse
    try {
      subscribersResponse = await mailerlite.subscribers.get({
        limit,
      })
    } catch (error: any) {
      console.log('⚠️ Error with default fetch, trying with filter...', error.message)
      // Try with filter
      subscribersResponse = await mailerlite.subscribers.get({
        filter: {
          status: 'active',
        },
        limit,
      })
    }
    
    console.log('✅ MailerLite response received:', {
      hasData: !!subscribersResponse?.data,
      dataType: typeof subscribersResponse?.data,
      isArray: Array.isArray(subscribersResponse?.data),
      responseKeys: subscribersResponse ? Object.keys(subscribersResponse) : [],
    })
    
    // Get total subscriber count (try to get more)
    let allSubscribers
    try {
      allSubscribers = await mailerlite.subscribers.get({
        limit: 10000,
      })
    } catch (error: any) {
      console.log('⚠️ Error fetching all subscribers, using response data...', error.message)
      allSubscribers = subscribersResponse
    }
    
    // Handle MailerLite response - data might be an array or object
    let subscribersArray: any[] = []
    if (allSubscribers?.data) {
      if (Array.isArray(allSubscribers.data)) {
        subscribersArray = allSubscribers.data
      } else if (typeof allSubscribers.data === 'object' && (allSubscribers.data as any)?.data) {
        subscribersArray = Array.isArray((allSubscribers.data as any).data) 
          ? (allSubscribers.data as any).data 
          : []
      } else if (typeof allSubscribers.data === 'object') {
        // Data might be an object with array-like structure
        const dataObj = allSubscribers.data as any
        if (dataObj.length) {
          subscribersArray = Array.from(dataObj)
        }
      }
    }
    
    console.log(`✅ Processed ${subscribersArray.length} total subscribers`)
    
    // Calculate statistics
    const totalSubscribers = subscribersArray.length || 0
    const todaySubscribers = subscribersArray.filter((sub: any) => {
      if (!sub.created_at && !sub.subscribed_at) return false
      const date = new Date(sub.created_at || sub.subscribed_at)
      const today = new Date()
      return date.toDateString() === today.toDateString()
    }).length || 0
    
    const monthlySubscribers = subscribersArray.filter((sub: any) => {
      if (!sub.created_at && !sub.subscribed_at) return false
      const date = new Date(sub.created_at || sub.subscribed_at)
      const now = new Date()
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }).length || 0
    
    // Handle MailerLite response for subscribersResponse
    let subscribersList: any[] = []
    if (subscribersResponse?.data) {
      if (Array.isArray(subscribersResponse.data)) {
        subscribersList = subscribersResponse.data
      } else if (typeof subscribersResponse.data === 'object' && (subscribersResponse.data as any)?.data) {
        subscribersList = Array.isArray((subscribersResponse.data as any).data) 
          ? (subscribersResponse.data as any).data 
          : []
      } else if (typeof subscribersResponse.data === 'object') {
        const dataObj = subscribersResponse.data as any
        if (dataObj.length) {
          subscribersList = Array.from(dataObj)
        }
      }
    }
    
    console.log(`✅ Returning ${subscribersList.length} subscribers (limited to ${limit})`)
    
    return NextResponse.json({
      success: true,
      data: {
        subscribers: subscribersList.slice(0, limit).map((sub: any) => ({
          id: sub.id || sub.email || 'unknown',
          email: sub.email || 'N/A',
          name: sub.fields?.name || sub.fields?.first_name || sub.name || 'N/A',
          firstName: sub.fields?.first_name || sub.first_name || '',
          lastName: sub.fields?.last_name || sub.last_name || '',
          phone: sub.fields?.phone || sub.phone || '',
          status: sub.status || 'active',
          source: sub.fields?.source || sub.source || 'N/A',
          createdAt: sub.created_at || sub.created || new Date().toISOString(),
          subscribedAt: sub.subscribed_at || sub.subscribed || sub.created_at || sub.created || new Date().toISOString(),
        })),
        stats: {
          totalSubscribers,
          todaySubscribers,
          monthlySubscribers,
        },
      },
    })
  } catch (error: any) {
    console.error('❌ Error fetching subscribers:', error)
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack?.substring(0, 500),
      hasApiKey: !!process.env.MAILERLITE_API_KEY,
    })
    
    // Return empty data instead of error to prevent dashboard from breaking
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
}

