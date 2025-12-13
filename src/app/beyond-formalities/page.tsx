import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { MinimalistLayout } from '@/components/MinimalistLayout'
import { ArrowRight, BookOpen, CheckCircle, Users, Briefcase, Home, Shield, Mail, HelpCircle } from 'lucide-react'
import { BeyondFormalitiesClient } from './BeyondFormalitiesClient'

export const metadata: Metadata = {
  title: 'Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life | The Orange Code',
  description: 'A comprehensive guide to Emirati culture, local customs, and everyday life in the UAE. Understand cultural foundations, communication styles, business protocol, and social etiquette. Instant download after checkout.',
  keywords: [
    'Emirati culture',
    'UAE culture',
    'Dubai culture',
    'UAE customs',
    'Emirati customs',
    'UAE etiquette',
    'Dubai etiquette',
    'UAE business culture',
    'Cultural Intelligence UAE',
    'UAE cultural guide',
    'Emirati cultural guide',
    'UAE everyday life',
    'UAE social norms',
    'UAE communication',
    'UAE business protocol'
  ],
  openGraph: {
    title: 'Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life',
    description: 'A comprehensive guide to Emirati culture, local customs, and everyday life in the UAE. Understand cultural foundations, communication styles, business protocol, and social etiquette.',
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
}

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/eVqbJ1ctw66t9qz7pC8k806'

export default function BeyondFormalitiesPage() {
  return (
    <>
      {/* Schema Markup */}
      <Script
        id="product-schema-beyond-formalities"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life",
            "description": "A comprehensive guide to Emirati culture, local customs, and everyday life in the UAE. Understand cultural foundations, communication styles, business protocol, and social etiquette.",
            "image": "https://www.theorangecode.com/og-image",
            "category": "Educational Book",
            "brand": {
              "@type": "Organization",
              "name": "The Orange Code"
            },
            "offers": {
              "@type": "Offer",
              "price": "149",
              "priceCurrency": "AED",
              "availability": "https://schema.org/InStock",
              "url": STRIPE_PAYMENT_LINK
            }
          })
        }}
      />

      <MinimalistLayout>
        <BeyondFormalitiesClient paymentLink={STRIPE_PAYMENT_LINK} />
      </MinimalistLayout>
    </>
  )
}
