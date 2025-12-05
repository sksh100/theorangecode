'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, FileText, Scale, CreditCard, BookOpen, Users, Info, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-primary-dark">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern-animated" />
        </div>
        <motion.div 
          className="absolute w-48 h-48 bg-gradient-radial from-orange/10 to-transparent top-1/4 left-1/4 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-32 h-32 bg-gradient-radial from-bright-blue/10 to-transparent bottom-1/4 right-1/4 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-orange hover:text-bright-blue transition-colors mb-8 group"
          >
            <motion.div
              animate={{ x: [-5, 0, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            Back to Home
          </Link>

          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-orange/20 to-bright-blue/20 rounded-3xl flex items-center justify-center">
              <Scale className="w-10 h-10 text-orange" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Refund Policy</h1>
              <p className="text-white/70 text-xl">Compliant with UAE Federal Law</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              {/* Important Notice */}
              <div className="bg-gradient-to-r from-red-500/10 to-orange/10 border border-red-500/30 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold text-white">Important Notice</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-3">
                  All purchases made through The Orange Code are final. Due to the digital nature of our products and services, 
                  we do not offer refunds, returns, or exchanges once a purchase has been completed.
                </p>
                <p className="text-white/80 leading-relaxed">
                  This policy is in compliance with UAE Federal Law No. 18 of 2021 on Commercial Transactions and UAE Consumer Protection Law.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <BookOpen className="w-8 h-8 text-orange" />
                1. Digital Products (Ebooks)
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Our ebooks, including but not limited to the "UK to UAE Cultural Intelligence Guide," are digital products 
                that are delivered instantly via email upon purchase completion.
              </p>
              <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-6 mb-6">
                <p className="text-white font-semibold mb-3">No Refunds for Digital Products</p>
                <p className="text-white font-semibold mb-4 text-lg">
                  Due to the nature of digital products, all ebook sales are final and non-refundable.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  As digital products are delivered immediately and cannot be "returned" in the traditional sense, 
                  all ebook purchases are final and non-refundable. This includes:
                </p>
                <ul className="text-white/80 leading-relaxed space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    PDF ebooks and digital guides
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    Instant download links and access
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    Digital content delivered via email
                  </li>
                </ul>
              </div>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                By purchasing a digital product, you acknowledge that you have reviewed the product description, 
                understand what you are purchasing, and agree that the sale is final upon completion of payment.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Users className="w-8 h-8 text-bright-blue" />
                2. Masterclasses and Training Services
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Our masterclasses and training services are live, scheduled sessions that require advance booking and preparation.
              </p>
              <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-6 mb-6">
                <p className="text-white font-semibold mb-3">No Refunds for Masterclasses</p>
                <p className="text-white/80 leading-relaxed mb-4">
                  All masterclass bookings are final and non-refundable. This policy applies to:
                </p>
                <ul className="text-white/80 leading-relaxed space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-bright-blue rounded-full mt-3 flex-shrink-0" />
                    Cultural Intelligence Masterclasses
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-bright-blue rounded-full mt-3 flex-shrink-0" />
                    Private coaching sessions
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-bright-blue rounded-full mt-3 flex-shrink-0" />
                    Corporate training programs
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-bright-blue rounded-full mt-3 flex-shrink-0" />
                    Group workshops and seminars
                  </li>
                </ul>
              </div>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                Once a masterclass booking is confirmed and payment is processed, the slot is reserved exclusively for you. 
                We are unable to offer refunds for cancellations, no-shows, or changes of mind, as we have committed resources 
                and may have turned away other potential participants.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-azure-blue" />
                3. UAE Legal Compliance
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Our refund policy is in full compliance with applicable UAE laws and regulations:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-4">
                  <p className="text-white font-semibold mb-2">UAE Federal Law No. 18 of 2021</p>
                  <p className="text-white/70 text-sm">
                    Commercial Transactions Law - Digital products and services are exempt from mandatory refund requirements 
                    once delivered.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4">
                  <p className="text-white font-semibold mb-2">UAE Consumer Protection Law</p>
                  <p className="text-white/70 text-sm">
                    Services that are personalized, customized, or immediately delivered are not subject to standard refund policies.
                  </p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                As a UAE-licensed business (License No: CN-4296787), we operate in strict compliance with local regulations. 
                Our no-refund policy for digital products and pre-booked services is legally permissible and clearly communicated 
                to all customers before purchase.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Info className="w-8 h-8 text-orange" />
                4. Exceptions and Special Circumstances
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                While our standard policy is no refunds, we may consider exceptional circumstances on a case-by-case basis:
              </p>
              <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-6 mb-8">
                <ul className="text-white/80 leading-relaxed space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    Technical issues preventing access to digital products (subject to verification)
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    Duplicate charges or payment errors (will be investigated and resolved)
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    Cancellation of a masterclass by The Orange Code (full refund or rescheduling will be offered)
                  </li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                  To request consideration for exceptional circumstances, please contact us at{' '}
                  <a href="mailto:hello@theorangecode.com" className="text-orange hover:text-bright-blue transition-colors">
                    hello@theorangecode.com
                  </a>{' '}
                  within 7 days of purchase, providing detailed information about your situation.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <CreditCard className="w-8 h-8 text-bright-blue" />
                5. Payment Processing
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                All payments are processed securely through our payment gateway. Once a transaction is completed and confirmed, 
                the purchase is considered final.
              </p>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                If you experience any issues with payment processing, duplicate charges, or unauthorized transactions, 
                please contact us immediately at{' '}
                <a href="mailto:hello@theorangecode.com" className="text-orange hover:text-bright-blue transition-colors">
                  hello@theorangecode.com
                </a>{' '}
                and we will investigate promptly.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <FileText className="w-8 h-8 text-azure-blue" />
                6. Contact Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                If you have questions about this refund policy or need to discuss exceptional circumstances, please contact us:
              </p>
              <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-6 mb-8">
                <p className="text-white font-semibold mb-3">The Orange Code</p>
                <p className="text-white/80 leading-relaxed mb-2">
                  Email: <a href="mailto:hello@theorangecode.com" className="text-orange hover:text-bright-blue transition-colors">hello@theorangecode.com</a>
                </p>
                <p className="text-white/80 leading-relaxed mb-2">
                  Phone: <a href="tel:+971568786106" className="text-orange hover:text-bright-blue transition-colors">+971 56 878 6106</a>
                </p>
                <p className="text-white/80 leading-relaxed">
                  Address: Etihad Towers, Tower 3, Floor 36, Abu Dhabi, United Arab Emirates
                </p>
                <p className="text-white/70 text-sm mt-4">
                  License No: CN-4296787
                </p>
              </div>

              <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-6 mt-8">
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Last Updated:</strong> {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-white/70 text-sm leading-relaxed mt-2">
                  This refund policy is effective immediately and applies to all purchases made on or after the date of publication. 
                  The Orange Code reserves the right to update this policy at any time, with changes taking effect immediately upon posting.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

