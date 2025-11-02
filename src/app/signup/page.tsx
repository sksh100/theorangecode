'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { ModernFooter } from '@/components/ModernFooter'
import { UserPlus, Mail, User, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Clear previous errors
    setErrors({})
    const newErrors: Record<string, string> = {}

    // Validate email
    if (!formData.email || formData.email.trim().length === 0) {
      newErrors.email = 'Email is required'
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Validate username
    if (!formData.username || formData.username.trim().length === 0) {
      newErrors.username = 'Username is required'
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores'
    }

    // Validate password
    if (!formData.password || formData.password.length === 0) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    // Validate confirm password
    if (!formData.confirmPassword || formData.confirmPassword.length === 0) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          username: formData.username.trim(),
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      // Store user session
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', formData.email.trim().toLowerCase())
      localStorage.setItem('username', formData.username.trim())

      setIsSuccess(true)
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err: any) {
      console.error('Signup error:', err)
      setErrors({ submit: err.message || 'Failed to create account. Please try again.' })
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
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
                Account Created Successfully!
              </h1>
              <p className="text-white/70 mb-6">
                Your account has been created. Redirecting to your dashboard...
              </p>
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
          <div className="relative">
            {/* Floating Particles Around Create Account Box - Positioned on Left and Right Sides */}
            {/* Floating Geometric Shapes - Left Side */}
            <motion.div
              className="absolute top-1/4 -left-12 sm:-left-16 md:-left-20 w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 border-2 border-azure-blue/30 rotate-45 z-0"
              animate={{
                rotate: [45, 405],
                scale: [1, 1.2, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 -left-8 sm:-left-12 md:-left-16 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 border-orange/30 rounded-full z-0"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -10, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-1/4 -left-10 sm:-left-14 md:-left-18 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-azure-blue/20 to-orange/20 rotate-12 z-0"
              animate={{
                rotate: [12, 372],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Floating Geometric Shapes - Right Side */}
            <motion.div
              className="absolute top-1/4 -right-12 sm:-right-16 md:-right-20 w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 border-2 border-bright-blue/30 rotate-45 z-0"
              animate={{
                rotate: [45, 405],
                scale: [1, 1.2, 1],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute top-1/2 -right-8 sm:-right-12 md:-right-16 w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 border-2 border-azure-blue/25 rounded-full z-0"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 10, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            />
            <motion.div
              className="absolute bottom-1/3 -right-10 sm:-right-14 md:-right-18 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 border-orange/25 rotate-12 z-0"
              animate={{
                rotate: [12, 372],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear",
                delay: 0.8,
              }}
            />
            
            {/* Floating Gradient Orbs - Left Side */}
            <motion.div
              className="absolute top-1/3 -left-16 sm:-left-20 md:-left-24 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-radial from-azure-blue/20 to-transparent rounded-full blur-2xl z-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, -15, 0],
                y: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/3 -left-12 sm:-left-16 md:-left-20 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-gradient-radial from-orange/20 to-transparent rounded-full blur-2xl z-0"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, -20, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            
            {/* Floating Gradient Orbs - Right Side */}
            <motion.div
              className="absolute top-1/3 -right-16 sm:-right-20 md:-right-24 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-radial from-bright-blue/20 to-transparent rounded-full blur-2xl z-0"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 15, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-12 sm:-right-16 md:-right-20 w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-radial from-azure-blue/15 to-transparent rounded-full blur-xl z-0"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
            <motion.div
              className="absolute top-1/2 -right-14 sm:-right-18 md:-right-22 w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 bg-gradient-radial from-orange/15 to-transparent rounded-full blur-xl z-0"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card relative z-10 overflow-visible"
            >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-3 text-gradient-primary">
                Create Account
              </h1>
              <p className="text-white/70">
                Sign up to access your dashboard and courses
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                {/* Email */}
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

                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, username: e.target.value.replace(/\s/g, '') }))
                        setErrors(prev => ({ ...prev, username: '', submit: '' }))
                      }}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border ${
                        errors.username ? 'border-red-500/50' : 'border-white/20'
                      } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                      placeholder="Choose a username"
                      autoComplete="username"
                    />
                  </div>
                  {errors.username && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.username}</span>
                    </div>
                  )}
                  <p className="text-white/50 text-xs mt-1">
                    3+ characters, letters, numbers, and underscores only
                  </p>
                </div>

                {/* Password */}
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
                      placeholder="Create a password (min. 8 characters)"
                      autoComplete="new-password"
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

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))
                        setErrors(prev => ({ ...prev, confirmPassword: '', submit: '' }))
                      }}
                      className={`w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border ${
                        errors.confirmPassword ? 'border-red-500/50' : 'border-white/20'
                      } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                      placeholder="Confirm your password"
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
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Create Account</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-6 text-center text-white/60 text-sm">
              <p>
                Already have an account?{' '}
                <Link href="/login" className="text-azure-blue hover:text-azure-luminous transition-colors font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
            </motion.div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}

