'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, PanInfo } from 'framer-motion'
import { ArrowRight, Star, Globe, Sparkles, Target, Rocket, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProgramCard {
  id: number
  title: string
  description: string
  gradient: string
  imagePlaceholder: string
  learnMoreLink: string
}

interface ProgramsOverviewProps {
  onExpand?: () => void
}

export function ProgramsOverview({ onExpand }: ProgramsOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const programs: ProgramCard[] = [
    {
      id: 1,
      title: "UAE Cultural Foundations",
      description: "Step into your full potential with a program that refines how you think, speak, move, and lead. From table manners and royal protocols to body language, tone of voice, and setting boundaries, this journey transforms ambition into presence.",
      gradient: "from-orange/20 to-bright-blue/20",
      imagePlaceholder: "/programs/program 1.png",
      learnMoreLink: "#born-to-lead"
    },
    {
      id: 2,
      title: "Cultural Intelligence For Expatriat",
      description: "Belong socially and culturally in the Emirates. Learn Islamic etiquette, modesty codes, hospitality rituals, Arabic phrases, and the art of building lasting friendships with Emiratis. Break isolation and thrive with cultural confidence.",
      gradient: "from-bright-blue/20 to-light-blue/20",
      imagePlaceholder: "/programs/program 2.png",
      learnMoreLink: "#uae-expats"
    },
    {
      id: 3,
      title: "Business Cultural Intelligence in the UAE & GCC",
      description: "Unlock the unspoken rules of GCC business culture. From trust-building and negotiation rhythms to gifting, attire, and majlis etiquette, this program gives executives and entrepreneurs the keys to succeed in UAE, Saudi Arabia, Qatar, and beyond.",
      gradient: "from-light-blue/20 to-orange/20",
      imagePlaceholder: "/programs/program 3.png",
      learnMoreLink: "#middle-east-business"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('programs-overview')
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
      id="programs-overview"
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
              Programs Overview
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-5 h-5 text-orange" />
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
              The Orange Code Programs
            </span>
          </motion.h2>
          
          {/* Subtitle with Typewriter Effect */}
          <motion.p 
            className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Transform your potential with our signature programs designed for excellence
          </motion.p>
        </motion.div>

        {/* Horizontal Carousel Layout */}
        <motion.div 
          className="relative mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-3xl">
            <motion.div 
              ref={carouselRef}
              className="flex"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info: PanInfo) => {
                const threshold = 50
                if (info.offset.x > threshold && currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1)
                } else if (info.offset.x < -threshold && currentIndex < programs.length - 1) {
                  setCurrentIndex(currentIndex + 1)
                }
              }}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 30, duration: 1.2 }}
              style={{ width: `${programs.length * 100}%` }}
            >
              {programs.map((program, index) => {
                const panelColors = [
                  { bg: 'from-orange/15 to-orange/5', border: 'border-orange/40', glow: 'from-orange/30 to-orange/10' },
                  { bg: 'from-bright-blue/15 to-bright-blue/5', border: 'border-bright-blue/40', glow: 'from-bright-blue/30 to-bright-blue/10' },
                  { bg: 'from-light-blue/15 to-light-blue/5', border: 'border-light-blue/40', glow: 'from-light-blue/30 to-light-blue/10' }
                ]
                const colors = panelColors[index]

                return (
                  <motion.div
                    key={program.id}
                    className="w-full flex-shrink-0 px-4 md:px-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: currentIndex === index ? 1 : 0.7, scale: currentIndex === index ? 1 : 0.98 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div
                      className="group relative"
                      onMouseEnter={() => {
                        setHoveredCard(program.id)
                        setActiveCard(program.id)
                      }}
                      onMouseLeave={() => {
                        setHoveredCard(null)
                        setActiveCard(null)
                      }}
                    >
                      {/* Panel Glow Effect */}
                      <motion.div
                        className={`absolute -inset-2 bg-gradient-to-r ${colors.glow} rounded-3xl opacity-0 group-hover:opacity-100 blur-lg`}
                        animate={{ 
                          opacity: activeCard === program.id ? 0.3 : 0,
                          scale: activeCard === program.id ? 1.02 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Main Cyberpunk Panel - Compact Height, No Overflow Hidden */}
                      <div className={`relative bg-gradient-to-br ${colors.bg} backdrop-blur-[40px] border ${colors.border} rounded-3xl p-6 md:p-8 transition-all duration-500 group-hover:border-opacity-60 shadow-2xl overflow-visible`}>
                        
                        {/* Vertical Layout: Title -> Image -> Description */}
                        <div className="flex flex-col gap-4 md:gap-6">
                          
                          {/* Title */}
                          <motion.h3 
                            className="text-2xl md:text-3xl lg:text-4xl font-black text-white group-hover:text-orange transition-colors duration-300"
                            whileHover={{ 
                              textShadow: "0 0 30px rgba(255, 145, 77, 0.8)"
                            }}
                          >
                            {program.title}
                          </motion.h3>

                          {/* Image Section - Elegant and Visible */}
                          <motion.div 
                            className="w-48 h-36 md:w-64 md:h-48 mx-auto"
                            whileHover={{ scale: 1.05 }}
                          >
                            {/* Elegant Image Card */}
                            <div className={`relative w-full h-full bg-gradient-to-br ${colors.bg} backdrop-blur-[20px] border-2 ${colors.border} rounded-xl overflow-hidden group-hover:border-opacity-80 transition-all duration-300 shadow-xl`}>
                              <img 
                                src={program.imagePlaceholder} 
                                alt={program.title}
                                className="w-full h-full object-cover"
                              />
                              {/* Subtle Overlay Effect */}
                              <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                              />
                            </div>
                          </motion.div>

                          {/* Description Below Image */}
                          <div className="flex flex-col gap-4">
                            {/* Description Text - Full Text Visible, No Cutoff */}
                            <p className="text-white/90 text-sm md:text-base leading-relaxed whitespace-normal break-words">
                              {program.description}
                            </p>
                            
                            {/* CTA Button */}
                            <motion.a
                              href={program.learnMoreLink}
                              className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${colors.glow} border ${colors.border} rounded-xl text-white hover:text-orange transition-all duration-300 font-semibold text-sm group-hover:border-opacity-80 self-start`}
                              whileHover={{ 
                                x: 10,
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
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? programs.length - 1 : prev - 1))}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-azure-blue/20 to-orange/20 border border-azure-blue/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-azure-blue/60 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              type="button"
            >
              <ChevronLeft className="w-6 h-6 pointer-events-none" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
              {programs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-azure-blue w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => setCurrentIndex((prev) => (prev === programs.length - 1 ? 0 : prev + 1))}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-azure-blue/20 to-orange/20 border border-azure-blue/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-azure-blue/60 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              type="button"
            >
              <ChevronRight className="w-6 h-6 pointer-events-none" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
