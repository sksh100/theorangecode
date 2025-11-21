'use client'

import { useState, Suspense } from 'react'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { WebGLExperiment } from '@/components/WebGLExperiment'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

export default function WebGLExperiencePage() {
  return (
    <div className="min-h-screen bg-primary-dark text-white overflow-hidden">
      <ModernNavbar />
      <Suspense fallback={<div className="w-full h-full bg-primary-dark" />}>
        <WebGLExperiment />
      </Suspense>
      <ModernFooter />
    </div>
  )
}
