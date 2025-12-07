'use client'

// Force dynamic rendering to prevent build timeouts
export const dynamic = 'force-dynamic'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Target, Heart, Eye, Users, Globe, ArrowRight, CheckCircle, Zap } from 'lucide-react'
import Image from 'next/image'
import Script from 'next/script'

// Import components normally - they should render on server to prevent blank screens
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'

const ValuesTimeline = dynamic(
  () => import('@/components/ValuesTimeline').then(mod => ({ default: mod.ValuesTimeline })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-orange rounded-full animate-spin" />
      </div>
    )
  }
)

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
    <>
      {/* Explicit canonical tag */}
      <link rel="canonical" href="https://www.theorangecode.com/about" />
      {/* Structured Data */}
      <Script
        id="about-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "The Orange Code",
            "url": "https://www.theorangecode.com",
            "logo": "https://www.theorangecode.com/logo1.png",
            "description": "Cultural Intelligence & Leadership Training in Abu Dhabi, UAE. We empower professionals moving to the UAE to develop cultural intelligence, understand Emirati culture and etiquette, and master doing business in the Emirates.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Etihad Towers, Tower 3, Floor 36",
              "addressLocality": "Abu Dhabi",
              "addressRegion": "Abu Dhabi",
              "addressCountry": "AE"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+971568786106",
              "email": "hello@theorangecode.com",
              "contactType": "Customer Service"
            },
            "sameAs": [
              "https://www.instagram.com/the.orangecode"
            ],
            "foundingDate": "2024",
            "areaServed": {
              "@type": "Country",
              "name": "United Arab Emirates"
            }
          })
        }}
      />
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About The Orange Code",
            "description": "Learn about The Orange Code, a cultural intelligence and leadership training platform in Abu Dhabi, UAE. Our mission is to bridge people, cultures and intelligence.",
            "url": "https://www.theorangecode.com/about",
            "mainEntityOfPage": "https://www.theorangecode.com/about",
            "about": {
              "@type": "Organization",
              "name": "The Orange Code",
              "description": "The Orange Code equips individuals, teams and organisations with the cultural intelligence needed to communicate with clarity, build lasting connections and operate confidently across the UAE and wider Gulf.",
              "url": "https://www.theorangecode.com",
              "foundingDate": "2024"
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
        {/* Hero Image Section */}
        <section className="relative overflow-hidden">
          <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full">
            <Image
              src="/about-us-image.JPG"
              alt="The Orange Code - About Us"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 via-primary-dark/60 to-primary-dark/90" />
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-6 pb-12 md:pb-16 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-block mb-4"
                  >
                    <span className="text-orange text-sm font-semibold tracking-wider uppercase">
                      About Us
                    </span>
                  </motion.div>
                  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                    <span className="text-white">The </span>
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      Orange Code
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                    Bridging people, cultures and intelligence across the UAE and the wider Gulf.
                  </p>
                </motion.div>
              </div>
            </div>
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
                  The UAE and the wider GCC are regions of remarkable possibility. With millions of tourists, professionals and entrepreneurs arriving each year, the Gulf continues to establish itself as a global centre of innovation, luxury and ambition. Yet beneath the impressive skyline and world-class progress lies something far more intricate: a social fabric shaped by heritage, values, etiquette and silent cultural signals that cannot be learned through observation alone.
                </p>
                <p>
                  Whether someone has just arrived or has lived here for many years, many still find themselves asking the same questions:
                </p>
                <div className="space-y-3 pl-6 border-l-2 border-orange/30">
                  <p className="text-white/90">
                    How do I truly understand the cultural rhythms of this region?
                  </p>
                  <p className="text-white/90">
                    How do I communicate with confidence across diverse nationalities?
                  </p>
                  <p className="text-white/90">
                    How do I build meaningful relationships in a society where traditions and expectations differ from my own?
                  </p>
                </div>
                <p>
                  The truth is simple: thriving in the UAE and wider Gulf is not about simply blending in. It is about developing the cultural intelligence to adapt, interpret and respond to the region's unique dynamics, from local Emirati customs to the multicultural interactions that shape everyday life.
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
                    For years, our team witnessed the same pattern repeat itself. Brilliant professionals hesitated in conversations with local partners. Global companies misread subtle cues during key negotiations. Promising collaborations and friendships dissolved — not because of lack of expertise or intention, but because people communicated without understanding the cultural framework behind the words, gestures and expectations.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="bg-gradient-to-r from-orange/10 to-azure-blue/10 border-l-4 border-orange p-6 rounded-r-xl"
                  >
                    <p className="text-white font-semibold">
                      At the same time, many newcomers overlooked a truth that defines life in the UAE. It is not only about interacting with Emiratis. The social fabric of this region is woven from more than two hundred nationalities. Each day, invisible cultural codes shape how conversations unfold, how trust is built and how people interpret one another. When we forget this, misunderstandings rise and collaboration becomes harder than it needs to be.
                    </p>
                  </motion.div>
                  <p className="text-xl font-bold text-orange">
                    The Orange Code bridges this gap.
                  </p>
                </div>
              </motion.div>

              {/* What We Do Section */}
              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-white/80 leading-relaxed">
                  The Orange Code is founded on internationally recognised training in protocol, management and intercultural communication, shaped through leading institutions in Europe and the United States. We support professionals, organisations, diplomats and expatriates who want to navigate the cultural landscape of the UAE and the wider Gulf with clarity and confidence.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Thriving in this region requires more than expertise. It calls for the ability to read subtle cultural signals that influence communication, shape relationships and guide decisions. The Orange Code turns these insights into practical, applicable guidance that improves communication and strengthens connection across both professional and social environments.
                </p>
              </motion.div>

              {/* Closing Statement */}
              <motion.div
                variants={itemVariants}
                className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10" />
                <div className="relative z-10 space-y-4">
                  <p className="text-white/90 leading-relaxed text-lg">
                    Whether you are relocating, expanding into the region, developing your team or preparing for diplomatic engagement, The Orange Code provides the clarity, precision and cultural insight required to navigate with assurance. Our purpose is direct. To help you communicate thoughtfully, cultivate fruitful connections and feel genuinely anchored in a region where connection and trust drives progress.
                  </p>
                  <p className="text-2xl font-bold text-orange">
                    Because success in the Gulf is not only about expertise. It is about the way you connect.
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
                      <h3 className="text-2xl font-bold text-white mb-5">MISSION</h3>
                      <p className="text-white/90 leading-relaxed text-lg">
                        Our mission is to equip individuals, teams and organisations with the cultural intelligence needed to communicate with clarity, build lasting connections and operate confidently across the UAE and the wider Gulf. Through practical guidance and research driven insight, we enable people to navigate cultural dynamics with respect, purpose and professionalism.
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
                      <h3 className="text-2xl font-bold text-white mb-5">VISION</h3>
                      <p className="text-white/90 leading-relaxed text-lg">
                        A Gulf region where cultural understanding guides how people interact, and where newcomers learn to engage with respect and genuine appreciation for local traditions. Our vision is to strengthen the social fabric by bridging people, cultures and intelligence — creating an environment where communication is clearer, relationships are stronger and every individual feels welcomed, respected and aligned with the values of the UAE and wider GCC.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Values Section */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      OUR CORE VALUES
                    </span>
                  </h2>
                  <p className="text-white/60 text-lg">The Culture Code — Our Six Core Values</p>
                </div>

                <Suspense fallback={
                  <div className="w-full h-96 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-orange rounded-full animate-spin" />
                  </div>
                }>
                  <ValuesTimeline />
                </Suspense>
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
                  className="text-xl md:text-2xl leading-relaxed text-white/90 max-w-3xl mx-auto"
                >
                  At every level of our work, we remain committed to one principle:
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold mt-4"
                >
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
    </>
  )
}

