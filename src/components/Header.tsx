'use client'

import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header 
      className="header py-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="logo">
        <motion.h1 
          className="font-playfair text-4xl font-bold text-gradient-primary mb-2 tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Luxury Agent
        </motion.h1>
        <motion.span 
          className="font-sofia text-base text-text-muted font-normal tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          www.yourluxuryagent.ai
        </motion.span>
      </div>
    </motion.header>
  )
}
