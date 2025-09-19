import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(request: NextRequest) {
  try {
    // Get all submission IDs
    const submissionIds = await kv.lrange('submissions:list', 0, -1)
    
    // Get all submissions
    const submissions = []
    for (const id of submissionIds) {
      const submission = await kv.get(`submission:${id}`)
      if (submission) {
        submissions.push(submission)
      }
    }
    
    // Get unique email count
    const uniqueEmails = await kv.scard('submissions:emails')
    
    return NextResponse.json({
      success: true,
      data: {
        submissions,
        totalSubmissions: submissions.length,
        uniqueEmails,
        lastUpdated: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Clear all submissions (admin function)
    const submissionIds = await kv.lrange('submissions:list', 0, -1)
    
    // Delete all submission records
    for (const id of submissionIds) {
      await kv.del(`submission:${id}`)
    }
    
    // Clear the lists
    await kv.del('submissions:list')
    await kv.del('submissions:emails')
    
    return NextResponse.json({
      success: true,
      message: 'All submissions cleared'
    })
    
  } catch (error) {
    console.error('Error clearing submissions:', error)
    return NextResponse.json(
      { error: 'Failed to clear submissions' },
      { status: 500 }
    )
  }
}
