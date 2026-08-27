import type { Metadata } from 'next'
import { buildPageAIMeta, SITEWIDE_AI_META } from '@/lib/ai-seo'

export const metadata: Metadata = {
  other: {
    ...SITEWIDE_AI_META,
    ...buildPageAIMeta({
      topic:
        'UK to UAE relocation guide, moving to the UAE from UK, UAE culture for British expats, Dubai relocation, Abu Dhabi relocation',
      intent:
        'relocation, expat, UK to UAE move, British professionals UAE, purchase cultural guide',
      relevance:
        'UAE culture, work culture UAE, British expats, UK expat guide, Cultural Intelligence training, Emirati etiquette',
      audience:
        'British professionals, UK expats, UK professionals relocating to UAE, teachers, nurses, engineers',
    }),
    'content-language': 'en-GB',
    'purchase-intent': 'high, ready to buy, conversion-focused',
    'uk-platforms':
      'Amazon UK, Waterstones, Foyles, Book Depository UK, Kobo UK, Apple Books UK, Google Play Books UK',
    'chinese-keywords':
      '文化智能, 跨文化沟通, 阿联酋文化, 迪拜文化, 阿布扎比文化, 文化智能培训, 文化智能课程, 跨文化培训',
  },
  title: 'Moving to the UAE from the UK. Cultural Guide for British Professionals | The Orange Code',
  description: 'A practical Cultural Intelligence guide for British professionals relocating to the UAE. Learn UAE workplace culture, Emirati etiquette, communication styles, dos and donts, and what to expect before you arrive. Written specifically for UK expats moving to Dubai and Abu Dhabi.',
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
    'UK to UAE expat guide',
    'British expat guide UAE',
    'UAE guide for British',
    'Dubai guide for UK expats',
    'Abu Dhabi guide for British',
    'UAE dos and donts for British',
    'UAE rules for UK expats',
    'UAE etiquette for British',
    // Secondary keywords (researching jobs and lifestyle)
    'Dubai jobs',
    'UAE jobs',
    'jobs in UAE for foreigners',
    'jobs in UAE for British',
    'UK jobs in UAE',
    'British jobs Dubai',
    'British jobs Abu Dhabi',
    'corporate relocation UAE',
    'UAE business culture',
    'UAE communication style',
    'life in UAE for expats',
    'life in UAE for British',
    'UK teacher jobs UAE',
    'UK nurse jobs UAE',
    'UK engineer jobs UAE',
    'nurses moving to UAE',
    'teachers moving to UAE',
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
    'UAE cultural dos and donts for British',
    'what not to do in UAE as British expat',
    'UAE rules and regulations for UK expats',
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
    'UK expat UAE guide',
    'British expat Dubai guide',
    'British expat Abu Dhabi guide',
    'UAE expat guide for British',
    'UAE relocation guide UK professionals',
  ],
  alternates: {
    canonical: 'https://www.theorangecode.com/uk-to-uae-relocation',
  },
  openGraph: {
    title: 'Moving to the UAE from the UK. Cultural Guide for British Professionals | The Orange Code',
    description: 'A practical Cultural Intelligence guide for British professionals relocating to the UAE. Learn UAE workplace culture, Emirati etiquette, communication styles, dos and donts, and what to expect before you arrive. Written specifically for UK expats moving to Dubai and Abu Dhabi.',
    url: 'https://www.theorangecode.com/uk-to-uae-relocation',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
        width: 1200,
        height: 630,
        alt: 'UK to UAE Relocation Cultural Guide - The Orange Code',
      },
    ],
    locale: 'en_GB',
    type: 'article',
    countryName: 'United Kingdom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moving to the UAE from the UK. Cultural Guide for British Professionals',
    description: 'A practical Cultural Intelligence guide for British professionals relocating to the UAE. Learn UAE workplace culture, Emirati etiquette, and communication styles before you arrive.',
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

