'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CheckCircle, Download, Mail, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'

// Dynamic import for performance
const AtmosphericBackground = dynamic(
  () => import('@/components/AtmosphericBackground').then(mod => ({ default: mod.AtmosphericBackground })),
  { ssr: false, loading: () => null }
)

export default function EbookThankYouPage() {
  const [mounted, setMounted] = useState(false)
  const ebookReady = false // Change this to true when the PDF is ready

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative w-full bg-primary-dark text-white min-h-screen">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AtmosphericBackground mousePosition={{ x: 0, y: 0 }} scrollProgress={0} />
      </div>

      <ModernNavbar />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl w-full"
        >
          {/* Success Icon */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-orange/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-orange/30 to-azure-blue/30 rounded-full flex items-center justify-center border-2 border-orange/50">
                <CheckCircle className="w-12 h-12 text-orange" />
              </div>
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            variants={itemVariants}
            className="glass-card bg-primary-dark/90 backdrop-blur-[30px] border border-azure-blue/30 rounded-3xl p-8 md:p-12 shadow-glow relative overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-azure-blue/5 pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10">
              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent"
              >
                Thank You for Your Purchase
              </motion.h1>

              {ebookReady ? (
                <>
                  <motion.p
                    variants={itemVariants}
                    className="text-white/80 text-base md:text-lg mb-6 text-center leading-relaxed"
                  >
                    Your ebook is ready to download. Save it to your device so you can access it anytime during your move and after you arrive in the UAE.
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    className="flex justify-center"
                  >
                    <Link
                      href="/files/uk-to-uae-relocation-guide.pdf"
                      download
                      className="group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base md:text-lg font-semibold bg-gradient-to-r from-orange to-orange/80 hover:from-orange/90 hover:to-orange/70 text-primary-dark transition-all duration-300 shadow-glow-orange hover:shadow-glow-orange hover:scale-105"
                    >
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      Download Your Ebook (PDF)
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-center mb-6"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-azure-blue/10 border border-azure-blue/30 rounded-full">
                      <Sparkles className="w-4 h-4 text-azure-blue animate-pulse" />
                      <span className="text-sm text-azure-blue font-medium">Finalizing Your Ebook</span>
                    </div>
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    className="text-white/90 text-base md:text-lg mb-4 text-center font-medium"
                  >
                    Your payment was successful.
                  </motion.p>

                  <motion.p
                    variants={itemVariants}
                    className="text-white/70 text-sm md:text-base mb-6 text-center leading-relaxed"
                  >
                    The ebook is being finalized and will be available for download very soon. You will receive an email with the download link once it is ready.
                  </motion.p>
                </>
              )}

              {/* Support Information */}
              <motion.div
                variants={itemVariants}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <p className="text-white/60 text-xs md:text-sm text-center mb-4">
                  A payment receipt has been sent to your email. If you have any questions or need support, contact us at{' '}
                  <a
                    href="mailto:support@theorangecode.com"
                    className="text-azure-blue hover:text-orange underline underline-offset-2 transition-colors"
                  >
                    support@theorangecode.com
                  </a>
                  .
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-orange transition-colors underline underline-offset-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to The Orange Code
                  </Link>
                  
                  <span className="text-white/30">•</span>
                  
                  <Link
                    href="/uk-to-uae-relocation"
                    className="text-sm text-white/70 hover:text-azure-blue transition-colors underline underline-offset-4"
                  >
                    View Relocation Guide
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Info Card */}
          <motion.div
            variants={itemVariants}
            className="mt-6 glass-card bg-primary-dark/60 backdrop-blur-[20px] border border-azure-blue/20 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-azure-blue" />
              <p className="text-white/80 text-sm font-medium">
                Check Your Email
              </p>
            </div>
            <p className="text-white/60 text-xs md:text-sm">
              We've sent you a confirmation email with your purchase details and download instructions.
            </p>
          </motion.div>
        </motion.div>
      </main>

      <ModernFooter />
    </div>
  )
}

