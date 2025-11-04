import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { MailerLite } from '@mailerlite/mailerlite-nodejs'

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

async function addToMailerLite(data: {
  firstName?: string
  lastName?: string
  name: string
  email: string
  phone?: string
  timestamp: string
  source: string
}) {
  try {
    const apiKey = process.env.MAILERLITE_API_KEY
    const groupId = process.env.MAILERLITE_GROUP_ID
    
    console.log('📧 MailerLite config check:', {
      hasApiKey: !!apiKey,
      hasGroupId: !!groupId,
      groupId: groupId || 'missing'
    })
    
    if (!apiKey) {
      console.log('⚠️ MailerLite not configured - missing API key')
      return false
    }

    const mailerlite = new MailerLite({
      api_key: apiKey,
    })

    // Prepare subscriber data
    const subscriberData: any = {
      email: data.email,
      status: 'active', // Subscriber will be active and receive welcome email
      subscribed_at: data.timestamp || new Date().toISOString(),
      fields: {},
    }

    // Add name fields if available
    if (data.firstName) {
      subscriberData.fields.name = data.firstName
      subscriberData.fields.first_name = data.firstName
    }

    if (data.lastName) {
      subscriberData.fields.last_name = data.lastName
      if (subscriberData.fields.name) {
        subscriberData.fields.name = `${data.firstName} ${data.lastName}`
      }
    }

    // Add phone if available
    if (data.phone) {
      subscriberData.fields.phone = data.phone
    }

    // Add source/utm tracking
    subscriberData.fields.source = data.source

    // If group ID is provided, add subscriber to that group
    // This will trigger the welcome email automation if configured
    if (groupId) {
      subscriberData.groups = [groupId]
    }

    console.log('📝 Adding subscriber to MailerLite:', {
      email: data.email,
      groupId: groupId || 'none',
      hasName: !!data.name,
      hasPhone: !!data.phone
    })

    // Add subscriber to MailerLite (createOrUpdate will create if new, update if exists)
    const response = await mailerlite.subscribers.createOrUpdate(subscriberData)

    console.log('✅ Subscriber added to MailerLite successfully:', {
      email: data.email,
      subscriberId: response.data?.data?.id || 'unknown',
      groups: response.data?.data?.groups || []
    })
    
    return true
  } catch (error: any) {
    console.error('❌ MailerLite error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      details: error.response?.data || error.toString()
    })
    
    // Check if subscriber already exists (not an error, just informational)
    if (error.message?.includes('already exists') || error.response?.status === 409) {
      console.log('ℹ️ Subscriber already exists in MailerLite')
      // Still return true as this is not a failure
      return true
    }
    
    // Don't throw - allow submission to continue even if MailerLite fails
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
    
    // Email is required - be very lenient
    const emailStr = email ? String(email).trim() : ''
    if (!emailStr || emailStr.length === 0) {
      console.log('❌ Validation failed: email missing', { email, emailStr })
      return NextResponse.json(
        { error: 'Please enter your email address' },
        { status: 400 }
      )
    }
    
    // Email validation - simple check
    if (!emailStr.includes('@') || !emailStr.includes('.')) {
      console.log('❌ Email validation failed: invalid format', { email, emailStr })
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
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
    const displayName = (name || `${firstName || ''} ${lastName || ''}`.trim() || 'Anonymous').trim()
    const finalTimestamp = timestamp || new Date().toISOString()
    const finalSource = source || 'Coming Soon Page'
    const cleanEmail = emailStr
    const cleanPhone = phone ? String(phone).trim() : ''
    
    const submissionData = {
      id: submissionId,
      firstName: firstName || '',
      lastName: lastName || '',
      name: displayName,
      email: cleanEmail,
      phone: cleanPhone,
      eventDate: eventDate || '',
      timestamp: finalTimestamp,
      source: finalSource,
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      submittedAt: new Date().toISOString()
    }
    
    // Save to MailerLite
    console.log('📧 Attempting to add subscriber to MailerLite...', { name: displayName, email: cleanEmail, phone: cleanPhone })
    const mailerliteSuccess = await addToMailerLite({
      firstName: firstName || '',
      lastName: lastName || '',
      name: displayName,
      email: cleanEmail,
      phone: cleanPhone,
      timestamp: submissionData.submittedAt,
      source: finalSource
    })
    
    if (mailerliteSuccess) {
      console.log('✅ Successfully added subscriber to MailerLite')
    } else {
      console.warn('⚠️ MailerLite add failed, but submission will continue')
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
