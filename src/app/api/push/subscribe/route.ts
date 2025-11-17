import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: NextRequest) {
  const sub = await req.json();

  // avoid duplicates by storing as a set-like list
  const raw = JSON.stringify(sub);
  const existing = await redis.lrange<string>("push:subs", 0, -1);

  if (!existing.includes(raw)) {
    await redis.lpush("push:subs", raw);
    await redis.ltrim("push:subs", 0, 200);
  }

  return NextResponse.json({ ok: true });
}

