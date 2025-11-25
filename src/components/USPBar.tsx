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
      title: 'Authentic Regional Insight',
      subtitle: 'Receive clear guidance on Emirati culture, Gulf etiquette, and the subtle expectations that shape daily interactions. Our approach makes the region's social codes easy to understand and apply.',
      icon: Crown,
      gradient: 'from-orange via-azure-blue to-orange',
      delay: 0
    },
    {
      id: 'certified',
      title: 'Practical Behavioural Transformation',
      subtitle: 'We focus on real, visible change. You learn how to communicate, carry yourself and build trust in multicultural settings where presence and clarity matter.',
      icon: Award,
      gradient: 'from-orange via-azure-blue to-orange',
      delay: 0.2
    },
    {
      id: 'trusted',
      title: 'Trusted Across the Gulf',
      subtitle: 'Individuals, families, executives, diplomats and organisations rely on The Orange Code for personal, discreet, and accurate guidance. Our work is grounded in real regional experience and human centred expertise.',
      icon: Shield,
      gradient: 'from-orange via-azure-blue to-orange',
      delay: 0.4
    },
    {
      id: 'transformation',
      title: 'Noticeable Growth in Weeks',
      subtitle: 'Clients experience meaningful improvement in communication, confidence, and relationships within a short period. The process brings clarity, refinement and ease in both personal and professional environments.',
      icon: Zap,
      gradient: 'from-orange via-azure-blue to-orange',
      delay: 0.6
    }
  ]

  return (
    <motion.section 
      className="relative py-20 bg-primary-dark overflow-hidden section-separator advanced-bg-pattern"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Distinguished Divider - Animated Entrance */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] z-20"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange/80 via-azure-blue/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-azure-blue/50 via-orange/50 to-transparent blur-md" />
      </motion.div>

      {/* Floating Geometric Shapes - State of Art */}
      <div className="floating-geometry top-10 right-10 w-20 h-20 rotate-45" style={{ animationDelay: '1s' }} />
      <div className="floating-geometry bottom-20 left-10 w-16 h-16 rounded-full" style={{ animationDelay: '3s' }} />
      <div className="floating-geometry top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-azure-blue/10 to-orange/10 rotate-12" style={{ animationDelay: '5s' }} />
      <div className="floating-geometry top-1/2 left-1/3 w-8 h-8 rotate-45" style={{ animationDelay: '7s' }} />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />
        
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-radial from-azure-blue/20 to-transparent rounded-full blur-xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-radial from-orange/20 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-radial from-bright-blue/20 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header - Distinguished Entrance */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-2 h-2 bg-orange rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            />
            <span className="text-azure-blue font-semibold text-sm uppercase tracking-wider">
              Our Excellence
            </span>
            <motion.div 
              className="w-2 h-2 bg-azure-blue rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white font-montserrat mb-4">
            Why Choose{' '}
            <span className="text-gradient-primary bg-gradient-primary bg-clip-text text-transparent">
              The Orange Code
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
            <span>Explore What's Possible</span>
            <Zap className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
