'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'

export function FinalCTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-azure-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange/20 to-azure-blue/20 border border-orange/40 rounded-full mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8, y: -20, rotateX: -90 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-orange" />
            </motion.div>
            <span className="text-white font-semibold text-sm uppercase tracking-wider">
              Ready to Transform?
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-5 h-5 text-azure-blue" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            Start Your Cultural Intelligence{' '}
            <motion.span 
              className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.7,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              viewport={{ once: true }}
            >
              Journey Today
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-white/80 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.9,
              delay: 0.7,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            Join professionals who have transformed their communication, built authentic relationships, and achieved remarkable success in the UAE and GCC region.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.9,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            {/* Primary CTA */}
            <Link href="/home#book-session">
              <motion.button
                className="cta-button-glow px-10 py-5 rounded-xl font-bold text-lg md:text-xl text-white relative overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 145, 77, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Book Your Session Now
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange via-orange-luminous to-orange"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link href="/masterclasses">
              <motion.button
                className="hero-cta-secondary-glass px-10 py-5 rounded-xl font-bold text-lg md:text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Explore Masterclasses
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <span className="text-orange">✓</span>
              <span>Trusted by 500+ Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-azure-blue">✓</span>
              <span>4-Week Transformation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange">✓</span>
              <span>Expert-Led Training</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

