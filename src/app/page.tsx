'use client'

import { Background } from '@/components/Background'
import { ModernNavbar } from '@/components/ModernNavbar'
import { HeroSection } from '@/components/HeroSection'
import { USPBar } from '@/components/USPBar'
import { ProgramsOverview } from '@/components/ProgramsOverview'
import { BentoBoxSection } from '@/components/BentoBoxSection'
import { ExtendedAdvantagesBanner } from '@/components/ExtendedAdvantagesBanner'
import { ModernFooter } from '@/components/ModernFooter'
import { CookieBanner } from '@/components/CookieBanner'
import { Analytics } from '@/components/Analytics'
import { TrackingHooks } from '@/components/TrackingHooks'
import { DevNavigation } from '@/components/DevNavigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <Background />
      <Analytics />
      <TrackingHooks />
      <ModernNavbar />
      
      {/* Hero Section - Normal Flow */}
      <HeroSection />
      
      {/* Main Content - Normal Flow */}
      <main className="relative bg-primary-dark">
        {/* Continuous Dark Blue Background Section */}
            <section className="relative">
              <USPBar />
              <ProgramsOverview />
              <BentoBoxSection />
              <ExtendedAdvantagesBanner />
            </section>
        
        <ModernFooter />
      </main>
      
      <CookieBanner />
      <DevNavigation />
    </div>
  )
}
