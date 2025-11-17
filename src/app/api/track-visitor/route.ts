// src/app/api/track-visitor/route.ts

import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

type VisitorPayload = {
  id: string;        // some unique id from client
  ip?: string | null;
  userAgent?: string | null;
  path?: string | null;
  ts: number;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<VisitorPayload>;

    const now = Date.now();
    const id = body.id ?? `anon:${now}`;

    const payload: VisitorPayload = {
      id,
      ip: body.ip ?? null,
      userAgent: body.userAgent ?? null,
      path: body.path ?? null,
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
    return NextResponse.json(
      { ok: false, error: String(error?.message ?? error) },
      { status: 500 }
    );
  }
}
