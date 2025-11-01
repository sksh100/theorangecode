'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, FileText, Scale, Crown, AlertTriangle, CreditCard, Users, Globe } from 'lucide-react'
import Link from 'next/link'

export default function TermsConditions() {
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
              <h1 className="text-5xl font-bold text-white mb-2">Terms & Conditions</h1>
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
              {/* Legal Notice */}
              <div className="bg-gradient-to-r from-orange/10 to-bright-blue/10 border border-orange/30 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-orange" />
                  <h3 className="text-xl font-bold text-white">Legal Notice</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  These Terms and Conditions are governed by the laws of the United Arab Emirates and are subject to the jurisdiction of UAE courts. 
                  By using our services, you agree to be bound by these terms and UAE law.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-orange" />
                1. Acceptance of Terms
              </h2>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                By accessing and using the services of Your Luxury Agent, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
                These terms are governed by the laws of the United Arab Emirates and are subject to the jurisdiction of UAE courts.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Crown className="w-8 h-8 text-bright-blue" />
                2. Services Description
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Your Luxury Agent provides premium cultural intelligence, protocol training, and luxury lifestyle consulting services. Our programs include but are not limited to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4">
                  <p className="text-white font-semibold">Cultural Intelligence</p>
                  <p className="text-white/70 text-sm">Protocol training and cultural awareness</p>
                </div>
                <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-4">
                  <p className="text-white font-semibold">Cross-Cultural Negotiation</p>
                  <p className="text-white/70 text-sm">Diplomacy and business protocols</p>
                </div>
                <div className="bg-gradient-to-r from-light-blue/10 to-light-blue/5 border border-light-blue/20 rounded-xl p-4">
                  <p className="text-white font-semibold">Luxury Heritage</p>
                  <p className="text-white/70 text-sm">Brand building and premium positioning</p>
                </div>
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-4">
                  <p className="text-white font-semibold">Global Experience</p>
                  <p className="text-white/70 text-sm">Multicultural competence programs</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Users className="w-8 h-8 text-orange" />
                3. Client Obligations
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Clients are required to comply with the following obligations:
              </p>
              <ul className="text-white/80 leading-relaxed mb-8 space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                  Provide accurate and complete information as requested
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                  Respect cultural sensitivities and protocols during training
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                  Maintain confidentiality of proprietary methods and materials
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                  Comply with all applicable UAE laws and regulations
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                  Attend scheduled sessions and complete required assessments
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <CreditCard className="w-8 h-8 text-bright-blue" />
                4. Payment Terms & Refunds
              </h2>
              <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-2xl p-6 mb-6">
                <h4 className="text-xl font-bold text-white mb-4">Payment Requirements</h4>
                <ul className="text-white/80 leading-relaxed space-y-2">
                  <li>• All payments must be made in UAE Dirhams (AED)</li>
                  <li>• 50% deposit required upon booking confirmation</li>
                  <li>• Remaining balance due 7 days before program commencement</li>
                  <li>• All prices include 5% VAT as per UAE Federal Tax Authority regulations</li>
                  <li>• Late payments may incur additional charges as per UAE commercial law</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-2xl p-6 mb-8">
                <h4 className="text-xl font-bold text-white mb-4">Cancellation & Refund Policy</h4>
                <ul className="text-white/80 leading-relaxed space-y-2">
                  <li>• Cancellations 14+ days before start: 100% refund minus 5% processing fee</li>
                  <li>• Cancellations 7-13 days before start: 75% refund</li>
                  <li>• Cancellations 3-6 days before start: 50% refund</li>
                  <li>• Cancellations less than 3 days: No refund (as per UAE consumer protection law)</li>
                  <li>• Refunds processed within 14 business days</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-orange" />
                5. Limitation of Liability
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Your Luxury Agent's liability is limited to the amount paid for services. We are not liable for indirect, consequential, or punitive damages. 
                This limitation applies to the fullest extent permitted by UAE Federal Law No. 5 of 1985 (Civil Transactions Law).
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Globe className="w-8 h-8 text-bright-blue" />
                6. Governing Law & Dispute Resolution
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                These terms are governed by the laws of the United Arab Emirates. Any disputes shall be resolved in the courts of Dubai, UAE. 
                Both parties agree to submit to the exclusive jurisdiction of UAE courts and waive any objection to venue.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <FileText className="w-8 h-8 text-orange" />
                7. Intellectual Property
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                All training materials, methodologies, and proprietary content remain the intellectual property of Your Luxury Agent. 
                Clients may not reproduce, distribute, or use such materials for commercial purposes without written consent.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Scale className="w-8 h-8 text-bright-blue" />
                8. Contact Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                For questions regarding these Terms & Conditions, please contact our legal department:
              </p>
              <div className="bg-gradient-to-r from-orange/10 to-bright-blue/10 border border-orange/30 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white font-bold text-xl mb-2">Your Luxury Agent</p>
                    <p className="text-white/80 mb-1">Legal Department</p>
                    <p className="text-white/80 mb-1">Email: legal@yourluxuryagent.com</p>
                    <p className="text-white/80 mb-1">Phone: +971 56 909 1701</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl mb-2">Business Address</p>
                    <p className="text-white/80 mb-1">Abu Dhabi Global Market</p>
                    <p className="text-white/80 mb-1">Abu Dhabi, United Arab Emirates</p>
                    <p className="text-white/80 mb-1">License: [UAE Business License Number]</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-r from-orange/10 to-bright-blue/10 border border-orange/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-orange" />
                  <h4 className="text-xl font-bold text-white">Legal Compliance</h4>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong>Last Updated:</strong> December 2025<br/>
                  These terms are compliant with UAE Federal Law No. 2 of 2019 (Commercial Companies Law), 
                  Abu Dhabi Law No. 4 of 2013 (Abu Dhabi Global Market), and UAE Federal Law No. 5 of 1985 (Civil Transactions Law).
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
