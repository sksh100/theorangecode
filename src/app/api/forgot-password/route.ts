import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import crypto from 'crypto'

// In production, use an email service like Resend, SendGrid, or AWS SES
async function sendPasswordResetEmail(email: string, resetLink: string) {
  // For development: Log the email (in production, use a real email service)
  console.log('📧 Password Reset Email:')
  console.log('To:', email)
  console.log('Reset Link:', resetLink)
  console.log('---')
  
  // TODO: Replace with actual email service integration
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'noreply@theorangecode.com',
  //   to: email,
  //   subject: 'Reset Your Password - The Orange Code',
  //   html: `...`
  // })
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validation
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    const emailLower = email.trim().toLowerCase()
    
    if (!emailLower.includes('@') || !emailLower.includes('.')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = Date.now() + 3600000 // 1 hour from now

    // Store reset token in KV (or your database)
    // Format: reset-token:{token} -> { email, expiresAt }
    try {
      await kv.setex(
        `reset-token:${resetToken}`,
        3600, // 1 hour TTL
        JSON.stringify({
          email: emailLower,
          expiresAt,
        })
      )
    } catch (kvError) {
      console.error('❌ KV storage error:', kvError)
      // Fallback: store in memory (not recommended for production)
      // In production, ensure KV is properly configured
    }

    // Generate reset link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}`

    // Send reset email
    try {
      await sendPasswordResetEmail(emailLower, resetLink)
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError)
      // Don't fail the request if email fails - token is still valid
      // In production, you might want to handle this differently
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      message: 'If an account exists with that email, a password reset link has been sent.',
      // In development, return the link for testing
      ...(process.env.NODE_ENV === 'development' && {
        resetLink, // Only in development!
      }),
    })
  } catch (error: any) {
    console.error('❌ Forgot password error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

