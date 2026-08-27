'use client'

// Force dynamic rendering to prevent build timeouts
export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useScroll, useSpring, useMotionValue } from 'framer-motion'
import nextDynamic from 'next/dynamic'
import Script from 'next/script'
import { ModernNavbar } from '@/components/ModernNavbar'
import { HeroSection } from '@/components/HeroSection'
import { WhyCulturalIntelligenceSection } from '@/components/WhyCulturalIntelligenceSection'
import { USPBar } from '@/components/USPBar'
import { ModernFooter } from '@/components/ModernFooter'
import { StartTodayCTA } from '@/components/StartTodayCTA'

// Lazy load heavy components for better performance
const TestimonialCarousel = nextDynamic(
  () => import('@/components/TestimonialCarousel').then(mod => ({ default: mod.TestimonialCarousel })),
  { 
    ssr: false,
    loading: () => <div className="h-64" />
  }
)

const ContactFormSection = nextDynamic(
  () => import('@/components/ContactFormSection').then(mod => ({ default: mod.ContactFormSection })),
  { 
    ssr: false,
    loading: () => <div className="h-96" />
  }
)

const MasterclassesOverview = nextDynamic(
  () => import('@/components/ProgramsOverview').then(mod => ({ default: mod.MasterclassesOverview })),
  { 
    ssr: true, // Keep SSR for SEO
    loading: () => <div className="h-96" />
  }
)

