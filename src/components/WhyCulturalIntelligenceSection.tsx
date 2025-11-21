'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Target, Heart, Briefcase, Users, Globe, Shield, TrendingUp, ArrowRight } from 'lucide-react'
import { CulturalIntelligence3DBackground } from './CulturalIntelligence3DBackground'

export function WhyCulturalIntelligenceSection() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
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
      description: 'Close deals faster, build stronger partnerships, and create lasting business relationships.'
    },
    {
      icon: Target,
      title: 'Strategic Advantage',
      description: 'Gain competitive edge by understanding local markets and business protocols in the UAE and Gulf Region.'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Avoid costly cultural missteps that can damage relationships, reputation, and business opportunities.'
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24 md:mb-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            <span className="text-azure-blue font-semibold text-sm uppercase tracking-wider">
              Cultural Intelligence
            </span>
            <div className="w-2 h-2 bg-azure-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white max-w-5xl mx-auto leading-tight whitespace-nowrap">
            Why Cultural Intelligence{' '}
            <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
              Matters
            </span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              People succeed because they know how to communicate across cultures, interpret subtle signals, and build trust quickly. Cultural intelligence gives you this advantage.
            </p>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              It helps you move with confidence, avoid misunderstandings, and create the relationships that drive real success in the UAE and wider Gulf Region.
            </p>
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
          <div className="flex items-center gap-6 mb-12">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange to-orange-luminous rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-orange/20 rounded-2xl blur-xl -z-10" />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                In Personal Settings
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-orange to-transparent rounded-full" />
            </div>
          </div>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-16 max-w-3xl">
            Cultural intelligence transforms your personal life by helping you connect authentically with people from over 200 nationalities in the UAE.
          </p>

          {/* Benefits - Flowing List Design */}
          <div className="space-y-12">
            {personalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 md:gap-8 group"
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange/30 to-azure-blue/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-orange/20 group-hover:border-orange/50 transition-all duration-300">
                      <benefit.icon className="w-8 h-8 text-orange" />
                    </div>
                    <div className="absolute -inset-1 bg-orange/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-orange transition-colors duration-300">
                    {benefit.title}
                  </h4>
                  <p className="text-lg text-white/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
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
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                In Business
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-azure-blue to-transparent rounded-full" />
            </div>
          </div>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-16 max-w-3xl">
            Cultural intelligence is essential for successful business outcomes in the UAE and Gulf Region.
          </p>

          {/* Benefits - Grid Layout for Business */}
          <div className="grid md:grid-cols-3 gap-8">
            {businessBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-azure-blue/30 to-bright-blue/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-azure-blue/20 group-hover:border-azure-blue/50 transition-all duration-300 mb-4">
                    <benefit.icon className="w-7 h-7 text-azure-blue" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-azure-blue transition-colors duration-300">
                    {benefit.title}
                  </h4>
                  <p className="text-base text-white/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Line - Flowing Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/50 via-azure-blue/50 to-transparent" />
          
          <div className="pt-12 pb-8">
            <div className="flex items-start gap-6 mb-8">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-orange via-azure-blue to-orange rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-3 bg-gradient-to-br from-orange/20 via-azure-blue/20 to-orange/20 rounded-2xl blur-2xl -z-10" />
              </div>
              <div className="flex-1 pt-2">
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  The Bottom Line
                </h4>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Teams with high cultural intelligence see{' '}
                  <span className="font-bold text-orange">40% better collaboration</span>,{' '}
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

