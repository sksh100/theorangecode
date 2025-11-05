import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

// Twitter/X OAuth 2.0 flow
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      new URL(`/admin?tab=content&error=twitter_auth_failed`, request.url)
    )
  }

  if (!code) {
    const clientId = process.env.TWITTER_CLIENT_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://theorangecode.com'}/api/auth/twitter`
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Twitter Client ID not configured' },
        { status: 500 }
      )
    }

    const state = Math.random().toString(36).substring(7)
    const codeVerifier = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const codeChallenge = await sha256(codeVerifier)
      .then(hash => Buffer.from(hash).toString('base64url'))
    
    await kv.setex(`twitter_code_verifier_${state}`, 600, codeVerifier)

    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`
    
    return NextResponse.redirect(authUrl)
  }

  try {
    const clientId = process.env.TWITTER_CLIENT_ID
    const clientSecret = process.env.TWITTER_CLIENT_SECRET
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://theorangecode.com'}/api/auth/twitter`
    const state = searchParams.get('state')
    
    const codeVerifier = state ? await kv.get(`twitter_code_verifier_${state}`) : null
    if (state && codeVerifier) {
      await kv.del(`twitter_code_verifier_${state}`)
    }

    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        code: code,
        grant_type: 'authorization_code',
        client_id: clientId!,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier as string || '',
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.access_token) {
      await kv.setex('twitter_access_token', 86400 * 90, tokenData.access_token)
      if (tokenData.refresh_token) {
        await kv.setex('twitter_refresh_token', 86400 * 90, tokenData.refresh_token)
      }
      
      return NextResponse.redirect(
        new URL(`/admin?tab=content&success=twitter_connected`, request.url)
      )
    } else {
      return NextResponse.redirect(
        new URL(`/admin?tab=content&error=twitter_token_failed`, request.url)
      )
    }
  } catch (error: any) {
    console.error('Twitter OAuth error:', error)
    return NextResponse.redirect(
      new URL(`/admin?tab=content&error=twitter_auth_error`, request.url)
    )
  }
}

async function sha256(message: string): Promise<ArrayBuffer> {
  const msgBuffer = new TextEncoder().encode(message)
  return await crypto.subtle.digest('SHA-256', msgBuffer)
}

