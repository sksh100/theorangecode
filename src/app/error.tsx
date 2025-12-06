'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    
    // Send error notification to Slack
    fetch('/api/report-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(err => {
      console.error('Failed to report error to Slack:', err)
    })
  }, [error])

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
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="w-24 h-24 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange/20 via-azure-blue/20 to-bright-blue/20 rounded-full blur-xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-orange/30 via-azure-blue/30 to-bright-blue/30 rounded-full flex items-center justify-center border-2 border-orange/40">
                <AlertTriangle className="w-12 h-12 text-orange" />
              </div>
            </motion.div>

            {/* Error Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange via-azure-blue to-bright-blue bg-clip-text text-transparent"
            >
              Something went wrong
            </motion.h1>

            {/* Error Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 text-lg mb-8 max-w-md mx-auto"
            >
              We encountered an unexpected error. Don't worry, our team has been notified and we're working on it.
            </motion.p>

            {/* Error Details (Collapsible) */}
            {process.env.NODE_ENV === 'development' && error.message && (
              <motion.details
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8 text-left"
              >
                <summary className="cursor-pointer text-white/60 hover:text-white/80 transition-colors text-sm mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <p className="text-red-400 text-sm font-mono break-all mb-2">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-white/50 text-xs font-mono">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>
              </motion.details>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-glow flex items-center gap-2"
                style={{
                  background: 'linear-gradient(to right, #ff914d 0%, #00d4ff 50%, #0099ff 100%)',
                }}
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </motion.button>
              
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl text-white/90 hover:text-white font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 flex items-center gap-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

