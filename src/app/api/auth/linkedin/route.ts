import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

// LinkedIn OAuth flow
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      new URL(`/admin?tab=content&error=linkedin_auth_failed`, request.url)
    )
  }

  if (!code) {
    const clientId = process.env.LINKEDIN_CLIENT_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://theorangecode.com'}/api/auth/linkedin`
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'LinkedIn Client ID not configured' },
        { status: 500 }
      )
    }

    const state = Math.random().toString(36).substring(7)
    await kv.setex(`linkedin_state_${state}`, 600, 'valid') // 10 minutes

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=w_member_social`
    
    return NextResponse.redirect(authUrl)
  }

  try {
    const clientId = process.env.LINKEDIN_CLIENT_ID
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://theorangecode.com'}/api/auth/linkedin`

    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId!,
        client_secret: clientSecret!,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.access_token) {
      await kv.setex('linkedin_access_token', tokenData.expires_in || 5184000, tokenData.access_token)
      
      return NextResponse.redirect(
        new URL(`/admin?tab=content&success=linkedin_connected`, request.url)
      )
    } else {
      return NextResponse.redirect(
        new URL(`/admin?tab=content&error=linkedin_token_failed`, request.url)
      )
    }
  } catch (error: any) {
    console.error('LinkedIn OAuth error:', error)
    return NextResponse.redirect(
      new URL(`/admin?tab=content&error=linkedin_auth_error`, request.url)
    )
  }
}

