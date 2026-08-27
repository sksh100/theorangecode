import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { notifyContactForm, notifyError } from "@/lib/slack";
import { redis } from "@/lib/redis";

// Lazy initialization to avoid build-time errors
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
};

async function loadVisitorContext(sessionId?: string | null) {
  if (!sessionId) return null;
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL && !process.env.KV_REST_API_URL) {
      return null;
    }
    const raw = await redis.get(`visitor:context:${sessionId}`);
    if (!raw) return null;
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (err) {
    console.warn('⚠️ Could not load visitor context for contact Slack:', err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, subject, message, sessionId, page } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Helpful debug: you can see this in Vercel runtime logs
    console.log(
      "Using RESEND_API_KEY first 8 chars:",
      process.env.RESEND_API_KEY?.slice(0, 8)
    );

    const resend = getResend();
    const { error } = await resend.emails.send({
      from: "The Orange Code <contact@theorangecode.com>",
      to: ["hello@theorangecode.com", "sksh.ae100@gmail.com"], // Send to both inboxes
      reply_to: email,
      subject: `New contact form message: ${subject}`,
      html: `
    <h2>New contact form message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `,
    });

    if (error) {
      console.error("Resend error:", error);
      
      // Notify about email sending error
      notifyError({
        message: `Contact form email send failed: ${error.message || 'Unknown error'}`,
        url: '/api/contact',
      }).catch(err => console.error("Failed to notify error:", err));
      
      return NextResponse.json(
        { error: "Email send failed", details: error },
        { status: 500 }
      );
    }

    const visitor = await loadVisitorContext(sessionId);
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      undefined;

    // Send Slack notification (don't wait for it, fire and forget)
    console.log("📢 Attempting to send Slack notification for contact form...");
    notifyContactForm({
      name,
      email,
      phone,
      subject,
      message,
      sessionId: sessionId || undefined,
      page: page || visitor?.page || undefined,
      country: visitor?.country,
      city: visitor?.city,
      area: visitor?.area,
      region: visitor?.region,
      postalCode: visitor?.postalCode,
      ip: visitor?.ip || ip,
      lat: visitor?.lat,
      lng: visitor?.lng,
      timezone: visitor?.timezone,
      isp: visitor?.isp,
      device: visitor?.device,
      browser: visitor?.browser,
      source: visitor?.source,
      referrerDomain: visitor?.referrerDomain,
      searchQuery: visitor?.searchQuery,
      utmParams: visitor?.utmParams,
      navigationFlow: visitor?.navigationFlow,
      sessionDuration: visitor?.sessionDuration,
      visitCount: visitor?.visitCount,
      language: visitor?.language,
    })
      .then(() => console.log("✅ Slack notification sent successfully"))
      .catch((err) => console.error("❌ Slack notification failed:", err));

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (err: any) {
    console.error("Contact route error:", err);
    
    // Notify about critical error
    notifyError({
      message: `Contact form API error: ${err.message || 'Unknown error'}`,
      stack: err.stack,
      url: '/api/contact',
    }).catch(slackErr => console.error("Failed to notify error:", slackErr));
    
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
