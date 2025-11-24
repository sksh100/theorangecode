'use client'

import React, { useEffect, Suspense, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// IP addresses to exclude from tracking
const EXCLUDED_IPS = [
  '94.59.182.192', // Your IP address
  // Add more IPs here if needed
]

function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [shouldTrack, setShouldTrack] = useState<boolean | null>(null)

  // Check if IP should be excluded
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkIP = async () => {
      try {
        const response = await fetch('/api/get-ip')
        const data = await response.json()
        const userIP = data.ip

        // Check if IP is in excluded list
        if (EXCLUDED_IPS.includes(userIP)) {
          console.log('🚫 Google Analytics disabled for excluded IP:', userIP)
          setShouldTrack(false)
        } else {
          setShouldTrack(true)
        }
      } catch (error) {
        // If IP check fails, allow tracking (fail open)
        console.warn('Could not check IP, allowing tracking:', error)
        setShouldTrack(true)
      }
    }

    checkIP()
  }, [])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
    if (shouldTrack === false) return // Don't track if IP is excluded
    if (shouldTrack === null) return // Wait for IP check to complete

    // Track page view
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })

    // Track referrer and traffic source
    if (document.referrer) {
      window.gtag('event', 'page_view', {
        page_path: url,
        page_referrer: document.referrer,
      })
    }

    // Track UTM parameters if present
    const utmParams: Record<string, string> = {}
    if (searchParams) {
      const utmSource = searchParams.get('utm_source')
      const utmMedium = searchParams.get('utm_medium')
      const utmCampaign = searchParams.get('utm_campaign')
      const utmTerm = searchParams.get('utm_term')
      const utmContent = searchParams.get('utm_content')

      if (utmSource) utmParams.utm_source = utmSource
      if (utmMedium) utmParams.utm_medium = utmMedium
      if (utmCampaign) utmParams.utm_campaign = utmCampaign
      if (utmTerm) utmParams.utm_term = utmTerm
      if (utmContent) utmParams.utm_content = utmContent

      if (Object.keys(utmParams).length > 0) {
        window.gtag('event', 'page_view', {
          ...utmParams,
          page_path: url,
        })
      }
    }
  }, [pathname, searchParams])

  // Track all clicks on the page
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
    if (shouldTrack === false) return // Don't track if IP is excluded
    if (shouldTrack === null) return // Wait for IP check to complete

    const trackClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      // Get the clicked element and its context
      const element = target.closest('a, button, [role="button"], [onclick]') as HTMLElement
      if (!element) return

      // Get element details
      const elementText = element.textContent?.trim() || ''
      const elementId = element.id || ''
      const elementClass = element.className || ''
      const href = (element as HTMLAnchorElement).href || ''
      const tagName = element.tagName.toLowerCase()

      // Track the click
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: elementText || elementId || elementClass || tagName,
        element_id: elementId,
        element_class: elementClass,
        element_tag: tagName,
        element_text: elementText.substring(0, 100), // Limit text length
        link_url: href,
        page_path: window.location.pathname,
        page_url: window.location.href,
      })
    }

    // Track form submissions
    const trackFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement
      if (!form) return

      const formId = form.id || ''
      const formAction = form.action || ''
      const formMethod = form.method || 'get'

      window.gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: formId || 'form',
        form_id: formId,
        form_action: formAction,
        form_method: formMethod,
        page_path: window.location.pathname,
      })
    }

    // Track scroll depth
    let maxScroll = 0
    const trackScroll = () => {
      const scrollPercent = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
      )
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        // Track at 25%, 50%, 75%, 100%
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          window.gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: `${scrollPercent}%`,
            scroll_depth: scrollPercent,
            page_path: window.location.pathname,
          })
        }
      }
    }

    // Track time on page
    const startTime = Date.now()
    const trackTimeOnPage = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000) // in seconds
      
      window.gtag('event', 'time_on_page', {
        event_category: 'engagement',
        time_on_page: timeOnPage,
        page_path: window.location.pathname,
      })
    }

    // Add event listeners
    document.addEventListener('click', trackClick, true)
    document.addEventListener('submit', trackFormSubmit, true)
    window.addEventListener('scroll', trackScroll, { passive: true })
    
    // Track time on page when user leaves
    window.addEventListener('beforeunload', trackTimeOnPage)
    window.addEventListener('pagehide', trackTimeOnPage)

    // Track video plays (if any)
    const trackVideoPlay = (e: Event) => {
      const video = e.target as HTMLVideoElement
      window.gtag('event', 'video_play', {
        event_category: 'engagement',
        video_title: video.title || '',
        video_url: video.src || '',
        page_path: window.location.pathname,
      })
    }

    // Track file downloads
    const trackDownload = (e: Event) => {
      const link = e.target as HTMLAnchorElement
      if (link.download || link.href.match(/\.(pdf|doc|docx|xls|xlsx|zip|rar)$/i)) {
        window.gtag('event', 'file_download', {
          event_category: 'engagement',
          event_label: link.href,
          file_name: link.download || link.href.split('/').pop() || '',
          file_extension: link.href.split('.').pop() || '',
          page_path: window.location.pathname,
        })
      }
    }

    document.addEventListener('play', trackVideoPlay, true)
    document.addEventListener('click', trackDownload, true)

    return () => {
      document.removeEventListener('click', trackClick, true)
      document.removeEventListener('submit', trackFormSubmit, true)
      window.removeEventListener('scroll', trackScroll)
      window.removeEventListener('beforeunload', trackTimeOnPage)
      window.removeEventListener('pagehide', trackTimeOnPage)
      document.removeEventListener('play', trackVideoPlay, true)
      document.removeEventListener('click', trackDownload, true)
    }
  }, [])

  // Track user engagement metrics
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
    if (shouldTrack === false) return // Don't track if IP is excluded
    if (shouldTrack === null) return // Wait for IP check to complete

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.gtag('event', 'page_hidden', {
          event_category: 'engagement',
          page_path: window.location.pathname,
        })
      } else {
        window.gtag('event', 'page_visible', {
          event_category: 'engagement',
          page_path: window.location.pathname,
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  if (!GA_MEASUREMENT_ID) {
    // Log warning in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID is not set')
    }
    return null
  }

  // Don't load GA scripts if IP is excluded
  if (shouldTrack === false) {
    return null
  }

  // Wait for IP check before loading scripts
  if (shouldTrack === null) {
    return null
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Initialize Consent Mode v2 (GDPR compliant)
            // Default to denied - will be updated when user gives consent
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'granted',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 2000, // Wait 2 seconds for consent update
            });
            
            // Check for existing consent and update immediately if found
            try {
              const savedConsent = localStorage.getItem('cookieConsent');
              if (savedConsent) {
                const consent = JSON.parse(savedConsent);
                gtag('consent', 'update', {
                  'ad_storage': consent.marketing ? 'granted' : 'denied',
                  'ad_user_data': consent.marketing ? 'granted' : 'denied',
                  'ad_personalization': consent.marketing ? 'granted' : 'denied',
                  'analytics_storage': consent.analytics ? 'granted' : 'denied',
                  'functionality_storage': 'granted',
                  'personalization_storage': consent.personalization ? 'granted' : 'denied',
                  'security_storage': 'granted',
                });
              }
            } catch (e) {
              console.warn('Could not load saved consent:', e);
            }
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
            });
            
            // Track initial page load
            gtag('event', 'page_view', {
              page_path: window.location.pathname,
              page_title: document.title,
              page_location: window.location.href,
              referrer: document.referrer || 'direct',
            });
            
            // Track traffic source
            const urlParams = new URLSearchParams(window.location.search);
            const utmSource = urlParams.get('utm_source');
            const utmMedium = urlParams.get('utm_medium');
            const utmCampaign = urlParams.get('utm_campaign');
            
            if (utmSource || utmMedium || utmCampaign) {
              gtag('event', 'traffic_source', {
                event_category: 'acquisition',
                utm_source: utmSource || 'none',
                utm_medium: utmMedium || 'none',
                utm_campaign: utmCampaign || 'none',
                page_path: window.location.pathname,
              });
            }
            
            // Track referrer
            if (document.referrer) {
              gtag('event', 'referrer_track', {
                event_category: 'acquisition',
                referrer: document.referrer,
                referrer_domain: new URL(document.referrer).hostname,
                page_path: window.location.pathname,
              });
            }
          `,
        }}
      />
    </>
  )
}

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  )
}

