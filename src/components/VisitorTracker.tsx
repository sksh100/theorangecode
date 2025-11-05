'use client'

import { useEffect } from 'react'

export function VisitorTracker() {
  useEffect(() => {
    // Get or create session ID
    let sessionId = localStorage.getItem('visitor_session_id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('visitor_session_id', sessionId)
    }

    // Track page view
    const trackPageView = async () => {
      try {
        const page = window.location.pathname + window.location.search
        const referrer = document.referrer || ''
        const userAgent = navigator.userAgent

        await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page,
            referrer,
            userAgent,
            sessionId,
          }),
        })
      } catch (error) {
        // Silently fail - don't break the site
        console.error('Visitor tracking error:', error)
      }
    }

    // Track initial page view
    trackPageView()

    // Track page view on route change (for SPA navigation)
    const handleRouteChange = () => {
      trackPageView()
    }

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange)

    // Track page visibility changes (user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackPageView()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null // This component doesn't render anything
}

