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
                <p className="text-white/80 leading-relaxed mb-3">
                  This Cookie Policy explains how The Orange Code ("we," "us," or "our") uses cookies and similar tracking technologies on our website 
                  (theorangecode.com). This policy is compliant with:
                </p>
                <ul className="text-white/70 text-sm space-y-1 ml-4 mb-3">
                  <li>• <strong>GDPR:</strong> EU General Data Protection Regulation (EU) 2016/679</li>
                  <li>• <strong>ePrivacy Directive:</strong> Directive 2002/58/EC (as amended by Directive 2009/136/EC)</li>
                  <li>• <strong>UAE Federal Law:</strong> Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data</li>
                  <li>• <strong>PECR:</strong> Privacy and Electronic Communications Regulations 2003 (UK)</li>
                </ul>
                <p className="text-white/80 leading-relaxed">
                  By using our website, you acknowledge this Cookie Policy. We obtain your consent before placing non-essential cookies on your device. 
                  You can manage your cookie preferences at any time through our cookie banner or browser settings.
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
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left text-white font-semibold py-2 pr-4">Cookie Name</th>
                        <th className="text-left text-white font-semibold py-2 pr-4">Purpose</th>
                        <th className="text-left text-white font-semibold py-2 pr-4">Provider</th>
                        <th className="text-left text-white font-semibold py-2">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/10">
                        <td className="py-3 pr-4">cookie_consent</td>
                        <td className="py-3 pr-4">Stores your cookie preferences and consent choices</td>
                        <td className="py-3 pr-4">The Orange Code</td>
                        <td className="py-3">1 year</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 pr-4">__Secure-next-auth.session-token</td>
                        <td className="py-3 pr-4">Session authentication and security</td>
                        <td className="py-3 pr-4">The Orange Code</td>
                        <td className="py-3">Session</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 pr-4">__stripe_mid</td>
                        <td className="py-3 pr-4">Fraud prevention and secure payment processing</td>
                        <td className="py-3 pr-4">Stripe</td>
                        <td className="py-3">1 year</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 pr-4">__stripe_sid</td>
                        <td className="py-3 pr-4">Fraud prevention for payment security</td>
                        <td className="py-3 pr-4">Stripe</td>
                        <td className="py-3">30 minutes</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">CSRF-TOKEN</td>
                        <td className="py-3 pr-4">Cross-site request forgery protection</td>
                        <td className="py-3 pr-4">The Orange Code</td>
                        <td className="py-3">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/60 text-xs mt-4">
                  <strong>Legal Basis:</strong> These cookies are strictly necessary for the website to function. Under GDPR Article 6(1)(f) 
                  and ePrivacy Directive, these cookies do not require consent as they are essential for the service you requested.
                </p>
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
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left text-white font-semibold py-2 pr-4">Cookie Name</th>
                        <th className="text-left text-white font-semibold py-2 pr-4">Purpose</th>
                        <th className="text-left text-white font-semibold py-2 pr-4">Provider</th>
                        <th className="text-left text-white font-semibold py-2">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/10">
                        <td className="py-3 pr-4">_ga</td>
                        <td className="py-3 pr-4">Distinguishes unique users and calculates visitor data</td>
                        <td className="py-3 pr-4">Google Analytics</td>
                        <td className="py-3">2 years</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 pr-4">_ga_*</td>
                        <td className="py-3 pr-4">Stores session state and event parameters</td>
                        <td className="py-3 pr-4">Google Analytics</td>
                        <td className="py-3">2 years</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 pr-4">_gid</td>
                        <td className="py-3 pr-4">Stores and counts page views</td>
                        <td className="py-3 pr-4">Google Analytics</td>
                        <td className="py-3">24 hours</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 pr-4">_gat</td>
                        <td className="py-3 pr-4">Throttles request rate to limit data collection</td>
                        <td className="py-3 pr-4">Google Analytics</td>
                        <td className="py-3">1 minute</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">__vercel_live_token</td>
                        <td className="py-3 pr-4">Performance monitoring and error tracking</td>
                        <td className="py-3 pr-4">Vercel</td>
                        <td className="py-3">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-azure-blue/10 border border-azure-blue/20 rounded-lg p-4">
                  <p className="text-white/80 text-sm mb-2">
                    <strong>Data Collected:</strong> IP address (anonymized), page views, clicks, scroll depth, time on page, device type, 
                    browser information, referrer URL, UTM parameters, custom events, conversion data
                  </p>
                  <p className="text-white/80 text-sm mb-2">
                    <strong>Legal Basis:</strong> Consent (GDPR Article 6(1)(a) & ePrivacy Directive Article 5(3))
                  </p>
                  <p className="text-white/70 text-xs">
                    <strong>Google Analytics:</strong>{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Privacy Policy
                    </a>
                    {' | '}
                    <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Analytics Privacy
                    </a>
                    {' | '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                      Opt-Out
                    </a>
                  </p>
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
                <Shield className="w-8 h-8 text-light-blue" />
                8. Withdrawing or Changing Cookie Consent
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                You have the right to withdraw or change your cookie consent at any time. Here's how:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-azure-blue/10 to-azure-blue/5 border border-azure-blue/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">Via Cookie Banner</h4>
                  <p className="text-white/70 text-sm mb-3">
                    Click the cookie icon in the footer of any page to reopen the cookie banner and adjust your preferences.
                  </p>
                  <button className="text-orange hover:underline text-sm font-semibold">
                    Manage Cookie Preferences →
                  </button>
                </div>

                <div className="bg-gradient-to-r from-bright-blue/10 to-bright-blue/5 border border-bright-blue/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">Via Browser Settings</h4>
                  <p className="text-white/70 text-sm">
                    Configure your browser to block or delete cookies. Instructions:
                  </p>
                  <ul className="text-white/60 text-xs space-y-1 mt-2">
                    <li>• <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">Chrome</a></li>
                    <li>• <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">Firefox</a></li>
                    <li>• <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">Safari</a></li>
                    <li>• <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">Edge</a></li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">Via Opt-Out Tools</h4>
                  <p className="text-white/70 text-sm mb-2">
                    Use browser add-ons or industry opt-out tools:
                  </p>
                  <ul className="text-white/60 text-xs space-y-1">
                    <li>• <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">Google Analytics Opt-out</a></li>
                    <li>• <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">NAI Opt-Out Tool</a></li>
                    <li>• <a href="https://youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">Your Online Choices (EU)</a></li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl p-6 mb-8">
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong>Important:</strong> Blocking or deleting essential cookies may affect website functionality. You may not be able to 
                  access certain features or complete transactions if essential cookies are disabled. Withdrawing consent for analytics or 
                  marketing cookies will not affect website functionality.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Database className="w-8 h-8 text-azure-blue" />
                9. Do Not Track (DNT) Signals
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to have your online activity 
                tracked. Currently, there is no industry standard for how to respond to DNT signals. We honor DNT signals by not loading 
                non-essential cookies (analytics, marketing) when a DNT signal is detected.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Info className="w-8 h-8 text-orange" />
                10. Updates to This Policy
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. 
                When we make material changes, we will:
              </p>

              <div className="bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-2xl p-6 mb-8">
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• Post the updated policy on our website with a new "Last Updated" date</li>
                  <li>• Display a prominent notice on our website or in the cookie banner</li>
                  <li>• Request renewed consent if required by law (e.g., for new cookie categories)</li>
                </ul>
                <p className="text-white/70 text-sm mt-4">
                  We encourage you to review this Cookie Policy periodically. Continued use of our website after changes constitutes 
                  acceptance of the updated policy.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-azure-blue" />
                11. Contact Us & Data Protection Officer
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                If you have questions about our use of cookies, this Cookie Policy, or wish to exercise your data protection rights, please contact us:
              </p>
              
              <div className="bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white font-bold text-xl mb-2">Data Protection Officer</p>
                    <p className="text-white/80 mb-1">The Orange Code</p>
                    <p className="text-white/80 mb-1">Email: <a href="mailto:legal@theorangecode.com" className="text-orange hover:underline">legal@theorangecode.com</a></p>
                    <p className="text-white/80 mb-1">Phone: <a href="tel:+971568786106" className="text-orange hover:underline">+971 56 878 6106</a></p>
                    <p className="text-white/70 text-sm mt-2">Response Time: Within 30 days</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl mb-2">Business Address</p>
                    <p className="text-white/80 mb-1">Etihad Towers</p>
                    <p className="text-white/80 mb-1">Tower 3, Floor 36</p>
                    <p className="text-white/80 mb-1">Abu Dhabi, United Arab Emirates</p>
                    <p className="text-white/70 text-sm mt-3">
                      <Link href="/privacy-policy" className="text-orange hover:underline font-semibold">
                        View Privacy Policy →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-gradient-to-r from-azure-blue/10 to-bright-blue/10 border border-azure-blue/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-azure-blue" />
                  <h4 className="text-xl font-bold text-white">Legal Compliance & Version Information</h4>
                </div>
                <div className="space-y-3">
                  <p className="text-white/80 text-sm">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-white/80 text-sm">
                    <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-white/80 text-sm">
                    <strong>Version:</strong> 2.0
                  </p>
                  <div className="border-t border-white/20 my-4" />
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong>This Cookie Policy complies with:</strong>
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• <strong>GDPR:</strong> EU General Data Protection Regulation (EU) 2016/679</li>
                    <li>• <strong>ePrivacy Directive:</strong> Directive 2002/58/EC (as amended by Directive 2009/136/EC)</li>
                    <li>• <strong>PECR:</strong> Privacy and Electronic Communications Regulations 2003 (UK)</li>
                    <li>• <strong>UAE Federal Law:</strong> Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data</li>
                    <li>• <strong>Ministry of Economy:</strong> UAE Ministry of Economy Regulations and ADRA Licensing Requirements</li>
                    <li>• <strong>Cookie Law:</strong> EU Cookie Directive compliance</li>
                  </ul>
                  <div className="border-t border-white/20 my-4" />
                  <p className="text-white/70 text-xs leading-relaxed">
                    <strong>Business License:</strong> The Orange Code operates under a freelance license issued by the Abu Dhabi Registration Authority (ADRA) 
                    under the UAE Ministry of Economic Development.
                  </p>
                  <div className="border-t border-white/20 my-4" />
                  <p className="text-white/70 text-xs leading-relaxed">
                    The Orange Code is committed to transparency in our use of cookies and tracking technologies. This policy provides 
                    clear information about what cookies we use, why we use them, and how you can control them. We respect your privacy 
                    choices and comply with all applicable data protection and electronic communications laws.
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

