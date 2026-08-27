import { Metadata } from 'next'
import Script from 'next/script'
import { MinimalistLayout } from '@/components/MinimalistLayout'
import { BeyondFormalitiesClient } from './BeyondFormalitiesClient'
import { BeyondFormalitiesI18nDigest } from '@/components/BeyondFormalitiesI18nMeta'
import { buildPageAIMeta } from '@/lib/ai-seo'
import {
  BEYOND_FORMALITIES_MULTILINGUAL_KEYWORDS,
  BF_HREFLANG_MAP,
  BF_OG_LOCALES,
  BF_URL,
  buildBeyondFormalitiesI18nMeta,
} from '@/lib/beyond-formalities-i18n-seo'

const PAGE_URL = BF_URL
const OG_IMAGE =
  'https://www.theorangecode.com/images/beyond-formalities-emirati-culture-uae-etiquette-eguide-cover.png'

const PAGE_TITLE =
  'Beyond Formalities: UAE Culture Guide for Expats Relocating & Doing Business in the Middle East'
const PAGE_DESCRIPTION =
  'Beyond Formalities is the practical Emirati culture and UAE etiquette guide for professionals from Europe, Russia, the US, UK and China relocating to the UAE or Middle East, expanding into Gulf markets, or building trust with Emirati partners. Learn customs, communication, majlis etiquette, hospitality, and UAE business protocol.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  applicationName: 'The Orange Code',
  category: 'Education',
  classification: 'Cultural Intelligence / Expat Relocation / Middle East Business',
  keywords: [
    ...BEYOND_FORMALITIES_MULTILINGUAL_KEYWORDS,
    'Beyond Formalities e-guide',
    'UAE cultural intelligence',
    'relocating to the Middle East',
    'moving to Dubai as an expat',
    'moving to Abu Dhabi as an expat',
    'how to work with Emiratis',
    'majlis etiquette',
    'UAE hospitality customs',
    'UAE dining etiquette',
    'nonverbal communication UAE',
    'gender etiquette UAE',
    'United Arab Emirates cultural guide',
  ],
  authors: [{ name: 'The Orange Code', url: 'https://www.theorangecode.com' }],
  creator: 'The Orange Code',
  publisher: 'The Orange Code',
  alternates: {
    canonical: PAGE_URL,
    languages: BF_HREFLANG_MAP,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: 'website',
    url: PAGE_URL,
    siteName: 'The Orange Code',
    locale: 'en_US',
    alternateLocale: BF_OG_LOCALES.filter((l) => l !== 'en_US'),
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Beyond Formalities e-guide cover — Emirati culture, local customs and UAE etiquette by The Orange Code',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description:
      'Practical Emirati culture guide for European, Russian, US and UK professionals relocating to or doing business in the UAE and Middle East.',
    images: [OG_IMAGE],
  },
  other: {
    ...buildPageAIMeta({
      topic:
        'Beyond Formalities, UAE culture guide, Emirati etiquette, Middle East relocation, doing business in UAE, European expats, Russian expats',
      intent:
        'relocate to UAE from Europe or Russia, move to Dubai, move to Abu Dhabi, do business in Middle East, buy Beyond Formalities e-guide',
      relevance:
        'Emirati culture, UAE business etiquette, GCC expat guide, Cultural Intelligence UAE, Beyond Formalities e-guide, культура ОАЭ, VAE Kultur, culture EAU',
      audience:
        'European and Russian professionals relocating to UAE Middle East, expats, executives, founders doing business in Gulf',
      entities:
        'Beyond Formalities, The Orange Code, Emirati culture, UAE, Dubai, Abu Dhabi, Middle East, Europe, Russia',
    }),
    ...buildBeyondFormalitiesI18nMeta(),
  },
}

// Use environment variable with fallback to provided New Year offer link
// New Stripe payment link: https://buy.stripe.com/14AeVddxA66tdGPaBO8k807
const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_BEYOND_FORMALITIES ||
  'https://buy.stripe.com/14AeVddxA66tdGPaBO8k807'

