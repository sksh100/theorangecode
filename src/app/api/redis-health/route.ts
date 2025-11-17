import { NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  try {
    const pong = await redis.ping();
    return NextResponse.json({ ok: true, pong });
  } catch (err) {
    console.error("redis-health error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
