// src/app/api/track-visitor/route.ts

import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = 'force-dynamic'

type VisitorPayload = {
  id: string;        // some unique id from client
  ip?: string | null;
  userAgent?: string | null;
  path?: string | null;
  referrer?: string | null;
  country?: string | null;
  city?: string | null;
  ts: number;
};

export async function POST(req: Request) {
  try {
    // Check if Redis is configured - if not, just return success (graceful degradation)
    if (!process.env.UPSTASH_REDIS_REST_URL && !process.env.KV_REST_API_URL) {
      console.warn("Redis not configured - visitor tracking disabled");
      return NextResponse.json({ ok: true, message: "Tracking disabled - Redis not configured" });
    }

    const body = (await req.json()) as Partial<VisitorPayload>;

    const now = Date.now();
    const id = body.id ?? `anon:${now}`;

    // Get IP from headers if not provided
    const ip = body.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? null;

    const payload: VisitorPayload = {
      id,
      ip,
      userAgent: body.userAgent ?? null,
      path: body.path ?? null,
      referrer: body.referrer ?? null,
      country: body.country ?? null,
      city: body.city ?? null,
      ts: now,
    };

    const key = `active:${id}`;

    // store active visitor with TTL 60 seconds
    await redis.set(key, JSON.stringify(payload), { ex: 60 });

    // push into recent visitors list, keep only last 200
    await redis.lpush("visitors", JSON.stringify(payload));
    await redis.ltrim("visitors", 0, 199);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("track-visitor error", error);
    // Return success even on error to not break the page
    return NextResponse.json(
      { ok: true, error: String(error?.message ?? error) },
      { status: 200 }
    );
  }
}
