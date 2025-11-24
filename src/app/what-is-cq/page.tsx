'use client'

import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { Brain, Eye, Heart, Target, Sparkles, ArrowRight, CheckCircle, Globe } from 'lucide-react'

export default function WhatIsCQPage() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const pillars = [
    {
      icon: Brain,
      title: 'Cognitive Understanding',
      description: 'The ability to understand different cultural norms, values, and practices',
      color: 'from-orange/20 to-orange/10'
    },
    {
      icon: Heart,
      title: 'Emotional Awareness',
      description: 'Recognizing and respecting emotional responses across cultures',
      color: 'from-azure-blue/20 to-azure-blue/10'
    },
    {
      icon: Target,
      title: 'Behavioural Flexibility',
      description: 'Adapting your actions and communication style appropriately',
      color: 'from-orange/20 to-azure-blue/20'
    }
  ]

  const benefits = [
    'Recognise why people communicate the way they do',
    'Understand how decisions are made in different contexts',
    'Know what behaviours are considered respectful',
    'Build trust through culturally appropriate actions',
    'Adjust your approach while remaining authentic',
    'Navigate multicultural environments with confidence'
  ]

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <ModernNavbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-azure-blue/5 via-transparent to-orange/5" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="text-azure-blue text-sm font-semibold tracking-wider uppercase">
                  Understanding CQ
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent">
                  What is Cultural Intelligence
                </span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl mx-auto space-y-16"
            >
              {/* Definition Section */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 via-white/30 to-white/20 opacity-60" />
                <div className="pl-8 space-y-6">
                  <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-medium">
                    Cultural intelligence is a <span className="text-white font-bold">scientifically recognised ability</span> that allows individuals to interpret, adapt to, and effectively engage with people from different cultural backgrounds.
                  </p>
                  <p className="text-lg leading-relaxed text-white/80">
                    It is a structured skill built on <span className="text-white/95 font-semibold">cognitive understanding</span>, <span className="text-white/95 font-semibold">emotional awareness</span>, and <span className="text-white/95 font-semibold">behavioural flexibility</span>.
                  </p>
                </div>
              </motion.div>

              {/* Three Pillars Section */}
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
                  The Three Pillars of CQ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <pillar.icon className="w-8 h-8 text-white/80" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                        <p className="text-white/70 leading-relaxed">{pillar.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* In Practice Section */}
              <motion.div variants={itemVariants} className="relative">
                <div className="relative p-8 md:p-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-8 h-8 text-white/80" />
                      <h2 className="text-2xl md:text-3xl font-bold text-white">In Practice</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-white/90 mb-6">
                      In practice, cultural intelligence helps you recognise why people communicate the way they do, how they make decisions, what they find respectful, and which behaviours build trust. It enables you to adjust your approach with sensitivity while remaining authentic and professional.
                    </p>
                    
                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <CheckCircle className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                          <p className="text-white/80">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* UAE & GCC Context Section */}
              <motion.div variants={itemVariants} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="w-10 h-10 text-white/80" />
                      <h2 className="text-3xl font-bold text-white">In the UAE and GCC</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-white/80">
                      In the UAE and GCC, cultural intelligence is <span className="text-white font-bold">indispensable</span>. The region is shaped by Emirati traditions, Islamic values, and one of the most international populations in the world.
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="p-6 rounded-xl bg-white/5 border-l-4 border-white/30 backdrop-blur-sm"
                    >
                      <p className="text-white/90 font-semibold">
                        Without the ability to navigate these layers, misunderstandings become common, teams face unnecessary tension, and communication loses its impact.
                      </p>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-orange" />
                          <span className="text-white font-semibold">Emirati Traditions</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-azure-blue" />
                          <span className="text-white font-semibold">Islamic Values</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-orange" />
                          <span className="text-white font-semibold">200+ Nationalities</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-azure-blue" />
                          <span className="text-white font-semibold">Multicultural Environment</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-white/60 text-sm italic">
                          "One of the most international populations in the world"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Strategic Advantage Section */}
              <motion.div
                variants={itemVariants}
                className="relative p-10 md:p-16 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="relative z-10 text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block"
                  >
                    <Eye className="w-16 h-16 text-white/80 mx-auto mb-6" />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    The Strategic Advantage
                  </h2>
                  <div className="max-w-3xl mx-auto space-y-4 text-lg leading-relaxed text-white/90">
                    <p>
                      With cultural intelligence, your <span className="text-white font-semibold">interactions become clearer</span>, your <span className="text-white font-semibold">leadership becomes more effective</span>, and your <span className="text-white font-semibold">relationships become stronger</span>.
                    </p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-2xl md:text-3xl font-bold text-white pt-4"
                    >
                      It is not an optional skill. It is a strategic advantage for anyone working, leading, or living in a multicultural environment.
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                variants={itemVariants}
                className="text-center py-8"
              >
                <motion.a
                  href="/masterclasses"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl cta-button-glow text-white font-bold text-lg"
                >
                  <span>Explore Our Masterclasses</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.main>

      <ModernFooter />
    </div>
  )
}

