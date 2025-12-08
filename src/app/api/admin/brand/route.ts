import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

interface BrandProfile {
  id: string
  name: string
  colors: string[] // Brand colors in hex
  fonts: string[]
  toneOfVoice: string // Description of brand voice
  targetAudience: string // Description of target audience
  bannedTopics: string[] // Topics to avoid
  examplePosts: Array<{ caption: string; hashtags: string[] }>
  updatedAt: string
}

export async function GET(request: NextRequest) {
  try {
    const brandData = await kv.get('brand_profile')
    
    if (!brandData) {
      // Return default brand profile based on website colors
      return NextResponse.json({
        success: true,
        data: {
          id: 'default',
          name: 'The Orange Code',
          colors: ['#E89F6B', '#A7A7A7', '#50A0F0', '#00d4ff', '#ff914d'], // Your website colors
          fonts: ['Inter', 'Glacial Indifference'],
          toneOfVoice: 'Professional, inspiring, culturally intelligent, empowering, sophisticated',
          targetAudience: 'Professionals seeking Cultural Intelligence and leadership development in international environments',
          bannedTopics: [],
          examplePosts: [],
          updatedAt: new Date().toISOString(),
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: JSON.parse(brandData as string),
    })
  } catch (error: any) {
    console.error('Error fetching brand profile:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const brandProfile: BrandProfile = {
      id: body.id || 'default',
      name: body.name || 'The Orange Code',
      colors: body.colors || ['#E89F6B', '#A7A7A7', '#50A0F0'],
      fonts: body.fonts || ['Inter'],
      toneOfVoice: body.toneOfVoice || '',
      targetAudience: body.targetAudience || '',
      bannedTopics: body.bannedTopics || [],
      examplePosts: body.examplePosts || [],
      updatedAt: new Date().toISOString(),
    }

    await kv.setex('brand_profile', 86400 * 365, JSON.stringify(brandProfile))

    return NextResponse.json({
      success: true,
      data: brandProfile,
    })
  } catch (error: any) {
    console.error('Error saving brand profile:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

