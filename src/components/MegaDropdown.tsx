'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap, Shield, Users, Settings, LogOut, ArrowRight, Star, Crown, Globe, Lock, X } from 'lucide-react'

interface ServiceCard {
  id: string
  title: string
  description: string
  icon: any
  image: string
  features: string[]
  price: string
  badge?: string
}

interface MegaDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function MegaDropdown({ isOpen, onClose }: MegaDropdownProps) {
  const services: ServiceCard[] = [
    {
      id: 'ai-concierge',
      title: 'AI Concierge',
      description: 'Your personal AI assistant for luxury lifestyle management',
      icon: Sparkles,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMzAwIiB5Mj0iMjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMGRkZmYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5MTQ5Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+',
      features: ['24/7 Availability', 'Personalized Recommendations', 'Multi-language Support'],
      price: 'From $299/month',
      badge: 'Most Popular'
    },
    {
      id: 'luxury-travel',
      title: 'Luxury Travel',
      description: 'Curated travel experiences with exclusive access',
      icon: Globe,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMzAwIiB5Mj0iMjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMGRkZmYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5MTQ5Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+',
      features: ['Private Jets', '5-Star Hotels', 'Exclusive Experiences'],
      price: 'From $1,999/trip',
      badge: 'Premium'
    },
    {
      id: 'personal-assistant',
      title: 'Personal Assistant',
      description: 'Dedicated human-AI hybrid assistance for your needs',
      icon: Users,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMzAwIiB5Mj0iMjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMGRkZmYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5MTQ5Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+',
      features: ['Dedicated Agent', 'Task Management', 'Priority Support'],
      price: 'From $499/month',
      badge: 'Exclusive'
    },
    {
      id: 'security-privacy',
      title: 'Security & Privacy',
      description: 'Military-grade security for your digital lifestyle',
      icon: Shield,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMzAwIiB5Mj0iMjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMGRkZmYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5MTQ5Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+',
      features: ['End-to-End Encryption', 'Privacy Protection', 'Secure Communication'],
      price: 'From $199/month',
      badge: 'Essential'
    }
  ]

  const quickLinks = [
    { label: 'How It Works', href: '#how-it-works', icon: Settings },
    { label: 'Success Stories', href: '#success-stories', icon: Star },
    { label: 'VIP Membership', href: '#vip-membership', icon: Crown },
    { label: 'Support Center', href: '#support', icon: Users },
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
                      Premium Services
                    </h2>
                    <p className="text-azure-blue/80 font-montserrat">
                      Choose your luxury experience
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

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      className="service-card group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Badge */}
                      {service.badge && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            service.badge === 'Most Popular' ? 'bg-gradient-primary text-white' :
                            service.badge === 'Premium' ? 'bg-azure-blue text-primary-dark' :
                            service.badge === 'Exclusive' ? 'bg-orange text-white' :
                            'bg-bright-blue text-white'
                          }`}>
                            {service.badge}
                          </span>
                        </div>
                      )}

                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-br from-azure-blue/20 to-orange/20 rounded-2xl mb-4 overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/30 to-orange/30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <service.icon className="w-16 h-16 text-white/80" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-white font-montserrat mb-2 group-hover:text-azure-blue transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-white/70 text-sm font-montserrat mb-4 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2 mb-4">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-azure-blue rounded-full" />
                              <span className="text-white/60 text-xs font-montserrat">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <span className="text-azure-blue font-bold font-montserrat">
                            {service.price}
                          </span>
                          <motion.div
                            className="flex items-center space-x-1 text-azure-blue group-hover:text-azure-luminous transition-colors duration-300"
                            whileHover={{ x: 4 }}
                          >
                            <span className="text-sm font-montserrat font-medium">Learn More</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>
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
                      View All Services
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
