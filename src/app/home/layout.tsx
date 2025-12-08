import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | The Orange Code',
  description: 'The Orange Code - Cultural Intelligence & Leadership Training in Dubai and Abu Dhabi, UAE. Premium Cultural Intelligence courses and masterclasses for professionals.',
  alternates: {
    canonical: 'https://www.theorangecode.com/home',
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
  openGraph: {
    title: 'Home | The Orange Code',
    description: 'The Orange Code - Cultural Intelligence & Leadership Training in Dubai and Abu Dhabi, UAE.',
    url: 'https://www.theorangecode.com/home',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
        width: 1200,
        height: 630,
        alt: 'The Orange Code - Cultural Intelligence Training',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | The Orange Code',
    description: 'The Orange Code - Cultural Intelligence & Leadership Training in Dubai and Abu Dhabi, UAE.',
    images: ['https://www.theorangecode.com/og-image'],
  },
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

