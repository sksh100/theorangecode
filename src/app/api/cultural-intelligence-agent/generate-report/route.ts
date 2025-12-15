import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function generateHTMLReport(data: {
  userNationality: string
  companyNationality: string
  mode: string
  scenario?: string
  teamIssues?: string
  response: string
  workCultureResponse?: string
  email: string
}): string {
  const modeTitleMap: Record<string, string> = {
    scenario: 'Scenario Analysis',
    team: 'Multicultural Team Issues Analysis',
    workculture: 'Corporate Work Culture Design'
  }
  const modeTitle = modeTitleMap[data.mode] || 'Cultural Intelligence Analysis'

  const inputText = data.scenario || data.teamIssues || 'Work culture design request'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cultural Intelligence Report - The Orange Code</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #ff914d 0%, #00d4ff 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .header p {
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 30px;
    }
    .section {
      margin-bottom: 35px;
    }
    .section-title {
      font-size: 22px;
      font-weight: 700;
      color: #ff914d;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #00d4ff;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 25px;
    }
    .info-item {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #00d4ff;
    }
    .info-label {
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
      font-weight: 600;
      margin-bottom: 5px;
      letter-spacing: 0.5px;
    }
    .info-value {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .response-content {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 8px;
      border-left: 4px solid #ff914d;
      white-space: pre-wrap;
      font-size: 15px;
      line-height: 1.8;
      color: #333;
    }
    .work-culture {
      background: #fff5f0;
      padding: 25px;
      border-radius: 8px;
      border-left: 4px solid #ff914d;
      margin-top: 20px;
    }
    .work-culture h3 {
      color: #ff914d;
      font-size: 20px;
      margin-bottom: 15px;
    }
    .work-culture-content {
      white-space: pre-wrap;
      font-size: 15px;
      line-height: 1.8;
      color: #333;
    }
    .disclaimer {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 8px;
      padding: 20px;
      margin-top: 30px;
      font-size: 13px;
      line-height: 1.6;
      color: #856404;
    }
    .disclaimer h3 {
      color: #856404;
      font-size: 16px;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .footer {
      background: #1a1a1a;
      color: white;
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #00d4ff;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .info-grid {
        grid-template-columns: 1fr;
      }
      .header h1 {
        font-size: 24px;
      }
      .content {
        padding: 25px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Cultural Intelligence Report</h1>
      <p>${modeTitle}</p>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Your Nationality</div>
            <div class="info-value">${data.userNationality}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Company/Team Nationality</div>
            <div class="info-value">${data.companyNationality}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Your Inquiry</h2>
        <div class="response-content" style="background: #e8f4f8; border-left-color: #00d4ff;">
          ${inputText.replace(/\n/g, '<br>')}
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Cultural Intelligence Analysis</h2>
        <div class="response-content">
          ${data.response.replace(/\n/g, '<br>')}
        </div>
      </div>

      ${data.workCultureResponse ? `
      <div class="work-culture">
        <h3>Recommended Corporate Work Culture</h3>
        <div class="work-culture-content">
          ${data.workCultureResponse.replace(/\n/g, '<br>')}
        </div>
      </div>
      ` : ''}

      <div class="disclaimer">
        <h3>⚠️ Important Disclaimer</h3>
        <p>
          <strong>General Information Only:</strong> This Cultural Intelligence Report provides general informational advice based on cultural intelligence frameworks and behavioral science research. This report does not provide legal, immigration, tax, financial, medical, or professional advice.
        </p>
        <p style="margin-top: 10px;">
          <strong>No Liability:</strong> The Orange Code and its Cultural Intelligence Agent are not liable for any decisions, actions, or outcomes resulting from the use of this report or the information contained herein.
        </p>
        <p style="margin-top: 10px;">
          <strong>Professional Consultation:</strong> Users are responsible for consulting appropriate professionals (legal, financial, HR, etc.) for specific matters requiring professional advice.
        </p>
        <p style="margin-top: 10px;">
          <strong>Acknowledgment:</strong> By using this tool, you acknowledge that the advice provided is general in nature and may not apply to your specific situation. This report is for informational purposes only and should not be considered as professional advice.
        </p>
      </div>
    </div>

    <div class="footer">
      <p><strong>The Orange Code</strong></p>
      <p>Cultural Intelligence Training for the UAE & GCC</p>
      <p style="margin-top: 15px;">
        <a href="https://www.theorangecode.com">www.theorangecode.com</a> | 
        <a href="mailto:hello@theorangecode.com">hello@theorangecode.com</a>
      </p>
      <p style="margin-top: 10px; font-size: 12px; opacity: 0.8;">
        This report was generated on ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  </div>
</body>
</html>`
}

async function sendEmailViaResend(email: string, htmlContent: string, subject: string): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY
  
  if (!resendApiKey) {
    console.log('📧 Resend API key not configured. Email would be sent to:', email)
    console.log('📧 Subject:', subject)
    return false
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'The Orange Code <noreply@theorangecode.com>',
        to: email,
        subject: subject,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error('Resend API error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      userNationality, 
      companyNationality, 
      scenario, 
      teamIssues, 
      workCulture, 
      email, 
      mode,
      response: aiResponse,
      workCultureResponse
    } = body

    // Validate required fields
    if (!userNationality || !companyNationality || !email || !aiResponse) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate HTML report
    const htmlReport = generateHTMLReport({
      userNationality,
      companyNationality,
      mode,
      scenario,
      teamIssues,
      response: aiResponse,
      workCultureResponse,
      email
    })

    // Determine subject based on mode
    const modeTitleMap: Record<string, string> = {
      scenario: 'Cultural Intelligence Scenario Analysis',
      team: 'Multicultural Team Issues Analysis',
      workculture: 'Corporate Work Culture Design Report'
    }
    const modeTitle = modeTitleMap[mode] || 'Cultural Intelligence Report'

    const subject = `${modeTitle} - The Orange Code`

    // Send email
    const emailSent = await sendEmailViaResend(email, htmlReport, subject)

    if (!emailSent) {
      // If email service not configured, return the HTML for download
      return NextResponse.json({
        success: true,
        message: 'Report generated successfully',
        html: htmlReport,
        emailSent: false,
        note: 'Email service not configured. HTML report returned for download.'
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Report generated and sent to your email',
      emailSent: true
    })

  } catch (error: any) {
    console.error('Report generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate report. Please try again.' },
      { status: 500 }
    )
  }
}

