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
}

export default function WhatIsCQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

