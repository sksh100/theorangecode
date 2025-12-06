'use client'

import { motion } from 'framer-motion'
import { FileQuestion, Home, ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary-dark text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 145, 77, 0.1) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 153, 255, 0.1) 100%)',
          }}
          animate={{
            background: [
              'linear-gradient(135deg, rgba(255, 145, 77, 0.1) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 153, 255, 0.1) 100%)',
              'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 153, 255, 0.1) 50%, rgba(255, 145, 77, 0.1) 100%)',
              'linear-gradient(135deg, rgba(0, 153, 255, 0.1) 0%, rgba(255, 145, 77, 0.1) 50%, rgba(0, 212, 255, 0.1) 100%)',
              'linear-gradient(135deg, rgba(255, 145, 77, 0.1) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 153, 255, 0.1) 100%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 145, 77, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          <div className="glass-card text-center">
            {/* 404 Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="mb-6"
            >
              <div className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-orange via-azure-blue to-bright-blue bg-clip-text text-transparent">
                404
              </div>
              <div className="w-24 h-24 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange/20 via-azure-blue/20 to-bright-blue/20 rounded-full blur-xl" />
                <div className="relative w-full h-full bg-gradient-to-br from-orange/30 via-azure-blue/30 to-bright-blue/30 rounded-full flex items-center justify-center border-2 border-azure-blue/40">
                  <FileQuestion className="w-12 h-12 text-azure-blue" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              Page Not Found
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 text-lg mb-8 max-w-md mx-auto"
            >
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-glow flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(to right, #ff914d 0%, #00d4ff 50%, #0099ff 100%)',
                  }}
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </motion.button>
              </Link>
              
              <motion.button
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl text-white/90 hover:text-white font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 flex items-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </motion.button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-white/60 text-sm mb-4">Popular Pages:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/masterclasses"
                  className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Masterclasses
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm"
                >
                  About Us
                </Link>
                <Link
                  href="/uk-to-uae-relocation"
                  className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm"
                >
                  Relocation Guide
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

