import { NextResponse } from 'next/server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(
      'RESEND key used (first 8 chars):',
      process.env.RESEND_API_KEY?.slice(0, 8)
    );

    const { error } = await resend.emails.send({
      from: 'The Orange Code <contact@theorangecode.com>', // pretty sender
      to: ['hello@theorangecode.com'],                      // real inbox
      reply_to: email,
      subject: `New contact form message: ${subject}`,
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Email send failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'sent' }, { status: 200 });

  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
