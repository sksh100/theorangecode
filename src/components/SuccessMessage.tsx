'use client'

import { motion } from 'framer-motion'

export function SuccessMessage() {
  return (
    <motion.div 
      className="success-message"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="success-icon"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <svg 
          className="w-8 h-8 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </motion.div>
      
      <motion.h4 
        className="font-sofia text-2xl mb-2 text-text-primary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Thank You!
      </motion.h4>
      
      <motion.p 
        className="font-inter text-text-secondary text-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Your interest has been registered. We'll be in touch soon with exclusive updates.
      </motion.p>
    </motion.div>
  )
}
