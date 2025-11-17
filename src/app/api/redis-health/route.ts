// src/app/api/redis-health/route.ts

import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
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
