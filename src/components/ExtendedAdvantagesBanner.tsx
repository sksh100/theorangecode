'use client'

import { motion } from 'framer-motion'
import { Shield, Globe, Crown, Users, Sparkles, ArrowRight, Star } from 'lucide-react'

interface AdvantageItem {
  id: string
  title: string
  icon: React.ReactNode
  gradient: string
  borderColor: string
  glowColor: string
}

export function ExtendedAdvantagesBanner() {
  const advantages: AdvantageItem[] = [
    {
      id: 'cultural-intelligence',
      title: 'Exclusive Access to Cultural Intelligence',
      icon: <Shield className="w-8 h-8" />,
      gradient: 'from-azure-blue/20 to-azure-blue/5',
      borderColor: 'border-azure-blue/40',
      glowColor: 'from-azure-blue/30 to-azure-blue/10'
    },
    {
      id: 'cross-cultural',
      title: 'Cross-Cultural Negotiation & Diplomacy',
      icon: <Globe className="w-8 h-8" />,
      gradient: 'from-orange/20 to-orange/5',
      borderColor: 'border-orange/40',
      glowColor: 'from-orange/30 to-orange/10'
    },
    {
      id: 'luxury-heritage',
      title: 'Luxury Heritage & Brand Building',
      icon: <Crown className="w-8 h-8" />,
      gradient: 'from-bright-blue/20 to-bright-blue/5',
      borderColor: 'border-bright-blue/40',
      glowColor: 'from-bright-blue/30 to-bright-blue/10'
    },
    {
      id: 'multicultural',
      title: 'Multicultural Global Experience',
      icon: <Users className="w-8 h-8" />,
      gradient: 'from-light-blue/20 to-light-blue/5',
      borderColor: 'border-light-blue/40',
      glowColor: 'from-light-blue/30 to-light-blue/10'
    }
  ]

  return (
    <section className="relative py-32 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark overflow-hidden">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern-animated" />
        </div>
        
        {/* Floating Geometric Shapes */}
        <motion.div 
          className="absolute w-40 h-40 border border-azure-blue/30 rotate-45 top-20 right-20"
          animate={{ 
            rotate: [45, 405],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute w-32 h-32 bg-gradient-to-br from-orange/20 to-transparent rounded-full bottom-32 left-20"
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-20 h-20 border-2 border-light-blue/40 top-1/2 left-1/4 rotate-12"
          animate={{ 
            rotate: [12, 372],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Dynamic Light Rays */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-azure-blue/30 to-transparent left-1/4"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-orange/30 to-transparent right-1/4"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
        </div>

        {/* Floating Orbs */}
        <motion.div 
          className="absolute w-48 h-48 bg-gradient-radial from-azure-blue/20 to-transparent top-1/4 left-1/4 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-32 h-32 bg-gradient-radial from-orange/20 to-transparent bottom-1/4 right-1/4 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Futuristic Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Animated Badge */}
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-azure-blue/10 to-orange/10 border border-azure-blue/30 rounded-full mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-azure-blue" />
            </motion.div>
            <span className="text-sm font-bold text-text-primary uppercase tracking-widest">
              Extended Advantages
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-5 h-5 text-orange" />
            </motion.div>
          </motion.div>
          
          {/* Main Title with 3D Effect */}
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-8"
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              textShadow: `
                0 0 20px rgba(0, 212, 255, 0.5),
                0 0 40px rgba(0, 212, 255, 0.3),
                0 0 60px rgba(0, 212, 255, 0.1)
              `
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-blue via-white to-orange">
              Beyond Excellence
            </span>
            <motion.span 
              className="text-3xl md:text-5xl ml-6 text-orange"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              (4 Pillars)
            </motion.span>
          </motion.h2>
          
          {/* Subtitle with Typewriter Effect */}
          <motion.p 
            className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Unlock exclusive advantages that set you apart in the global arena
          </motion.p>
        </motion.div>

        {/* Creative Hexagonal Grid Layout */}
        <motion.div 
          className="relative mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Hexagonal Grid Container */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 1 + index * 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    rotateY: 2,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Hexagonal Container */}
                  <div className="relative">
                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${advantage.glowColor} rounded-2xl opacity-0 group-hover:opacity-80 blur-md`}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Main Hexagonal Card */}
                    <div className={`relative bg-gradient-to-br ${advantage.gradient} backdrop-blur-[40px] border ${advantage.borderColor} rounded-2xl p-8 h-64 transition-all duration-300 group-hover:border-opacity-80 group-hover:shadow-2xl shadow-xl overflow-hidden`}>
                      
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-16 h-16 border border-white/20 rotate-45" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/20 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/20 rotate-12" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        
                        {/* Top Section */}
                        <div>
                          {/* Icon */}
                          <motion.div 
                            className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:text-orange transition-colors duration-300"
                            whileHover={{ 
                              scale: 1.1, 
                              rotate: 10,
                              boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)"
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {advantage.icon}
                          </motion.div>

                          {/* Title */}
                          <motion.h3 
                            className="text-xl font-bold text-white group-hover:text-orange transition-colors duration-300 leading-tight mb-3"
                            whileHover={{ 
                              textShadow: "0 0 20px rgba(255, 145, 77, 0.8)"
                            }}
                          >
                            {advantage.title}
                          </motion.h3>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex items-center justify-between">
                          {/* Progress Indicator */}
                          <div className="flex space-x-1">
                            {[...Array(4)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={`w-2 h-2 rounded-full ${i <= index ? 'bg-orange' : 'bg-white/20'}`}
                                animate={{ 
                                  scale: i <= index ? [1, 1.2, 1] : 1,
                                  opacity: i <= index ? [0.7, 1, 0.7] : 0.3
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.3
                                }}
                              />
                            ))}
                          </div>

                          {/* Arrow */}
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                          >
                            <ArrowRight className="w-6 h-6 text-white group-hover:text-orange" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Floating Elements Inside Card */}
                      <motion.div
                        className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full"
                        animate={{
                          y: [-5, 5, -5],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      />
                      <motion.div
                        className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-orange/60 rounded-full"
                        animate={{
                          x: [-3, 3, -3],
                          opacity: [0.4, 0.9, 0.4]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.7
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floating Particles - Enhanced */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-azure-blue to-orange rounded-full"
              style={{
                left: `${15 + (i * 10)}%`,
                top: `${20 + (i * 8)}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          ))}

          {/* Additional Floating Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`extra-${i}`}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{
                left: `${25 + (i * 12)}%`,
                top: `${60 + (i * 6)}%`,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.6
              }}
            />
          ))}

          {/* Geometric Shapes */}
          <motion.div 
            className="absolute top-10 right-10 w-20 h-20 border border-azure-blue/30 rotate-45"
            animate={{ 
              rotate: [45, 405],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-orange/20 to-transparent rounded-full"
            animate={{ 
              y: [-10, 10, -10],
              x: [-5, 5, -5]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Tagline Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-2xl md:text-3xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            viewport={{ once: true }}
          >
            Turn uncertainty into confidence, and cultural barriers into bridges of trust.
          </motion.p>
        </motion.div>

        {/* Main CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-orange to-bright-blue border border-orange/50 rounded-3xl cursor-pointer hover:border-orange/80 transition-all duration-300 backdrop-blur-sm text-white font-bold text-xl shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(255, 145, 77, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-7 h-7 text-white" />
            </motion.div>
            <span>Meet YOUR Luxury Agent Today!</span>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              <ArrowRight className="w-7 h-7 text-white" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
