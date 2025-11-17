import { NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

// This automatically reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
const redis = Redis.fromEnv();

export async function GET() {
  try {
    const pong = await redis.ping();
    return NextResponse.json({ ok: true, pong });
  } catch (error) {
    console.error("[redis-health] error", error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}
