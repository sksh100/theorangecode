'use client'

import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { Brain, Eye, Heart, Target, Sparkles, ArrowRight, CheckCircle, Globe } from 'lucide-react'
import Script from 'next/script'

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
    <>
      {/* Article Schema */}
      <Script
        id="what-is-cq-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "What is Cultural Intelligence (CQ)? | Cultural Intelligence UAE",
            "description": "Cultural intelligence (CQ) is the ability to interpret, adapt to, and effectively engage with people from different cultural backgrounds. Essential for professionals in the UAE, Dubai, and Abu Dhabi. Learn about its three pillars: cognitive understanding, emotional awareness, and behavioural flexibility.",
            "keywords": "cultural intelligence, cultural intelligence UAE, cultural intelligence Dubai, cultural intelligence Abu Dhabi, CQ, cultural competence UAE",
            "url": "https://www.theorangecode.com/what-is-cq",
            "image": "https://www.theorangecode.com/og-image",
            "author": {
              "@type": "Organization",
              "name": "The Orange Code"
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Orange Code",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.theorangecode.com/android-chrome-512x512.png"
              }
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntityOfPage": "https://www.theorangecode.com/what-is-cq"
          })
        }}
      />

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
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 px-4 sm:px-0 break-words">
                <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent">
                  What is <span className="whitespace-normal sm:whitespace-nowrap">Cultural Intelligence</span> in the UAE?
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 mb-4">
                Cultural Intelligence (CQ) for professionals in Dubai, Abu Dhabi, and the United Arab Emirates
              </p>
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
                <div className="pl-4 sm:pl-8 space-y-6 px-4 sm:px-0">
                  <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/90 font-medium break-words">
                    Cultural intelligence is a <span className="text-orange font-bold">scientifically recognised ability</span> that allows individuals to interpret, adapt to, and effectively engage with people from different cultural backgrounds.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed text-white/80 break-words">
                    It is a structured skill built on <span className="text-azure-blue font-semibold">cognitive understanding</span>, <span className="text-orange font-semibold">emotional awareness</span>, and <span className="text-azure-blue font-semibold">behavioural flexibility</span>.
                  </p>
                </div>
              </motion.div>

              {/* Three Pillars Section */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center px-4 sm:px-0">
                  <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent break-words">
                    The Three Pillars of CQ
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pillars.map((pillar, index) => {
                    const iconColor = index === 0 ? 'text-orange' : index === 1 ? 'text-azure-blue' : 'text-azure-blue'
                    const hoverBg = index === 0 ? 'group-hover:bg-orange/20' : index === 1 ? 'group-hover:bg-azure-blue/20' : 'group-hover:bg-azure-blue/20'
                    return (
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
                          <div className={`w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${hoverBg}`}>
                            <pillar.icon className={`w-8 h-8 ${iconColor}`} />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                          <p className="text-white/70 leading-relaxed">{pillar.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* In Practice Section */}
              <motion.div variants={itemVariants} className="relative">
                <div className="relative p-6 sm:p-8 md:p-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm mx-auto max-w-4xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-orange flex-shrink-0" />
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">
                        <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                          In Practice
                        </span>
                      </h2>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-white/90 mb-6 break-words">
                      In practice, Cultural Intelligence helps you recognise why people communicate the way they do, how they make decisions, what they find respectful and which behaviours build trust. It enables you to adjust your approach with sensitivity while remaining authentic and professional.
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
                          className="flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                        >
                          <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${index % 2 === 0 ? 'text-orange' : 'text-azure-blue'}`} />
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
                      <Globe className="w-10 h-10 text-azure-blue" />
                      <h2 className="text-3xl font-bold">
                        <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                          Cultural Intelligence in the United Arab Emirates
                        </span>
                      </h2>
                    </div>
                    <p className="text-lg leading-relaxed text-white/80">
                      <strong className="text-white">Cultural Intelligence UAE</strong> is essential for anyone who wants to live, work, or build meaningful relationships in the region. Life here is shaped by Emirati traditions, Islamic values, and one of the most diverse international communities in the world. Understanding how these layers interact helps people feel grounded, respected, and confident in their daily interactions. Whether you're in Dubai, Abu Dhabi, or any of the seven emirates, <strong className="text-orange">cultural intelligence</strong> is your foundation for success.
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border-l-4 border-orange"
                    >
                      <p className="text-white/90 font-semibold">
                        Without cultural understanding, confusion rises, relationships weaken, workplaces lose harmony, communication falls short. Cultural Intelligence helps individuals, families, and professionals navigate daily life with confidence, clarity, and natural ease.
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
                          <span className="text-white font-semibold">Emirati Cultural Foundations</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-azure-blue" />
                          <span className="text-white font-semibold">Islamic Values</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-orange" />
                          <span className="text-white font-semibold">International Hub</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-azure-blue" />
                          <span className="text-white font-semibold">Multilayered Social Codes</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange via-azure-blue to-orange opacity-60" />
                          <p className="text-base md:text-lg italic leading-relaxed font-medium">
                            <span className="text-orange/80 text-2xl leading-none mr-1">"</span>
                            <span className="text-orange">A society built on deep roots, shared values, and an exceptional mix of global perspectives.</span>
                            <span className="text-orange/80 text-2xl leading-none ml-1">"</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Strategic Advantage Section */}
              <motion.div
                variants={itemVariants}
                className="relative p-10 md:p-16 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm mx-auto max-w-4xl"
              >
                <div className="relative z-10 text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block"
                  >
                    <Eye className="w-16 h-16 text-azure-blue mx-auto mb-3" />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      The Strategic Advantage
                    </span>
                  </h2>
                  <div className="max-w-3xl mx-auto space-y-4 text-lg leading-relaxed text-white/90">
                    <p>
                      With cultural intelligence, your <span className="text-orange font-semibold">interactions become clearer</span>, your <span className="text-azure-blue font-semibold">leadership becomes more effective</span>, and your <span className="text-orange font-semibold">relationships become stronger</span>.
                    </p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-2xl md:text-3xl font-bold text-white pt-4"
                    >
                      It is a <span className="text-orange">strategic advantage</span> for anyone navigating the cultural depth, ambition, and diversity of the UAE.
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
                  <span>Elevate Your Cultural Intelligence</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.main>

      <ModernFooter />
    </div>
    </>
  )
}

