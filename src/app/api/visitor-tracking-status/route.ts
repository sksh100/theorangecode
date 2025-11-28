import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

/**
 * Diagnostic endpoint to check visitor tracking status
 * Visit: /api/visitor-tracking-status to see current configuration
 */
export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? 
               request.headers.get("x-real-ip") ?? 
               "unknown";
    
    const country = request.headers.get("x-vercel-ip-country") ?? "Unknown";
    const city = request.headers.get("x-vercel-ip-city") ?? "Unknown";
    
    // Check Redis configuration
    const redisConfigured = !!(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL);
    
    // Check Slack configuration
    const slackConfigured = !!process.env.SLACK_WEBHOOK_URL;
    
    // Check if this IP was seen recently
    let lastSeen: string | null = null;
    let isNewVisitor = true;
    
    if (redisConfigured && ip !== "unknown") {
      try {
        const visitorKey = `visitor:seen:${ip}`;
        const lastSeenValue = await redis.get(visitorKey);
        
        if (lastSeenValue && typeof lastSeenValue === 'string') {
          lastSeen = lastSeenValue;
          const lastSeenTime = parseInt(lastSeen, 10);
          const now = Date.now();
          const timeSinceLastSeen = (now - lastSeenTime) / 1000; // seconds
          
          // Only consider "new" if not seen in the last 2 minutes
          isNewVisitor = timeSinceLastSeen > 120;
        }
      } catch (error) {
        console.error("Error checking visitor status:", error);
      }
    }
    
    return NextResponse.json({
      status: "ok",
      configuration: {
        redis: {
          configured: redisConfigured,
          url: process.env.UPSTASH_REDIS_REST_URL ? "UPSTASH_REDIS_REST_URL" : 
               process.env.KV_REST_API_URL ? "KV_REST_API_URL" : "Not configured"
        },
        slack: {
          configured: slackConfigured,
          webhookUrl: slackConfigured ? "✅ Set" : "❌ Missing"
        }
      },
      currentVisitor: {
        ip,
        country,
        city,
        lastSeen: lastSeen ? new Date(parseInt(lastSeen, 10)).toISOString() : null,
        isNewVisitor,
        willNotify: isNewVisitor && slackConfigured
      },
      instructions: {
        forceNotifications: "Set FORCE_VISITOR_NOTIFICATIONS=true in Vercel to always notify",
        testEndpoint: "Visit /api/test-visitor-notification to test Slack notifications",
        checkLogs: "Check Vercel Function Logs for detailed tracking information"
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    }, { status: 500 });
  }
}

