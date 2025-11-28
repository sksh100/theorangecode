'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Hero3DEffect } from './Hero3DEffect'

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="hero-section relative">
      <Hero3DEffect mousePosition={mousePosition} />
      <div className="hero-content hero-content-left">
        <motion.div 
          className="glass-card hero-glass-morphic"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p 
            className="text-sm uppercase tracking-[0.25em] text-orange-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            THE ORANGE CODE
          </motion.p>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Master Cultural Intelligence for the UAE and GCC
          </motion.h1>
          
          <motion.p 
            className="text-sm md:text-base text-slate-200 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Learn how communication, trust, and leadership actually work in a
            region where more than two hundred nationalities meet. Build the
            awareness that helps you connect with confidence and grow faster
            in the Gulf.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/home#book-session">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 text-sm md:text-base"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Start Your Transformation
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.p 
            className="mt-4 text-xs md:text-sm text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Understand people. Unlock opportunity in the UAE, the Gulf Region.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
