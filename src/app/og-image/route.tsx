import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  // Fetch the logo image
  const logoResponse = await fetch(
    new URL('../../public/logo1.png', import.meta.url)
  ).catch(() => null)
  
  const logoData = logoResponse ? await logoResponse.arrayBuffer() : null
  const logoBase64 = logoData 
    ? `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`
    : null

  return new ImageResponse(
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
          {logoBase64 ? (
            <img
              src={logoBase64}
              alt="The Orange Code Logo"
              style={{
                width: '400px',
                height: '400px',
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
      width: 1200,
      height: 630,
    }
  )
}

