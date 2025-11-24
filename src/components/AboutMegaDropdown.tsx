'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Users, Sparkles, Zap, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'

interface AboutCard {
  id: string
  title: string
  description: string
  icon: any
  href: string
}

interface AboutMegaDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutMegaDropdown({ isOpen, onClose }: AboutMegaDropdownProps) {
  const aboutSections: AboutCard[] = [
    {
      id: 'about-us',
      title: 'About Us',
      description: 'Learn about our mission, values, and the team behind The Orange Code',
      icon: Users,
      href: '/about'
    },
    {
      id: 'what-is-cq',
      title: 'What is Cultural Intelligence (CQ)',
      description: 'Discover the power of cultural intelligence and how it transforms your interactions',
      icon: Sparkles,
      href: '/what-is-cq'
    },
    {
      id: 'why-matters',
      title: 'WHY Cultural Intelligence Matters',
      description: 'Understand why cultural intelligence is essential for success in the GCC region',
      icon: Zap,
      href: '/why-cultural-intelligence'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed top-20 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          
          {/* Mega Dropdown */}
          <motion.div
            className="fixed top-20 left-4 right-4 w-auto max-w-4xl z-[55]"
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
                    <h3 className="text-2xl font-bold text-white mb-2">About</h3>
                    <p className="text-white/70 text-sm">Discover more about us and cultural intelligence</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                </div>

                {/* About Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {aboutSections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={section.href}
                        onClick={onClose}
                        className="block group"
                      >
                        <motion.div
                          className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-orange/50 transition-all duration-300 cursor-pointer overflow-hidden"
                          whileHover={{ scale: 1.02, y: -4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {/* Icon */}
                          <div className="mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                              <section.icon className="w-6 h-6 text-orange" />
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-orange transition-colors">
                            {section.title}
                          </h4>

                          {/* Description */}
                          <p className="text-white/70 text-sm mb-4 leading-relaxed">
                            {section.description}
                          </p>

                          {/* Arrow */}
                          <div className="flex items-center gap-2 text-orange group-hover:gap-3 transition-all">
                            <span className="text-sm font-semibold">Learn more</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>

                          {/* Hover gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-orange/0 to-azure-blue/0 group-hover:from-orange/10 group-hover:to-azure-blue/10 transition-all duration-300 pointer-events-none" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
