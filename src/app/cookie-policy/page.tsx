'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Cookie, Shield, Target, Eye, Settings, Database, Info } from 'lucide-react'
import Link from 'next/link'

export default function CookiePolicy() {
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
            <div className="w-20 h-20 bg-gradient-to-br from-orange/20 to-bright-blue/20 rounded-3xl flex items-center justify-center">
              <Cookie className="w-10 h-10 text-orange" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Cookie Policy</h1>
              <p className="text-white/70 text-xl">GDPR & UAE Data Protection Compliant</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              {/* Introduction */}
              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <Info className="w-6 h-6 text-azure-blue" />
                  <h3 className="text-xl font-bold text-white">About This Cookie Policy</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  This Cookie Policy explains how The Orange Code uses cookies and similar tracking technologies on our website. 
                  We comply with the General Data Protection Regulation (GDPR) for EU visitors and UAE Federal Law No. 2 of 2019 
                  for data protection. By using our website, you consent to our use of cookies as described in this policy.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Cookie className="w-8 h-8 text-orange" />
                1. What Are Cookies?
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make 
                websites work more efficiently and provide information to website owners. Cookies can be "persistent" (remain on your 
                device until deleted) or "session" (deleted when you close your browser).
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-azure-blue" />
                2. Essential Cookies (Always Active)
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                These cookies are necessary for the website to function and cannot be switched off. They are usually set in response 
                to actions you take, such as setting privacy preferences or filling in forms.
              </p>
              
              <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-6 mb-8">
                <h4 className="text-white font-semibold mb-4">Essential Cookies We Use:</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-semibold mb-2">Session Management</p>
                    <p className="text-white/70 text-sm">Purpose: Maintain your session and security while browsing</p>
                    <p className="text-white/60 text-xs mt-1">Provider: The Orange Code | Duration: Session</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2">Security Cookies</p>
                    <p className="text-white/70 text-sm">Purpose: Protect against fraud and ensure secure transactions</p>
                    <p className="text-white/60 text-xs mt-1">Provider: Stripe, Vercel | Duration: Session to 1 year</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2">Cookie Consent</p>
                    <p className="text-white/70 text-sm">Purpose: Remember your cookie preferences</p>
                    <p className="text-white/60 text-xs mt-1">Provider: The Orange Code | Duration: 1 year</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Target className="w-8 h-8 text-bright-blue" />
                3. Analytics Cookies (Optional)
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
              
              <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-6 mb-8">
                <h4 className="text-white font-semibold mb-4">Analytics Cookies We Use:</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-semibold mb-2">Google Analytics 4</p>
                    <p className="text-white/70 text-sm">
                      Purpose: Track website usage, page views, user behavior, and conversion events. Helps us improve our website 
                      and understand what content is most valuable to visitors.
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Provider: Google LLC | Duration: 2 years | 
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline ml-1">
                        Privacy Policy
                      </a>
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Data Collected: IP address (anonymized), page views, clicks, scroll depth, time on page, device type, browser, 
                      referrer, UTM parameters
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2">Vercel Analytics</p>
                    <p className="text-white/70 text-sm">
                      Purpose: Monitor website performance, errors, and usage patterns
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Provider: Vercel Inc. | Duration: Session | 
                      <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline ml-1">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Eye className="w-8 h-8 text-orange" />
                4. Marketing Cookies (Optional)
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                These cookies are used to deliver advertisements relevant to you and your interests, and to measure the effectiveness 
                of advertising campaigns.
              </p>
              
              <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-6 mb-8">
                <h4 className="text-white font-semibold mb-4">Marketing Cookies We Use:</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-semibold mb-2">Google Ads (if applicable)</p>
                    <p className="text-white/70 text-sm">
                      Purpose: Track conversions from Google Ads campaigns and remarketing
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Provider: Google LLC | Duration: 90 days | 
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline ml-1">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Settings className="w-8 h-8 text-light-blue" />
                5. Personalization Cookies (Optional)
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                These cookies allow the website to remember choices you make and provide enhanced, personalized features.
              </p>
              
              <div className="bg-gradient-to-r from-light-blue/10 to-light-blue/5 border border-light-blue/20 rounded-xl p-6 mb-8">
                <h4 className="text-white font-semibold mb-4">Personalization Cookies We Use:</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-semibold mb-2">User Preferences</p>
                    <p className="text-white/70 text-sm">
                      Purpose: Remember your language preferences, theme settings, and other customization choices
                    </p>
                    <p className="text-white/60 text-xs mt-1">Provider: The Orange Code | Duration: 1 year</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Database className="w-8 h-8 text-azure-blue" />
                6. Third-Party Services & Cookies
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We use the following third-party services that may set cookies on your device:
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">Payment Processing</h4>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Stripe:</strong> Processes payments securely. May use cookies for fraud prevention and security.
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Stripe Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">Email Services</h4>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Resend:</strong> Sends transactional emails. May use cookies for email tracking.
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Resend Privacy Policy
                    </a>
                  </p>
                  <p className="text-white/70 text-sm mb-2 mt-3">
                    <strong>MailerLite:</strong> Manages email marketing and newsletters. Uses cookies for subscriber tracking.
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      MailerLite Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">Hosting & Infrastructure</h4>
                  <p className="text-white/70 text-sm mb-2">
                    <strong>Vercel:</strong> Hosts our website and provides CDN services. May use cookies for performance monitoring.
                  </p>
                  <p className="text-white/60 text-xs">
                    <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Vercel Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-azure-blue" />
                7. Managing Your Cookie Preferences
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                You have full control over cookies. You can manage your preferences at any time:
              </p>
              
              <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-6 mb-8">
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-semibold mb-2">Cookie Banner</p>
                    <p className="text-white/70 text-sm">
                      When you first visit our website, you'll see a cookie banner where you can accept all, reject all, or customize 
                      your cookie preferences. You can change these preferences at any time by clicking the cookie icon in the footer 
                      or clearing your browser cookies.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2">Browser Settings</p>
                    <p className="text-white/70 text-sm">
                      Most browsers allow you to control cookies through their settings. You can set your browser to refuse cookies 
                      or alert you when cookies are being sent. However, blocking essential cookies may affect website functionality.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2">Google Analytics Opt-Out</p>
                    <p className="text-white/70 text-sm">
                      You can opt out of Google Analytics by installing the{' '}
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                        Google Analytics Opt-out Browser Add-on
                      </a>
                      {' '}or by rejecting analytics cookies in our cookie banner.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Info className="w-8 h-8 text-orange" />
                8. Updates to This Policy
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, 
                or regulatory reasons. We will notify you of any material changes by posting the new policy on this page and updating 
                the "Last Updated" date.
              </p>
              <p className="text-white/70 text-sm mb-8">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-azure-blue" />
                9. Contact Us
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              
              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl p-6 mb-8">
                <p className="text-white font-semibold mb-2">The Orange Code</p>
                <p className="text-white/80 text-sm mb-1">Email: <a href="mailto:legal@theorangecode.com" className="text-orange hover:underline">legal@theorangecode.com</a></p>
                <p className="text-white/80 text-sm mb-1">Address: Etihad Towers, Tower 3, Floor 36, Abu Dhabi, United Arab Emirates</p>
                <p className="text-white/80 text-sm">
                  For more information about our data practices, please see our{' '}
                  <Link href="/privacy-policy" className="text-orange hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

