import type { Metadata } from 'next'
import { buildPageAIMeta } from '@/lib/ai-seo'

export const metadata: Metadata = {
  title: 'Why Cultural Intelligence Matters | Cultural Intelligence UAE | The Orange Code',
  description: 'Discover why Cultural Intelligence is essential for success in the UAE and Gulf region. Learn how CQ improves communication, reduces misunderstandings, and builds stronger relationships across cultures in Dubai, Abu Dhabi, and the GCC.',
  keywords: [
    'Cultural Intelligence UAE',
    'why Cultural Intelligence matters',
    'Cultural Intelligence importance',
    'Cultural Intelligence benefits',
    'Cultural Intelligence Dubai',
    'Cultural Intelligence Abu Dhabi',
    'Cultural Intelligence GCC',
    'Cultural Intelligence Middle East',
    'Cultural Intelligence training UAE',
    'Cultural Intelligence for professionals',
    'Cultural Intelligence in business',
    'Cultural Intelligence workplace',
    'Cultural Intelligence success',
    'Cultural Intelligence advantages',
  ],
  openGraph: {
    title: 'Why Cultural Intelligence Matters | Cultural Intelligence UAE',
    description: 'Discover why Cultural Intelligence is essential for success in the UAE and Gulf region. Learn how CQ improves communication and builds stronger relationships.',
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
    description: 'Discover why Cultural Intelligence is essential for success in the UAE and Gulf region.',
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
  other: buildPageAIMeta({
    topic:
      'why Cultural Intelligence matters, Cultural Intelligence importance, Cultural Intelligence benefits, Cultural Intelligence UAE',
    intent:
      'information seeking, learning, understand benefits of Cultural Intelligence for UAE relocation and Gulf business',
    relevance:
      'Cultural Intelligence, CQ benefits, Cultural Intelligence importance, UAE culture, cross-cultural communication',
    audience:
      'professionals from US UK Europe China considering CQ training, expats in UAE, business professionals',
  }),
}

export default function WhyCulturalIntelligenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

