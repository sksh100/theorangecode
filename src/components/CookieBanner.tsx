'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Settings, Check, X, Shield, Eye, Target } from 'lucide-react'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    personalization: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true
    }
    setPreferences(allAccepted)
    savePreferences(allAccepted)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false
    }
    setPreferences(onlyEssential)
    savePreferences(onlyEssential)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
    setIsVisible(false)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs))
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    
    // Initialize tracking based on preferences
    if (prefs.analytics) {
      initializeAnalytics()
    }
    if (prefs.marketing) {
      initializeMarketing()
    }
    if (prefs.personalization) {
      initializePersonalization()
    }
  }

  const initializeAnalytics = () => {
    // Google Analytics or other analytics tracking
    console.log('Analytics tracking initialized')
    // Add your analytics code here
  }

  const initializeMarketing = () => {
    // Marketing tracking (Facebook Pixel, etc.)
    console.log('Marketing tracking initialized')
    // Add your marketing tracking code here
  }

  const initializePersonalization = () => {
    // Personalization features
    console.log('Personalization features enabled')
    // Add your personalization code here
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Can't disable essential cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-dark/95 to-primary-dark backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
            {!showSettings ? (
              // Main Cookie Banner
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-bright-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-6 h-6 text-orange" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      We Value Your Privacy
                    </h3>
                    <p className="text-white/80 leading-relaxed mb-4">
                      We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                      By continuing to use our site, you consent to our use of cookies in accordance with our 
                      <a href="/privacy-policy" className="text-orange hover:text-bright-blue transition-colors"> Privacy Policy</a>.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        onClick={handleAcceptAll}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange to-bright-blue rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Check className="w-4 h-4" />
                        Accept All
                      </motion.button>
                      
                      <motion.button
                        onClick={handleRejectAll}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <X className="w-4 h-4" />
                        Reject All
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setShowSettings(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Settings className="w-4 h-4" />
                        Customize
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Cookie Settings
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <Settings className="w-6 h-6 text-orange" />
                    Cookie Preferences
                  </h3>
                  <motion.button
                    onClick={() => setShowSettings(false)}
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Essential Cookies */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-azure-blue" />
                      <div>
                        <h4 className="font-semibold text-white">Essential Cookies</h4>
                        <p className="text-sm text-white/70">Required for basic website functionality</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-orange rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-bright-blue" />
                      <div>
                        <h4 className="font-semibold text-white">Analytics Cookies</h4>
                        <p className="text-sm text-white/70">Help us understand how you use our website</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => togglePreference('analytics')}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.analytics ? 'bg-orange' : 'bg-white/20'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full"
                        animate={{ x: preferences.analytics ? 24 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-orange" />
                      <div>
                        <h4 className="font-semibold text-white">Marketing Cookies</h4>
                        <p className="text-sm text-white/70">Used to deliver relevant advertisements</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => togglePreference('marketing')}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.marketing ? 'bg-orange' : 'bg-white/20'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full"
                        animate={{ x: preferences.marketing ? 24 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </div>

                  {/* Personalization Cookies */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-light-blue" />
                      <div>
                        <h4 className="font-semibold text-white">Personalization Cookies</h4>
                        <p className="text-sm text-white/70">Remember your preferences and settings</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => togglePreference('personalization')}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.personalization ? 'bg-orange' : 'bg-white/20'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full"
                        animate={{ x: preferences.personalization ? 24 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={handleSavePreferences}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange to-bright-blue rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Check className="w-4 h-4" />
                    Save Preferences
                  </motion.button>
                  
                  <motion.button
                    onClick={handleAcceptAll}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Accept All
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
