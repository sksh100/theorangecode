'use client'

import { motion } from 'framer-motion'
import { Users, MessageSquare, TrendingUp, Globe, Heart } from 'lucide-react'

export function CulturalIntelligenceImpactChart() {
  const impactAreas = [
    { 
      label: 'Team Collaboration',
      value: 85,
      icon: Users,
      color: 'orange',
      delay: 0
    },
    { 
      label: 'Communication',
      value: 92,
      icon: MessageSquare,
      color: 'azure-blue',
      delay: 0.1
    },
    { 
      label: 'Business Results',
      value: 78,
      icon: TrendingUp,
      color: 'orange',
      delay: 0.2
    },
    { 
      label: 'Cross-Cultural Effectiveness',
      value: 88,
      icon: Globe,
      color: 'azure-blue',
      delay: 0.3
    },
    { 
      label: 'Personal Relationships',
      value: 90,
      icon: Heart,
      color: 'orange',
      delay: 0.4
    }
  ]

  return (
    <div className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h4 className="text-lg font-bold text-white/90 mb-2">Impact of Cultural Intelligence</h4>
        <p className="text-sm text-white/60">Improvement across key areas</p>
      </motion.div>

      {/* Chart Bars */}
      <div className="space-y-5">
        {impactAreas.map((area, index) => (
          <motion.div
            key={area.label}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: area.delay, duration: 0.5 }}
            className="relative"
          >
            {/* Label and Icon */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-${area.color}/20 flex items-center justify-center`}>
                  <area.icon className={`w-4 h-4 text-${area.color}`} />
                </div>
                <span className="text-sm text-white/80 font-medium">{area.label}</span>
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: area.delay + 0.5, duration: 0.3 }}
                className={`text-sm font-bold text-${area.color}`}
              >
                +{area.value}%
              </motion.span>
            </div>

            {/* Progress Bar Background */}
            <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
              {/* Animated Fill */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${area.value}%` }}
                viewport={{ once: true }}
                transition={{ 
                  delay: area.delay + 0.2, 
                  duration: 1.2, 
                  ease: "easeOut" 
                }}
                className={`h-full bg-gradient-to-r ${
                  area.color === 'orange' 
                    ? 'from-orange to-orange-luminous' 
                    : 'from-azure-blue to-bright-blue'
                } rounded-full relative overflow-hidden`}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: area.delay + 1
                  }}
                />
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: area.delay + 0.5 }}
                className={`absolute top-0 left-0 h-full w-${area.value} bg-${area.color} blur-md opacity-30 rounded-full`}
                style={{ width: `${area.value}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-center"
      >
        <div>
          <p className="text-2xl font-bold bg-gradient-to-r from-orange to-orange-luminous bg-clip-text text-transparent">
            87%
          </p>
          <p className="text-xs text-white/60 mt-1">Average Improvement</p>
        </div>
        <div>
          <p className="text-2xl font-bold bg-gradient-to-r from-azure-blue to-bright-blue bg-clip-text text-transparent">
            40%
          </p>
          <p className="text-xs text-white/60 mt-1">Better Collaboration</p>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-orange/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-radial from-azure-blue/10 to-transparent rounded-full blur-2xl pointer-events-none" />
    </div>
  )
}

