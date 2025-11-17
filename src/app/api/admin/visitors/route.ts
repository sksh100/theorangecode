import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // ACTIVE VISITORS: count all keys "visitors:active:*"
    let cursor = 0;
    let active = 0;
    do {
      const [next, keys] = await redis.scan(cursor, {
        match: "visitors:active:*",
        count: 100,
      });
      cursor = Number(next);
      active += keys.length;
    } while (cursor !== 0);

    // TOTAL
    const total = Number((await redis.get("visitors:total")) || 0);

    // UNIQUE
    const unique = Number((await redis.pfcount("visitors:unique")) || 0);

    // TODAY
    const todayKey = `visitors:today:${new Date().toISOString().slice(0, 10)}`;
    const today = Number((await redis.get(todayKey)) || 0);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          activeNow: active,
          totalVisitors: total,
          uniqueVisitors: unique,
          todayVisitors: today,
          total,
          unique,
          today,
          thisMonth: null, // optional
        },
      },
    });
  } catch (error: any) {
    console.error('Error fetching visitors:', error);
    
    return NextResponse.json({
      success: true,
      data: {
        stats: {
          activeNow: 0,
          totalVisitors: 0,
          uniqueVisitors: 0,
          todayVisitors: 0,
          total: 0,
          unique: 0,
          today: 0,
          thisMonth: null,
        },
      },
    });
  }
}
