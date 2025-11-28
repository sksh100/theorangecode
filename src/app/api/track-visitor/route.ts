// src/app/api/track-visitor/route.ts

import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { notifyNewVisitor } from "@/lib/slack";

export const dynamic = 'force-dynamic'

type VisitorPayload = {
  id: string;        // some unique id from client
  ip?: string | null;
  userAgent?: string | null;
  path?: string | null;
  referrer?: string | null;
  country?: string | null;
  city?: string | null;
  ts: number;
};

// Helper function to detect device type from user agent
function detectDevice(userAgent: string | null): string {
  if (!userAgent) return "Unknown";
  
  const ua = userAgent.toLowerCase();
  if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
    return "Mobile";
  }
  if (ua.includes("tablet") || ua.includes("ipad")) {
    return "Tablet";
  }
  return "Desktop";
}

// Helper function to detect browser from user agent
function detectBrowser(userAgent: string | null): string {
  if (!userAgent) return "Unknown";
  
  const ua = userAgent.toLowerCase();
  if (ua.includes("chrome") && !ua.includes("edg")) return "Chrome";
  if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("edg")) return "Edge";
  if (ua.includes("opera")) return "Opera";
  return "Other";
}

export async function POST(req: NextRequest) {
  try {
    // Check if Redis is configured - if not, just return success (graceful degradation)
    if (!process.env.UPSTASH_REDIS_REST_URL && !process.env.KV_REST_API_URL) {
      console.warn("Redis not configured - visitor tracking disabled");
      return NextResponse.json({ ok: true, message: "Tracking disabled - Redis not configured" });
    }

    const body = (await req.json()) as Partial<VisitorPayload>;

    const now = Date.now();
    const id = body.id ?? `anon:${now}`;

    // Get IP from headers (Vercel provides x-forwarded-for)
    const ip = body.ip ?? 
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? 
      req.headers.get("x-real-ip") ?? 
      "unknown";

    // Get location from Vercel headers (more accurate)
    const country = body.country ?? req.headers.get("x-vercel-ip-country") ?? "Unknown";
    const city = body.city ?? req.headers.get("x-vercel-ip-city") ?? "Unknown";
    const region = req.headers.get("x-vercel-ip-country-region") ?? null;

    const userAgent = body.userAgent ?? req.headers.get("user-agent") ?? "Unknown";
    const path = body.path ?? req.url.split("?")[0] ?? "/";
    const referrer = body.referrer ?? req.headers.get("referer") ?? "Direct";

    // Detect device and browser
    const device = detectDevice(userAgent);
    const browser = detectBrowser(userAgent);

    const payload: VisitorPayload = {
      id,
      ip,
      userAgent,
      path,
      referrer,
      country,
      city,
      ts: now,
    };

    const key = `active:${id}`;
    const visitorKey = `visitor:seen:${ip}`; // Track by IP to detect new visitors

    // Check if this is a new visitor (not seen in last 5 minutes)
    let isNewVisitor = true;
    let lastSeen = null;
    let redisAvailable = true;
    
    try {
      lastSeen = await redis.get(visitorKey);
      isNewVisitor = !lastSeen;
      console.log("🔍 Visitor check:", {
        ip,
        lastSeen: lastSeen ? `seen at ${lastSeen}` : "new visitor",
        isNewVisitor,
        visitorKey
      });
    } catch (redisError) {
      console.warn("⚠️ Redis check failed, treating as new visitor:", redisError);
      // If Redis fails, treat as new visitor to ensure notifications work
      isNewVisitor = true;
      redisAvailable = false;
    }

    // Try to store visitor data (but don't fail if Redis is down)
    try {
      // store active visitor with TTL 60 seconds
      await redis.set(key, JSON.stringify(payload), { ex: 60 });

      // Mark this IP as seen (5 minute window)
      await redis.set(visitorKey, now.toString(), { ex: 300 });

      // push into recent visitors list, keep only last 200
      await redis.lpush("visitors", JSON.stringify(payload));
      await redis.ltrim("visitors", 0, 199);
    } catch (redisError) {
      console.warn("⚠️ Redis storage failed (but continuing):", redisError);
      // Continue even if Redis fails
    }

    // Always log visitor tracking
    console.log("📊 Visitor tracked:", {
      ip,
      country,
      city,
      device,
      browser,
      path,
      isNewVisitor,
      redisAvailable,
      lastSeen: lastSeen ? `seen ${Math.round((now - parseInt(lastSeen)) / 1000)}s ago` : "never"
    });

    // TEMPORARY: Force notifications for testing (remove after debugging)
    // Set FORCE_VISITOR_NOTIFICATIONS=true in Vercel to always notify
    const forceNotifications = process.env.FORCE_VISITOR_NOTIFICATIONS === 'true';
    const shouldNotify = isNewVisitor || forceNotifications;

    // Send Slack notification for new visitors only (to avoid spam)
    if (shouldNotify) {
      console.log("👤 NEW VISITOR - Sending Slack notification...", {
        ip,
        country,
        city,
        device,
        browser,
        path,
        timestamp: new Date().toISOString()
      });
      
      notifyNewVisitor({
        country: country !== "Unknown" ? country : undefined,
        city: city !== "Unknown" ? city : undefined,
        device: device,
        browser: browser,
        page: path,
        ip: ip !== "unknown" ? ip : undefined
      })
        .then(() => {
          console.log("✅✅✅ Visitor Slack notification SENT SUCCESSFULLY");
        })
        .catch(err => {
          console.error("❌❌❌ Slack notification FAILED:", {
            error: err.message,
            stack: err.stack,
            ip,
            country,
            city
          });
          // Don't fail tracking if Slack fails
        });
    } else {
      console.log("⏭️ Visitor already seen recently, skipping notification", {
        ip,
        lastSeen: lastSeen,
        timeSinceLastSeen: lastSeen ? `${Math.round((now - parseInt(lastSeen)) / 1000)} seconds` : "unknown"
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("track-visitor error", error);
    // Return success even on error to not break the page
    return NextResponse.json(
      { ok: true, error: String(error?.message ?? error) },
      { status: 200 }
    );
  }
}
