import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export const dynamic = 'force-dynamic'

// Google Analytics Data API integration
// Requires:
// - GOOGLE_ANALYTICS_PROPERTY_ID (GA4 Property ID, format: 123456789)
// - GOOGLE_SERVICE_ACCOUNT_KEY (JSON string of service account credentials)
// - NEXT_PUBLIC_GA_MEASUREMENT_ID (Measurement ID, format: G-XXXXXXXXXX)

export async function GET(request: NextRequest) {
  try {
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    const gaPropertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    
    if (!gaMeasurementId) {
      return NextResponse.json({
        success: true,
        data: {
          message: 'Google Analytics not configured. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to see real-time data.',
          configured: false,
          stats: {
            totalUsers: 0,
            activeUsers: 0,
            pageViews: 0,
            sessions: 0,
            bounceRate: 0,
            avgSessionDuration: 0,
          },
          topPages: [],
          topSources: [],
          topCountries: [],
          realtimeUsers: 0,
        },
      })
    }

    // Check if we have the required credentials for Data API
    if (!gaPropertyId || !serviceAccountKey) {
      return NextResponse.json({
        success: true,
        data: {
          message: 'Google Analytics is configured. To see real-time data, set up Google Analytics Data API.',
          configured: true,
          measurementId: gaMeasurementId,
          stats: {
            totalUsers: 0,
            activeUsers: 0,
            pageViews: 0,
            sessions: 0,
            bounceRate: 0,
            avgSessionDuration: 0,
          },
          topPages: [],
          topSources: [],
          topCountries: [],
          realtimeUsers: 0,
          setupRequired: true,
          setupInstructions: [
            '1. Go to Google Cloud Console (console.cloud.google.com)',
            '2. Create or select a project',
            '3. Enable Google Analytics Data API',
            '4. Create Service Account and download JSON key',
            '5. Add service account email to GA4 property (Admin > Property Access Management)',
            '6. Set GOOGLE_ANALYTICS_PROPERTY_ID in Vercel (your GA4 Property ID)',
            '7. Set GOOGLE_SERVICE_ACCOUNT_KEY in Vercel (full JSON string)',
          ],
        },
      })
    }

    // Initialize Google Analytics Data API client
    let analyticsData: any
    try {
      const serviceAccount = JSON.parse(serviceAccountKey)
      const auth = new google.auth.GoogleAuth({
        credentials: serviceAccount,
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      })
      
      analyticsData = google.analyticsdata('v1beta')
      const authClient = await auth.getClient()
      
      // Fetch realtime users (active users right now)
      const realtimeResponse = await analyticsData.properties.runRealtimeReport({
        auth: authClient,
        property: `properties/${gaPropertyId}`,
        requestBody: {
          dimensions: [{ name: 'country' }],
          metrics: [{ name: 'activeUsers' }],
        },
      })
      
      const realtimeUsers = realtimeResponse.data.rows?.reduce((sum: number, row: any) => {
        return sum + parseInt(row.metricValues?.[0]?.value || '0', 10)
      }, 0) || 0

      // Fetch last 30 days of data
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const today = new Date()

      const reportResponse = await analyticsData.properties.runReport({
        auth: authClient,
        property: `properties/${gaPropertyId}`,
        requestBody: {
          dateRanges: [
            {
              startDate: thirtyDaysAgo.toISOString().split('T')[0],
              endDate: today.toISOString().split('T')[0],
            },
          ],
          dimensions: [
            { name: 'country' },
            { name: 'pagePath' },
            { name: 'sessionSource' },
          ],
          metrics: [
            { name: 'totalUsers' },
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'sessions' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
          ],
        },
      })

      // Process report data
      const rows = reportResponse.data.rows || []
      
      // Aggregate stats
      let totalUsers = 0
      let activeUsers = 0
      let pageViews = 0
      let sessions = 0
      let totalBounceRate = 0
      let totalSessionDuration = 0
      let bounceRateCount = 0
      let sessionDurationCount = 0

      const countriesMap = new Map<string, number>()
      const pagesMap = new Map<string, number>()
      const sourcesMap = new Map<string, number>()

      rows.forEach((row: any) => {
        const metrics = row.metricValues || []
        const dimensions = row.dimensionValues || []
        
        const users = parseInt(metrics[0]?.value || '0', 10)
        const active = parseInt(metrics[1]?.value || '0', 10)
        const views = parseInt(metrics[2]?.value || '0', 10)
        const sess = parseInt(metrics[3]?.value || '0', 10)
        const bounce = parseFloat(metrics[4]?.value || '0')
        const duration = parseFloat(metrics[5]?.value || '0')

        totalUsers += users
        activeUsers += active
        pageViews += views
        sessions += sess
        
        if (bounce > 0) {
          totalBounceRate += bounce
          bounceRateCount++
        }
        
        if (duration > 0) {
          totalSessionDuration += duration
          sessionDurationCount++
        }

        // Aggregate by country
        const country = dimensions[0]?.value || 'Unknown'
        countriesMap.set(country, (countriesMap.get(country) || 0) + users)

        // Aggregate by page
        const page = dimensions[1]?.value || 'Unknown'
        pagesMap.set(page, (pagesMap.get(page) || 0) + views)

        // Aggregate by source
        const source = dimensions[2]?.value || 'Unknown'
        sourcesMap.set(source, (sourcesMap.get(source) || 0) + sess)
      })

      // Convert maps to arrays and sort
      const topCountries = Array.from(countriesMap.entries())
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      const topPages = Array.from(pagesMap.entries())
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10)

      const topSources = Array.from(sourcesMap.entries())
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      const avgBounceRate = bounceRateCount > 0 ? totalBounceRate / bounceRateCount : 0
      const avgSessionDuration = sessionDurationCount > 0 ? totalSessionDuration / sessionDurationCount : 0

      return NextResponse.json({
        success: true,
        data: {
          configured: true,
          measurementId: gaMeasurementId,
          propertyId: gaPropertyId,
          stats: {
            totalUsers,
            activeUsers,
            pageViews,
            sessions,
            bounceRate: avgBounceRate,
            avgSessionDuration,
          },
          topPages,
          topSources,
          topCountries,
          realtimeUsers,
          setupRequired: false,
        },
      })
    } catch (apiError: any) {
      console.error('❌ Google Analytics Data API error:', apiError.message)
      // Return configured but with error message
      return NextResponse.json({
        success: true,
        data: {
          configured: true,
          measurementId: gaMeasurementId,
          propertyId: gaPropertyId,
          stats: {
            totalUsers: 0,
            activeUsers: 0,
            pageViews: 0,
            sessions: 0,
            bounceRate: 0,
            avgSessionDuration: 0,
          },
          topPages: [],
          topSources: [],
          topCountries: [],
          realtimeUsers: 0,
          setupRequired: true,
          error: apiError.message,
          setupInstructions: [
            '1. Verify GOOGLE_ANALYTICS_PROPERTY_ID is correct (format: 123456789)',
            '2. Verify GOOGLE_SERVICE_ACCOUNT_KEY is valid JSON',
            '3. Ensure service account has Analytics Viewer role',
            '4. Add service account email to GA4 property access',
            '5. Enable Google Analytics Data API in Google Cloud Console',
          ],
        },
      })
    }
  } catch (error: any) {
    console.error('❌ Error fetching Google Analytics data:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch Google Analytics data',
      },
      { status: 500 }
    )
  }
}

