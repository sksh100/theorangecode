'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Users, Target, Award, Globe, Heart, ArrowRight, Star, Crown, X } from 'lucide-react'

interface AboutCard {
  id: string
  title: string
  description: string
  icon: any
  features: string[]
  badge?: string
}

interface AboutMegaDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutMegaDropdown({ isOpen, onClose }: AboutMegaDropdownProps) {
  const aboutSections: AboutCard[] = [
    {
      id: 'our-story',
      title: 'Our Story',
      description: 'Discover how we revolutionized luxury with AI technology',
      icon: Sparkles,
      features: ['Founded in 2024', 'AI Innovation Leader', 'Global Luxury Network'],
      badge: 'Featured'
    },
    {
      id: 'team',
      title: 'Our Team',
      description: 'Meet the experts behind your luxury experience',
      icon: Users,
      features: ['AI Specialists', 'Luxury Consultants', '24/7 Support Team'],
      badge: 'Expert'
    },
    {
      id: 'mission',
      title: 'Our Mission',
      description: 'Redefining luxury through intelligent automation',
      icon: Target,
      features: ['AI-Powered Precision', 'Unmatched Service', 'Global Reach'],
      badge: 'Vision'
    }
  ]

  const quickLinks = [
    { label: 'Company Values', href: '#values', icon: Heart },
    { label: 'Awards & Recognition', href: '#awards', icon: Award },
    { label: 'Global Presence', href: '#global', icon: Globe },
    { label: 'Careers', href: '#careers', icon: Users },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - positioned below navbar */}
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
            className="fixed top-20 left-4 right-4 w-auto max-w-6xl z-[55]"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="mega-dropdown-glass rounded-3xl overflow-hidden shadow-glow-luminous">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white font-montserrat mb-2">
                      About Us
                    </h2>
                    <p className="text-azure-blue/80 font-montserrat">
                      Discover our story and mission
                    </p>
                  </div>
                  <motion.button
                    className="p-2 text-white/60 hover:text-white transition-colors duration-300"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* About Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {aboutSections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      className="service-card group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Badge */}
                      {section.badge && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            section.badge === 'Featured' ? 'badge-gradient-primary text-white' :
                            section.badge === 'Expert' ? 'badge-azure text-primary-dark' :
                            'badge-orange text-white'
                          }`}>
                            {section.badge}
                          </span>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="relative h-32 bg-gradient-to-br from-azure-blue/20 to-orange/20 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/30 to-orange/30" />
                        <section.icon className="w-12 h-12 text-white/80 relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-white font-montserrat mb-2 group-hover:text-azure-blue transition-colors duration-300">
                          {section.title}
                        </h3>
                        <p className="text-white/70 text-sm font-montserrat mb-4 leading-relaxed">
                          {section.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2 mb-4">
                          {section.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-azure-blue rounded-full" />
                              <span className="text-white/60 text-xs font-montserrat">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Learn More */}
                        <motion.div
                          className="flex items-center space-x-1 text-azure-blue group-hover:text-azure-luminous transition-colors duration-300"
                          whileHover={{ x: 4 }}
                        >
                          <span className="text-sm font-montserrat font-medium">Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="border-t border-glass-border pt-6">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-6">
                      {quickLinks.map((link, index) => (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300 group"
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <link.icon className="w-4 h-4 text-azure-blue group-hover:text-azure-luminous transition-colors duration-300" />
                          <span className="font-montserrat font-medium">{link.label}</span>
                        </motion.a>
                      ))}
                    </div>
                    
                    <motion.button
                      className="px-6 py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      View Full Story
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
