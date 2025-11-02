'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ModernFooter } from '@/components/ModernFooter'
import { ArrowRight, Clock, Check, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false)

  const countryCodes = [
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+1', flag: '🇺🇸', name: 'US/CA' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+968', flag: '🇴🇲', name: 'Oman' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
    { code: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: '+358', flag: '🇫🇮', name: 'Finland' },
    { code: '+353', flag: '🇮🇪', name: 'Ireland' },
    { code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: '+30', flag: '🇬🇷', name: 'Greece' },
    { code: '+48', flag: '🇵🇱', name: 'Poland' },
    { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
    { code: '+36', flag: '🇭🇺', name: 'Hungary' },
    { code: '+40', flag: '🇷🇴', name: 'Romania' },
    { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '+385', flag: '🇭🇷', name: 'Croatia' },
    { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
    { code: '+90', flag: '🇹🇷', name: 'Turkey' },
    { code: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
    { code: '+962', flag: '🇯🇴', name: 'Jordan' },
    { code: '+963', flag: '🇸🇾', name: 'Syria' },
    { code: '+964', flag: '🇮🇶', name: 'Iraq' },
    { code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+233', flag: '🇬🇭', name: 'Ghana' },
    { code: '+212', flag: '🇲🇦', name: 'Morocco' },
    { code: '+213', flag: '🇩🇿', name: 'Algeria' },
    { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
    { code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: '+51', flag: '🇵🇪', name: 'Peru' },
    { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
    { code: '+507', flag: '🇵🇦', name: 'Panama' },
    { code: '+501', flag: '🇧🇿', name: 'Belize' },
    { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
    { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
    { code: '+504', flag: '🇭🇳', name: 'Honduras' },
    { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
    { code: '+592', flag: '🇬🇾', name: 'Guyana' },
    { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
    { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
    { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
    { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
    { code: '+960', flag: '🇲🇻', name: 'Maldives' },
    { code: '+673', flag: '🇧🇳', name: 'Brunei' },
    { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+856', flag: '🇱🇦', name: 'Laos' },
    { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
    { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
    { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
    { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
    { code: '+995', flag: '🇬🇪', name: 'Georgia' },
    { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
    { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
    { code: '+374', flag: '🇦🇲', name: 'Armenia' },
    { code: '+375', flag: '🇧🇾', name: 'Belarus' },
    { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
    { code: '+371', flag: '🇱🇻', name: 'Latvia' },
    { code: '+372', flag: '🇪🇪', name: 'Estonia' },
    { code: '+354', flag: '🇮🇸', name: 'Iceland' },
    { code: '+356', flag: '🇲🇹', name: 'Malta' },
    { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
    { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
    { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
    { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+257', flag: '🇧🇮', name: 'Burundi' },
    { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
    { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
    { code: '+252', flag: '🇸🇴', name: 'Somalia' },
    { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
    { code: '+249', flag: '🇸🇩', name: 'Sudan' },
    { code: '+218', flag: '🇱🇾', name: 'Libya' },
    { code: '+260', flag: '🇿🇲', name: 'Zambia' },
    { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
    { code: '+262', flag: '🇷🇪', name: 'Reunion' },
    { code: '+230', flag: '🇲🇺', name: 'Mauritius' },
    { code: '+248', flag: '🇸🇨', name: 'Seychelles' },
    { code: '+225', flag: '🇨🇮', name: "Côte d'Ivoire" },
    { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
    { code: '+227', flag: '🇳🇪', name: 'Niger' },
    { code: '+228', flag: '🇹🇬', name: 'Togo' },
    { code: '+229', flag: '🇧🇯', name: 'Benin' },
    { code: '+221', flag: '🇸🇳', name: 'Senegal' },
    { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
    { code: '+223', flag: '🇲🇱', name: 'Mali' },
    { code: '+224', flag: '🇬🇳', name: 'Guinea' },
    { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
    { code: '+241', flag: '🇬🇦', name: 'Gabon' },
    { code: '+242', flag: '🇨🇬', name: 'Congo' },
    { code: '+243', flag: '🇨🇩', name: 'DRC' },
    { code: '+244', flag: '🇦🇴', name: 'Angola' },
    { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
    { code: '+246', flag: '🇮🇴', name: 'BIOT' },
    { code: '+290', flag: '🇸🇭', name: 'Saint Helena' },
    { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
    { code: '+298', flag: '🇫🇴', name: 'Faroe Islands' },
    { code: '+299', flag: '🇬🇱', name: 'Greenland' },
    { code: '+500', flag: '🇫🇰', name: 'Falkland Islands' },
    { code: '+590', flag: '🇬🇵', name: 'Guadeloupe' },
    { code: '+596', flag: '🇲🇶', name: 'Martinique' },
    { code: '+594', flag: '🇬🇫', name: 'French Guiana' },
    { code: '+689', flag: '🇵🇫', name: 'French Polynesia' },
    { code: '+687', flag: '🇳🇨', name: 'New Caledonia' },
  ]

  return (
    <div className="min-h-screen bg-primary-dark">
      {/* Coming Soon Hero Section */}
      <section className="hero-section pb-2 sm:pb-0">
        <div className="hero-content pt-1 sm:pt-4 md:pt-4 pb-1 sm:pb-0">

          <motion.div 
            className="glass-card mt-0 relative overflow-hidden py-4 sm:py-8 md:py-16 lg:py-32 xl:py-40"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Logo in bottom left corner of glass box - bigger size */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-0 left-0 z-10"
            >
              <Image 
                src="/coming-soon/logo-1.png" 
                alt="The Orange Code Logo" 
                width={400} 
                height={400}
                className="w-auto h-auto max-w-[150px] sm:max-w-[180px] md:max-w-[250px] lg:max-w-[320px] xl:max-w-[400px]"
                priority
              />
            </motion.div>
            <div className="relative z-20 px-4 sm:px-6 md:px-0 mb-4 sm:mb-6 md:mb-8 lg:mb-0 pb-20 sm:pb-24 md:pb-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight text-center sm:text-right text-orange">
              Launching Soon
            </h1>
            
            <motion.p 
              className="hero-subtitle font-sofia text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-4 sm:mb-6 md:mb-12 font-normal text-center sm:text-right max-w-full sm:max-w-2xl sm:ml-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Transforming cultural barriers into bridges of trust through refined knowledge and authentic presence.
            </motion.p>
            
            <motion.div 
              className="countdown-section mt-4 sm:mt-6 md:mt-8 flex justify-center sm:justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="event-info inline-flex flex-col items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 lg:p-8 px-4 sm:px-6 md:px-8 lg:px-12 bg-bright-blue/10 border border-light-blue/30 rounded-xl sm:rounded-2xl backdrop-blur-[10px]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-azure-blue" />
                  <span className="date-label font-sofia text-xs sm:text-sm text-white/70 uppercase tracking-wider font-medium">
                    Launch Date
                  </span>
                </div>
                <span className="date-value font-sofia text-xl sm:text-2xl md:text-3xl text-gradient-primary font-bold">
                  November 8, 2025
                </span>
              </div>
            </motion.div>
            </div>

          </motion.div>
      
          {/* Decorative Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-azure-blue/20 rounded-full blur-2xl hidden sm:block"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border border-orange/20 rounded-full blur-2xl hidden sm:block"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </section>

      {/* Exclusive Pre-Launch Offer Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 mb-8 sm:mb-0">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden bg-accent-blue/20 backdrop-blur-[30px] border border-light-blue/40"
            style={{
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 212, 255, 0.4), 0 0 100px rgba(255, 145, 77, 0.2)'
            }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <span className="text-white text-xs font-semibold uppercase tracking-wide">Limited Time</span>
            </div>

            <div className="text-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-azure-blue/20 border border-azure-blue/40 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-azure-blue" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
                Exclusive Pre-Launch Offer - Enroll Now
              </h2>
              
              {/* Pricing */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 flex-wrap">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary">999 AED</span>
                  <span className="text-lg sm:text-xl text-white/50 line-through">2,999 AED</span>
                </div>
                <p className="text-white/70 text-xs sm:text-sm px-4">For the first 30 registrations only</p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">What you'll get:</h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Access to The Orange Code – Cultural Intelligence Foundations",
                  "Immersive live modules guided by Dutch-led expertise",
                  "Bonus: One-on-One Q&A Session (personalized cultural insight consultation)",
                  "Extra Bonus Session: Impeccable Introductions — how to present yourself across cultures with confidence",
                  "Priority Invitation to upcoming in-person sessions & GCC workshops",
                  "15% Discount on private consulting packages with The Orange Code team"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-azure-blue flex-shrink-0 mt-0.5 sm:mt-1" />
                    <span className="text-white/90 text-sm sm:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={async () => {
                  if (isLoadingCheckout) return
                  
                  setIsLoadingCheckout(true)
                  
                  try {
                    const response = await fetch('/api/create-checkout-session', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        price: 99900, // 999 AED in fils (smallest currency unit)
                        currency: 'aed'
                      })
                    })
                    
                    if (!response.ok) {
                      const errorData = await response.json().catch(() => ({ error: 'Server error' }))
                      console.error('Checkout API error:', errorData)
                      alert(errorData.error || `Server error (${response.status}). Please check your Stripe configuration or try again later.`)
                      setIsLoadingCheckout(false)
                      return
                    }
                    
                    const data = await response.json()
                    
                    if (data.url) {
                      // Redirect to Stripe checkout
                      window.location.href = data.url
                    } else if (data.error) {
                      console.error('Checkout error:', data.error)
                      alert(`Checkout error: ${data.error}`)
                      setIsLoadingCheckout(false)
                    } else {
                      console.error('Unexpected response:', data)
                      alert('Unable to start checkout. Please try again or contact support.')
                      setIsLoadingCheckout(false)
                    }
                  } catch (error: any) {
                    console.error('Checkout error:', error)
                    alert(`Checkout failed: ${error.message || 'Network error. Please check your connection and try again.'}`)
                    setIsLoadingCheckout(false)
                  }
                }}
                disabled={isLoadingCheckout}
                className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-primary rounded-full cursor-pointer hover:shadow-glow transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                {isLoadingCheckout ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-white font-semibold text-base sm:text-lg">Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="text-white font-semibold text-base sm:text-lg">Enroll Now - Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
              <p className="text-white/60 text-xs text-center px-4">
                Secure payment powered by Stripe • Limited to first 30 registrations
              </p>
            </div>
          </motion.div>
        </div>
            </section>
        
      <ModernFooter hideQuickLinks={true} hideLegalLinks={true} />
    </div>
  )
}
