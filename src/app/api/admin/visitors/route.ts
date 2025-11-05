import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')

    // Get recent visitors
    const visitorIds = await kv.zrange('visitors:list', -limit, -1, { rev: true })
    const visitors = []

    for (const id of visitorIds) {
      try {
        const visitorData = await kv.get(`visitor:${id}`)
        if (visitorData) {
          visitors.push(JSON.parse(visitorData as string))
        }
      } catch (error) {
        console.error(`Error fetching visitor ${id}:`, error)
      }
    }

    // Get active sessions (last 5 minutes)
    const allKeys = await kv.keys('visitor:session:*')
    const activeSessions = []

    for (const key of allKeys) {
      try {
        const sessionData = await kv.get(key)
        if (sessionData) {
          activeSessions.push(JSON.parse(sessionData as string))
        }
      } catch (error) {
        console.error(`Error fetching session ${key}:`, error)
      }
    }

    // Get top countries
    const topCountries = await kv.zrange('visitors:countries', 0, -1, { rev: true, withScores: true })
    const countries = []
    for (let i = 0; i < topCountries.length; i += 2) {
      countries.push({
        country: topCountries[i],
        count: Math.round(topCountries[i + 1] as number),
      })
    }

    // Get top pages
    const topPages = await kv.zrange('visitors:pages', 0, -1, { rev: true, withScores: true })
    const pages = []
    for (let i = 0; i < topPages.length; i += 2) {
      pages.push({
        page: topPages[i],
        views: Math.round(topPages[i + 1] as number),
      })
    }

    // Get daily statistics (last 30 days)
    const dailyStats = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      try {
        const dailyVisitors = await kv.zcard(`visitors:daily:${dateStr}`)
        dailyStats.push({
          date: dateStr,
          visitors: dailyVisitors,
        })
      } catch (error) {
        dailyStats.push({
          date: dateStr,
          visitors: 0,
        })
      }
    }

    // Calculate statistics
    const totalVisitors = visitors.length
    const uniqueVisitors = new Set(visitors.map((v: any) => v.sessionId)).size
    const todayVisitors = visitors.filter((v: any) => {
      const date = new Date(v.timestamp)
      const today = new Date()
      return date.toDateString() === today.toDateString()
    }).length

    const monthlyVisitors = visitors.filter((v: any) => {
      const date = new Date(v.timestamp)
      const now = new Date()
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }).length

    return NextResponse.json({
      success: true,
      data: {
        visitors: visitors.slice(0, limit),
        activeSessions,
        countries: countries.slice(0, 10),
        pages: pages.slice(0, 10),
        dailyStats: dailyStats.reverse(),
        stats: {
          totalVisitors,
          uniqueVisitors,
          todayVisitors,
          monthlyVisitors,
          activeNow: activeSessions.length,
        },
      },
    })
  } catch (error: any) {
    console.error('Error fetching visitors:', error)
    
    // Return empty data instead of error
    return NextResponse.json({
      success: true,
      data: {
        visitors: [],
        activeSessions: [],
        countries: [],
        pages: [],
        dailyStats: [],
        stats: {
          totalVisitors: 0,
          uniqueVisitors: 0,
          todayVisitors: 0,
          monthlyVisitors: 0,
          activeNow: 0,
        },
      },
    })
  }
}

