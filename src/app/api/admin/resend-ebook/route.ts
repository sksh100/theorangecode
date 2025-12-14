import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, customerName, orderId, ebookType } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_DOMAIN || 'https://www.theorangecode.com'
    
    // Call the send-ebook API
    const response = await fetch(`${baseUrl}/api/send-ebook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        customerName: customerName || email.split('@')[0],
        orderId: orderId || 'manual-resend',
        ebookType: ebookType || 'beyond-formalities',
      }),
    })

    const data = await response.json()

    if (response.ok && data.success) {
      return NextResponse.json({
        success: true,
        message: `Ebook sent successfully to ${email}`,
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: data.error || 'Failed to send ebook',
          details: data.details
        },
        { status: response.status }
      )
    }
  } catch (error: any) {
    console.error('Error resending ebook:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to resend ebook',
      },
      { status: 500 }
    )
  }
}

