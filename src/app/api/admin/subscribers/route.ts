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
    
    // Fetch detailed subscriber info with email stats
    // Note: MailerLite API may not support all methods in the SDK, so we'll use what's available
    const subscribersWithStats = await Promise.all(
      subscribersList.slice(0, limit).map(async (sub: any) => {
        try {
          // Try to fetch individual subscriber details to get email stats
          let subscriberDetails: any = null
          try {
            subscriberDetails = await mailerlite.subscribers.find(sub.id || sub.email)
          } catch (error: any) {
            // If find fails, use the data we already have
            console.log(`⚠️ Could not fetch details for ${sub.email}, using existing data`)
          }
          
          const details = subscriberDetails?.data || sub
          
          // Check welcome email status from subscriber fields or automation data
          // MailerLite stores this in custom fields or we can check if opens_count > 0 shortly after subscription
          let welcomeEmailReceived = false
          let welcomeEmailOpened = false
          let welcomeEmailClicked = false
          
          // Heuristic: If subscriber has opens/clicks and was recently subscribed, likely received welcome email
          // Also check if there's a custom field indicating welcome email sent
          const hasRecentActivity = (details.opens_count > 0 || details.clicks_count > 0)
          const subscribedDate = new Date(details.subscribed_at || details.subscribed || details.created_at || details.created)
          const daysSinceSubscription = (Date.now() - subscribedDate.getTime()) / (1000 * 60 * 60 * 24)
          
          // If subscribed within last 7 days and has activity, likely received welcome email
          if (daysSinceSubscription <= 7 && hasRecentActivity) {
            welcomeEmailReceived = true
            welcomeEmailOpened = details.opens_count > 0
            welcomeEmailClicked = details.clicks_count > 0
          }
          
          // Check custom fields for welcome email status
          if (details.fields?.welcome_email_sent === true || details.fields?.welcome_email === 'sent') {
            welcomeEmailReceived = true
          }
          if (details.fields?.welcome_email_opened === true || details.fields?.welcome_email === 'opened') {
            welcomeEmailReceived = true
            welcomeEmailOpened = true
          }
          
          return {
            id: sub.id || sub.email || 'unknown',
            email: sub.email || 'N/A',
            name: sub.fields?.name || sub.fields?.first_name || sub.name || details.fields?.name || details.name || 'N/A',
            firstName: sub.fields?.first_name || sub.first_name || details.fields?.first_name || '',
            lastName: sub.fields?.last_name || sub.last_name || details.fields?.last_name || '',
            phone: sub.fields?.phone || sub.phone || details.fields?.phone || '',
            status: sub.status || details.status || 'active',
            source: sub.fields?.source || sub.source || details.fields?.source || 'N/A',
            createdAt: sub.created_at || sub.created || details.created_at || new Date().toISOString(),
            subscribedAt: sub.subscribed_at || sub.subscribed || details.subscribed_at || sub.created_at || sub.created || details.created_at || new Date().toISOString(),
            // Email engagement stats - MailerLite provides these in the subscriber object
            sent: details.sent || sub.sent || 0,
            opensCount: details.opens_count || sub.opens_count || details.opens || 0,
            clicksCount: details.clicks_count || sub.clicks_count || details.clicks || 0,
            // Welcome email status
            welcomeEmailReceived,
            welcomeEmailOpened,
            welcomeEmailClicked,
          }
        } catch (error: any) {
          console.log(`⚠️ Error processing subscriber ${sub.email}:`, error.message)
          // Return basic data if processing fails
          return {
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
            sent: sub.sent || 0,
            opensCount: sub.opens_count || sub.opens || 0,
            clicksCount: sub.clicks_count || sub.clicks || 0,
            welcomeEmailReceived: false,
            welcomeEmailOpened: false,
            welcomeEmailClicked: false,
          }
        }
      })
    )
    
    return NextResponse.json({
      success: true,
      data: {
        subscribers: subscribersWithStats,
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

