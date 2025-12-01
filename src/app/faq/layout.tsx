import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | The Orange Code',
  description: 'Frequently asked questions about The Orange Code cultural intelligence masterclasses, private coaching, corporate training, and services in Abu Dhabi, UAE.',
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
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

