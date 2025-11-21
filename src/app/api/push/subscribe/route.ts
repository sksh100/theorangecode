import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Check if Redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL && !process.env.KV_REST_API_URL) {
      console.warn("Redis not configured - push subscription disabled");
      return NextResponse.json({ ok: true, message: "Push subscription disabled - Redis not configured" });
    }

    const sub = await req.json();

    // avoid duplicates by storing as a set-like list
    const raw = JSON.stringify(sub);
    const existing = await redis.lrange<string>("push:subs", 0, -1);

    if (!existing.includes(raw)) {
      await redis.lpush("push:subs", raw);
      await redis.ltrim("push:subs", 0, 200);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("push/subscribe error", error);
    return NextResponse.json(
      { ok: true, error: String(error?.message ?? error) },
      { status: 200 }
    );
  }
}

