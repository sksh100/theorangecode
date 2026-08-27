import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Get IP from headers (Vercel provides this)
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'

  return NextResponse.json({ ip })
}

