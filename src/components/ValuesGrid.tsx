'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

export function ValuesGrid() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  if (!isMounted) {
    return (
      <div className="w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((value) => (
            <div key={value.title} className="relative h-full p-8 rounded-2xl border backdrop-blur-md opacity-0">
              <div className="w-16 h-16 rounded-xl mb-6" />
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-white/80 leading-relaxed text-base">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            <div className={`relative h-full p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
              value.color === 'orange'
                ? 'border-orange/20 bg-gradient-to-br from-orange/5 via-orange/3 to-transparent hover:border-orange/40 hover:bg-gradient-to-br hover:from-orange/10 hover:via-orange/5 hover:to-transparent'
                : 'border-azure-blue/20 bg-gradient-to-br from-azure-blue/5 via-azure-blue/3 to-transparent hover:border-azure-blue/40 hover:bg-gradient-to-br hover:from-azure-blue/10 hover:via-azure-blue/5 hover:to-transparent'
            }`}>
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${
                value.color === 'orange' ? 'bg-orange/20' : 'bg-azure-blue/20'
              }`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center ${
                    value.color === 'orange'
                      ? 'bg-gradient-to-br from-orange/30 to-orange/10'
                      : 'bg-gradient-to-br from-azure-blue/30 to-azure-blue/10'
                  }`}
                >
                  <value.icon className={`w-8 h-8 ${
                    value.color === 'orange' ? 'text-orange' : 'text-azure-blue'
                  }`} />
                </motion.div>

                {/* Title */}
                <h3 className={`text-2xl font-bold mb-4 ${
                  value.color === 'orange' ? 'text-orange' : 'text-azure-blue'
                }`}>
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 leading-relaxed text-base">
                  {value.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-2xl ${
                value.color === 'orange'
                  ? 'bg-gradient-to-br from-orange/10 to-transparent'
                  : 'bg-gradient-to-br from-azure-blue/10 to-transparent'
              }`} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

