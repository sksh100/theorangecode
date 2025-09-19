import { NextRequest, NextResponse } from 'next/server'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  eventDate: string
  timestamp: string
  source: string
}

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json()
    
    // Validate required fields
    const { firstName, lastName, email, phone, eventDate, timestamp, source } = body
    
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }
    
    // Log the submission (in production, you'd save to a database)
    console.log('Form submission received:', {
      firstName,
      lastName,
      email,
      phone,
      eventDate,
      timestamp,
      source,
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    })
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to mailing list
    // 4. Send notification to admin
    
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Interest registered successfully',
      data: {
        id: `luxury_${Date.now()}`,
        firstName,
        lastName,
        email,
        eventDate,
        registeredAt: timestamp
      }
    })
    
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
