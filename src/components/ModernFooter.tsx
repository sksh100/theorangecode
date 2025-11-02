'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Twitter, Facebook, Linkedin, Mail, Phone, MapPin, Send, Crown } from 'lucide-react'
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
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
        setMessage({ type: 'success', text: 'Thank you for subscribing!' })
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
    { icon: Facebook, href: 'https://facebook.com/theorangecode', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com/company/theorangecode', label: 'LinkedIn' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark border-t border-white/10">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            
            {/* Company Info - Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
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
                Bridging minds, cultures & intelligence.
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

            {/* Contact Information - Middle Column */}
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
                    <p className="text-white text-sm">Abu Dhabi, UAE</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Newsletter Subscription - Right Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h4 className="text-lg font-semibold text-white mb-6 tracking-tight">Stay Connected</h4>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                Subscribe to our newsletter for exclusive insights and cultural intelligence updates.
              </p>
              
              {!isSubscribed ? (
                <form 
                  onSubmit={handleSubscribe} 
                  className="space-y-3"
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
                    disabled={isSubmitting}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange to-bright-blue rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-orange/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                    <Send className="w-4 h-4" />
                    Subscribe
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

            {/* Quick Links - Additional Column when not hidden */}
            {!hideQuickLinks && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
                className="md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2"
            >
                <h4 className="text-lg font-semibold text-white mb-6 tracking-tight">Quick Links</h4>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                  <a href="#programs" className="text-white/70 text-sm hover:text-orange transition-colors">
                  Programs
                </a>
                  <a href="#about" className="text-white/70 text-sm hover:text-orange transition-colors">
                  About Us
                </a>
                  <a href="#services" className="text-white/70 text-sm hover:text-orange transition-colors">
                  Services
                </a>
                  <a href="#contact" className="text-white/70 text-sm hover:text-orange transition-colors">
                  Contact
                </a>
                  <Link href="/faq" className="text-white/70 text-sm hover:text-orange transition-colors">
                  FAQ
                </Link>
              </div>
            </motion.div>
            )}
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
              </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
