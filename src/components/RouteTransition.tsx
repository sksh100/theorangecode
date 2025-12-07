'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * RouteTransition component
 * Shows a loading indicator during route transitions to prevent white/blue screens
 * This ensures users see a loading state instead of blank screens during navigation
 */
export function RouteTransition() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const prevPathnameRef = useRef<string>('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only show loading if pathname actually changed
    const pathnameChanged = prevPathnameRef.current !== pathname
    
    if (pathnameChanged) {
      prevPathnameRef.current = pathname
      
      // Show loading indicator immediately - this prevents white/blue screens
      setIsLoading(true)
      setIsVisible(true)

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Hide loading indicator after page has time to render
      // Use multiple strategies to ensure page is ready
      const hideLoading = () => {
        setIsLoading(false)
        setTimeout(() => {
          setIsVisible(false)
        }, 150)
      }
      
      // Wait for Next.js to finish rendering the new page
      // Use requestAnimationFrame to ensure DOM is updated
      const checkPageReady = () => {
        requestAnimationFrame(() => {
          // Check if main content is rendered
          const mainContent = document.querySelector('main') || document.querySelector('[role="main"]')
          if (mainContent && mainContent.children.length > 0) {
            // Page content is rendered, hide loading
            hideLoading()
          } else {
            // Retry after a short delay
            setTimeout(() => {
              if (document.readyState === 'complete' || document.readyState === 'interactive') {
                hideLoading()
              } else {
                window.addEventListener('load', hideLoading, { once: true })
                // Fallback timeout
                timeoutRef.current = setTimeout(hideLoading, 1000)
              }
            }, 100)
          }
        })
      }
      
      // Start checking immediately
      checkPageReady()
      
      // Also set fallback timeout
      timeoutRef.current = setTimeout(hideLoading, 1200)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="route-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{ 
            background: 'linear-gradient(135deg, rgba(10, 34, 68, 0.98) 0%, rgba(0, 153, 255, 0.15) 100%)',
            backdropFilter: 'blur(8px)'
          }}
        >
          {/* Loading Spinner */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-white/20 border-t-orange rounded-full animate-spin" />
              
              {/* Glow effect */}
              <div 
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-orange rounded-full animate-spin blur-sm opacity-50" 
                style={{ animationDuration: '0.8s' }} 
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

