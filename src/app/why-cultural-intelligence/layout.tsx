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
}

export default function WhyCulturalIntelligenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

