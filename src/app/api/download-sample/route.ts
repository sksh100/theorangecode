import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const name = searchParams.get('name')
    const ebook = searchParams.get('ebook') || 'uk-to-uae'

    // Determine which sample PDF to serve
    let samplePath: string
    let fileName: string
    
    if (ebook === 'beyond-formalities') {
      samplePath = path.join(process.cwd(), 'protected', 'sample-beyond-formalities.pdf')
      fileName = 'Beyond-Formalities-Sample.pdf'
    } else {
      samplePath = path.join(process.cwd(), 'protected', 'sample-uk-uae-guide.pdf')
      fileName = 'UK-to-UAE-Cultural-Intelligence-Guide-Sample.pdf'
    }

    // Log the download
    console.log('📥 Sample PDF downloaded:', { name, email, ebook, timestamp: new Date().toISOString() })

    // Serve the sample PDF
    try {
      const fileBuffer = await fs.readFile(/*turbopackIgnore: true*/ samplePath)
      
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${fileName}"`,
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

