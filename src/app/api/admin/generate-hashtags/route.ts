import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { caption, imageDescription, platform = 'instagram' } = body

    // Get brand profile
    const brandData = await kv.get('brand_profile')
    const brandProfile = brandData ? JSON.parse(brandData as string) : {
      name: 'The Orange Code',
      targetAudience: 'Professionals seeking cultural intelligence',
    }

    // Use OpenAI API if available
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (openaiApiKey) {
      const prompt = `Generate relevant hashtags for a social media post.

Brand: ${brandProfile.name || 'The Orange Code'}
Target Audience: ${brandProfile.targetAudience}
Platform: ${platform}
${caption ? `Caption: ${caption}` : ''}
${imageDescription ? `Image content: ${imageDescription}` : ''}

Generate 15-20 relevant hashtags that:
1. Are relevant to the content
2. Match the brand's audience
3. Mix popular and niche hashtags
4. Are appropriate for ${platform}
5. Include brand-specific hashtags

Return only the hashtags, comma-separated, without # symbols:`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a social media expert who generates relevant, effective hashtags.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 200,
        }),
      })

      const data = await response.json()
      const hashtagsText = data.choices?.[0]?.message?.content || ''
      
      // Parse hashtags
      const hashtags = hashtagsText
        .split(',')
        .map((tag: string) => tag.trim().replace(/^#+/, ''))
        .filter(Boolean)
        .slice(0, 20)

      return NextResponse.json({
        success: true,
        data: {
          hashtags,
          generatedBy: 'openai',
        },
      })
    } else {
      // Fallback: Template-based hashtags
      const baseHashtags = [
        'leadership',
        'culturalintelligence',
        'professionaldevelopment',
        'crosscultural',
        'businessgrowth',
        'leadershipdevelopment',
        'internationalbusiness',
        'culturalawareness',
        'professionalgrowth',
        'leadershipskills',
        'diversity',
        'inclusion',
        'globalmindset',
        'businessexcellence',
        'culturalcompetence',
      ]

      const contentHashtags = caption
        ? caption
            .toLowerCase()
            .match(/\b\w{4,}\b/g)
            ?.filter((word: string) => word.length > 4)
            .slice(0, 5) || []
        : []

      const hashtags = [...new Set([...baseHashtags, ...contentHashtags])].slice(0, 20)

      return NextResponse.json({
        success: true,
        data: {
          hashtags,
          generatedBy: 'template',
        },
      })
    }
  } catch (error: any) {
    console.error('Error generating hashtags:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

