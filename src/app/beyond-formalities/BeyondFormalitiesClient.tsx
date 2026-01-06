'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, CheckCircle, Users, Briefcase, Home, Shield, Mail, HelpCircle, Eye, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Maximize2, Clock, TrendingDown, Download, Star } from 'lucide-react'
import { trackCTAClick } from '@/lib/tracking'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'

interface BeyondFormalitiesClientProps {
  paymentLink: string
}

export function BeyondFormalitiesClient({ paymentLink }: BeyondFormalitiesClientProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [enlargedImage, setEnlargedImage] = useState<number | null>(null)

  // 6 placeholder pages for the preview
  const previewPages = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    src: `/beyond-formalities/preview/page-${i + 1}.jpg`, // Placeholder path - images can be added later
    alt: `Beyond Formalities Preview Page ${i + 1}`
  }))

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % previewPages.length)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + previewPages.length) % previewPages.length)
  }

  const handleCTAClick = (label: string) => {
    trackCTAClick(label, '/beyond-formalities')
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  // Helper functions for FAQ answers with links
  const teamsPurchaseAnswer = () => (
    <>
      Yes. Teams and organizations can purchase multiple copies. For bulk purchases or corporate licensing, please contact us at{' '}
      <a href="mailto:hello@theorangecode.com" className="text-orange hover:text-azure-blue transition-colors underline">
        hello@theorangecode.com
      </a>
      {' '}to discuss options.
    </>
  )

  const culturalIntelligenceTrainingAnswer = () => (
    <>
      Yes. The Orange Code offers comprehensive Cultural Intelligence masterclasses, private coaching, and corporate training programs. Visit our masterclasses page or contact us at{' '}
      <a href="mailto:hello@theorangecode.com" className="text-orange hover:text-azure-blue transition-colors underline">
        hello@theorangecode.com
      </a>
      {' '}to learn more.
    </>
  )

  const faqs = [
    {
      question: "Is this for tourists?",
      answer: "Beyond Formalities is designed for professionals, residents, and anyone doing business or building relationships in the UAE. While tourists may find it helpful, it focuses on deeper cultural understanding for those engaging with Emirati culture in professional and social contexts."
    },
    {
      question: "Is it only for relocating?",
      answer: "No. This guide is valuable whether you are preparing to arrive, newly arrived, or already living in the UAE. It helps anyone who wants to understand Emirati culture and build meaningful relationships, regardless of how long they have been in the Emirates."
    },
    {
      question: "Does it include business culture?",
      answer: "Yes. Beyond Formalities covers business culture and protocol in the UAE, including how cultural values influence professional communication, relationship building, and business etiquette."
    },
    {
      question: "What do Emiratis say about the E-Guide?",
      answer: "This guide was reviewed by Emiratis who expressed their appreciation for the respectful and accurate representation of their culture, values, and society. They acknowledged the intention behind this work and welcomed the effort to educate others in a manner that promotes understanding of the cultural dynamics that influence relationships and communication in the United Arab Emirates. The guide was recognised as a constructive contribution to fostering mutual respect and deeper cultural awareness."
    },
    {
      question: "How do I receive the E-Guide?",
      answer: "After completing your purchase through our secure Stripe checkout, you will receive an email with a download link. The link is valid for 48 hours. Your PDF E-Guide will be watermarked with your email address for security."
    },
    {
      question: "Can teams purchase access?",
      answer: teamsPurchaseAnswer()
    },
    {
      question: "Do you offer deeper Cultural Intelligence training?",
      answer: culturalIntelligenceTrainingAnswer()
    }
  ]

  return (
    <>
      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-primary-dark/95 backdrop-blur-md border-t border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <Link href={paymentLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCTAClick('Get the E-Guide - Sticky Mobile CTA')}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 text-sm sm:text-base inline-flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <span>Get the E-Guide</span>
                <span className="flex items-center gap-1">
                  <span className="text-xs line-through text-white/60">149</span>
                  <span className="text-orange font-bold">89 AED</span>
                </span>
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 pb-20 lg:pb-0">
      {/* A) Hero Section */}
      <section className="text-center space-y-4 sm:space-y-6 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
          <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
            Beyond Formalities
          </span>
        </h1>
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-white/90 px-4 break-words">
          Understanding Emirati Culture, Local Customs, and Everyday Life
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 pt-2 sm:pt-4 px-4">
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed break-words">
            Many people complete the formalities in the UAE, yet relationships remain polite but distant. Business discussions start well but do not move forward, communication feels unclear, and promising connections sometimes disappear without explanation. Social circles often stay limited to other expatriates, despite genuine efforts to connect.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed break-words">
            Beyond Formalities explains the cultural foundations behind Emirati culture and local customs, helping you understand how trust, communication, and relationships develop in the UAE. This guide was written to bridge the gap and support clearer interaction, meaningful connection, and lasting relationships in everyday life and professional settings.
          </p>
        </div>

        {/* Enhanced Offer Section - High Conversion Design */}
        <div className="max-w-4xl mx-auto pt-6 sm:pt-8 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Urgency Badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange/20 to-azure-blue/20 border border-orange/40 rounded-full"
              >
                <Clock className="w-4 h-4 text-orange" />
                <span className="text-xs sm:text-sm font-semibold text-orange">Limited Time Offer</span>
              </motion.div>
            </div>

            {/* Prominent Pricing Box */}
            <div className="glass-card border-2 border-orange/30 rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-orange/10 via-azure-blue/5 to-orange/10 relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-azure-blue/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                {/* Social Proof */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4">
                    <Download className="w-4 h-4 text-orange" />
                    <span className="text-sm text-white/80">
                      <span className="font-bold text-orange">289</span> purchases and counting
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-orange text-orange" />
                    ))}
                    <span className="ml-2 text-sm text-white/70">5.0 rating</span>
                  </div>
                </div>

                {/* Pricing Display */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <p className="text-lg sm:text-xl text-white/50 line-through">149 AED</p>
                    <div className="px-3 py-1 bg-orange/20 border border-orange/40 rounded-full">
                      <span className="text-xs sm:text-sm font-bold text-orange">Save 40%</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-orange mb-2">
                      89 AED
                    </p>
                    <p className="text-sm sm:text-base text-white/70">One-time payment · Lifetime access</p>
                  </div>
                </div>

                {/* Value Props */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle className="w-5 h-5 text-orange flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/90">Instant Download</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
                    <Shield className="w-5 h-5 text-azure-blue flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/90">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
                    <BookOpen className="w-5 h-5 text-orange flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/90">PDF Format</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <Link href={paymentLink} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCTAClick('Get the E-Guide - Enhanced Hero Offer')}
                    className="w-full px-8 py-5 cta-button-glow text-white font-bold font-montserrat rounded-xl transition-all duration-300 text-lg sm:text-xl inline-flex items-center justify-center gap-3 shadow-2xl shadow-orange/20"
                  >
                    <BookOpen className="w-6 h-6" />
                    <span>Get the E-Guide Now - 89 AED</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </Link>

                {/* Trust Indicators */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-white/60">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <AnimatePresence>
        {showPreview && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Sample Preview</h3>
            
            {/* Image Carousel */}
            <div className="relative w-full">
              {/* Main Image Container */}
              <div className="relative w-full aspect-[3/4] bg-white/5 rounded-lg border border-white/10 overflow-hidden mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => setEnlargedImage(currentPage)}
                  >
                    {/* Placeholder Image */}
                    <div className="w-full h-full bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10 flex items-center justify-center">
                      <div className="text-center p-8">
                        <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
                        <p className="text-white/60 text-sm">Preview Page {currentPage + 1}</p>
                        <p className="text-white/40 text-xs mt-2">Click to enlarge</p>
                      </div>
                    </div>
                    
                    {/* Enlarge Icon Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Maximize2 className="w-8 h-8 text-white/80" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevPage()
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextPage()
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Page Indicators */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {previewPages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentPage
                        ? 'bg-orange w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              {/* Page Counter */}
              <p className="text-sm text-white/60 text-center mb-2">
                Page {currentPage + 1} of {previewPages.length}
              </p>
            </div>

            <p className="text-sm text-white/60 mt-4 text-center">
              This is a preview. Purchase the full guide to access all content.
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Enlarged Image Modal/Lightbox */}
      <AnimatePresence>
        {enlargedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setEnlargedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Enlarged Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10 rounded-lg border border-white/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <BookOpen className="w-24 h-24 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 text-lg">Preview Page {enlargedImage + 1}</p>
                  <p className="text-white/40 text-sm mt-2">Full preview image will appear here</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Arrows in Modal */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setEnlargedImage((prev) => (prev! - 1 + previewPages.length) % previewPages.length)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setEnlargedImage((prev) => (prev! + 1) % previewPages.length)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B) Pain Points Section */}
      <section className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center break-words px-4">
          <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
            If you have ever felt unsure, you are not alone
          </span>
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-2 h-2 bg-orange rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm sm:text-base md:text-lg text-white/90 break-words">You did the formalities, yet trust still takes time.</p>
          </div>
          <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-2 h-2 bg-orange rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm sm:text-base md:text-lg text-white/90 break-words">Meetings are warm, but decisions move differently than expected.</p>
          </div>
          <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-2 h-2 bg-orange rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm sm:text-base md:text-lg text-white/90 break-words">Indirect communication and silence can be hard to interpret.</p>
          </div>
          <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-2 h-2 bg-orange rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm sm:text-base md:text-lg text-white/90 break-words">You want to show respect, but you are not sure what matters most.</p>
          </div>
        </div>
      </section>

      {/* C) What This E-Guide Helps You Understand */}
      <section className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
            What Beyond Formalities explains
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed text-center break-words px-4">
          UAE daily life is shaped by values such as respect, hospitality, faith, family, hierarchy, and social harmony. When those foundations are understood, communication becomes clearer and relationships become easier to build.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-white/90 break-words">How cultural values shape everyday interaction</p>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-azure-blue flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-white/90 break-words">How trust and relationships develop over time</p>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-white/90 break-words">How social boundaries and etiquette work in real life</p>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-azure-blue flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-white/90 break-words">How business culture and protocol are influenced by cultural context</p>
          </div>
        </div>
      </section>

      {/* D) What You Will Gain */}
      <section className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
            What you will gain
          </span>
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-white/90 break-words">Clarity on Emirati culture and local customs</p>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-azure-blue flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-white/90 break-words">More confidence in social and professional interaction</p>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-white/90 break-words">A stronger understanding of nonverbal communication and social distance</p>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-azure-blue flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-white/90 break-words">Practical awareness of etiquette in hospitality, dining, and majlis settings</p>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-white/90 break-words">A foundation for respectful business communication and professional conduct in the UAE</p>
          </div>
        </div>
      </section>

      {/* F) Who It Is For */}
      <section className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
            Who this guide is for
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange/20 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-orange" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white break-words">Preparing from abroad</h3>
            <p className="text-sm sm:text-base text-white/80 break-words">For professionals, founders, and individuals who want cultural clarity before arriving or partnering with the UAE.</p>
          </div>
          <div className="bg-gradient-to-br from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-azure-blue/20 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-azure-blue" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white break-words">Relocating or newly arrived</h3>
            <p className="text-sm sm:text-base text-white/80 break-words">For those settling in and seeking confidence in daily interaction, customs, and communication.</p>
          </div>
          <div className="bg-gradient-to-br from-orange/10 to-azure-blue/10 border border-orange/20 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white break-words">Already living or doing business in the UAE</h3>
            <p className="text-sm sm:text-base text-white/80 break-words">For anyone who wants deeper understanding beyond procedures, to build lasting relationships.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Before Pricing */}
      <section className="max-w-7xl mx-auto px-4">
        <TestimonialCarousel />
      </section>

      {/* G) Enhanced Pricing Block */}
      <section className="max-w-2xl mx-auto px-4">
        <div className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-orange/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 sm:space-y-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-azure-blue/5 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                Get Beyond Formalities
              </span>
            </h2>
            
            {/* Urgency indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-orange" />
              <span className="text-xs sm:text-sm text-orange font-semibold">Limited Time: New Year Offer</span>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-lg sm:text-xl text-white/50 line-through">149 AED</p>
                  <div className="px-2 py-1 bg-orange/20 border border-orange/40 rounded">
                    <span className="text-xs font-bold text-orange">40% OFF</span>
                  </div>
                </div>
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-orange mb-2">89 AED</p>
                <p className="text-xs sm:text-sm text-white/60">One-time payment · Lifetime access</p>
              </div>
              
              {/* Social proof in pricing box */}
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-orange text-orange" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-white/70">289+ purchases</span>
              </div>
              
              <div className="space-y-2 text-white/80 text-sm sm:text-base">
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange flex-shrink-0" />
                  <span>PDF E-Guide</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-azure-blue flex-shrink-0" />
                  <span>Instant access after checkout</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange flex-shrink-0" />
                  <span>Secure Stripe checkout</span>
                </p>
              </div>
              <div className="mt-4 sm:mt-6">
              <Link href={paymentLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCTAClick('Buy now - Pricing')}
                  className="w-full px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 cta-button-glow text-white font-bold font-montserrat rounded-xl transition-all duration-300 text-base sm:text-lg md:text-xl inline-flex items-center justify-center gap-2 sm:gap-3 shadow-2xl shadow-orange/20"
                >
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Get the E-Guide Now - 89 AED</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H) FAQ Section */}
      <section className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-white/5 transition-colors gap-3"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white pr-3 sm:pr-4 break-words flex-1 text-left">{faq.question}</h3>
                {expandedFaq === index ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 flex-shrink-0" />
                )}
              </button>
              {expandedFaq === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 sm:px-6 pb-4 sm:pb-6"
                >
                  <div className="text-sm sm:text-base text-white/80 leading-relaxed break-words">
                    {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* I) Final CTA */}
      <section className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 px-4">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold break-words px-4">
          <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
            Understand the culture, communicate with confidence
          </span>
        </h2>
        <div className="mt-4 sm:mt-6">
          <Link href={paymentLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCTAClick('Get the E-Guide - Final CTA')}
              className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 cta-button-glow text-white font-bold font-montserrat rounded-xl transition-all duration-300 text-lg sm:text-xl md:text-2xl inline-flex items-center gap-3 sm:gap-4 shadow-2xl shadow-orange/30"
            >
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
              <span>Get the E-Guide Now - 89 AED</span>
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.button>
          </Link>
        </div>
        <div className="pt-4 sm:pt-6 space-y-2 text-white/60 text-xs sm:text-sm">
          <p>By The Orange Code, Abu Dhabi</p>
          <p>
            Questions? Contact us at{' '}
            <a href="mailto:hello@theorangecode.com" className="text-orange hover:text-azure-blue transition-colors">
              hello@theorangecode.com
            </a>
          </p>
        </div>
      </section>
      </div>
    </>
  )
}

