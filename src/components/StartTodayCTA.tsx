'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function StartTodayCTA() {

  return (
    <motion.section
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Cultural Intelligence Network Background - CSS based */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Floating nodes representing different cultures */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 15 + (i % 3) * 5
          const colors = ['from-orange/20', 'from-azure-blue/20', 'from-bright-blue/20']
          const color = colors[i % colors.length]
          
          return (
            <motion.div
              key={i}
              className={`absolute w-16 h-16 bg-gradient-radial ${color} to-transparent rounded-full blur-xl`}
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius * 4}%)`,
                top: `calc(50% + ${Math.sin(angle) * radius * 3}%)`,
              }}
              animate={{
                y: [0, -20, 20, 0],
                x: [0, 10, -10, 0],
                scale: [1, 1.2, 0.9, 1],
                opacity: [0.3, 0.6, 0.4, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          )
        })}
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary-dark via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Start{' '}
            <motion.span
              className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
            >
              Today
            </motion.span>
          </motion.h2>

          {/* CTA Text */}
          <motion.div
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p>
              Step into the UAE with clarity instead of guesswork.
            </p>
            <p>
              When you understand the culture, everything changes. Conversations flow, opportunities open, and you carry yourself with a confidence people feel immediately.
            </p>
            <p>
              Most people rely on trial and error. The ones who excel choose to learn the unwritten rules, refine their presence, and move with intention.
            </p>
            <p>
              If you want your life, career, or business in the UAE to feel aligned, respected, and effortless, the first step begins here.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/masterclasses">
              <motion.button
                className="group relative inline-flex items-center gap-3 px-8 py-4 cta-button-glow text-white font-semibold text-lg rounded-xl overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 145, 77, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <span className="relative z-10">Begin Your Transformation</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

