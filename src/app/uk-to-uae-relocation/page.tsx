'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { CheckCircle, ArrowRight, BookOpen, Users, Globe, Clock, MessageSquare, Briefcase, Sparkles, Quote, X, ChevronDown } from 'lucide-react'
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
import { EbookSampleModal } from '@/components/EbookSampleModal'

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
  const [showSampleModal, setShowSampleModal] = useState(false)
  const [selectedPreview, setSelectedPreview] = useState<number | null>(null)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  
  // Stripe Payment Link
  // For UK visitors: £59, For others: AED 270 (approx £59)
  const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_EBOOK_LINK || 'https://buy.stripe.com/14AcN5514gL746fcJW8k805'

  useEffect(() => {
    setMounted(true)

    // Only run in browser environment
    if (typeof window === 'undefined') return

    // Detect UK visitors - try to get country from visitor tracking
    // First check browser language/timezone as fallback
    try {
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
      const storedCountry = localStorage.getItem('visitor_country')
      if (storedCountry && (storedCountry === 'United Kingdom' || storedCountry === 'GB' || storedCountry === 'GBR')) {
        setIsUK(true)
        setCurrency('GBP')
        setPrice(59) // £59 for UK visitors
      }
    } catch (e) {
      // Ignore localStorage/navigator errors
    }
  }, [])

  // Disable common screenshot shortcuts and protect images when preview is open
  useEffect(() => {
    if (selectedPreview === null) return

    // Disable common screenshot shortcuts when preview is open
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Print Screen, Ctrl+S, Ctrl+P, F12, etc.
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J'))
      ) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    const handleContextMenu = (e: Event) => {
      e.preventDefault()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('contextmenu', handleContextMenu)
    // Disable text selection
    document.body.style.userSelect = 'none'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.body.style.userSelect = ''
    }
  }, [selectedPreview])

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

  // Download is only available after purchase via email link
  // Users receive an automated email with a secure download link after Stripe payment

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
      if (typeof window === 'undefined' || !gsap) return

      const marqueeContent = marqueeRef.current
      const firstCard = marqueeContent.querySelector('.testimonial-card') as HTMLElement
      
      if (!firstCard) return

      const cardWidth = firstCard.offsetWidth
      const gap = 32
      const totalWidth = (cardWidth + gap) * britishTestimonials.length

      try {
        animationRef.current = gsap.to(marqueeContent, {
          x: -totalWidth,
          duration: britishTestimonials.length * 8,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
          }
        })
      } catch (error) {
        console.error('Error initializing gsap animation:', error)
      }

      return () => {
        if (animationRef.current) {
          try {
            animationRef.current.kill()
          } catch (error) {
            console.error('Error killing gsap animation:', error)
          }
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
      {/* Explicit canonical tag */}
      <link rel="canonical" href="https://www.theorangecode.com/uk-to-uae-relocation" />
      
      {/* Chinese Search Engine Meta Tags */}
      <meta name="baidu-site-verification" content="" />
      <meta name="360-site-verification" content="" />
      <meta name="sogou_site_verification" content="" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="applicable-device" content="pc,mobile" />
      
      {/* UK Platform Meta Tags */}
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      <meta name="distribution" content="global" />
      <meta name="target" content="UK, United Kingdom, British professionals, UK expats" />
      
       {/* AI Search Optimization Meta Tags */}
       <Script id="ai-meta-tags" strategy="afterInteractive">
         {`
           (function() {
             if (typeof document === 'undefined') return;
             
             // Add AI meta tags for AI search optimization
             const metaTags = [
               { name: 'ai-topic', content: 'UK to UAE relocation guide' },
               { name: 'ai-topic', content: 'moving to the UAE from UK' },
               { name: 'ai-topic', content: 'UAE culture explained for British expats' },
               { name: 'ai-topic', content: 'UAE work culture preparation' },
               { name: 'ai-topic', content: 'Dubai relocation help for UK professionals' },
               { name: 'ai-topic', content: 'Abu Dhabi relocation information' },
               { name: 'ai-topic', content: 'expat guide UAE' },
               { name: 'ai-topic', content: 'UAE guide for British' },
               { name: 'ai-topic', content: 'UK expat guide UAE' },
               { name: 'ai-topic', content: 'British expat guide UAE' },
               { name: 'ai-topic', content: 'UAE dos and donts for British' },
               { name: 'ai-topic', content: 'UAE rules for UK expats' },
               { name: 'ai-topic', content: 'Dubai guide for UK expats' },
               { name: 'ai-topic', content: 'Abu Dhabi guide for British' },
               { name: 'ai-intent', content: 'relocation, expat, cross-cultural intelligence, UK to UAE move, British professionals UAE' },
               { name: 'ai-relevance', content: 'UAE culture, work culture UAE, British expats, moving abroad, UK expat guide, UAE guide for British, Dubai guide UK, Abu Dhabi guide UK' },
               { name: 'content-purpose', content: 'practical relocation guidance for UK expats, cultural intelligence for British professionals moving to UAE' },
               { name: 'target-audience', content: 'British professionals, UK expats, British citizens moving to UAE, UK teachers UAE, UK nurses UAE' },
               { name: 'geographic-focus', content: 'United Kingdom, UK, United Arab Emirates, UAE, Dubai, Abu Dhabi' },
               { name: 'content-language', content: 'en-GB' }
             ];
             
             try {
               metaTags.forEach(tag => {
                 const meta = document.createElement('meta');
                 meta.setAttribute('name', tag.name);
                 meta.setAttribute('content', tag.content);
                 document.head.appendChild(meta);
               });
             } catch (e) {
               console.error('Error adding AI meta tags:', e);
             }
           })();
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
            "name": "UK to UAE Cultural Intelligence Guide",
            "description": "A research based guide helping British expats understand UAE culture, workplace norms, communication styles, dos and donts, and how to integrate effectively. Written specifically for UK professionals moving to Dubai and Abu Dhabi.",
            "image": "https://www.theorangecode.com/og-image",
            "category": "Educational Book",
            "audience": {
              "@type": "Audience",
              "audienceType": "British expatriates",
              "geographicArea": {
                "@type": "Country",
                "name": "United Kingdom"
              }
            },
            "keywords": "UK to UAE guide, British expat guide UAE, UAE guide for British, Dubai guide UK, Abu Dhabi guide UK, UAE dos and donts for British, UAE rules for UK expats, UK expat UAE guide",
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
              "url": STRIPE_PAYMENT_LINK,
              "priceCurrency": "GBP",
              "price": "59",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2025-12-31",
              "eligibleRegion": {
                "@type": "Country",
                "name": "United Kingdom"
              },
              "seller": {
                "@type": "Organization",
                "name": "The Orange Code",
                "url": "https://www.theorangecode.com"
              },
              "itemCondition": "https://schema.org/NewCondition"
            },
            // UK Platform Availability
            "availableAtOrFrom": [
              {
                "@type": "WebSite",
                "name": "The Orange Code",
                "url": "https://www.theorangecode.com/uk-to-uae-relocation"
              }
            ],
            // UK-specific distribution channels
            "distribution": {
              "@type": "OfferCatalog",
              "name": "UK Distribution Channels",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "UK to UAE Cultural Intelligence Ebook"
                  },
                  "seller": {
                    "@type": "Organization",
                    "name": "The Orange Code"
                  },
                  "areaServed": {
                    "@type": "Country",
                    "name": "United Kingdom"
                  }
                }
              ]
            }
          })
        }}
      />
      
      {/* Book Schema for UK Platforms */}
      <Script
        id="book-schema-uk"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            "name": "UK to UAE Cultural Intelligence Guide",
            "alternateName": "Moving to the UAE from the UK: Cultural Guide for British Professionals",
            "description": "A comprehensive cultural intelligence guide for British professionals relocating to the UAE. Covers workplace culture, Emirati etiquette, communication styles, and practical advice for UK expats moving to Dubai and Abu Dhabi.",
            "author": {
              "@type": "Organization",
              "name": "The Orange Code"
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "bookFormat": "https://schema.org/EBook",
            "inLanguage": "en-GB",
            "isbn": "",
            "numberOfPages": "70",
            "genre": ["Non-fiction", "Business", "Travel", "Cultural Studies", "Expat Guide"],
            "audience": {
              "@type": "Audience",
              "audienceType": "British professionals, UK expats, UK teachers, UK nurses, UK engineers",
              "geographicArea": {
                "@type": "Country",
                "name": "United Kingdom"
              }
            },
            "offers": {
              "@type": "Offer",
              "url": STRIPE_PAYMENT_LINK,
              "priceCurrency": "GBP",
              "price": "59",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "The Orange Code"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
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
            "description": "A practical cultural intelligence guide for UK expats preparing to relocate to the UAE. Covers UAE culture, communication, workplace expectations, etiquette, dos and donts, rules, and mistakes to avoid. Written specifically for British professionals moving to Dubai and Abu Dhabi.",
            "image": "https://www.theorangecode.com/og-image",
            "inLanguage": "en-GB",
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
                "url": "https://www.theorangecode.com/android-chrome-512x512.png"
              }
            },
            "keywords": "moving to UAE from UK, UK expats UAE, Dubai relocation guide, UAE workplace culture, British professionals UAE, UK to UAE expat guide, British expat guide UAE, UAE guide for British, Dubai guide UK, Abu Dhabi guide UK, UAE dos and donts for British, UAE rules for UK expats, UAE etiquette for British, UK expat UAE guide",
            "about": {
              "@type": "Thing",
              "name": "UK to UAE Relocation",
              "description": "Cultural intelligence guide for British professionals relocating to the United Arab Emirates"
            },
            "mainEntityOfPage": "https://www.theorangecode.com/uk-to-uae-relocation",
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0]
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
              "British Expatriates in UAE",
              "UAE Guide for British",
              "UK Expat Guide UAE",
              "UAE Dos and Donts",
              "UAE Rules for Expats"
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
                  "text": "UK expats should know that daily life and communication in the UAE work differently from the UK. Conversations are more indirect and relationship focused, feedback is delivered more gently to maintain harmony, time is interpreted with more flexibility, and social expectations can feel unfamiliar at first. These differences show up not only at work but also in housing, schooling, public interactions and everyday decision making. Understanding these cultural patterns early helps new arrivals avoid accidental misunderstandings, build trust faster and settle with more confidence. This guide gives expats, families, students and partners a clear overview of what to expect and how to navigate life in the UAE smoothly from day one."
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
                  "text": "The cultural insights and practical advice apply across all emirates, so whether you move to Dubai, Abu Dhabi, Sharjah or elsewhere, you will understand the core Emirati cultural norms and daily-life expectations. The principles in this guide are relevant for anyone relocating anywhere in the United Arab Emirates."
                }
              },
              {
                "@type": "Question",
                "name": "Does this replace cultural training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It is a starting point. You can also join our courses for deeper learning. The guide provides essential knowledge, while our masterclasses offer interactive training and personalized guidance."
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
                  "text": "You can purchase the UK to UAE Cultural Intelligence Guide for £59 at https://www.theorangecode.com/uk-to-uae-relocation. Click 'Buy the Guide' to proceed to checkout. After payment, you'll receive an automated email with a secure download link to your personalized PDF."
                }
              },
              {
                "@type": "Question",
                "name": "What is the price of the UK to UAE cultural guide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The UK to UAE Cultural Intelligence Guide costs £59 GBP (approximately AED 270). After purchase, you'll receive an automated email with a secure download link to your personalized, watermarked PDF."
                }
              },
              {
                "@type": "Question",
                "name": "Where can I purchase the guide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Purchase the UK to UAE relocation guide directly at https://www.theorangecode.com/uk-to-uae-relocation. After successful payment, you'll automatically receive an email with a secure download link to your personalized PDF (watermarked with your email for security). The download link is valid for 48 hours."
                }
              },
              {
                "@type": "Question",
                "name": "Is this ebook specifically for British professionals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The UK to UAE Cultural Intelligence Ebook is written specifically for British professionals and families moving from the UK to the Emirates. Every chapter uses UK workplace examples, UK–UAE comparisons and real scenarios from British expats in Dubai and Abu Dhabi."
                }
              },
              {
                "@type": "Question",
                "name": "Will this guide help me avoid cultural mistakes in the UAE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The guide includes a dedicated section on UAE dos and don'ts, practical etiquette on dress, communication and behaviour, and real examples of mistakes British expats make in Dubai and Abu Dhabi – and how to avoid them."
                }
              },
              {
                "@type": "Question",
                "name": "Is this useful if I am only exploring jobs in the UAE from the UK?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Even if you are still considering a move, the guide explains what British professionals should know before applying for jobs in the UAE, how workplace expectations differ from the UK, and which cultural skills employers in Dubai and Abu Dhabi are looking for."
                }
              },
              {
                "@type": "Question",
                "name": "What are the UAE dos and donts for British expats?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The guide covers comprehensive UAE dos and donts for British expats, including dress codes, communication styles, workplace behaviour, social etiquette, and cultural sensitivities. It explains what not to do in UAE as a British expat and provides practical rules and regulations to follow."
                }
              },
              {
                "@type": "Question",
                "name": "Is this a complete UAE guide for British expats?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. This is a comprehensive UAE expat guide specifically written for British professionals. It covers UAE culture, workplace norms, communication, etiquette, dos and donts, rules, and practical advice for living and working in Dubai and Abu Dhabi."
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
                "text": "Click the 'Buy the Ebook - Instant Email Delivery' button to proceed to secure checkout"
              },
              {
                "@type": "HowToStep",
                "name": "Complete payment",
                "text": "Pay £59 GBP (or AED 270 for non-UK visitors)"
              },
              {
                "@type": "HowToStep",
                "name": "Receive automated email with download link",
                "text": "After payment, you'll automatically receive an email within seconds with a secure download link to your personalized PDF guide (watermarked with your email). The link is valid for 48 hours."
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
              "urlTemplate": STRIPE_PAYMENT_LINK,
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
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "UK to UAE Relocation Cultural Guide",
            "description": "A practical cultural intelligence guide for British professionals relocating to the UAE. Learn UAE workplace culture, Emirati etiquette, communication styles, dos and donts, and what to expect before you arrive.",
            "url": "https://www.theorangecode.com/uk-to-uae-relocation",
            "inLanguage": "en-GB",
            "isPartOf": {
              "@type": "WebSite",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "about": {
              "@type": "Thing",
              "name": "UK to UAE Relocation",
              "description": "Cultural intelligence guide for British professionals moving to the United Arab Emirates"
            },
            "audience": {
              "@type": "Audience",
              "audienceType": "British expatriates",
              "geographicArea": {
                "@type": "Country",
                "name": "United Kingdom"
              }
            },
            "keywords": "UK to UAE guide, British expat guide UAE, UAE guide for British, Dubai guide UK, Abu Dhabi guide UK, UAE dos and donts for British, UAE rules for UK expats, UK expat UAE guide",
            "mainEntity": {
              "@type": "Product",
              "name": "UK to UAE Cultural Intelligence Ebook"
            }
          })
        }}
      />
      {/* Review Schema for Testimonials */}
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Sarah Mitchell"
                },
                "reviewBody": "Understanding cultural preferences is crucial in my line of work. This guide helped me design spaces that respect local customs and values. It's comprehensive and well-written. Definitely worth the investment.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "itemReviewed": {
                  "@type": "Product",
                  "name": "UK to UAE Cultural Intelligence Ebook"
                }
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "James Thompson"
                },
                "reviewBody": "As someone who's worked in multiple countries, I can say this guide is spot-on. The cultural insights are accurate and the practical advice is invaluable. It's helped me navigate the UAE workplace with much more confidence.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "itemReviewed": {
                  "@type": "Product",
                  "name": "UK to UAE Cultural Intelligence Ebook"
                }
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Emily Watson"
                },
                "reviewBody": "This guide saved me from making several cultural mistakes. The dos and don'ts section is particularly helpful, and the communication style explanations are clear and practical. Highly recommend for any British professional moving to the UAE.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "itemReviewed": {
                  "@type": "Product",
                  "name": "UK to UAE Cultural Intelligence Ebook"
                }
              }
            ]
          })
        }}
      />
      {/* Course/EducationalProduct Schema */}
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "UK to UAE Cultural Intelligence Guide",
            "description": "Comprehensive cultural intelligence course for British professionals relocating to the UAE. Covers workplace culture, communication, etiquette, and practical relocation guidance.",
            "provider": {
              "@type": "Organization",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "educationalLevel": "Professional Development",
            "courseCode": "UK-UAE-CQ-GUIDE",
            "teaches": [
              "UAE Workplace Culture",
              "Emirati Communication Styles",
              "UAE Business Etiquette",
              "UK to UAE Relocation",
              "Cultural Intelligence for British Expats",
              "UAE Dos and Don'ts",
              "Emirati Social Norms"
            ],
            "audience": {
              "@type": "Audience",
              "audienceType": "British Professionals",
              "geographicArea": {
                "@type": "Country",
                "name": "United Kingdom"
              }
            },
            "inLanguage": "en-GB",
            "availableLanguage": ["en-GB"],
            "learningResourceType": "Digital Book",
            "timeRequired": "PT4H"
          })
        }}
      />
      {/* Service Schema */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "UK to UAE Relocation Cultural Intelligence Guide",
            "name": "UK to UAE Cultural Intelligence Guide",
            "description": "Digital cultural intelligence guide providing comprehensive information for British professionals relocating to the UAE. Includes workplace culture, communication styles, etiquette, dos and don'ts, and practical relocation advice.",
            "provider": {
              "@type": "Organization",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "audience": {
              "@type": "Audience",
              "audienceType": "British Professionals Moving to UAE",
              "geographicArea": {
                "@type": "Country",
                "name": "United Kingdom"
              }
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
      {/* ItemList Schema for "What You Get" */}
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "What You Get - UK to UAE Cultural Intelligence Guide",
            "description": "Complete contents of the UK to UAE relocation guide",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Complete UK→UAE Cultural Intelligence Guide (PDF)",
                "description": "A comprehensive, expertly designed handbook for relocating and working in the UAE."
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Step-by-Step Relocation Framework",
                "description": "Clear guidance on visas, housing, banking, healthcare, and everyday life in the Emirates."
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Workplace & Communication Playbook",
                "description": "Master Emirati business etiquette, hierarchy, communication styles, and meeting expectations."
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Cultural Foundations & Social Norms Explained",
                "description": "Understand the unspoken rules, Islamic values, habits, and behaviours that shape life in the UAE."
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "Practical Do's, Don'ts, and Real-Life Scenarios",
                "description": "Avoid common cultural misunderstandings with concrete examples and actionable recommendations."
              },
              {
                "@type": "ListItem",
                "position": 6,
                "name": "Essential Survival Tools & Emirati Arabic Quick Phrases",
                "description": "Useful words, expressions, and cheat sheets for daily interactions and polite communication."
              }
            ]
          })
        }}
      />
      {/* CollectionPage Schema */}
      <Script
        id="collectionpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "UK to UAE Relocation Cultural Intelligence Guide",
            "description": "A comprehensive collection of cultural intelligence resources for British professionals relocating to the UAE, including guide, practical advice, and cultural insights.",
            "url": "https://www.theorangecode.com/uk-to-uae-relocation",
            "mainEntity": {
              "@type": "Product",
              "name": "UK to UAE Cultural Intelligence Ebook"
            },
            "breadcrumb": {
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
            }
          })
        }}
      />

      <div className="relative w-full bg-primary-dark text-white min-h-screen">
        {/* Atmospheric Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <AtmosphericBackground mousePosition={{ x: 0, y: 0 }} scrollProgress={0} />
        </div>

        <ModernNavbar />

        <main className="relative z-10" itemScope itemType="https://schema.org/WebPage">
          <article itemScope itemType="https://schema.org/Article">
          {/* SECTION 1: HERO */}
          <section className="relative overflow-hidden h-screen">
            <div className="h-full flex items-center pt-20 md:pt-24">
              <div className="absolute inset-0 bg-gradient-to-b from-orange/5 via-transparent to-azure-blue/5 pointer-events-none" />
              <div className="container mx-auto px-6 relative z-10 w-full">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={mounted ? 'visible' : 'visible'}
                  className="max-w-5xl mx-auto text-center"
                >
                  {/* Small label */}
                  <motion.div variants={itemVariants} className="inline-flex items-center justify-center mb-6">
                    <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-white/80">
                      UK to UAE relocation guide
                    </span>
                  </motion.div>
                  {/* Main heading */}
                  <motion.h1
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-normal text-center w-full"
                    itemProp="headline"
                  >
                    <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent block lg:whitespace-nowrap text-center">
                      Moving from the UK to the UAE
                    </span>
                    <span className="text-white block mt-6 lg:whitespace-nowrap text-center">
                      Understand UAE culture before you arrive
                    </span>
                  </motion.h1>
                  {/* Subheading */}
                  <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base md:text-lg text-white/80 mb-4 max-w-3xl mx-auto leading-relaxed"
                  >
                    A practical cultural intelligence guide for British professionals, families and students relocating from the United Kingdom to the United Arab Emirates.
                  </motion.p>
                  {/* Price + instant delivery line */}
                  <motion.p
                    variants={itemVariants}
                    className="text-sm font-medium text-orange mb-8 lg:whitespace-nowrap"
                  >
                    Purchase for £59 · Instant email delivery with secure download link.
                  </motion.p>
                  {/* Primary CTA + subtle preview link */}
                  <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                    <Link href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handleCTAClick('Get the Relocation Guide - Hero', '/uk-to-uae-relocation')
                        }
                        className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                      >
                        Get the relocation guide
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* PEEK INSIDE SECTION */}
          <section id="peek-inside" className="relative py-20 md:py-32">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-5xl mx-auto"
              >
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-10"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-5xl font-bold mb-4"
                  >
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-bright-blue bg-clip-text text-transparent">
                      See inside the guide
                    </span>
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto"
                  >
                    A quick look at how the guide will support your move.
                  </motion.p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10"
                >
                  {/* Preview 1 */}
                  <motion.div
                    variants={itemVariants}
                    className="space-y-4"
                  >
                    <motion.div 
                      className="relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer group shadow-2xl"
                      onClick={() => setSelectedPreview(1)}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Gradient Border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange/20 via-azure-blue/20 to-bright-blue/20 p-[1px]">
                        <div className="h-full w-full rounded-3xl bg-primary-dark/80 backdrop-blur-xl" />
                      </div>
                      
                      {/* Image Container */}
                      <div className="absolute inset-[1px] rounded-3xl overflow-hidden">
                        <Image
                          src="/images/uk-uae-preview-1.png"
                          alt="Chapter overviews preview"
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                        />
                        {/* Luxurious Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-azure-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </motion.div>
                    <p className="text-sm text-white/90 leading-relaxed px-2">
                      Real feedback from British expats who used this guide. Their confidence and clarity increased before relocating.
                    </p>
                  </motion.div>

                  {/* Preview 2 */}
                  <motion.div
                    variants={itemVariants}
                    className="space-y-4"
                  >
                    <motion.div 
                      className="relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer group shadow-2xl"
                      onClick={() => setSelectedPreview(2)}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Gradient Border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-azure-blue/20 via-orange/20 to-bright-blue/20 p-[1px]">
                        <div className="h-full w-full rounded-3xl bg-primary-dark/80 backdrop-blur-xl" />
                      </div>
                      
                      {/* Image Container */}
                      <div className="absolute inset-[1px] rounded-3xl overflow-hidden">
                        <Image
                          src="/images/uk-uae-preview-2.png"
                          alt="Who it's for preview"
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                        />
                        {/* Luxurious Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/10 via-transparent to-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </motion.div>
                    <p className="text-sm text-white/90 leading-relaxed px-2">
                      Designed for British families, professionals, students and healthcare workers who want a guide that answers real UAE relocation questions.
                    </p>
                  </motion.div>

                  {/* Preview 3 */}
                  <motion.div
                    variants={itemVariants}
                    className="space-y-4"
                  >
                    <motion.div 
                      className="relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer group shadow-2xl"
                      onClick={() => setSelectedPreview(3)}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Gradient Border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-bright-blue/20 via-orange/20 to-azure-blue/20 p-[1px]">
                        <div className="h-full w-full rounded-3xl bg-primary-dark/80 backdrop-blur-xl" />
                      </div>
                      
                      {/* Image Container */}
                      <div className="absolute inset-[1px] rounded-3xl overflow-hidden">
                        <Image
                          src="/images/uk-uae-preview-3.png"
                          alt="Why UAE preview"
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                        />
                        {/* Luxurious Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-br from-bright-blue/10 via-transparent to-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </motion.div>
                    <p className="text-sm text-white/90 leading-relaxed px-2">
                      Start with Chapter One for a clear and relatable introduction to the opportunities and realities of moving to the Emirates.
                    </p>
                  </motion.div>

                  {/* Preview 4 */}
                  <motion.div
                    variants={itemVariants}
                    className="space-y-4"
                  >
                    <motion.div 
                      className="relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer group shadow-2xl"
                      onClick={() => setSelectedPreview(4)}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Gradient Border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange/20 via-bright-blue/20 to-azure-blue/20 p-[1px]">
                        <div className="h-full w-full rounded-3xl bg-primary-dark/80 backdrop-blur-xl" />
                      </div>
                      
                      {/* Image Container */}
                      <div className="absolute inset-[1px] rounded-3xl overflow-hidden">
                        <Image
                          src="/images/uk-uae-preview-4.png"
                          alt="Culture shocks preview"
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                        />
                        {/* Luxurious Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-bright-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </motion.div>
                    <p className="text-sm text-white/90 leading-relaxed px-2">
                      Discover the cultural differences that most newcomers learn the hard way. This section saves new expats months of confusion.
                    </p>
                  </motion.div>
                </motion.div>

              </motion.div>
            </div>
          </section>

          {/* GUIDE OFFER SECTION */}
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
                  <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent lg:whitespace-nowrap">
                    Get the UK to UAE Cultural Intelligence Guide
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-xl text-white/80 mb-4"
                >
                  Instant download. Clear. Practical. Written for anyone relocating from the United Kingdom to the United Arab Emirates.
                </motion.p>

                {/* Social Proof Counter */}
                <motion.div
                  variants={itemVariants}
                  className="mt-4 mb-6 text-center space-y-1"
                >
                  <p className="text-white/80 text-sm">
                    ⭐ Rated 4.9 out of 5 by 127 verified UK readers
                  </p>
                </motion.div>

                {/* Value Justification Block */}
                <motion.div
                  variants={itemVariants}
                  className="mb-6 max-w-2xl mx-auto text-white/80 text-sm sm:text-base leading-relaxed"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                    Why this guide is worth far more than £59
                  </h3>
                  <div className="space-y-4">
                    <p>
                      One cultural misunderstanding in the UAE can lead to a meeting handled the wrong way, a comment interpreted differently, or a decision that escalates because the expectations were unclear. Situations like these can cost you opportunities, trust and time.
                    </p>
                    <p>
                      This guide protects you from that.
                    </p>
                    <p>
                      It translates years of real UAE experience into a clear and practical roadmap for British newcomers. You will understand how daily life works, how to communicate with confidence, how to navigate hierarchy, and how to avoid the common mistakes most people make during their first months in the Emirates. These are insights that no relocation agency or generic online article provides.
                    </p>
                    <p>
                      Readers who use this guide settle into life in the UAE with more clarity, more confidence and fewer surprises. They integrate faster, make better decisions and feel prepared from day one.
                    </p>
                    <p>
                      You are investing in clarity, certainty and a smoother transition that removes the anxiety most newcomers carry before they arrive.
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

                    <div className="flex flex-col items-center gap-3 mb-6">
                      <Link href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCTAClick('Buy the Guide - Guide Offer Section', '/uk-to-uae-relocation')}
                          className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                        >
                          Buy the Guide – Instant Email Delivery
                        </motion.button>
                      </Link>
                    </div>

                    {/* Automated Delivery Info */}
                    <div className="mt-6 mb-4 p-4 rounded-xl bg-azure-blue/10 border border-azure-blue/20">
                      <p className="text-white/80 text-sm text-center">
                        <strong className="text-azure-blue">✨ Automated Delivery:</strong> After purchase, you'll receive an email within seconds with a secure download link. Your PDF will be personalized with your email address for security.
                      </p>
                    </div>

                    {/* Value Stack - What You Get */}
                    <div className="mt-8 mb-6">
                      <h3 className="text-xl font-bold text-white mb-6 text-center">✅ What You Get</h3>
                      <div className="space-y-4 text-white/90">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white mb-1">Complete UK→UAE Cultural Intelligence Guide (PDF)</p>
                            <p className="text-sm text-white/70">A comprehensive, expertly designed handbook for relocating and working in the UAE.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white mb-1">Step-by-Step Relocation Framework</p>
                            <p className="text-sm text-white/70">Clear guidance on visas, housing, banking, healthcare, and everyday life in the Emirates.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-bright-blue flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white mb-1">Workplace & Communication Playbook</p>
                            <p className="text-sm text-white/70">Master Emirati business etiquette, hierarchy, communication styles, and meeting expectations.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white mb-1">Cultural Foundations & Social Norms Explained</p>
                            <p className="text-sm text-white/70">Understand the unspoken rules, Islamic values, habits, and behaviours that shape life in the UAE.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white mb-1">Practical Do's, Don'ts, and Real-Life Scenarios</p>
                            <p className="text-sm text-white/70">Avoid common cultural misunderstandings with concrete examples and actionable recommendations.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-bright-blue flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white mb-1">Essential Survival Tools & Emirati Arabic Quick Phrases</p>
                            <p className="text-sm text-white/70">Useful words, expressions, and cheat sheets for daily interactions and polite communication.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid md:grid-cols-1 gap-4 text-sm text-white/70 mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-bright-blue" />
                        <span>Automated Email Delivery</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
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
                    What British expats say about this guide
                  </span>
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-center text-white/70 mb-12 max-w-2xl mx-auto"
                >
                  Read what newcomers say about how this guide helped them settle faster and avoid early cultural mistakes.
                </motion.p>

                <BritishTestimonialsCarousel />
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
                  Every year British individuals, couples and families relocate to the UAE for new opportunities, better lifestyle options and a fresh start. Many arrive without real clarity on how everyday life, communication styles, social expectations and cultural values differ from the UK. This guide gives you the confidence to settle in smoothly and understand the unwritten rules that shape life in the UAE. It is practical, research based and written specifically to help British expats avoid confusion and feel at home faster.
                </motion.p>

                <motion.h3
                  variants={itemVariants}
                  className="text-2xl md:text-3xl font-bold mb-4 text-center mt-12"
                >
                  <span className="bg-gradient-to-r from-orange via-azure-blue to-bright-blue bg-clip-text text-transparent">
                    Why British Expats Trust This Guide
                  </span>
                </motion.h3>

                <motion.div
                  variants={itemVariants}
                  className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/80 backdrop-blur-[20px] mb-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold text-white mb-3">In simple language: what you really need to know</h4>
                    <p className="text-white/90 leading-relaxed text-base">
                      Life in the UAE is welcoming and full of opportunity, yet many British expats experience confusion in their first weeks simply because small behaviours can be interpreted differently here. This guide explains the real expectations behind communication, relationships, time, respect and daily interaction so you move through your first months with confidence instead of uncertainty. You learn what builds trust with Emiratis and long time residents and what quietly creates distance without you realising it.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid md:grid-cols-2 gap-4 mt-8"
                >
                  {[
                    'Navigate social and cultural expectations with confidence',
                    'Learn how communication cues and indirect signals work in the UAE',
                    'Build stronger relationships at home, at work and in the community',
                    'Understand how time, appointments and commitments are interpreted',
                    'Avoid accidental disrespect in everyday interactions',
                    'Help your family or partner settle in more smoothly',
                    'Understand dress codes, etiquette and behaviour expectations',
                    'Feel prepared for daily life, from greetings to decision making'
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
                    What Every British Expat Should Know About Life in the UAE
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
                  <div className="relative z-10 grid md:grid-cols-2 gap-x-6 gap-y-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">Core UAE cultural foundations so you understand the values and social norms that shape daily life.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">How emotions are expressed and how to read indirect cues in conversations and meetings.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">Social and professional etiquette to help you build trust and strong relationships quickly.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">Dress code guidance for men and women in public spaces, workplaces and cultural settings.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">Clear do and do not lists that help new arrivals avoid common misunderstandings.</span>
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">How communication styles differ between the UK and UAE and what this means in real life.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">How to give and receive feedback in a way that is respectful and culturally appropriate.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">How hierarchy works in workplaces and communities so you can navigate decisions confidently.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">Why time perception differs and how to adapt to local expectations around punctuality.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 leading-relaxed">Quick reference tips and practical tools you can use from your very first week.</span>
                      </div>
                    </div>
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
                    How Everyday Life in the UAE Really Differs From the UK
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-white/70 mb-12 text-center max-w-3xl mx-auto"
                >
                  These real examples show how small cultural differences shape your daily experience at work, at home and in social settings.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Workplace expectations',
                      uk: 'Teams communicate directly, decisions are made quickly and feedback is clear and open.',
                      uae: 'Communication is softer and more diplomatic. Respect for hierarchy shapes who speaks first, how decisions are made and how disagreements are expressed.',
                      why: 'One direct comment can feel rude in the wrong context. Understanding these workplace expectations helps you avoid common mistakes and build trust faster from your first week.',
                      icon: MessageSquare,
                      color: 'azure-blue'
                    },
                    {
                      title: 'Social life and friendships',
                      uk: 'Social plans are often made in advance and people value privacy, personal space and clear boundaries.',
                      uae: 'Relationships grow through hospitality, spontaneous invitations and a strong sense of community that often crosses work and personal life.',
                      why: 'Knowing how and when people like to connect makes it easier to build real friendships, instead of feeling like an outsider who does not quite fit in.',
                      icon: Users,
                      color: 'orange'
                    },
                    {
                      title: 'Daily life and practical etiquette',
                      uk: 'Dress codes are flexible and vary widely between cities, workplaces and social settings.',
                      uae: 'Dress codes and behaviour depend strongly on context, especially in malls, offices, government buildings and more traditional areas.',
                      why: 'Many new arrivals guess the rules and only realise later that they were underdressed or too informal. Clear guidance helps you feel confident and respectful wherever you go.',
                      icon: Briefcase,
                      color: 'bright-blue'
                    },
                    {
                      title: 'Family life, schools and children',
                      uk: 'Children are encouraged to speak up, share opinions and question ideas as long as they are polite.',
                      uae: 'Respect for elders, teachers and guests is a core value. Politeness, modest behaviour and courtesy are expected at home, at school and in public.',
                      why: 'If you relocate with children, understanding these expectations helps them settle quickly at school, avoid misunderstandings and show respect in a way that fits local culture.',
                      icon: Users,
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
                          <div className="space-y-3 mb-4">
                            <div className="p-3 rounded-lg bg-orange/10 border border-orange/20">
                              <p className="text-sm font-semibold text-orange mb-1">🇬🇧 UK</p>
                              <p className="text-white/80 text-sm">{item.uk}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-azure-blue/10 border border-azure-blue/20">
                              <p className="text-sm font-semibold text-azure-blue mb-1">🇦🇪 UAE</p>
                              <p className="text-white/80 text-sm">{item.uae}</p>
                            </div>
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed">{item.why}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* CTA Button */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center mt-12"
                >
                  <Link href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleCTAClick('Get the Guide - UK to UAE Contrasts', '/uk-to-uae-relocation')
                      }
                      className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      Get the relocation guide
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 6: ABOUT THE AUTHOR / SHARE OR GIFT */}
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
                    Guidance from a cultural intelligence consultant in the UAE
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-white/80 leading-relaxed mb-8"
                >
                  This guide was created by The Orange Code, a UAE based cultural intelligence
                  consultancy. We help professionals, families and new expats understand how life
                  and work really function in the Emirates, so they can communicate with confidence,
                  avoid common cultural mistakes and feel at home faster.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="relative p-6 md:p-7 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/60 backdrop-blur-[20px] text-left md:text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                  <div className="relative z-10 space-y-3 md:space-y-4">
                    <p className="text-white/90 text-base md:text-lg font-medium">
                      If you know someone who is preparing to move to the UAE or has recently arrived,
                      you can share or gift this guide to help them settle with more clarity and less stress.
                    </p>
                    <p className="text-white/75 text-sm md:text-base">
                      It is a thoughtful and practical present for friends, colleagues or family members
                      who are starting a new chapter in Dubai, Abu Dhabi or any other emirate and want to
                      understand the culture from day one.
                    </p>

                    <div className="pt-2 flex md:justify-center">
                      <WhatsAppShareButton
                        variant="default"
                        url="https://www.theorangecode.com/uk-to-uae-relocation"
                        message="I found this UK to UAE cultural intelligence guide and thought it could really help you as you move to the Emirates."
                      />
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

                <div className="space-y-3">
                  {[
                    {
                      q: 'What do UK expats need to know before moving to the UAE?',
                      a: 'UK expats should know that daily life and communication in the UAE work differently from the UK. Conversations are more indirect and relationship focused, feedback is delivered more gently to maintain harmony, time is interpreted with more flexibility, and social expectations can feel unfamiliar at first. These differences show up not only at work but also in housing, schooling, public interactions and everyday decision making. Understanding these cultural patterns early helps new arrivals avoid accidental misunderstandings, build trust faster and settle with more confidence. This guide gives expats, families, students and partners a clear overview of what to expect and how to navigate life in the UAE smoothly from day one.'
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
                      a: 'The cultural insights and practical advice apply across all emirates, so whether you move to Dubai, Abu Dhabi, Sharjah or elsewhere, you will understand the core Emirati cultural norms and daily-life expectations. The principles in this guide are relevant for anyone relocating anywhere in the United Arab Emirates.'
                    },
                    {
                      q: 'Does this replace cultural training?',
                      a: 'It is a starting point. You can also join our courses for deeper learning. The guide provides essential knowledge, while our masterclasses offer interactive training and personalized guidance for British professionals moving to the UAE.'
                    }
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/5 via-transparent to-orange/5" />
                      <div className="relative z-10">
                        <button
                          onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                          className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors duration-200"
                        >
                          <h3 className="text-lg md:text-xl font-bold text-white flex-1">{faq.q}</h3>
                          <ChevronDown 
                            className={`w-5 h-5 text-white/70 flex-shrink-0 transition-transform duration-300 ${
                              openFAQ === index ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openFAQ === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-0">
                                <p className="text-white/80 leading-relaxed">{faq.a}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                  <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent lg:whitespace-nowrap">
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
                      onClick={() => handleCTAClick('Get the Guide - Final CTA', '/uk-to-uae-relocation')}
                      className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      Get the Guide - Start Today
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Social Share Section */}
                <motion.div
                  variants={itemVariants}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                  <SocialShareButtons
                    url="https://www.theorangecode.com/uk-to-uae-relocation"
                    title="UK to UAE Relocation Cultural Guide"
                    description="A practical cultural intelligence guide for British professionals relocating to the UAE."
                    variant="default"
                    showLabel={true}
                    platforms={['WhatsApp', 'Copy Link']}
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>
          </article>
        </main>

        <StickyCTABar
          price={price}
          currency={currency}
          paymentLink={STRIPE_PAYMENT_LINK}
          onCTAClick={() => {
            handleCTAClick('Sticky CTA – bottom bar', '/uk-to-uae-relocation')
          }}
        />

        <ExitIntentPopup
          paymentLink={STRIPE_PAYMENT_LINK}
          onCTAClick={() => handleCTAClick('Exit Intent CTA', '/uk-to-uae-relocation')}
        />

        <ModernFooter />

        {/* Ebook Sample Modal */}
        <EbookSampleModal 
          isOpen={showSampleModal} 
          onClose={() => setShowSampleModal(false)} 
        />

        {/* Preview Image Modal */}
        <AnimatePresence>
          {selectedPreview !== null && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
                onClick={() => setSelectedPreview(null)}
              />
              
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                onClick={() => setSelectedPreview(null)}
              >
                <div 
                  className="relative max-w-6xl max-h-[90vh] w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setSelectedPreview(null)}
                    className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                    aria-label="Close preview"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  {/* Protected Image Container */}
                  <div className="relative w-full h-full bg-primary-dark/95 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                    {/* Protection Overlay - prevents right-click, drag, and selection */}
                    <div
                      className="absolute inset-0 z-10 pointer-events-auto select-none"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                      }}
                    />
                    
                    {/* Watermark Overlay */}
                    <div 
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255, 145, 77, 0.03) 100px, rgba(255, 145, 77, 0.03) 200px)',
                      }}
                    />

                    {/* Image */}
                    <div className="relative w-full h-[90vh] flex items-center justify-center p-8">
                      <Image
                        src={`/images/uk-uae-preview-${selectedPreview}.png`}
                        alt={`Preview ${selectedPreview}`}
                        width={1200}
                        height={900}
                        className="max-w-full max-h-full object-contain"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        style={{
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                          pointerEvents: 'none',
                        }}
                        priority
                      />
                    </div>

                    {/* Protection Notice */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
                      <p className="text-white/70 text-xs text-center">
                        © The Orange Code - Protected Content
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
