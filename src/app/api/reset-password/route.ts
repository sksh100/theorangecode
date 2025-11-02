import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import crypto from 'crypto'

// Hash password (in production, use bcrypt or similar)
function hashPassword(password: string): string {
  // For demo purposes, using a simple hash
  // In production, use: bcrypt.hash(password, 10)
  return crypto.createHash('sha256').update(password + 'salt').digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, newPassword } = body

    // Validation
    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Reset token is required' },
        { status: 400 }
      )
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.trim().length === 0) {
      return NextResponse.json(
        { error: 'New password is required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Validate and retrieve token
    let tokenData
    try {
      const stored = await kv.get(`reset-token:${token}`)
      
      if (!stored) {
        return NextResponse.json(
          { error: 'Invalid or expired reset token' },
          { status: 400 }
        )
      }

      tokenData = typeof stored === 'string' ? JSON.parse(stored) : stored
      
      // Check if token has expired
      if (tokenData.expiresAt && Date.now() > tokenData.expiresAt) {
        await kv.del(`reset-token:${token}`)
        return NextResponse.json(
          { error: 'Reset token has expired. Please request a new one.' },
          { status: 400 }
        )
      }
    } catch (kvError) {
      console.error('❌ KV storage error:', kvError)
      return NextResponse.json(
        { error: 'Failed to validate reset token' },
        { status: 500 }
      )
    }

    const email = tokenData.email

    // Hash the new password
    const hashedPassword = hashPassword(newPassword)

    // Save password (in production, save to your database)
    // For now, save to localStorage via client, or save to KV
    try {
      // Store password hash associated with email
      // In production, this would be saved to your user database
      await kv.set(
        `user-password:${email}`,
        hashedPassword,
        { ex: 0 } // No expiration - password is permanent
      )

      // Delete the reset token after successful password reset
      await kv.del(`reset-token:${token}`)

      console.log('✅ Password reset successful for:', email)
    } catch (saveError) {
      console.error('❌ Failed to save password:', saveError)
      return NextResponse.json(
        { error: 'Failed to save new password. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Password has been successfully reset. You can now log in with your new password.',
    })
  } catch (error: any) {
    console.error('❌ Reset password error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

