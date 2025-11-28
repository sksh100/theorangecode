'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Target, Heart, Briefcase, Users, Globe, Shield, TrendingUp, ArrowRight } from 'lucide-react'
import { CulturalIntelligence3DBackground } from './CulturalIntelligence3DBackground'

export function WhyCulturalIntelligenceSection() {
  const [scrollY, setScrollY] = useState(0)
  const [nationalitiesCount, setNationalitiesCount] = useState(100)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [collaborationPercent, setCollaborationPercent] = useState(0)
  const [hasAnimatedPercent, setHasAnimatedPercent] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const bottomLineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setScrollY(window.scrollY + rect.top)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Count-up animation from 100 to 200 - triggers when section appears on screen
  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            const duration = 2000 // 2 seconds
            const startValue = 100
            const endValue = 200
            const startTime = Date.now()

            const animate = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4)
              const current = startValue + (endValue - startValue) * easeOutQuart
              
              setNationalitiesCount(Math.floor(current))

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setNationalitiesCount(endValue)
              }
            }

            // Start animation on next frame
            requestAnimationFrame(animate)

            // Stop observing once animation starts
            observer.disconnect()
          }
        })
      },
      { 
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before element enters viewport
      }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasAnimated])

  // Count-up animation for 40% - triggers when "The Bottom Line" section appears
  useEffect(() => {
    if (!bottomLineRef.current || hasAnimatedPercent) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedPercent) {
            setHasAnimatedPercent(true)
            const duration = 2000 // 2 seconds
            const startValue = 0
            const endValue = 40
            const startTime = Date.now()

            const animate = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4)
              const current = startValue + (endValue - startValue) * easeOutQuart
              
              setCollaborationPercent(Math.floor(current))

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCollaborationPercent(endValue)
              }
            }

            // Start animation on next frame
            requestAnimationFrame(animate)

            // Stop observing once animation starts
            observer.disconnect()
          }
        })
      },
      { 
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before element enters viewport
      }
    )

    observer.observe(bottomLineRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasAnimatedPercent])

  const personalBenefits = [
    {
      icon: Heart,
      title: 'Build Authentic Relationships',
      description: 'Connect genuinely with people from diverse backgrounds, creating meaningful friendships and personal networks.'
    },
    {
      icon: Users,
      title: 'Navigate Social Situations',
      description: 'Feel confident in any social setting, understanding cultural nuances that help you communicate respectfully.'
    },
    {
      icon: Globe,
      title: 'Expand Your Worldview',
      description: 'Gain deeper appreciation for different perspectives, traditions, and ways of thinking.'
    }
  ]

  const businessBenefits = [
    {
      icon: Briefcase,
      title: 'Successful Business Outcomes',
      description: 'Close deals faster, build stronger partnerships, and create lasting business relationships.',
      iconColor: 'text-orange',
      titleColor: 'text-orange'
    },
    {
      icon: Target,
      title: 'Strategic Advantage',
      description: 'Gain competitive edge by understanding local markets and business protocols in the UAE and Gulf Region.',
      iconColor: 'text-azure-blue',
      titleColor: 'text-azure-blue'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Avoid costly cultural missteps that can damage relationships, reputation, and business opportunities.',
      iconColor: 'text-bright-blue',
      titleColor: 'text-bright-blue'
    }
  ]

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.6, 0.6, 0.3])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-primary-dark overflow-hidden">
      {/* 3D Background Effect */}
      <CulturalIntelligence3DBackground scrollY={scrollY} />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary-dark via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header - Flowing Design */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24 md:mb-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.2
            }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 relative"
          >
            <motion.div 
              className="w-2 h-2 bg-orange rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut"
              }}
            />
            <motion.span 
              className="text-azure-blue font-semibold text-sm uppercase tracking-wider"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Cultural Intelligence
            </motion.span>
            <motion.div 
              className="w-2 h-2 bg-azure-blue rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut"
              }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange/20 via-azure-blue/20 to-orange/20 rounded-full blur-xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: [0.5, 1, 0.5], scale: 1 }}
              transition={{ duration: 3, repeat: Infinity }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.h2 
            className="text-title text-white max-w-5xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Why Cultural Intelligence{' '}
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent relative inline-block"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.7,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              viewport={{ once: true }}
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Matters
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent opacity-50 blur-sm"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Matters
              </motion.span>
            </motion.span>
          </motion.h2>
          
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed tracking-normal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.9,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true }}
            >
              People succeed because they know how to communicate across cultures, interpret subtle signals, and build trust quickly. Cultural intelligence gives you this advantage.
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed tracking-normal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 1.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true }}
            >
              It helps you move with confidence, avoid misunderstandings, and create the relationships that drive real success in the UAE and wider Gulf Region.
            </motion.p>
          </div>
        </motion.div>

        {/* Flowing Content Sections - No Boxes */}
        
        {/* Personal Section - Flowing Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32 md:mb-40"
        >
          {/* Section Header with Icon */}
          <motion.div 
            className="flex items-center gap-6 mb-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-orange to-orange-luminous rounded-2xl flex items-center justify-center relative overflow-hidden"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255, 145, 77, 0.5)",
                    "0 0 40px rgba(255, 145, 77, 0.8)",
                    "0 0 20px rgba(255, 145, 77, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-white relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <motion.div 
                className="absolute -inset-2 bg-orange/20 rounded-2xl blur-xl -z-10"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-subtitle text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                In Personal Settings
              </motion.h3>
              <motion.div 
                className="h-1 w-24 bg-gradient-to-r from-orange to-transparent rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-body mb-16 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            Cultural intelligence transforms your personal life by helping you connect authentically with people from over{' '}
            <motion.span 
              className="inline-block font-bold text-orange relative"
              key={nationalitiesCount}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {nationalitiesCount}
              <motion.span
                className="absolute inset-0 text-orange-luminous blur-sm opacity-50"
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                {nationalitiesCount}
              </motion.span>
            </motion.span>
            {' '}nationalities in the UAE.
          </motion.p>

          {/* Benefits - Flowing List Design */}
          <div className="space-y-12">
            {personalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 group px-4 sm:px-0"
                whileHover={{ x: 10 }}
              >
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-orange/30 to-azure-blue/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-orange/20 group-hover:border-orange/50 transition-all duration-300 relative overflow-hidden"
                      whileHover={{ 
                        boxShadow: "0 0 30px rgba(255, 145, 77, 0.6)",
                        scale: 1.05
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      />
                      <benefit.icon className="w-8 h-8 text-orange relative z-10" />
                    </motion.div>
                    <motion.div 
                      className="absolute -inset-1 bg-orange/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ 
                        opacity: [0, 0.5, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="flex-1 pt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.h4 
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-orange transition-colors duration-300"
                    whileHover={{ 
                      textShadow: "0 0 20px rgba(255, 145, 77, 0.8)"
                    }}
                  >
                    {benefit.title}
                  </motion.h4>
                  <motion.p 
                    className="text-base sm:text-lg text-white/70 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    {benefit.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider Line */}
        <div className="relative my-20 md:my-32">
          <div className="h-px bg-gradient-to-r from-transparent via-azure-blue/50 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-azure-blue rounded-full" />
        </div>

        {/* Business Section - Flowing Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32 md:mb-40"
        >
          {/* Section Header with Icon */}
          <div className="flex items-center gap-6 mb-12">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-azure-blue to-azure-luminous rounded-2xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-azure-blue/20 rounded-2xl blur-xl -z-10" />
            </div>
            <div>
              <h3 className="text-subtitle text-white mb-2">
                In Business
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-azure-blue to-transparent rounded-full" />
            </div>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-12 sm:mb-16 max-w-3xl px-4 sm:px-0">
            Cultural intelligence is essential for successful business outcomes in the UAE and Gulf Region.
          </p>

          {/* Benefits - Grid Layout for Business */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {businessBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col h-full"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6 flex-shrink-0">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                      <benefit.icon className={`w-7 h-7 ${benefit.iconColor || 'text-white/90'}`} />
                    </div>
                  </div>
                  <h4 className={`text-subtitle ${benefit.titleColor || 'text-white'} mb-3 min-h-[4rem] flex items-start transition-colors duration-300`}>
                    {benefit.title}
                  </h4>
                  <p className="text-small flex-grow">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Line - Flowing Highlight */}
        <motion.div
          ref={bottomLineRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/50 via-azure-blue/50 to-transparent" />
          
          <div className="pt-12 pb-8">
            <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8 px-4 sm:px-0">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-orange via-azure-blue to-orange rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-3 bg-gradient-to-br from-orange/20 via-azure-blue/20 to-orange/20 rounded-2xl blur-2xl -z-10" />
              </div>
              <div className="flex-1 pt-2">
                <h4 className="text-subtitle text-white mb-6">
                  The Bottom Line
                </h4>
                <p className="text-base sm:text-xl md:text-2xl text-white/90 leading-relaxed px-4 sm:px-0">
                  Teams with high cultural intelligence see{' '}
                  <motion.span 
                    className="font-bold text-orange inline-block relative"
                    key={collaborationPercent}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {collaborationPercent}%
                    <motion.span
                      className="absolute inset-0 text-orange-luminous blur-sm opacity-50 pointer-events-none"
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.5 }}
                      transition={{ duration: 0.5 }}
                    >
                      {collaborationPercent}%
                    </motion.span>
                  </motion.span>
                  {' '}better collaboration,{' '}
                  <span className="font-bold text-orange">faster decision-making</span>, and{' '}
                  <span className="font-bold text-orange">stronger client relationships</span>. 
                  In a region where relationships drive business, cultural intelligence is your competitive advantage.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure-blue/50 via-orange/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

