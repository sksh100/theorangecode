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

// Calculate positions for values in a circle
function getValuePosition(index: number, total: number, radius: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2 // Start from top
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  return { x, y, angle }
}

export function ExpandingValuesSphere() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Sphere expansion animation
  const sphereScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1.2, 1.5])
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1])
  
  // Values appear as sphere expands
  const valuesOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const valuesScale = useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1])
  const valuesY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0])
  
  // Individual value animations (staggered) - create all transforms upfront
  const valueProgresses = values.map((_, index) => 
    useTransform(scrollYProgress, 
      [0.2 + index * 0.05, 0.4 + index * 0.05], 
      [0, 1]
    )
  )

  // Create position and animation transforms for each value
  const valueTransforms = values.map((_, index) => {
    const position = getValuePosition(index, values.length, 400)
    const progress = valueProgresses[index]
    return {
      x: useTransform(progress, [0, 1], [0, position.x]),
      y: useTransform(progress, [0, 1], [0, position.y]),
      opacity: progress,
      scale: useTransform(progress, [0, 1], [0.8, 1])
    }
  })

  // Glow ring transforms
  const glowRing1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5])
  const glowRing1Opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.2])
  const glowRing2Scale = useTransform(scrollYProgress, [0, 0.5], [1, 2])
  const glowRing2Opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.1])

  // Connection lines opacity
  const lineOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 0.2])

  return (
    <div ref={containerRef} className="relative w-full min-h-[120vh] flex items-center justify-center py-32">
      {/* Center Sphere */}
      <motion.div
        style={{
          scale: sphereScale,
          opacity: sphereOpacity
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Outer glow rings */}
          <motion.div
            style={{
              scale: glowRing1Scale,
              opacity: glowRing1Opacity
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-orange/30 via-azure-blue/30 to-orange/30 blur-3xl"
          />
          <motion.div
            style={{
              scale: glowRing2Scale,
              opacity: glowRing2Opacity
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-azure-blue/20 via-orange/20 to-azure-blue/20 blur-3xl"
          />
          
          {/* Main sphere */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-orange/40 via-azure-blue/40 to-orange/40 backdrop-blur-sm border border-white/20 shadow-2xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]" />
          </div>
        </div>
      </motion.div>

      {/* Values positioned around the sphere */}
      <div className="relative w-full h-full">
        {values.map((value, index) => {
          const transforms = valueTransforms[index]
          
          return (
            <motion.div
              key={value.title}
              style={{
                x: transforms.x,
                y: transforms.y,
                opacity: transforms.opacity,
                scale: transforms.scale
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-96"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative p-6 md:p-8 rounded-2xl border ${
                  value.color === 'orange' 
                    ? 'border-orange/30 bg-gradient-to-br from-orange/10 via-orange/5 to-transparent' 
                    : 'border-azure-blue/30 bg-gradient-to-br from-azure-blue/10 via-azure-blue/5 to-transparent'
                } backdrop-blur-md shadow-xl`}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl ${
                  value.color === 'orange' ? 'bg-orange/20' : 'bg-azure-blue/20'
                } blur-xl opacity-50`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl ${
                    value.color === 'orange'
                      ? 'bg-gradient-to-br from-orange/30 to-orange/10'
                      : 'bg-gradient-to-br from-azure-blue/30 to-azure-blue/10'
                  } flex items-center justify-center mb-4`}>
                    <value.icon className={`w-7 h-7 ${
                      value.color === 'orange' ? 'text-orange' : 'text-azure-blue'
                    }`} />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
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

      {/* Connection lines (appear as sphere expands) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {values.map((_, index) => {
          const position = getValuePosition(index, values.length, 400)
          
          return (
            <motion.line
              key={`line-${index}`}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${position.x}px)`}
              y2={`calc(50% + ${position.y}px)`}
              stroke={index % 2 === 0 ? '#ff914d' : '#00d4ff'}
              strokeWidth="2"
              strokeDasharray="5,5"
              style={{ opacity: lineOpacity }}
            />
          )
        })}
      </svg>
    </div>
  )
}

