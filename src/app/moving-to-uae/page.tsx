'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CheckCircle, ArrowRight, Home, Briefcase, Car, ShoppingBag, Globe, Users, FileText, GraduationCap, Baby, Building2, BookOpen, ChevronDown, Target, FileCheck, Home as HomeIcon, Heart, MessageSquare, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import Script from 'next/script'

// Dynamic imports for performance
const AtmosphericBackground = dynamic(
  () => import('@/components/AtmosphericBackground').then(mod => ({ default: mod.AtmosphericBackground })),
  { ssr: false, loading: () => null }
)

export default function MovingToUAEPage() {
  const [mounted, setMounted] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  }

  return (
    <>
      <Script
        id="moving-to-uae-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Moving to the UAE. Relocation hub for expats and professionals",
            "description": "A clear, research based relocation hub for anyone who wants to move to the UAE. Understand visas, work culture, housing and everyday life in Dubai and Abu Dhabi, plus country specific guides such as the UK to UAE cultural intelligence ebook.",
            "url": "https://www.theorangecode.com/moving-to-uae",
            "inLanguage": "en",
            "isPartOf": {
              "@type": "WebSite",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "about": {
              "@type": "Thing",
              "name": "Moving to the UAE",
              "description": "Comprehensive relocation hub for professionals, families, students and entrepreneurs moving to the United Arab Emirates, covering visas, work culture, housing, and cultural intelligence."
            },
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Can people from any country use this relocation hub?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, it is written for a global audience. Citizenship affects visa rules but the cultural intelligence principles apply to everyone."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is this page only about Dubai?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, it covers the UAE as a whole, with examples from Dubai, Abu Dhabi and other emirates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does this replace professional immigration or legal advice?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, it is educational guidance and you still need official legal and immigration advice."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the difference between the relocation hub and the UK guide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The hub speaks to all nationalities. The UK guide is written with British cultural expectations and examples."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I stay updated as new guides launch?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Join our email list or follow our social media channels to stay informed about new country specific guides and resources."
                  }
                }
              ]
            }
          })
        }}
      />

      <ModernNavbar />
      
      <main className="relative min-h-screen bg-primary-dark text-white overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <AtmosphericBackground mousePosition={{ x: 0, y: 0 }} scrollProgress={0} />
        </div>

        {/* SECTION 1: HERO */}
        <section className="relative overflow-hidden h-screen">
          <div className="h-full flex items-center pt-20 md:pt-24">
            <div className="absolute inset-0 bg-gradient-to-b from-orange/5 via-transparent to-azure-blue/5 pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={mounted ? 'visible' : 'visible'}
                className="max-w-5xl mx-auto text-center"
              >
                {/* Small label */}
                <motion.div variants={itemVariants} className="inline-flex items-center justify-center mb-6">
                  <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-white/80">
                    UAE Relocation Hub
                  </span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-normal text-center w-full"
                >
                  <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent block lg:whitespace-nowrap text-center pt-2 pb-1">
                    Moving To The UAE With Confidence
                  </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                  A clear, research based roadmap for professionals, families, students and entrepreneurs who want to build a life in the United Arab Emirates.
                </motion.p>

                {/* Bullet list */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange" />
                    <span>Understand visas, work and everyday life in a realistic way</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-azure-blue" />
                    <span>Avoid cultural misunderstandings that slow down your progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-bright-blue" />
                    <span>Plan a move that supports your career, family and wellbeing</span>
                  </div>
                </motion.div>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    onClick={() => {
                      document.getElementById('relocation-overview')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                  >
                    Start with the relocation overview
                  </motion.button>
                  
                  <Link href="/uk-to-uae-relocation">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 nav-button-glass text-white/90 hover:text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      Already from the UK
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Why Planning Matters */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-5xl mx-auto"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold mb-6 text-center"
              >
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  Why Careful Planning Matters In The UAE
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Opportunities in the UAE are real and abundant, but the country has a specific way of working, hiring and building trust. Poor planning can lead to wrong job offers, visa complications or culture shock that slows your progress.
              </motion.p>

              {/* Glass card */}
              <motion.div
                variants={itemVariants}
                className="relative p-8 md:p-10 rounded-3xl overflow-hidden border border-white/10 bg-primary-dark/60 backdrop-blur-[20px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                <div className="relative z-10 grid md:grid-cols-3 gap-6 mb-6">
                  {[
                    {
                      icon: FileCheck,
                      title: 'Legal and practical systems',
                      text: 'Visas, sponsorship, labour rules, tenancy contracts and official requirements that shape your move.'
                    },
                    {
                      icon: Briefcase,
                      title: 'Workplace and business culture',
                      text: 'Hierarchy, decision making, communication styles, reputation building and professional expectations.'
                    },
                    {
                      icon: Home,
                      title: 'Life beyond work',
                      text: 'Housing, schooling, partner careers, social life and wellbeing that make your move sustainable.'
                    }
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <Icon className="w-10 h-10 text-orange mb-4" />
                        <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                      </motion.div>
                    )
                  })}
                </div>
                <p className="text-center text-white/60 text-sm">
                  This hub gives you a starting point. Our guides and masterclasses go deeper into each layer.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: Four Step Overview */}
        <section id="relocation-overview" className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-6xl mx-auto"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold mb-12 text-center"
              >
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  A Simple Four Step Overview For Your Move
                </span>
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: 1,
                    icon: Target,
                    title: 'Clarify your goal',
                    bullets: [
                      'Why you want to move',
                      'Which emirate fits your lifestyle',
                      'Time frame and budget'
                    ]
                  },
                  {
                    step: 2,
                    icon: FileCheck,
                    title: 'Understand visas and employment basics',
                    bullets: [
                      'Work visa and sponsorship rules',
                      'Employer vs free zone vs own company',
                      'Impact on family visas'
                    ]
                  },
                  {
                    step: 3,
                    icon: HomeIcon,
                    title: 'Design your life set up',
                    bullets: [
                      'Housing zones, commute, transport options',
                      'Schooling or childcare if relevant',
                      'Social and community options'
                    ]
                  },
                  {
                    step: 4,
                    icon: Heart,
                    title: 'Prepare culturally and emotionally',
                    bullets: [
                      'How communication works in the UAE',
                      'What respect looks like in practice',
                      'How to handle the first 90 days'
                    ]
                  }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-orange">{item.step}</span>
                          </div>
                          <Icon className="w-8 h-8 text-azure-blue" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                        <ul className="space-y-2">
                          {item.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                              <CheckCircle className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.p
                variants={itemVariants}
                className="text-center text-white/60 text-sm mt-8"
              >
                Our country specific and profession specific guides help you apply these steps to your own situation.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: Different Types of Movers */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-6xl mx-auto"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold mb-12 text-center"
              >
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  Relocation Paths For Different Types Of Movers
                </span>
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Briefcase,
                    title: 'Working professionals and managers',
                    text: 'Career growth, regional HQ roles, professional services, consulting, creative industries.',
                    linkText: 'See cultural intelligence training'
                  },
                  {
                    icon: Baby,
                    title: 'Families relocating together',
                    text: 'Housing choices, schools, spouse careers, family routines and community integration.',
                    linkText: 'See cultural intelligence training'
                  },
                  {
                    icon: GraduationCap,
                    title: 'Students, graduates and early career explorers',
                    text: 'Internships, first roles, study options, cost awareness and career building.',
                    linkText: 'See cultural intelligence training'
                  },
                  {
                    icon: Building2,
                    title: 'Entrepreneurs and independent professionals',
                    text: 'Free zones, running your own consultancy, online businesses and business setup.',
                    linkText: 'See cultural intelligence training'
                  }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                      <div className="relative z-10">
                        <Icon className="w-10 h-10 text-orange mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-white/70 mb-4 leading-relaxed">{item.text}</p>
                        <button
                          onClick={() => {
                            document.getElementById('cultural-intelligence')?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="text-sm text-orange hover:text-azure-blue transition-colors inline-flex items-center gap-1"
                        >
                          {item.linkText} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: Cultural Intelligence Advantage */}
        <section id="cultural-intelligence" className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-6xl mx-auto"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold mb-6 text-center"
              >
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  Cultural Intelligence Is Your Real Relocation Advantage
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Visas, flights and shipping are the easy part. The hardest part is understanding how people think, decide and build trust in the UAE and wider GCC. Cultural intelligence keeps careers and businesses on track.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left column */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-6">How cultural intelligence helps</h3>
                  <ul className="space-y-4">
                    {[
                      'How cultural intelligence helps in meetings and negotiations by understanding communication styles and decision making processes.',
                      'How it protects reputation through respectful behaviour that aligns with local expectations and values.',
                      'How it helps the whole family feel settled faster by navigating social situations and building genuine connections.'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-orange flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Right column - Card */}
                <motion.div
                  variants={itemVariants}
                  className="relative p-8 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-orange/10 via-transparent to-azure-blue/10 backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6">How The Orange Code helps</h3>
                    <ul className="space-y-3 mb-6">
                      {[
                        'Country and culture specific relocation guides',
                        'Live and virtual cultural intelligence masterclasses',
                        'Resources focused on the UAE and wider GCC'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                          <span className="text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/masterclasses">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                      >
                        View cultural intelligence masterclasses
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: UK Specific Guide */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold mb-6 text-center"
              >
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  If You Are Moving From The UK
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Many of our clients come from the UK, and we created a dedicated cultural intelligence guide for British citizens that addresses the specific cultural differences between the UK and UAE.
              </motion.p>

              {/* Premium card */}
              <motion.div
                variants={itemVariants}
                className="relative p-8 md:p-10 rounded-3xl overflow-hidden border-2 border-orange/30 bg-gradient-to-br from-orange/10 via-primary-dark/90 to-azure-blue/10 backdrop-blur-[20px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                <div className="relative z-10">
                  <div className="inline-block mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-orange/20 border border-orange/40 text-orange">
                      Country specific guide
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">UK to UAE Cultural Intelligence Guide</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    A detailed, British perspective guide that explains how UAE culture, work expectations and communication differ from the UK. It is ideal if you are relocating from London, Manchester, Birmingham or any other UK city to Dubai or Abu Dhabi.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Understand how workplace hierarchy and communication differ from UK norms',
                      'Learn the cultural expectations that help you build trust and avoid misunderstandings',
                      'Navigate your first months with confidence and clarity'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/uk-to-uae-relocation">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      Get the UK to UAE guide
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-center text-white/60 text-sm mt-6"
              >
                Additional country specific resources will be added in the future for other nationalities.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7: Deeper Help */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-6xl mx-auto"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold mb-6 text-center"
              >
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  When You Need More Than An Online Guide
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Some people are fine with self guided reading, while others need tailored guidance for their company or family situation.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'For individuals and families',
                    items: [
                      'Cultural intelligence masterclass seats',
                      'UAE focused webinars or online sessions',
                      'Option to join a small cohort'
                    ]
                  },
                  {
                    title: 'For organisations and leadership teams',
                    items: [
                      'In house or virtual training for teams',
                      'Support for UK or European headquarters working with UAE entities',
                      'Tailored content for specific industries'
                    ]
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                      <ul className="space-y-3">
                        {item.items.map((listItem, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                            <span className="text-white/80">{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="text-center mt-8">
                <Link href="/#contact">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 nav-button-glass text-white/90 hover:text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                  >
                    Contact us to discuss training for your move or your organisation
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8: Final CTA */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent">
                  Take The Next Step Toward Your Move
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                You do not have to figure everything out on your own. Start with the resource that fits your situation right now and build from there.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <motion.div
                  variants={itemVariants}
                  className="relative p-8 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-azure-blue/10" />
                  <div className="relative z-10">
                    <motion.button
                      onClick={() => {
                        document.getElementById('relocation-overview')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 mb-4"
                    >
                      Start with the relocation overview guide
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="relative p-8 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/10 via-transparent to-orange/10" />
                  <div className="relative z-10">
                    <Link href="/uk-to-uae-relocation">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 mb-4"
                      >
                        Get the UK to UAE guide
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-center text-white/60 text-sm"
              >
                You can also buy the UK to UAE guide as a gift for a friend, colleague or family member who is about to move or has just arrived in the Emirates.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9: FAQ */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-3xl mx-auto"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold mb-12 text-center"
              >
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  Frequently asked questions about moving to the UAE
                </span>
              </motion.h2>

              <div className="space-y-3">
                {[
                  {
                    q: 'Can people from any country use this relocation hub?',
                    a: 'Yes, it is written for a global audience. Citizenship affects visa rules but the cultural intelligence principles apply to everyone.'
                  },
                  {
                    q: 'Is this page only about Dubai?',
                    a: 'No, it covers the UAE as a whole, with examples from Dubai, Abu Dhabi and other emirates.'
                  },
                  {
                    q: 'Does this replace professional immigration or legal advice?',
                    a: 'No, it is educational guidance and you still need official legal and immigration advice.'
                  },
                  {
                    q: 'What is the difference between the relocation hub and the UK guide?',
                    a: 'The hub speaks to all nationalities. The UK guide is written with British cultural expectations and examples.'
                  },
                  {
                    q: 'How can I stay updated as new guides launch?',
                    a: 'Join our email list or follow our social media channels to stay informed about new country specific guides and resources.'
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/5 via-transparent to-orange/5" />
                    <div className="relative z-10">
                      <button
                        onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors duration-200"
                      >
                        <h3 className="text-lg md:text-xl font-bold text-white flex-1">{faq.q}</h3>
                        <ChevronDown 
                          className={`w-5 h-5 text-white/70 flex-shrink-0 transition-transform duration-300 ${
                            openFAQ === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-0">
                              <p className="text-white/80 leading-relaxed">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </>
  )
}

