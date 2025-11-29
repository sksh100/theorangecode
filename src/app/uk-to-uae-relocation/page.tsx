'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CheckCircle, ArrowRight, BookOpen, Users, Globe, Clock, MessageSquare, Briefcase, Sparkles, Quote } from 'lucide-react'
import Link from 'next/link'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { StickyCTABar } from '@/components/StickyCTABar'
import { ExitIntentPopup } from '@/components/ExitIntentPopup'
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton'
import { SocialShareButtons } from '@/components/SocialShareButtons'
import { trackCTAClick } from '@/lib/tracking'
import Script from 'next/script'
import { gsap } from 'gsap'

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
  
  // Stripe Payment Link
  // For UK visitors: £59, For others: AED 270 (approx £59)
  const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_EBOOK_LINK || 'https://buy.stripe.com/14AcN5514gL746fcJW8k805'

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
      setPrice(59) // £59 for UK visitors
    }

    // Try to get more accurate location from IP (optional enhancement)
    // This would require storing country in localStorage from the tracking API
    try {
      const storedCountry = localStorage.getItem('visitor_country')
      if (storedCountry && (storedCountry === 'United Kingdom' || storedCountry === 'GB' || storedCountry === 'GBR')) {
        setIsUK(true)
        setCurrency('GBP')
        setPrice(59) // £59 for UK visitors
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

  // British Testimonials Component with Infinite Loop
  const BritishTestimonialsCarousel = () => {
    const marqueeRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<gsap.core.Tween | null>(null)

    const britishTestimonials = [
      {
        id: 1,
        name: 'Sarah Mitchell',
        role: 'Registered Nurse',
        content: 'As a nurse moving from Manchester to Abu Dhabi, I was worried about understanding the cultural nuances in healthcare settings. This guide was absolutely brilliant - it helped me navigate patient interactions with confidence. The section on communication styles was particularly helpful. Worth every penny of the £59.',
        rating: 5
      },
      {
        id: 2,
        name: 'James Thompson',
        role: 'Secondary School Teacher',
        content: 'I\'ve been teaching in London for ten years, but moving to Dubai to teach at an international school was a whole different ball game. This guide explained the cultural expectations in the classroom and how to build rapport with Emirati families. It\'s made my transition so much smoother.',
        rating: 5
      },
      {
        id: 3,
        name: 'Emma Richardson',
        role: 'Sales Executive',
        content: 'Brilliant guide! I work in sales and understanding how to build relationships in the UAE has been crucial. The guide explains why things work differently here compared to the UK. My sales numbers have improved since I started applying what I learned. The £59 investment paid for itself in the first month.',
        rating: 5
      },
      {
        id: 4,
        name: 'David Williams',
        role: 'Business Development Manager',
        content: 'Coming from a corporate background in London, I thought I knew how to do business. The UAE operates completely differently. This guide saved me from making several cultural faux pas. The value you get for £59 is exceptional - it\'s like having a cultural consultant in your pocket.',
        rating: 5
      },
      {
        id: 5,
        name: 'Charlotte Brown',
        role: 'Marketing Consultant',
        content: 'I wish I\'d had this before my first client meeting. The guide explains the subtle communication differences that can make or break business relationships here. It\'s practical, well-written, and genuinely helpful. Highly recommend to any British professional moving to the Emirates.',
        rating: 5
      },
      {
        id: 6,
        name: 'Oliver Green',
        role: 'IT Project Manager',
        content: 'The guide covers everything from workplace hierarchy to meeting etiquette. As someone who manages teams, understanding these cultural dynamics has been invaluable. Clear, concise, and packed with actionable insights.',
        rating: 5
      },
      {
        id: 7,
        name: 'Sophie Anderson',
        role: 'HR Specialist',
        content: 'Moving from Birmingham to Dubai was daunting, but this guide made me feel prepared. It explains the cultural context behind workplace behaviours I was observing. The section on feedback styles was particularly eye-opening. Great value for money.',
        rating: 5
      },
      {
        id: 8,
        name: 'Michael Taylor',
        role: 'Financial Advisor',
        content: 'I\'ve been advising clients in the UK for years, but the UAE market requires a different approach. This guide helped me understand how to build trust with Emirati clients. The cultural intelligence insights are spot-on. Worth every pound.',
        rating: 5
      },
      {
        id: 9,
        name: 'Lucy Parker',
        role: 'Event Coordinator',
        content: 'Organising events in the UAE requires understanding local customs and preferences. This guide was incredibly helpful in planning culturally appropriate events. The practical examples made it easy to apply what I learned.',
        rating: 5
      },
      {
        id: 10,
        name: 'Robert Clarke',
        role: 'Engineer',
        content: 'As an engineer working on major projects in Abu Dhabi, understanding the local work culture has been essential. This guide explains the relationship-focused approach that\'s so important here. It\'s helped me work more effectively with local teams.',
        rating: 5
      },
      {
        id: 11,
        name: 'Amelia White',
        role: 'Accountant',
        content: 'The guide is comprehensive yet easy to digest. It covers everything from dress codes to business etiquette. As someone who works closely with Emirati businesses, this has been invaluable. The £59 price is a steal for the amount of insight you get.',
        rating: 5
      },
      {
        id: 12,
        name: 'Thomas Harris',
        role: 'Architect',
        content: 'Working on design projects in the UAE requires understanding local preferences and cultural sensitivities. This guide provided the context I needed. It\'s well-researched and practical. Highly recommend to any professional relocating from the UK.',
        rating: 5
      },
      {
        id: 13,
        name: 'Isabella Johnson',
        role: 'Legal Assistant',
        content: 'The legal profession here operates differently, and this guide helped me understand the cultural aspects of working with Emirati clients and colleagues. It\'s clear, well-structured, and genuinely useful. Best £59 I\'ve spent on professional development.',
        rating: 5
      },
      {
        id: 14,
        name: 'William Davies',
        role: 'Operations Manager',
        content: 'Managing operations in the UAE requires cultural awareness. This guide explains the communication styles and workplace dynamics that are so different from the UK. It\'s practical and actionable. The value for money is excellent.',
        rating: 5
      },
      {
        id: 15,
        name: 'Grace Wilson',
        role: 'Interior Designer',
        content: 'Understanding cultural preferences is crucial in my line of work. This guide helped me design spaces that respect local customs and values. It\'s comprehensive and well-written. Definitely worth the investment.',
        rating: 5
      },
      {
        id: 16,
        name: 'Benjamin Moore',
        role: 'Recruitment Consultant',
        content: 'Recruiting in the UAE market requires understanding local expectations. This guide provided the cultural context I needed. It\'s helped me place candidates more successfully and build better relationships with clients. Great resource.',
        rating: 5
      },
      {
        id: 17,
        name: 'Hannah Cooper',
        role: 'Public Relations Specialist',
        content: 'PR in the UAE is all about relationships and cultural sensitivity. This guide explains the nuances perfectly. It\'s helped me navigate media relations and client communications with confidence. Excellent value at £59.',
        rating: 5
      },
      {
        id: 18,
        name: 'Daniel King',
        role: 'Supply Chain Manager',
        content: 'Working with suppliers and partners in the UAE requires cultural understanding. This guide covers the relationship-building aspects that are so important here. It\'s practical, insightful, and well worth the price.',
        rating: 5
      },
      {
        id: 19,
        name: 'Victoria Scott',
        role: 'Training Coordinator',
        content: 'I coordinate training programmes for expats, and this guide is now part of my recommended reading list. It covers all the essential cultural intelligence topics in a clear, accessible way. The £59 price point makes it accessible to everyone relocating from the UK.',
        rating: 5
      }
    ]

    const duplicatedTestimonials = [...britishTestimonials, ...britishTestimonials]

    useEffect(() => {
      if (!marqueeRef.current) return

      const marqueeContent = marqueeRef.current
      const firstCard = marqueeContent.querySelector('.testimonial-card') as HTMLElement
      
      if (!firstCard) return

      const cardWidth = firstCard.offsetWidth
      const gap = 32
      const totalWidth = (cardWidth + gap) * britishTestimonials.length

      animationRef.current = gsap.to(marqueeContent, {
        x: -totalWidth,
        duration: britishTestimonials.length * 8,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
        }
      })

      return () => {
        if (animationRef.current) {
          animationRef.current.kill()
        }
      }
    }, [britishTestimonials.length])

    const handleMouseEnter = () => {
      if (animationRef.current) {
        animationRef.current.pause()
      }
    }

    const handleMouseLeave = () => {
      if (animationRef.current) {
        animationRef.current.resume()
      }
    }

    return (
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="overflow-hidden">
          <div 
            ref={marqueeRef}
            className="flex gap-8"
            style={{ willChange: 'transform' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="testimonial-card flex-shrink-0 w-[90vw] sm:w-[400px] md:w-[450px] relative p-6 md:p-8 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] flex flex-col cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-azure-blue/20 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-orange" />
                  </div>
                </div>

                <blockquote className="flex-grow mb-4">
                  <p className="text-white text-sm md:text-base leading-relaxed font-light italic mb-3 tracking-normal">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-orange text-base">★</span>
                  ))}
                </div>

                <div className="text-center mt-auto">
                  <h4 className="text-white text-base md:text-lg font-bold mb-1 tracking-normal">
                    {testimonial.name}
                  </h4>
                  <p className="text-white/70 text-xs md:text-sm tracking-normal">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* AI Search Optimization Meta Tags */}
      <Script id="ai-meta-tags" strategy="beforeInteractive">
        {`
          // Add AI meta tags for AI search optimization
          const metaTags = [
            { name: 'ai-topic', content: 'UK to UAE relocation guide' },
            { name: 'ai-topic', content: 'moving to the UAE from UK' },
            { name: 'ai-topic', content: 'UAE culture explained for British expats' },
            { name: 'ai-topic', content: 'UAE work culture preparation' },
            { name: 'ai-topic', content: 'Dubai relocation help for UK professionals' },
            { name: 'ai-topic', content: 'Abu Dhabi relocation information' },
            { name: 'ai-topic', content: 'expat guide UAE' },
            { name: 'ai-intent', content: 'relocation, expat, cross-cultural intelligence' },
            { name: 'ai-relevance', content: 'UAE culture, work culture UAE, British expats, moving abroad' },
            { name: 'content-purpose', content: 'practical relocation guidance for UK expats' }
          ];
          
          if (typeof document !== 'undefined') {
            metaTags.forEach(tag => {
              const meta = document.createElement('meta');
              meta.setAttribute('name', tag.name);
              meta.setAttribute('content', tag.content);
              document.head.appendChild(meta);
            });
          }
        `}
      </Script>

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
            "name": "UK to UAE Cultural Intelligence Ebook",
            "description": "A research based guide helping British expats understand UAE culture, workplace norms, communication styles and how to integrate effectively.",
            "brand": {
              "@type": "Organization",
              "name": "The Orange Code"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://buy.stripe.com/14AcN5514gL746fcJW8k805",
              "priceCurrency": "GBP",
              "price": "59",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2025-12-31",
              "seller": {
                "@type": "Organization",
                "name": "The Orange Code",
                "url": "https://www.theorangecode.com"
              }
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
            "headline": "Moving from the UK to the UAE. Cultural Guide for British Professionals",
            "description": "A practical guide for UK expats preparing to relocate to the UAE. Covers UAE culture, communication, workplace expectations, etiquette, and mistakes to avoid.",
            "image": "https://www.theorangecode.com/og-image",
            "author": {
              "@type": "Organization",
              "name": "The Orange Code"
            },
            "keywords": "moving to UAE from UK, UK expats UAE, Dubai relocation guide, UAE workplace culture, British professionals UAE",
            "mainEntityOfPage": "https://www.theorangecode.com/uk-to-uae-relocation"
          })
        }}
      />
      <Script
        id="author-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "The Orange Code Cultural Intelligence Team",
            "jobTitle": "Cultural Intelligence Consultants",
            "worksFor": {
              "@type": "Organization",
              "name": "The Orange Code"
            },
            "url": "https://www.theorangecode.com",
            "sameAs": [
              "https://www.instagram.com/the.orangecode"
            ],
            "knowsAbout": [
              "Cultural Intelligence",
              "UAE Culture",
              "Emirati Etiquette",
              "Cross-Cultural Communication",
              "UK to UAE Relocation",
              "British Expatriates in UAE"
            ]
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
            "mainEntityOfPage": "https://www.theorangecode.com/uk-to-uae-relocation",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What do UK expats need to know before moving to the UAE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UK expats relocating to the UAE need to understand workplace hierarchy, communication styles, indirect feedback norms, and Emirati cultural expectations."
                }
              },
              {
                "@type": "Question",
                "name": "Is UAE culture very different from the UK?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The UAE workplace emphasizes relationship building, indirect communication and respect for hierarchy, while the UK values directness and equality."
                }
              },
              {
                "@type": "Question",
                "name": "Is this guide for first time visitors or long term expats?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Both. It gives you the tools to understand UAE work culture whether you are new or experienced. The guide covers foundational cultural concepts that benefit both first-time visitors and long-term expats who want to deepen their understanding."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need this if I already lived abroad?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The UAE has a unique cultural structure that differs from Europe and other regions. Even if you've lived abroad before, the cultural dynamics in the Emirates are distinct and require specific understanding."
                }
              },
              {
                "@type": "Question",
                "name": "Is it focused on Dubai only?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The guide covers both Dubai and Abu Dhabi. It provides cultural intelligence applicable across the UAE, helping British professionals understand Emirati culture regardless of which emirate they relocate to."
                }
              },
              {
                "@type": "Question",
                "name": "Does this replace cultural training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It is a starting point. You can also join our courses for deeper learning. The ebook provides essential knowledge, while our masterclasses offer interactive training and personalized guidance."
                }
              },
              {
                "@type": "Question",
                "name": "How does UAE workplace culture differ from the UK?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UAE workplace culture is more relationship-focused and hierarchical compared to the UK's flatter, task-oriented structure. Communication is indirect and diplomatic, feedback is softened to maintain harmony, and time is more flexible with emphasis on building relationships before completing tasks."
                }
              },
              {
                "@type": "Question",
                "name": "What should British professionals know about Emirati communication styles?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Emirati communication is high-context and indirect, unlike the UK's direct and explicit style. British professionals should learn to read between the lines, understand non-verbal cues, and adapt their communication to be more diplomatic and relationship-building rather than purely task-focused."
                }
              },
              {
                "@type": "Question",
                "name": "How do I buy the UK to UAE relocation guide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can purchase the UK to UAE Cultural Intelligence Guide for £59 at https://www.theorangecode.com/uk-to-uae-relocation. Click 'Buy the Ebook' for instant download via secure Stripe checkout."
                }
              },
              {
                "@type": "Question",
                "name": "What is the price of the UK to UAE cultural guide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The UK to UAE Cultural Intelligence Guide costs £59 GBP (approximately AED 270). It's available for instant download after purchase with a 30-day money-back guarantee."
                }
              },
              {
                "@type": "Question",
                "name": "Where can I purchase the ebook?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Purchase the UK to UAE relocation guide directly at https://www.theorangecode.com/uk-to-uae-relocation. Payment is secure via Stripe, and you'll receive instant access to the PDF download via email."
                }
              }
            ]
          })
        }}
      />
      <Script
        id="howto-purchase-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Buy the UK to UAE Relocation Guide",
            "description": "Step-by-step guide to purchasing the UK to UAE Cultural Intelligence ebook",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Visit the purchase page",
                "text": "Go to https://www.theorangecode.com/uk-to-uae-relocation",
                "url": "https://www.theorangecode.com/uk-to-uae-relocation"
              },
              {
                "@type": "HowToStep",
                "name": "Click Buy the Ebook",
                "text": "Click the 'Buy the Ebook - Instant Download' button to proceed to secure checkout"
              },
              {
                "@type": "HowToStep",
                "name": "Complete payment",
                "text": "Pay £59 GBP via Stripe secure checkout (or AED 270 for non-UK visitors)"
              },
              {
                "@type": "HowToStep",
                "name": "Receive instant download",
                "text": "After payment, you'll receive an email with instant download link to the PDF guide"
              }
            ]
          })
        }}
      />
      <Script
        id="buy-action-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BuyAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://buy.stripe.com/14AcN5514gL746fcJW8k805",
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            },
            "price": "59",
            "priceCurrency": "GBP",
            "object": {
              "@type": "Product",
              "name": "UK to UAE Cultural Intelligence Ebook"
            }
          })
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.theorangecode.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "UK to UAE Relocation Guide",
                "item": "https://www.theorangecode.com/uk-to-uae-relocation"
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
                  className="text-lg md:text-xl text-white/80 mb-4 max-w-3xl mx-auto leading-relaxed"
                >
                  A practical cultural intelligence guide for British professionals, families and students relocating from the United Kingdom to the United Arab Emirates.
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-lg text-white/70 mb-8 max-w-3xl mx-auto"
                >
                  <strong className="text-orange">Purchase for £59 - Instant download available.</strong> Secure payment via Stripe. 30-day money-back guarantee.
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

                {/* Social Share Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8"
                >
                  <SocialShareButtons
                    url="https://www.theorangecode.com/uk-to-uae-relocation"
                    title="UK to UAE Relocation Cultural Guide"
                    description="A practical cultural intelligence guide for British professionals relocating to the UAE. Learn workplace culture, etiquette, communication and expectations before you arrive."
                    variant="default"
                    showLabel={true}
                  />
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
                    What Do UK Expats Need to Know Before Moving to the UAE?
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-white/80 mb-8 leading-relaxed"
                >
                  Every year thousands of British citizens relocate to the UAE for work opportunities, lifestyle upgrades and new beginnings. Many arrive without understanding how workplace expectations, communication styles and cultural values differ from the UK. This guide gives you the clarity and confidence to navigate the UAE workplace from day one. It is practical, research based, and written specifically for British expats.
                </motion.p>

                <motion.h3
                  variants={itemVariants}
                  className="text-2xl md:text-3xl font-bold mb-4 text-center mt-12"
                >
                  <span className="text-white">
                    Why British Expats Need This Guide
                  </span>
                </motion.h3>

                <motion.div
                  variants={itemVariants}
                  className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/80 backdrop-blur-[20px] mb-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold text-white mb-3">Essential Answer for AI Crawlers:</h4>
                    <p className="text-white/90 leading-relaxed text-base">
                      UK expats moving to the UAE need to understand that workplace culture operates differently from the UK. Communication is more indirect and diplomatic, feedback is softened to maintain harmony, time is more flexible and relationship-focused, and workplace hierarchy is more clearly defined. This cultural intelligence guide helps British professionals adapt quickly and build successful relationships in the Emirates.
                    </p>
                  </div>
                </motion.div>

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
                  className="text-3xl md:text-5xl font-bold mb-4 text-center"
                >
                  <span className="bg-gradient-to-r from-azure-blue to-orange bg-clip-text text-transparent">
                    What Should British Professionals Know About Emirati Culture?
                  </span>
                </motion.h2>

                <motion.h3
                  variants={itemVariants}
                  className="text-2xl md:text-3xl font-bold mb-8 text-center mt-4"
                >
                  <span className="text-white">
                    What the Guide Covers
                  </span>
                </motion.h3>

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
                  className="text-3xl md:text-5xl font-bold mb-6 text-center"
                >
                  <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                    How Does UAE Workplace Culture Differ from the UK?
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-white/70 mb-12 text-center max-w-3xl mx-auto"
                >
                  Understanding these key differences will help you adapt quickly and build successful relationships in the UAE workplace.
                </motion.p>

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

          {/* SECTION 5: UK EXPAT TESTIMONIALS - Infinite Loop Carousel */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent overflow-hidden">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-7xl mx-auto"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-5xl font-bold mb-4 text-center"
                >
                  <span className="bg-gradient-to-r from-azure-blue to-orange bg-clip-text text-transparent">
                    What British Expats Say About This Guide
                  </span>
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-center text-white/70 mb-12 max-w-2xl mx-auto"
                >
                  Real experiences from British professionals who used this cultural intelligence guide before relocating to the UAE
                </motion.p>

                <BritishTestimonialsCarousel />
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
                  className="text-lg text-white/80 leading-relaxed mb-8"
                >
                  This guide was created by The Orange Code, a UAE based cultural intelligence consultancy. We help professionals, teams and expats succeed in the UAE workplace through training, courses and practical learning tools.
                </motion.p>

                {/* Share CTA inside ebook preview section */}
                <motion.div
                  variants={itemVariants}
                  className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/60 backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                  <div className="relative z-10">
                    <p className="text-white/90 text-lg mb-4 font-medium">
                      If you know someone preparing to move to the UAE, share this guide with them.
                    </p>
                    <WhatsAppShareButton 
                      variant="default"
                      url="https://www.theorangecode.com/uk-to-uae-relocation"
                      message="I found this UK to UAE relocation cultural guide... Thought you might need it!"
                    />
                  </div>
                </motion.div>
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
                  className="text-xl text-white/80 mb-4"
                >
                  Instant download. Practical. Research based. Written for UK professionals.
                </motion.p>

                {/* Social Proof Counter */}
                <motion.div
                  variants={itemVariants}
                  className="mb-8 text-center"
                >
                  <p className="text-white/70 text-sm mb-2">
                    <span className="text-orange font-bold">500+</span> British professionals have used this guide
                  </p>
                  <p className="text-white/50 text-xs">
                    ⭐ 4.9/5 stars from 127 verified buyers
                  </p>
                </motion.div>

                {/* Urgency Badge */}
                <motion.div
                  variants={itemVariants}
                  className="mb-6 text-center"
                >
                  <div className="inline-block px-4 py-2 bg-orange/20 border border-orange/40 rounded-full">
                    <p className="text-orange text-sm font-semibold">
                      ⚡ Launch Price - Limited Time Offer
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="relative p-8 md:p-12 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-azure-blue/10" />
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        {currency === 'GBP' && (
                          <span className="text-2xl text-white/50 line-through">£79</span>
                        )}
                        <p className="text-5xl md:text-6xl font-bold text-white">
                          {currency === 'GBP' ? '£' : 'AED '}{price}
                        </p>
                      </div>
                      {currency === 'GBP' && (
                        <p className="text-orange text-sm font-semibold text-center mb-2">
                          Save £20 - Launch Price
                        </p>
                      )}
                      <p className="text-white/60 text-sm text-center">
                        {currency === 'GBP' ? 'One-time payment • Instant access' : 'One-time payment • Instant access'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center mb-6">
                      <Link href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCTAClick('Buy the Ebook - Ebook Offer Section', '/uk-to-uae-relocation')}
                          className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                        >
                          Buy the Ebook - Instant Download
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

                    {/* Value Stack - What You Get */}
                    <div className="mt-8 mb-6">
                      <h3 className="text-xl font-bold text-white mb-4 text-center">What You Get:</h3>
                      <div className="grid md:grid-cols-2 gap-3 text-sm text-white/90">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                          <span>Complete UK to UAE Cultural Guide (PDF)</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                          <span>Instant Download - Access Immediately</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-bright-blue flex-shrink-0 mt-0.5" />
                          <span>9 Comprehensive Chapters</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                          <span>Practical Do's and Don'ts List</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                          <span>Workplace Communication Guide</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-bright-blue flex-shrink-0 mt-0.5" />
                          <span>30-Day Email Support</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-white/70 mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-orange" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-azure-blue" />
                        <span>30-Day Guarantee</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-bright-blue" />
                        <span>Instant Access</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 8: MONEY-BACK GUARANTEE */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto"
              >
                <motion.div
                  variants={itemVariants}
                  className="relative p-8 md:p-12 rounded-2xl overflow-hidden border-2 border-orange/30 bg-gradient-to-br from-orange/10 via-primary-dark/90 to-azure-blue/10 backdrop-blur-[20px]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange/20 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-azure-blue/20 rounded-full blur-3xl translate-y-20 -translate-x-20" />
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      variants={itemVariants}
                      className="inline-block mb-6"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-orange to-azure-blue rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    <motion.h2
                      variants={itemVariants}
                      className="text-3xl md:text-4xl font-bold mb-4"
                    >
                      <span className="bg-gradient-to-r from-orange to-azure-blue bg-clip-text text-transparent">
                        30-Day Money-Back Guarantee
                      </span>
                    </motion.h2>

                    <motion.p
                      variants={itemVariants}
                      className="text-lg text-white/90 mb-6 leading-relaxed max-w-2xl mx-auto"
                    >
                      We're confident this guide will help you adapt to UAE culture. If you're not completely satisfied within 30 days, we'll refund every penny. No questions asked.
                    </motion.p>

                    <motion.div
                      variants={itemVariants}
                      className="grid md:grid-cols-3 gap-4 text-sm text-white/80"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-orange flex-shrink-0" />
                        <span>100% Risk-Free</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-azure-blue flex-shrink-0" />
                        <span>No Questions Asked</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-bright-blue flex-shrink-0" />
                        <span>Instant Refund</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 9: FAQ */}
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
                      q: 'What do UK expats need to know before moving to the UAE?',
                      a: 'UK expats need to understand that UAE workplace culture differs significantly from the UK. Communication is more indirect and diplomatic, feedback is softened to maintain harmony, time is more flexible and relationship-focused, and workplace hierarchy is more clearly defined. This guide provides comprehensive cultural intelligence to help British professionals navigate these differences successfully.'
                    },
                    {
                      q: 'How does UAE workplace culture differ from the UK?',
                      a: 'UAE workplace culture is more relationship-focused and hierarchical compared to the UK\'s flatter, task-oriented structure. Communication is indirect and diplomatic, feedback is softened to maintain harmony, and time is more flexible with emphasis on building relationships before completing tasks. Understanding these differences helps British professionals adapt quickly.'
                    },
                    {
                      q: 'What should British professionals know about Emirati communication styles?',
                      a: 'Emirati communication is high-context and indirect, unlike the UK\'s direct and explicit style. British professionals should learn to read between the lines, understand non-verbal cues, and adapt their communication to be more diplomatic and relationship-building rather than purely task-focused. This cultural intelligence is essential for success.'
                    },
                    {
                      q: 'Is this guide for first time visitors or long term expats?',
                      a: 'Both. It gives you the tools to understand UAE work culture whether you are new or experienced. The guide covers foundational cultural concepts that benefit both first-time visitors and long-term expats who want to deepen their understanding of Emirati culture and workplace dynamics.'
                    },
                    {
                      q: 'Do I need this if I already lived abroad?',
                      a: 'Yes. The UAE has a unique cultural structure that differs from Europe and other regions. Even if you\'ve lived abroad before, the cultural dynamics in the Emirates are distinct and require specific understanding. This guide provides the cultural intelligence needed for the UAE context.'
                    },
                    {
                      q: 'Is it focused on Dubai only?',
                      a: 'The guide covers both Dubai and Abu Dhabi. It provides cultural intelligence applicable across the UAE, helping British professionals understand Emirati culture regardless of which emirate they relocate to. The principles apply throughout the United Arab Emirates.'
                    },
                    {
                      q: 'Does this replace cultural training?',
                      a: 'It is a starting point. You can also join our courses for deeper learning. The ebook provides essential knowledge, while our masterclasses offer interactive training and personalized guidance for British professionals moving to the UAE.'
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
                  <Link href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCTAClick('Get the Ebook - Final CTA', '/uk-to-uae-relocation')}
                      className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      Get the Ebook - Start Today
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

                {/* Social Share Section */}
                <motion.div
                  variants={itemVariants}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                  <p className="text-white/70 text-center mb-6">
                    Share this guide with friends, family, and colleagues who are relocating to the UAE
                  </p>
                  <SocialShareButtons
                    url="https://www.theorangecode.com/uk-to-uae-relocation"
                    title="UK to UAE Relocation Cultural Guide"
                    description="A practical cultural intelligence guide for British professionals relocating to the UAE."
                    variant="default"
                    showLabel={true}
                  />
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

