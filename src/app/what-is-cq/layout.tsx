import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What is Cultural Intelligence (CQ)? | Cultural Intelligence UAE | The Orange Code',
  description: 'Learn what cultural intelligence (CQ) is and why it matters in the UAE. Discover the three pillars of CQ: cognitive understanding, emotional awareness, and behavioural flexibility. Essential guide for professionals in Dubai, Abu Dhabi, and the GCC.',
  keywords: [
    'cultural intelligence',
    'cultural intelligence UAE',
    'cultural intelligence Dubai',
    'cultural intelligence Abu Dhabi',
    'what is cultural intelligence',
    'CQ cultural intelligence',
    'cultural intelligence training UAE',
    'cultural intelligence courses',
    'cultural intelligence GCC',
    'cultural intelligence Middle East',
    'cultural competence UAE',
    'cross-cultural intelligence',
    'cultural awareness UAE',
    'cultural intelligence definition',
    'cultural intelligence meaning',
  ],
  openGraph: {
    title: 'What is Cultural Intelligence (CQ)? | Cultural Intelligence UAE',
    description: 'Learn what cultural intelligence is and why it\'s essential for success in the UAE and GCC. Discover the three pillars of CQ and how to develop your cultural intelligence skills.',
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
    description: 'Learn what cultural intelligence is and why it\'s essential for success in the UAE and GCC.',
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
  other: {
    'ai-topic': 'cultural intelligence, cultural intelligence UAE, what is cultural intelligence, CQ cultural intelligence, cultural intelligence definition, cultural intelligence meaning',
    'ai-intent': 'information seeking, learning, education, understanding cultural intelligence',
    'ai-relevance': 'cultural intelligence, CQ, cultural competence, cross-cultural communication, UAE culture',
    'content-purpose': 'educational content explaining what cultural intelligence is and why it matters',
    'target-audience': 'professionals seeking to understand cultural intelligence, expats in UAE, business professionals',
    'geographic-focus': 'United Arab Emirates, UAE, Dubai, Abu Dhabi, GCC',
  },
}

export default function WhatIsCQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

