import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentIds, approveAll } = body

    if (!contentIds && !approveAll) {
      return NextResponse.json(
        { success: false, error: 'Content IDs or approveAll flag is required' },
        { status: 400 }
      )
    }

    let idsToApprove: string[] = []

    if (approveAll) {
      // Get all content with status 'ready_for_review'
      const allContentIds = await kv.zrange('content:list', 0, -1)
      
      for (const id of allContentIds) {
        try {
          const contentData = await kv.get(`content:${id}`)
          if (contentData) {
            const content = JSON.parse(contentData as string)
            if (content.status === 'ready_for_review') {
              idsToApprove.push(id as string)
            }
          }
        } catch (error) {
          console.error(`Error checking content ${id}:`, error)
        }
      }
    } else {
      idsToApprove = Array.isArray(contentIds) ? contentIds : [contentIds]
    }

    const approved: string[] = []
    const errors: Array<{ id: string; error: string }> = []

    for (const id of idsToApprove) {
      try {
        const contentData = await kv.get(`content:${id}`)
        if (!contentData) {
          errors.push({ id, error: 'Content not found' })
          continue
        }

        const content = JSON.parse(contentData as string)
        
        if (content.status !== 'ready_for_review') {
          errors.push({ id, error: `Content status is ${content.status}, not ready_for_review` })
          continue
        }

        // Update status to approved
        const updatedContent = {
          ...content,
          status: 'approved',
          approvedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        await kv.setex(`content:${id}`, 86400 * 365, JSON.stringify(updatedContent))
        approved.push(id)
      } catch (error: any) {
        console.error(`Error approving content ${id}:`, error)
        errors.push({ id, error: error.message })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        approved,
        approvedCount: approved.length,
        errors: errors.length > 0 ? errors : undefined,
      },
      message: `Successfully approved ${approved.length} post(s). ${errors.length > 0 ? `Errors: ${errors.length}` : ''}`,
    })
  } catch (error: any) {
    console.error('Error approving content:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to approve content',
      },
      { status: 500 }
    )
  }
}

