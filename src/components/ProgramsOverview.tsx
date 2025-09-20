'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Star, Globe, Sparkles, Target, Rocket } from 'lucide-react'

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
  const sectionRef = useRef<HTMLElement>(null)
  
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
      title: "Born to Lead",
      description: "Step into your full potential with a program that refines how you think, speak, move, and lead. From table manners and royal protocols to body language, tone of voice, and setting boundaries, this journey transforms ambition into presence.",
      gradient: "from-orange/20 to-bright-blue/20",
      imagePlaceholder: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face&auto=format&q=80",
      learnMoreLink: "#born-to-lead"
    },
    {
      id: 2,
      title: "Program for UAE Expats",
      description: "Belong socially and culturally in the Emirates. Learn Islamic etiquette, modesty codes, hospitality rituals, Arabic phrases, and the art of building lasting friendships with Emiratis. Break isolation and thrive with cultural confidence.",
      gradient: "from-bright-blue/20 to-light-blue/20",
      imagePlaceholder: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80",
      learnMoreLink: "#uae-expats"
    },
    {
      id: 3,
      title: "Doing Business in the Middle East",
      description: "Unlock the unspoken rules of GCC business culture. From trust-building and negotiation rhythms to gifting, attire, and majlis etiquette, this program gives executives and entrepreneurs the keys to succeed in UAE, Saudi Arabia, Qatar, and beyond.",
      gradient: "from-light-blue/20 to-orange/20",
      imagePlaceholder: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&auto=format&q=80",
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
              Hero Programs
            </span>
            <motion.span 
              className="text-3xl md:text-5xl ml-6 text-orange"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              (3 Cards)
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
            Transform your potential with our signature programs designed for excellence
          </motion.p>
        </motion.div>

        {/* Cyberpunk Horizontal Programs Layout */}
        <motion.div 
          className="space-y-32 mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {programs.map((program, index) => {
            const isEven = index % 2 === 0
            const panelColors = [
              { bg: 'from-orange/15 to-orange/5', border: 'border-orange/40', glow: 'from-orange/30 to-orange/10' },
              { bg: 'from-bright-blue/15 to-bright-blue/5', border: 'border-bright-blue/40', glow: 'from-bright-blue/30 to-bright-blue/10' },
              { bg: 'from-light-blue/15 to-light-blue/5', border: 'border-light-blue/40', glow: 'from-light-blue/30 to-light-blue/10' }
            ]
            const colors = panelColors[index]

            return (
              <motion.div
                key={program.id}
                className="group relative"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                onMouseEnter={() => {
                  setHoveredCard(program.id)
                  setActiveCard(program.id)
                }}
                onMouseLeave={() => {
                  setHoveredCard(null)
                  setActiveCard(null)
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.01
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Cyberpunk Panel Container */}
                <div className="relative">
                  {/* Panel Glow Effect */}
                  <motion.div
                    className={`absolute -inset-2 bg-gradient-to-r ${colors.glow} rounded-3xl opacity-0 group-hover:opacity-100 blur-lg`}
                    animate={{ 
                      opacity: activeCard === program.id ? 0.3 : 0,
                      scale: activeCard === program.id ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Main Cyberpunk Panel */}
                  <div className={`relative bg-gradient-to-br ${colors.bg} backdrop-blur-[40px] border ${colors.border} rounded-3xl p-12 transition-all duration-500 group-hover:border-opacity-60 shadow-2xl`}>
                    
                    {/* Horizontal Layout */}
                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                      
                      {/* Image Section */}
                      <motion.div 
                        className={`flex-shrink-0 ${isEven ? 'lg:w-1/2' : 'lg:w-1/2'}`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Cyberpunk Image Placeholder */}
                        <div className={`relative w-full h-80 bg-gradient-to-br ${colors.bg} backdrop-blur-[20px] border ${colors.border} rounded-2xl overflow-hidden group-hover:border-opacity-60 transition-all duration-300`}>
                          <img 
                            src={program.imagePlaceholder} 
                            alt={program.title}
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                          />
                          {/* Cyberpunk Overlay Effect */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          />
                          
                          {/* Cyberpunk Grid Overlay */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="cyberpunk-grid" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Content Section */}
                      <div className="flex-1 text-left">
                        {/* Title */}
                        <motion.h3 
                          className="text-4xl md:text-5xl font-black text-white mb-8 group-hover:text-orange transition-colors duration-300"
                          whileHover={{ 
                            textShadow: "0 0 30px rgba(255, 145, 77, 0.8)"
                          }}
                        >
                          {program.title}
                        </motion.h3>

                        {/* Description */}
                        <p className="text-white/90 mb-10 leading-relaxed text-xl max-w-2xl">
                          {program.description}
                        </p>

                        {/* Cyberpunk CTA Button */}
                        <motion.a
                          href={program.learnMoreLink}
                          className={`inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r ${colors.glow} border ${colors.border} rounded-2xl text-white hover:text-orange transition-all duration-300 font-bold text-lg group-hover:border-opacity-80 group-hover:shadow-2xl`}
                          whileHover={{ 
                            x: 15,
                            scale: 1.05,
                            boxShadow: "0 15px 40px rgba(255, 145, 77, 0.4)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>[Learn More]</span>
                          <motion.div
                            animate={{ x: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          >
                            <Rocket className="w-6 h-6" />
                          </motion.div>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Futuristic Academy Grid Trigger */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-azure-blue/10 to-orange/10 border border-azure-blue/30 rounded-3xl cursor-pointer hover:border-azure-blue/50 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 212, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-6 h-6 text-azure-blue" />
            </motion.div>
            <span className="text-text-primary font-bold text-lg">Scroll → Opens Expanded Academy Grid</span>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6 text-orange" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
