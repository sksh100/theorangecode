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
    'GCC cultural intelligence'
  ],
  alternates: {
    canonical: 'https://www.theorangecode.com/masterclasses',
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
}

export default function MasterclassesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

