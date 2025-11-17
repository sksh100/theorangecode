'use client'

import { ModernNavbar } from '@/components/ModernNavbar'
import { HeroSection } from '@/components/HeroSection'
import { BentoBoxSection } from '@/components/BentoBoxSection'
import { ExtendedAdvantagesBanner } from '@/components/ExtendedAdvantagesBanner'
import { ProgramsOverview } from '@/components/ProgramsOverview'
import { USPBar } from '@/components/USPBar'
import { ModernFooter } from '@/components/ModernFooter'
import { Background } from '@/components/Background'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      <main>
        <HeroSection />
        <USPBar />
        <BentoBoxSection />
        <ExtendedAdvantagesBanner />
        <ProgramsOverview />
      </main>
      <ModernFooter />
    </div>
  )
}
