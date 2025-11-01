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
  timestamp?: string
  source?: string
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
    
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    
    console.log('📋 Google Sheets config check:', {
      hasServiceAccountKey: !!serviceAccountKey,
      hasSpreadsheetId: !!spreadsheetId,
      spreadsheetId: spreadsheetId ? `${spreadsheetId.substring(0, 10)}...` : 'missing'
    })
    
    if (!serviceAccountKey || !spreadsheetId) {
      console.log('⚠️ Google Sheets not configured - missing environment variables:', {
        hasServiceAccountKey: !!serviceAccountKey,
        hasSpreadsheetId: !!spreadsheetId
      })
      return false
    }
    
    try {
      // If it's already a string, parse it
      if (typeof serviceAccountKey === 'string') {
        credentials = JSON.parse(serviceAccountKey)
      } else {
        credentials = serviceAccountKey
      }
    } catch (parseError) {
      console.error('❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY:', parseError)
      return false
    }

    if (!credentials.private_key || !credentials.client_email) {
      console.log('❌ Google Sheets credentials incomplete:', {
        hasPrivateKey: !!credentials.private_key,
        hasClientEmail: !!credentials.client_email,
        hasProjectId: !!credentials.project_id
      })
      return false
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
    console.log('📝 Appending to sheet:', {
      spreadsheetId: spreadsheetId.substring(0, 10) + '...',
      range: 'The Orange Code Form Responses!A:E',
      data: { name: data.name, email: data.email, phone: data.phone }
    })
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'The Orange Code Form Responses!A:E',
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
      updatedCells: response.data.updates?.updatedCells,
      updatedRange: response.data.updates?.updatedRange
    })
    
    return true
  } catch (error: any) {
    console.error('❌ Google Sheets error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      details: error.response?.data || error.toString()
    })
    
    // Check if it's a permissions error
    if (error.message?.includes('permission') || error.code === 403) {
      console.error('💡 Make sure the service account email has edit access to the spreadsheet')
    }
    
    // Don't throw - allow submission to continue even if Sheets fails
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: FormData
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError)
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }
    
    console.log('📥 Received form data:', JSON.stringify(body, null, 2))
    
    // Validate required fields - now only email is required
    const { firstName, lastName, name, email, phone, eventDate, timestamp, source } = body || {}
    
    // Email is required
    if (!email || typeof email !== 'string' || !email.trim()) {
      console.log('❌ Validation failed: email missing or invalid', { email, type: typeof email })
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      console.log('❌ Email validation failed:', { email })
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Phone validation is optional - only validate if phone is provided
    // Don't block submission if phone is missing or invalid
    if (phone && phone.trim()) {
      const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '')
      // Only log a warning if phone seems invalid, but don't block submission
      if (cleanPhone.length < 5) {
        console.warn('⚠️ Phone number seems too short, but continuing:', { phone, cleanPhone, length: cleanPhone.length })
      }
    }
    
    // Create unique ID for this submission
    const submissionId = `luxury_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Prepare data for storage
    const displayName = name || `${firstName || ''} ${lastName || ''}`.trim() || 'Anonymous'
    const finalTimestamp = timestamp || new Date().toISOString()
    const finalSource = source || 'Coming Soon Page'
    
    const submissionData = {
      id: submissionId,
      firstName: firstName || '',
      lastName: lastName || '',
      name: displayName,
      email: email.trim(),
      phone: phone || '',
      eventDate: eventDate || '',
      timestamp: finalTimestamp,
      source: finalSource,
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      submittedAt: new Date().toISOString()
    }
    
    // Save to Google Sheets
    console.log('📊 Attempting to save to Google Sheets...')
    const sheetsSuccess = await appendToGoogleSheets({
      name: displayName,
      email: submissionData.email,
      phone: submissionData.phone,
      timestamp: submissionData.submittedAt,
      source: finalSource
    })
    
    if (sheetsSuccess) {
      console.log('✅ Successfully saved to Google Sheets')
    } else {
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
