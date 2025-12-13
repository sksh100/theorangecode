import { Metadata } from 'next'
import Script from 'next/script'
import { MinimalistLayout } from '@/components/MinimalistLayout'
import { BeyondFormalitiesClient } from './BeyondFormalitiesClient'

export const metadata: Metadata = {
  title: 'Beyond Formalities, Understanding Emirati Culture, Local Customs, and Everyday Life | The Orange Code',
  description: 'Beyond Formalities is a cultural guide to Emirati culture, local customs, and everyday life in the United Arab Emirates. It covers identity and values, greetings and communication, nonverbal cues, gender etiquette, hospitality and majlis, dining customs, business culture and protocol, and modern UAE life.',
  keywords: [
    'UAE culture',
    'Emirati culture',
    'UAE customs',
    'UAE etiquette',
    'business culture UAE',
    'majlis etiquette',
    'Abu Dhabi',
    'Dubai',
    'United Arab Emirates cultural guide',
    'Emirati customs',
    'UAE business protocol',
    'UAE cultural guide',
    'Emirati cultural guide',
    'UAE everyday life',
    'UAE social norms',
    'UAE communication'
  ],
  alternates: {
    canonical: 'https://www.theorangecode.com/beyond-formalities',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    title: 'Beyond Formalities, Understanding Emirati Culture, Local Customs, and Everyday Life',
    description: 'Beyond Formalities is a cultural guide to Emirati culture, local customs, and everyday life in the United Arab Emirates. It covers identity and values, greetings and communication, nonverbal cues, gender etiquette, hospitality and majlis, dining customs, business culture and protocol, and modern UAE life.',
    type: 'website',
    url: 'https://www.theorangecode.com/beyond-formalities',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
        width: 1200,
        height: 630,
        alt: 'Beyond Formalities - Understanding Emirati Culture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beyond Formalities, Understanding Emirati Culture, Local Customs, and Everyday Life',
    description: 'Beyond Formalities is a cultural guide to Emirati culture, local customs, and everyday life in the United Arab Emirates.',
    images: ['https://www.theorangecode.com/og-image'],
  },
}

// Use environment variable with fallback to provided link
const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_BEYOND_FORMALITIES || 'https://buy.stripe.com/eVqbJ1ctw66t9qz7pC8k806'

export default function BeyondFormalitiesPage() {
  return (
    <>
      {/* Product Schema Markup */}
      <Script
        id="product-schema-beyond-formalities"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Beyond Formalities",
            "description": "Beyond Formalities is a cultural guide to Emirati culture, local customs, and everyday life in the United Arab Emirates. It covers identity and values, greetings and communication, nonverbal cues, gender etiquette, hospitality and majlis, dining customs, business culture and protocol, and modern UAE life.",
            "image": "https://www.theorangecode.com/og-image",
            "category": "E-Guide",
            "brand": {
              "@type": "Organization",
              "name": "The Orange Code"
            },
            "offers": {
              "@type": "Offer",
              "price": "149",
              "priceCurrency": "AED",
              "availability": "https://schema.org/InStock",
              "url": "https://www.theorangecode.com/beyond-formalities"
            }
          })
        }}
      />

      {/* FAQ Schema Markup */}
      <Script
        id="faq-schema-beyond-formalities"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this for tourists?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Beyond Formalities is designed for professionals, residents, and anyone doing business or building relationships in the UAE. While tourists may find it helpful, it focuses on deeper cultural understanding for those engaging with Emirati culture in professional and social contexts."
                }
              },
              {
                "@type": "Question",
                "name": "Is it only for relocating?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. This guide is valuable whether you are preparing to arrive, newly arrived, or already living in the UAE. It helps anyone who wants to understand Emirati culture and build meaningful relationships, regardless of how long they have been in the Emirates."
                }
              },
              {
                "@type": "Question",
                "name": "Does it include business culture?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Beyond Formalities covers business culture and protocol in the UAE, including how cultural values influence professional communication, relationship building, and business etiquette."
                }
              },
              {
                "@type": "Question",
                "name": "What do Emiratis say about the E-Guide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Emiratis to whom this E-Guide was presented were all delighted to see the efforts we made to reflect their culture and values with respect for their country and society to foreigners. They were grateful for our undertaking to compile the E-Guide and for the fact that we are educating others with respect for their culture and society to make them understand the dynamics that can bridge the distance."
                }
              },
              {
                "@type": "Question",
                "name": "How do I receive the E-Guide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "After completing your purchase through our secure Stripe checkout, you will receive an email with a download link. The link is valid for 48 hours. Your PDF E-Guide will be watermarked with your email address for security."
                }
              },
              {
                "@type": "Question",
                "name": "Can teams purchase access?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Teams and organizations can purchase multiple copies. For bulk purchases or corporate licensing, please contact us at hello@theorangecode.com to discuss options."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer deeper cultural intelligence training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The Orange Code offers comprehensive Cultural Intelligence masterclasses, private coaching, and corporate training programs. Visit our masterclasses page or contact us at hello@theorangecode.com to learn more."
                }
              }
            ]
          })
        }}
      />

      <MinimalistLayout>
        <BeyondFormalitiesClient paymentLink={STRIPE_PAYMENT_LINK} />
      </MinimalistLayout>
    </>
  )
}
