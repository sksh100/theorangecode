'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, FileText, Scale } from 'lucide-react'
import Link from 'next/link'

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-primary-dark">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-orange hover:text-bright-blue transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange/20 to-bright-blue/20 rounded-2xl flex items-center justify-center">
              <Scale className="w-8 h-8 text-orange" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Terms & Conditions</h1>
              <p className="text-white/70 text-lg">UAE Law Compliant</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-orange" />
                1. Acceptance of Terms
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                By accessing and using the services of Your Luxury Agent, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms are governed by the laws of the United Arab Emirates and are subject to the jurisdiction of UAE courts.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-bright-blue" />
                2. Services Description
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Your Luxury Agent provides cultural intelligence, protocol training, and luxury lifestyle consulting services. Our programs include but are not limited to:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• Cultural intelligence and protocol training</li>
                <li>• Cross-cultural negotiation and diplomacy</li>
                <li>• Luxury heritage and brand building</li>
                <li>• Multicultural global experience programs</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-orange" />
                3. Client Obligations
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Clients are required to:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• Provide accurate and complete information</li>
                <li>• Respect cultural sensitivities and protocols</li>
                <li>• Maintain confidentiality of proprietary methods</li>
                <li>• Comply with UAE laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Scale className="w-6 h-6 text-bright-blue" />
                4. Payment Terms
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                All payments must be made in UAE Dirhams (AED) unless otherwise specified. Payment terms are as follows:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• 50% deposit required upon booking</li>
                <li>• Remaining balance due 7 days before program start</li>
                <li>• Refunds subject to cancellation policy</li>
                <li>• All prices include 5% VAT as per UAE regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-orange" />
                5. Limitation of Liability
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Your Luxury Agent's liability is limited to the amount paid for services. We are not liable for indirect, consequential, or punitive damages. This limitation applies to the fullest extent permitted by UAE law.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-bright-blue" />
                6. Governing Law
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                These terms are governed by the laws of the United Arab Emirates. Any disputes shall be resolved in the courts of Dubai, UAE. Both parties agree to submit to the exclusive jurisdiction of UAE courts.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Scale className="w-6 h-6 text-orange" />
                7. Contact Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                For questions regarding these Terms & Conditions, please contact us at:
              </p>
              <div className="bg-gradient-to-r from-orange/10 to-bright-blue/10 border border-orange/30 rounded-xl p-6">
                <p className="text-white font-semibold mb-2">Your Luxury Agent</p>
                <p className="text-white/80">Email: legal@yourluxuryagent.com</p>
                <p className="text-white/80">Phone: +971 50 123 4567</p>
                <p className="text-white/80">Address: Dubai, UAE</p>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-orange/10 to-bright-blue/10 border border-orange/30 rounded-xl">
                <p className="text-white/80 text-sm">
                  <strong>Last Updated:</strong> December 2024<br/>
                  These terms are compliant with UAE Federal Law No. 2 of 2019 and Dubai Law No. 26 of 2007.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
