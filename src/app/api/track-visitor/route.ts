import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { path, referrer, userAgent } = await req.json();

    // Basic visitor identity
    const ip =
      req.ip ??
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    const now = Date.now();
    const nowSeconds = Math.floor(now / 1000);

    // Key for "active visitor" with short TTL (5 minutes)
    const activeKey = `visitors:active:${ip}`;

    // Store as a hash or JSON, but with an expiry
    await redis.hset(activeKey, {
      ip,
      path: path || "/",
      referrer: referrer || "",
      userAgent: userAgent || "",
      lastSeen: nowSeconds.toString(),
    });

    await redis.expire(activeKey, 60 * 5); // 5 minutes

    // Log for recent visitors list (optional but nice for the table)
    const logKey = "visitors:log";
    await redis.lpush(
      logKey,
      JSON.stringify({
        ip,
        path: path || "/",
        referrer: referrer || "",
        userAgent: userAgent || "",
        timestamp: nowSeconds,
      }),
    );

    // Keep only the most recent 500 entries
    await redis.ltrim(logKey, 0, 499);

    // Increment some simple counters
    await redis.incr("visitors:total");
    await redis.pfadd("visitors:unique", ip); // HyperLogLog for unique visitors
    await redis.incr(`visitors:by-day:${new Date().toISOString().slice(0, 10)}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track-visitor] error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
