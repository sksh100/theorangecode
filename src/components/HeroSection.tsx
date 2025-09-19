'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h2 
            className="hero-title font-playfair text-6xl font-bold mb-6 text-gradient-primary leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Something Extraordinary is Coming
          </motion.h2>
          
          <motion.p 
            className="hero-subtitle font-sofia text-xl text-text-secondary mb-8 font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Experience the future of luxury with AI-powered precision
          </motion.p>
          
          <motion.div 
            className="event-info mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="event-date inline-flex flex-col items-center gap-2 p-6 px-8 bg-bright-blue/10 border border-light-blue/30 rounded-2xl backdrop-blur-[10px]">
              <span className="date-label font-sofia text-sm text-text-muted uppercase tracking-wider font-medium">
                Exclusive Event
              </span>
              <span className="date-value font-sofia text-lg text-text-primary font-semibold">
                Thursday, October 9, 2025
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
