'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { CheckCircle, ArrowRight, Home, Briefcase, Car, ShoppingBag, Globe, Users, FileText, GraduationCap, Baby, Building2, BookOpen, ChevronDown, Target, FileCheck, Home as HomeIcon, Heart, MessageSquare, Zap, Shield, X, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { PageHeading } from '@/components/PageHeading'
import Script from 'next/script'

// Dynamic imports for performance
const AtmosphericBackground = dynamic(
  () => import('@/components/AtmosphericBackground').then(mod => ({ default: mod.AtmosphericBackground })),
  { ssr: false, loading: () => null }
)

export default function MovingToUAEPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [interestGuide, setInterestGuide] = useState<string | null>(null)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const guideNames: Record<string, string> = {
    'nl-uae': 'Netherlands to UAE Guide',
    'fr-uae': 'France to UAE Guide',
    'it-uae': 'Italy to UAE Guide',
    'ru-uae': 'Russia to UAE Guide',
    'us-uae': 'US to UAE Guide'
  }

  const handleRegisterInterest = (guideKey: string) => {
    setInterestGuide(guideKey)
    setShowRegisterModal(true)
    setSubmitSuccess(false)
    setFormData({ name: '', email: '' })
  }

  const handleCloseModal = () => {
    setShowRegisterModal(false)
    setInterestGuide(null)
    setFormData({ name: '', email: '' })
    setSubmitSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!interestGuide || !formData.name || !formData.email) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/guide-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideKey: interestGuide,
          name: formData.name,
          email: formData.email,
          guideName: guideNames[interestGuide] || 'Guide'
        })
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setTimeout(() => {
          handleCloseModal()
        }, 2000)
      } else {
        console.error('Failed to submit interest')
      }
    } catch (error) {
      console.error('Error submitting interest:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            "name": "Moving to the UAE. Cultural intelligence and relocation hub",
            "description": "A cultural intelligence hub for anyone who wants to move to the UAE. Understand work culture, expectations, housing basics and everyday life, and explore country specific guides such as the UK to UAE cultural intelligence ebook.",
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
              "description": "Learning hub for professionals, families, students and entrepreneurs who are exploring a move to the United Arab Emirates, with a focus on cultural intelligence, workplace expectations and daily life."
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
                animate="visible"
                className="max-w-5xl mx-auto"
              >
                <motion.div
                  variants={itemVariants}
                  className="hero-glass-morphic p-8 md:p-12 text-center"
                >
                  {/* Small label */}
                  <motion.div variants={itemVariants} className="inline-flex items-center justify-center mb-6">
                    <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-white/80">
                      UAE Culture and Relocation Hub
                    </span>
                  </motion.div>

                  {/* Main heading */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <PageHeading level="h1">
                      <span className="block">Move to the UAE with</span>
                      <span className="block">Cultural Intelligence</span>
                    </PageHeading>
                  </motion.div>

                  {/* Subheading */}
                  <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
                  >
                    A practical, research based hub from The Orange Code that helps you understand how life, work and relationships really function in the United Arab Emirates so you can plan your move with clarity.
                  </motion.p>

                  {/* Bullet list */}
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange" />
                      <span>See how visas, work and daily life connect in a realistic way</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-azure-blue" />
                      <span>Avoid cultural misunderstandings that damage trust and reputation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-bright-blue" />
                      <span>Choose guides and masterclasses that support your career and family</span>
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
                      Start with the UAE overview
                    </motion.button>
                    
                    <Link href="/uk-to-uae-relocation">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 nav-button-glass text-white/90 hover:text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                      >
                        Already moving from the UK
                      </motion.button>
                    </Link>
                  </motion.div>
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2">
                  Why Cultural Preparation Matters More Than Logistics
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Flights, shipping and paperwork can be outsourced. What you cannot outsource is how you think, speak and make decisions in the UAE. The country has a specific way of working, hiring and building trust. When you ignore this, you risk accepting the wrong job, misunderstanding expectations or feeling lost during your first year.
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
                      text: 'How visas, sponsorship, labour rules and contracts shape your options and timelines.'
                    },
                    {
                      icon: Briefcase,
                      title: 'Workplace and business culture',
                      text: 'How hierarchy, communication, relationship building and reputation really work in organisations.'
                    },
                    {
                      icon: Home,
                      title: 'Life beyond work',
                      text: 'How housing, schooling, partner careers, social life and wellbeing make your move sustainable.'
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
                  This hub gives you a structured overview. Our country specific guides and masterclasses go deeper when you are ready.
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2" className="mb-12">
                  A Simple Four Step Overview For Your Move
                </PageHeading>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: 1,
                    icon: Target,
                    title: 'Clarify your goal',
                    bullets: [
                      'Why you want to move and what success looks like',
                      'Which emirate and lifestyle fit your priorities',
                      'Time frame and financial boundaries'
                    ]
                  },
                  {
                    step: 2,
                    icon: FileCheck,
                    title: 'Understand visas and employment basics',
                    bullets: [
                      'Work visa and sponsorship routes that apply to you',
                      'Differences between mainland, free zones and your own company',
                      'What this means for family visas and dependants'
                    ]
                  },
                  {
                    step: 3,
                    icon: HomeIcon,
                    title: 'Design your life set up',
                    bullets: [
                      'Housing areas, commute patterns and transport',
                      'Education and childcare if relevant',
                      'Community, hobbies and faith life'
                    ]
                  },
                  {
                    step: 4,
                    icon: Heart,
                    title: 'Prepare culturally and emotionally',
                    bullets: [
                      'How communication and respect are expressed in the UAE',
                      'How to handle hierarchy and feedback in practice',
                      'How to navigate your first ninety days with confidence'
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
                Use this overview to think clearly about your move. Then choose the guide or training that fits your origin country and life stage.
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2" className="mb-12">
                  How Different People Use This Hub
                </PageHeading>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Briefcase,
                    title: 'Established professionals and managers',
                    text: 'Use the hub to understand workplace expectations, leadership style and how to protect your reputation while you transition into a new role.',
                    linkText: 'Explore cultural intelligence training'
                  },
                  {
                    icon: Baby,
                    title: 'Families who are relocating together',
                    text: 'Use the hub to think through housing, schools, partner careers and routines so that everyone adjusts in a healthy way.',
                    linkText: 'Explore cultural intelligence training'
                  },
                  {
                    icon: GraduationCap,
                    title: 'Students, graduates and early career explorers',
                    text: 'Use the hub to understand cost of living, first roles, internships and what professional behaviour looks like in the UAE.',
                    linkText: 'Explore cultural intelligence training'
                  },
                  {
                    icon: Building2,
                    title: 'Entrepreneurs and independent consultants',
                    text: 'Use the hub to frame questions about free zones, client relationships and how to build trust as an external partner.',
                    linkText: 'Explore cultural intelligence training'
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2">
                  <span className="block">Cultural Intelligence</span>
                  <span className="block">Is Your Real Relocation Advantage</span>
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Visas and logistics move you from one country to another. Cultural intelligence determines whether you actually thrive once you arrive. It affects how people read your emails, how they respond in meetings and how quickly you are trusted with real responsibility.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left column */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-6">How cultural intelligence helps</h3>
                  <ul className="space-y-4">
                    {[
                      'It improves meetings and negotiations because you understand how people communicate, decide and push back in a respectful way.',
                      'It protects your reputation by aligning your behaviour with local expectations around respect, status and reliability.',
                      'It helps partners and children feel settled faster by giving them a shared language to talk about cultural differences.'
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
                        'Country specific cultural intelligence guides for people moving to the UAE',
                        'Live and virtual masterclasses that translate theory into real conversations',
                        'Resources that focus on the Emirates and the wider GCC region'
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

        {/* SECTION 6: Country Specific Guides */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants}>
                <PageHeading level="h2">
                  Country Specific Guides For Moving To The UAE
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                The core principles of cultural intelligence are universal, but each country arrives in the UAE with its own habits, communication style and blind spots. Our guides are written from inside the Emirates so that you can see the differences clearly.
              </motion.p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* UK Guide - Live */}
                <motion.div
                  variants={itemVariants}
                  className="relative p-6 rounded-2xl overflow-hidden border-2 border-orange/30 bg-gradient-to-br from-orange/10 via-primary-dark/90 to-azure-blue/10 backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                  <div className="relative z-10">
                    <div className="inline-block mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-orange/20 border border-orange/40 text-orange">
                        Available now
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">UK to UAE Cultural Intelligence Guide</h3>
                    <p className="text-white/80 mb-6 leading-relaxed text-sm">
                      Written for British citizens and residents who want to understand how Emirati and UAE workplace culture differs from the UK. Ideal for people moving from cities such as London, Manchester, Birmingham, Edinburgh and others.
                    </p>
                    <ul className="space-y-2 mb-6">
                      {[
                        'See how hierarchy, communication and decision making differ from the UK',
                        'Avoid accidental offence in meetings, emails and social settings',
                        'Use real examples that reflect British expectations and concerns'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                          <span className="text-white/80 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/uk-to-uae-relocation">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 text-sm"
                      >
                        View the UK to UAE guide
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>

                {/* Netherlands - Coming Soon */}
                <motion.div
                  variants={itemVariants}
                  className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/5 via-transparent to-orange/5" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="inline-block mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 border border-white/20 text-white/70">
                        Coming soon
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Netherlands to UAE Guide</h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm flex-grow">
                      For Dutch professionals and families who want to understand how direct communication and consensus based decision making translate in the UAE.
                    </p>
                    <motion.div 
                      className="relative h-64 mb-4 perspective-1000 group cursor-pointer flex-shrink-0"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-full h-full transform-gpu preserve-3d transition-transform duration-500 group-hover:rotate-y-[-12deg]">
                        <div 
                          className="absolute inset-0 rounded-lg overflow-hidden bg-primary-dark"
                          style={{
                            transform: 'rotateY(-8deg) translateZ(0)',
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            filter: 'brightness(1.05)'
                          }}
                        >
                          <Image
                            src="/images/nl-uae-guice-cover.png"
                            alt="Netherlands to UAE Cultural Intelligence Guide"
                            fill
                            className="object-contain"
                            style={{ transform: 'translateZ(0)' }}
                          />
                          {/* Book spine shadow effect */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/30 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                    <button
                      onClick={() => handleRegisterInterest('nl-uae')}
                      className="w-full mt-auto px-6 py-3 nav-button-glass text-sm font-semibold rounded-xl text-white/90 hover:text-white transition-all duration-300"
                    >
                      Register interest
                    </button>
                  </div>
                </motion.div>

                {/* France - Coming Soon */}
                <motion.div
                  variants={itemVariants}
                  className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/5 via-transparent to-orange/5" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="inline-block mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 border border-white/20 text-white/70">
                        Coming soon
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">France to UAE Guide</h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm flex-grow">
                      For French professionals and families who want to understand how formality, hierarchy and relationship building work in the UAE context.
                    </p>
                    <motion.div 
                      className="relative h-64 mb-4 perspective-1000 group cursor-pointer flex-shrink-0"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-full h-full transform-gpu preserve-3d transition-transform duration-500 group-hover:rotate-y-[-12deg]">
                        <div 
                          className="absolute inset-0 rounded-lg overflow-hidden bg-primary-dark"
                          style={{
                            transform: 'rotateY(-8deg) translateZ(0)',
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            filter: 'brightness(1.05)'
                          }}
                        >
                          <Image
                            src="/images/fr-uae-guide-cover.png"
                            alt="France to UAE Cultural Intelligence Guide"
                            fill
                            className="object-contain"
                            style={{ transform: 'translateZ(0)' }}
                          />
                          {/* Book spine shadow effect */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/30 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                    <button
                      onClick={() => handleRegisterInterest('fr-uae')}
                      className="w-full mt-auto px-6 py-3 nav-button-glass text-sm font-semibold rounded-xl text-white/90 hover:text-white transition-all duration-300"
                    >
                      Register interest
                    </button>
                  </div>
                </motion.div>

                {/* Italy - Coming Soon */}
                <motion.div
                  variants={itemVariants}
                  className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/5 via-transparent to-orange/5" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="inline-block mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 border border-white/20 text-white/70">
                        Coming soon
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Italy to UAE Guide</h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm flex-grow">
                      For Italian professionals and families who want to understand how relationship focused communication and family values translate in the UAE.
                    </p>
                    <motion.div 
                      className="relative h-64 mb-4 perspective-1000 group cursor-pointer flex-shrink-0"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-full h-full transform-gpu preserve-3d transition-transform duration-500 group-hover:rotate-y-[-12deg]">
                        <div 
                          className="absolute inset-0 rounded-lg overflow-hidden bg-primary-dark"
                          style={{
                            transform: 'rotateY(-8deg) translateZ(0)',
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            filter: 'brightness(1.05)'
                          }}
                        >
                          <Image
                            src="/images/it-uae-guide-cover.png"
                            alt="Italy to UAE Cultural Intelligence Guide"
                            fill
                            className="object-contain"
                            style={{ transform: 'translateZ(0)' }}
                          />
                          {/* Book spine shadow effect */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/30 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                    <button
                      onClick={() => handleRegisterInterest('it-uae')}
                      className="w-full mt-auto px-6 py-3 nav-button-glass text-sm font-semibold rounded-xl text-white/90 hover:text-white transition-all duration-300"
                    >
                      Register interest
                    </button>
                  </div>
                </motion.div>

                {/* Russia - Coming Soon */}
                <motion.div
                  variants={itemVariants}
                  className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/5 via-transparent to-orange/5" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="inline-block mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 border border-white/20 text-white/70">
                        Coming soon
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Russia to UAE Guide</h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm flex-grow">
                      For Russian professionals and families who want to understand how direct communication and hierarchical structures work in the UAE context.
                    </p>
                    <motion.div 
                      className="relative h-64 mb-4 perspective-1000 group cursor-pointer flex-shrink-0"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-full h-full transform-gpu preserve-3d transition-transform duration-500 group-hover:rotate-y-[-12deg]">
                        <div 
                          className="absolute inset-0 rounded-lg overflow-hidden bg-primary-dark"
                          style={{
                            transform: 'rotateY(-8deg) translateZ(0)',
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            filter: 'brightness(1.05)'
                          }}
                        >
                          <Image
                            src="/images/russia-uae-guide-cover.png"
                            alt="Russia to UAE Cultural Intelligence Guide"
                            fill
                            className="object-contain"
                            priority
                            style={{ transform: 'translateZ(0)' }}
                          />
                          {/* Book spine shadow effect */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/30 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                    <button
                      onClick={() => handleRegisterInterest('ru-uae')}
                      className="w-full mt-auto px-6 py-3 nav-button-glass text-sm font-semibold rounded-xl text-white/90 hover:text-white transition-all duration-300"
                    >
                      Register interest
                    </button>
                  </div>
                </motion.div>

                {/* US - Coming Soon */}
                <motion.div
                  variants={itemVariants}
                  className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/5 via-transparent to-orange/5" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="inline-block mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 border border-white/20 text-white/70">
                        Coming soon
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">US to UAE Guide</h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm flex-grow">
                      For American professionals and families who want to understand how direct communication, individual achievement and business culture translate in the UAE context.
                    </p>
                    <motion.div 
                      className="relative h-64 mb-4 perspective-1000 group cursor-pointer flex-shrink-0"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-full h-full transform-gpu preserve-3d transition-transform duration-500 group-hover:rotate-y-[-12deg]">
                        <div 
                          className="absolute inset-0 rounded-lg overflow-hidden bg-primary-dark"
                          style={{
                            transform: 'rotateY(-8deg) translateZ(0)',
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            filter: 'brightness(1.05)'
                          }}
                        >
                          <Image
                            src="/images/us-uae-guide-cover.png"
                            alt="US to UAE Cultural Intelligence Guide"
                            fill
                            className="object-contain"
                            style={{ transform: 'translateZ(0)' }}
                          />
                          {/* Book spine shadow effect */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/30 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                    <button
                      onClick={() => handleRegisterInterest('us-uae')}
                      className="w-full mt-auto px-6 py-3 nav-button-glass text-sm font-semibold rounded-xl text-white/90 hover:text-white transition-all duration-300"
                    >
                      Register interest
                    </button>
                  </div>
                </motion.div>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-center text-white/60 text-sm mt-8"
              >
                When you register interest we will tag your email by origin country so you receive the right guide when it launches.
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2">
                  When You Need More Than An Online Guide
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Guides are perfect for independent learners. If you want tailored support for your team or family, our cultural intelligence masterclasses and advisory sessions go deeper into your real scenarios.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'For individuals and families',
                    items: [
                      'Seats in live or virtual cultural intelligence masterclasses',
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2" className="mb-6">
                  Choose The Next Step That Fits You
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                You do not have to understand everything today. Start with a guide or training that matches your origin country and life stage, and build your cultural intelligence step by step.
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
                      Review the four step overview
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
                        View the UK to UAE guide
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-center text-white/60 text-sm"
              >
                You can also buy the UK to UAE guide as a gift for a friend, colleague or family member who is about to move or has recently arrived in the Emirates.
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2" className="mb-12">
                  Questions About Moving To The UAE
                </PageHeading>
              </motion.div>

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

      {/* Register Interest Modal */}
      <AnimatePresence>
        {showRegisterModal && interestGuide && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCloseModal}
            />
            
            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative w-full max-w-md bg-primary-dark/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                <div className="relative z-10 p-8">
                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="w-16 h-16 text-orange mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                      <p className="text-white/80">
                        We'll notify you when the {guideNames[interestGuide]} is available.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Register Interest
                      </h3>
                      <p className="text-white/70 mb-6 text-sm">
                        Be the first to know when the {guideNames[interestGuide]} launches.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange/50 transition-colors"
                            placeholder="Your name"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange/50 transition-colors"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-3 cta-button-glow text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Submitting...' : 'Register Interest'}
                        </motion.button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ModernFooter />
    </>
  )
}