export default function BeyondFormalitiesPage() {
  return (
    <>
      <BeyondFormalitiesI18nDigest />
      {/* Product + Book Schema */}
      <Script
        id="product-schema-beyond-formalities"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Product', 'Book'],
            '@id': `${PAGE_URL}#product`,
            name: 'Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life',
            alternateName: 'Beyond Formalities',
            description: PAGE_DESCRIPTION,
            image: OG_IMAGE,
            url: PAGE_URL,
            category: 'Cultural Intelligence E-Guide',
            bookFormat: 'https://schema.org/EBook',
            inLanguage: 'en',
            audience: {
              '@type': 'Audience',
              audienceType:
                'Professionals and expats from the US, UK, Europe, and China relocating to or doing business in the UAE and Middle East',
            },
            about: [
              { '@type': 'Thing', name: 'Emirati culture' },
              { '@type': 'Thing', name: 'UAE business etiquette' },
              { '@type': 'Thing', name: 'Middle East relocation' },
              { '@type': 'Place', name: 'United Arab Emirates' },
              { '@type': 'Place', name: 'Dubai' },
              { '@type': 'Place', name: 'Abu Dhabi' },
            ],
            brand: {
              '@type': 'Organization',
              name: 'The Orange Code',
              url: 'https://www.theorangecode.com',
            },
            author: {
              '@type': 'Organization',
              name: 'The Orange Code',
            },
            publisher: {
              '@type': 'Organization',
              name: 'The Orange Code',
              url: 'https://www.theorangecode.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.theorangecode.com/logo1.png',
              },
            },
            offers: {
              '@type': 'Offer',
              price: '89',
              priceCurrency: 'AED',
              availability: 'https://schema.org/InStock',
              url: PAGE_URL,
              priceValidUntil: '2026-12-31',
              eligibleRegion: [
                { '@type': 'Country', name: 'United States' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'China' },
                { '@type': 'Country', name: 'Netherlands' },
                { '@type': 'Country', name: 'France' },
                { '@type': 'Country', name: 'Germany' },
                { '@type': 'Country', name: 'Italy' },
                { '@type': 'Country', name: 'United Arab Emirates' },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '9',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* WebPage + Breadcrumb Schema */}
      <Script
        id="webpage-schema-beyond-formalities"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': PAGE_URL,
            url: PAGE_URL,
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            inLanguage: 'en',
            isPartOf: {
              '@type': 'WebSite',
              name: 'The Orange Code',
              url: 'https://www.theorangecode.com',
            },
            about: {
              '@type': 'Thing',
              name: 'Emirati culture and UAE business etiquette for international professionals',
            },
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: OG_IMAGE,
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.theorangecode.com/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Beyond Formalities',
                  item: PAGE_URL,
                },
              ],
            },
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', 'h2', 'meta[name="description"]'],
            },
          }),
        }}
      />

      {/* FAQ Schema Markup */}
      <Script
        id="faq-schema-beyond-formalities"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is Beyond Formalities for people relocating to the UAE from the US, UK, Europe, or China?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Beyond Formalities is written for international professionals and families preparing to relocate to the UAE or Middle East, including audiences from the United States, United Kingdom, Europe, and China. It explains Emirati culture, customs, and everyday interaction so you arrive with clarity and confidence.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does this guide help with doing business in the Middle East?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Beyond Formalities covers UAE business culture and protocol, including how trust, communication, hierarchy, and relationship-building influence professional outcomes with Emirati and Gulf partners.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is this for tourists?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Beyond Formalities is designed for professionals, residents, and anyone doing business or building relationships in the UAE. While tourists may find it helpful, it focuses on deeper cultural understanding for those engaging with Emirati culture in professional and social contexts.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is it only for relocating?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. This guide is valuable whether you are preparing to arrive, newly arrived, already living in the UAE, or partnering with UAE organisations from abroad.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does it include business culture?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Beyond Formalities covers business culture and protocol in the UAE, including how cultural values influence professional communication, relationship building, and business etiquette.',
                },
              },
              {
                '@type': 'Question',
                name: 'What do Emiratis say about the E-Guide?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'This guide was reviewed by Emiratis who expressed their appreciation for the respectful and accurate representation of their culture, values, and society. They acknowledged the intention behind this work and welcomed the effort to educate others in a manner that promotes understanding of the cultural dynamics that influence relationships and communication in the United Arab Emirates.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I receive the E-Guide?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'After completing your purchase through our secure Stripe checkout, you will receive an email with a download link. The link is valid for 48 hours. Your PDF E-Guide will be watermarked with your email address for security.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can teams purchase access?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Teams and organizations can purchase multiple copies. For bulk purchases or corporate licensing, please contact us at hello@theorangecode.com to discuss options.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you offer deeper Cultural Intelligence training?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The Orange Code offers comprehensive Cultural Intelligence masterclasses, private coaching, and corporate training programs. Visit our masterclasses page or contact us at hello@theorangecode.com to learn more.',
                },
              },
            ],
          }),
        }}
      />

      <MinimalistLayout>
        <BeyondFormalitiesClient paymentLink={STRIPE_PAYMENT_LINK} />
      </MinimalistLayout>
    </>
  )
}
