import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Simple password check - you can set this in environment variables
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    // Debug logging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔐 Admin auth attempt:', {
        hasPassword: !!password,
        passwordLength: password?.length,
        hasEnvPassword: !!process.env.ADMIN_PASSWORD,
        envPasswordLength: process.env.ADMIN_PASSWORD?.length,
        usingDefault: !process.env.ADMIN_PASSWORD
      })
    }
    
    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      )
    }
    
    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    } else {
      // In development, provide more helpful error message
      const errorMessage = process.env.NODE_ENV === 'development' 
        ? `Invalid password. ${!process.env.ADMIN_PASSWORD ? 'Using default password: admin123' : 'Check your ADMIN_PASSWORD environment variable'}`
        : 'Invalid password'
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

