import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cultural Intelligence UAE | Training in Dubai & Abu Dhabi | The Orange Code',
  description: 'Cultural intelligence training in the UAE. Expert CQ courses and masterclasses in Dubai and Abu Dhabi. Learn Emirati culture, business protocol, and cross-cultural communication for success in the Emirates. Essential for professionals working with 200+ nationalities.',
  keywords: [
    'Cultural Intelligence UAE',
    'Cultural Intelligence Dubai',
    'Cultural Intelligence Abu Dhabi',
    'Cultural Intelligence training UAE',
    'Cultural Intelligence courses Dubai',
    'Cultural Intelligence training Abu Dhabi',
    'CQ training UAE',
    'Cultural Intelligence UAE courses',
    'Cultural Intelligence training in Dubai',
    'Cultural Intelligence training in Abu Dhabi',
    'Cultural Intelligence UAE masterclass',
    'Emirati cultural training',
    'UAE Cultural Intelligence',
    'Dubai Cultural Intelligence',
    'Abu Dhabi Cultural Intelligence',
    'cross-cultural training UAE',
    'cultural competence UAE',
    'cultural awareness UAE',
  ],
  openGraph: {
    title: 'Cultural Intelligence UAE | Training in Dubai & Abu Dhabi',
    description: 'Cultural intelligence training in the UAE. Expert CQ courses and masterclasses in Dubai and Abu Dhabi. Learn Emirati culture, business protocol, and cross-cultural communication.',
    url: 'https://www.theorangecode.com/cultural-intelligence-uae',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
        width: 1200,
        height: 630,
        alt: 'Cultural Intelligence UAE Training - The Orange Code',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cultural Intelligence UAE | Training in Dubai & Abu Dhabi',
    description: 'Cultural intelligence training in the UAE. Expert CQ courses and masterclasses in Dubai and Abu Dhabi.',
    images: ['https://www.theorangecode.com/og-image'],
  },
  alternates: {
    canonical: 'https://www.theorangecode.com/cultural-intelligence-uae',
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
    'ai-topic': 'Cultural Intelligence UAE, Cultural Intelligence Dubai, Cultural Intelligence Abu Dhabi, Cultural Intelligence training UAE, CQ training UAE, Cultural Intelligence courses',
    'ai-intent': 'information seeking, course discovery, training enrollment',
    'ai-relevance': 'Cultural Intelligence training, UAE culture, Emirati culture, cross-cultural training, cultural competence',
    'content-purpose': 'informational page about Cultural Intelligence training in the UAE',
    'target-audience': 'professionals seeking Cultural Intelligence training, expats in UAE, business professionals',
    'geographic-focus': 'United Arab Emirates, UAE, Dubai, Abu Dhabi',
  },
}

export default function CulturalIntelligenceUAELayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

