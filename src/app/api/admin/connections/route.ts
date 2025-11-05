import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const [instagram, linkedin, pinterest, twitter] = await Promise.all([
      kv.get('instagram_access_token'),
      kv.get('linkedin_access_token'),
      kv.get('pinterest_access_token'),
      kv.get('twitter_access_token'),
    ])

    return NextResponse.json({
      success: true,
      data: {
        instagram: { connected: !!instagram },
        linkedin: { connected: !!linkedin },
        pinterest: { connected: !!pinterest },
        twitter: { connected: !!twitter },
      },
    })
  } catch (error: any) {
    console.error('Error fetching connections:', error)
    return NextResponse.json({
      success: true,
      data: {
        instagram: { connected: false },
        linkedin: { connected: false },
        pinterest: { connected: false },
        twitter: { connected: false },
      },
    })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const platform = searchParams.get('platform')

    if (!platform) {
      return NextResponse.json(
        { success: false, error: 'Platform is required' },
        { status: 400 }
      )
    }

    const keys = {
      instagram: 'instagram_access_token',
      linkedin: 'linkedin_access_token',
      pinterest: 'pinterest_access_token',
      twitter: 'twitter_access_token',
    }

    const key = keys[platform as keyof typeof keys]
    if (key) {
      await kv.del(key)
      if (platform === 'twitter') {
        await kv.del('twitter_refresh_token')
      }
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error('Error disconnecting:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

