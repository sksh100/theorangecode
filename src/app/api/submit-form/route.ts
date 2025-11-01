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
  phone?: string
}) {
  try {
    // Try to parse the credentials - handle both string and object format
    let credentials: any = {}
    
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      try {
        // If it's already a string, parse it
        if (typeof process.env.GOOGLE_SERVICE_ACCOUNT_KEY === 'string') {
          credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
        } else {
          credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
        }
      } catch (parseError) {
        console.error('Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY:', parseError)
        return
      }
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!credentials.private_key || !spreadsheetId) {
      console.log('Google Sheets not configured:', {
        hasPrivateKey: !!credentials.private_key,
        hasSpreadsheetId: !!spreadsheetId,
        hasCredentials: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY
      })
      return
    }

    // Handle escaped newlines in private key (common when storing in env vars)
    const privateKey = credentials.private_key.replace(/\\n/g, '\n')

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: privateKey,
        project_id: credentials.project_id,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    
    // Append data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'The Orange Code Form Responses!A:E', // Updated to use correct sheet name
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.timestamp,
          data.name || 'Anonymous',
          data.email,
          data.phone || '',
          data.source
        ]],
      },
    })

    console.log('✅ Data appended to Google Sheets successfully:', {
      spreadsheetId,
      updatedCells: response.data.updates?.updatedCells,
      updatedRange: response.data.updates?.updatedRange
    })
    
    return true
  } catch (error: any) {
    console.error('❌ Google Sheets error:', {
      message: error.message,
      code: error.code,
      details: error.response?.data || error.toString()
    })
    // Don't throw - allow submission to continue even if Sheets fails
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json()
    
    console.log('Received form data:', body)
    
    // Validate required fields - now only email is required
    const { firstName, lastName, name, email, phone, eventDate, timestamp, source } = body
    
    if (!email || !email.trim()) {
      console.log('Validation failed: email missing')
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
    
    // Phone validation (optional - be more lenient)
    if (phone) {
      // Remove all non-digit characters except + for validation
      const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '')
      // Just check it has at least 7 digits and starts with + or digit
      if (cleanPhone.length < 7 || (!cleanPhone.match(/^\+?[\d]{7,}$/))) {
        console.log('Phone validation failed:', { phone, cleanPhone })
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
    const sheetsSuccess = await appendToGoogleSheets({
      name: displayName,
      email,
      phone: submissionData.phone,
      timestamp: submissionData.submittedAt,
      source
    })
    
    if (!sheetsSuccess) {
      console.warn('⚠️ Google Sheets append failed, but submission will continue')
    }
    
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
