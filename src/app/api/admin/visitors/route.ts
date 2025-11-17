import { NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET() {
  try {
    const keys = await redis.keys("active:*");

    const activeVisitors: any[] = [];

    for (const key of keys) {
      // Tell TypeScript this is a string value stored in Redis
      const data = await redis.get<string>(key);
      if (data) {
        activeVisitors.push(JSON.parse(data));
      }
    }

    // Same here: list of JSON strings
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
