'use client'

// Force dynamic rendering to prevent build timeouts
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MinimalistLayout } from '@/components/MinimalistLayout'
import { trackCTAClick } from '@/lib/tracking'
import Script from 'next/script'

export default function UKToUAERelocationPage() {
  const [mounted, setMounted] = useState(false)
  
  // Stripe Payment Link
  const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_EBOOK_LINK || 'https://buy.stripe.com/14AcN5514gL746fcJW8k805'

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCTAClick = (label: string, path: string) => {
    trackCTAClick(label, path)
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <>
      {/* Schema Markup */}
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "UK to UAE Cultural Intelligence Guide",
            "description": "A research based guide helping British expats understand UAE culture, workplace norms, communication styles, dos and donts, and how to integrate effectively. Written specifically for UK professionals moving to Dubai and Abu Dhabi.",
            "image": "https://www.theorangecode.com/og-image",
            "category": "Educational Book",
            "brand": {
              "@type": "Organization",
              "name": "The Orange Code"
            },
            "offers": {
              "@type": "Offer",
              "price": "59",
              "priceCurrency": "GBP",
              "availability": "https://schema.org/InStock",
              "url": STRIPE_PAYMENT_LINK
            }
          })
        }}
      />

      <MinimalistLayout>
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-block mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-white/80">
              UK to UAE relocation guide
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
              Moving from the UK to the UAE
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4">
            The complete relocation & cultural intelligence handbook for UK movers
          </p>
        </motion.div>

        {/* Descriptive Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12 space-y-6"
        >
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Built for UK professionals, families, and students relocating to the Emirates. This handbook bundles relocation essentials with cultural intelligence so you land with clarity, confidence, and a plan.
          </p>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            Learn how UAE communication, trust, and leadership really work; what to do (and avoid) in daily life and business; and how to adapt your UK habits to build respect and opportunity faster.
          </p>
          <ul className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto space-y-2 list-disc list-inside text-left sm:text-center sm:list-none sm:space-y-1">
            <li className="sm:list-none sm:before:content-['•'] sm:before:mr-2 sm:before:text-orange">Exact dos/don’ts for social and business settings so you avoid missteps.</li>
            <li className="sm:list-none sm:before:content-['•'] sm:before:mr-2 sm:before:text-orange">How to read UAE communication styles, build trust, and earn respect quickly.</li>
            <li className="sm:list-none sm:before:content-['•'] sm:before:mr-2 sm:before:text-orange">Step-by-step arrival prep: documents, etiquette, and daily life basics tailored to UK movers.</li>
          </ul>
          <p className="text-sm font-medium text-orange">
            Purchase for £59 · Instant email delivery with secure download link.
          </p>
        </motion.div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <Link href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCTAClick('Get the Relocation Guide - Minimalist', '/uk-to-uae-relocation')}
              className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 text-lg inline-flex items-center gap-3"
            >
              <span>Get the relocation guide</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </MinimalistLayout>
    </>
  )
}
