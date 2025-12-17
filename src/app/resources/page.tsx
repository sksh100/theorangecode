'use client'

import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { Background } from '@/components/Background'
import { BookOpen, ArrowRight, FileText } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ResourcesPage() {
  const resources = [
    {
      id: 'uk-to-uae-relocation',
      title: 'UK to UAE Relocation Guide',
      description: 'A research-based guide helping British expats understand UAE culture, workplace norms, communication styles, dos and don\'ts, and how to integrate effectively.',
      href: '/uk-to-uae-relocation',
      image: '/images/eguide-cover-move-and-thrive.png',
      type: 'E-Guide',
      price: '289',
      currency: 'AED'
    },
    {
      id: 'beyond-formalities',
      title: 'Beyond Formalities',
      description: 'Understanding Emirati culture, local customs, and everyday life in the United Arab Emirates. Covers identity, values, greetings, communication, business culture, and modern UAE life.',
      href: '/beyond-formalities',
      image: '/images/eguide-cover-beyond-formalities.png',
      type: 'E-Guide',
      price: '149',
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  Resources
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Explore our comprehensive collection of cultural intelligence guides and resources designed to help you navigate life in the UAE and Gulf Region.
              </p>
            </motion.div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Link href={resource.href}>
                    <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-orange/50 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                      {/* Image */}
                      <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10">
                        <Image
                          src={resource.image}
                          alt={resource.title}
                          fill
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="px-3 py-1 bg-orange/20 text-orange rounded-full text-xs font-medium">
                              {resource.type}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-orange">
                              {resource.price} {resource.currency}
                            </p>
                            <p className="text-xs text-white/60 mt-1">dirhams</p>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange transition-colors">
                          {resource.title}
                        </h3>
                        
                        <p className="text-white/70 text-sm mb-4 flex-1">
                          {resource.description}
                        </p>

                        <div className="flex items-center gap-2 text-orange group-hover:gap-4 transition-all">
                          <span className="font-medium">Learn More</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Coming Soon Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="glass-card p-8 rounded-3xl border border-white/10 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-azure-blue" />
                  <h2 className="text-2xl font-bold text-white">More Resources Coming Soon</h2>
                </div>
                <p className="text-white/70">
                  We're continuously working on new cultural intelligence resources to help you succeed in the UAE and Gulf Region. Stay tuned for updates!
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <ModernFooter />
    </div>
  )
}

