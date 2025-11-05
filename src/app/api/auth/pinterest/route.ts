import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

// Pinterest OAuth flow
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      new URL(`/admin?tab=content&error=pinterest_auth_failed`, request.url)
    )
  }

  if (!code) {
    const appId = process.env.PINTEREST_APP_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://theorangecode.com'}/api/auth/pinterest`
    
    if (!appId) {
      return NextResponse.json(
        { error: 'Pinterest App ID not configured' },
        { status: 500 }
      )
    }

    const state = Math.random().toString(36).substring(7)
    await kv.setex(`pinterest_state_${state}`, 600, 'valid')

    const authUrl = `https://www.pinterest.com/oauth/?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=boards:read,pins:read,pins:write&state=${state}`
    
    return NextResponse.redirect(authUrl)
  }

  try {
    const appId = process.env.PINTEREST_APP_ID
    const appSecret = process.env.PINTEREST_APP_SECRET
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://theorangecode.com'}/api/auth/pinterest`

    const tokenResponse = await fetch('https://api.pinterest.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${appId}:${appSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.access_token) {
      await kv.setex('pinterest_access_token', 86400 * 90, tokenData.access_token) // 90 days
      
      return NextResponse.redirect(
        new URL(`/admin?tab=content&success=pinterest_connected`, request.url)
      )
    } else {
      return NextResponse.redirect(
        new URL(`/admin?tab=content&error=pinterest_token_failed`, request.url)
      )
    }
  } catch (error: any) {
    console.error('Pinterest OAuth error:', error)
    return NextResponse.redirect(
      new URL(`/admin?tab=content&error=pinterest_auth_error`, request.url)
    )
  }
}

