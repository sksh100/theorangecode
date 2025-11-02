'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // You can verify the session here if needed
    if (sessionId) {
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-2xl w-full p-8 md:p-12 text-center"
      >
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-white/80 text-lg mb-6">
          Thank you for enrolling in our Exclusive Pre-Launch Offer!
        </p>
        
        <div className="bg-azure-blue/20 border border-azure-blue/40 rounded-lg p-6 mb-6">
          <p className="text-white mb-2">What happens next?</p>
          <ul className="text-white/80 text-sm space-y-2 text-left">
            <li>✓ You'll receive a confirmation email shortly</li>
            <li>✓ We'll send you access details for the Cultural Intelligence Foundations</li>
            <li>✓ You'll be contacted to schedule your One-on-One Q&A Session</li>
            <li>✓ Priority invitations will be sent for upcoming sessions</li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-primary rounded-lg text-white font-semibold hover:shadow-glow transition-all duration-300"
          >
            Return to Home
          </Link>
          <p className="text-white/60 text-sm">
            Questions? Contact us at{' '}
            <a href="mailto:hello@theorangecode.com" className="text-azure-blue hover:underline">
              hello@theorangecode.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

