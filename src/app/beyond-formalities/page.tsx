'use client'

// Force dynamic rendering to prevent build timeouts
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Eye } from 'lucide-react'
import { MinimalistLayout } from '@/components/MinimalistLayout'
import { trackCTAClick } from '@/lib/tracking'
import Script from 'next/script'

export default function BeyondFormalitiesPage() {
  const [mounted, setMounted] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  
  // Stripe Payment Link
  // Note: Success URL must be configured in Stripe Dashboard for this payment link
  // Set success URL to: https://www.theorangecode.com/beyond-formalities/thank-you?session_id={CHECKOUT_SESSION_ID}
  const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/eVqbJ1ctw66t9qz7pC8k806'

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCTAClick = (label: string, path: string) => {
    trackCTAClick(label, path)
  }

  const handlePreviewClick = async () => {
    setShowPreview(true)
    trackCTAClick('Preview Beyond Formalities', '/beyond-formalities')
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

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
            "name": "Beyond Formalities: Understanding Dubai Culture, Legal Systems, and Everyday Life",
            "description": "A comprehensive guide to Dubai culture, legal systems, and everyday life. Written by Dr. Marwan Al-Zarka, this ebook helps you understand the nuances of living and working in Dubai.",
            "image": "https://www.theorangecode.com/og-image",
            "category": "Educational Book",
            "brand": {
              "@type": "Organization",
              "name": "The Orange Code"
            },
            "author": {
              "@type": "Person",
              "name": "Dr. Marwan Al-Zarka"
            },
            "offers": {
              "@type": "Offer",
              "price": "99",
              "priceCurrency": "AED",
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
              E-Guide
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
              Beyond Formalities
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4">
            Understanding Dubai Culture, Legal Systems, and Everyday Life
          </p>
          <p className="text-lg sm:text-xl text-white/80 mb-2">
            By Dr. Marwan Al-Zarka
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
            A comprehensive guide to UAE Cultural foundations that goes beyond surface-level information to help you truly understand Dubai's culture, legal systems, and the practical aspects of everyday life in the Emirates.
          </p>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            Written by Dr. Marwan Al-Zarka, this ebook provides deep insights into UAE Cultural foundations, from cultural norms and social expectations to legal frameworks and practical living advice. Designed for anyone seeking to understand the UAE, regardless of nationality.
          </p>
          <ul className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto space-y-2 list-disc list-inside text-left sm:text-center sm:list-none sm:space-y-1">
            <li className="sm:list-none sm:before:content-['•'] sm:before:mr-2 sm:before:text-orange">Comprehensive understanding of Dubai culture and social norms</li>
            <li className="sm:list-none sm:before:content-['•'] sm:before:mr-2 sm:before:text-orange">Legal systems and regulations explained in practical terms</li>
            <li className="sm:list-none sm:before:content-['•'] sm:before:mr-2 sm:before:text-orange">Everyday life insights for residents and professionals</li>
            <li className="sm:list-none sm:before:content-['•'] sm:before:mr-2 sm:before:text-orange">Practical guidance for navigating Dubai with confidence</li>
          </ul>
          <p className="text-sm font-medium text-orange">
            Purchase for 99 AED · Instant email delivery with secure download link.
          </p>
        </motion.div>

        {/* Preview Section */}
        {!showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviewClick}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white/90 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              <span>Preview Sample</span>
            </motion.button>
          </motion.div>
        )}

        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4">Sample Preview</h3>
              <iframe
                src="/api/download-sample?ebook=beyond-formalities"
                className="w-full h-[600px] rounded-lg border border-white/10"
                title="Beyond Formalities Sample"
              />
              <p className="text-sm text-white/60 mt-4">
                This is a preview. Purchase the full guide to access all content.
              </p>
            </div>
          </motion.div>
        )}

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
              onClick={() => handleCTAClick('Get Beyond Formalities - Minimalist', '/beyond-formalities')}
              className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 text-lg inline-flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5" />
              <span>Purchase Beyond Formalities</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </MinimalistLayout>
    </>
  )
}

