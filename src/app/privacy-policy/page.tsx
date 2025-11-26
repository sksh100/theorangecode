'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertTriangle, Globe, FileText, Users, Target, Mail } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-primary-dark">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern-animated" />
        </div>
        <motion.div 
          className="absolute w-48 h-48 bg-gradient-radial from-azure-blue/10 to-transparent top-1/4 right-1/4 rounded-full"
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
          className="absolute w-32 h-32 bg-gradient-radial from-orange/10 to-transparent bottom-1/4 left-1/4 rounded-full"
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
            <div className="w-20 h-20 bg-gradient-to-br from-azure-blue/20 to-bright-blue/20 rounded-3xl flex items-center justify-center">
              <Lock className="w-10 h-10 text-azure-blue" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Privacy Policy</h1>
              <p className="text-white/70 text-xl">Compliant with UAE Data Protection Laws</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              {/* Privacy Notice */}
              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-azure-blue" />
                  <h3 className="text-xl font-bold text-white">Privacy Notice</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-3">
                  This Privacy Policy explains how The Orange Code ("we," "us," or "our") collects, uses, processes, and protects your personal data in compliance with:
                </p>
                <ul className="text-white/70 text-sm space-y-1 ml-4">
                  <li>• <strong>GDPR:</strong> EU General Data Protection Regulation (EU) 2016/679</li>
                  <li>• <strong>UAE Federal Law:</strong> Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data</li>
                  <li>• <strong>Ministry of Economy:</strong> UAE Ministry of Economy Regulations for Commercial Activities</li>
                  <li>• <strong>ePrivacy Directive:</strong> Directive 2002/58/EC (as amended)</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-3">
                  Your privacy and data protection rights are our priority. This policy is transparent, clear, and explains your rights under applicable data protection laws.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Database className="w-8 h-8 text-azure-blue" />
                1. Information We Collect
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We collect information you provide directly to us, such as when you create an account, book services, or contact us. This includes:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Personal Information</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Full name and contact details</li>
                    <li>• Email address and phone number</li>
                    <li>• Date of birth and nationality</li>
                    <li>• Professional title and company</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Service Information</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Cultural background and preferences</li>
                    <li>• Training goals and objectives</li>
                    <li>• Billing address and transaction details</li>
                    <li>• Communication preferences</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
                <p className="text-white/80 text-sm">
                  <strong>Payment Processing:</strong> All payment card information is securely processed by Stripe. We do not store or have access to your full payment card details.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Eye className="w-8 h-8 text-orange" />
                2. How We Use Your Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We use your information for the following legitimate business purposes:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Service Delivery</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Provide cultural intelligence training</li>
                    <li>• Personalize your learning experience</li>
                    <li>• Process payments and bookings</li>
                    <li>• Send service-related communications</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-light-blue/10 to-light-blue/5 border border-light-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Business Operations</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Improve our services and masterclasses</li>
                    <li>• Conduct market research and analytics</li>
                    <li>• Comply with UAE legal requirements</li>
                    <li>• Maintain business records</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-light-blue" />
                3. Legal Basis for Processing (GDPR Article 6)
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Under GDPR, we process your personal data based on the following legal grounds:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Consent (Art. 6(1)(a))</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Marketing communications and newsletters</li>
                    <li>• Optional cookies (analytics, marketing)</li>
                    <li>• Participation in surveys or research</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Contract Performance (Art. 6(1)(b))</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Delivering masterclasses and training</li>
                    <li>• Processing payments and bookings</li>
                    <li>• Providing customer support</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Legal Obligation (Art. 6(1)(c))</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Tax and accounting records</li>
                    <li>• Regulatory compliance (UAE law)</li>
                    <li>• Anti-money laundering checks</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-light-blue/10 to-light-blue/5 border border-light-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Legitimate Interests (Art. 6(1)(f))</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Fraud prevention and security</li>
                    <li>• Business analytics and improvements</li>
                    <li>• Network and information security</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl p-6 mb-8">
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong>Your Right to Withdraw Consent:</strong> Where we rely on consent, you have the right to withdraw it at any time. 
                  This will not affect the lawfulness of processing based on consent before its withdrawal. Contact us at legal@theorangecode.com 
                  to withdraw consent.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Users className="w-8 h-8 text-bright-blue" />
                4. Information Sharing & Disclosure
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We do not sell, trade, or rent your personal information. We may share information only in the following circumstances:
              </p>
              
              <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">With Your Consent</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Explicit written consent for specific purposes</li>
                      <li>• Marketing communications (opt-in only)</li>
                      <li>• Third-party service providers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3">Legal Requirements</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• UAE government authorities</li>
                      <li>• Court orders or legal processes</li>
                      <li>• Regulatory compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Database className="w-8 h-8 text-azure-blue" />
                5. Third-Party Services & Data Processors
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We use trusted third-party services to operate our website and provide services. These services may process your personal 
                information on our behalf. All third-party services are GDPR-compliant and bound by strict data processing agreements:
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-azure-blue" />
                    Google Analytics 4
                  </h4>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Purpose:</strong> Website analytics, user behavior tracking, conversion measurement, and performance monitoring.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Collected:</strong> IP address (anonymized), page views, clicks, scroll depth, time on page, device type, 
                    browser information, referrer, UTM parameters, and custom events.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Processing:</strong> Google LLC (USA) - Data is processed with appropriate safeguards including Standard 
                    Contractual Clauses (SCCs) for EU data transfers.
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Google Privacy Policy
                    </a>
                    {' | '}
                    <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Google Analytics Privacy
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-orange" />
                    Stripe
                  </h4>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Purpose:</strong> Secure payment processing for masterclass bookings, course purchases, and ebook sales.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Collected:</strong> Payment card information (encrypted), billing address, email, phone number, transaction 
                    details, and fraud prevention data.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Processing:</strong> Stripe, Inc. (USA) - PCI DSS Level 1 certified, GDPR compliant with Data Processing 
                    Agreement (DPA).
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Stripe Privacy Policy
                    </a>
                    {' | '}
                    <a href="https://stripe.com/legal/dpa" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Stripe DPA
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-bright-blue" />
                    Resend
                  </h4>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Purpose:</strong> Sending transactional emails, contact form notifications, booking confirmations, and service communications.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Collected:</strong> Email address, name, message content, and email engagement metrics (opens, clicks).
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Processing:</strong> Resend, Inc. (USA) - GDPR compliant with appropriate data processing safeguards.
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Resend Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-light-blue/10 to-light-blue/5 border border-light-blue/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-light-blue" />
                    MailerLite
                  </h4>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Purpose:</strong> Email marketing, newsletter management, subscriber segmentation, and marketing automation.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Collected:</strong> Email address, name, subscription preferences, email engagement data, and subscriber tags.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Processing:</strong> MailerLite UAB (Lithuania/EU) - GDPR compliant, EU-based data processing.
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      MailerLite Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-white/70" />
                    Vercel (Hosting & Infrastructure)
                  </h4>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Purpose:</strong> Website hosting, content delivery network (CDN), serverless functions, and performance monitoring.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Collected:</strong> IP addresses, request logs, error logs, performance metrics, and visitor analytics.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Processing:</strong> Vercel, Inc. (USA) - GDPR compliant with DPA, data stored in multiple regions including EU.
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Vercel Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-white/70" />
                    Vercel KV / Upstash Redis
                  </h4>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Purpose:</strong> Data storage for visitor tracking, session management, and application state.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Collected:</strong> Visitor session data, tracking information, and temporary application data.
                  </p>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Data Processing:</strong> Upstash, Inc. (USA) - GDPR compliant with appropriate safeguards.
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://upstash.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Upstash Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl p-6 mb-8">
                <h4 className="text-white font-semibold mb-3">Data Processing Safeguards</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  All third-party service providers are required to:
                </p>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>• Comply with GDPR and applicable data protection laws</li>
                  <li>• Process data only for specified purposes</li>
                  <li>• Implement appropriate technical and organizational security measures</li>
                  <li>• Notify us of any data breaches</li>
                  <li>• Delete or return data upon termination of services</li>
                  <li>• Use Standard Contractual Clauses (SCCs) for international data transfers</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-azure-blue" />
                6. Data Security & Protection
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We implement comprehensive security measures to protect your personal information:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Technical Safeguards</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• AES-256 encryption for data storage</li>
                    <li>• Multi-factor authentication</li>
                    <li>• Regular security audits and penetration testing</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Organizational Measures</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Access controls and user permissions</li>
                    <li>• Staff training on data protection</li>
                    <li>• Incident response procedures</li>
                    <li>• Regular policy reviews and updates</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <UserCheck className="w-8 h-8 text-orange" />
                7. Your Data Protection Rights (GDPR Articles 12-23 & UAE Law)
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Under GDPR and UAE Federal Decree-Law No. 45 of 2021, you have the following data protection rights:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Access (Art. 15)</p>
                      <p className="text-white/70 text-sm">Request copies of your personal data and information about processing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Rectification (Art. 16)</p>
                      <p className="text-white/70 text-sm">Correct inaccurate or incomplete data without undue delay</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Erasure (Art. 17)</p>
                      <p className="text-white/70 text-sm">Request deletion of your data ("Right to be Forgotten")</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Restriction (Art. 18)</p>
                      <p className="text-white/70 text-sm">Limit processing of your data under certain conditions</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Data Portability (Art. 20)</p>
                      <p className="text-white/70 text-sm">Receive your data in a structured, machine-readable format</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Object (Art. 21)</p>
                      <p className="text-white/70 text-sm">Object to processing based on legitimate interests or direct marketing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Withdraw Consent</p>
                      <p className="text-white/70 text-sm">Withdraw consent at any time where processing is based on consent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Lodge a Complaint</p>
                      <p className="text-white/70 text-sm">File a complaint with a supervisory authority (see Section 11)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-2xl p-6 mb-8">
                <h4 className="text-white font-semibold mb-3">How to Exercise Your Rights</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  To exercise any of these rights, please contact our Data Protection Officer at <a href="mailto:legal@theorangecode.com" className="text-orange hover:underline">legal@theorangecode.com</a> or call +971 56 878 6106.
                </p>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>• We will respond to your request within <strong>30 days</strong> (GDPR) or as required by UAE law</li>
                  <li>• We may request additional information to verify your identity before processing your request</li>
                  <li>• Exercising your rights is <strong>free of charge</strong>, unless requests are manifestly unfounded or excessive</li>
                  <li>• We will inform you if we cannot comply with your request and provide reasons</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Globe className="w-8 h-8 text-bright-blue" />
                8. Cookies & Tracking Technologies
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We use cookies and similar technologies to enhance your experience. You can control cookie preferences through our cookie banner or browser settings. 
                For detailed information about our use of cookies, please see our{' '}
                <Link href="/cookie-policy" className="text-orange hover:underline">Cookie Policy</Link>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Essential Cookies</h4>
                  <p className="text-white/70 text-sm">Required for basic website functionality and security</p>
                </div>
                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Analytics Cookies</h4>
                  <p className="text-white/70 text-sm">Help us understand website usage and performance (Google Analytics)</p>
                </div>
                <div className="bg-gradient-to-r from-light-blue/10 to-light-blue/5 border border-light-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Personalization Cookies</h4>
                  <p className="text-white/70 text-sm">Remember your preferences and settings</p>
                </div>
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Marketing Cookies</h4>
                  <p className="text-white/70 text-sm">Used for targeted advertising (with consent)</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <FileText className="w-8 h-8 text-azure-blue" />
                9. Data Retention & Storage
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We retain your personal information only as long as necessary for the purposes outlined in this policy:
              </p>
              
              <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Active Clients</h4>
                    <p className="text-white/70 text-sm">Duration of service + 3 years for business records</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Marketing Data</h4>
                    <p className="text-white/70 text-sm">Until consent is withdrawn or 2 years of inactivity</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Legal Compliance</h4>
                    <p className="text-white/70 text-sm">As required by UAE law (typically 7 years)</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Lock className="w-8 h-8 text-orange" />
                10. International Data Transfers (GDPR Chapter V)
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Your data is primarily stored and processed within the UAE and EU. When we transfer personal data outside the UAE or EU, we ensure adequate protection through:
              </p>
              
              <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">GDPR Safeguards</h4>
                    <ul className="text-white/70 text-sm space-y-2">
                      <li>• Standard Contractual Clauses (SCCs) approved by the EU Commission</li>
                      <li>• Data Processing Agreements (DPAs) with all third-party processors</li>
                      <li>• Adequacy decisions where applicable</li>
                      <li>• Binding Corporate Rules (BCRs) for intra-group transfers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3">UAE Requirements</h4>
                    <ul className="text-white/70 text-sm space-y-2">
                      <li>• Compliance with Federal Decree-Law No. 45 of 2021</li>
                      <li>• Authorization from competent authorities where required</li>
                      <li>• Contractual obligations ensuring data protection</li>
                      <li>• Technical and organizational security measures</li>
                    </ul>
                  </div>
                </div>
                <p className="text-white/80 text-sm mt-4">
                  <strong>Data Transfer Countries:</strong> USA (Google, Stripe, Vercel, Resend), Lithuania/EU (MailerLite). 
                  All transfers are protected by SCCs and appropriate safeguards.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Database className="w-8 h-8 text-light-blue" />
                11. Supervisory Authorities & Complaints
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                If you are located in the EU/EEA or UAE, you have the right to lodge a complaint with a supervisory authority:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">EU/EEA Residents</h4>
                  <p className="text-white/80 text-sm mb-2">
                    You may lodge a complaint with your local data protection authority. Find your authority at:
                  </p>
                  <a 
                    href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-orange hover:underline text-sm"
                  >
                    European Data Protection Board - Member List
                  </a>
                </div>
                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">UAE Residents</h4>
                  <p className="text-white/80 text-sm mb-2">
                    <strong>UAE Data Office</strong><br/>
                    Telecommunications and Digital Government Regulatory Authority (TDRA)<br/>
                    Email: dataoffice@tdra.gov.ae<br/>
                    Website: <a href="https://tdra.gov.ae" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">tdra.gov.ae</a>
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-bright-blue" />
                12. Contact Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                For privacy related questions feel free to contact us.
              </p>
              
              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white font-bold text-xl mb-2">Legal Team</p>
                    <p className="text-white/80 mb-1">The Orange Code</p>
                    <p className="text-white/80 mb-1">Email: legal@theorangecode.com</p>
                    <p className="text-white/80 mb-1">Phone: +971 56 878 6106</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl mb-2">Business Address</p>
                    <p className="text-white/80 mb-1">Etihad Towers</p>
                    <p className="text-white/80 mb-1">Tower 3, Floor 36</p>
                    <p className="text-white/80 mb-1">Abu Dhabi, United Arab Emirates</p>
                    <p className="text-white/80 mb-1">Response Time: Within 30 days</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 mt-16 flex items-center gap-4">
                <FileText className="w-8 h-8 text-azure-blue" />
                13. Changes to This Privacy Policy
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. 
                When we make material changes, we will:
              </p>

              <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-2xl p-6 mb-8">
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• Post the updated policy on our website with a new "Last Updated" date</li>
                  <li>• Notify you by email if you have an account with us</li>
                  <li>• Display a prominent notice on our website</li>
                  <li>• Obtain your consent if required by law (e.g., for new processing purposes)</li>
                </ul>
                <p className="text-white/70 text-sm mt-4">
                  We encourage you to review this Privacy Policy periodically. Continued use of our services after changes constitutes 
                  acceptance of the updated policy, unless your consent is required by law.
                </p>
              </div>

              <div className="mt-12 p-8 bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-azure-blue" />
                  <h4 className="text-xl font-bold text-white">Legal Compliance & Certifications</h4>
                </div>
                <div className="space-y-3">
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong>Version:</strong> 2.0
                  </p>
                  <div className="border-t border-white/20 my-4" />
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong>This Privacy Policy complies with:</strong>
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• <strong>GDPR:</strong> EU General Data Protection Regulation (EU) 2016/679</li>
                    <li>• <strong>ePrivacy Directive:</strong> Directive 2002/58/EC (as amended by Directive 2009/136/EC)</li>
                    <li>• <strong>UAE Federal Law:</strong> Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data</li>
                    <li>• <strong>Ministry of Economy:</strong> UAE Ministry of Economy Regulations and ADRA Licensing Requirements</li>
                    <li>• <strong>PCI DSS:</strong> Payment Card Industry Data Security Standard (via Stripe)</li>
                  </ul>
                  <div className="border-t border-white/20 my-4" />
                  <p className="text-white/70 text-xs leading-relaxed">
                    The Orange Code is committed to maintaining the highest standards of data protection and privacy. This policy reflects 
                    our commitment to transparency, accountability, and respect for individual privacy rights under international and local laws.
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
