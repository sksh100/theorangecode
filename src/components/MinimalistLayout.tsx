'use client'

import { ReactNode, useEffect } from 'react'
import Link from 'next/link'

interface MinimalistLayoutProps {
  children: ReactNode
}

export function MinimalistLayout({ children }: MinimalistLayoutProps) {
  useEffect(() => {
    // Hide navbar and footer by targeting their common selectors
    const hideNavbarAndFooter = () => {
      // Hide navbar - ModernNavbar uses motion.nav with fixed positioning and z-[60]
      const navbars = document.querySelectorAll('nav[class*="fixed"], nav[class*="z-"], header')
      navbars.forEach(nav => {
        if (nav instanceof HTMLElement) {
          const computedStyle = window.getComputedStyle(nav)
          // Only hide if it's fixed positioned (navbar) or has high z-index
          if (computedStyle.position === 'fixed' || nav.classList.toString().includes('z-')) {
            nav.style.display = 'none'
          }
        }
      })
      
      // Hide footer - ModernFooter uses footer element or section with footer classes
      const footers = document.querySelectorAll('footer, section[class*="footer"], [class*="Footer"]')
      footers.forEach(footer => {
        if (footer instanceof HTMLElement) {
          footer.style.display = 'none'
        }
      })
    }
    
    // Hide immediately
    hideNavbarAndFooter()
    
    // Use MutationObserver to catch dynamically added navbar/footer
    const observer = new MutationObserver(() => {
      // Small delay to ensure elements are fully rendered
      setTimeout(hideNavbarAndFooter, 0)
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        /* Hide navbar and footer globally for minimalist layout pages */
        nav[class*="fixed"],
        nav[style*="position: fixed"],
        nav[class*="z-"],
        header,
        footer,
        section[class*="footer"],
        [class*="Footer"],
        [class*="footer"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
      `}</style>
      <div className="min-h-screen bg-primary-dark text-white">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {children}

          {/* Minimal Legal Link */}
          <div className="mt-16 pt-6 border-t border-white/10 text-center">
            <Link href="/privacy-policy" className="text-sm text-white/60 hover:text-white/80 transition-colors">
              Privacy & Legal
            </Link>
            <p className="text-center text-xs text-white/40 mt-3">
              © {new Date().getFullYear()} The Orange Code. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

