import { NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const visitor = {
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown",
      ua: req.headers.get("user-agent") ?? "unknown",
      ts: Date.now(),
      path: data.path || "/",
    };

    await redis.lpush("visitors", JSON.stringify(visitor));
    await redis.ltrim("visitors", 0, 200);

    await redis.set(`active:${visitor.ip}`, JSON.stringify(visitor), { ex: 60 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track-visitor error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
