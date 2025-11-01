import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { google } from 'googleapis'

interface FormData {
  firstName?: string
  lastName?: string
  name?: string
  email: string
  phone?: string
  eventDate?: string
  timestamp: string
  source: string
}

async function appendToGoogleSheets(data: {
  name: string
  email: string
  timestamp: string
  source: string
}) {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}')
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!credentials.private_key || !spreadsheetId) {
      console.log('Google Sheets not configured, skipping...')
      return
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.timestamp,
          data.name || 'Anonymous',
          data.email,
          data.source
        ]],
      },
    })

    console.log('Data appended to Google Sheets successfully')
  } catch (error) {
    console.error('Google Sheets error:', error)
    // Don't throw - allow submission to continue even if Sheets fails
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json()
    
    // Validate required fields - now only email is required
    const { firstName, lastName, name, email, phone, eventDate, timestamp, source } = body
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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
    
    // Phone validation (optional)
    if (phone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
      if (!phoneRegex.test(cleanPhone)) {
        return NextResponse.json(
          { error: 'Invalid phone number format' },
          { status: 400 }
        )
      }
    }
    
    // Create unique ID for this submission
    const submissionId = `luxury_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Prepare data for storage
    const displayName = name || `${firstName || ''} ${lastName || ''}`.trim() || 'Anonymous'
    
    const submissionData = {
      id: submissionId,
      firstName: firstName || '',
      lastName: lastName || '',
      name: displayName,
      email,
      phone: phone || '',
      eventDate: eventDate || '',
      timestamp,
      source,
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      submittedAt: new Date().toISOString()
    }
    
    // Save to Google Sheets
    await appendToGoogleSheets({
      name: displayName,
      email,
      timestamp: submissionData.submittedAt,
      source
    })
    
    try {
      // Save to Vercel KV (Redis) if available
      if (kv) {
        await kv.set(`submission:${submissionId}`, submissionData)
        await kv.lpush('submissions:list', submissionId)
        await kv.sadd('submissions:emails', email)
        console.log('Form submission saved to Vercel KV:', submissionId)
      }
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
        name: displayName,
        email,
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
