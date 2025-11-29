import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moving to the UAE from the UK. Cultural Guide for British Professionals',
  description: 'A practical guide for British professionals relocating to the UAE. Learn workplace culture, etiquette, communication and expectations before you arrive.',
  keywords: [
    // Primary long-tail keywords
    'what do UK expats need to know before moving to UAE',
    'how does UAE workplace culture differ from UK',
    'what should British professionals know about Emirati culture',
    'UK to UAE relocation cultural guide',
    'British expats moving to UAE what to know',
    'UAE workplace culture for British professionals',
    'Emirati communication styles for UK expats',
    'moving from UK to UAE cultural differences',
    'British professionals relocating to UAE guide',
    // Secondary keywords
    'moving to UAE from UK',
    'UK expats in UAE',
    'British expats Dubai culture',
    'UAE relocation guide',
    'moving to Dubai from UK',
    'UAE etiquette for UK professionals',
    'GCC business culture UK',
    'UK to UAE relocation',
    'British professionals UAE',
    'UAE cultural guide UK',
    'Dubai relocation guide UK',
    'Abu Dhabi relocation guide UK',
    'UAE expat guide UK',
    'Emirati culture for British',
    'UAE business culture UK',
    'British expatriates UAE',
    'UK professionals moving to UAE',
    'UAE cultural intelligence guide',
    'Emirati workplace culture',
    // Long-tail variations
    'what UK expats should know about UAE before moving',
    'UAE cultural differences from UK for British professionals',
    'how to adapt from UK to UAE workplace culture',
    'British expat guide to Emirati business culture',
    'UK professional moving to UAE cultural preparation',
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

