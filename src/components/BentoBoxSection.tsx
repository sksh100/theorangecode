'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, BookOpen, Globe, MessageSquare, Calendar, Sparkles, Target, Zap } from 'lucide-react'

interface BentoBoxItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  size: 'small' | 'medium' | 'large' | 'wide'
  gradient: string
  borderColor: string
  glowColor: string
  link?: string
}

export function BentoBoxSection() {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)

  const bentoItems: BentoBoxItem[] = [
    {
      id: 'why-matters',
      title: 'Why This Matters',
      description: 'Understanding the importance of cultural intelligence in today\'s globalized world',
      icon: <Target className="w-8 h-8" />,
      size: 'large',
      gradient: 'from-orange/20 to-orange/5',
      borderColor: 'border-orange/40',
      glowColor: 'from-orange/30 to-orange/10'
    },
    {
      id: 'transformation',
      title: 'Transformation',
      description: 'See the journey from ambition to authentic presence',
      icon: <Zap className="w-8 h-8" />,
      size: 'medium',
      gradient: 'from-bright-blue/20 to-bright-blue/5',
      borderColor: 'border-bright-blue/40',
      glowColor: 'from-bright-blue/30 to-bright-blue/10'
    },
    {
      id: 'extended-programs',
      title: 'Extended Programs',
      description: 'Comprehensive learning paths for deeper mastery',
      icon: <BookOpen className="w-8 h-8" />,
      size: 'medium',
      gradient: 'from-light-blue/20 to-light-blue/5',
      borderColor: 'border-light-blue/40',
      glowColor: 'from-light-blue/30 to-light-blue/10'
    },
    {
      id: 'uae-history',
      title: 'UAE History Guide',
      description: 'Rich heritage and modern development',
      icon: <Globe className="w-8 h-8" />,
      size: 'small',
      gradient: 'from-orange/20 to-orange/5',
      borderColor: 'border-orange/40',
      glowColor: 'from-orange/30 to-orange/10'
    },
    {
      id: 'cultural-guide',
      title: 'Cultural Guide',
      description: 'Essential insights for cultural navigation',
      icon: <Users className="w-8 h-8" />,
      size: 'small',
      gradient: 'from-bright-blue/20 to-bright-blue/5',
      borderColor: 'border-bright-blue/40',
      glowColor: 'from-bright-blue/30 to-bright-blue/10'
    },
    {
      id: 'testimonials',
      title: 'Testimonials Carousel',
      description: 'Success stories from our community',
      icon: <MessageSquare className="w-8 h-8" />,
      size: 'large',
      gradient: 'from-light-blue/20 to-light-blue/5',
      borderColor: 'border-light-blue/40',
      glowColor: 'from-light-blue/30 to-light-blue/10'
    },
    {
      id: 'book-session',
      title: 'Book your session now',
      description: 'Start your transformation journey today',
      icon: <Calendar className="w-8 h-8" />,
      size: 'large',
      gradient: 'from-orange/20 to-orange/5',
      borderColor: 'border-orange/40',
      glowColor: 'from-orange/30 to-orange/10',
      link: '#book-session'
    }
  ]

  const getBoxClasses = (size: string, index: number) => {
    // First row (index 0, 1, 2) - make them more square
    if (index < 3) {
      switch (size) {
        case 'small':
          return 'col-span-1 row-span-2'
        case 'medium':
          return 'col-span-1 row-span-2'
        case 'large':
          return 'col-span-2 row-span-2'
        case 'wide':
          return 'col-span-4 row-span-1'
        default:
          return 'col-span-1 row-span-2'
      }
    }
    // Testimonials carousel (index 5) - make it tall but not too tall
    if (index === 5) {
      return 'col-span-2 row-span-2'
    }
    // Rest of the boxes - keep them compact
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1'
      case 'medium':
        return 'col-span-1 row-span-1'
      case 'large':
        return 'col-span-2 row-span-1'
      case 'wide':
        return 'col-span-4 row-span-1'
      default:
        return 'col-span-1 row-span-1'
    }
  }

  return (
    <section className="relative py-32 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-azure-blue/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />
        
        {/* Floating Orbs */}
        <div className="absolute w-[200px] h-[200px] bg-gradient-radial from-bright-blue/10 to-transparent top-[-100px] right-[-100px] animate-pulse" />
        <div className="absolute w-[150px] h-[150px] bg-gradient-radial from-orange/10 to-transparent bottom-[-75px] left-[-75px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
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
              Explore More
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-5 h-5 text-orange" />
            </motion.div>
          </motion.div>
          
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
              Bento Box
            </span>
            <motion.span 
              className="text-3xl md:text-5xl ml-6 text-orange"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Experience
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Discover our comprehensive resources and services
          </motion.p>
        </motion.div>

        {/* Bento Box Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[180px] mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`group relative ${getBoxClasses(item.size, index)}`}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredBox(item.id)}
              onMouseLeave={() => setHoveredBox(null)}
              whileHover={{ 
                y: -10,
                scale: 1.02
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Box Glow Effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${item.glowColor} rounded-3xl opacity-0 group-hover:opacity-100 blur-sm`}
                animate={{ 
                  opacity: hoveredBox === item.id ? 0.3 : 0,
                  scale: hoveredBox === item.id ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Main Bento Box */}
              <div className={`relative bg-gradient-to-br ${item.gradient} backdrop-blur-[40px] border ${item.borderColor} rounded-3xl ${index < 3 ? 'p-6' : 'p-4'} h-full transition-all duration-500 group-hover:border-opacity-60 shadow-2xl cursor-pointer`}>
                
                {/* Icon */}
                <motion.div 
                  className={`${index < 3 ? 'w-16 h-16 mb-4' : 'w-12 h-12 mb-3'} bg-gradient-to-br ${item.glowColor} rounded-xl flex items-center justify-center text-white group-hover:text-orange transition-colors duration-300`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 10,
                    boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>

                {/* Title */}
                <motion.h3 
                  className={`${index < 3 ? 'text-xl md:text-2xl mb-3' : 'text-lg md:text-xl mb-2'} font-bold text-white group-hover:text-orange transition-colors duration-300`}
                  whileHover={{ 
                    textShadow: "0 0 20px rgba(255, 145, 77, 0.8)"
                  }}
                >
                  {item.title}
                </motion.h3>

                {/* Description */}
                <p className={`text-white/80 leading-relaxed ${index < 3 ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
                  {item.description}
                </p>

                {/* Arrow for clickable items */}
                {item.link && (
                  <motion.div
                    className="absolute bottom-4 right-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-orange transition-colors duration-300" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
