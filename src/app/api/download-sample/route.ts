import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const name = searchParams.get('name')

    if (!email || !name) {
      return new NextResponse('Missing required parameters', { status: 400 })
    }

    // Log the download
    console.log('📥 Sample PDF downloaded:', { name, email, timestamp: new Date().toISOString() })

    // Serve the sample PDF
    const samplePath = path.join(process.cwd(), 'protected', 'sample-uk-uae-guide.pdf')
    
    try {
      const fileBuffer = await fs.readFile(samplePath)
      
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="UK-to-UAE-Cultural-Intelligence-Guide-Sample.pdf"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      })
    } catch (fileError: any) {
      console.error('❌ Error reading sample PDF:', fileError)
      return new NextResponse('Sample PDF not found', { status: 404 })
    }

  } catch (error: any) {
    console.error('❌ Error serving sample PDF:', error)
    return new NextResponse('Server error', { status: 500 })
  }
}

