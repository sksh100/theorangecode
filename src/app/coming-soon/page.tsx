'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ComingSoonPage() {
  const router = useRouter()

  useEffect(() => {
    // Track the coming soon page visit before redirecting
    const trackComingSoon = async () => {
      try {
        const page = '/coming-soon' + window.location.search
        const referrer = document.referrer || ''
        const userAgent = navigator.userAgent
        
        // Extract UTM parameters
        const params = new URLSearchParams(window.location.search)
        const utmParams = {
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
          utm_term: params.get('utm_term'),
          utm_content: params.get('utm_content'),
        }

        // Parse referrer
        let source = 'direct'
        let sourceType = 'direct'
        if (referrer) {
          try {
            const url = new URL(referrer)
            const hostname = url.hostname.toLowerCase()
            if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
              source = 'Facebook'
              sourceType = 'social'
            } else if (hostname.includes('instagram.com')) {
              source = 'Instagram'
              sourceType = 'social'
            } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
              source = 'Twitter/X'
              sourceType = 'social'
            } else if (hostname.includes('linkedin.com')) {
              source = 'LinkedIn'
              sourceType = 'social'
            } else if (hostname.includes('google.com')) {
              source = 'Google'
              sourceType = 'search'
            } else {
              source = hostname
              sourceType = 'referral'
            }
          } catch {
            source = referrer
            sourceType = 'referral'
          }
        }

        // Get or create session ID
        let sessionId = localStorage.getItem('visitor_session_id')
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          localStorage.setItem('visitor_session_id', sessionId)
        }

        // Track the visit
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
            utmSource: utmParams.utm_source,
            utmMedium: utmParams.utm_medium,
            utmCampaign: utmParams.utm_campaign,
            utmTerm: utmParams.utm_term,
            utmContent: utmParams.utm_content,
            source,
            sourceType,
            isComingSoon: true,
          }),
        })

        // Small delay to ensure tracking completes, then redirect
        setTimeout(() => {
          router.push('/')
        }, 100)
      } catch (error) {
        console.error('Error tracking coming soon visit:', error)
        // Redirect even if tracking fails
        router.push('/')
      }
    }

    trackComingSoon()
  }, [router])

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azure-blue mx-auto mb-4"></div>
        <p>Redirecting...</p>
      </div>
    </div>
  )
}
