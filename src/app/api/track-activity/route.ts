import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, type, data } = body // type: 'click', 'scroll', 'time', 'exit'

    if (!sessionId) {
      return NextResponse.json({ success: false, error: 'Missing sessionId' }, { status: 400 })
    }

    // Store activity for this session
    const activityKey = `visitor:activity:${sessionId}`
    const timestamp = Date.now()

    // Get existing activities
    const existingActivities = await kv.get(activityKey)
    const activities = existingActivities ? (JSON.parse(existingActivities as string) as any[]) : []

    // Add new activity
    activities.push({
      type,
      data,
      timestamp,
    })

    // Store activities (keep last 100 activities per session)
    const recentActivities = activities.slice(-100)
    await kv.setex(activityKey, 3600, JSON.stringify(recentActivities)) // Store for 1 hour

    // Update session with latest activity
    const sessionKey = `visitor:session:${sessionId}`
    const sessionData = await kv.get(sessionKey)
    if (sessionData) {
      const session = JSON.parse(sessionData as string)
      session.lastActivity = timestamp
      session.lastActivityType = type
      if (type === 'click') {
        session.clicks = (session.clicks || 0) + 1
        session.lastClick = data?.target || data?.url || 'unknown'
      }
      if (type === 'scroll') {
        session.scrollDepth = Math.max(session.scrollDepth || 0, data?.depth || 0)
      }
      if (type === 'time') {
        session.timeOnPage = data?.time || 0
      }
      if (type === 'exit') {
        session.exitedAt = timestamp
        session.timeOnPage = data?.totalTime || session.timeOnPage || 0
      }
      await kv.setex(sessionKey, 300, JSON.stringify(session)) // 5 minutes
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error('Error tracking activity:', error)
    return NextResponse.json({
      success: true, // Return success to not break the site
    })
  }
}

