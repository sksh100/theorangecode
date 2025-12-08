import { ImageResponse } from 'next/og'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const alt = 'The Orange Code - Cultural Intelligence Training'
export const contentType = 'image/png'
export const size = {
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
          background: 'linear-gradient(135deg, #01011e 0%, #0a0e27 50%, #01011e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(255, 145, 77, 0.05) 50%, rgba(0, 153, 255, 0.1) 100%)',
          }}
        />
        
        {/* Logo container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
            zIndex: 1,
          }}
        >
          {/* Logo image */}
          {logoDataUrl ? (
            <img
              src={logoDataUrl}
              alt="The Orange Code Logo"
              width={400}
              height={400}
              style={{
                objectFit: 'contain',
              }}
            />
          ) : (
            // Fallback to text if image fails to load
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '32px', color: '#00d4ff' }}>The</span>
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
          
          {/* Tagline */}
          <div
            style={{
              fontSize: '28px',
              color: '#00d4ff',
              textAlign: 'center',
              opacity: 0.9,
              fontWeight: 500,
            }}
          >
            Cultural Intelligence & Leadership Training
          </div>
        </div>
      </div>
    ),
    {
      ...size,
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

