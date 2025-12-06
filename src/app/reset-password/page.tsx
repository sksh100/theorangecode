'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { ModernFooter } from '@/components/ModernFooter'
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  useEffect(() => {
    // Validate token when component mounts
    if (token) {
      validateToken()
    } else {
      setTokenValid(false)
    }
  }, [token])

  const validateToken = async () => {
    try {
      const response = await fetch(`/api/validate-reset-token?token=${token}`)
      const data = await response.json()
      
      if (response.ok && data.valid) {
        setTokenValid(true)
      } else {
        setTokenValid(false)
      }
    } catch (err) {
      console.error('Token validation error:', err)
      setTokenValid(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Clear previous errors
    setErrors({})
    
    const newErrors: Record<string, string> = {}

    // Validate new password
    if (!passwordData.newPassword || passwordData.newPassword.trim().length === 0) {
      newErrors.newPassword = 'New password is required'
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long'
    }

    // Validate confirm password
    if (!passwordData.confirmPassword || passwordData.confirmPassword.trim().length === 0) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (!token) {
      setErrors({ token: 'Reset token is missing' })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password')
      }

      setIsSuccess(true)
      setErrors({})
      
      // Redirect to settings after 3 seconds
      setTimeout(() => {
        router.push('/settings')
      }, 3000)
    } catch (err: any) {
      console.error('Password reset error:', err)
      setErrors({ submit: err.message || 'Failed to reset password. Please try again.' })
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-primary-dark text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Validating reset token...</p>
        </div>
      </div>
    )
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-primary-dark text-white">
        <Background />
        <ModernNavbar />
        
        <main className="relative z-10 pt-24 pb-16">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 border border-red-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-3">
                Invalid or Expired Link
              </h1>
              <p className="text-white/70 mb-6">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link href="/forgot-password">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-glow"
                  style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                >
                  Request New Reset Link
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </main>
        <ModernFooter />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-primary-dark text-white">
        <Background />
        <ModernNavbar />
        
        <main className="relative z-10 pt-24 pb-16">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-3">
                Password Reset Successful
              </h1>
              <p className="text-white/70 mb-6">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <p className="text-white/60 text-sm mb-6">
                Redirecting to settings...
              </p>
              <Link href="/settings">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-glow"
                  style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                >
                  Go to Settings
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </main>
        <ModernFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Reset Password Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-3 text-gradient-primary">
                Reset Password
              </h1>
              <p className="text-white/70">
                Enter your new password below
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                {/* New Password */}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-white/80 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => {
                        setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))
                        setErrors(prev => ({ ...prev, newPassword: '', submit: '' }))
                      }}
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${
                        errors.newPassword ? 'border-red-500/50' : 'border-white/20'
                      } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                      placeholder="Enter new password (min. 8 characters)"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.newPassword}</span>
                    </div>
                  )}
                  <p className="text-white/50 text-xs mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => {
                        setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))
                        setErrors(prev => ({ ...prev, confirmPassword: '', submit: '' }))
                      }}
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${
                        errors.confirmPassword ? 'border-red-500/50' : 'border-white/20'
                      } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{errors.submit}</span>
                  </div>
                )}

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
                      <span>Resetting Password...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Reset Password</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}

import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner variant="full" message="Loading password reset..." />}>
      <ResetPasswordContent />
    </Suspense>
  )
}

