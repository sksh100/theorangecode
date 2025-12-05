import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cultural Intelligence Masterclasses | The Orange Code',
  description: 'Join our Cultural Intelligence Masterclasses in Abu Dhabi. Learn UAE culture, Emirati etiquette, and business protocols. 3-hour sessions for professionals and expatriates.',
  keywords: [
    'cultural intelligence masterclass',
    'UAE culture training',
    'Emirati etiquette course',
    'Abu Dhabi masterclass',
    'cultural training UAE',
    'expat training Dubai',
    'business culture UAE',
    'GCC cultural intelligence',
    // UK-specific keywords
    'cultural intelligence masterclass UK',
    'UAE culture training UK',
    'British professionals UAE training',
    'UK expat cultural training',
    'cultural intelligence course UK',
    'UAE masterclass for British professionals',
    'UK to UAE cultural training',
    // Netherlands/Dutch keywords
    'cultural intelligence masterclass Netherlands',
    'culturele intelligentie training',
    'Nederlandse professionals UAE',
    'Nederlandse expats Dubai',
    'Nederlandse expats Abu Dhabi',
    'culturele training UAE',
    'culturele intelligentie cursus',
    'UAE cultuur training Nederland',
    'Dubai cultuur training',
    'Abu Dhabi cultuur training',
    'Nederlandse professionals Dubai',
    'Nederlandse professionals Abu Dhabi',
    'Nederlandse overheid samenwerking',
    'Dutch government collaboration',
    'cultural intelligence training Netherlands',
    'UAE cultural training for Dutch professionals'
  ],
  alternates: {
    canonical: 'https://www.theorangecode.com/masterclasses',
    languages: {
      'en-GB': 'https://www.theorangecode.com/masterclasses',
      'en-NL': 'https://www.theorangecode.com/masterclasses',
      'nl-NL': 'https://www.theorangecode.com/masterclasses',
    },
  },
  openGraph: {
    title: 'Cultural Intelligence Masterclasses | The Orange Code',
    description: 'Join our Cultural Intelligence Masterclasses in Abu Dhabi. Learn UAE culture, Emirati etiquette, and business protocols.',
    url: 'https://www.theorangecode.com/masterclasses',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
        width: 1200,
        height: 630,
        alt: 'The Orange Code - Cultural Intelligence Masterclasses',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cultural Intelligence Masterclasses | The Orange Code',
    description: 'Join our Cultural Intelligence Masterclasses in Abu Dhabi. Learn UAE culture, Emirati etiquette, and business protocols.',
    images: ['https://www.theorangecode.com/og-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'ai-topic': 'cultural intelligence masterclasses, UAE cultural training, Emirati etiquette course, Abu Dhabi masterclass, cultural training UAE, business culture UAE',
    'ai-intent': 'booking, enrollment, course registration, cultural training, professional development',
    'ai-relevance': 'cultural intelligence training, masterclasses, UAE culture, Emirati etiquette, business protocol',
    'content-purpose': 'book and enroll in cultural intelligence masterclasses for professionals in the UAE',
    'target-audience': 'professionals moving to UAE, expats in Dubai, expats in Abu Dhabi, business professionals, British professionals, Dutch professionals, Nederlandse professionals',
    'geographic-focus': 'United Arab Emirates, UAE, Dubai, Abu Dhabi, United Kingdom, UK, Netherlands, Nederland',
    'content-type': 'course, training program, educational service, government collaboration',
    'purchase-intent': 'high, ready to book',
    // UK-specific
    'uk-audience': 'British professionals, UK expats, UK professionals relocating to UAE, British expats Dubai, British expats Abu Dhabi',
    'uk-keywords': 'cultural intelligence masterclass UK, UAE culture training UK, British professionals UAE training',
    // Netherlands/Dutch-specific
    'dutch-audience': 'Nederlandse professionals, Dutch professionals, Nederlandse expats, Dutch expats UAE, Nederlandse professionals Dubai, Nederlandse professionals Abu Dhabi',
    'dutch-keywords': 'culturele intelligentie training, culturele training UAE, Nederlandse professionals UAE, culturele intelligentie cursus',
    'dutch-government': 'Nederlandse overheid samenwerking, Dutch government collaboration, cultural intelligence government training, public sector cultural training',
    'government-collaboration': 'government partnership, public sector training, cultural intelligence for government, international cultural cooperation',
  },
}

export default function MasterclassesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

