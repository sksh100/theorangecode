'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Send, Crown } from 'lucide-react'
import Link from 'next/link'

interface ModernFooterProps {
  hideQuickLinks?: boolean
  hideLegalLinks?: boolean
}

export function ModernFooter({ hideQuickLinks = false, hideLegalLinks = false }: ModernFooterProps = {}) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Minimal Pinterest SVG icon to avoid dependency/version issues
  const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.25 2 11.58c0 3.74 2.33 6.96 5.64 8.1-.08-.69-.15-1.75.03-2.51.16-.69 1.06-4.42 1.06-4.42s-.27-.53-.27-1.31c0-1.23.71-2.14 1.6-2.14.75 0 1.11.57 1.11 1.26 0 .77-.49 1.92-.74 2.99-.21.88.44 1.6 1.31 1.6 1.58 0 2.8-1.67 2.8-4.08 0-2.13-1.53-3.63-3.71-3.63-2.53 0-4.02 1.9-4.02 3.86 0 .77.3 1.6.68 2.06.07.09.08.17.06.26-.07.28-.22.88-.25 1.01-.04.16-.13.19-.31.11-1.16-.54-1.89-2.23-1.89-3.59 0-2.92 2.12-5.6 6.12-5.6 3.21 0 5.71 2.29 5.71 5.36 0 3.2-2.02 5.77-4.83 5.77-0.94 0-1.83-.49-2.13-1.07l-.58 2.21c-.21.81-.78 1.82-1.16 2.44.87.27 1.79.42 2.74.42 5.52 0 10-4.25 10-9.58C22 6.25 17.52 2 12 2z" />
    </svg>
  )

  const handleSubscribe = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    // Prevent double submission
    if (isSubmitting) {
      return
    }
    
    const emailTrimmed = email.trim()
    
    // Clear any previous messages
    setMessage(null)
    
    if (!emailTrimmed) {
      setMessage({ type: 'error', text: 'Please enter your email address' })
      return
    }
    
    if (!emailTrimmed.includes('@') || !emailTrimmed.includes('.')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailTrimmed,
          name: '',
          phone: '',
          timestamp: new Date().toISOString(),
          source: 'Footer Newsletter Subscription'
        })
      })

      const data = await response.json().catch(() => ({ error: 'Failed to parse response' }))

      if (!response.ok) {
        console.error('Subscription API error:', data)
        setMessage({ type: 'error', text: data?.error || `Error (${response.status}). Please try again.` })
        setIsSubmitting(false)
        return
      }

      if (data.success) {
        setIsSubscribed(true)
        setEmail('')
        setMessage({ type: 'success', text: data.mailerliteSuccess ? 'Thank you for subscribing! You are added to our list.' : 'Thank you for subscribing! (We will add you shortly.)' })
        setIsSubmitting(false)
      } else {
        setMessage({ type: 'error', text: data?.error || 'Something went wrong. Please try again.' })
        setIsSubmitting(false)
      }
    } catch (error: any) {
      console.error('Subscription error:', error)
      setMessage({ type: 'error', text: `Network error: ${error.message || 'Please check your connection and try again.'}` })
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/the.orangecode/?next=%2F', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com/TheOrangeCode', label: 'Twitter' },
    { icon: PinterestIcon, href: 'https://www.pinterest.com/theorangecode/?actingBusinessId=939141465953854064', label: 'Pinterest' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/the-orange-code-070849395/', label: 'LinkedIn' }
  ]

  return (
    <footer className="relative z-[9999] bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark border-t border-white/10" style={{ pointerEvents: 'auto' }}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern-animated" />
        </div>
        <motion.div 
          className="absolute w-32 h-32 bg-gradient-radial from-orange/10 to-transparent top-1/4 left-1/4 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 mt-8 sm:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8">
            
            {/* Company Info - Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 relative">
                  <Image 
                    src="/coming-soon/logo-1.png" 
                    alt="The Orange Code Logo" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">The Orange Code</h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm">
                Bridging people, cultures and intelligence.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-white/70 hover:text-orange hover:border-orange/30 hover:bg-orange/10 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(255, 145, 77, 0.2)"
                    }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Information - Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6 tracking-tight">Contact Us</h4>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-azure-blue/15 to-azure-blue/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-azure-blue/20">
                    <Mail className="w-4 h-4 text-azure-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:hello@theorangecode.com" className="text-white text-sm hover:text-orange transition-colors break-all">
                      hello@theorangecode.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange/15 to-orange/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-orange/20">
                    <Phone className="w-4 h-4 text-orange" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+971568786106" className="text-white text-sm hover:text-orange transition-colors">
                      +971 56 878 6106
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-bright-blue/15 to-bright-blue/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-bright-blue/20">
                    <MapPin className="w-4 h-4 text-bright-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Location</p>
                    <p className="text-white text-sm leading-relaxed">
                      Etihad Towers<br />
                      Tower 3, Floor 36,<br />
                      Abu Dhabi,<br />
                      United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links - Column 3 */}
            {!hideQuickLinks && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6 tracking-tight">Quick Links</h4>
              <div className="space-y-3">
                <a href="#about" className="block text-white/70 text-sm hover:text-orange transition-colors">
                  About Us
                </a>
                <a href="#why-cultural-intelligence" className="block text-white/70 text-sm hover:text-orange transition-colors">
                  Why Cultural Intelligence Matters
                </a>
                <a href="/masterclasses" className="block text-white/70 text-sm hover:text-orange transition-colors">
                  Masterclasses
                </a>
                <Link href="/preview#contact" className="block text-white/70 text-sm hover:text-orange transition-colors">
                  Contact
                </Link>
                <Link href="/faq" className="block text-white/70 text-sm hover:text-orange transition-colors">
                  FAQ
                </Link>
              </div>
            </motion.div>
            )}

            {/* Newsletter Subscription - Column 4 (Last Column) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative z-10 pb-8"
            >
              <h4 className="text-lg font-semibold text-white mb-6 tracking-tight">Stay Connected</h4>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                Subscribe to our newsletter for exclusive insights and cultural intelligence updates.
              </p>
              
              {!isSubscribed ? (
                <form 
                  onSubmit={handleSubscribe} 
                  className="space-y-3 relative z-10"
                  noValidate
                  onInvalid={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-orange/50 focus:bg-white/10 transition-all duration-300"
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                  </div>
                  {message && (
                    <div className={`p-2 rounded-lg text-xs ${
                      message.type === 'success' 
                        ? 'bg-azure-blue/20 text-azure-blue border border-azure-blue/40' 
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {message.text}
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    aria-label="Subscribe to our newsletter"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-orange/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                    style={{ 
                      background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)',
                      zIndex: 9999,
                      position: 'relative',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                    whileHover={{ scale: isSubmitting || !email.trim() ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting || !email.trim() ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-gradient-to-r from-orange/20 to-bright-blue/20 border border-orange/30 rounded-lg text-center"
                >
                  <p className="text-white font-semibold text-sm">Thank you for subscribing!</p>
                  <p className="text-white/70 text-xs mt-1">You'll receive our latest updates soon.</p>
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-white/50 text-xs"
              >
                © 2025 The Orange Code. All rights reserved.
              </motion.p>
              
              {!hideLegalLinks && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                <Link 
                  href="/terms-conditions" 
                    className="text-white/50 hover:text-orange transition-colors text-xs"
                >
                  Terms & Conditions
                </Link>
                <Link 
                  href="/privacy-policy" 
                    className="text-white/50 hover:text-orange transition-colors text-xs"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/cookie-policy" 
                    className="text-white/50 hover:text-orange transition-colors text-xs"
                >
                  Cookie Policy
                </Link>
              </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
