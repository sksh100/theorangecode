'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useScroll, useSpring, useMotionValue } from 'framer-motion'
import dynamic from 'next/dynamic'
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
    <div ref={containerRef} className="relative w-full bg-primary-dark text-white min-h-screen">
      {/* Atmospheric Background - Wrapped in Suspense to prevent crashes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <AtmosphericBackground mousePosition={mousePosition} scrollProgress={scrollProgress} />
        </Suspense>
      </div>

      <div className="relative z-10">
        <ModernNavbar />
        <main>
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
  )
}

