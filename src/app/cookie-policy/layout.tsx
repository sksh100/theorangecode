import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - The Orange Code',
  description: 'Learn about how The Orange Code uses cookies on our website. GDPR and UAE data protection compliant cookie policy with detailed information about essential, analytics, marketing, and personalization cookies.',
  keywords: [
    'cookie policy',
    'GDPR cookies',
    'UAE data protection',
    'cookie consent',
    'privacy cookies',
    'website cookies',
    'The Orange Code cookies',
    'data protection UAE',
    'cookie management',
    'cookie preferences'
  ],
  alternates: {
    canonical: 'https://www.theorangecode.com/cookie-policy',
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
    title: 'Cookie Policy - The Orange Code',
    description: 'Learn about how The Orange Code uses cookies on our website. GDPR and UAE data protection compliant cookie policy.',
    url: 'https://www.theorangecode.com/cookie-policy',
    siteName: 'The Orange Code',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Policy - The Orange Code',
    description: 'Learn about how The Orange Code uses cookies on our website. GDPR and UAE data protection compliant cookie policy.',
  },
}

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

