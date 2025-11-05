'use client'

import { useEffect, useRef } from 'react'

export function VisitorTracker() {
  const sessionStartTime = useRef<number>(Date.now())
  const lastActivityTime = useRef<number>(Date.now())
  const scrollDepth = useRef<number>(0)
  const clickCount = useRef<number>(0)
  const timeInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Get or create session ID
    let sessionId = localStorage.getItem('visitor_session_id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('visitor_session_id', sessionId)
    }

    sessionStartTime.current = Date.now()

    // Track page view
    const trackPageView = async () => {
      try {
        const page = window.location.pathname + window.location.search
        const referrer = document.referrer || ''
        const userAgent = navigator.userAgent

        console.log('📍 Tracking page view:', { page, sessionId })
        
        const response = await fetch('/api/track-visitor', {
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

        const data = await response.json()
        console.log('✅ Visitor tracking response:', data)
        
        if (!data.success) {
          console.error('❌ Visitor tracking failed:', data.error)
        }
      } catch (error) {
        console.error('❌ Visitor tracking error:', error)
      }
    }

    // Track activity
    const trackActivity = async (type: string, data: any) => {
      try {
        const response = await fetch('/api/track-activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            type,
            data,
          }),
        })
        
        if (!response.ok) {
          console.error(`❌ Activity tracking failed for ${type}:`, await response.text())
        }
      } catch (error) {
        console.error(`❌ Activity tracking error for ${type}:`, error)
      }
    }

    // Track clicks
    const handleClick = (e: MouseEvent) => {
      clickCount.current++
      const target = e.target as HTMLElement
      const clickData = {
        target: target.tagName.toLowerCase(),
        text: target.textContent?.substring(0, 50) || '',
        url: (target as HTMLAnchorElement)?.href || window.location.href,
        position: { x: e.clientX, y: e.clientY },
      }
      trackActivity('click', clickData)
      lastActivityTime.current = Date.now()
    }

    // Track scroll depth
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100
      
      if (scrollPercent > scrollDepth.current) {
        scrollDepth.current = scrollPercent
        trackActivity('scroll', {
          depth: Math.round(scrollPercent),
          scrollTop,
        })
      }
      lastActivityTime.current = Date.now()
    }

    // Track time on page (send every 10 seconds)
    const trackTime = () => {
      const timeOnPage = Math.floor((Date.now() - sessionStartTime.current) / 1000)
      trackActivity('time', {
        time: timeOnPage,
      })
    }

    // Track exit
    const handleExit = () => {
      const totalTime = Math.floor((Date.now() - sessionStartTime.current) / 1000)
      trackActivity('exit', {
        totalTime,
        scrollDepth: scrollDepth.current,
        clicks: clickCount.current,
      })
    }

    // Track initial page view
    trackPageView()

    // Set up event listeners
    document.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('beforeunload', handleExit)

    // Track time every 10 seconds
    timeInterval.current = setInterval(trackTime, 10000)

    // Track page view on route change (for SPA navigation)
    const handleRouteChange = () => {
      trackPageView()
      sessionStartTime.current = Date.now()
      scrollDepth.current = 0
      clickCount.current = 0
    }

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange)

    // Track page visibility changes (user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackPageView()
        lastActivityTime.current = Date.now()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleExit)
      window.removeEventListener('popstate', handleRouteChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (timeInterval.current) {
        clearInterval(timeInterval.current)
      }
      handleExit() // Track exit on unmount
    }
  }, [])

  return null // This component doesn't render anything
}

