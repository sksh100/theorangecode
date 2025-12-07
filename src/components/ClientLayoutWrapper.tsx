'use client'

import { Suspense, ReactNode } from 'react'
import { NavigationProgress } from './NavigationProgress'
import { RouteTransition } from './RouteTransition'
import { ScrollRestoration } from './ScrollRestoration'
import { VisitorTracker } from './VisitorTracker'
import { CookieBanner } from './CookieBanner'
import { ErrorBoundary } from './ErrorBoundary'
import { CartProvider } from '@/contexts/CartContext'

/**
 * ClientLayoutWrapper
 * Wraps client-side components that need to run in the browser
 * Prevents hydration errors and white screens
 */
export function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <CartProvider>
        <NavigationProgress />
        <RouteTransition />
        <Suspense fallback={
          <div className="min-h-screen bg-primary-dark flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-orange rounded-full animate-spin" />
          </div>
        }>
          {children}
        </Suspense>
        <ScrollRestoration />
        <VisitorTracker />
        <CookieBanner />
      </CartProvider>
    </ErrorBoundary>
  )
}

