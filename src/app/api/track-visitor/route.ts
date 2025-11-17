import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const now = Date.now();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const country = req.headers.get("x-vercel-ip-country") ?? "Unknown";
    const city = req.headers.get("x-vercel-ip-city") ?? "Unknown";
    const region = req.headers.get("x-vercel-ip-country-region") ?? "Unknown";

    const userAgent = body.userAgent ?? req.headers.get("user-agent") ?? "Unknown";
    const path = body.path ?? "/";
    const referrer = body.referrer ?? req.headers.get("referer") ?? "Direct";

    const visitor = {
      ip,
      country,
      city,
      region,
      userAgent,
      path,
      referrer,
      time: now,
    };

    // Store in "recent visitors" history
    await redis.lpush("visitors:recent", JSON.stringify(visitor));
    await redis.ltrim("visitors:recent", 0, 200);

    // Real-time "active" visitors (last 60 seconds)
    // Upstash Redis zadd format: zadd(key, { score, member })
    await redis.zadd("visitors:active", {
      score: now,
      member: JSON.stringify(visitor),
    } as any);

    // Clean up very old scores
    const cutoff = now - 5 * 60_000; // 5 minutes ago
    await redis.zremrangebyscore("visitors:active", 0, cutoff);

    // Simple counters
    await redis.incr("visitors:total");

    console.log('✅ Visitor tracked:', {
      ip,
      country,
      city,
      path,
      referrer: referrer.substring(0, 50),
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('❌ Error tracking visitor:', error);
    
    // Check if Redis is configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('⚠️ Upstash Redis not configured! Please set KV_REST_API_URL and KV_REST_API_TOKEN in Vercel environment variables.');
    }
    
    // Return success even on error to not break the site
    return NextResponse.json({ ok: false, error: error.message || 'Unknown error' });
  }
}
