'use client'

import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { CulturalIntelligenceImpactChart } from '@/components/CulturalIntelligenceImpactChart'
import { TrendingUp, Users, Globe, Target, CheckCircle, ArrowRight, BarChart3, Lightbulb, Shield, Zap, Heart } from 'lucide-react'
import Image from 'next/image'

export default function WhyCulturalIntelligencePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
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

  const communicationExamples = [
    {
      region: 'Western Professionals',
      countries: 'Netherlands, Germany, United States',
      style: 'Direct clarity',
      perception: 'May be perceived as too sharp or transactional in the Gulf'
    },
    {
      region: 'Asian Professionals',
      countries: 'Japan, Singapore, South Asia',
      style: 'Subtle suggestions, polite pauses',
      perception: 'May be misinterpreted as uncertainty or lack of clarity'
    }
  ]

  const benefits = [
    'Reduces misunderstandings',
    'Strengthens teams',
    'Improves client interactions',
    'Increases effectiveness in multicultural environments',
    'Supports every part of your life in the Middle East'
  ]

  const practicalApplications = [
    { icon: Users, title: 'Leading Teams', description: 'Across multiple nationalities' },
    { icon: Target, title: 'Negotiating', description: 'With local partners' },
    { icon: Heart, title: 'Forming Friendships', description: 'Building meaningful connections' }
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
          <div className="absolute inset-0 bg-gradient-to-b from-orange/5 via-transparent to-azure-blue/5" />
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
                <span className="text-orange text-sm font-semibold tracking-wider uppercase">
                  The Strategic Advantage
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  WHY Cultural Intelligence Matters
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
              className="max-w-5xl mx-auto space-y-20"
            >
              {/* Opening Statement */}
              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-medium">
                  Success in the UAE and the wider GCC is built on <span className="text-orange font-bold">trust</span>, <span className="text-azure-blue font-bold">clarity</span>, and <span className="text-orange font-bold">respect</span>.
                </p>
                <p className="text-lg leading-relaxed text-white/80">
                  Every interaction here is shaped by diverse communication styles, values, leadership expectations, and social behaviours.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm"
                  >
                    <p className="text-white/90 font-semibold">
                      <span className="text-white">Without cultural intelligence:</span> These differences create confusion that slows progress.
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm"
                  >
                    <p className="text-white/90 font-semibold">
                      <span className="text-white">With cultural intelligence:</span> They turn into an advantage that strengthens relationships and drives meaningful success.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Research Section with Image Placeholder */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-8 h-8 text-orange" />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      Time Perception in the UAE
                    </span>
                  </h2>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border-l-4 border-orange/30 backdrop-blur-sm">
                  <p className="text-white/90 leading-relaxed">
                    Studies have shown that time is perceived very differently across cultures. Many Western countries follow a linear view of time, where schedules stay strict, tasks occur in sequence, and interruptions are avoided. The UAE follows a more flexible view of time, where priorities shift naturally, conversations are not rushed, and relationships carry more weight than the clock. Cultural intelligence helps you understand these differences without judgment, adjust with ease, and move through the region with clarity instead of confusion.
                  </p>
                </div>
              </motion.div>

              {/* Communication Examples Section */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-8 h-8 text-azure-blue" />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      Real-World Examples
                    </span>
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-white/80 mb-8">
                  Consider a few examples relevant to the region.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {communicationExamples.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-bold text-white mb-3">{example.region}</h3>
                      <p className="text-white/70 text-sm font-semibold mb-2">{example.countries}</p>
                      <p className="text-white/80 mb-3">
                        <span className="font-semibold text-white">Style:</span> {example.style}
                      </p>
                      <p className="text-white/70 text-sm italic">
                        {example.perception}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="p-6 rounded-xl bg-white/5 border-l-4 border-white/30 backdrop-blur-sm mt-8"
                >
                  <p className="text-white/90 leading-relaxed">
                    These differences appear small but they influence <span className="font-semibold text-white">decisions, timelines, trust, and long term cooperation</span>.
                  </p>
                </motion.div>
              </motion.div>

              {/* Leadership Section with Video Placeholder */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-8 h-8 text-orange" />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      How Cultures Differ in Approaching Confrontation
                    </span>
                  </h2>
                </div>
                
                {/* Video Placeholder */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-10 h-10 text-white/30" />
                      </div>
                      <p className="text-white/50 text-sm">Video Placeholder</p>
                      <p className="text-white/40 text-xs mt-2">Leadership styles across cultures</p>
                    </div>
                  </div>
                </motion.div>

                <p className="text-lg leading-relaxed text-white/80">
                  Studies have shown that cultures vary greatly in how they approach confrontation. Some societies value open debate, direct feedback, and clear disagreement, even in professional settings. Others prioritise harmony, diplomacy, and emotional awareness, and view direct confrontation as unnecessary or even disrespectful. The UAE aligns more closely with the latter. Communication here is considerate, layered, and guided by respect for relationships. Feedback is often softened, disagreements are expressed subtly, and the goal is to maintain dignity on all sides.
                </p>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-white/90 leading-relaxed font-medium">
                    Cultural intelligence helps you recognise these signals, respond with sensitivity, and communicate effectively without causing tension or misunderstanding.
                  </p>
                </div>
              </motion.div>

              {/* What Cultural Intelligence Provides */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 via-white/30 to-white/20 opacity-60" />
                <div className="pl-8 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-8 h-8 text-orange" />
                    <h2 className="text-3xl font-bold">
                      <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                        What Cultural Intelligence Provides
                      </span>
                    </h2>
                  </div>
                  <p className="text-lg leading-relaxed text-white/80">
                    Cultural intelligence provides the ability to navigate these dynamics with confidence. It helps you understand:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {[
                      'Why people behave the way they do',
                      'How they interpret respect',
                      'How they manage time',
                      'How they build trust'
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                      >
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${index % 2 === 0 ? 'text-orange' : 'text-azure-blue'}`} />
                        <p className="text-white/80">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-white/80 mt-6">
                    It gives you the awareness to <span className="text-orange font-semibold">adapt your communication without losing your authenticity</span>. This is essential in a region where your <span className="text-azure-blue font-semibold">network is often as valuable as your skill set</span>.
                  </p>
                </div>
              </motion.div>

              {/* Practical Benefits with Image Placeholder */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-azure-blue" />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      Practical Benefits
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed text-white/80">
                      In practical terms, cultural intelligence:
                    </p>
                    <div className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <ArrowRight className={`w-5 h-5 flex-shrink-0 mt-1 ${index % 2 === 0 ? 'text-orange' : 'text-azure-blue'}`} />
                          <p className="text-white/90">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Intelligence Impact Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <CulturalIntelligenceImpactChart />
                  </motion.div>
                </div>
              </motion.div>

              {/* Practical Applications */}
              <motion.div variants={itemVariants} className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                    Supporting Every Part of Your Life
                  </span>
                </h2>
                <p className="text-lg leading-relaxed text-white/80 text-center max-w-3xl mx-auto">
                  From leading teams across nationalities to negotiating with local partners or simply forming friendships, cultural intelligence allows you to connect in a meaningful, respectful, and strategic way.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {practicalApplications.map((app, index) => {
                    const iconColor = index === 0 ? 'text-orange' : index === 1 ? 'text-azure-blue' : 'text-orange'
                    const hoverBg = index === 0 ? 'group-hover:bg-orange/20' : index === 1 ? 'group-hover:bg-azure-blue/20' : 'group-hover:bg-orange/20'
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm text-center group"
                      >
                        <div className={`w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${hoverBg}`}>
                          <app.icon className={`w-7 h-7 ${iconColor}`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{app.title}</h3>
                        <p className="text-white/70">{app.description}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Closing Statement */}
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
                    <Target className="w-16 h-16 text-orange mx-auto mb-6" />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      The Gulf Region Rewards Understanding
                    </span>
                  </h2>
                  <p className="text-xl md:text-2xl leading-relaxed text-white/90 max-w-3xl mx-auto">
                    The Gulf region rewards those who understand its cultural landscape. When you learn how to navigate it, <span className="text-orange font-bold">opportunities expand</span>, <span className="text-azure-blue font-bold">relationships deepen</span>, and <span className="text-orange font-bold">success becomes sustainable</span>.
                  </p>
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
                  <span>Start Your Cultural Intelligence Journey</span>
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
