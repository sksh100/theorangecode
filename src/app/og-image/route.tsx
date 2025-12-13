import { ImageResponse } from 'next/og'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
}

export async function GET() {
  // Fetch the logo image from public URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theorangecode.com'
  const logoUrl = `${baseUrl}/logo1.png`
  
  let logoDataUrl: string | null = null
  try {
    const logoResponse = await fetch(logoUrl)
    if (logoResponse.ok) {
      const logoBuffer = await logoResponse.arrayBuffer()
      // Convert ArrayBuffer to base64 for edge runtime
      const bytes = new Uint8Array(logoBuffer)
      const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '')
      const base64 = btoa(binary)
      logoDataUrl = `data:image/png;base64,${base64}`
    }
  } catch (error) {
    console.error('Failed to load logo:', error)
  }

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          margin: 0,
          padding: 0,
        }}
      >
        {/* Logo container - only logo, no tagline, no padding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Logo image */}
          {logoDataUrl ? (
            <img
              src={logoDataUrl}
              alt="The Orange Code Logo"
              width={1200}
              height={630}
              style={{
                objectFit: 'contain',
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
              }}
            />
          ) : (
            // Fallback to text if image fails to load
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '96px',
                fontWeight: 'bold',
                color: '#ff914d',
                textAlign: 'center',
                margin: 0,
                padding: 0,
              }}
            >
              <span style={{ fontSize: '40px', color: '#00d4ff' }}>The</span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #ff914d 0%, #00d4ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Orange Code
              </span>
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
    }
  )

  // Add proper headers for social media platforms
  return new NextResponse(imageResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

