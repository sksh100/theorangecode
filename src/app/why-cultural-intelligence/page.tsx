'use client'

import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { Background } from '@/components/Background'
import { ArrowLeft, Users, Briefcase, Target, Heart, TrendingUp, CheckCircle2, Globe, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function WhyCulturalIntelligencePage() {
  const personalBenefits = [
    {
      icon: Heart,
      title: 'Build Authentic Relationships',
      description: 'Connect genuinely with people from diverse backgrounds, creating meaningful friendships and personal networks that enrich your life.'
    },
    {
      icon: Users,
      title: 'Navigate Social Situations',
      description: 'Feel confident in any social setting, understanding cultural nuances that help you communicate respectfully and appropriately.'
    },
    {
      icon: Globe,
      title: 'Expand Your Worldview',
      description: 'Gain deeper appreciation for different perspectives, traditions, and ways of thinking that broaden your personal growth.'
    }
  ]

  const businessBenefits = [
    {
      icon: Briefcase,
      title: 'Successful Business Outcomes',
      description: 'Close deals faster, build stronger partnerships, and create lasting business relationships that drive measurable results.'
    },
    {
      icon: Users,
      title: 'High-Performing Teams',
      description: 'Foster collaboration and trust in diverse teams, reducing misunderstandings and increasing productivity across cultural boundaries.'
    },
    {
      icon: Target,
      title: 'Strategic Advantage',
      description: 'Gain competitive edge by understanding local markets, client expectations, and business protocols in the UAE and Gulf Region.'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Avoid costly cultural missteps that can damage relationships, reputation, and business opportunities in the region.'
    }
  ]

  const appreciationPoints = [
    'Demonstrates respect and genuine interest in local culture',
    'Shows professionalism and emotional intelligence',
    'Builds trust faster with clients, partners, and colleagues',
    'Creates positive first impressions that last',
    'Opens doors to opportunities that others miss'
  ]

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/">
            <motion.div
              className="mb-8 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </motion.div>
          </Link>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="glass-card p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-azure-blue/10 border border-azure-blue/30 rounded-full mb-6"
              >
                <Target className="w-5 h-5 text-azure-blue" />
                <span className="text-azure-blue font-semibold text-sm uppercase tracking-wider">
                  Cultural Intelligence
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-primary">
                Why Cultural Intelligence Matters
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-6">
                People succeed because they know how to communicate across cultures, interpret subtle signals, and build trust quickly. Cultural intelligence gives you this advantage.
              </p>

              <p className="text-lg text-white/70 leading-relaxed">
                It helps you move with confidence, avoid misunderstandings, and create the relationships that drive real success in the UAE and wider Gulf Region.
              </p>
            </div>
          </motion.div>

          {/* Personal Settings Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="glass-card p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange to-orange-luminous rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  In Personal Settings
                </h2>
              </div>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Cultural intelligence transforms your personal life by helping you connect authentically with people from over 200 nationalities in the UAE. Whether you're attending social events, building friendships, or navigating daily interactions, understanding cultural nuances makes all the difference.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {personalBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-orange/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-azure-blue/20 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-orange" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Business & Teams Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="glass-card p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-azure-blue to-azure-luminous rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  In Business & Teams
                </h2>
              </div>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Cultural intelligence is not just nice to have. It's essential for successful business outcomes. In the UAE and Gulf Region, where business relationships are built on trust and respect, cultural intelligence directly impacts your ability to close deals, lead teams, and achieve strategic goals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {businessBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-azure-blue/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-azure-blue/20 to-bright-blue/20 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-azure-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-azure-blue/10 to-orange/10 border border-azure-blue/30 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-azure-blue" />
                  The Bottom Line
                </h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  Teams with high cultural intelligence see <span className="font-bold text-orange">40% better collaboration</span>, <span className="font-bold text-orange">faster decision-making</span>, and <span className="font-bold text-orange">stronger client relationships</span>. In a region where relationships drive business, cultural intelligence is your competitive advantage.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Appreciation Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="glass-card p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange to-azure-blue rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Cultural Intelligence is Appreciated
                </h2>
              </div>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                When you demonstrate cultural intelligence, people notice. It shows respect, professionalism, and genuine interest in building meaningful connections. This appreciation translates into opportunities, trust, and lasting relationships.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {appreciationPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                    <p className="text-white/90 leading-relaxed">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-orange/10 to-azure-blue/10 border border-orange/30 rounded-2xl">
                <p className="text-lg text-white/90 leading-relaxed italic">
                  "In the UAE and Gulf Region, cultural intelligence isn't just appreciated. It's expected. Those who invest in understanding local customs, communication styles, and business protocols are the ones who succeed. It's the difference between being tolerated and being welcomed, between closing a deal and building a partnership."
                </p>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass-card p-8 md:p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-orange to-azure-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Develop Your Cultural Intelligence?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join The Orange Code's comprehensive program designed to transform your cultural intelligence in just four weeks. Learn from certified experts and gain the skills that drive success in the UAE and Gulf Region.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                  >
                    Explore Our Programs
                  </motion.button>
                </Link>
                <Link href="/#book-session">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-white/20"
                  >
                    Book a Session
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}
