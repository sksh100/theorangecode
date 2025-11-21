'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Users, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ResourceCard {
  id: string
  title: string
  description: string
  icon: any
  gradient: string
  borderColor: string
  glowColor: string
  link?: string
  size: 'small' | 'large'
}

export function ResourcesSection() {
  const resources: ResourceCard[] = [
    {
      id: 'uae-history',
      title: 'UAE History Guide',
      description: 'Rich heritage and modern development',
      icon: Globe,
      gradient: 'from-orange/20 to-orange/5',
      borderColor: 'border-orange/40',
      glowColor: 'from-orange/30 to-orange/10',
      size: 'small'
    },
    {
      id: 'cultural-guide',
      title: 'Cultural Guide',
      description: 'Essential insights for cultural navigation',
      icon: Users,
      gradient: 'from-bright-blue/20 to-bright-blue/5',
      borderColor: 'border-bright-blue/40',
      glowColor: 'from-bright-blue/30 to-bright-blue/10',
      size: 'small'
    },
    {
      id: 'book-session',
      title: 'Book your session now',
      description: 'Start your transformation journey today',
      icon: Calendar,
      gradient: 'from-orange/20 to-orange/5',
      borderColor: 'border-orange/40',
      glowColor: 'from-orange/30 to-orange/10',
      link: '#book-session',
      size: 'large'
    }
  ]

  return (
    <section className="relative py-24 md:py-32 bg-primary-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-azure-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-2 h-2 bg-orange rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            />
            <span className="text-azure-blue font-semibold text-sm uppercase tracking-wider">
              Resources & Services
            </span>
            <motion.div 
              className="w-2 h-2 bg-azure-blue rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            Explore Our{' '}
            <motion.span 
              className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              viewport={{ once: true }}
            >
              Resources
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Resources Grid - 2x2 layout with bottom card spanning full width */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
        >
          {/* Top Row - Two Small Cards */}
          {resources.slice(0, 2).map((resource, index) => (
            <motion.div
              key={resource.id}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 60,
                  scale: 0.9,
                  rotateX: -15
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={resource.link || '#'} className="block h-full">
                <div className={`glass-card bg-gradient-to-br ${resource.gradient} border ${resource.borderColor} rounded-3xl p-8 h-full transition-all duration-300 group-hover:border-opacity-60 group-hover:scale-[1.02]`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${resource.glowColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {React.createElement(resource.icon, { className: "w-8 h-8 text-white" })}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-orange transition-colors duration-300">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                    {resource.description}
                  </p>

                  {/* Read More Link */}
                  <div className="inline-flex items-center gap-2 text-orange font-semibold group-hover:gap-4 transition-all duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Bottom Row - Full Width Card */}
          <motion.div
            key={resources[2].id}
            variants={{
              hidden: { 
                opacity: 0, 
                y: 60,
                scale: 0.95
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1
              }
            }}
            transition={{ 
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
            className="md:col-span-2 group"
          >
            <Link href={resources[2].link || '#'} className="block h-full">
              <div className={`glass-card bg-gradient-to-br ${resources[2].gradient} border ${resources[2].borderColor} rounded-3xl p-8 md:p-12 transition-all duration-300 group-hover:border-opacity-60 group-hover:scale-[1.01]`}>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${resources[2].glowColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {React.createElement(resources[2].icon, { className: "w-10 h-10 text-white" })}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-orange transition-colors duration-300">
                      {resources[2].title}
                    </h3>
                    <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6">
                      {resources[2].description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-orange font-semibold text-lg group-hover:gap-4 transition-all duration-300">
                      <span>Read More</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