const AtmosphericBackground = nextDynamic(
  () => import('@/components/AtmosphericBackground').then(mod => ({ default: mod.AtmosphericBackground })),
  { 
    ssr: false,
    loading: () => null
  }
)

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 4, damping: 100 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 4, damping: 100 })

  // Only use scroll tracking after component is mounted
  // Use window scroll instead of container ref to avoid SSR issues
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const unsubscribeX = smoothMouseX.on('change', (latest) => {
      setMousePosition(prev => ({ ...prev, x: latest }))
    })
    const unsubscribeY = smoothMouseY.on('change', (latest) => {
      setMousePosition(prev => ({ ...prev, y: latest }))
    })

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [smoothMouseX, smoothMouseY])

  useEffect(() => {
    if (!scrollYProgress) return
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <>
      {/* Structured Data for Homepage */}
      <Script
        id="homepage-website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "The Orange Code",
            "alternateName": ["The Orange Code", "the orange code", "theorangecode"],
            "url": "https://www.theorangecode.com",
            "description": "Cultural Intelligence GCC | Cultural Intelligence Middle East | Cultural Intelligence UAE. The Orange Code is the Gulf's premier institute for Cultural Intelligence training across the GCC and Middle East. Expert Cultural Intelligence courses and masterclasses for professionals in UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.",
            "publisher": {
              "@type": "Organization",
              "name": "The Orange Code",
              "alternateName": ["The Orange Code", "the orange code", "theorangecode"],
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.theorangecode.com/android-chrome-512x512.png"
              }
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.theorangecode.com/?s={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <Script
        id="homepage-organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "The Orange Code",
            "alternateName": ["The Orange Code", "the orange code", "theorangecode", "The Orange Code UAE", "The Orange Code GCC", "Cultural Intelligence GCC", "Cultural Intelligence Middle East", "Cultural Intelligence Abu Dhabi", "Cultural Intelligence Dubai"],
            "url": "https://www.theorangecode.com",
            "logo": "https://www.theorangecode.com/android-chrome-512x512.png",
            "description": "Cultural Intelligence GCC & Middle East: The Orange Code is the Gulf's premier institute for Cultural Intelligence training. Expert Cultural Intelligence courses and masterclasses for professionals across the GCC region including UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Master Cultural Intelligence (CQ) to navigate diverse teams, build trust, and drive success in the Gulf Cooperation Council and Middle East.",
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "Etihad Towers, Tower 3, Floor 36",
                "addressLocality": "Abu Dhabi",
                "addressRegion": "Abu Dhabi",
                "addressCountry": "AE"
              },
              {
                "@type": "PostalAddress",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              }
            ],
            "areaServed": [
              {
                "@type": "GeoRegion",
                "name": "Gulf Cooperation Council",
                "alternateName": "GCC"
              },
              {
                "@type": "GeoRegion",
                "name": "Middle East"
              },
              {
                "@type": "Country",
                "name": "United Arab Emirates"
              },
              {
                "@type": "City",
                "name": "Abu Dhabi"
              },
              {
                "@type": "City",
                "name": "Dubai"
              },
              {
                "@type": "Country",
                "name": "Saudi Arabia"
              },
              {
                "@type": "City",
                "name": "Riyadh"
              },
              {
                "@type": "City",
                "name": "Jeddah"
              },
              {
                "@type": "Country",
                "name": "Qatar"
              },
              {
                "@type": "City",
                "name": "Doha"
              },
              {
                "@type": "Country",
                "name": "Kuwait"
              },
              {
                "@type": "Country",
                "name": "Bahrain"
              },
              {
                "@type": "Country",
                "name": "Oman"
              }
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+971568786106",
              "email": "hello@theorangecode.com",
              "contactType": "Customer Service"
            }
          })
        }}
      />
      <Script
        id="homepage-service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Cultural Intelligence Training",
            "provider": {
              "@type": "Organization",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "areaServed": [
              {
                "@type": "GeoRegion",
                "name": "Gulf Cooperation Council",
                "alternateName": "GCC"
              },
              {
                "@type": "GeoRegion",
                "name": "Middle East"
              },
              {
                "@type": "Country",
                "name": "United Arab Emirates"
              },
              {
                "@type": "City",
                "name": "Abu Dhabi"
              },
              {
                "@type": "City",
                "name": "Dubai"
              },
              {
                "@type": "Country",
                "name": "Saudi Arabia"
              },
              {
                "@type": "City",
                "name": "Riyadh"
              },
              {
                "@type": "City",
                "name": "Jeddah"
              },
              {
                "@type": "Country",
                "name": "Qatar"
              },
              {
                "@type": "City",
                "name": "Doha"
              },
              {
                "@type": "Country",
                "name": "Kuwait"
              },
              {
                "@type": "Country",
                "name": "Bahrain"
              },
              {
                "@type": "Country",
                "name": "Oman"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Training Programs",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Cultural Intelligence Masterclass",
                    "description": "3-hour masterclass covering Cultural Intelligence foundations, communication styles, and business protocols for the UAE, Dubai, Saudi Arabia (Riyadh, Jeddah), and Qatar (Doha).",
                    "courseCode": "CI-MASTERCLASS",
                    "educationalLevel": "Professional Development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Private Coaching Session",
                    "description": "One-on-one personalized coaching sessions tailored to individual needs and goals.",
                    "courseCode": "PRIVATE-COACHING",
                    "educationalLevel": "Professional Development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Corporate Training",
                    "description": "Customized corporate training programs for teams and organizations operating in the UAE and Gulf Region.",
                    "courseCode": "CORPORATE-TRAINING",
                    "educationalLevel": "Professional Development"
                  }
                }
              ]
            }
          })
        }}
      />
      <div ref={containerRef} className="relative w-full bg-primary-dark text-white min-h-screen" itemScope itemType="https://schema.org/WebPage">
        {/* Explicit canonical tag for homepage */}
        <link rel="canonical" href="https://www.theorangecode.com/" />
      {/* Atmospheric Background - Wrapped in Suspense to prevent crashes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <AtmosphericBackground mousePosition={mousePosition} scrollProgress={scrollProgress} />
        </Suspense>
      </div>

      <div className="relative z-10">
        <Suspense fallback={<div className="h-20 bg-primary-dark" />}>
          <ModernNavbar />
        </Suspense>
        <main itemScope itemType="https://schema.org/WebPage">
          <HeroSection />
          <WhyCulturalIntelligenceSection />
          <Suspense fallback={<div className="h-96 bg-primary-dark" />}>
            <MasterclassesOverview />
          </Suspense>
          <USPBar />
          <Suspense fallback={<div className="h-64 bg-primary-dark" />}>
            <TestimonialCarousel />
          </Suspense>
          <StartTodayCTA />
          <Suspense fallback={<div className="h-96 bg-primary-dark" />}>
            <ContactFormSection />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-64 bg-primary-dark" />}>
          <ModernFooter />
        </Suspense>
      </div>
    </div>
    </>
  )
}
