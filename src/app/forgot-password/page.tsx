'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { ModernFooter } from '@/components/ModernFooter'
import { ArrowLeft, Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Clear previous errors
    setError('')

    // Basic validation
    if (!email || !email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email')
      }

      setIsSuccess(true)
      setError('')
    } catch (err: any) {
      console.error('Password reset error:', err)
      setError(err.message || 'Failed to send reset email. Please try again later.')
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link href="/settings">
              <motion.button
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Settings</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Forgot Password Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-3 text-gradient-primary">
                Forgot Password?
              </h1>
              <p className="text-white/70">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Check Your Email
                </h2>
                <p className="text-white/70 mb-6">
                  We've sent a password reset link to <strong className="text-white">{email}</strong>
                </p>
                <p className="text-white/60 text-sm mb-6">
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </p>
                <Link href="/settings">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-glow"
                    style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                  >
                    Back to Settings
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${
                        error ? 'border-red-500/50' : 'border-white/20'
                      } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                    {error && (
                      <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Send Reset Link</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Additional Help */}
          {!isSuccess && (
            <div className="mt-6 text-center text-white/60 text-sm">
              <p>
                Remember your password?{' '}
                <Link href="/settings" className="text-azure-blue hover:text-azure-luminous transition-colors">
                  Back to Settings
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}

