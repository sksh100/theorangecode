'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { InterestForm } from './InterestForm'
import { SuccessMessage } from './SuccessMessage'

export function FormSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFormSubmit = () => {
    setIsSubmitted(true)
  }

  return (
        <section className="form-section py-16 bg-primary-dark flex justify-center items-center min-h-screen relative">
      <div className="container max-w-lg w-full">
        <motion.div 
          className="glass-card form-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h3 
            className="form-title font-sofia text-3xl font-semibold mb-2 text-center text-gradient-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Register Your Interest
          </motion.h3>
          
          <motion.p 
            className="form-subtitle font-sofia text-text-secondary text-center mb-8 text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Be among the first to experience luxury redefined
          </motion.p>
          
          {!isSubmitted ? (
            <InterestForm onSuccess={handleFormSubmit} />
          ) : (
            <SuccessMessage />
          )}
        </motion.div>
      </div>
    </section>
  )
}
