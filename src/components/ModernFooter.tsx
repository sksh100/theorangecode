'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Facebook, Linkedin, Mail, Phone, MapPin, Send, Crown } from 'lucide-react'

export function ModernFooter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Here you would typically send the email to your backend
      console.log('Subscribed:', email)
    }
  }

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/yourluxuryagent', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/yourluxuryagent', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/yourluxuryagent', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com/company/yourluxuryagent', label: 'LinkedIn' }
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
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange to-bright-blue rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Your Luxury Agent</h3>
              </div>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Transforming cultural barriers into bridges of trust through refined knowledge and authentic presence.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:text-orange transition-all duration-300 hover:border-orange/50 hover:scale-110"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(255, 145, 77, 0.3)"
                    }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-azure-blue/20 to-azure-blue/5 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-azure-blue" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Email</p>
                    <a href="mailto:info@yourluxuryagent.com" className="text-white hover:text-orange transition-colors">
                      info@yourluxuryagent.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange/20 to-orange/5 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Phone</p>
                    <a href="tel:+971501234567" className="text-white hover:text-orange transition-colors">
                      +971 50 123 4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-bright-blue/20 to-bright-blue/5 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-bright-blue" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Location</p>
                    <p className="text-white">Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Newsletter Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-6">Stay Connected</h4>
              <p className="text-white/70 mb-6">
                Subscribe to our newsletter for exclusive insights and cultural intelligence updates.
              </p>
              
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange/50 transition-colors"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange to-bright-blue rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-4 h-4" />
                    Subscribe
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-gradient-to-r from-orange/20 to-bright-blue/20 border border-orange/30 rounded-xl text-center"
                >
                  <p className="text-white font-semibold">Thank you for subscribing!</p>
                  <p className="text-white/70 text-sm">You'll receive our latest updates soon.</p>
                </motion.div>
              )}
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <div className="space-y-3">
                <a href="#programs" className="block text-white/70 hover:text-orange transition-colors">
                  Programs
                </a>
                <a href="#about" className="block text-white/70 hover:text-orange transition-colors">
                  About Us
                </a>
                <a href="#services" className="block text-white/70 hover:text-orange transition-colors">
                  Services
                </a>
                <a href="#contact" className="block text-white/70 hover:text-orange transition-colors">
                  Contact
                </a>
              </div>
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
                className="text-white/60 text-sm"
              >
                © 2024 Your Luxury Agent. All rights reserved.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                <a 
                  href="/terms-conditions" 
                  className="text-white/60 hover:text-orange transition-colors text-sm"
                >
                  Terms & Conditions
                </a>
                <a 
                  href="/privacy-policy" 
                  className="text-white/60 hover:text-orange transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
