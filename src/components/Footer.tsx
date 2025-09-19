'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer 
      className="footer py-8 text-center border-t border-light-blue/10 mt-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="footer-content">
        <motion.p 
          className="font-inter text-text-muted text-sm mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          &copy; 2025 Your Luxury Agent. All rights reserved.
        </motion.p>
        <motion.p 
          className="font-inter text-text-muted text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Powered by cutting-edge AI technology
        </motion.p>
      </div>
    </motion.footer>
  )
}
