import { NextRequest, NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.ip ??
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";

    const timestamp = Date.now();

    // Key structure:
    // visitors:active:<ip>
    // visitors:log  (list)
    // visitors:total (number)
    // visitors:unique (hyperloglog)
    // visitors:today:YYYY-MM-DD (number)

    // 1. Mark active visitor (TTL 5 min)
    const activeKey = `visitors:active:${ip}`;

    await redis.hset(activeKey, {
      ip,
      userAgent,
      lastSeen: timestamp,
    });

    await redis.expire(activeKey, 300);

    // 2. Add to recent visitor log
    await redis.lpush(
      "visitors:log",
      JSON.stringify({ ip, timestamp, userAgent })
    );

    await redis.ltrim("visitors:log", 0, 499);

    // 3. Increment counters
    await redis.incr("visitors:total");
    await redis.pfadd("visitors:unique", ip);

    const today = new Date().toISOString().slice(0, 10);
    await redis.incr(`visitors:today:${today}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track-visitor error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
