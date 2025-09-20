'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
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
            <div className="w-16 h-16 bg-gradient-to-br from-azure-blue/20 to-bright-blue/20 rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-azure-blue" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
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
                <Shield className="w-6 h-6 text-azure-blue" />
                1. Information We Collect
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                We collect information you provide directly to us, such as when you create an account, book services, or contact us. This includes:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• Personal identification information (name, email, phone)</li>
                <li>• Professional information (company, position, industry)</li>
                <li>• Cultural background and preferences</li>
                <li>• Payment and billing information</li>
                <li>• Communication preferences</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Eye className="w-6 h-6 text-orange" />
                2. How We Use Your Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                We use your information to:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• Provide and improve our services</li>
                <li>• Personalize your cultural intelligence experience</li>
                <li>• Process payments and bookings</li>
                <li>• Send important updates and communications</li>
                <li>• Comply with UAE legal requirements</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-bright-blue" />
                3. Information Sharing
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                We do not sell, trade, or rent your personal information. We may share information only in the following circumstances:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• With your explicit consent</li>
                <li>• To comply with UAE legal obligations</li>
                <li>• With trusted service providers under strict confidentiality</li>
                <li>• In case of business transfer or merger</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-azure-blue" />
                4. Data Security
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• SSL encryption for data transmission</li>
                <li>• Secure data storage with access controls</li>
                <li>• Regular security audits and updates</li>
                <li>• Staff training on data protection</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-orange" />
                5. Your Rights
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Under UAE data protection laws, you have the right to:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• Access your personal information</li>
                <li>• Correct inaccurate information</li>
                <li>• Request deletion of your data</li>
                <li>• Object to processing of your data</li>
                <li>• Data portability</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-bright-blue" />
                6. Cookies and Tracking
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                We use cookies and similar technologies to enhance your experience. You can control cookie preferences through your browser settings. We use cookies for:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• Essential website functionality</li>
                <li>• Analytics and performance monitoring</li>
                <li>• Personalization and preferences</li>
                <li>• Marketing and advertising (with consent)</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-azure-blue" />
                7. Data Retention
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements. Typically, we retain data for:
              </p>
              <ul className="text-white/80 leading-relaxed mb-6 space-y-2">
                <li>• Active client data: Duration of service + 3 years</li>
                <li>• Marketing data: Until consent is withdrawn</li>
                <li>• Legal compliance: As required by UAE law</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-orange" />
                8. Contact Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                For privacy-related questions or to exercise your rights, contact our Data Protection Officer:
              </p>
              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-xl p-6">
                <p className="text-white font-semibold mb-2">Data Protection Officer</p>
                <p className="text-white/80">Email: privacy@yourluxuryagent.com</p>
                <p className="text-white/80">Phone: +971 50 123 4567</p>
                <p className="text-white/80">Address: Dubai, UAE</p>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-xl">
                <p className="text-white/80 text-sm">
                  <strong>Last Updated:</strong> December 2024<br/>
                  This policy complies with UAE Federal Law No. 2 of 2019 on the Use of Information and Communication Technology in the Areas of Health and Dubai Law No. 26 of 2007.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
