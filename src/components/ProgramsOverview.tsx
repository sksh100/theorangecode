'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface MasterclassCard {
  id: number
  title: string
  description: string
  gradient: string
  imagePlaceholder: string
  learnMoreLink: string
}

interface MasterclassesOverviewProps {
  onExpand?: () => void
}

export function MasterclassesOverview({ onExpand }: MasterclassesOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const masterclasses: MasterclassCard[] = [
    {
      id: 1,
      title: "UAE Cultural Foundations",
      description: "A comprehensive introduction to the cultural foundations of the UAE. Participants explore the country's heritage, values, social codes, national identity, daily rhythms, dress etiquette, and the significance of traditions such as Ramadan. Designed as an essential integration experience for anyone living in or relocating to the Emirates.",
      gradient: "from-orange/20 to-bright-blue/20",
      imagePlaceholder: "/programs/program 1.png",
      learnMoreLink: "/masterclasses"
    },
    {
      id: 2,
      title: "Cultural Intelligence\nFor Expats",
      description: "A transformative masterclass that helps expats recognise how their own communication style, decision making, and relationship-building habits impact their experience in the region. Using globally recognised cultural frameworks (without naming them), participants learn how to adapt, connect, and thrive across cultures.",
      gradient: "from-bright-blue/20 to-light-blue/20",
      imagePlaceholder: "/programs/program 2.png",
      learnMoreLink: "/masterclasses"
    },
    {
      id: 3,
      title: "Business Culture & Professional Etiquette",
      description: "A strategic masterclass focused on business etiquette and professional communication in the UAE and GCC-region. Learn how to navigate hierarchy, manage feedback, build trust and conduct meetings and negotiations in a relationship-driven environment. Ideal for executives, entrepreneurs, and professionals aiming to succeed in the local market or expand business across the Gulf.",
      gradient: "from-light-blue/20 to-orange/20",
      imagePlaceholder: "/programs/program 3.png",
      learnMoreLink: "/masterclasses"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('masterclasses-overview')
      if (element) {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isVisible && !isExpanded) {
          setIsExpanded(true)
          onExpand?.()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isExpanded, onExpand])

  // Auto-play carousel removed - manual navigation only

  return (
    <motion.section
      ref={sectionRef}
      id="masterclasses-overview"
      className="relative py-32 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Cutting-Edge Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern-animated" />
        </div>
        
        {/* Floating Geometric Shapes */}
        <motion.div 
          className="absolute w-32 h-32 border border-azure-blue/30 rotate-45 top-20 right-20"
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
          className="absolute w-24 h-24 bg-gradient-to-br from-orange/20 to-transparent rounded-full bottom-32 left-20"
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
          className="absolute w-16 h-16 border-2 border-light-blue/40 top-1/2 left-1/4 rotate-12"
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
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - Matching "Why Cultural Intelligence Matters" Style */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge with bullets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6"
          >
            <motion.div 
              className="w-2 h-2 bg-orange rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            />
            <span className="text-azure-blue font-semibold text-sm uppercase tracking-wider">
              MASTERCLASSES
            </span>
            <motion.div 
              className="w-2 h-2 bg-azure-blue rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Main Title: "Our Masterclasses" with gradient on "Masterclasses" */}
          <motion.h1 
            className="text-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
              Masterclasses
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-body mb-6 md:whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Transform your potential with our signature masterclasses designed for excellence
          </motion.p>
        </motion.div>

        {/* Three Glass Morphic Boxes Layout */}
        <motion.div 
          className="relative mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Grid Container for 3 Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {masterclasses.map((masterclass, index) => {
              const panelColors = [
                { bg: 'from-orange/15 to-orange/5', border: 'border-orange/40', glow: 'from-orange/30 to-orange/10' },
                { bg: 'from-bright-blue/15 to-bright-blue/5', border: 'border-bright-blue/40', glow: 'from-bright-blue/30 to-bright-blue/10' },
                { bg: 'from-light-blue/15 to-light-blue/5', border: 'border-light-blue/40', glow: 'from-light-blue/30 to-light-blue/10' }
              ]
              const colors = panelColors[index]

              return (
                <motion.div
                  key={masterclass.id}
                  className="group relative flex flex-col"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => {
                    setHoveredCard(masterclass.id)
                    setActiveCard(masterclass.id)
                  }}
                  onMouseLeave={() => {
                    setHoveredCard(null)
                    setActiveCard(null)
                  }}
                >
                  {/* Panel Glow Effect */}
                  <motion.div
                    className={`absolute -inset-2 bg-gradient-to-r ${colors.glow} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl`}
                    animate={{ 
                      opacity: activeCard === masterclass.id ? 0.4 : 0,
                      scale: activeCard === masterclass.id ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glass Morphic Box */}
                  <div className={`relative bg-gradient-to-br ${colors.bg} backdrop-blur-[40px] border ${colors.border} rounded-3xl p-6 md:p-8 transition-all duration-500 group-hover:border-opacity-80 shadow-2xl flex flex-col flex-grow`}>
                    
                    {/* Vertical Layout: Title -> Image -> Description */}
                    <div className="flex flex-col gap-6 flex-grow">
                      
                      {/* Title Above Image - Fixed Height */}
                      <motion.h3 
                        className="text-xl md:text-2xl font-black text-white group-hover:text-orange transition-colors duration-300 text-center min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center"
                        whileHover={{ 
                          textShadow: "0 0 30px rgba(255, 145, 77, 0.8)"
                        }}
                      >
                        {masterclass.title.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < masterclass.title.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </motion.h3>

                      {/* Image Placeholder - Fixed Height for Alignment */}
                      <motion.div 
                        className="w-full h-48 md:h-64 flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`relative w-full h-full bg-gradient-to-br ${colors.bg} backdrop-blur-[20px] border-2 ${colors.border} rounded-xl overflow-hidden group-hover:border-opacity-80 transition-all duration-300 shadow-xl`}>
                          <Image 
                            src={masterclass.imagePlaceholder} 
                            alt={masterclass.title}
                            fill
                            className="object-cover object-left"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {/* Subtle Overlay Effect */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                          />
                        </div>
                      </motion.div>

                      {/* Description Below Image */}
                      <div className="flex flex-col gap-4 flex-grow">
                        <p className="text-white/90 text-sm md:text-base leading-relaxed text-center flex-grow">
                          {masterclass.description}
                        </p>
                        
                        {/* CTA Button */}
                        <motion.a
                          href={masterclass.learnMoreLink}
                          className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r ${colors.glow} border ${colors.border} rounded-xl text-white hover:text-orange transition-all duration-300 font-semibold text-sm group-hover:border-opacity-80 mt-auto`}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 30px rgba(255, 145, 77, 0.3)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
