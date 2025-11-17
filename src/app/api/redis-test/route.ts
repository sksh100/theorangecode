import { NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  try {
    const now = Date.now().toString();
    await redis.set("debug:test", now);
    const value = await redis.get("debug:test");

    return NextResponse.json({ ok: true, value });
  } catch (err: any) {
    console.error("redis-test error", err);
    return NextResponse.json(
      { ok: false, error: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}

