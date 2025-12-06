import { NextResponse } from "next/server";
import { Resend } from "resend";
import { notifyContactForm, notifyError } from "@/lib/slack";

// Lazy initialization to avoid build-time errors
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, subject, message } = body;

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

    // Send Slack notification (don't wait for it, fire and forget)
    console.log("📢 Attempting to send Slack notification for contact form...");
    notifyContactForm({ name, email, phone, subject, message })
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
