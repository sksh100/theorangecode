import webPush from "web-push";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const privateKey = process.env.VAPID_PRIVATE_KEY!;
const subject = process.env.VAPID_SUBJECT || "mailto:admin@theorangecode.com";

if (publicKey && privateKey) {
  webPush.setVapidDetails(subject, publicKey, privateKey);
}

export async function sendPushToAll(payload: { title: string; body: string; url?: string }) {
  if (!publicKey || !privateKey) {
    console.warn("[webPush] VAPID keys not configured, skipping push notification");
    return;
  }

  try {
    const subs = await redis.lrange<string>("push:subs", 0, -1);
    const data = JSON.stringify({
      title: payload.title,
      body: payload.body,
      data: { url: payload.url || "/admin/mobile" }
    });

    for (const raw of subs) {
      try {
        const sub = JSON.parse(raw);
        await webPush.sendNotification(sub, data);
      } catch (err: any) {
        console.error("[webPush] error sending to one subscription", err?.message || err);
      }
    }
  } catch (err: any) {
    console.error("[webPush] error", err?.message || err);
  }
}

