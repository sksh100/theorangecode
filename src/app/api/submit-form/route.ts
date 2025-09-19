import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

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
    
    // Create unique ID for this submission
    const submissionId = `luxury_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Prepare data for storage
    const submissionData = {
      id: submissionId,
      firstName,
      lastName,
      email,
      phone,
      eventDate,
      timestamp,
      source,
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      submittedAt: new Date().toISOString()
    }
    
    try {
      // Save to Vercel KV (Redis)
      await kv.set(`submission:${submissionId}`, submissionData)
      
      // Add to submissions list for easy retrieval
      await kv.lpush('submissions:list', submissionId)
      
      // Add email to unique emails set (to track unique users)
      await kv.sadd('submissions:emails', email)
      
      console.log('Form submission saved to Vercel KV:', submissionId)
      
    } catch (kvError) {
      console.error('KV storage error:', kvError)
      // Continue with success response even if KV fails
    }
    
    // Log the submission
    console.log('Form submission received:', submissionData)
    
    return NextResponse.json({
      success: true,
      message: 'Interest registered successfully',
      data: {
        id: submissionId,
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
