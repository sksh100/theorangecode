'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useScroll, useSpring, useMotionValue } from 'framer-motion'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { ModernNavbar } from '@/components/ModernNavbar'
import { HeroSection } from '@/components/HeroSection'
import { WhyCulturalIntelligenceSection } from '@/components/WhyCulturalIntelligenceSection'
import { USPBar } from '@/components/USPBar'
import { ModernFooter } from '@/components/ModernFooter'
import { StartTodayCTA } from '@/components/StartTodayCTA'

// Lazy load heavy components for better performance
const TestimonialCarousel = dynamic(
  () => import('@/components/TestimonialCarousel').then(mod => ({ default: mod.TestimonialCarousel })),
  { 
    ssr: false,
    loading: () => <div className="h-64" />
  }
)

const ContactFormSection = dynamic(
  () => import('@/components/ContactFormSection').then(mod => ({ default: mod.ContactFormSection })),
  { 
    ssr: false,
    loading: () => <div className="h-96" />
  }
)

const MasterclassesOverview = dynamic(
  () => import('@/components/ProgramsOverview').then(mod => ({ default: mod.MasterclassesOverview })),
  { 
    ssr: true, // Keep SSR for SEO
    loading: () => <div className="h-96" />
  }
)

const AtmosphericBackground = dynamic(
  () => import('@/components/AtmosphericBackground').then(mod => ({ default: mod.AtmosphericBackground })),
  { 
    ssr: false,
    loading: () => null
  }
)

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 4, damping: 100 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 4, damping: 100 })

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
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "The Orange Code",
            "alternateName": ["The Orange Code", "the orange code", "theorangecode"],
            "url": "https://www.theorangecode.com",
            "description": "The Orange Code - Cultural Intelligence & Leadership Training in Dubai and Abu Dhabi, UAE. Premium cultural intelligence courses and masterclasses for professionals.",
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
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "The Orange Code",
            "alternateName": ["The Orange Code", "the orange code", "theorangecode", "The Orange Code UAE"],
            "url": "https://www.theorangecode.com",
            "logo": "https://www.theorangecode.com/android-chrome-512x512.png",
            "description": "The Orange Code - Cultural intelligence and leadership training masterclasses in Abu Dhabi, UAE.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Etihad Towers, Tower 3, Floor 36",
              "addressLocality": "Abu Dhabi",
              "addressRegion": "Abu Dhabi",
              "addressCountry": "AE"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United Arab Emirates"
            },
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
        strategy="beforeInteractive"
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
            "areaServed": {
              "@type": "Country",
              "name": "United Arab Emirates"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Training Programs",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Cultural Intelligence Masterclass",
                    "description": "3-hour masterclass covering cultural foundations, communication styles, and business protocols for the UAE and Gulf Region.",
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
      {/* Atmospheric Background - Wrapped in Suspense to prevent crashes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <AtmosphericBackground mousePosition={mousePosition} scrollProgress={scrollProgress} />
        </Suspense>
      </div>

      <div className="relative z-10">
        <ModernNavbar />
        <main itemScope itemType="https://schema.org/WebPage">
          <HeroSection />
          <WhyCulturalIntelligenceSection />
          <MasterclassesOverview />
          <USPBar />
          <TestimonialCarousel />
          <StartTodayCTA />
          <ContactFormSection />
        </main>
        <ModernFooter />
      </div>
    </div>
    </>
  )
}
