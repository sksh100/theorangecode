'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Download, ArrowRight, MessageCircle, Share2, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton'
import { SocialShareButtons } from '@/components/SocialShareButtons'
import { trackCTAClick } from '@/lib/tracking'
import dynamic from 'next/dynamic'

const AtmosphericBackground = dynamic(
  () => import('@/components/AtmosphericBackground').then(mod => ({ default: mod.AtmosphericBackground })),
  { ssr: false, loading: () => null }
)

export default function RelocationChecklistPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const checklistItems = [
    {
      category: 'Before You Arrive',
      items: [
        'Research UAE cultural norms and business etiquette',
        'Understand workplace hierarchy and communication styles',
        'Learn about dress codes for men and women',
        'Familiarize yourself with UAE laws and regulations',
        'Prepare necessary documents (passport, visa, certificates)',
        'Set up banking arrangements',
        'Research accommodation options',
        'Understand healthcare system and insurance requirements'
      ]
    },
    {
      category: 'First Week Essentials',
      items: [
        'Complete Emirates ID application',
        'Open a UAE bank account',
        'Get a local SIM card and phone number',
        'Register with a healthcare provider',
        'Set up utilities (electricity, water, internet)',
        'Learn basic Arabic greetings',
        'Understand local transportation options',
        'Find grocery stores and essential services'
      ]
    },
    {
      category: 'Workplace Integration',
      items: [
        'Observe communication styles in your workplace',
        'Build relationships with Emirati colleagues',
        'Understand meeting etiquette and protocols',
        'Learn about feedback and decision-making processes',
        'Adapt to time perception and scheduling',
        'Respect hierarchical structures',
        'Participate in team-building activities',
        'Seek cultural intelligence training if needed'
      ]
    },
    {
      category: 'Cultural Adaptation',
      items: [
        'Respect local customs and traditions',
        'Understand religious practices and observances',
        'Learn about appropriate social behaviors',
        'Adapt communication style (indirect, diplomatic)',
        'Build trust through relationship-building',
        'Avoid cultural faux pas',
        'Participate in local events and celebrations',
        'Connect with expat communities for support'
      ]
    }
  ]

  const handleDownload = () => {
    trackCTAClick('Download Checklist PDF', '/uk-to-uae-relocation-checklist')
    // In production, this would download the actual PDF
    // For now, we'll create a printable version
    window.print()
  }

  return (
    <>
      <div className="relative w-full bg-primary-dark text-white min-h-screen">
        {/* Atmospheric Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <AtmosphericBackground mousePosition={{ x: 0, y: 0 }} scrollProgress={0} />
        </div>

        <ModernNavbar />

        <main className="relative z-10">
          {/* HERO SECTION */}
          <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
            <div className="absolute inset-0 bg-gradient-to-b from-orange/5 via-transparent to-azure-blue/5" />
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={mounted ? "visible" : "visible"}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
              >
                <motion.div
                  variants={itemVariants}
                  className="inline-block mb-6"
                >
                  <span className="text-orange text-sm font-semibold tracking-wider uppercase">
                    Free Resource
                  </span>
                </motion.div>
                
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent">
                    UK to UAE Relocation
                  </span>
                  <br />
                  <span className="text-white mt-2 block">
                    Essential Checklist
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
                >
                  A comprehensive checklist to help British professionals prepare for their move to the UAE. Share this with friends, family, and colleagues who are relocating.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4 justify-center mb-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF Checklist
                  </motion.button>
                  
                  <SocialShareButtons
                    url="https://www.theorangecode.com/uk-to-uae-relocation-checklist"
                    title="UK to UAE Relocation Checklist"
                    description="A comprehensive free checklist to help British professionals prepare for their move to the UAE."
                    variant="default"
                    showLabel={true}
                  />
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-sm text-white/60"
                >
                  ⭐ Free resource • Share with anyone who needs it
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* CHECKLIST SECTION */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto"
              >
                {checklistItems.map((category, categoryIndex) => (
                  <motion.div
                    key={categoryIndex}
                    variants={itemVariants}
                    className="mb-12"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                      <span className="bg-gradient-to-r from-orange to-azure-blue bg-clip-text text-transparent">
                        {category.category}
                      </span>
                    </h2>
                    
                    <div className="relative p-6 md:p-8 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark/90 backdrop-blur-[20px]">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5" />
                      <div className="relative z-10 space-y-4">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-6 h-6 text-orange flex-shrink-0 mt-0.5" />
                            <span className="text-white/90 text-base leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA TO FULL EBOOK */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl mx-auto text-center"
              >
                <motion.div
                  variants={itemVariants}
                  className="relative p-8 md:p-12 rounded-2xl overflow-hidden border-2 border-orange/30 bg-gradient-to-br from-orange/10 via-primary-dark/90 to-azure-blue/10 backdrop-blur-[20px]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange/20 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-azure-blue/20 rounded-full blur-3xl translate-y-20 -translate-x-20" />
                  
                  <div className="relative z-10">
                    <BookOpen className="w-16 h-16 text-orange mx-auto mb-6" />
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      Need More Detailed Guidance?
                    </h2>
                    
                    <p className="text-lg text-white/80 mb-6 leading-relaxed">
                      This checklist covers the essentials. For comprehensive cultural intelligence, workplace communication strategies, and in-depth guidance, get the full <strong>UK to UAE Cultural Intelligence Guide</strong>.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                      <Link href="/uk-to-uae-relocation">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => trackCTAClick('Get Full Guide - Checklist Page', '/uk-to-uae-relocation-checklist')}
                          className="px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 flex items-center gap-2"
                        >
                          Get the Full Guide
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </Link>
                      
                      <SocialShareButtons
                        url="https://www.theorangecode.com/uk-to-uae-relocation"
                        title="UK to UAE Relocation Cultural Guide"
                        description="A practical cultural intelligence guide for British professionals relocating to the UAE."
                        variant="compact"
                        showLabel={true}
                        className="justify-center"
                      />
                    </div>

                    <p className="text-white/60 text-sm mt-6">
                      📚 9 comprehensive chapters • 💼 Workplace culture • 🤝 Communication strategies • ⭐ 4.9/5 rating
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SHARE SECTION */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl mx-auto text-center"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl md:text-4xl font-bold mb-4 text-white"
                >
                  Share This Checklist
                </motion.h2>
                
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-white/80 mb-8 leading-relaxed"
                >
                  If you know someone preparing to move to the UAE, share this checklist with them. It's free and could save them from costly mistakes.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                >
                  <SocialShareButtons
                    url="https://www.theorangecode.com/uk-to-uae-relocation-checklist"
                    title="UK to UAE Relocation Checklist"
                    description="A comprehensive free checklist to help British professionals prepare for their move to the UAE."
                    variant="default"
                    showLabel={true}
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        <ModernFooter />
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
            color: black;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}

