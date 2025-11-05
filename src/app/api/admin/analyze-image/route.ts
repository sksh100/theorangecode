import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

// Simple color extraction from image URL
async function extractColors(imageUrl: string): Promise<string[]> {
  try {
    // For now, return a placeholder - in production, use a color extraction library
    // This would typically use colorthief or sharp on the server
    // For client-side, we can use a canvas-based approach
    return ['#E89F6B', '#A7A7A7', '#50A0F0'] // Placeholder
  } catch (error) {
    console.error('Error extracting colors:', error)
    return []
  }
}

// Calculate color similarity (Euclidean distance in RGB space)
function colorSimilarity(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  
  if (!rgb1 || !rgb2) return 0
  
  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  )
  
  // Normalize to 0-1 (0 = identical, 1 = completely different)
  const maxDistance = Math.sqrt(3 * Math.pow(255, 2))
  return 1 - (distance / maxDistance)
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl } = body

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Image URL is required' },
        { status: 400 }
      )
    }

    // Get brand profile
    const brandData = await kv.get('brand_profile')
    const brandProfile = brandData ? JSON.parse(brandData as string) : {
      colors: ['#E89F6B', '#A7A7A7', '#50A0F0', '#00d4ff', '#ff914d'],
    }

    // Extract colors from image
    const imageColors = await extractColors(imageUrl)

    // Calculate brand color fit score
    let maxSimilarity = 0
    let bestMatch = brandProfile.colors[0]

    for (const imageColor of imageColors) {
      for (const brandColor of brandProfile.colors) {
        const similarity = colorSimilarity(imageColor, brandColor)
        if (similarity > maxSimilarity) {
          maxSimilarity = similarity
          bestMatch = brandColor
        }
      }
    }

    // Score: 0-100 (0 = no match, 100 = perfect match)
    const brandFitScore = Math.round(maxSimilarity * 100)

    // For now, return placeholder scores for other metrics
    // In production, use AI vision API to analyze image content
    const subjectFitScore = 75 // Placeholder - would analyze if content matches brand topics
    const aestheticScore = 80 // Placeholder - would analyze composition, quality
    const varietyScore = 70 // Placeholder - would compare with other posts in feed

    return NextResponse.json({
      success: true,
      data: {
        imageColors,
        brandColors: brandProfile.colors,
        brandFitScore,
        subjectFitScore,
        aestheticScore,
        varietyScore,
        bestMatchColor: bestMatch,
        overallScore: Math.round((brandFitScore + subjectFitScore + aestheticScore + varietyScore) / 4),
      },
    })
  } catch (error: any) {
    console.error('Error analyzing image:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

