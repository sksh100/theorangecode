'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { ModernFooter } from '@/components/ModernFooter'
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, Shield, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    totpCode: '',
    emailCode: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState<'credentials' | 'totp' | 'email'>('credentials')
  const [requires2FA, setRequires2FA] = useState(false)
  const [twoFactorMethod, setTwoFactorMethod] = useState<'totp' | 'email' | 'both' | null>(null)
  const [emailCodeSent, setEmailCodeSent] = useState(false)

  useEffect(() => {
    // Check if already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
      router.push('/dashboard')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Clear previous errors
    setErrors({})

    if (step === 'credentials') {
      const newErrors: Record<string, string> = {}

      // Validate email
      if (!formData.email || formData.email.trim().length === 0) {
        newErrors.email = 'Email is required'
      } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
        newErrors.email = 'Please enter a valid email address'
      }

      // Validate password
      if (!formData.password || formData.password.length === 0) {
        newErrors.password = 'Password is required'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      setIsSubmitting(true)

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Invalid email or password')
        }

        // Check if 2FA is required
        if (data.requires2FA) {
          setRequires2FA(true)
          setTwoFactorMethod(data.twoFactorMethod || 'totp')
          
          if (data.twoFactorMethod === 'email' || data.twoFactorMethod === 'both') {
            setEmailCodeSent(true)
            setStep('email')
          } else {
            setStep('totp')
          }
        } else {
          // Login successful, store session
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userEmail', formData.email.trim().toLowerCase())
          if (data.username) {
            localStorage.setItem('username', data.username)
          }
          
          router.push('/dashboard')
        }
      } catch (err: any) {
        console.error('Login error:', err)
        setErrors({ submit: err.message || 'Failed to login. Please try again.' })
      } finally {
        setIsSubmitting(false)
      }
    } else if (step === 'totp') {
      // Verify TOTP code
      if (!formData.totpCode || formData.totpCode.trim().length !== 6) {
        setErrors({ totpCode: 'Please enter a valid 6-digit code' })
        return
      }

      setIsSubmitting(true)

      try {
        const response = await fetch('/api/auth/verify-2fa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            totpCode: formData.totpCode.trim(),
            method: 'totp',
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Invalid verification code')
        }

        // Check if email verification is also required
        if (twoFactorMethod === 'both' && !emailCodeSent) {
          setEmailCodeSent(true)
          setStep('email')
          setFormData(prev => ({ ...prev, totpCode: '' }))
        } else {
          // Complete login
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userEmail', formData.email.trim().toLowerCase())
          if (data.username) {
            localStorage.setItem('username', data.username)
          }
          
          router.push('/dashboard')
        }
      } catch (err: any) {
        console.error('2FA verification error:', err)
        setErrors({ totpCode: err.message || 'Invalid code. Please try again.' })
      } finally {
        setIsSubmitting(false)
      }
    } else if (step === 'email') {
      // Verify email code
      if (!formData.emailCode || formData.emailCode.trim().length !== 6) {
        setErrors({ emailCode: 'Please enter a valid 6-digit code' })
        return
      }

      setIsSubmitting(true)

      try {
        const response = await fetch('/api/auth/verify-2fa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            emailCode: formData.emailCode.trim(),
            method: 'email',
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Invalid verification code')
        }

        // Complete login
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', formData.email.trim().toLowerCase())
        if (data.username) {
          localStorage.setItem('username', data.username)
        }
        
        router.push('/dashboard')
      } catch (err: any) {
        console.error('2FA verification error:', err)
        setErrors({ emailCode: err.message || 'Invalid code. Please try again.' })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleResendEmailCode = async () => {
    try {
      const response = await fetch('/api/auth/send-email-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
        }),
      })

      if (response.ok) {
        setEmailCodeSent(true)
        setErrors({})
      }
    } catch (err) {
      console.error('Resend email code error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                {step === 'credentials' ? (
                  <LogIn className="w-8 h-8 text-white" />
                ) : step === 'totp' ? (
                  <Smartphone className="w-8 h-8 text-white" />
                ) : (
                  <Mail className="w-8 h-8 text-white" />
                )}
              </div>
              <h1 className="text-3xl font-bold mb-3 text-gradient-primary">
                {step === 'credentials' ? 'Sign In' : step === 'totp' ? 'Two-Factor Authentication' : 'Email Verification'}
              </h1>
              <p className="text-white/70">
                {step === 'credentials' 
                  ? 'Enter your credentials to access your dashboard'
                  : step === 'totp'
                  ? 'Enter the 6-digit code from your authenticator app'
                  : 'Enter the 6-digit code sent to your email'}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                {/* Email & Password Step */}
                {step === 'credentials' && (
                  <>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, email: e.target.value }))
                            setErrors(prev => ({ ...prev, email: '', submit: '' }))
                          }}
                          className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border ${
                            errors.email ? 'border-red-500/50' : 'border-white/20'
                          } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                          placeholder="Enter your email"
                          autoComplete="email"
                        />
                      </div>
                      {errors.email && (
                        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          value={formData.password}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, password: e.target.value }))
                            setErrors(prev => ({ ...prev, password: '', submit: '' }))
                          }}
                          className={`w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border ${
                            errors.password ? 'border-red-500/50' : 'border-white/20'
                          } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.password}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* TOTP Step */}
                {step === 'totp' && (
                  <div>
                    <label htmlFor="totpCode" className="block text-sm font-medium text-white/80 mb-2">
                      Authenticator Code
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        id="totpCode"
                        value={formData.totpCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                          setFormData(prev => ({ ...prev, totpCode: value }))
                          setErrors(prev => ({ ...prev, totpCode: '' }))
                        }}
                        className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border ${
                          errors.totpCode ? 'border-red-500/50' : 'border-white/20'
                        } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all text-center text-2xl tracking-widest font-mono`}
                        placeholder="000000"
                        maxLength={6}
                        autoComplete="one-time-code"
                      />
                    </div>
                    {errors.totpCode && (
                      <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.totpCode}</span>
                      </div>
                    )}
                    <p className="text-white/50 text-xs mt-2 text-center">
                      Open your authenticator app (Google Authenticator, Authy, etc.) and enter the 6-digit code
                    </p>
                  </div>
                )}

                {/* Email Code Step */}
                {step === 'email' && (
                  <div>
                    <label htmlFor="emailCode" className="block text-sm font-medium text-white/80 mb-2">
                      Email Verification Code
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        id="emailCode"
                        value={formData.emailCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                          setFormData(prev => ({ ...prev, emailCode: value }))
                          setErrors(prev => ({ ...prev, emailCode: '' }))
                        }}
                        className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border ${
                          errors.emailCode ? 'border-red-500/50' : 'border-white/20'
                        } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all text-center text-2xl tracking-widest font-mono`}
                        placeholder="000000"
                        maxLength={6}
                        autoComplete="one-time-code"
                      />
                    </div>
                    {errors.emailCode && (
                      <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.emailCode}</span>
                      </div>
                    )}
                    <p className="text-white/50 text-xs mt-2 text-center">
                      Enter the 6-digit code sent to {formData.email}
                    </p>
                    <button
                      type="button"
                      onClick={handleResendEmailCode}
                      className="mt-2 text-azure-blue hover:text-azure-luminous text-sm transition-colors"
                    >
                      Resend code
                    </button>
                  </div>
                )}

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
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      {step === 'credentials' ? (
                        <>
                          <LogIn className="w-5 h-5" />
                          <span>Sign In</span>
                        </>
                      ) : step === 'totp' ? (
                        <>
                          <Shield className="w-5 h-5" />
                          <span>Verify</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          <span>Verify Email</span>
                        </>
                      )}
                    </>
                  )}
                </motion.button>

                {/* Back Button for 2FA */}
                {step !== 'credentials' && (
                  <button
                    type="button"
                    onClick={() => {
                      setStep('credentials')
                      setFormData(prev => ({ ...prev, totpCode: '', emailCode: '' }))
                      setErrors({})
                    }}
                    className="w-full text-white/60 hover:text-white text-sm transition-colors"
                  >
                    ← Back to login
                  </button>
                )}
              </div>
            </form>

            {step === 'credentials' && (
              <div className="mt-6 text-center text-white/60 text-sm space-y-2">
                <p>
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-azure-blue hover:text-azure-luminous transition-colors font-semibold">
                    Sign Up
                  </Link>
                </p>
                <p>
                  <Link href="/forgot-password" className="text-azure-blue hover:text-azure-luminous transition-colors">
                    Forgot password?
                  </Link>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}

