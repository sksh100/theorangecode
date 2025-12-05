import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Path to the protected PDF file
    const pdfPath = join(process.cwd(), 'protected', 'uk-uae-guide-flattened.pdf')
    
    // Read the PDF file
    const pdfBuffer = await readFile(pdfPath)
    
    // Return the PDF with appropriate headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="UK-to-UAE-Cultural-Intelligence-Guide.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Error serving PDF:', error)
    return NextResponse.json(
      { error: 'PDF not found or error reading file' },
      { status: 404 }
    )
  }
}

