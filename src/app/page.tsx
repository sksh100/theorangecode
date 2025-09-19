'use client'

import { Background } from '@/components/Background'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { FormSection } from '@/components/FormSection'
import { Footer } from '@/components/Footer'
import { DevNavigation } from '@/components/DevNavigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <Background />
      
      <div className="container max-w-6xl mx-auto px-5 min-h-screen flex flex-col">
        <Header />
        
        <main className="relative z-20 mt-[100vh] bg-primary-dark">
          <HeroSection />
          <FormSection />
        </main>
        
        <Footer />
      </div>
      
      <DevNavigation />
    </div>
  )
}
