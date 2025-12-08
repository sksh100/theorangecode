import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cultural Intelligence Institute – The Orange Code',
  description: 'Master Cultural Intelligence with The Orange Code, the Gulf\'s premier institute for research-based training in communication, trust and leadership. Our programs teach professionals, families and organisations how to thrive in Dubai, Abu Dhabi and across the GCC by building respectful relationships, understanding local traditions and unlocking opportunity through Cultural Intelligence. Learn how to translate awareness into success, connect confidently with diverse teams and accelerate your career and business across the Middle East',
  alternates: {
    canonical: 'https://www.theorangecode.com/faq',
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
    'ai-topic': 'Cultural Intelligence masterclasses FAQ, UAE cultural training questions, Cultural Intelligence courses UAE, masterclass booking, cultural training Abu Dhabi',
    'ai-intent': 'information seeking, FAQ, customer support, booking inquiries',
    'ai-relevance': 'Cultural Intelligence training, masterclasses, UAE culture, expat resources',
    'content-purpose': 'answer frequently asked questions about Cultural Intelligence masterclasses and services',
    'target-audience': 'prospective clients, expats in UAE, professionals seeking cultural training',
    'geographic-focus': 'United Arab Emirates, UAE, Dubai, Abu Dhabi',
  },
  openGraph: {
    title: 'Cultural Intelligence Institute – The Orange Code',
    description: 'Master Cultural Intelligence with The Orange Code, the Gulf\'s premier institute for research-based training in communication, trust and leadership. Our programs teach professionals, families and organisations how to thrive in Dubai, Abu Dhabi and across the GCC by building respectful relationships, understanding local traditions and unlocking opportunity through Cultural Intelligence. Learn how to translate awareness into success, connect confidently with diverse teams and accelerate your career and business across the Middle East',
    url: 'https://www.theorangecode.com/faq',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/about-us.jpg',
        width: 1200,
        height: 630,
        alt: 'The Orange Code FAQ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cultural Intelligence Institute – The Orange Code',
    description: 'Master Cultural Intelligence with The Orange Code, the Gulf\'s premier institute for research-based training in communication, trust and leadership. Our programs teach professionals, families and organisations how to thrive in Dubai, Abu Dhabi and across the GCC.',
    images: ['https://www.theorangecode.com/about-us.jpg'],
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

