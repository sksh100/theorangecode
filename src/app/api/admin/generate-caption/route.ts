import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, imageDescription, existingCaption } = body

    // Get brand profile
    const brandData = await kv.get('brand_profile')
    const brandProfile = brandData ? JSON.parse(brandData as string) : {
      toneOfVoice: 'Professional, inspiring, culturally intelligent, empowering, sophisticated',
      targetAudience: 'Professionals seeking Cultural Intelligence and leadership development',
      examplePosts: [],
    }

    // Use OpenAI API if available, otherwise use a template-based approach
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (openaiApiKey) {
      // Use OpenAI for AI-powered caption generation
      const prompt = `You are a social media content creator for ${brandProfile.name || 'a professional brand'}.

Brand Tone of Voice: ${brandProfile.toneOfVoice}
Target Audience: ${brandProfile.targetAudience}
${brandProfile.bannedTopics?.length > 0 ? `Avoid these topics: ${brandProfile.bannedTopics.join(', ')}` : ''}

${brandProfile.examplePosts?.length > 0 ? `Example posts that match the brand voice:\n${brandProfile.examplePosts.slice(0, 3).map((p: any) => `- ${p.caption}`).join('\n')}` : ''}

${imageDescription ? `Image description: ${imageDescription}` : ''}
${existingCaption ? `Current caption (improve this): ${existingCaption}` : ''}

Create an engaging Instagram caption that:
1. Matches the brand tone of voice
2. Resonates with the target audience
3. Is professional yet inspiring
4. Is 150-220 words
5. Includes a call-to-action when appropriate

Caption:`

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
              content: 'You are an expert social media content creator who writes engaging, brand-aligned captions.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      })

      const data = await response.json()
      const caption = data.choices?.[0]?.message?.content || ''

      return NextResponse.json({
        success: true,
        data: {
          caption: caption.trim(),
          generatedBy: 'openai',
        },
      })
    } else {
      // Fallback: Template-based caption
      const templates = [
        `🌟 Exciting updates ahead! ${imageDescription ? `This ${imageDescription} represents our commitment to excellence.` : 'We\'re constantly evolving to serve you better.'} Join us on this journey of growth and innovation. #Leadership #Growth #Excellence`,
        `✨ At ${brandProfile.name || 'The Orange Code'}, we believe in the power of ${brandProfile.targetAudience?.toLowerCase() || 'professional development'}. ${imageDescription ? `This ${imageDescription} embodies our values.` : 'Every step forward is progress.'} Let's grow together! #ProfessionalDevelopment #Success`,
        `💡 ${brandProfile.toneOfVoice?.split(',')[0] || 'Professional'} insights for today: ${imageDescription ? `This ${imageDescription} reminds us that` : 'Remember that'} excellence is a journey, not a destination. What are you working on today? #Inspiration #Growth`,
      ]

      const caption = templates[Math.floor(Math.random() * templates.length)]

      return NextResponse.json({
        success: true,
        data: {
          caption,
          generatedBy: 'template',
        },
      })
    }
  } catch (error: any) {
    console.error('Error generating caption:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

