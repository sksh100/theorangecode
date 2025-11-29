'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Download } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface StickyCTABarProps {
  price: number
  currency: string
  paymentLink: string
  onCTAClick?: () => void
}

export function StickyCTABar({ price, currency, paymentLink, onCTAClick }: StickyCTABarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-primary-dark/95 backdrop-blur-lg border-t border-white/10 shadow-2xl"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="hidden sm:block">
                  <p className="text-white/70 text-sm">Get instant access:</p>
                  <p className="text-2xl font-bold text-white">
                    {currency === 'GBP' ? '£' : 'AED '}{price}
                  </p>
                </div>
                <div className="sm:hidden">
                  <p className="text-white font-bold text-lg">
                    {currency === 'GBP' ? '£' : 'AED '}{price}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-white/70 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Instant Download</span>
                </div>
              </div>
              <Link href={paymentLink} onClick={onCTAClick}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="hidden sm:inline">Buy Now</span>
                  <span className="sm:hidden">Buy</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

