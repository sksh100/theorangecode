import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Cultural Intelligence Matters | Cultural Intelligence UAE | The Orange Code',
  description: 'Discover why cultural intelligence is essential for success in the UAE and Gulf region. Learn how CQ improves communication, reduces misunderstandings, and builds stronger relationships across cultures in Dubai, Abu Dhabi, and the GCC.',
  keywords: [
    'cultural intelligence UAE',
    'why cultural intelligence matters',
    'cultural intelligence importance',
    'cultural intelligence benefits',
    'cultural intelligence Dubai',
    'cultural intelligence Abu Dhabi',
    'cultural intelligence GCC',
    'cultural intelligence Middle East',
    'cultural intelligence training UAE',
    'cultural intelligence for professionals',
    'cultural intelligence in business',
    'cultural intelligence workplace',
    'cultural intelligence success',
    'cultural intelligence advantages',
  ],
  openGraph: {
    title: 'Why Cultural Intelligence Matters | Cultural Intelligence UAE',
    description: 'Discover why cultural intelligence is essential for success in the UAE and Gulf region. Learn how CQ improves communication and builds stronger relationships.',
    url: 'https://www.theorangecode.com/why-cultural-intelligence',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
        width: 1200,
        height: 630,
        alt: 'Why Cultural Intelligence Matters - The Orange Code',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Cultural Intelligence Matters | Cultural Intelligence UAE',
    description: 'Discover why cultural intelligence is essential for success in the UAE and Gulf region.',
    images: ['https://www.theorangecode.com/og-image'],
  },
  alternates: {
    canonical: 'https://www.theorangecode.com/why-cultural-intelligence',
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
    'ai-topic': 'why cultural intelligence matters, cultural intelligence importance, cultural intelligence benefits, cultural intelligence UAE, cultural intelligence for professionals',
    'ai-intent': 'information seeking, learning, understanding benefits of cultural intelligence',
    'ai-relevance': 'cultural intelligence, CQ benefits, cultural intelligence importance, UAE culture, cross-cultural communication',
    'content-purpose': 'educational content explaining why cultural intelligence is essential for success',
    'target-audience': 'professionals considering cultural intelligence training, expats in UAE, business professionals',
    'geographic-focus': 'United Arab Emirates, UAE, Dubai, Abu Dhabi, GCC',
  },
}

export default function WhyCulturalIntelligenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

