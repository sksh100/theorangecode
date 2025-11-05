import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

// Instagram OAuth flow
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  // If error, redirect back to admin with error
  if (error) {
    return NextResponse.redirect(
      new URL(`/admin?tab=content&error=instagram_auth_failed`, request.url)
    )
  }

  // If no code, initiate OAuth flow
  if (!code) {
    const clientId = process.env.INSTAGRAM_APP_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://theorangecode.com'}/api/auth/instagram`
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Instagram App ID not configured' },
        { status: 500 }
      )
    }

    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user_profile,user_media&response_type=code`
    
    return NextResponse.redirect(authUrl)
  }

  // Exchange code for access token
  try {
    const clientId = process.env.INSTAGRAM_APP_ID
    const clientSecret = process.env.INSTAGRAM_APP_SECRET
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://theorangecode.com'}/api/auth/instagram`

    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.access_token) {
      // Store access token
      await kv.setex('instagram_access_token', 86400 * 60, tokenData.access_token) // 60 days
      
      return NextResponse.redirect(
        new URL(`/admin?tab=content&success=instagram_connected`, request.url)
      )
    } else {
      return NextResponse.redirect(
        new URL(`/admin?tab=content&error=instagram_token_failed`, request.url)
      )
    }
  } catch (error: any) {
    console.error('Instagram OAuth error:', error)
    return NextResponse.redirect(
      new URL(`/admin?tab=content&error=instagram_auth_error`, request.url)
    )
  }
}

