'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

/**
 * NavigationProgress component
 * Shows a progress bar at the top of the page during route transitions
 * Provides visual feedback that navigation is happening
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Show progress bar when route changes
    setIsLoading(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return 90 // Don't complete until page is ready
        }
        return prev + 10
      })
    }, 50)

    // Complete progress after a short delay
    const timer = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 200)
    }, 300)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] h-1 bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-orange via-azure-blue to-bright-blue"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </div>
  )
}

