'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Google Analytics 4 Configuration
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })

    // Make gtag available globally
    ;(window as any).gtag = gtag
  }
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string, formType: string) => {
  trackEvent('form_submit', 'engagement', `${formName}_${formType}`)
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'button', `${buttonName}_${location}`)
}

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll', 'engagement', `depth_${depth}%`)
}

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number, page: string) => {
  trackEvent('timing_complete', 'engagement', `time_on_${page}`, timeInSeconds)
}

// Track user engagement
export const trackEngagement = (action: string, element: string) => {
  trackEvent(action, 'engagement', element)
}

// Analytics Component
export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize analytics if consent is given
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent) {
      const preferences = JSON.parse(cookieConsent)
      if (preferences.analytics) {
        initGA()
      }
    }
  }, [])

  useEffect(() => {
    // Track page views
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent) {
      const preferences = JSON.parse(cookieConsent)
      if (preferences.analytics) {
        trackPageView(pathname)
      }
    }
  }, [pathname])

  return null
}

// Hook for tracking user interactions
export const useAnalytics = () => {
  const trackClick = (element: string, location: string) => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent) {
      const preferences = JSON.parse(cookieConsent)
      if (preferences.analytics) {
        trackButtonClick(element, location)
      }
    }
  }

  const trackForm = (formName: string, formType: string) => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent) {
      const preferences = JSON.parse(cookieConsent)
      if (preferences.analytics) {
        trackFormSubmission(formName, formType)
      }
    }
  }

  const trackEngagementEvent = (action: string, element: string) => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent) {
      const preferences = JSON.parse(cookieConsent)
      if (preferences.analytics) {
        trackEngagement(action, element)
      }
    }
  }

  return {
    trackClick,
    trackForm,
    trackEngagement: trackEngagementEvent,
  }
}

// Scroll tracking hook
export const useScrollTracking = () => {
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) return

    const preferences = JSON.parse(cookieConsent)
    if (!preferences.analytics) return

    let maxScrollDepth = 0
    const scrollThresholds = [25, 50, 75, 90, 100]

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollDepth = Math.round((scrollTop / documentHeight) * 100)

      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        
        // Track milestone scroll depths
        scrollThresholds.forEach(threshold => {
          if (scrollDepth >= threshold && maxScrollDepth < threshold + 10) {
            trackScrollDepth(threshold)
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

// Time tracking hook
export const useTimeTracking = () => {
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) return

    const preferences = JSON.parse(cookieConsent)
    if (!preferences.analytics) return

    const startTime = Date.now()
    const pathname = window.location.pathname

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      if (timeSpent > 5) { // Only track if user spent more than 5 seconds
        trackTimeOnPage(timeSpent, pathname)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])
}

// Enhanced tracking for specific components
export const trackComponentInteraction = (componentName: string, action: string, details?: any) => {
  const cookieConsent = localStorage.getItem('cookieConsent')
  if (cookieConsent) {
    const preferences = JSON.parse(cookieConsent)
    if (preferences.analytics) {
      trackEvent(action, 'component_interaction', `${componentName}_${JSON.stringify(details || {})}`)
    }
  }
}

// Track user journey
export const trackUserJourney = (step: string, data?: any) => {
  const cookieConsent = localStorage.getItem('cookieConsent')
  if (cookieConsent) {
    const preferences = JSON.parse(cookieConsent)
    if (preferences.analytics) {
      trackEvent('user_journey', 'conversion', step, data)
    }
  }
}

// Track performance metrics
export const trackPerformance = (metric: string, value: number) => {
  const cookieConsent = localStorage.getItem('cookieConsent')
  if (cookieConsent) {
    const preferences = JSON.parse(cookieConsent)
    if (preferences.analytics) {
      trackEvent('performance', 'metrics', metric, value)
    }
  }
}
