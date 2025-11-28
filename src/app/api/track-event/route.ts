import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { notifyConversionEvent } from '@/lib/slack';

export const dynamic = 'force-dynamic';

interface EventPayload {
  sessionId: string;
  event: string;
  element?: string;
  location?: string;
  value?: string | number;
  metadata?: Record<string, any>;
  timestamp: number;
  path: string;
  referrer?: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const body: EventPayload = await req.json();
    const { sessionId, event, element, location, value, metadata, timestamp, path } = body;

    // Store event in Redis
    const eventKey = `events:${sessionId}`;
    const eventData = {
      event,
      element,
      location,
      value,
      metadata,
      timestamp,
      path,
    };

    try {
      // Get existing events for this session
      const existingEvents = await redis.get(eventKey);
      const events = existingEvents ? JSON.parse(existingEvents as string) : [];
      
      // Add new event
      events.push(eventData);
      
      // Keep only last 50 events per session
      const recentEvents = events.slice(-50);
      await redis.set(eventKey, JSON.stringify(recentEvents), { ex: 7200 }); // 2 hours
    } catch (redisError) {
      console.warn('⚠️ Failed to store event in Redis:', redisError);
    }

    // Track conversion events in aggregate
    if (event === 'form_complete' || event === 'masterclass_interest' || event === 'cta_click') {
      try {
        const conversionKey = `conversions:${event}:${element || 'unknown'}`;
        await redis.incr(conversionKey);
        await redis.expire(conversionKey, 86400 * 30); // 30 days
      } catch (error) {
        console.warn('⚠️ Failed to track conversion:', error);
      }
    }

    // Track funnel steps
    if (event === 'conversion_funnel') {
      try {
        const funnelKey = `funnel:${element}`;
        await redis.incr(funnelKey);
        await redis.expire(funnelKey, 86400 * 30); // 30 days
      } catch (error) {
        console.warn('⚠️ Failed to track funnel step:', error);
      }
    }

    // Send Slack notification for important events
    if (event === 'form_complete' || event === 'masterclass_interest') {
      try {
        await notifyConversionEvent({
          event,
          element: element || 'Unknown',
          location: location || path,
          metadata,
        });
      } catch (slackError) {
        console.warn('⚠️ Failed to send Slack notification:', slackError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('❌ Error tracking event:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

