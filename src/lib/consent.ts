// Cookie Consent Management Utilities

export interface CookieConsent {
  essential: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
  timestamp: string
}

const CONSENT_STORAGE_KEY = 'cookieConsent'
const CONSENT_DATE_KEY = 'cookieConsentDate'

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
  if (!stored) return null
  
  try {
    const consent = JSON.parse(stored)
    return {
      ...consent,
      timestamp: localStorage.getItem(CONSENT_DATE_KEY) || new Date().toISOString()
    }
  } catch {
    return null
  }
}

export function saveCookieConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
  localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString())
  
  // Update Google Consent Mode
  updateGoogleConsentMode(consent)
}

export function updateGoogleConsentMode(consent: CookieConsent): void {
  if (typeof window === 'undefined' || !window.gtag) return
  
  // Update consent mode based on user preferences
  window.gtag('consent', 'update', {
    'ad_storage': consent.marketing ? 'granted' : 'denied',
    'ad_user_data': consent.marketing ? 'granted' : 'denied',
    'ad_personalization': consent.marketing ? 'granted' : 'denied',
    'analytics_storage': consent.analytics ? 'granted' : 'denied',
    'functionality_storage': 'granted', // Always granted for essential functionality
    'personalization_storage': consent.personalization ? 'granted' : 'denied',
    'security_storage': 'granted', // Always granted for security
  })
}

export function hasConsent(): boolean {
  return getCookieConsent() !== null
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem(CONSENT_STORAGE_KEY)
  localStorage.removeItem(CONSENT_DATE_KEY)
  
  // Reset to default denied state
  if (window.gtag) {
    window.gtag('consent', 'update', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'granted',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
    })
  }
}

