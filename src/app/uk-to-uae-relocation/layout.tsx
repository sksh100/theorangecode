import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moving to the UAE from the UK. Cultural Guide for British Professionals',
  description: 'A practical guide for British professionals relocating to the UAE. Learn workplace culture, etiquette, communication and expectations before you arrive.',
  keywords: [
    // Primary keywords (high traffic + high intent + low competition)
    'moving to UAE from UK',
    'UK expats UAE',
    'Dubai relocation guide UK',
    'British expats Dubai',
    'UK to UAE work culture',
    'UAE culture for British expats',
    'UAE work culture explained',
    'Abu Dhabi relocation UK',
    'Dubai relocation checklist UK',
    'moving to Dubai for work',
    'UAE relocation tips',
    'UAE workplace culture',
    // Secondary keywords (researching jobs and lifestyle)
    'Dubai jobs',
    'UAE jobs',
    'jobs in UAE for foreigners',
    'corporate relocation UAE',
    'UAE business culture',
    'UAE communication style',
    'life in UAE for expats',
    'UK teacher jobs UAE',
    'nurses moving to UAE',
    'new UAE visas 2025',
    'British in UAE',
    'difference between UK and UAE workplace',
    'Emirati culture explained',
    // Long tail keywords (easiest to rank quickly)
    'how to prepare for UAE workplace as a British expat',
    'what British expats must know about UAE culture',
    'mistakes UK expats make in UAE',
    'UK to UAE relocation requirements',
    'how to understand Emirati communication',
    'what to expect working in the UAE',
    'UAE etiquette for British professionals',
    'how to act in UAE workplace',
    // Additional long-tail variations
    'what do UK expats need to know before moving to UAE',
    'how does UAE workplace culture differ from UK',
    'what should British professionals know about Emirati culture',
    'UK to UAE relocation cultural guide',
    'British expats moving to UAE what to know',
    'UAE workplace culture for British professionals',
    'Emirati communication styles for UK expats',
    'moving from UK to UAE cultural differences',
    'British professionals relocating to UAE guide',
  ],
  alternates: {
    canonical: 'https://www.theorangecode.com/uk-to-uae-relocation',
  },
  openGraph: {
    title: 'Moving to the UAE from the UK. Cultural Guide for British Professionals',
    description: 'A practical guide for British professionals relocating to the UAE. Learn workplace culture, etiquette, communication and expectations before you arrive.',
    url: 'https://www.theorangecode.com/uk-to-uae-relocation',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
        width: 1200,
        height: 630,
        alt: 'UK to UAE Relocation Cultural Guide',
      },
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moving to the UAE from the UK. Cultural Guide for British Professionals',
    description: 'A practical guide for British professionals relocating to the UAE. Learn workplace culture, etiquette, communication and expectations before you arrive.',
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

export default function UKToUAERelocationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

