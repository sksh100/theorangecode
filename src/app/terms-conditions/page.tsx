'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, FileText, Scale, Crown, CreditCard, Users, Globe } from 'lucide-react'
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
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-orange" />
                1. Acceptance of Terms
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                By accessing or using The Orange Code's website, social media channels, digital content, or any services provided by The Orange Code, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                These Terms and Conditions apply to all users, clients, visitors, and participants engaging with The Orange Code in any form.
              </p>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                All activities and interactions are governed by the laws of the United Arab Emirates, and any disputes arising from them fall under the exclusive jurisdiction of the UAE courts.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Crown className="w-8 h-8 text-bright-blue" />
                2. Services Description
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                The Orange Code provides premium Cultural Intelligence training. Our masterclasses include but are not limited to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4">
                  <p className="text-white font-semibold">Cultural Intelligence</p>
                </div>
                <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-4">
                  <p className="text-white font-semibold">Protocol Training</p>
                </div>
                <div className="bg-gradient-to-r from-light-blue/10 to-light-blue/5 border border-light-blue/20 rounded-xl p-4">
                  <p className="text-white font-semibold">Cross-Cultural Negotiation</p>
                </div>
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-4">
                  <p className="text-white font-semibold">Executive Presence & Communication Training</p>
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
                  Speak and behave respectfully in a manner consistent with UAE cultural norms and laws
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                  Dress in a professional and culturally appropriate manner throughout all sessions
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                  Respect scheduled breaks during local prayer times
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
                  <li>• All payments must be made in UAE Dirhams (AED).</li>
                  <li>• To secure a confirmed timeslot, payment must be completed at least 48 hours prior to the masterclass or coaching session, unless alternative arrangements have been approved by The Orange Code in writing.</li>
                  <li>• All prices include 5% VAT as per UAE Federal Tax Authority regulations.</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-2xl p-6 mb-8">
                <h4 className="text-xl font-bold text-white mb-4">Cancellation & Refund Policy</h4>
                <p className="text-white font-semibold mb-4 text-lg">
                  Due to the nature of digital products, all ebook sales are final and non-refundable.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  The Orange Code is committed to providing flexibility and exceptional service. We aim to accommodate our clients whenever possible; however, due to the nature of customised training and reserved time allocations, cancellations are not eligible for refunds.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  If a client is unable to attend:
                </p>
                <ul className="text-white/80 leading-relaxed space-y-2 mb-4">
                  <li>• We will make every reasonable effort to reschedule the session to another available date.</li>
                  <li>• If rescheduling is not possible, the session fee remains non-refundable in accordance with UAE business practices for professional services.</li>
                </ul>
                <p className="text-white/80 leading-relaxed">
                  Refunds are not provided for no-shows, missed sessions, or last-minute cancellations.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-orange" />
                5. Limitation of Liability
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                The Orange Code's liability is strictly limited to the total amount paid by the client for the specific service in question.
              </p>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We are not responsible for any indirect, incidental, consequential, special, or punitive damages arising from the use of our services.
              </p>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                This limitation applies to the maximum extent permitted under UAE Federal Law No. 5 of 1985 (Civil Transactions Law) and its amendments.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Globe className="w-8 h-8 text-bright-blue" />
                6. Governing Law & Dispute Resolution
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                These Terms and Conditions are governed by the laws of the United Arab Emirates.
              </p>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Any dispute arising from or relating to our services shall fall under the exclusive jurisdiction of the courts of Abu Dhabi, UAE, as the location of The Orange Code's registered establishment.
              </p>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Both parties agree to submit to this jurisdiction and waive any objection to venue or applicable law.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <FileText className="w-8 h-8 text-orange" />
                7. Intellectual Property
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                All training materials, course content, frameworks, visuals, documents and proprietary concepts are the exclusive intellectual property of The Orange Code.
              </p>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Clients may not copy, reproduce, modify, distribute, publish, or use these materials for commercial purposes without prior written consent.
              </p>
              <p className="text-white/80 leading-relaxed mb-4 text-lg">
                Additionally:
              </p>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                All digital content appearing on The Orange Code's website, social media channels, promotional materials, graphics, text, illustrations, designs, and media assets is protected by copyright and intellectual property laws.
              </p>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                No user is permitted to download, replicate, alter, reuse, or redistribute any such content without explicit written permission from The Orange Code.
              </p>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Unauthorised use may result in legal action according to UAE copyright and intellectual property regulations.
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
                    <p className="text-white font-bold text-xl mb-2">The Orange Code</p>
                    <p className="text-white/80 mb-1">Legal Department</p>
                    <p className="text-white/80 mb-1">Email: legal@theorangecode.com</p>
                    <p className="text-white/80 mb-1">Phone: +971 56 878 6106</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl mb-2">Business Address</p>
                    <p className="text-white/80 mb-1">Etihad Towers</p>
                    <p className="text-white/80 mb-1">Tower 3, Floor 36</p>
                    <p className="text-white/80 mb-1">Abu Dhabi, United Arab Emirates</p>
                    <p className="text-white/80 mb-1">License No: CN-4296787</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-r from-orange/10 to-bright-blue/10 border border-orange/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-orange" />
                  <h4 className="text-xl font-bold text-white">Business License & Legal Compliance</h4>
                </div>
                <div className="space-y-3">
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong>Business License:</strong> The Orange Code operates under license number CN-4296787 issued by the Abu Dhabi Registration Authority (ADRA).<br/>
                    <strong>License Number:</strong> CN-4296787
                  </p>
                  <div className="border-t border-white/20 my-3" />
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br/>
                    These terms are compliant with UAE Federal Law No. 2 of 2019 (Commercial Companies Law), 
                    UAE Ministry of Economy Regulations, and UAE Federal Law No. 5 of 1985 (Civil Transactions Law).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
