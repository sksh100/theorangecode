'use client'

import { motion } from 'framer-motion'
import { Crown, Shield, Globe, Zap, Star, Award, Users, Clock } from 'lucide-react'

interface USPPillar {
  id: string
  title: string
  subtitle: string
  icon: any
  gradient: string
  delay: number
}

export function USPBar() {
  const pillars: USPPillar[] = [
    {
      id: 'knowledge',
      title: 'Refined Knowledge',
      subtitle: 'Emirati Customs & Protocols',
      icon: Crown,
      gradient: 'from-orange to-orange-luminous',
      delay: 0
    },
    {
      id: 'certified',
      title: 'Certified by',
      subtitle: 'Washington School of Protocol',
      icon: Award,
      gradient: 'from-azure-blue to-azure-luminous',
      delay: 0.2
    },
    {
      id: 'trusted',
      title: 'Trusted by',
      subtitle: 'Embassies & Global Entrepreneurs',
      icon: Shield,
      gradient: 'from-bright-blue to-blue-luminous',
      delay: 0.4
    },
    {
      id: 'transformation',
      title: 'Fast-Track Transformation',
      subtitle: 'in 4 Weeks',
      icon: Zap,
      gradient: 'from-orange to-azure-blue',
      delay: 0.6
    }
  ]

  return (
        <section className="relative py-20 bg-primary-dark overflow-hidden section-separator advanced-bg-pattern">
      {/* Floating Geometric Shapes - State of Art */}
      <div className="floating-geometry top-10 right-10 w-20 h-20 rotate-45" style={{ animationDelay: '1s' }} />
      <div className="floating-geometry bottom-20 left-10 w-16 h-16 rounded-full" style={{ animationDelay: '3s' }} />
      <div className="floating-geometry top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-azure-blue/10 to-orange/10 rotate-12" style={{ animationDelay: '5s' }} />
      <div className="floating-geometry top-1/2 left-1/3 w-8 h-8 rotate-45" style={{ animationDelay: '7s' }} />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-azure-blue/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />
        
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-radial from-azure-blue/20 to-transparent rounded-full blur-xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-radial from-orange/20 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-radial from-bright-blue/20 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-azure-blue-transparent border border-azure-blue/30 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4 text-azure-blue" />
            <span className="text-azure-blue font-montserrat font-semibold text-sm uppercase tracking-wider">
              Our Excellence
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white font-montserrat mb-4">
            Why Choose{' '}
            <span className="text-gradient-primary bg-gradient-primary bg-clip-text text-transparent">
              Your Luxury Agent
            </span>
          </h2>
          <p className="text-white/70 text-lg font-montserrat max-w-2xl mx-auto">
            Four pillars of excellence that set us apart in the luxury service industry
          </p>
        </motion.div>

        {/* USP Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: pillar.delay }}
              viewport={{ once: true }}
            >
              {/* Card */}
              <div className="relative h-full p-8 bg-primary-dark/80 backdrop-blur-[20px] border border-glass-border rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-azure-blue/50 group-hover:shadow-glow-azure">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Top Border Glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${pillar.gradient} rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500`}>
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Floating Particles */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-azure-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-white font-montserrat mb-2 group-hover:text-azure-blue transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-white/70 font-montserrat leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-azure-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Connection Line (for desktop) */}
              {index < pillars.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-azure-blue/50 to-transparent transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center space-x-3 px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-2xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span>Experience Excellence</span>
            <Zap className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
