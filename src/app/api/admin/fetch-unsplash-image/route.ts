import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

// Rate limiting: Max 50 requests/hour (Unsplash free tier)
const RATE_LIMIT_KEY = 'unsplash:rate_limit'
const MAX_REQUESTS_PER_HOUR = 50

interface UnsplashImage {
  id: string
  url: string // Hotlinked URL from Unsplash
  regularUrl: string
  smallUrl: string
  photographer: {
    name: string
    username: string
    profileUrl: string
  }
  unsplashUrl: string
  attributionText: string
  description?: string
}

async function checkRateLimit(): Promise<boolean> {
  try {
    const current = await kv.get(RATE_LIMIT_KEY)
    const count = current ? parseInt(current as string) : 0
    
    if (count >= MAX_REQUESTS_PER_HOUR) {
      return false
    }
    
    await kv.incr(RATE_LIMIT_KEY)
    await kv.expire(RATE_LIMIT_KEY, 3600) // Reset after 1 hour
    return true
  } catch (error) {
    console.error('Rate limit check error:', error)
    return true // Allow on error to not block
  }
}

async function getCachedImage(imageId: string): Promise<UnsplashImage | null> {
  try {
    const cacheKey = `unsplash:cache:${imageId}`
    const cached = await kv.get(cacheKey)
    if (cached) {
      return JSON.parse(cached as string)
    }
    return null
  } catch (error) {
    console.error('Cache read error:', error)
    return null
  }
}

async function cacheImage(imageId: string, imageData: UnsplashImage): Promise<void> {
  try {
    const cacheKey = `unsplash:cache:${imageId}`
    await kv.setex(cacheKey, 86400 * 30, JSON.stringify(imageData)) // Cache for 30 days
  } catch (error) {
    console.error('Cache write error:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { keywords, imageId } = body

    // Check if API key is configured
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY
    if (!unsplashAccessKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unsplash API key not configured. Please add UNSPLASH_ACCESS_KEY to your environment variables.',
          requiresApiKey: true
        },
        { status: 400 }
      )
    }

    // Check rate limit
    const canProceed = await checkRateLimit()
    if (!canProceed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit reached. Maximum 50 requests per hour. Please wait before fetching more images.',
          rateLimitExceeded: true
        },
        { status: 429 }
      )
    }

    // If imageId provided, check cache first
    if (imageId) {
      const cached = await getCachedImage(imageId)
      if (cached) {
        return NextResponse.json({
          success: true,
          data: cached,
          cached: true,
        })
      }
    }

    // Build search query
    const query = keywords 
      ? Array.isArray(keywords) ? keywords.join(',') : keywords
      : 'UAE,Dubai,culture,business'

    // Fetch from Unsplash API
    const searchUrl = imageId
      ? `https://api.unsplash.com/photos/${imageId}`
      : `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&count=1`

    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Client-ID ${unsplashAccessKey}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { 
          success: false, 
          error: errorData.errors?.[0] || `Unsplash API error: ${response.statusText}`,
          apiError: true
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    const photo = Array.isArray(data) ? data[0] : data

    // Extract image data with proper attribution
    const imageData: UnsplashImage = {
      id: photo.id,
      url: photo.urls.regular, // Hotlinked URL
      regularUrl: photo.urls.regular,
      smallUrl: photo.urls.small,
      photographer: {
        name: photo.user.name,
        username: photo.user.username,
        profileUrl: photo.user.links.html,
      },
      unsplashUrl: photo.links.html,
      attributionText: `Photo by ${photo.user.name} on Unsplash`,
      description: photo.description || photo.alt_description || '',
    }

    // Cache the result
    await cacheImage(photo.id, imageData)

    return NextResponse.json({
      success: true,
      data: imageData,
      cached: false,
    })
  } catch (error: any) {
    console.error('Error fetching Unsplash image:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch image from Unsplash',
      },
      { status: 500 }
    )
  }
}

