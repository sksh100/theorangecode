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

  // Sphere expansion animation - smaller scale
  const sphereScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.6, 0.7, 0.8])
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1])
  
  // Text on sphere animation
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  
  // Individual value animations (staggered) - create all transforms upfront
  const valueProgresses = values.map((_, index) => 
    useTransform(scrollYProgress, 
      [0.2 + index * 0.05, 0.4 + index * 0.05], 
      [0, 1]
    )
  )

  // Create position and animation transforms for each value - increased radius to prevent overlap
  const valueTransforms = values.map((_, index) => {
    const position = getValuePosition(index, values.length, 280) // Reduced from 400 to 280, but cards are smaller
    const progress = valueProgresses[index]
    return {
      x: useTransform(progress, [0, 1], [0, position.x]),
      y: useTransform(progress, [0, 1], [0, position.y]),
      opacity: progress,
      scale: useTransform(progress, [0, 1], [0.8, 1])
    }
  })

  // Glow ring transforms - smaller
  const glowRing1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3])
  const glowRing1Opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.15])
  const glowRing2Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.6])
  const glowRing2Opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.08])

  return (
    <div ref={containerRef} className="relative w-full min-h-[100vh] flex items-center justify-center py-20">
      {/* Center Sphere */}
      <motion.div
        style={{
          scale: sphereScale,
          opacity: sphereOpacity
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          {/* Outer glow rings - orange themed */}
          <motion.div
            style={{
              scale: glowRing1Scale,
              opacity: glowRing1Opacity,
              background: 'radial-gradient(circle, rgba(255, 145, 77, 0.4), rgba(255, 145, 77, 0.3), rgba(255, 145, 77, 0.4))'
            }}
            className="absolute inset-0 rounded-full blur-3xl"
          />
          <motion.div
            style={{
              scale: glowRing2Scale,
              opacity: glowRing2Opacity,
              background: 'radial-gradient(circle, rgba(255, 145, 77, 0.25), rgba(255, 145, 77, 0.2), rgba(255, 145, 77, 0.25))'
            }}
            className="absolute inset-0 rounded-full blur-3xl"
          />
          
          {/* Main 3D sphere - orange gradient */}
          <div className="relative w-full h-full rounded-full backdrop-blur-sm border-2 border-orange/40 shadow-2xl" style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 145, 77, 0.7), rgba(255, 145, 77, 0.5), rgba(255, 145, 77, 0.6))',
            boxShadow: '0 0 40px rgba(255, 145, 77, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.1)'
          }}>
            {/* 3D lighting effects */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/30" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.2),transparent_60%)]" />
            
            {/* "Our Values" text on sphere */}
            <motion.div
              style={{
                opacity: textOpacity,
                scale: textScale
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <h3 className="text-white font-bold text-lg md:text-xl tracking-wide drop-shadow-lg">
                  Our
                </h3>
                <h3 className="text-white font-bold text-lg md:text-xl tracking-wide drop-shadow-lg">
                  Values
                </h3>
              </div>
            </motion.div>
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-72"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative p-5 md:p-6 rounded-xl border ${
                  value.color === 'orange' 
                    ? 'border-orange/30 bg-gradient-to-br from-orange/10 via-orange/5 to-transparent' 
                    : 'border-azure-blue/30 bg-gradient-to-br from-azure-blue/10 via-azure-blue/5 to-transparent'
                } backdrop-blur-md shadow-xl`}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-xl ${
                  value.color === 'orange' ? 'bg-orange/20' : 'bg-azure-blue/20'
                } blur-xl opacity-50`} />
                
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
                  <p className="text-white/90 leading-relaxed text-xs md:text-sm">
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

