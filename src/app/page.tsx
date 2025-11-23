'use client'

import { useState, useEffect, useRef } from 'react'
import { useScroll, useSpring, useMotionValue } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { HeroSection } from '@/components/HeroSection'
import { WhyCulturalIntelligenceSection } from '@/components/WhyCulturalIntelligenceSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ContactFormSection } from '@/components/ContactFormSection'
import { ProgramsOverview } from '@/components/ProgramsOverview'
import { USPBar } from '@/components/USPBar'
import { ModernFooter } from '@/components/ModernFooter'
import { AtmosphericBackground } from '@/components/AtmosphericBackground'
import { StartTodayCTA } from '@/components/StartTodayCTA'

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
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AtmosphericBackground mousePosition={mousePosition} scrollProgress={scrollProgress} />
      </div>

      <div className="relative z-10">
        <ModernNavbar />
        <main>
          <HeroSection />
          <WhyCulturalIntelligenceSection />
          <ProgramsOverview />
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
