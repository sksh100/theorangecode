'use client'

import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { Sparkles, Target, Heart, Eye, Users, Globe, ArrowRight, CheckCircle, Zap } from 'lucide-react'

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

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
                  About Us
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  The Orange Code
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
              className="max-w-4xl mx-auto space-y-12"
            >
              {/* Introduction Paragraphs */}
              <motion.div variants={itemVariants} className="space-y-6 text-lg leading-relaxed text-white/90">
                <p>
                  The UAE and the wider GCC are places of extraordinary opportunity. Yet many expatriates arrive with the same question. <span className="text-orange font-semibold">How do I truly understand this region.</span> How do I build meaningful relationships. How do I communicate with confidence in a world shaped by traditions, values, and unspoken rules that are different from my own.
                </p>
                <p className="text-xl font-semibold text-orange">
                  The Orange Code was created to answer these questions.
                </p>
              </motion.div>

              {/* Story Section with Interactive Elements */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange via-azure-blue to-orange opacity-30" />
                <div className="pl-8 space-y-6 text-white/80 leading-relaxed">
                  <p>
                    For years, our founders observed the same pattern. Highly skilled professionals struggled to connect with local partners. Companies misinterpreted social cues during important negotiations. Friendships and business opportunities faded simply because people spoke without understanding the cultural world behind the words.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="bg-gradient-to-r from-orange/10 to-azure-blue/10 border-l-4 border-orange p-6 rounded-r-xl"
                  >
                    <p className="text-white font-semibold">
                      At the same time, many newcomers overlooked a truth that defines life in the UAE. It is not only about interacting with Emiratis. The social fabric of this region is woven from more than two hundred nationalities. Every day you encounter layers of cultural expectations that are constantly in play. When we forget this, misunderstandings rise and collaboration becomes harder than it needs to be.
                    </p>
                  </motion.div>
                  <p className="text-xl font-bold text-orange">
                    The Orange Code bridges this gap.
                  </p>
                </div>
              </motion.div>

              {/* Credentials Section */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange/20 to-azure-blue/20 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-orange" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">ESSEC France Professionals</h3>
                      <p className="text-sm text-white/60">Training Partner</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-azure-blue/20 to-orange/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-azure-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">The School of Washington for Protocols</h3>
                      <p className="text-sm text-white/60">Training Partner</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* What We Do Section */}
              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-white/80 leading-relaxed">
                  Our team has been trained by ESSEC France Professionals and The School of Washington for Protocols. We work with individuals, global companies, and several European embassies to prepare their staff for life and business in the UAE and the wider Gulf region. With years of experience on the ground, we understand how culture influences communication, decision making, leadership, and trust in this part of the world. Our approach is practical, research based, and deeply connected to the realities of daily life here.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {['Individuals', 'Global Companies', 'European Embassies', 'Teams'].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <CheckCircle className="w-6 h-6 text-orange mx-auto mb-2" />
                      <p className="text-sm font-semibold text-white">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Closing Statement */}
              <motion.div
                variants={itemVariants}
                className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10" />
                <div className="relative z-10 space-y-4">
                  <p className="text-white/90 leading-relaxed text-lg">
                    Whether you are relocating, expanding your business, strengthening your team, or preparing for diplomatic activities, The Orange Code guides you with clarity, precision, and cultural insight. Our goal is simple. To help you feel confident, connected, and at home in one of the most diverse regions on earth.
                  </p>
                  <p className="text-2xl font-bold text-orange">
                    Because success in the Gulf is not only about what you know. It is about how you connect.
                  </p>
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center py-8"
              >
                <div className="flex items-center gap-4 w-full max-w-md">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange to-transparent" />
                  <Sparkles className="w-6 h-6 text-orange" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange to-transparent" />
                </div>
              </motion.div>

              {/* Mission and Vision Section */}
              <motion.div variants={itemVariants} className="space-y-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                    Mission & Vision
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Mission */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-orange/5 to-white/5 backdrop-blur-sm group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-orange/20 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange/10 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange/30 to-orange/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-orange/20">
                        <Target className="w-8 h-8 text-orange" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-5">Our Mission</h3>
                      <p className="text-white/90 leading-relaxed text-lg">
                        To empower individuals, teams, and organizations with the cultural intelligence they need to communicate effectively, build trust, and thrive in multicultural environments across the UAE and GCC.
                      </p>
                    </div>
                  </motion.div>

                  {/* Vision */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-azure-blue/5 to-white/5 backdrop-blur-sm group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-azure-blue/20 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-azure-blue/10 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-azure-blue/30 to-azure-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-azure-blue/20">
                        <Eye className="w-8 h-8 text-azure-blue" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-5">Our Vision</h3>
                      <p className="text-white/90 leading-relaxed text-lg">
                        A world where people understand one another beyond stereotypes. A region where collaboration rises naturally because people know how to navigate cultural differences with respect, clarity, and emotional intelligence.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Values Section */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      Our Values
                    </span>
                  </h2>
                  <p className="text-white/60 text-lg">The principles that guide everything we do</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {[
                    { 
                      title: 'Respect', 
                      description: 'Every culture has its own logic. We honor it.',
                      icon: Heart,
                      colorClass: 'orange',
                      bgGradient: 'from-orange/20 to-orange/10',
                      iconBg: 'from-orange/20 to-orange/10',
                      iconColor: 'text-orange',
                      glowColor: 'bg-orange/10'
                    },
                    { 
                      title: 'Curiosity', 
                      description: 'We seek to understand before we judge.',
                      icon: Sparkles,
                      colorClass: 'azure-blue',
                      bgGradient: 'from-azure-blue/20 to-azure-blue/10',
                      iconBg: 'from-azure-blue/20 to-azure-blue/10',
                      iconColor: 'text-azure-blue',
                      glowColor: 'bg-azure-blue/10'
                    },
                    { 
                      title: 'Professionalism', 
                      description: 'Evidence based, structured, and globally recognized training.',
                      icon: Target,
                      colorClass: 'orange',
                      bgGradient: 'from-orange/20 to-orange/10',
                      iconBg: 'from-orange/20 to-orange/10',
                      iconColor: 'text-orange',
                      glowColor: 'bg-orange/10'
                    },
                    { 
                      title: 'Connection', 
                      description: 'Real relationships are built on cultural understanding.',
                      icon: Users,
                      colorClass: 'azure-blue',
                      bgGradient: 'from-azure-blue/20 to-azure-blue/10',
                      iconBg: 'from-azure-blue/20 to-azure-blue/10',
                      iconColor: 'text-azure-blue',
                      glowColor: 'bg-azure-blue/10'
                    },
                    { 
                      title: 'Authenticity', 
                      description: 'We teach the truth about how the region works, not the superficial version.',
                      icon: Heart,
                      colorClass: 'orange',
                      bgGradient: 'from-orange/20 to-orange/10',
                      iconBg: 'from-orange/20 to-orange/10',
                      iconColor: 'text-orange',
                      glowColor: 'bg-orange/10'
                    }
                  ].map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm group overflow-hidden"
                    >
                      <div className={`absolute top-0 right-0 w-24 h-24 ${value.glowColor} rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                      <div className="relative z-10">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <value.icon className={`w-6 h-6 ${value.iconColor}`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                        <p className="text-white/80 leading-relaxed">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Slogan Section */}
              <motion.div
                variants={itemVariants}
                className="text-center py-12"
              >
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-bold"
                >
                  <span className="text-white/60">Everything we do reflects our slogan.</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                    Bridging people, cultures and intelligence.
                  </span>
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.main>

      <ModernFooter />
    </div>
  )
}

