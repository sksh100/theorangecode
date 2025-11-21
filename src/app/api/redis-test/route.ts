import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check if Redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL && !process.env.KV_REST_API_URL) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Redis not configured",
          message: "Missing UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN or KV_REST_API_URL/KV_REST_API_TOKEN environment variables"
        },
        { status: 503 }
      );
    }

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

