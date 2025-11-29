'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Percent } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ExitIntentPopupProps {
  paymentLink: string
  onCTAClick?: () => void
  onClose?: () => void
}

export function ExitIntentPopup({ paymentLink, onCTAClick, onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup was already shown in this session
    if (typeof window !== 'undefined') {
      const shown = sessionStorage.getItem('exitIntentShown')
      if (shown === 'true') {
        setHasShown(true)
        return
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('exitIntentShown', 'true')
        }
      }
    }

    window.addEventListener('mouseleave', handleMouseLeave)
    return () => window.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-md bg-primary-dark/95 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 bg-gradient-to-br from-orange to-azure-blue rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Percent className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Wait! Don't Leave Empty-Handed
                </h3>
                <p className="text-white/80 mb-6">
                  Get <strong className="text-orange">20% off</strong> your UK to UAE Cultural Intelligence Guide today!
                </p>

                <div className="bg-orange/10 border border-orange/30 rounded-lg p-4 mb-6">
                  <p className="text-white text-sm">
                    Use code: <span className="font-bold text-orange">UKUAE20</span>
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Valid for the next 24 hours only
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={paymentLink} onClick={onCTAClick} className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Get My Guide Now
                    </motion.button>
                  </Link>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 nav-button-glass text-white/90 hover:text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                  >
                    Maybe Later
                  </button>
                </div>

                <p className="text-white/50 text-xs mt-4">
                  Instant download • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

