'use client'

import { Suspense } from 'react'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { WebGLEffectSelector } from '@/components/WebGLEffectOptions'

export default function WebGLOptionsPage() {
  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <ModernNavbar />
      <Suspense fallback={<div className="w-full h-full bg-primary-dark" />}>
        <WebGLEffectSelector />
      </Suspense>
      <div className="relative z-10 mt-64 md:mt-96 lg:mt-[500px]">
        <ModernFooter />
      </div>
    </div>
  )
}

