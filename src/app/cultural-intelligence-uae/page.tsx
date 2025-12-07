'use client'

import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { Brain, Globe, Users, Target, CheckCircle, ArrowRight, MapPin, Award, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

export default function CulturalIntelligenceUAEPage() {
  const benefits = [
    'Navigate multicultural workplaces with confidence',
    'Build stronger relationships with Emirati colleagues and clients',
    'Communicate effectively across 200+ nationalities',
    'Understand business protocol and etiquette in the UAE',
    'Avoid cultural misunderstandings that damage relationships',
    'Lead diverse teams successfully in Dubai and Abu Dhabi',
  ]

  const trainingAreas = [
    {
      icon: Brain,
      title: 'Emirati Cultural Foundations',
      description: 'Understand the core values, traditions, and social codes that shape life in the UAE. Learn about Islamic etiquette, hospitality rituals, and national identity.',
    },
    {
      icon: Users,
      title: 'Cross-Cultural Communication',
      description: 'Master communication styles that work in the UAE. Learn to read between the lines, give feedback diplomatically, and build trust across cultures.',
    },
    {
      icon: Target,
      title: 'Business Protocol & Etiquette',
      description: 'Navigate hierarchy, decision-making, meetings, and negotiations in a relationship-driven business environment. Essential for executives and entrepreneurs.',
    },
    {
      icon: Globe,
      title: 'Multicultural Team Leadership',
      description: 'Lead teams of 200+ nationalities effectively. Understand how different cultures interpret clarity, feedback, trust, and authority.',
    },
  ]

  return (
    <>
      {/* FAQ Schema */}
      <Script
        id="cultural-intelligence-uae-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is cultural intelligence UAE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cultural intelligence UAE is the ability to understand, adapt to, and effectively work with people from diverse cultural backgrounds in the United Arab Emirates. It's essential for professionals in Dubai, Abu Dhabi, and across all seven emirates, where over 200 nationalities work and live together."
                }
              },
              {
                "@type": "Question",
                "name": "Where can I get cultural intelligence training in Dubai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Orange Code offers cultural intelligence training in Dubai and Abu Dhabi. Our masterclasses cover Emirati cultural foundations, cross-cultural communication, business protocol, and multicultural team leadership. We provide both in-person sessions at Etihad Towers in Abu Dhabi and online training options."
                }
              },
              {
                "@type": "Question",
                "name": "Why is cultural intelligence important in Abu Dhabi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cultural intelligence is crucial in Abu Dhabi because the UAE hosts one of the world's most diverse populations. Understanding Emirati culture, Islamic values, and how to navigate multicultural environments helps professionals build trust, communicate effectively, and succeed in business. Without it, misunderstandings increase and relationships suffer."
                }
              },
              {
                "@type": "Question",
                "name": "What does cultural intelligence training cover in the UAE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cultural intelligence training in the UAE covers Emirati cultural foundations, Islamic etiquette, communication styles, business protocol, hierarchy and decision-making, relationship-building, feedback styles, dress codes, and how to navigate multicultural teams. Training helps professionals adapt their approach while remaining authentic."
                }
              }
            ]
          })
        }}
      />
      {/* WebPage Schema */}
      <Script
        id="cultural-intelligence-uae-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cultural Intelligence UAE | Training in Dubai & Abu Dhabi",
            "description": "Cultural intelligence training in the UAE. Expert CQ courses and masterclasses in Dubai and Abu Dhabi. Learn Emirati culture, business protocol, and cross-cultural communication for success in the Emirates.",
            "url": "https://www.theorangecode.com/cultural-intelligence-uae",
            "inLanguage": "en",
            "isPartOf": {
              "@type": "WebSite",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "about": {
              "@type": "Thing",
              "name": "Cultural Intelligence UAE"
            },
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is cultural intelligence UAE?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Cultural intelligence UAE is essential for professionals working in Dubai, Abu Dhabi, and across the United Arab Emirates."
                  }
                }
              ]
            }
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
                    Cultural Intelligence Training UAE
                  </span>
                </motion.div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 px-4 sm:px-0 break-words">
                  <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent">
                    Cultural Intelligence UAE
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-white/90 mb-4 leading-relaxed">
                  Master cultural intelligence for success in Dubai, Abu Dhabi, and across the United Arab Emirates
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto">
                  Essential training for professionals working in one of the world's most diverse business environments. Learn Emirati culture, cross-cultural communication, and business protocol.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Why Cultural Intelligence UAE Section */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      Why Cultural Intelligence Matters in the UAE
                    </span>
                  </h2>
                  <div className="space-y-6 text-lg leading-relaxed text-white/90">
                    <p>
                      The <strong className="text-white">United Arab Emirates</strong> is home to over <strong className="text-orange">200 nationalities</strong>, making it one of the most culturally diverse countries in the world. Whether you're working in <strong className="text-azure-blue">Dubai</strong>, <strong className="text-azure-blue">Abu Dhabi</strong>, or any of the seven emirates, <strong className="text-orange">cultural intelligence</strong> is not optional—it's essential for professional success.
                    </p>
                    <p>
                      <strong className="text-white">Cultural intelligence UAE</strong> helps you understand how Emirati traditions, Islamic values, and international business practices intersect. It enables you to communicate with clarity, build trust across cultures, navigate hierarchy appropriately, and avoid misunderstandings that can damage relationships and business opportunities.
                    </p>
                    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border-l-4 border-orange mt-8">
                      <p className="text-white font-semibold text-lg">
                        Without cultural intelligence, even the most skilled professionals struggle in the UAE. With it, you unlock deeper connections, clearer communication, and genuine respect from colleagues and clients across all cultures.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                    Benefits of Cultural Intelligence Training in the UAE
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </motion.div>

                {/* Training Areas */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                    What Our Cultural Intelligence Training Covers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trainingAreas.map((area, index) => {
                      const Icon = area.icon
                      return (
                        <motion.div
                          key={area.title}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 }}
                          whileHover={{ y: -10, scale: 1.02 }}
                          className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm group"
                        >
                          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-orange/20 transition-colors">
                            <Icon className="w-8 h-8 text-orange" />
                          </div>
                          <h4 className="text-xl font-bold text-white mb-3">{area.title}</h4>
                          <p className="text-white/70 leading-relaxed">{area.description}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Location Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <MapPin className="w-10 h-10 text-orange" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      Cultural Intelligence Training Locations
                    </h3>
                  </div>
                  <div className="space-y-4 text-lg text-white/90">
                    <p>
                      <strong className="text-white">Abu Dhabi:</strong> In-person masterclasses at Etihad Towers, Tower 3, Floor 36.
                    </p>
                    <p>
                      <strong className="text-white">Dubai:</strong> Corporate training and private coaching available. We bring cultural intelligence expertise to your office or preferred location.
                    </p>
                    <p>
                      <strong className="text-white">Online:</strong> Virtual cultural intelligence training available for international clients and remote teams.
                    </p>
                  </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center py-8"
                >
                  <Link href="/masterclasses">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl cta-button-glow text-white font-bold text-lg"
                    >
                      <span>Start Your Cultural Intelligence Training</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.a>
                  </Link>
                  <p className="text-white/70 mt-4">
                    Join professionals from across the UAE who are mastering cultural intelligence
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        </motion.main>

        <ModernFooter />
      </div>
    </>
  )
}

