import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

interface VisitorData {
  id: string
  ip: string
  userAgent: string
  referrer: string
  page: string
  country?: string
  city?: string
  timestamp: string
  sessionId: string
}

async function getLocationFromIP(ip: string): Promise<{ country?: string; city?: string }> {
  try {
    // Skip localhost/private IPs
    if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return {}
    }

    // Use ipapi.co free service (1000 requests/day free)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'TheOrangeCode-Analytics',
      },
    })

    if (response.ok) {
      const data = await response.json()
      return {
        country: data.country_name || data.country_code || undefined,
        city: data.city || undefined,
      }
    }
  } catch (error) {
    console.error('Error fetching location:', error)
  }

  return {}
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page = '/', referrer = '', userAgent = '' } = body

    // Get visitor IP
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'

    // Get location from IP
    const location = await getLocationFromIP(ip)

    // Generate session ID (use existing or create new)
    const sessionId = body.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create visitor data
    const visitorData: VisitorData = {
      id: `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ip,
      userAgent,
      referrer,
      page,
      country: location.country,
      city: location.city,
      timestamp: new Date().toISOString(),
      sessionId,
    }

    // Store visitor data in Vercel KV
    const visitorKey = `visitor:${visitorData.id}`
    await kv.setex(visitorKey, 86400 * 7, JSON.stringify(visitorData)) // Store for 7 days

    // Add to visitors list (sorted set by timestamp)
    await kv.zadd('visitors:list', { score: Date.now(), member: visitorData.id })

    // Add to daily visitors
    const today = new Date().toISOString().split('T')[0]
    await kv.zadd(`visitors:daily:${today}`, { score: Date.now(), member: visitorData.id })

    // Track by country
    if (location.country) {
      await kv.zincrby('visitors:countries', 1, location.country)
    }

    // Track by page
    await kv.zincrby('visitors:pages', 1, page)

    // Track active sessions (last 5 minutes)
    const activeSessionKey = `visitor:session:${sessionId}`
    await kv.setex(activeSessionKey, 300, JSON.stringify({ // 5 minutes
      sessionId,
      page,
      country: location.country,
      city: location.city,
      lastSeen: new Date().toISOString(),
    }))

    return NextResponse.json({
      success: true,
      sessionId,
    })
  } catch (error: any) {
    console.error('Error tracking visitor:', error)
    // Return success even on error to not break the site
    return NextResponse.json({
      success: true,
      sessionId: `session_${Date.now()}`,
    })
  }
}

