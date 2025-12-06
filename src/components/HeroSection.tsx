'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Animation variants matching the relocation page
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden h-screen">
      {/* Wrapper that fills viewport */}
      <div className="h-full flex items-center">
        {/* Optional soft gradient overlay on top of your existing background */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange/5 via-transparent to-azure-blue/5 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "visible"}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Small label / tagline */}
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center mb-6">
              <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-white/80">
                THE ORANGE CODE
              </span>
            </motion.div>

            {/* Main headline in two clean lines */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight lg:leading-[1.05]"
            >
              <span className="block bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent lg:whitespace-nowrap">
                Master Cultural Intelligence for the UAE and GCC
              </span>
              <span className="block text-white mt-2 lg:whitespace-nowrap">
                Build awareness that helps you connect with confidence
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Learn how communication, trust, and leadership actually work in a region where more than two hundred nationalities meet. Build the awareness that helps you connect with confidence and grow faster in the Gulf.
            </motion.p>

            {/* Primary and secondary CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                >
                  Start Your Transformation
                </motion.button>
              </Link>
              <Link href="/masterclasses">
                <button className="px-8 py-4 nav-button-glass text-white/90 hover:text-white font-semibold font-montserrat rounded-xl transition-all duration-300">
                  Explore masterclasses
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
