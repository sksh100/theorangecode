import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const contentId = searchParams.get('id')

    if (!contentId) {
      return NextResponse.json(
        { success: false, error: 'Content ID is required' },
        { status: 400 }
      )
    }

    // Get content
    const contentData = await kv.get(`content:${contentId}`)
    if (!contentData) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      )
    }

    const content = JSON.parse(contentData as string)

    // Format preview for each platform
    const previews = {
      instagram: {
        image: content.mediaUrl || content.unsplashImage?.url,
        caption: `${content.caption}\n\n${content.hashtags.map((h: string) => `#${h}`).join(' ')}`,
        attribution: content.unsplashImage 
          ? `\n\n${content.unsplashImage.attributionText}\n${content.unsplashImage.unsplashUrl}`
          : '',
      },
      linkedin: {
        image: content.mediaUrl || content.unsplashImage?.url,
        text: content.caption,
        hashtags: content.hashtags,
        attribution: content.unsplashImage
          ? `\n\nPhoto by ${content.unsplashImage.photographer.name} on Unsplash: ${content.unsplashImage.unsplashUrl}`
          : '',
      },
      twitter: {
        image: content.mediaUrl || content.unsplashImage?.url,
        text: content.caption.substring(0, 280), // Twitter character limit
        hashtags: content.hashtags.slice(0, 5), // Limit hashtags for Twitter
        attribution: content.unsplashImage
          ? `\n\nPhoto: ${content.unsplashImage.unsplashUrl}`
          : '',
      },
      pinterest: {
        image: content.mediaUrl || content.unsplashImage?.url,
        description: content.caption,
        hashtags: content.hashtags,
        attribution: content.unsplashImage
          ? `\n\nPhoto by ${content.unsplashImage.photographer.name} on Unsplash`
          : '',
      },
    }

    return NextResponse.json({
      success: true,
      data: {
        content,
        previews,
        unsplashAttribution: content.unsplashImage ? {
          text: content.unsplashImage.attributionText,
          photographer: content.unsplashImage.photographer.name,
          photographerLink: content.unsplashImage.photographer.profileUrl,
          unsplashLink: content.unsplashImage.unsplashUrl,
        } : null,
      },
    })
  } catch (error: any) {
    console.error('Error fetching content preview:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch preview',
      },
      { status: 500 }
    )
  }
}

