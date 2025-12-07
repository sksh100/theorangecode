'use client'

import { ReactNode } from 'react'

/**
 * Template component for Next.js App Router
 * This ensures smooth transitions between pages without full remounts
 * Prevents white/blue screens during navigation
 * Keep it simple to avoid hydration mismatches
 */
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>
}

