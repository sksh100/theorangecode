'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertTriangle, Globe, FileText, Users } from 'lucide-react'
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
                <p className="text-white/80 leading-relaxed">
                  This Privacy Policy explains how Your Luxury Agent collects, uses, and protects your personal information in compliance with UAE Federal Law No. 2 of 2019 
                  and Dubai Law No. 26 of 2007. Your privacy is our priority.
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
                    <li>• Payment and billing information</li>
                    <li>• Communication preferences</li>
                  </ul>
                </div>
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
                    <li>• Improve our services and programs</li>
                    <li>• Conduct market research and analytics</li>
                    <li>• Comply with UAE legal requirements</li>
                    <li>• Maintain business records</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Users className="w-8 h-8 text-bright-blue" />
                3. Information Sharing & Disclosure
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
                <Shield className="w-8 h-8 text-azure-blue" />
                4. Data Security & Protection
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
                5. Your Data Protection Rights
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Under UAE data protection laws, you have the following rights:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Access</p>
                      <p className="text-white/70 text-sm">Request copies of your personal data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Rectification</p>
                      <p className="text-white/70 text-sm">Correct inaccurate or incomplete data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Erasure</p>
                      <p className="text-white/70 text-sm">Request deletion of your data</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Restriction</p>
                      <p className="text-white/70 text-sm">Limit processing of your data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Portability</p>
                      <p className="text-white/70 text-sm">Transfer your data to another service</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Right to Object</p>
                      <p className="text-white/70 text-sm">Object to processing for marketing</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Globe className="w-8 h-8 text-bright-blue" />
                6. Cookies & Tracking Technologies
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We use cookies and similar technologies to enhance your experience. You can control cookie preferences through our cookie banner or browser settings.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Essential Cookies</h4>
                  <p className="text-white/70 text-sm">Required for basic website functionality and security</p>
                </div>
                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Analytics Cookies</h4>
                  <p className="text-white/70 text-sm">Help us understand website usage and performance</p>
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
                7. Data Retention & Storage
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
                8. International Data Transfers
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Your data is primarily stored and processed within the UAE. Any international transfers are conducted with appropriate safeguards and in compliance with UAE data protection laws.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-bright-blue" />
                9. Contact Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                For privacy-related questions or to exercise your rights, contact our Data Protection Officer:
              </p>
              
              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white font-bold text-xl mb-2">Data Protection Officer</p>
                    <p className="text-white/80 mb-1">Your Luxury Agent</p>
                    <p className="text-white/80 mb-1">Email: privacy@yourluxuryagent.com</p>
                    <p className="text-white/80 mb-1">Phone: +971 56 878 6106</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl mb-2">Business Address</p>
                    <p className="text-white/80 mb-1">Abu Dhabi Global Market</p>
                    <p className="text-white/80 mb-1">Abu Dhabi, United Arab Emirates</p>
                    <p className="text-white/80 mb-1">Response Time: Within 30 days</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-azure-blue" />
                  <h4 className="text-xl font-bold text-white">Legal Compliance</h4>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong>Last Updated:</strong> December 2025<br/>
                  This policy complies with UAE Federal Law No. 2 of 2019 on the Use of Information and Communication Technology in the Areas of Health, 
                  Abu Dhabi Law No. 4 of 2013 (Abu Dhabi Global Market), and international data protection standards.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
