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

    const { error } = await resend.emails.send({
      // MUST match the verified domain: contact.theorangecode.com
      from: 'The Orange Code <noreply@contact.theorangecode.com>',
      // Your real inbox
      to: ['hello@theorangecode.com'],
      // So when you click Reply, it goes to the visitor
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
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ message: 'sent' }, { status: 200 });

  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
