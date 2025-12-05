import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Log the sample request (you can add this to a database if needed)
    console.log('📥 Ebook sample requested:', { name, email, timestamp: new Date().toISOString() })

    // Check if sample PDF exists
    const samplePath = path.join(process.cwd(), 'protected', 'sample-uk-uae-guide.pdf')
    
    try {
      await fs.access(samplePath)
    } catch {
      // Sample PDF doesn't exist yet - return a message
      return NextResponse.json(
        { 
          error: 'Sample PDF not available yet. Please contact us at hello@theorangecode.com',
          downloadUrl: null
        },
        { status: 404 }
      )
    }

    // Generate a temporary download URL (valid for 1 hour)
    // In production, you might want to use a signed URL or token-based system
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_DOMAIN || 'https://www.theorangecode.com'
    const downloadUrl = `${baseUrl}/api/download-sample?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`

    return NextResponse.json({
      success: true,
      downloadUrl,
      message: 'Sample ready for download'
    })

  } catch (error: any) {
    console.error('❌ Error processing ebook sample request:', error)
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

