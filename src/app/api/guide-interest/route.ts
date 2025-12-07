import { NextRequest, NextResponse } from 'next/server'
import { addToMailerLite } from '@/lib/mailerlite'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { guideKey, name, email, guideName } = body

    if (!guideKey || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Add to MailerLite with guide tag
    const mailerLiteResult = await addToMailerLite({
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      name: name,
      email: email,
      timestamp: new Date().toISOString(),
      source: `guide-interest-${guideKey}`,
      tags: [`guide-${guideKey}`, 'guide-interest']
    })

    if (!mailerLiteResult.success) {
      console.error('MailerLite error:', mailerLiteResult.error)
      // Still return success to user, but log the error
    }

    return NextResponse.json({
      success: true,
      message: 'Interest registered successfully'
    })
  } catch (error: any) {
    console.error('Guide interest registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register interest', message: error.message },
      { status: 500 }
    )
  }
}

