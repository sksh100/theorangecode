import { NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  try {
    const keys = await redis.keys("active:*");

    const activeVisitors: any[] = [];

    for (const key of keys) {
      const data = await redis.get<string>(key);
      if (data) {
        activeVisitors.push(JSON.parse(data));
      }
    }

    const recentVisitorsRaw = await redis.lrange<string>("visitors", 0, 50);

    const recentVisitors = recentVisitorsRaw.map((v) => JSON.parse(v));

    return NextResponse.json({
      ok: true,
      activeVisitors,
      recentVisitors,
    });
  } catch (err) {
    console.error("admin visitors error:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
