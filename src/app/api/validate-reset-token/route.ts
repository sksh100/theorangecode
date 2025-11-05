import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    // Check if token exists and is valid
    try {
      const tokenData = await kv.get(`reset-token:${token}`)
      
      if (!tokenData) {
        return NextResponse.json({ valid: false })
      }

      const data = typeof tokenData === 'string' ? JSON.parse(tokenData) : tokenData
      
      // Check if token has expired
      if (data.expiresAt && Date.now() > data.expiresAt) {
        // Clean up expired token
        await kv.del(`reset-token:${token}`)
        return NextResponse.json({ valid: false })
      }

      return NextResponse.json({ valid: true, email: data.email })
    } catch (kvError) {
      console.error('❌ KV storage error:', kvError)
      return NextResponse.json({ valid: false })
    }
  } catch (error: any) {
    console.error('❌ Validate token error:', error)
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}

