'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CheckCircle, ArrowRight, Home, Briefcase, Car, ShoppingBag, Globe, Users, Calendar, MapPin, Utensils, Mountain, Palette, Music, Coffee, GraduationCap, Baby, ChevronDown, Clock } from 'lucide-react'
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

export default function UAELivingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

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
            "name": "Life in the UAE. Cultural intelligence guide to living in Dubai and Abu Dhabi",
            "description": "A calm, research based overview of life in the UAE for expats and professionals from around the world. Learn what everyday life in Dubai and Abu Dhabi feels like, how culture and etiquette work, and how cultural intelligence helps you feel at home faster.",
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
              "description": "Guide to life in the United Arab Emirates seen through cultural intelligence. Covers everyday life, work culture, etiquette and community in Dubai, Abu Dhabi and the wider UAE."
            },
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is the UAE safe for families and solo expats",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The UAE is considered one of the safest countries in the world with very low crime rates and clear rules. Families and solo expats generally feel secure, while normal urban awareness is still recommended."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which emirates are most popular to live in",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dubai and Abu Dhabi attract most expats because of their international communities, infrastructure and career opportunities. Other emirates such as Sharjah and Ras Al Khaimah offer a different rhythm of life and often lower costs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to speak Arabic to live in the UAE",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "English is widely used in business, education and daily life across the UAE. Learning basic Arabic greetings and phrases shows respect and can deepen relationships, but it is not a strict requirement for most expats."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the weather like in the UAE during the year",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The UAE has hot summers from May to September and mild winters from October to April. Summer life is focused indoors with air conditioning, while winter is the main season for outdoor activities, events and social life."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where can I learn more about moving to the UAE",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For relocation planning, visit The Orange Code Moving to the UAE hub at /moving-to-uae. It offers step by step guidance on visas, work culture, housing and cultural intelligence. British citizens can also explore the UK to UAE relocation guide at /uk-to-uae-relocation."
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
                className="max-w-5xl mx-auto text-center"
              >
                {/* Small label */}
                <motion.div variants={itemVariants} className="inline-flex items-center justify-center mb-6">
                  <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-white/80">
                    Life in the UAE
                  </span>
                </motion.div>

                {/* Main heading */}
                <motion.div variants={itemVariants} className="mb-6">
                  <PageHeading level="h1">
                    Life in the UAE through a cultural intelligence lens
                  </PageHeading>
                </motion.div>

                {/* Subheading */}
                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                  A calm, practical overview of everyday life in Dubai, Abu Dhabi and the wider Emirates. Written for professionals, families, students and entrepreneurs who want to understand how life here really works.
                </motion.p>

                {/* Bullet highlights */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange" />
                    <span>See everyday life in the UAE beyond social media and tourism</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-azure-blue" />
                    <span>Understand the cultural patterns that shape work and daily routines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-bright-blue" />
                    <span>Decide how the UAE fits into your life and career story</span>
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
                    Thinking about relocating soon? Visit the Moving to the UAE hub for next steps.
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2">
                  Why people from around the world choose the UAE
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                The UAE has become a meeting point for global talent, ambitious careers and diverse communities. For many people it is a place to accelerate their professional growth, provide stability for their families and experience a new cultural landscape in a safe and well organised environment.
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
                      title: 'Careers and business',
                      text: 'Regional headquarters, family companies and fast growing sectors offer opportunities in finance, aviation, energy, healthcare, technology and creative industries.'
                    },
                    {
                      icon: Home,
                      title: 'Quality of life',
                      text: 'Modern infrastructure, reliable services, high safety levels and a strong focus on comfort and convenience shape daily life in Dubai, Abu Dhabi and other emirates.'
                    },
                    {
                      icon: Users,
                      title: 'Diversity and community',
                      text: 'People from many national backgrounds live and work together. You find mixed communities, international schools and networks that can feel both familiar and new.'
                    },
                    {
                      icon: Globe,
                      title: 'Location and connectivity',
                      text: 'The UAE sits between Europe, Asia and Africa. Direct flights and regional links make it an ideal base for international work and frequent travel.'
                    }
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors h-full"
                      >
                        <Icon className="w-8 h-8 text-orange flex-shrink-0 mt-1" />
                        <div className="flex-grow">
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2">
                  What everyday life in the UAE feels like
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                This section gives a realistic picture of how days and weeks flow when you live in the Emirates.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Clock,
                    title: 'Daily rhythm',
                    text: 'Work and school weeks usually run Monday to Friday, with Friday afternoons and weekends holding special meaning for prayer, rest and family time. Evenings are often social, with cafes and malls open late.'
                  },
                  {
                    icon: Home,
                    title: 'Neighbourhoods and housing',
                    text: 'High rise apartments, villa communities and more traditional areas each have their own pace and culture. Many expats live in mixed communities where neighbours come from several countries.'
                  },
                  {
                    icon: Car,
                    title: 'Moving around the city',
                    text: 'Public transport, taxis and ride hailing apps are widely used. Cars remain important for many families. In summer, movement centres around air conditioned routes, while winter invites more walking.'
                  },
                  {
                    icon: ShoppingBag,
                    title: 'Day to day errands',
                    text: 'Most services, from groceries to maintenance, can be ordered online or through apps. Local markets, international supermarkets and small neighbourhood shops sit side by side.'
                  }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] h-full flex flex-col"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                      <div className="relative z-10 flex flex-col h-full">
                        <Icon className="w-10 h-10 text-orange mb-4 flex-shrink-0" />
                        <h3 className="text-xl font-bold text-white mb-3 flex-shrink-0">{item.title}</h3>
                        <p className="text-white/70 leading-relaxed flex-grow">{item.text}</p>
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2">
                  Culture, etiquette and feeling at home
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Life in the UAE is shaped by Emirati traditions, Islamic values and a large international community. Understanding how these layers work together is at the heart of cultural intelligence. When you know what respect looks like in practice, you feel more grounded and relationships grow faster.
              </motion.p>

              {/* Three column list */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: 'Respectful behaviour',
                    text: 'Awareness of dress in certain places, public affection, photography, alcohol rules and online behaviour protects your reputation and shows respect for local norms.'
                  },
                  {
                    title: 'Communication style',
                    text: 'Polite and relationship focused communication is important. People often avoid direct confrontation, choose careful wording and value patience in decision making.'
                  },
                  {
                    title: 'Rhythm of religious life',
                    text: 'Ramadan, Eid and other holidays influence working hours, social life and the pace of the city. Knowing what to expect helps you plan well and support colleagues and neighbours.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-6 rounded-2xl bg-primary-dark/60 backdrop-blur-[20px] border border-white/10 h-full flex flex-col"
                  >
                    <h3 className="text-lg font-bold text-white mb-3 flex-shrink-0">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed flex-grow">{item.text}</p>
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
                  <h3 className="text-2xl font-bold text-white mb-3">Want to understand the deeper patterns behind life in the UAE</h3>
                  <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                    Our cultural intelligence masterclasses and country specific guides explain how values, expectations and unwritten rules show up in meetings, emails, friendships and community life.
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2">
                  How people recharge and explore on weekends
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Weekends in the UAE can feel like a mix of normal life and mini city breaks. Many expats use free time to explore the country and build new routines that fit the climate and culture.
              </motion.p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Mountain,
                    title: 'Desert and nature',
                    text: 'From quiet sunrise walks in the desert to mountain trails and mangroves, nature offers a break from the fast pace of the city, especially in the cooler months.'
                  },
                  {
                    icon: Palette,
                    title: 'Culture and heritage',
                    text: 'Museums, heritage districts, mosques that welcome visitors and local festivals give insight into Emirati and regional culture.'
                  },
                  {
                    icon: Music,
                    title: 'Sports and events',
                    text: 'From international tournaments to concerts and exhibitions, the events calendar is full year round, with a peak in the winter season.'
                  },
                  {
                    icon: Coffee,
                    title: 'Food and social life',
                    text: 'Cafes, restaurants and home gatherings are central to building community. Many friendships start over a simple coffee or shared meal.'
                  }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] h-full flex flex-col"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                      <div className="relative z-10 flex flex-col h-full">
                        <Icon className="w-10 h-10 text-orange mb-4 flex-shrink-0" />
                        <h3 className="text-lg font-bold text-white mb-3 flex-shrink-0">{item.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed flex-grow">{item.text}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.p
                variants={itemVariants}
                className="text-center text-white/60 text-sm mt-8"
              >
                We will soon add a curated list of trusted event and ticket platforms that can help newcomers discover experiences that match their interests.
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2">
                  Who this guide is designed for
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
              >
                Life in the UAE attracts many different profiles. Cultural intelligence gives each of them a clearer path into the country.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Briefcase,
                    title: 'Global professionals and leaders',
                    fit: 'You want to perform at a high level in the UAE workplace, manage regional teams or represent your organisation in front of senior stakeholders.',
                    consider: 'Cultural intelligence helps you read context, build trust and avoid costly misunderstandings in meetings and negotiations.'
                  },
                  {
                    icon: Baby,
                    title: 'Families and dual career couples',
                    fit: 'You want a safe, stable base with good education options and a clear future for your children while maintaining your own careers.',
                    consider: 'Understanding how family life, schooling and social networks work in the UAE helps you design a sustainable set up.'
                  },
                  {
                    icon: GraduationCap,
                    title: 'Students and early career talent',
                    fit: 'You want to study, intern or start your career in a multicultural environment that stretches your comfort zone in a positive way.',
                    consider: 'Knowing how to show professionalism in a new culture puts you ahead of peers and reduces early mistakes.'
                  },
                  {
                    icon: Users,
                    title: 'Entrepreneurs and independent consultants',
                    fit: 'You see the UAE and wider GCC as a strategic base for your business or advisory work.',
                    consider: 'Cultural intelligence supports client relationships, partnership building and long term reputation in the region.'
                  }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] h-full flex flex-col"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                      <div className="relative z-10 flex flex-col h-full">
                        <Icon className="w-10 h-10 text-orange mb-4 flex-shrink-0" />
                        <h3 className="text-xl font-bold text-white mb-3 flex-shrink-0">{item.title}</h3>
                        <p className="text-white/80 mb-3 leading-relaxed flex-shrink-0">{item.fit}</p>
                        <p className="text-white/70 mb-4 text-sm leading-relaxed flex-grow">{item.consider}</p>
                        <Link 
                          href="/moving-to-uae"
                          className="text-sm text-orange hover:text-azure-blue transition-colors inline-flex items-center gap-1 flex-shrink-0 mt-auto"
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2" className="mb-6">
                  Ready to turn curiosity into a clear UAE plan
                </PageHeading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                If life in the UAE feels like a serious option, you can move from browsing information to building a structured, culturally aware plan.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  variants={itemVariants}
                  className="relative p-8 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] h-full flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-azure-blue/10" />
                  <div className="relative z-10 flex flex-col h-full">
                    <Link href="/moving-to-uae" className="flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 mb-4"
                      >
                        Visit the Moving to the UAE hub
                      </motion.button>
                    </Link>
                    <p className="text-white/60 text-sm flex-grow">Step by step guidance on visas, work culture, housing and cultural intelligence for all nationalities.</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="relative p-8 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px] h-full flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-azure-blue/10 via-transparent to-orange/10" />
                  <div className="relative z-10 flex flex-col h-full">
                    <Link href="/uk-to-uae-relocation" className="flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 mb-4"
                      >
                        UK to UAE guide for British expats
                      </motion.button>
                    </Link>
                    <p className="text-white/60 text-sm flex-grow">A dedicated cultural intelligence guide for British citizens who want a clear roadmap for their move.</p>
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
              <motion.div variants={itemVariants}>
                <PageHeading level="h2" className="mb-12">
                  Frequently asked questions about life in the UAE
                </PageHeading>
              </motion.div>

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
                    a: 'For structured relocation planning, visit our Moving to the UAE hub at /moving-to-uae. It brings together legal, practical and cultural considerations for expats from many countries. British citizens can also explore our UK to UAE relocation guide at /uk-to-uae-relocation, which explains the specific differences between UK and UAE culture.'
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

