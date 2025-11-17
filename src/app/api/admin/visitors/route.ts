// src/app/api/admin/visitors/route.ts

import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

type VisitorPayload = {
  id: string;
  ip?: string | null;
  userAgent?: string | null;
  path?: string | null;
  ts: number;
};

export async function GET() {
  try {
    // active visitors
    const keys = await redis.keys("active:*");
    const activeVisitors: VisitorPayload[] = [];

    for (const key of keys) {
      const data = await redis.get<string>(key);
      if (data) {
        try {
          activeVisitors.push(JSON.parse(data) as VisitorPayload);
        } catch {
          // ignore parse errors
        }
      }
    }

    // recent visitors
    const recentRaw = (await redis.lrange("visitors", 0, 50)) as string[];
    const recentVisitors: VisitorPayload[] = [];

    for (const item of recentRaw ?? []) {
      try {
        recentVisitors.push(JSON.parse(item) as VisitorPayload);
      } catch {
        // ignore
      }
    }

    return NextResponse.json({ ok: true, activeVisitors, recentVisitors });
  } catch (error: any) {
    console.error("admin/visitors error", error);
    return NextResponse.json(
      { ok: false, error: String(error?.message ?? error) },
      { status: 500 }
    );
  }
}
