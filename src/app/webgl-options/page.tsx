'use client'

import { Suspense } from 'react'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { WebGLEffectSelector } from '@/components/WebGLEffectOptions'

export default function WebGLOptionsPage() {
  return (
    <div className="min-h-screen bg-primary-dark text-white overflow-hidden">
      <ModernNavbar />
      <Suspense fallback={<div className="w-full h-full bg-primary-dark" />}>
        <WebGLEffectSelector />
      </Suspense>
      <ModernFooter />
    </div>
  )
}

