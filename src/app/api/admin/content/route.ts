import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

interface ContentPost {
  id: string
  caption: string
  hashtags: string[]
  altText: string
  mediaUrl?: string
  platforms: string[]
  scheduledDate?: string
  publishedDate?: string
  status: 'draft' | 'scheduled' | 'published'
  location?: string
  tags?: string
  createdAt: string
  updatedAt: string
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || 'all'

    // Get all content IDs
    const contentIds = await kv.zrange('content:list', 0, -1, { rev: true })

    const allContent: ContentPost[] = []

    for (const id of contentIds) {
      try {
        const contentData = await kv.get(`content:${id}`)
        if (contentData) {
          const content = JSON.parse(contentData as string)
          if (status === 'all' || content.status === status) {
            allContent.push(content)
          }
        }
      } catch (error) {
        console.error(`Error fetching content ${id}:`, error)
      }
    }

    // Sort by scheduled date or created date
    allContent.sort((a, b) => {
      const dateA = a.scheduledDate || a.createdAt
      const dateB = b.scheduledDate || b.createdAt
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })

    return NextResponse.json({
      success: true,
      data: {
        content: allContent,
      },
    })
  } catch (error: any) {
    console.error('Error fetching content:', error)
    return NextResponse.json({
      success: true,
      data: {
        content: [],
      },
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      caption,
      hashtags,
      altText,
      mediaUrl,
      platforms,
      scheduledDate,
      status = 'draft',
      location,
      tags,
    } = body

    if (!caption || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Caption and platforms are required' },
        { status: 400 }
      )
    }

    const id = `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    const content: ContentPost = {
      id,
      caption,
      hashtags: Array.isArray(hashtags) ? hashtags : hashtags.split(',').map((h: string) => h.trim()).filter(Boolean),
      altText: altText || '',
      mediaUrl: mediaUrl || '',
      platforms: Array.isArray(platforms) ? platforms : [platforms],
      scheduledDate: scheduledDate || undefined,
      publishedDate: undefined,
      status: status || 'draft',
      location: location || undefined,
      tags: tags || undefined,
      createdAt: now,
      updatedAt: now,
    }

    // Store content
    await kv.setex(`content:${id}`, 86400 * 365, JSON.stringify(content)) // Store for 1 year

    // Add to content list
    await kv.zadd('content:list', { score: Date.now(), member: id })

    return NextResponse.json({
      success: true,
      data: { content },
    })
  } catch (error: any) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Content ID is required' },
        { status: 400 }
      )
    }

    // Get existing content
    const contentData = await kv.get(`content:${id}`)
    if (!contentData) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      )
    }

    const existingContent = JSON.parse(contentData as string)
    const updatedContent = {
      ...existingContent,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    // Update content
    await kv.setex(`content:${id}`, 86400 * 365, JSON.stringify(updatedContent))

    return NextResponse.json({
      success: true,
      data: { content: updatedContent },
    })
  } catch (error: any) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Content ID is required' },
        { status: 400 }
      )
    }

    // Delete content
    await kv.del(`content:${id}`)
    await kv.zrem('content:list', id)

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

