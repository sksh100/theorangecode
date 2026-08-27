import type { Metadata } from 'next'
import { buildPageAIMeta, SITEWIDE_AI_META } from '@/lib/ai-seo'

export const metadata: Metadata = {
  title: 'Cultural Intelligence Masterclasses | The Orange Code',
  description: 'Join our Cultural Intelligence Masterclasses in Abu Dhabi. Learn UAE culture, Emirati etiquette, and business protocols. 3-hour sessions for professionals and expatriates.',
  keywords: [
    'Cultural Intelligence masterclass',
    'UAE culture training',
    'Emirati etiquette course',
    'Abu Dhabi masterclass',
    'cultural training UAE',
    'expat training Dubai',
    'business culture UAE',
    'GCC Cultural Intelligence',
    // UK-specific keywords
    'Cultural Intelligence masterclass UK',
    'UAE culture training UK',
    'British professionals UAE training',
    'UK expat cultural training',
    'Cultural Intelligence course UK',
    'UAE masterclass for British professionals',
    'UK to UAE cultural training',
    // Netherlands/Dutch keywords
    'Cultural Intelligence masterclass Netherlands',
    'culturele intelligentie training',
    'Nederlandse professionals UAE',
    'Nederlandse expats Dubai',
    'Nederlandse expats Abu Dhabi',
    'culturele training UAE',
    'culturele intelligentie cursus',
    'UAE cultuur training Nederland',
    'Dubai cultuur training',
    'Abu Dhabi cultuur training',
    'Nederlandse professionals Dubai',
    'Nederlandse professionals Abu Dhabi',
    'Nederlandse overheid samenwerking',
    'Dutch government collaboration',
    'Cultural Intelligence training Netherlands',
    'UAE cultural training for Dutch professionals',
    // Italy/Italian keywords
    'Cultural Intelligence masterclass Italy',
    'intelligenza culturale training',
    'professionisti italiani UAE',
    'professionisti italiani Dubai',
    'professionisti italiani Abu Dhabi',
    'espatriati italiani UAE',
    'espatriati italiani Dubai',
    'training culturale UAE',
    'corso intelligenza culturale',
    'formazione culturale UAE',
    'cultura UAE per italiani',
    'cultura Dubai per italiani',
    'cultura Abu Dhabi per italiani',
    'Cultural Intelligence training Italy',
    'UAE cultural training for Italian professionals',
    // France/French keywords
    'Cultural Intelligence masterclass France',
    'intelligence culturelle formation',
    'professionnels français UAE',
    'professionnels français Dubai',
    'professionnels français Abu Dhabi',
    'expatriés français UAE',
    'expatriés français Dubai',
    'formation culturelle UAE',
    'cours intelligence culturelle',
    'formation culturelle Dubai',
    'formation culturelle Abu Dhabi',
    'culture UAE pour français',
    'culture Dubai pour français',
    'culture Abu Dhabi pour français',
    'Cultural Intelligence training France',
    'UAE cultural training for French professionals'
  ],
  alternates: {
    canonical: 'https://www.theorangecode.com/masterclasses',
    languages: {
      'en-GB': 'https://www.theorangecode.com/masterclasses',
      'en-NL': 'https://www.theorangecode.com/masterclasses',
      'nl-NL': 'https://www.theorangecode.com/masterclasses',
      'it-IT': 'https://www.theorangecode.com/masterclasses',
      'fr-FR': 'https://www.theorangecode.com/masterclasses',
    },
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
  other: {
    ...SITEWIDE_AI_META,
    ...buildPageAIMeta({
      topic:
        'Cultural Intelligence masterclasses, UAE cultural training, Emirati etiquette course, Abu Dhabi masterclass, business culture UAE',
      intent: 'booking, enrollment, course registration, cultural training, professional development, in-person masterclass',
      relevance:
        'Cultural Intelligence training, masterclasses, UAE culture, Emirati etiquette, business protocol, Etihad Towers',
      audience:
        'professionals from US UK Europe China moving to UAE, expats in Dubai and Abu Dhabi, business professionals',
    }),
    'content-purpose': 'book and enroll in Cultural Intelligence masterclasses for professionals in the UAE',
    'geographic-focus':
      'United Arab Emirates, UAE, Dubai, Abu Dhabi, United States, United Kingdom, UK, Netherlands, Europe, China',
    'purchase-intent': 'high, ready to book',
    'session-format': 'in-person only, Etihad Towers Abu Dhabi, twice weekly through end of year',
    'uk-audience':
      'British professionals, UK expats, UK professionals relocating to UAE, British expats Dubai, British expats Abu Dhabi',
    'us-audience': 'American professionals, US expats Dubai, US executives Middle East',
    'china-audience': 'Chinese professionals UAE, Chinese executives Middle East, China to UAE business culture',
    'dutch-audience':
      'Nederlandse professionals, Dutch professionals, Nederlandse expats, Dutch expats UAE',
    'italian-audience': 'professionisti italiani, Italian professionals, espatriati italiani UAE',
    'french-audience': 'professionnels français, French professionals, expatriés français UAE',
  },
}

export default function MasterclassesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

