import { NextResponse } from "next/server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { name, email, phone, subject, message } = data;

    const html = `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.5;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p style="margin-top: 20px;"><strong>Message:</strong><br/>${message}</p>
      </div>
    `;

    const response = await resend.emails.send({
      from: "The Orange Code <contact@theorangecode.com>",
      to: ["hello@theorangecode.com"],
      subject: `New Contact Form Inquiry – ${subject}`,
      html,
    });

    return NextResponse.json(
      { success: true, response },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    );
  }
}
