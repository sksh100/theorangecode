'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { ConvergingCulturesCanvas } from '@/components/ConvergingCulturesScene'
import { 
  Sparkles, Zap, Target, Users, Globe, Award, TrendingUp, 
  BookOpen, MessageSquare, ArrowRight, ChevronDown,
  Brain, Heart, Eye, Star, Infinity, Layers
} from 'lucide-react'
import Link from 'next/link'

export default function NewHomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 4, damping: 100 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 4, damping: 100 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const unsubscribeX = smoothMouseX.on('change', (latest) => {
      setMousePosition(prev => ({ ...prev, x: latest }))
    })
    const unsubscribeY = smoothMouseY.on('change', (latest) => {
      setMousePosition(prev => ({ ...prev, y: latest }))
    })

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [smoothMouseX, smoothMouseY])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  
  // Parallax effects for sections
  const aboutY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0])
  const whyY = useTransform(scrollYProgress, [0.4, 0.7], [100, 0])
  const programsY = useTransform(scrollYProgress, [0.6, 0.9], [100, 0])

  return (
    <div ref={containerRef} className="relative w-full bg-primary-dark text-white">
      <ModernNavbar />
      
      {/* Fixed WebGL Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ConvergingCulturesCanvas mousePosition={mousePosition} scrollProgress={scrollProgress} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-azure-blue/10 to-orange/10 border border-azure-blue/30 rounded-full mb-8 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity as any, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-azure-blue" />
            </motion.div>
            <span className="text-sm font-bold text-white uppercase tracking-widest">Cultural Intelligence Excellence</span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity as any, ease: "linear" }}
            >
              <Star className="w-5 h-5 text-orange" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-7xl md:text-9xl lg:text-[12rem] font-black mb-8 leading-none"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-blue via-white to-orange block">
              THE ORANGE
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-azure-blue to-bright-blue block">
              CODE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-2xl md:text-4xl text-white/90 mb-12 max-w-4xl mx-auto font-light leading-relaxed"
          >
            Where cultures converge. Where intelligence emerges. Where success begins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full text-xl font-bold text-white transition-all duration-300 flex items-center gap-3 group"
              style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
            >
              <span>Begin Your Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold text-xl transition-all duration-300 hover:bg-white/20 hover:border-azure-blue/50"
            >
              Explore Programs
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity as any, delay: 1.5 }}
            className="mt-16 flex justify-center"
          >
            <ChevronDown className="w-8 h-8 text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <motion.section 
        style={{ y: aboutY }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="glass-card p-10 md:p-16 backdrop-blur-[40px] border border-white/10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange to-azure-blue mb-8"
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-black mb-6 text-gradient-primary"
              >
                About Us
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed"
              >
                The Orange Code is a premium learning platform born in the heart of Abu Dhabi and Dubai, designed to transform how professionals navigate the world's most culturally diverse region.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-white/70 leading-relaxed mb-8"
              >
                We empower individuals and organizations with cultural intelligence—the ability to connect authentically across cultures, build trust rapidly, and achieve extraordinary outcomes in international environments.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                {[
                  { icon: Target, text: 'Strategic Excellence' },
                  { icon: Award, text: 'Certified Programs' },
                  { icon: TrendingUp, text: 'Measurable Results' }
                ].map((item, i) => (
                  <div key={i} className="glass-card p-4 backdrop-blur-[20px] border border-white/10 flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-azure-blue" />
                    <span className="text-sm font-semibold text-white">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Globe, number: '200+', label: 'Nationalities' },
                { icon: Users, number: '10K+', label: 'Professionals Trained' },
                { icon: BookOpen, number: '50+', label: 'Programs' },
                { icon: Award, number: '98%', label: 'Success Rate' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-8 backdrop-blur-[30px] border border-white/10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-azure-blue/20 to-orange/20 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-azure-blue" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-gradient-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/70 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Cultural Intelligence Matters Section */}
      <motion.section 
        style={{ y: whyY }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange to-azure-blue mb-8"
            >
              <Target className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-8xl font-black mb-6 text-gradient-primary"
            >
              Why Cultural Intelligence Matters
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed"
            >
              In a world where success depends on understanding, cultural intelligence is your competitive advantage.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Heart,
                title: 'Build Authentic Relationships',
                description: 'Connect genuinely with people from diverse backgrounds, creating meaningful bonds that transcend cultural boundaries.',
                color: 'from-orange/20 to-orange/5',
                borderColor: 'border-orange/40'
              },
              {
                icon: Users,
                title: 'Navigate Social Excellence',
                description: 'Feel confident in any setting, understanding cultural nuances that help you communicate with respect and authenticity.',
                color: 'from-azure-blue/20 to-azure-blue/5',
                borderColor: 'border-azure-blue/40'
              },
              {
                icon: Globe,
                title: 'Expand Your Worldview',
                description: 'Gain deeper appreciation for different perspectives, traditions, and ways of thinking that enrich your personal growth.',
                color: 'from-bright-blue/20 to-bright-blue/5',
                borderColor: 'border-bright-blue/40'
              },
              {
                icon: Zap,
                title: 'Business Success',
                description: 'Close deals faster, build stronger partnerships, and create lasting business relationships that drive measurable results.',
                color: 'from-orange/20 to-orange/5',
                borderColor: 'border-orange/40'
              },
              {
                icon: TrendingUp,
                title: 'High-Performing Teams',
                description: 'Foster collaboration and trust in diverse teams, reducing misunderstandings and increasing productivity across cultures.',
                color: 'from-azure-blue/20 to-azure-blue/5',
                borderColor: 'border-azure-blue/40'
              },
              {
                icon: Target,
                title: 'Strategic Advantage',
                description: 'Gain competitive edge by understanding local markets, client expectations, and business protocols in the UAE and Gulf.',
                color: 'from-bright-blue/20 to-bright-blue/5',
                borderColor: 'border-bright-blue/40'
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`glass-card p-8 backdrop-blur-[30px] border-2 ${benefit.borderColor} bg-gradient-to-br ${benefit.color} relative overflow-hidden group cursor-pointer`}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 70%)'
                  }}
                />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} border ${benefit.borderColor} flex items-center justify-center mb-6 relative z-10`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-black text-white mb-4 relative z-10">
                  {benefit.title}
                </h3>

                <p className="text-lg text-white/80 leading-relaxed relative z-10">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 md:p-16 backdrop-blur-[40px] border-2 border-azure-blue/40 bg-gradient-to-r from-azure-blue/10 to-orange/10 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity as any }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange to-azure-blue mb-6"
            >
              <Infinity className="w-10 h-10 text-white" />
            </motion.div>

            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
              The Bottom Line
            </h3>

            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed max-w-5xl mx-auto">
              Teams with high cultural intelligence see <span className="text-orange font-black">40% better collaboration</span>, 
              <span className="text-azure-blue font-black"> faster decision-making</span>, and 
              <span className="text-orange font-black"> stronger client relationships</span>. 
              In a region where relationships drive business, cultural intelligence is your competitive advantage.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Programs Section */}
      <motion.section 
        style={{ y: programsY }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-6 text-gradient-primary">
              Our Programs
            </h2>
            <p className="text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto">
              Transform your cultural intelligence in just four weeks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Foundation Program',
                duration: '4 Weeks',
                description: 'Master the fundamentals of cultural intelligence and build authentic cross-cultural connections.',
                features: ['Cultural Awareness', 'Communication Skills', 'Business Protocols', 'UAE & Gulf Focus']
              },
              {
                title: 'Advanced Mastery',
                duration: '8 Weeks',
                description: 'Deep dive into advanced cultural intelligence strategies for senior professionals and leaders.',
                features: ['Strategic Thinking', 'Leadership Excellence', 'Complex Negotiations', 'Team Dynamics']
              },
              {
                title: 'Executive Immersion',
                duration: '12 Weeks',
                description: 'Comprehensive program for C-suite executives seeking cultural mastery in international business.',
                features: ['Executive Coaching', 'Custom Strategy', 'Network Building', 'Ongoing Support']
              }
            ].map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 * i }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-card p-10 backdrop-blur-[30px] border-2 border-white/10 bg-white/5 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-azure-blue/20 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"
                />

                <div className="text-orange text-sm font-bold mb-4">{program.duration}</div>
                <h3 className="text-3xl font-black text-white mb-4">{program.title}</h3>
                <p className="text-lg text-white/80 mb-6 leading-relaxed">{program.description}</p>

                <ul className="space-y-3 mb-8">
                  {program.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/90">
                      <div className="w-2 h-2 rounded-full bg-azure-blue" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-azure-blue/20 to-orange/20 border border-azure-blue/40 text-white font-bold hover:from-azure-blue/30 hover:to-orange/30 transition-all"
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="glass-card p-16 md:p-20 backdrop-blur-[40px] border-2 border-azure-blue/40 bg-gradient-to-br from-azure-blue/10 via-orange/10 to-bright-blue/10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity as any, ease: "linear" }}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-orange to-azure-blue mb-10"
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-black mb-8 text-gradient-primary">
              Ready to Transform?
            </h2>

            <p className="text-2xl md:text-3xl text-white/90 mb-12 leading-relaxed">
              Join thousands of professionals who have elevated their cultural intelligence and achieved extraordinary success.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 rounded-full text-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 group"
                style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold text-xl transition-all duration-300 hover:bg-white/20"
              >
                Book Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      <ModernFooter />
    </div>
  )
}

