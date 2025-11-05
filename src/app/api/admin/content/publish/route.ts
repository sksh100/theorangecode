import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentId, platform } = body

    if (!contentId || !platform) {
      return NextResponse.json(
        { success: false, error: 'Content ID and platform are required' },
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

    // Here you would integrate with actual social media APIs
    // For now, we'll simulate posting
    let postResult = {
      success: false,
      postId: null,
      error: null,
    }

    try {
      // Simulate API call based on platform
      switch (platform.toLowerCase()) {
        case 'instagram':
          // Instagram Graph API integration would go here
          postResult = {
            success: true,
            postId: `ig_${Date.now()}`,
            error: null,
          }
          break
        case 'linkedin':
          // LinkedIn API integration would go here
          postResult = {
            success: true,
            postId: `li_${Date.now()}`,
            error: null,
          }
          break
        case 'pinterest':
          // Pinterest API integration would go here
          postResult = {
            success: true,
            postId: `pin_${Date.now()}`,
            error: null,
          }
          break
        case 'twitter':
        case 'x':
          // X (Twitter) API integration would go here
          postResult = {
            success: true,
            postId: `tw_${Date.now()}`,
            error: null,
          }
          break
        default:
          postResult = {
            success: false,
            postId: null,
            error: `Unsupported platform: ${platform}`,
          }
      }

      if (postResult.success) {
        // Update content status
        const updatedContent = {
          ...content,
          status: 'published',
          publishedDate: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        await kv.setex(`content:${contentId}`, 86400 * 365, JSON.stringify(updatedContent))
      }

      return NextResponse.json({
        success: postResult.success,
        data: {
          postId: postResult.postId,
          platform,
          contentId,
        },
        error: postResult.error,
      })
    } catch (error: any) {
      console.error(`Error posting to ${platform}:`, error)
      return NextResponse.json(
        {
          success: false,
          error: `Failed to post to ${platform}: ${error.message}`,
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error in publish route:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

