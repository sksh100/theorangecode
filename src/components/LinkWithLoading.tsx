'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LinkWithLoadingProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  prefetch?: boolean
  [key: string]: any
}

/**
 * LinkWithLoading component
 * Wraps Next.js Link to show loading state immediately on click
 * Prevents white/blue screens during navigation
 */
export function LinkWithLoading({ 
  href, 
  children, 
  className,
  onClick,
  prefetch = true,
  ...props 
}: LinkWithLoadingProps) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only show loading if navigating to a different page
    if (href !== pathname && !href.startsWith('#')) {
      setIsNavigating(true)
      
      // Hide loading after navigation completes (fallback)
      setTimeout(() => {
        setIsNavigating(false)
      }, 2000)
    }
    
    // Call original onClick if provided
    if (onClick) {
      onClick()
    }
  }

  return (
    <>
      {isNavigating && (
        <div 
          className="fixed inset-0 z-[10000] bg-primary-dark/95 flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(135deg, rgba(10, 34, 68, 0.98) 0%, rgba(0, 153, 255, 0.15) 100%)',
          }}
        >
          <div className="w-16 h-16 border-4 border-white/20 border-t-orange rounded-full animate-spin" />
        </div>
      )}
      <Link 
        href={href} 
        prefetch={prefetch}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>
    </>
  )
}

