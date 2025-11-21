// src/app/api/redis-health/route.ts

import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check if redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Redis not configured",
          message: "Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN environment variables"
        },
        { status: 503 }
      );
    }

    const pong = await redis.ping();
    return NextResponse.json({ ok: true, pong });
  } catch (error: any) {
    console.error("Redis health error", error);
    return NextResponse.json(
      { ok: false, error: String(error?.message ?? error) },
      { status: 500 }
    );
  }
}
