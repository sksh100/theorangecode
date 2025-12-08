'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface MinimalistLayoutProps {
  children: ReactNode
}

export function MinimalistLayout({ children }: MinimalistLayoutProps) {
  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {children}
        
        {/* Minimal Legal Links */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <Link href="/privacy-policy" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white/80 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-white/80 transition-colors">
              Refund Policy
            </Link>
          </div>
          <p className="text-center text-xs text-white/40 mt-4">
            © {new Date().getFullYear()} The Orange Code. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

