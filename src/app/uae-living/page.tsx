'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CheckCircle, ArrowRight, Home, Briefcase, Car, ShoppingBag, Globe, Users, Calendar, MapPin, Utensils, Mountain, Palette, Music, Coffee, GraduationCap, Baby, ChevronDown, Clock } from 'lucide-react'
import Link from 'next/link'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import Script from 'next/script'

// Dynamic imports for performance
const AtmosphericBackground = dynamic(
  () => import('@/components/AtmosphericBackground').then(mod => ({ default: mod.AtmosphericBackground })),
  { ssr: false, loading: () => null }
)

export default function UAELivingPage() {
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
        id="uae-living-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Life in the UAE. Everyday living in Dubai and Abu Dhabi",
            "description": "A calm, practical overview of life in the UAE for expats and newcomers from around the world. Learn about daily life, culture, housing, transport and weekends in Dubai and Abu Dhabi.",
            "url": "https://www.theorangecode.com/uae-living",
            "inLanguage": "en",
            "isPartOf": {
              "@type": "WebSite",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "about": {
              "@type": "Thing",
              "name": "Life in the UAE",
              "description": "Comprehensive guide to living in the United Arab Emirates, covering daily life, culture, housing, transport, and lifestyle in Dubai and Abu Dhabi."
            },
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is the UAE safe for families and solo travellers?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The UAE is considered one of the safest countries in the world with very low crime rates. It has a rules-based environment with strong law enforcement. Families and solo travellers can feel secure, though normal urban awareness is always recommended."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which emirates are best to live in?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dubai and Abu Dhabi are the most popular choices for expats, offering international communities, modern infrastructure, and diverse opportunities. Other emirates like Sharjah and Ras Al Khaimah offer different vibes with more traditional settings and often lower costs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to speak Arabic to live in the UAE?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "English is widely used in business, education, and daily life throughout the UAE. However, learning some Arabic helps with deeper connections, shows respect for local culture, and can be valuable in certain professional and social contexts."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the weather really like in the UAE?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The UAE has two main seasons: hot summers (May to September) with temperatures often above 40°C, and pleasant winters (October to April) with temperatures around 20-30°C. Summer life is mostly indoors with air conditioning, while winter offers extensive outdoor activities."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where can I learn more about moving to the UAE?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Visit our Moving to the UAE hub at /moving-to-uae for step-by-step guidance on visas, housing, work, and cultural intelligence for all nationalities. British citizens can also explore our dedicated UK to UAE relocation guide at /uk-to-uae-relocation."
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
                    UAE Living
                  </span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-normal text-center w-full"
                >
                  <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent block lg:whitespace-nowrap text-center pt-2 pb-1">
                    Discover What Life in the UAE Really Feels Like
                  </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                  A calm, practical guide to everyday life in Dubai, Abu Dhabi and beyond. Written for professionals, families, students and curious explorers from every part of the world.
                </motion.p>

                {/* Bullet highlights */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange" />
                    <span>Understand daily life, culture and unwritten rules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-azure-blue" />
                    <span>Explore work, study and lifestyle possibilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-bright-blue" />
                    <span>Decide if the UAE is the right next chapter for you</span>
                  </div>
                </motion.div>

                {/* Primary CTA */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
                  <motion.button
                    onClick={() => {
                      document.getElementById('why-choose-uae')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                  >
                    Explore life in the UAE
                  </motion.button>
                  
                  <Link 
                    href="/moving-to-uae"
                    className="text-sm text-white/60 hover:text-white/90 underline-offset-2 hover:underline transition-colors"
                  >
                    Thinking about relocating soon? Visit the Moving to the UAE hub.
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Why Choose UAE */}
        <section id="why-choose-uae" className="relative py-16 md:py-24">
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
                  Why People From Around The World Choose The UAE
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                The UAE has become a global hub for careers, family life and new experiences. From the dynamic business districts of Dubai to the cultural richness of Abu Dhabi and the emerging opportunities in other emirates, the country offers safety, opportunities, multicultural communities and exceptional quality of life.
              </motion.p>

              {/* Glassmorphism card with highlights */}
              <motion.div
                variants={itemVariants}
                className="relative p-8 md:p-10 rounded-3xl overflow-hidden border border-white/10 bg-primary-dark/60 backdrop-blur-[20px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                <div className="relative z-10 grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Briefcase,
                      title: 'Career and business',
                      text: 'International companies, favorable tax environment, emerging industries and regional headquarters create diverse career opportunities.'
                    },
                    {
                      icon: Home,
                      title: 'Lifestyle and comfort',
                      text: 'Modern infrastructure, world-class shopping, diverse restaurants, beautiful beaches, parks and air conditioned comfort everywhere.'
                    },
                    {
                      icon: Users,
                      title: 'Diversity and community',
                      text: 'People from over 200 nationalities, multiple languages, international schools and vibrant mixed communities create a truly global experience.'
                    },
                    {
                      icon: Globe,
                      title: 'Travel and location',
                      text: 'Short flights to Europe, Africa and Asia, plus easy regional weekend trips make the UAE a perfect base for exploring the world.'
                    }
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <Icon className="w-8 h-8 text-orange flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: Everyday Life */}
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
                  Everyday Life in Dubai and Abu Dhabi
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                This section gives you a realistic but encouraging picture of daily life in the Emirates.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Clock,
                    title: 'Weekday rhythm',
                    text: 'Office hours typically run Sunday to Thursday or Monday to Friday depending on your employer. School times align with work schedules. Prayer times influence traffic patterns, and evening social life is vibrant with restaurants and cafes open late.'
                  },
                  {
                    icon: Home,
                    title: 'Housing and neighbourhoods',
                    text: 'Choose between modern apartments in high-rise towers or spacious villas in gated communities. Some areas are metro-connected while others are car-focused. Your relocation hub provides deeper insights into costs, paperwork and neighborhood selection.'
                  },
                  {
                    icon: Car,
                    title: 'Transport and getting around',
                    text: 'Metro systems in Dubai and Abu Dhabi, reliable taxis, ride-hailing apps, and walkable areas in winter. Summer heat makes air-conditioned transport essential. Driving requires understanding local rules and traffic patterns.'
                  },
                  {
                    icon: ShoppingBag,
                    title: 'Food, groceries and daily errands',
                    text: 'International supermarkets, delivery apps for everything, diverse cuisines from around the world, local bakeries, and halal food context throughout. Daily errands are convenient with modern services and infrastructure.'
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
                        <p className="text-white/70 leading-relaxed">{item.text}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: Culture and Etiquette */}
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
                  Culture, Etiquette and Feeling At Home
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                The UAE is rooted in Emirati and Islamic culture, with a very international expat population. Respect, modesty, hospitality and understanding small cultural nuances can make a significant difference in how you experience life here.
              </motion.p>

              {/* Three column list */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: 'Respectful behaviour',
                    text: 'Dress codes in certain places, public behaviour expectations, photography rules, and social media considerations help you navigate daily interactions with respect.'
                  },
                  {
                    title: 'Communication style',
                    text: 'Polite, indirect language, avoiding open conflict, reading non-verbal cues and understanding context helps build stronger relationships in professional and social settings.'
                  },
                  {
                    title: 'Religious and public holidays',
                    text: 'Ramadan, Eid celebrations, National Day and other holidays change the rhythm of life. Understanding these periods and how to prepare makes integration smoother.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-6 rounded-2xl bg-primary-dark/60 backdrop-blur-[20px] border border-white/10"
                  >
                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Card */}
              <motion.div
                variants={itemVariants}
                className="relative p-8 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-orange/10 via-transparent to-azure-blue/10 backdrop-blur-[20px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">Want a deeper understanding of UAE culture</h3>
                  <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                    Our Cultural Intelligence masterclasses and relocation guides show you how to navigate work, social life and communication with confidence.
                  </p>
                  <Link href="/moving-to-uae">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
                    >
                      Explore Moving to the UAE
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: Weekends and Experiences */}
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
                  Weekends, Events and Experiences
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Life in the UAE can feel like living in a permanent city break if used wisely. From desert adventures to world-class events, there is always something to explore.
              </motion.p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Mountain,
                    title: 'Desert and nature',
                    text: 'Desert safaris, mountain hikes, mangrove kayaking, beach days and outdoor adventures year-round.'
                  },
                  {
                    icon: Palette,
                    title: 'Culture and art',
                    text: 'Museums, galleries, heritage areas, local festivals and cultural events throughout the year.'
                  },
                  {
                    icon: Music,
                    title: 'Sports and concerts',
                    text: 'Formula 1, football, tennis tournaments, concerts and performances by international artists.'
                  },
                  {
                    icon: Coffee,
                    title: 'Restaurants and cafes',
                    text: 'From street food to fine dining, diverse world cuisines and vibrant cafe culture in every neighborhood.'
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
                        <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.p
                variants={itemVariants}
                className="text-center text-white/60 text-sm mt-8"
              >
                We will soon add a curated list of events and experiences for newcomers, including selected ticket platforms.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: Is UAE Right For You */}
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
                className="text-3xl md:text-5xl font-bold mb-6 text-center"
              >
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  Is Life in the UAE Right For You
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                This is not a simple yes or no. It depends on your personality, goals and stage of life. Here is how different people experience the UAE.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Briefcase,
                    title: 'Young professionals and entrepreneurs',
                    fit: 'The UAE offers rapid career growth, networking opportunities, tax benefits and a dynamic business environment.',
                    consider: 'Consider work-life balance, cost of living in premium areas and building long-term connections.'
                  },
                  {
                    icon: Baby,
                    title: 'Families with children',
                    fit: 'International schools, safe neighborhoods, family-friendly activities and diverse communities make it ideal for raising children.',
                    consider: 'Think about school costs, healthcare access, proximity to extended family and long-term education planning.'
                  },
                  {
                    icon: GraduationCap,
                    title: 'Students and early career explorers',
                    fit: 'Universities, internships, part-time opportunities and a multicultural environment provide rich learning experiences.',
                    consider: 'Consider tuition fees, visa requirements, part-time work regulations and career transition planning.'
                  },
                  {
                    icon: Users,
                    title: 'Senior professionals and second career seekers',
                    fit: 'Consulting opportunities, advisory roles, teaching positions and business ventures offer new chapter possibilities.',
                    consider: 'Think about retirement planning, healthcare coverage, residency options and maintaining professional networks.'
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
                        <Icon className="w-10 h-10 text-orange mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-white/80 mb-3 leading-relaxed">{item.fit}</p>
                        <p className="text-white/70 mb-4 text-sm leading-relaxed">{item.consider}</p>
                        <Link 
                          href="/moving-to-uae"
                          className="text-sm text-orange hover:text-azure-blue transition-colors inline-flex items-center gap-1"
                        >
                          See relocation advice <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7: CTA Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
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
                  Ready To Explore Your Move More Seriously
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                If you recognise yourself in any of the above personas, you can move from inspiration to clear planning with our comprehensive resources.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  variants={itemVariants}
                  className="relative p-8 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-azure-blue/10" />
                  <div className="relative z-10">
                    <Link href="/moving-to-uae">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 mb-4"
                      >
                        Visit the Moving to the UAE hub
                      </motion.button>
                    </Link>
                    <p className="text-white/60 text-sm">Step-by-step guidance for visas, housing, work and cultural intelligence for all nationalities.</p>
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
                        UK to UAE guide for British expats
                      </motion.button>
                    </Link>
                    <p className="text-white/60 text-sm">A dedicated cultural intelligence guide for British citizens who plan to relocate from the UK.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8: FAQ */}
        <section className="relative py-16 md:py-24">
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
                  Frequently asked questions about life in the UAE
                </span>
              </motion.h2>

              <div className="space-y-3">
                {[
                  {
                    q: 'Is the UAE safe for families and solo travellers?',
                    a: 'The UAE is considered one of the safest countries in the world with very low crime rates. It has a rules-based environment with strong law enforcement. Families and solo travellers can feel secure, though normal urban awareness is always recommended.'
                  },
                  {
                    q: 'Which emirates are best to live in?',
                    a: 'Dubai and Abu Dhabi are the most popular choices for expats, offering international communities, modern infrastructure, and diverse opportunities. Other emirates like Sharjah and Ras Al Khaimah offer different vibes with more traditional settings and often lower costs.'
                  },
                  {
                    q: 'Do I need to speak Arabic to live in the UAE?',
                    a: 'English is widely used in business, education, and daily life throughout the UAE. However, learning some Arabic helps with deeper connections, shows respect for local culture, and can be valuable in certain professional and social contexts.'
                  },
                  {
                    q: 'What is the weather really like in the UAE?',
                    a: 'The UAE has two main seasons: hot summers (May to September) with temperatures often above 40°C, and pleasant winters (October to April) with temperatures around 20-30°C. Summer life is mostly indoors with air conditioning, while winter offers extensive outdoor activities.'
                  },
                  {
                    q: 'Where can I learn more about moving to the UAE?',
                    a: 'Visit our Moving to the UAE hub at /moving-to-uae for step-by-step guidance on visas, housing, work, and cultural intelligence for all nationalities. British citizens can also explore our dedicated UK to UAE relocation guide at /uk-to-uae-relocation.'
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

