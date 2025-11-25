'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Target, Users, CheckCircle, Globe, Eye, LucideIcon } from 'lucide-react'

interface Value {
  title: string
  description: string
  icon: LucideIcon
  color: 'orange' | 'azure-blue'
}

const values: Value[] = [
  {
    title: 'Respect for Cultural Foundations',
    description: 'We honour the traditions, values and social structures that define life in the UAE and the wider Gulf. Respect is the basis of trust, and trust is the starting point for every meaningful connection.',
    icon: Heart,
    color: 'orange'
  },
  {
    title: 'Clarity in Communication',
    description: 'We believe communication should be intentional, culturally attuned and mindful of context. Clear expression reduces misunderstandings and strengthens both professional and personal relationships.',
    icon: Target,
    color: 'azure-blue'
  },
  {
    title: 'Connection Through Empathy',
    description: 'We recognise that behind every interaction is a person shaped by their own experiences, norms and emotions. Empathy allows us to bridge distances, build rapport and foster genuine collaboration.',
    icon: Users,
    color: 'orange'
  },
  {
    title: 'Integrity in Action',
    description: 'We act with professionalism and sincerity, ensuring our behaviour reflects the values of the region and the standards of those we serve. Integrity drives credibility, and credibility builds long-term trust.',
    icon: CheckCircle,
    color: 'azure-blue'
  },
  {
    title: 'Adaptability Across Cultures',
    description: 'We embrace the reality of a multicultural environment. Flexibility allows us to adjust, learn and thrive alongside diverse cultural norms, expectations and ways of thinking.',
    icon: Globe,
    color: 'orange'
  },
  {
    title: 'Openness to New Perspectives',
    description: 'We remain open to perspectives beyond our own. By approaching each culture with curiosity rather than judgment, we build the bridge that leads to deeper understanding and more meaningful connection.',
    icon: Eye,
    color: 'azure-blue'
  }
]

export function ValuesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Center sphere animation
  const sphereScale = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  // Values appear in a circular pattern with better spacing
  const getValueProgress = (index: number) => {
    return useTransform(scrollYProgress, 
      [0.15 + index * 0.08, 0.4 + index * 0.08], 
      [0, 1]
    )
  }

  const valueProgresses = values.map((_, index) => getValueProgress(index))

  // Calculate positions in a larger circle to prevent overlap
  const getValuePosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return { x, y }
  }

  return (
    <div ref={containerRef} className="relative w-full min-h-[140vh] flex items-center justify-center py-24">
      {/* Center Sphere with "Our Values" */}
      <motion.div
        style={{
          scale: sphereScale,
          opacity: sphereOpacity
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="relative w-40 h-40 md:w-48 md:h-48">
          {/* Glow effect */}
          <motion.div
            style={{
              scale: useTransform(scrollYProgress, [0, 0.3], [1, 1.2]),
              opacity: useTransform(scrollYProgress, [0, 0.3], [0.6, 0.2]),
              background: 'radial-gradient(circle, rgba(255, 145, 77, 0.5), rgba(255, 145, 77, 0.3), transparent)'
            }}
            className="absolute inset-0 rounded-full blur-2xl"
          />
          
          {/* 3D Orange Sphere */}
          <div 
            className="relative w-full h-full rounded-full border-2 border-orange/40 shadow-2xl"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 145, 77, 0.8), rgba(255, 145, 77, 0.6), rgba(255, 145, 77, 0.7))',
              boxShadow: '0 0 30px rgba(255, 145, 77, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* 3D lighting effects */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/15 to-white/25" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.15),transparent_60%)]" />
            
            {/* "Our Values" text */}
            <motion.div
              style={{
                opacity: textOpacity,
                scale: textOpacity
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <h3 className="text-white font-bold text-base md:text-lg tracking-wide drop-shadow-lg">
                  Our
                </h3>
                <h3 className="text-white font-bold text-base md:text-lg tracking-wide drop-shadow-lg">
                  Values
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Values positioned in a circle with better spacing */}
      <div className="relative w-full h-full">
        {values.map((value, index) => {
          const progress = valueProgresses[index]
          const position = getValuePosition(index, values.length, 320) // Increased radius for better spacing
          
          return (
            <motion.div
              key={value.title}
              style={{
                x: useTransform(progress, [0, 1], [0, position.x]),
                y: useTransform(progress, [0, 1], [0, position.y]),
                opacity: progress,
                scale: useTransform(progress, [0, 1], [0.7, 1])
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-80"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -8 }}
                className={`relative p-6 rounded-xl border ${
                  value.color === 'orange' 
                    ? 'border-orange/30 bg-gradient-to-br from-orange/10 via-orange/5 to-transparent' 
                    : 'border-azure-blue/30 bg-gradient-to-br from-azure-blue/10 via-azure-blue/5 to-transparent'
                } backdrop-blur-md shadow-xl`}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-xl ${
                  value.color === 'orange' ? 'bg-orange/15' : 'bg-azure-blue/15'
                } blur-xl opacity-60`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-lg ${
                    value.color === 'orange'
                      ? 'bg-gradient-to-br from-orange/30 to-orange/10'
                      : 'bg-gradient-to-br from-azure-blue/30 to-azure-blue/10'
                  } flex items-center justify-center mb-3`}>
                    <value.icon className={`w-6 h-6 ${
                      value.color === 'orange' ? 'text-orange' : 'text-azure-blue'
                    }`} />
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold mb-2 ${
                    value.color === 'orange' ? 'text-orange' : 'text-azure-blue'
                  }`}>
                    {value.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

