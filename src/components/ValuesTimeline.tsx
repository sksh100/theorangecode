'use client'

import { motion } from 'framer-motion'
import { Heart, Target, Users, CheckCircle, Globe, Eye, LucideIcon } from 'lucide-react'

interface Value {
  title: string
  description: string
  icon: LucideIcon
  color: 'orange' | 'azure-blue'
  gradient: string
}

const values: Value[] = [
  {
    title: 'Respect for Cultural Foundations',
    description: 'We honour the traditions, values and social structures that define life in the UAE and the wider Gulf. Respect is the basis of trust, and trust is the starting point for every meaningful connection.',
    icon: Heart,
    color: 'orange',
    gradient: 'from-orange/30 via-orange/20 to-transparent'
  },
  {
    title: 'Clarity in Communication',
    description: 'We believe communication should be intentional, culturally attuned and mindful of context. Clear expression reduces misunderstandings and strengthens both professional and personal relationships.',
    icon: Target,
    color: 'azure-blue',
    gradient: 'from-azure-blue/30 via-azure-blue/20 to-transparent'
  },
  {
    title: 'Connection Through Empathy',
    description: 'We recognise that behind every interaction is a person shaped by their own experiences, norms and emotions. Empathy allows us to bridge distances, build rapport and foster genuine collaboration.',
    icon: Users,
    color: 'orange',
    gradient: 'from-orange/30 via-orange/20 to-transparent'
  },
  {
    title: 'Integrity in Action',
    description: 'We act with professionalism and sincerity, ensuring our behaviour reflects the values of the region and the standards of those we serve. Integrity drives credibility, and credibility builds long-term trust.',
    icon: CheckCircle,
    color: 'azure-blue',
    gradient: 'from-azure-blue/30 via-azure-blue/20 to-transparent'
  },
  {
    title: 'Adaptability Across Cultures',
    description: 'We embrace the reality of a multicultural environment. Flexibility allows us to adjust, learn and thrive alongside diverse cultural norms, expectations and ways of thinking.',
    icon: Globe,
    color: 'orange',
    gradient: 'from-orange/30 via-orange/20 to-transparent'
  },
  {
    title: 'Openness to New Perspectives',
    description: 'We remain open to perspectives beyond our own. By approaching each culture with curiosity rather than judgment, we build the bridge that leads to deeper understanding and more meaningful connection.',
    icon: Eye,
    color: 'azure-blue',
    gradient: 'from-azure-blue/30 via-azure-blue/20 to-transparent'
  }
]

export function ValuesTimeline() {
  return (
    <div className="relative w-full py-16">
      {/* Connecting line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-orange/50 via-azure-blue/50 to-orange/50 hidden md:block" />
      
      <div className="relative max-w-5xl mx-auto space-y-24">
        {values.map((value, index) => {
          const isEven = index % 2 === 0
          
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center gap-8 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Icon on timeline */}
              <div className="hidden md:flex relative z-10 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`w-20 h-20 rounded-full ${
                    value.color === 'orange'
                      ? 'bg-gradient-to-br from-orange/40 to-orange/20'
                      : 'bg-gradient-to-br from-azure-blue/40 to-azure-blue/20'
                  } flex items-center justify-center border-4 border-primary-dark shadow-xl backdrop-blur-sm`}
                >
                  <value.icon className={`w-10 h-10 ${
                    value.color === 'orange' ? 'text-orange' : 'text-azure-blue'
                  }`} />
                </motion.div>
                {/* Static glow effect */}
                <div className={`absolute inset-0 rounded-full ${
                  value.color === 'orange' ? 'bg-orange/30' : 'bg-azure-blue/30'
                } blur-xl -z-10 opacity-60`} />
              </div>

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className={`flex-1 relative ${
                  isEven ? 'md:ml-0 md:mr-auto' : 'md:mr-0 md:ml-auto'
                }`}
              >
                <div className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                  value.color === 'orange'
                    ? 'border-orange/30 bg-gradient-to-br from-orange/10 via-orange/5 to-transparent hover:border-orange/50'
                    : 'border-azure-blue/30 bg-gradient-to-br from-azure-blue/10 via-azure-blue/5 to-transparent hover:border-azure-blue/50'
                }`}>
                  {/* Static background gradient */}
                  <div className={`absolute inset-0 rounded-2xl opacity-50 bg-gradient-to-br ${
                    value.color === 'orange' 
                      ? 'from-orange/20 to-transparent' 
                      : 'from-azure-blue/20 to-transparent'
                  }`} />
                  
                  {/* Mobile icon */}
                  <div className="md:hidden mb-6">
                    <div className={`w-16 h-16 rounded-xl ${
                      value.color === 'orange'
                        ? 'bg-gradient-to-br from-orange/30 to-orange/10'
                        : 'bg-gradient-to-br from-azure-blue/30 to-azure-blue/10'
                    } flex items-center justify-center`}>
                      <value.icon className={`w-8 h-8 ${
                        value.color === 'orange' ? 'text-orange' : 'text-azure-blue'
                      }`} />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                      value.color === 'orange' ? 'text-orange' : 'text-azure-blue'
                    }`}>
                      {value.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-base md:text-lg">
                      {value.description}
                    </p>
                  </div>

                  {/* Decorative corner elements */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-2xl ${
                    value.color === 'orange'
                      ? 'bg-gradient-to-br from-orange/20 to-transparent'
                      : 'bg-gradient-to-br from-azure-blue/20 to-transparent'
                  }`} />
                  <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-tr-2xl ${
                    value.color === 'orange'
                      ? 'bg-gradient-to-tl from-orange/10 to-transparent'
                      : 'bg-gradient-to-tl from-azure-blue/10 to-transparent'
                  }`} />
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

