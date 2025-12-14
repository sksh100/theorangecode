'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Mail, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { MinimalistLayout } from '@/components/MinimalistLayout'
import { LoadingSpinner } from '@/components/LoadingSpinner'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isLoading, setIsLoading] = useState(true)
  const [customerData, setCustomerData] = useState<{
    email: string
    name: string
    paymentReference: string
  } | null>(null)

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!sessionId) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/stripe-session?session_id=${sessionId}`)
        if (!response.ok) {
          // If API fails, use session ID as payment reference
          // This ensures the page still works even if API is temporarily unavailable
          setCustomerData({
            email: 'your email address',
            name: 'there',
            paymentReference: sessionId || 'N/A'
          })
          setIsLoading(false)
          return
        }
        const data = await response.json()
        if (data.success && data.email) {
          setCustomerData({
            email: data.email,
            name: data.name || data.email.split('@')[0] || 'there',
            paymentReference: data.paymentReference || sessionId
          })
        } else {
          // Fallback if API returns but without email
          setCustomerData({
            email: 'your email address',
            name: 'there',
            paymentReference: data.paymentReference || sessionId || 'N/A'
          })
        }
      } catch (err) {
        console.error('Error fetching customer data:', err)
        // Graceful fallback - page still works with session ID
        setCustomerData({
          email: 'your email address',
          name: 'there',
          paymentReference: sessionId || 'N/A'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomerData()
  }, [sessionId])

  if (isLoading) {
    return (
      <MinimalistLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner variant="full" message="Loading your confirmation..." />
        </div>
      </MinimalistLayout>
    )
  }

  return (
    <MinimalistLayout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-orange/20 to-azure-blue/20 rounded-full flex items-center justify-center mx-auto border-2 border-orange/50"
          >
            <CheckCircle className="w-12 h-12 text-orange" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                Thank You, {customerData?.name || 'there'}!
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-2">
              Your payment was successful
            </p>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6"
          >
            <div className="flex items-start gap-4 text-left">
              <Mail className="w-6 h-6 text-orange flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Your E-Guide is on its way!</h3>
                <p className="text-white/80 leading-relaxed">
                  We've sent your personalized copy of <strong>Beyond Formalities: Understanding Dubai Culture, Legal Systems, and Everyday Life</strong> to <strong className="text-orange">{customerData?.email || 'your email address'}</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <FileText className="w-6 h-6 text-azure-blue flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What to expect:</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• Your PDF will arrive within a few minutes</li>
                  <li>• The download link is valid for 48 hours</li>
                  <li>• Your copy is watermarked with your email for security</li>
                  <li>• Check your spam folder if you don't see it</li>
                </ul>
              </div>
            </div>

          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <p className="text-white/80 mb-4">
              If you face any inconveniences or have questions about your purchase, please contact us at{' '}
              <a 
                href={`mailto:hello@theorangecode.com?subject=Beyond Formalities Purchase Inquiry&body=Payment Reference: ${customerData?.paymentReference || 'N/A'}`}
                className="text-orange hover:text-azure-blue transition-colors font-semibold"
              >
                hello@theorangecode.com
              </a>
              {' '}with your payment reference:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 break-all">
              <code className="text-white text-sm font-mono">{customerData?.paymentReference || 'N/A'}</code>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-orange to-azure-blue rounded-xl text-white font-semibold hover:shadow-glow transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <span>Return to Home</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/beyond-formalities"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300"
            >
              View E-Guide Page
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </MinimalistLayout>
  )
}

export default function BeyondFormalitiesThankYou() {
  return (
    <Suspense fallback={
      <MinimalistLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner variant="full" message="Preparing your confirmation page..." />
        </div>
      </MinimalistLayout>
    }>
      <ThankYouContent />
    </Suspense>
  )
}

