'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ModernFooter } from '@/components/ModernFooter'
import { ArrowRight, Clock, Check, Sparkles } from 'lucide-react'

export default function Home() {

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
            className="glass-card mt-0 relative overflow-hidden py-4 sm:py-8 md:py-16 lg:py-32 xl:py-40 z-10"
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-6 md:mb-6 leading-tight tracking-tight text-center sm:text-right text-orange">
              Launching Soon
            </h1>
            
            <motion.p 
              className="hero-subtitle font-sofia text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-6 sm:mb-6 md:mb-12 font-normal text-center sm:text-right max-w-full sm:max-w-2xl sm:ml-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Transforming cultural barriers into bridges of trust through refined knowledge and authentic presence.
            </motion.p>

            {/* Mobile-visible launch date (duplicate for small screens to ensure visibility) */}
            <div className="sm:hidden mt-2 mb-4">
              <p className="font-sofia text-base text-white/90 text-center">
                <span className="uppercase text-white/70 tracking-wider mr-2">Launch Date</span>
                <span className="font-bold text-gradient-primary">November 28, 2025</span>
              </p>
            </div>
            
            <motion.div 
              className="countdown-section mt-6 sm:mt-6 md:mt-8 flex justify-center sm:justify-end"
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
                  November 28, 2025
                </span>
              </div>
            </motion.div>
            </div>

          </motion.div>
      
          {/* 3D Floating Objects Around Glass Box */}
          {/* Floating Geometric Shapes */}
          <motion.div
            className="hidden absolute -top-8 right-10 sm:top-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-azure-blue/30 rotate-45 z-0"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.2, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="hidden absolute -bottom-12 left-10 sm:-bottom-5 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 border-orange/30 rounded-full z-0"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 15, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="hidden absolute -top-12 left-1/4 sm:-top-5 w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 bg-gradient-to-br from-azure-blue/20 to-orange/20 rotate-12 z-0"
            animate={{
              rotate: [12, 372],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Floating Gradient Orbs */}
          <motion.div
            className="hidden absolute -top-16 left-10 sm:-top-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-radial from-azure-blue/20 to-transparent rounded-full blur-2xl z-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="hidden absolute -bottom-16 right-10 sm:-bottom-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-radial from-orange/20 to-transparent rounded-full blur-2xl z-0"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, -20, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="hidden absolute top-1/3 right-1/4 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-gradient-radial from-bright-blue/15 to-transparent rounded-full blur-xl z-0"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </div>
      </section>

      {/* Exclusive Pre-Launch Offer Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 mb-8 sm:mb-0 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {/* 3D Floating Objects Around Offer Box */}
          <motion.div
            className="absolute -top-16 right-0 sm:-top-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-azure-blue/25 rotate-45 z-0"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.15, 1],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-16 left-0 sm:-bottom-8 w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 bg-gradient-to-br from-orange/20 to-azure-blue/20 rounded-full z-0"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
          <motion.div
            className="absolute -top-12 right-1/3 sm:-top-5 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border border-light-blue/30 rotate-12 z-0"
            animate={{
              rotate: [12, 372],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -top-20 left-1/4 sm:-top-12 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-radial from-bright-blue/15 to-transparent rounded-full blur-xl z-0"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 25, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute -bottom-20 right-1/4 sm:-bottom-12 w-18 h-18 sm:w-22 sm:h-22 md:w-28 md:h-28 bg-gradient-radial from-orange/15 to-transparent rounded-full blur-xl z-0"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.25, 0.45, 0.25],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          
          <motion.div
            className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-visible bg-accent-blue/20 backdrop-blur-[30px] border border-light-blue/40 z-10"
            style={{
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 212, 255, 0.4), 0 0 100px rgba(255, 145, 77, 0.2)'
            }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full" style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}>
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
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  
                  // Redirect to Stripe Payment Link - no card details stored on our site
                  // All payment processing handled securely by Stripe
                  const paymentLink = 'https://buy.stripe.com/5kQ3cv79cfH3byHdO08k800'
                  
                  // Ensure redirect works (fallback for any edge cases)
                  try {
                    window.location.href = paymentLink
                  } catch (error) {
                    // Fallback: open in same window
                    window.location.assign(paymentLink)
                  }
                }}
                onMouseDown={(e) => e.preventDefault()}
                className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full cursor-pointer hover:shadow-glow transition-all duration-300 group w-full sm:w-auto min-h-[48px] touch-manipulation active:scale-95"
                style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
              >
                <span className="text-white font-semibold text-base sm:text-lg">Enroll Now - Secure Checkout</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
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
