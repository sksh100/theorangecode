import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const visitor = {
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown",
      ua: req.headers.get("user-agent") ?? "unknown",
      ts: Date.now(),
      path: data.path || "/",
    };

    // Save to list of recent visitors
    await redis.lpush("visitors", JSON.stringify(visitor));
    await redis.ltrim("visitors", 0, 200);  // keep last 200 visitors

    // Mark as active for live visitors
    await redis.set(`active:${visitor.ip}`, JSON.stringify(visitor), { ex: 60 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track-visitor error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
