import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { notifyEbookDelivery } from '@/lib/slack'

const resend = new Resend(process.env.RESEND_API_KEY as string)

export const dynamic = 'force-dynamic'

interface EbookDeliveryRequest {
  email: string
  customerName?: string
  orderId?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: EbookDeliveryRequest = await req.json()
    const { email, customerName, orderId } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Get the PDF file from public folder
    // Note: In production, you might want to store the PDF in a CDN or cloud storage
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.theorangecode.com'
    const ebookUrl = `${baseUrl}/ebooks/uk-to-uae-relocation-guide.pdf`

    // Fetch the PDF to attach it
    let pdfBuffer: Buffer | null = null
    try {
      const pdfResponse = await fetch(ebookUrl)
      if (pdfResponse.ok) {
        const arrayBuffer = await pdfResponse.arrayBuffer()
        pdfBuffer = Buffer.from(arrayBuffer)
      }
    } catch (error) {
      console.warn('⚠️ Could not fetch PDF, will send download link instead:', error)
    }

    const displayName = customerName || email.split('@')[0]

    // Send email with PDF attachment or download link
    const emailContent = {
      from: 'The Orange Code <hello@theorangecode.com>',
      to: email,
      subject: 'Your UK to UAE Cultural Intelligence Guide - Instant Download',
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
              
              <p>Thank you for purchasing <strong>The UK to UAE Cultural Intelligence Guide</strong>!</p>
              
              <p>Your ebook is attached to this email. You can also download it using the link below:</p>
              
              ${pdfBuffer ? `
                <p><strong>📎 Your ebook is attached to this email.</strong></p>
              ` : `
                <p style="text-align: center;">
                  <a href="${ebookUrl}" class="button">Download Your Guide Now</a>
                </p>
                <p style="text-align: center; font-size: 12px; color: #666;">
                  Or copy this link: ${ebookUrl}
                </p>
              `}
              
              <h3>What's Inside:</h3>
              <ul>
                <li>UAE cultural foundations</li>
                <li>Communication differences between UK and UAE</li>
                <li>Emotional expression and reading indirect cues</li>
                <li>Feedback styles</li>
                <li>Business etiquette and relationship building</li>
                <li>Workplace hierarchy and decision making</li>
                <li>Dress code rules for men and women</li>
                <li>Time perception and punctuality</li>
                <li>Do and don't list for new arrivals</li>
              </ul>
              
              <p><strong>💡 Pro Tip:</strong> Read this guide before you arrive in the UAE to start your journey with confidence!</p>
              
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
      attachments: pdfBuffer ? [
        {
          filename: 'UK-to-UAE-Cultural-Intelligence-Guide.pdf',
          content: pdfBuffer,
        }
      ] : undefined,
    }

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

