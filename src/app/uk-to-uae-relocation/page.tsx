'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CheckCircle, ArrowRight, BookOpen, Users, Globe, Clock, MessageSquare, Briefcase, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { trackCTAClick } from '@/lib/tracking'
import Script from 'next/script'

// Dynamic imports for performance
const AtmosphericBackground = dynamic(
  () => import('@/components/AtmosphericBackground').then(mod => ({ default: mod.AtmosphericBackground })),
  { ssr: false, loading: () => null }
)

export default function UKToUAERelocationPage() {
  const [isUK, setIsUK] = useState(false)
  const [currency, setCurrency] = useState('AED')
  const [price, setPrice] = useState(99) // Default AED price
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Detect UK visitors - try to get country from visitor tracking
    // First check browser language/timezone as fallback
    const isUKBrowser = navigator.language.includes('en-GB') || 
                       navigator.language.includes('en-UK') ||
                       Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/London'
    
    if (isUKBrowser) {
      setIsUK(true)
      setCurrency('GBP')
      setPrice(25) // Convert to GBP (approximate)
    }

    // Try to get more accurate location from IP (optional enhancement)
    // This would require storing country in localStorage from the tracking API
    try {
      const storedCountry = localStorage.getItem('visitor_country')
      if (storedCountry && (storedCountry === 'United Kingdom' || storedCountry === 'GB' || storedCountry === 'GBR')) {
        setIsUK(true)
        setCurrency('GBP')
        setPrice(25)
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const handleCTAClick = (element: string, location: string) => {
    trackCTAClick(element, location)
  }

  return (
    <>
      {/* Schema Markup */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "The Orange Code",
            "url": "https://www.theorangecode.com",
            "logo": "https://www.theorangecode.com/logo1.png",
            "description": "Cultural Intelligence & Leadership Training in Abu Dhabi, UAE"
          })
        }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "UK to UAE Relocation Cultural Intelligence Ebook",
            "description": "A practical cultural intelligence guide for British professionals relocating to the UAE",
            "brand": {
              "@type": "Brand",
              "name": "The Orange Code"
            },
            "offers": {
              "@type": "Offer",
              "price": price.toString(),
              "priceCurrency": currency,
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Moving from the UK to the UAE: Cultural Guide for British Professionals",
            "description": "A practical guide for British professionals relocating to the UAE. Learn workplace culture, etiquette, communication and expectations before you arrive.",
            "image": "https://www.theorangecode.com/og-image",
            "author": {
              "@type": "Organization",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Orange Code",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.theorangecode.com/logo1.png"
              }
            },
            "datePublished": "2025-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.theorangecode.com/uk-to-uae-relocation"
            },
            "articleSection": "Cultural Intelligence",
            "keywords": "UK to UAE relocation, British expats UAE, UAE workplace culture, Emirati culture guide",
            "inLanguage": "en-GB",
            "about": {
              "@type": "Thing",
              "name": "Cultural Intelligence Training"
            }
          })
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this guide for first time visitors or long term expats?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Both. It gives you the tools to understand UAE work culture whether you are new or experienced."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need this if I already lived abroad?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The UAE has a unique cultural structure that differs from Europe."
                }
              },
              {
                "@type": "Question",
                "name": "Is it focused on Dubai only?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The guide covers both Dubai and Abu Dhabi."
                }
              },
              {
                "@type": "Question",
                "name": "Does this replace cultural training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It is a starting point. You can also join our courses for deeper learning."
                }
              }
            ]
          })
        }}
      />

      <div className="relative w-full bg-primary-dark text-white min-h-screen">
        {/* Atmospheric Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <AtmosphericBackground mousePosition={{ x: 0, y: 0 }} scrollProgress={0} />
        </div>

        <ModernNavbar />

        {/* UK Banner */}
        {isUK && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-50 bg-gradient-to-r from-orange/20 via-azure-blue/20 to-orange/20 border-b border-azure-blue/30 py-3"
          >
            <div className="container mx-auto px-6 text-center">
              <p className="text-sm text-white/90">
                🇬🇧 <strong>Moving from the UK to the UAE?</strong> Get your cultural intelligence guide today.
              </p>
            </div>
          </motion.div>
        )}

        <main className="relative z-10">
          {/* SECTION 1: HERO */}
          <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
            <div className="absolute inset-0 bg-gradient-to-b from-orange/5 via-transparent to-azure-blue/5" />
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={mounted ? "visible" : "visible"}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
              >
                <motion.div
                  variants={itemVariants}
                  className="inline-block mb-6"
                >
                  <span className="text-orange text-sm font-semibold tracking-wider uppercase">
                    UK to UAE Relocation Guide
                  </span>
                </motion.div>
                
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent">
                    Moving from the UK to the UAE
                  </span>
                  <br />
                  <span className="text-white mt-2 block">
                    Understand UAE culture before you arrive
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                  A practical cultural intelligence guide for British professionals, families and students relocating from the United Kingdom to the United Arab Emirates.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <Link href="#ebook-offer">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCTAClick('Get the Relocation Ebook - Hero', '/uk-to-uae-relocation')}
                      className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      Get the Relocation Ebook
                    </motion.button>
                  </Link>
                  <Link href="/masterclasses">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCTAClick('View Course Options - Hero', '/uk-to-uae-relocation')}
                      className="px-8 py-4 nav-button-glass text-white/90 hover:text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      View Course Options
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 2: WHY THIS GUIDE */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold mb-6 text-center"
                >
                  <span className="bg-gradient-to-r from-orange to-azure-blue bg-clip-text text-transparent">
                    Why British Expats Need This Guide
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-white/80 mb-8 leading-relaxed"
                >
                  Every year thousands of British citizens relocate to the UAE for work opportunities, lifestyle upgrades and new beginnings. Many arrive without understanding how workplace expectations, communication styles and cultural values differ from the UK. This guide gives you the clarity and confidence to navigate the UAE workplace from day one. It is practical, research based, and written specifically for British expats.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="grid md:grid-cols-2 gap-4 mt-8"
                >
                  {[
                    'Understand workplace hierarchy and expectations',
                    'Learn how time and deadlines are interpreted differently',
                    'Avoid accidental disrespect in communication',
                    'Build trust faster with Emirati colleagues',
                    'Adapt to high context, relationship based business culture',
                    'Learn dress code and meeting etiquette'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start space-x-3 p-4 rounded-xl bg-primary-dark/60 backdrop-blur-sm border border-white/10"
                    >
                      <CheckCircle className="w-6 h-6 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 3: WHAT YOU WILL LEARN */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold mb-8 text-center"
                >
                  <span className="bg-gradient-to-r from-azure-blue to-orange bg-clip-text text-transparent">
                    What the Guide Covers
                  </span>
                </motion.h2>

                <motion.div
                  variants={itemVariants}
                  className="relative p-8 md:p-12 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                  <div className="relative z-10 grid md:grid-cols-2 gap-4">
                    {[
                      'UAE cultural foundations',
                      'Communication differences between UK and UAE',
                      'Emotional expression and reading indirect cues',
                      'Feedback styles',
                      'Business etiquette and relationship building',
                      'Workplace hierarchy and decision making',
                      'Dress code rules for men and women',
                      'Time perception and punctuality',
                      'Do and dont list for new arrivals'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0" />
                        <span className="text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 4: UK TO UAE CONTRASTS */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-5xl mx-auto"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold mb-12 text-center"
                >
                  <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                    Key Cultural Differences Between the UK and the UAE
                  </span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Communication',
                      uk: 'UK is direct and explicit.',
                      uae: 'UAE uses indirect and diplomatic communication, especially in professional settings.',
                      icon: MessageSquare,
                      color: 'azure-blue'
                    },
                    {
                      title: 'Feedback',
                      uk: 'UK feedback is clear and straightforward.',
                      uae: 'UAE feedback is softened to maintain harmony.',
                      icon: CheckCircle,
                      color: 'orange'
                    },
                    {
                      title: 'Time',
                      uk: 'UK follows strict punctuality.',
                      uae: 'UAE has a flexible and relationship focused approach.',
                      icon: Clock,
                      color: 'bright-blue'
                    },
                    {
                      title: 'Hierarchy',
                      uk: 'UK workplaces are flatter.',
                      uae: 'UAE workplaces respect clear leadership structures.',
                      icon: Briefcase,
                      color: 'azure-blue'
                    }
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="relative p-6 md:p-8 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                      >
                        <div 
                          className="absolute inset-0 opacity-50"
                          style={{
                            background: item.color === 'azure-blue' 
                              ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, transparent 100%)'
                              : item.color === 'orange'
                              ? 'linear-gradient(135deg, rgba(255, 145, 77, 0.05) 0%, transparent 100%)'
                              : 'linear-gradient(135deg, rgba(0, 153, 255, 0.05) 0%, transparent 100%)'
                          }}
                        />
                        <div className="relative z-10">
                          <div className="flex items-center space-x-3 mb-4">
                            <Icon 
                              className="w-8 h-8 flex-shrink-0" 
                              style={{
                                color: item.color === 'azure-blue' 
                                  ? '#00d4ff'
                                  : item.color === 'orange'
                                  ? '#ff914d'
                                  : '#0099ff'
                              }}
                            />
                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                          </div>
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-orange/10 border border-orange/20">
                              <p className="text-sm font-semibold text-orange mb-1">🇬🇧 UK</p>
                              <p className="text-white/80 text-sm">{item.uk}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-azure-blue/10 border border-azure-blue/20">
                              <p className="text-sm font-semibold text-azure-blue mb-1">🇦🇪 UAE</p>
                              <p className="text-white/80 text-sm">{item.uae}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 5: UK EXPAT TESTIMONIALS */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold mb-12 text-center"
                >
                  <span className="bg-gradient-to-r from-azure-blue to-orange bg-clip-text text-transparent">
                    What British expats say
                  </span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    "I wish I learned this before my first week in Dubai.",
                    "This guide helped me understand what colleagues expect in the UAE.",
                    "Clear. Practical. Real. It made my relocation smoother."
                  ].map((quote, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                    >
                      <div className="absolute top-4 right-4">
                        <Sparkles className="w-6 h-6 text-orange/50" />
                      </div>
                      <p className="text-white/90 italic relative z-10">"{quote}"</p>
                      <p className="text-white/50 text-sm mt-4">— British Expat, UAE</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 6: ABOUT THE AUTHOR */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl mx-auto text-center"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-orange to-azure-blue bg-clip-text text-transparent">
                    Written by a cultural intelligence consultant based in the UAE
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-white/80 leading-relaxed"
                >
                  This guide was created by The Orange Code, a UAE based cultural intelligence consultancy. We help professionals, teams and expats succeed in the UAE workplace through training, courses and practical learning tools.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* SECTION 7: EBOOK OFFER */}
          <section id="ebook-offer" className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl mx-auto text-center"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold mb-4"
                >
                  <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent">
                    Get the UK to UAE Cultural Intelligence Ebook
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-xl text-white/80 mb-8"
                >
                  Instant download. Practical. Research based. Written for UK professionals.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="relative p-8 md:p-12 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-azure-blue/10" />
                  <div className="relative z-10">
                    <div className="mb-6">
                      <p className="text-5xl md:text-6xl font-bold text-white mb-2">
                        {currency === 'GBP' ? '£' : 'AED '}{price}
                      </p>
                      <p className="text-white/60 text-sm">
                        {currency === 'GBP' ? 'One-time payment' : 'One-time payment'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center mb-6">
                      <Link href="/masterclasses">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCTAClick('Buy the Ebook', '/uk-to-uae-relocation')}
                          className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                        >
                          Buy the Ebook
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCTAClick('Preview a Sample', '/uk-to-uae-relocation')}
                        className="px-8 py-4 nav-button-glass text-white/90 hover:text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                      >
                        Preview a Sample
                      </motion.button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm text-white/70">
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-orange" />
                        <span>Instant Download</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-azure-blue" />
                        <span>Research Based</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-bright-blue" />
                        <span>UK Focused</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 8: FAQ */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl mx-auto"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold mb-12 text-center"
                >
                  <span className="bg-gradient-to-r from-orange to-azure-blue bg-clip-text text-transparent">
                    Frequently asked questions
                  </span>
                </motion.h2>

                <div className="space-y-4">
                  {[
                    {
                      q: 'Is this guide for first time visitors or long term expats?',
                      a: 'Both. It gives you the tools to understand UAE work culture whether you are new or experienced.'
                    },
                    {
                      q: 'Do I need this if I already lived abroad?',
                      a: 'Yes. The UAE has a unique cultural structure that differs from Europe.'
                    },
                    {
                      q: 'Is it focused on Dubai only?',
                      a: 'The guide covers both Dubai and Abu Dhabi.'
                    },
                    {
                      q: 'Does this replace cultural training?',
                      a: 'It is a starting point. You can also join our courses for deeper learning.'
                    }
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/5 via-transparent to-orange/5" />
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                        <p className="text-white/80">{faq.a}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 9: FINAL CTA */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl mx-auto text-center"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent">
                    Prepare for a successful move to the UAE
                  </span>
                </motion.h2>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <Link href="#ebook-offer">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCTAClick('Get the Ebook - Final CTA', '/uk-to-uae-relocation')}
                      className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      Get the Ebook
                    </motion.button>
                  </Link>
                  <Link href="/masterclasses">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCTAClick('Explore Workshops - Final CTA', '/uk-to-uae-relocation')}
                      className="px-8 py-4 nav-button-glass text-white/90 hover:text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      Explore Workshops
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        <ModernFooter />
      </div>
    </>
  )
}

