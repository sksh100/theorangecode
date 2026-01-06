'use client'

import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { Background } from '@/components/Background'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ResourcesPage() {
  const resources = [
    {
      id: 'beyond-formalities',
      title: 'Beyond Formalities',
      description:
        'A practical cultural guide that explains Emirati culture, local customs, and everyday life in the United Arab Emirates so you can communicate with confidence and build trust in daily life and business.',
      href: '/beyond-formalities',
      image: '/images/eguide-cover-beyond-formalities.png',
      type: 'E-Guide',
      price: '89',
      originalPrice: '149',
      currency: 'AED'
    }
  ]

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  Beyond Formalities E-Guide
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
                New Year offer on our flagship cultural guide to Emirati culture and everyday life in the UAE. Understand what truly matters in communication, trust, and relationships—beyond the paperwork and procedures.
              </p>
              <p className="mt-4 text-xs sm:text-sm md:text-base text-white/60 max-w-2xl mx-auto px-4">
                The E-Guide has already been downloaded <span className="font-semibold text-orange">268 times</span> by professionals, spouses, and long-term residents who wanted to feel more at home in the UAE.
              </p>
            </motion.div>

            {/* Resources Grid - Centered single card */}
            <div className="flex justify-center max-w-5xl mx-auto">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="w-full max-w-2xl"
                >
                  <Link href={resource.href}>
                    <div className="glass-card p-4 sm:p-6 md:p-8 rounded-3xl border border-white/10 hover:border-orange/50 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                      {/* Image */}
                      <div className="relative w-full h-64 sm:h-72 md:h-80 mb-4 sm:mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10 flex items-center justify-center">
                        <Image
                          src={resource.image}
                          alt={resource.title}
                          width={400}
                          height={600}
                          className="object-contain w-auto h-full max-w-full p-4 sm:p-6 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="px-2 sm:px-3 py-1 bg-orange/20 text-orange rounded-full text-xs font-medium">
                              {resource.type}
                            </span>
                          </div>
                          <div className="text-left sm:text-right w-full sm:w-auto">
                            {resource.originalPrice && (
                              <p className="text-xs sm:text-sm text-white/50 line-through">
                                {resource.originalPrice} {resource.currency}
                              </p>
                            )}
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange">
                              {resource.price} {resource.currency}
                            </p>
                            <p className="text-xs sm:text-sm text-white/60 mt-1">
                              Limited New Year offer · secure checkout
                            </p>
                          </div>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 group-hover:text-orange transition-colors">
                          {resource.title}
                        </h3>
                        
                        <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-6 flex-1">
                          {resource.description}
                        </p>

                        <div className="space-y-3 sm:space-y-4">
                          <ul className="text-xs sm:text-sm md:text-base text-white/70 space-y-1.5 sm:space-y-2">
                            <li className="flex items-start gap-2">
                              <span className="text-orange mt-0.5">•</span>
                              <span>Instant PDF download after secure Stripe checkout</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange mt-0.5">•</span>
                              <span>Written for professionals, spouses, and residents in the UAE</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange mt-0.5">•</span>
                              <span>Clear, practical explanations you can apply in real conversations</span>
                            </li>
                          </ul>

                          <div className="flex items-center gap-2 text-orange group-hover:gap-4 transition-all text-sm sm:text-base">
                            <span className="font-medium">Learn more & get the E-Guide</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Proof & Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 sm:mt-16 md:mt-20 max-w-5xl mx-auto px-4"
            >
              <div className="text-center mb-8 sm:mb-10">
                <p className="text-xs sm:text-sm md:text-base text-white/60 max-w-3xl mx-auto">
                  Trusted by regional project leaders, long-term residents, and spouses of Emiratis who wanted
                  practical, respectful guidance to understand everyday life in the UAE.
                </p>
              </div>
              <TestimonialCarousel />
            </motion.div>
          </div>
        </section>
      </main>
      <ModernFooter />
    </div>
  )
}

