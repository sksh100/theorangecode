import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

interface UnsplashImage {
  id: string
  url: string
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

interface ContentPost {
  id: string
  caption: string
  hashtags: string[]
  altText: string
  mediaUrl?: string
  platforms: string[]
  scheduledDate?: string
  publishedDate?: string
  status: 'draft' | 'ready_for_review' | 'approved' | 'scheduled' | 'published'
  unsplashImage?: UnsplashImage
  imageCacheKey?: string
  createdAt: string
  updatedAt: string
}

// 30-day content templates focused on "Beyond Formalities" ebook
const contentTemplates = [
  // Week 1: Problem Awareness
  {
    day: 1,
    caption: `Many people complete the formalities in the UAE, yet relationships remain polite but distant. Business discussions start well but do not move forward, communication feels unclear, and promising connections sometimes disappear without explanation.

Beyond Formalities explains the cultural foundations behind Emirati culture and local customs, helping you understand how trust, communication, and relationships develop in the UAE.

This guide was written to bridge the gap and support clearer interaction, meaningful connection, and lasting relationships in everyday life and professional settings.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['UAECulture', 'EmiratiCulture', 'CulturalIntelligence', 'Dubai', 'AbuDhabi', 'UAE', 'ExpatLife', 'BusinessCulture', 'CrossCultural', 'CulturalAwareness'],
    keywords: ['UAE', 'Dubai', 'business', 'meeting', 'professional'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 2,
    caption: `Business discussions start well but do not move forward. You've experienced this: warm meetings, positive conversations, but then... silence.

Why does this happen? Understanding Emirati cultural values and communication styles is key to building trust and moving business relationships forward.

Beyond Formalities helps you understand how trust develops, how decisions are made, and how to navigate business culture in the UAE with confidence.

Learn more: theorangecode.com/beyond-formalities`,
    hashtags: ['BusinessCulture', 'UAEBusiness', 'CulturalIntelligence', 'DubaiBusiness', 'AbuDhabi', 'ProfessionalDevelopment', 'CrossCultural', 'BusinessEtiquette'],
    keywords: ['business', 'meeting', 'office', 'UAE', 'professional'],
    platforms: ['linkedin', 'twitter'],
  },
  {
    day: 3,
    caption: `Communication feels unclear. Indirect communication and silence can be hard to interpret. You want to show respect, but you're not sure what matters most.

This is where cultural intelligence makes the difference. Beyond Formalities explains nonverbal communication, social distance, and how to read between the lines in Emirati culture.

Written with respect for Emirati culture, designed to reduce misunderstandings and support meaningful connection.

Get the guide: theorangecode.com/beyond-formalities`,
    hashtags: ['Communication', 'CulturalIntelligence', 'UAECulture', 'EmiratiCulture', 'CrossCultural', 'CulturalAwareness', 'Dubai', 'UAE'],
    keywords: ['communication', 'culture', 'UAE', 'people', 'talking'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 4,
    caption: `Social circles often stay limited to other expatriates, despite genuine efforts to connect. You want to build relationships with Emiratis, but something feels missing.

Beyond Formalities explains how social boundaries work, how hospitality and majlis etiquette function, and how to build genuine relationships in the UAE.

This guide covers dining etiquette, coffee culture, gender etiquette, and the cultural foundations that shape everyday interaction.

Discover more: theorangecode.com/beyond-formalities`,
    hashtags: ['UAECulture', 'EmiratiCulture', 'SocialEtiquette', 'CulturalIntelligence', 'Dubai', 'AbuDhabi', 'ExpatLife', 'CulturalAwareness'],
    keywords: ['hospitality', 'coffee', 'UAE', 'culture', 'social'],
    platforms: ['instagram', 'pinterest'],
  },
  {
    day: 5,
    caption: `You want to show respect, but you're not sure what matters most. Appearance, greetings, nonverbal cues, social distance—all of these communicate respect in Emirati culture.

Beyond Formalities explains first impressions, cultural appearance, Arabic greetings, nonverbal communication, and gender etiquette so you can interact with confidence.

Written with respect for Emirati culture, this guide helps you understand what truly matters in building respectful relationships.

Learn more: theorangecode.com/beyond-formalities`,
    hashtags: ['Respect', 'CulturalIntelligence', 'UAECulture', 'EmiratiCulture', 'Etiquette', 'CulturalAwareness', 'Dubai', 'UAE'],
    keywords: ['respect', 'greeting', 'UAE', 'culture', 'people'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 6,
    caption: `"Understanding cultural foundations is the key to building trust and meaningful relationships in the UAE." — Beyond Formalities

Cultural Intelligence helps you move beyond surface-level interactions to genuine connection.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['Quote', 'CulturalIntelligence', 'UAECulture', 'Wisdom', 'Inspiration', 'Dubai', 'UAE'],
    keywords: ['quote', 'inspiration', 'UAE', 'wisdom', 'culture'],
    platforms: ['instagram', 'pinterest'],
  },
  {
    day: 7,
    caption: `Weekend Tip: In Emirati culture, hospitality is deeply valued. When invited to someone's home, bringing a small gift shows respect. Understanding these cultural nuances helps build stronger relationships.

Beyond Formalities covers hospitality, majlis etiquette, dining customs, and the cultural values that shape everyday life in the UAE.

Get the guide: theorangecode.com/beyond-formalities`,
    hashtags: ['WeekendTip', 'UAECulture', 'Hospitality', 'CulturalIntelligence', 'Etiquette', 'Dubai', 'UAE'],
    keywords: ['hospitality', 'gift', 'UAE', 'culture', 'home'],
    platforms: ['instagram', 'linkedin'],
  },
  // Week 2: Solution Introduction
  {
    day: 8,
    caption: `Beyond Formalities explains the cultural foundations behind Emirati culture and local customs.

This comprehensive guide covers:
• Identity and values
• Greetings and communication
• Nonverbal cues and social distance
• Gender etiquette
• Hospitality and majlis
• Business culture and protocol
• Modern UAE life

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['BeyondFormalities', 'UAECulture', 'EmiratiCulture', 'CulturalGuide', 'Dubai', 'AbuDhabi', 'UAE', 'CulturalIntelligence'],
    keywords: ['book', 'guide', 'UAE', 'culture', 'education'],
    platforms: ['instagram', 'linkedin', 'twitter'],
  },
  {
    day: 9,
    caption: `What you'll gain from Beyond Formalities:

✓ Clarity on Emirati culture and local customs
✓ More confidence in social and professional interaction
✓ Stronger understanding of nonverbal communication
✓ Practical awareness of etiquette in hospitality, dining, and majlis
✓ Foundation for respectful business communication

149 AED • Instant download • Secure checkout

Get it now: theorangecode.com/beyond-formalities`,
    hashtags: ['Benefits', 'UAECulture', 'CulturalIntelligence', 'ProfessionalDevelopment', 'Dubai', 'UAE', 'CulturalAwareness'],
    keywords: ['benefits', 'learning', 'UAE', 'culture', 'professional'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 10,
    caption: `What do Emiratis say about Beyond Formalities?

"This guide was reviewed by Emiratis who expressed their appreciation for the respectful and accurate representation of their culture, values, and society. They acknowledged the intention behind this work and welcomed the effort to educate others in a manner that promotes understanding."

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['Testimonial', 'EmiratiCulture', 'UAECulture', 'CulturalIntelligence', 'Respect', 'Dubai', 'UAE'],
    keywords: ['testimonial', 'review', 'UAE', 'culture', 'people'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 11,
    caption: `Who is Beyond Formalities for?

✓ Preparing from abroad: Professionals, founders, and individuals who want cultural clarity before arriving or partnering with the UAE

✓ Relocating or newly arrived: Those settling in and seeking confidence in daily interaction, customs, and communication

✓ Already living in the UAE: Anyone who wants deeper understanding beyond procedures, to build lasting relationships

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['WhoIsItFor', 'UAECulture', 'ExpatLife', 'Relocation', 'CulturalIntelligence', 'Dubai', 'AbuDhabi', 'UAE'],
    keywords: ['target', 'audience', 'UAE', 'people', 'professional'],
    platforms: ['linkedin', 'instagram'],
  },
  {
    day: 12,
    caption: `Beyond Formalities explains how cultural values shape everyday interaction in the UAE.

UAE daily life is shaped by values such as respect, hospitality, faith, family, hierarchy, and social harmony. When those foundations are understood, communication becomes clearer and relationships become easier to build.

This guide helps you understand these cultural foundations.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['CulturalValues', 'UAECulture', 'EmiratiCulture', 'CulturalIntelligence', 'Values', 'Dubai', 'UAE'],
    keywords: ['values', 'culture', 'UAE', 'foundation', 'society'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 13,
    caption: `Success Story: "After reading Beyond Formalities, I finally understood why my business relationships weren't progressing. The guide explained the cultural foundations I was missing. Now I approach meetings with confidence and clarity."

Understanding cultural foundations makes all the difference.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['SuccessStory', 'Testimonial', 'UAECulture', 'CulturalIntelligence', 'BusinessSuccess', 'Dubai', 'UAE'],
    keywords: ['success', 'story', 'business', 'UAE', 'achievement'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 14,
    caption: `Ready to understand Emirati culture and build meaningful relationships in the UAE?

Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life

149 AED • Instant download • Secure Stripe checkout

Get your copy now: theorangecode.com/beyond-formalities`,
    hashtags: ['CTA', 'BeyondFormalities', 'UAECulture', 'EmiratiCulture', 'CulturalIntelligence', 'Dubai', 'UAE', 'GetItNow'],
    keywords: ['CTA', 'call-to-action', 'UAE', 'book', 'purchase'],
    platforms: ['instagram', 'linkedin', 'twitter'],
  },
  // Week 3: Deep Value
  {
    day: 15,
    caption: `How cultural values shape everyday interaction in the UAE.

Respect, hospitality, faith, family, hierarchy, and social harmony—these values influence every interaction, from greetings to business meetings.

Beyond Formalities explains how these values work in real life, so you can interact with confidence and build meaningful relationships.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['CulturalValues', 'UAECulture', 'EmiratiCulture', 'CulturalIntelligence', 'Values', 'Dubai', 'UAE'],
    keywords: ['values', 'interaction', 'UAE', 'culture', 'society'],
    platforms: ['linkedin', 'instagram'],
  },
  {
    day: 16,
    caption: `How trust and relationships develop over time in the UAE.

Trust in Emirati culture builds gradually, through consistent respectful behavior, understanding of cultural norms, and genuine relationship building. It's not instant—it's earned.

Beyond Formalities explains this process and how to build trust authentically.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['Trust', 'Relationships', 'UAECulture', 'EmiratiCulture', 'CulturalIntelligence', 'Dubai', 'UAE'],
    keywords: ['trust', 'relationship', 'UAE', 'culture', 'connection'],
    platforms: ['linkedin', 'instagram'],
  },
  {
    day: 17,
    caption: `How social boundaries and etiquette work in real life.

Social distance, gender etiquette, appropriate behavior in different settings—these matter deeply in Emirati culture. Understanding them helps you navigate social situations with confidence.

Beyond Formalities covers social boundaries, gender etiquette, and practical guidance for everyday interaction.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['SocialEtiquette', 'UAECulture', 'EmiratiCulture', 'CulturalIntelligence', 'Etiquette', 'Dubai', 'UAE'],
    keywords: ['etiquette', 'social', 'UAE', 'culture', 'boundaries'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 18,
    caption: `How business culture and protocol are influenced by cultural context.

Business in the UAE operates within a cultural framework. Understanding how cultural values influence professional communication, relationship building, and business etiquette is essential for success.

Beyond Formalities covers business culture and protocol in the UAE.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['BusinessCulture', 'UAEBusiness', 'CulturalIntelligence', 'BusinessProtocol', 'Dubai', 'AbuDhabi', 'UAE'],
    keywords: ['business', 'protocol', 'UAE', 'culture', 'professional'],
    platforms: ['linkedin', 'twitter'],
  },
  {
    day: 19,
    caption: `Understanding nonverbal communication and social distance in the UAE.

Nonverbal cues—eye contact, gestures, personal space, body language—communicate respect and understanding in Emirati culture. Learning to read and respond to these cues is crucial.

Beyond Formalities explains nonverbal communication and social distance.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['NonverbalCommunication', 'UAECulture', 'CulturalIntelligence', 'Communication', 'Dubai', 'UAE'],
    keywords: ['communication', 'nonverbal', 'UAE', 'culture', 'body-language'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 20,
    caption: `Weekend Learning: The majlis is a traditional gathering space in Emirati culture, central to hospitality and social connection. Understanding majlis etiquette—when to speak, how to sit, what to bring—shows respect and helps build relationships.

Beyond Formalities covers majlis etiquette and hospitality customs.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['WeekendLearning', 'Majlis', 'UAECulture', 'EmiratiCulture', 'Hospitality', 'Dubai', 'UAE'],
    keywords: ['majlis', 'hospitality', 'UAE', 'culture', 'traditional'],
    platforms: ['instagram', 'pinterest'],
  },
  {
    day: 21,
    caption: `"The guide was recognised as a constructive contribution to fostering mutual respect and deeper cultural awareness." — Emirati Reviewers

Beyond Formalities helps you understand Emirati culture with respect and accuracy.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['Testimonial', 'EmiratiCulture', 'UAECulture', 'Respect', 'CulturalIntelligence', 'Dubai', 'UAE'],
    keywords: ['testimonial', 'review', 'UAE', 'culture', 'respect'],
    platforms: ['instagram', 'linkedin'],
  },
  // Week 4: Conversion Focus
  {
    day: 22,
    caption: `Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life

149 AED • Limited time offer

Get instant access to this comprehensive guide covering:
• Cultural foundations and values
• Communication and etiquette
• Business culture and protocol
• Hospitality and majlis
• Modern UAE life

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['LimitedTime', 'BeyondFormalities', 'UAECulture', 'EmiratiCulture', 'SpecialOffer', 'Dubai', 'UAE'],
    keywords: ['offer', 'limited-time', 'UAE', 'book', 'sale'],
    platforms: ['instagram', 'linkedin', 'twitter'],
  },
  {
    day: 23,
    caption: `Instant download after checkout.

Purchase Beyond Formalities and receive your PDF E-Guide immediately. No waiting, no delays—just instant access to cultural intelligence insights.

Secure Stripe checkout • 149 AED

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['InstantDownload', 'BeyondFormalities', 'UAECulture', 'DigitalGuide', 'Dubai', 'UAE'],
    keywords: ['download', 'instant', 'digital', 'UAE', 'ebook'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 24,
    caption: `Secure Stripe checkout. Your payment is protected and processed securely.

Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life

149 AED • PDF E-Guide • Instant access

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['SecureCheckout', 'BeyondFormalities', 'Stripe', 'SecurePayment', 'Dubai', 'UAE'],
    keywords: ['secure', 'payment', 'checkout', 'UAE', 'safe'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 25,
    caption: `Perfect for teams and organizations.

Beyond Formalities helps entire teams understand Emirati culture and build stronger relationships in the UAE. Bulk purchases and corporate licensing available.

Contact us for team pricing: hello@theorangecode.com

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['B2B', 'TeamPurchase', 'Corporate', 'UAECulture', 'CulturalIntelligence', 'Dubai', 'UAE'],
    keywords: ['team', 'corporate', 'B2B', 'UAE', 'business'],
    platforms: ['linkedin', 'twitter'],
  },
  {
    day: 26,
    caption: `FAQ: "Is Beyond Formalities only for relocating?"

No. This guide is valuable whether you're preparing to arrive, newly arrived, or already living in the UAE. It helps anyone who wants to understand Emirati culture and build meaningful relationships, regardless of how long you've been in the Emirates.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['FAQ', 'BeyondFormalities', 'UAECulture', 'EmiratiCulture', 'Relocation', 'Dubai', 'UAE'],
    keywords: ['FAQ', 'question', 'UAE', 'culture', 'guide'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 27,
    caption: `Understand the culture, communicate with confidence.

Beyond Formalities helps you move beyond surface-level interactions to genuine connection in the UAE.

149 AED • Instant download • Secure checkout

Get your copy now: theorangecode.com/beyond-formalities`,
    hashtags: ['FinalCTA', 'BeyondFormalities', 'UAECulture', 'EmiratiCulture', 'CulturalIntelligence', 'Dubai', 'UAE'],
    keywords: ['CTA', 'final', 'UAE', 'culture', 'purchase'],
    platforms: ['instagram', 'linkedin', 'twitter'],
  },
  {
    day: 28,
    caption: `Weekend Reminder: Don't miss out on understanding Emirati culture and building meaningful relationships in the UAE.

Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life

149 AED • Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['Reminder', 'Weekend', 'BeyondFormalities', 'UAECulture', 'Dubai', 'UAE'],
    keywords: ['reminder', 'weekend', 'UAE', 'culture', 'book'],
    platforms: ['instagram', 'linkedin'],
  },
  {
    day: 29,
    caption: `Last chance to get Beyond Formalities at 149 AED.

This comprehensive guide to Emirati culture, local customs, and everyday life in the UAE is essential for anyone building relationships in the Emirates.

Don't miss out—get your copy today: theorangecode.com/beyond-formalities`,
    hashtags: ['LastChance', 'Urgency', 'BeyondFormalities', 'UAECulture', 'EmiratiCulture', 'Dubai', 'UAE'],
    keywords: ['last-chance', 'urgency', 'UAE', 'culture', 'limited'],
    platforms: ['instagram', 'linkedin', 'twitter'],
  },
  {
    day: 30,
    caption: `Final Day: Get Beyond Formalities now and start understanding Emirati culture with confidence.

149 AED • Instant download • Secure Stripe checkout

This guide explains the cultural foundations behind Emirati culture and local customs, helping you understand how trust, communication, and relationships develop in the UAE.

Get your copy: theorangecode.com/beyond-formalities`,
    hashtags: ['FinalDay', 'BeyondFormalities', 'UAECulture', 'EmiratiCulture', 'CulturalIntelligence', 'Dubai', 'UAE', 'GetItNow'],
    keywords: ['final', 'last-day', 'UAE', 'culture', 'purchase'],
    platforms: ['instagram', 'linkedin', 'twitter', 'pinterest'],
  },
]

// Helper function to fetch Unsplash image with delay
async function fetchUnsplashImage(keywords: string[]): Promise<UnsplashImage | null> {
  try {
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY
    if (!unsplashAccessKey) {
      console.warn('Unsplash API key not configured')
      return null
    }

    // Add delay to respect rate limits (50 requests/hour = ~1 per minute)
    await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay

    const query = keywords.join(',')
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&count=1`,
      {
        headers: {
          'Authorization': `Client-ID ${unsplashAccessKey}`,
        },
      }
    )

    if (!response.ok) {
      console.error('Unsplash API error:', response.statusText)
      return null
    }

    const data = await response.json()
    const photo = Array.isArray(data) ? data[0] : data

    return {
      id: photo.id,
      url: photo.urls.regular,
      regularUrl: photo.urls.regular,
      smallUrl: photo.urls.small,
      photographer: {
        name: photo.user.name,
        username: photo.user.username,
        profileUrl: photo.user.links.html,
      },
      unsplashUrl: photo.links.html,
      attributionText: `Photo by ${photo.user.name} on Unsplash`,
    }
  } catch (error) {
    console.error('Error fetching Unsplash image:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { startDate } = body

    // Calculate start date (default to today)
    const start = startDate ? new Date(startDate) : new Date()
    start.setHours(9, 0, 0, 0) // 9 AM UAE time

    const generatedPosts: ContentPost[] = []
    const errors: string[] = []

    // Generate 30 days of content
    for (let i = 0; i < contentTemplates.length; i++) {
      const template = contentTemplates[i]
      const scheduledDate = new Date(start)
      scheduledDate.setDate(start.getDate() + i)

      try {
        // Fetch Unsplash image (with delay to respect rate limits)
        let unsplashImage: UnsplashImage | null = null
        if (process.env.UNSPLASH_ACCESS_KEY) {
          unsplashImage = await fetchUnsplashImage(template.keywords)
          // Additional delay between requests
          if (i < contentTemplates.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        }

        const id = `content_30day_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`
        const now = new Date().toISOString()

        const content: ContentPost = {
          id,
          caption: template.caption,
          hashtags: template.hashtags,
          altText: unsplashImage?.description || `Image for ${template.caption.substring(0, 50)}...`,
          mediaUrl: unsplashImage?.url || '',
          platforms: template.platforms,
          scheduledDate: scheduledDate.toISOString(),
          publishedDate: undefined,
          status: 'ready_for_review', // All posts start as ready for review
          unsplashImage: unsplashImage || undefined,
          imageCacheKey: unsplashImage ? `unsplash:${unsplashImage.id}` : undefined,
          createdAt: now,
          updatedAt: now,
        }

        // Store content
        await kv.setex(`content:${id}`, 86400 * 365, JSON.stringify(content))
        await kv.zadd('content:list', { score: Date.now(), member: id })

        generatedPosts.push(content)
      } catch (error: any) {
        console.error(`Error generating post for day ${i + 1}:`, error)
        errors.push(`Day ${i + 1}: ${error.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        posts: generatedPosts,
        totalGenerated: generatedPosts.length,
        errors: errors.length > 0 ? errors : undefined,
      },
      message: `Successfully generated ${generatedPosts.length} posts. ${errors.length > 0 ? `Errors: ${errors.length}` : ''}`,
    })
  } catch (error: any) {
    console.error('Error generating 30-day content:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to generate 30-day content',
      },
      { status: 500 }
    )
  }
}

