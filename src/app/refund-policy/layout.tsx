import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | The Orange Code',
  description: 'Refund policy for The Orange Code digital products and masterclasses. Compliant with UAE Federal Law. No refunds for digital products or masterclass bookings.',
  keywords: [
    'refund policy',
    'no refund policy',
    'digital product refund',
    'ebook refund policy',
    'masterclass refund',
    'UAE refund policy',
    'UAE consumer law',
    'digital product terms',
  ],
  alternates: {
    canonical: 'https://www.theorangecode.com/refund-policy',
  },
  openGraph: {
    title: 'Refund Policy | The Orange Code',
    description: 'Refund policy for The Orange Code digital products and masterclasses. Compliant with UAE Federal Law.',
    url: 'https://www.theorangecode.com/refund-policy',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/etihad-towers.jpg',
        width: 1200,
        height: 630,
        alt: 'The Orange Code - Refund Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refund Policy | The Orange Code',
    description: 'Refund policy for The Orange Code digital products and masterclasses. Compliant with UAE Federal Law.',
    images: ['https://www.theorangecode.com/etihad-towers.jpg'],
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

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

