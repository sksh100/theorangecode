'use client'

import { Background } from '@/components/Background'
import { ModernNavbar } from '@/components/ModernNavbar'
import { HeroSection } from '@/components/HeroSection'
import { USPBar } from '@/components/USPBar'
import { FormSection } from '@/components/FormSection'
import { Footer } from '@/components/Footer'
import { DevNavigation } from '@/components/DevNavigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <Background />
      <ModernNavbar />
      
      {/* Hero Section - Normal Flow */}
      <HeroSection />
      
      {/* Main Content - Normal Flow */}
      <main className="relative bg-primary-dark">
        {/* Continuous Dark Blue Background Section */}
        <section className="relative">
          <USPBar />
          <FormSection />
        </section>
        
        <Footer />
      </main>
      
      <DevNavigation />
    </div>
  )
}
