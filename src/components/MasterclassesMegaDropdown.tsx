'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Users, Zap, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { trackDropdownItemClick, trackButtonClick, trackMasterclassView } from '@/lib/analytics'

interface MasterclassCard {
  id: string
  title: string
  description: string
  icon: any
  price: string
  gradient: string
}

interface MasterclassesMegaDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function MasterclassesMegaDropdown({ isOpen, onClose }: MasterclassesMegaDropdownProps) {
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => {
        onClose()
      }
      window.addEventListener('scroll', handleScroll, true)
      return () => {
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [isOpen, onClose])
  const masterclasses: MasterclassCard[] = [
    {
      id: 'uae-foundations',
      title: 'UAE Cultural Foundations',
      description: 'Step into your full potential with a masterclass that refines how you think, speak, move, and lead.',
      icon: Sparkles,
      price: '699 د.إ',
      gradient: 'from-orange/20 to-bright-blue/20'
    },
    {
      id: 'expats',
      title: 'Cultural Intelligence For Expats',
      description: 'Belong socially and culturally in the Emirates. Learn Islamic etiquette, modesty codes, and hospitality rituals.',
      icon: Users,
      price: '1799 د.إ',
      gradient: 'from-bright-blue/20 to-light-blue/20'
    },
    {
      id: 'business',
      title: 'Cultural Intelligence In Business',
      description: 'Unlock the unspoken rules of GCC business culture. From trust-building to negotiation rhythms.',
      icon: Zap,
      price: '2499 د.إ',
      gradient: 'from-light-blue/20 to-orange/20'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed top-20 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          
          {/* Mega Dropdown */}
          <motion.div
            className="fixed top-20 left-4 right-4 w-auto max-w-6xl z-[55]"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mega-dropdown-glass rounded-3xl overflow-hidden border border-white/10">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Our Masterclasses</h3>
                    <p className="text-white/70 text-sm">Choose the perfect masterclass for your journey</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                </div>

                {/* Masterclass Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {masterclasses.map((masterclass, index) => (
                    <motion.div
                      key={masterclass.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href="/masterclasses"
                        onClick={() => {
                          trackMasterclassView(masterclass.title, masterclass.id)
                          trackDropdownItemClick('Masterclasses', masterclass.title, '/masterclasses')
                          onClose()
                        }}
                        className="block group"
                      >
                        <motion.div
                          className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${masterclass.gradient} border border-white/10 hover:border-orange/50 transition-all duration-300 cursor-pointer overflow-hidden`}
                          whileHover={{ scale: 1.02, y: -4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {/* Icon */}
                          <div className="mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                              <masterclass.icon className="w-6 h-6 text-orange" />
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-orange transition-colors">
                            {masterclass.title}
                          </h4>

                          {/* Description */}
                          <p className="text-white/70 text-sm mb-4 leading-relaxed line-clamp-3">
                            {masterclass.description}
                          </p>

                          {/* Price */}
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                            <div>
                              <p className="text-2xl font-bold text-orange">{masterclass.price}</p>
                              <p className="text-white/50 text-xs">per person</p>
                            </div>
                            <motion.div
                              className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center group-hover:bg-orange transition-colors"
                              whileHover={{ scale: 1.1 }}
                            >
                              <ArrowRight className="w-5 h-5 text-orange" />
                            </motion.div>
                          </div>

                          {/* Hover gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-orange/0 to-azure-blue/0 group-hover:from-orange/10 group-hover:to-azure-blue/10 transition-all duration-300 pointer-events-none" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/masterclasses"
                    onClick={() => {
                      trackButtonClick('Start Your Cultural Intelligence Journey Now', 'Masterclasses Dropdown')
                      onClose()
                    }}
                    className="block"
                  >
                    <motion.button
                      className="w-full cta-button-glow py-4 px-6 rounded-xl text-white font-bold text-center flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Start Your Cultural Intelligence Journey Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

