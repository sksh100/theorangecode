import type { Metadata } from 'next'
import { buildPageAIMeta } from '@/lib/ai-seo'

export const metadata: Metadata = {
  title: 'What is Cultural Intelligence (CQ)? | Cultural Intelligence UAE | The Orange Code',
  description: 'Learn what Cultural Intelligence (CQ) is and why it matters in the UAE. Discover the three pillars of CQ: cognitive understanding, emotional awareness, and behavioural flexibility. Essential guide for professionals in Dubai, Abu Dhabi, and the GCC.',
  keywords: [
    'Cultural Intelligence',
    'Cultural Intelligence UAE',
    'Cultural Intelligence Dubai',
    'Cultural Intelligence Abu Dhabi',
    'what is Cultural Intelligence',
    'CQ Cultural Intelligence',
    'Cultural Intelligence training UAE',
    'Cultural Intelligence courses',
    'Cultural Intelligence GCC',
    'Cultural Intelligence Middle East',
    'cultural competence UAE',
    'cross-Cultural Intelligence',
    'cultural awareness UAE',
    'Cultural Intelligence definition',
    'Cultural Intelligence meaning',
  ],
  openGraph: {
    title: 'What is Cultural Intelligence (CQ)? | Cultural Intelligence UAE',
    description: 'Learn what Cultural Intelligence is and why it\'s essential for success in the UAE and GCC. Discover the three pillars of CQ and how to develop your Cultural Intelligence skills.',
    url: 'https://www.theorangecode.com/what-is-cq',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
        width: 1200,
        height: 630,
        alt: 'Cultural Intelligence UAE - The Orange Code',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is Cultural Intelligence (CQ)? | Cultural Intelligence UAE',
    description: 'Learn what Cultural Intelligence is and why it\'s essential for success in the UAE and GCC.',
    images: ['https://www.theorangecode.com/og-image'],
  },
  alternates: {
    canonical: 'https://www.theorangecode.com/what-is-cq',
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
      'Cultural Intelligence, Cultural Intelligence UAE, what is Cultural Intelligence, CQ Cultural Intelligence, Cultural Intelligence definition',
    intent:
      'information seeking, learning, education, understand Cultural Intelligence before relocating or doing business in UAE',
    relevance: 'Cultural Intelligence, CQ, cultural competence, cross-cultural communication, UAE culture',
    audience:
      'professionals from US UK Europe China seeking to understand CQ, expats in UAE, business professionals',
  }),
}

export default function WhatIsCQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

