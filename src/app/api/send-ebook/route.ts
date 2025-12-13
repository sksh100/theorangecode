import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { notifyEbookDelivery } from '@/lib/slack'

// Lazy initialization to avoid build-time errors
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

export const dynamic = 'force-dynamic'

interface EbookDeliveryRequest {
  email: string
  customerName?: string
  orderId?: string
  downloadToken?: string
  ebookType?: 'uk-to-uae' | 'beyond-formalities'
}

export async function POST(req: NextRequest) {
  try {
    const body: EbookDeliveryRequest = await req.json()
    const { email, customerName, orderId, downloadToken, ebookType = 'uk-to-uae' } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Determine ebook details based on type
    const ebookDetails = {
      'uk-to-uae': {
        title: 'UK to UAE Cultural Intelligence Guide',
        subject: 'Your UK to UAE Cultural Intelligence Guide - Instant Download',
        fileName: 'UK-to-UAE-Cultural-Intelligence-Guide.pdf',
        description: 'A research based guide helping British expats understand UAE culture, workplace norms, communication styles, dos and donts, and how to integrate effectively.',
        features: [
          'UAE cultural foundations',
          'Communication differences between UK and UAE',
          'Emotional expression and reading indirect cues',
          'Feedback styles',
          'Business etiquette and relationship building',
          'Workplace hierarchy and decision making',
          'Dress code rules for men and women',
          'Time perception and punctuality',
          'Do and don\'t list for new arrivals'
        ]
      },
      'beyond-formalities': {
        title: 'Beyond Formalities: Understanding Dubai Culture, Legal Systems, and Everyday Life',
        subject: 'Your Beyond Formalities E-Guide - Instant Download',
        fileName: 'Beyond-Formalities-by-Dr-Marwan-Al-Zarka.pdf',
        description: 'A comprehensive guide that goes beyond surface-level information to help you truly understand Dubai\'s culture, legal systems, and the practical aspects of everyday life in the Emirates.',
        features: [
          'Comprehensive understanding of Dubai culture and social norms',
          'Legal systems and regulations explained in practical terms',
          'Everyday life insights for residents and professionals',
          'Practical guidance for navigating Dubai with confidence'
        ]
      }
    }

    const ebook = ebookDetails[ebookType]

    // Generate download URL with token (if provided) or use direct link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_DOMAIN || 'https://www.theorangecode.com'
    const downloadUrl = downloadToken 
      ? `${baseUrl}/api/download?token=${encodeURIComponent(downloadToken)}&ebook=${ebookType}`
      : `${baseUrl}/ebooks/${ebook.fileName}`

    // Note: We're using token-based download instead of email attachment for security and personalization

    const displayName = customerName || email.split('@')[0]

    // Send email with PDF attachment or download link
    const emailContent = {
      from: 'The Orange Code <hello@theorangecode.com>',
      to: email,
      subject: ebook.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ff914d 0%, #00d4ff 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #ff914d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Thank You for Your Purchase!</h1>
            </div>
            <div class="content">
              <p>Hi ${displayName},</p>
              
              <p>Thank you for purchasing <strong>${ebook.title}</strong>!</p>
              
              <p>Your personalized ebook is ready! Click the button below to download your copy (stamped with your email for security):</p>
              
              <p style="text-align: center;">
                <a href="${downloadUrl}" class="button">Download Your Guide Now</a>
              </p>
              <p style="text-align: center; font-size: 12px; color: #666;">
                Or copy this link: ${downloadUrl}
              </p>
              <p style="text-align: center; font-size: 11px; color: #999; margin-top: 10px;">
                ⏰ This download link is valid for 48 hours. Please save the file to your device.
              </p>
              
              <h3>What's Inside:</h3>
              <ul>
                ${ebook.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
              
              <p><strong>💡 Pro Tip:</strong> ${ebookType === 'uk-to-uae' ? 'Read this guide before you arrive in the UAE to start your journey with confidence!' : 'Use this guide as your reference for understanding Dubai culture, legal systems, and everyday life.'}</p>
              
              <p>If you have any questions or need support, feel free to reply to this email or contact us at <a href="mailto:hello@theorangecode.com">hello@theorangecode.com</a>.</p>
              
              <p>Best regards,<br>
              <strong>The Orange Code Team</strong><br>
              Cultural Intelligence & Leadership Training<br>
              Abu Dhabi, UAE</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} The Orange Code. All rights reserved.</p>
              <p>Etihad Towers, Tower 3, Floor 36, Abu Dhabi, UAE</p>
            </div>
          </div>
        </body>
        </html>
      `,
      // No attachment - using secure token-based download instead
    }

    const resend = getResend()
    const { error } = await resend.emails.send(emailContent)

    if (error) {
      console.error('❌ Resend error sending ebook:', error)
      return NextResponse.json(
        { error: 'Failed to send ebook email', details: error },
        { status: 500 }
      )
    }

    // Notify Slack
    notifyEbookDelivery({
      email,
      customerName: displayName,
      orderId: orderId || 'unknown',
    }).catch(err => console.error('Slack notification failed:', err))

    console.log('✅ Ebook sent successfully to:', email)

    return NextResponse.json({ 
      success: true,
      message: 'Ebook sent successfully' 
    })

  } catch (error: any) {
    console.error('❌ Error sending ebook:', error)
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

