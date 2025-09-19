'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  confirmEmail: string
  phone: string
}

interface InterestFormProps {
  onSuccess: () => void
}

export function InterestForm({ onSuccess }: InterestFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
  })
  
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' } | null>(null)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Please confirm your email address'
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Email addresses do not match'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setNotification({ message: 'Please fix the errors above', type: 'error' })
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          eventDate: '2025-10-09',
          timestamp: new Date().toISOString(),
          source: 'Your Luxury Agent Coming Soon Page'
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }

      onSuccess()
    } catch (error) {
      console.error('Form submission error:', error)
      setNotification({ 
        message: 'Something went wrong. Please try again.', 
        type: 'error' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.form 
        className="interest-form flex flex-col gap-6"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="form-group flex flex-col gap-2">
          <label htmlFor="firstName" className="font-sofia text-sm font-medium text-text-secondary uppercase tracking-wider">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'border-red-500' : ''}
            required
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm mt-1">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group flex flex-col gap-2">
          <label htmlFor="lastName" className="font-sofia text-sm font-medium text-text-secondary uppercase tracking-wider">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'border-red-500' : ''}
            required
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm mt-1">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group flex flex-col gap-2">
          <label htmlFor="email" className="font-sofia text-sm font-medium text-text-secondary uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'border-red-500' : ''}
            required
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        <div className="form-group flex flex-col gap-2">
          <label htmlFor="confirmEmail" className="font-sofia text-sm font-medium text-text-secondary uppercase tracking-wider">
            Confirm Email Address
          </label>
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleInputChange}
            className={errors.confirmEmail ? 'border-red-500' : ''}
            required
          />
          {errors.confirmEmail && (
            <span className="text-red-500 text-sm mt-1">{errors.confirmEmail}</span>
          )}
        </div>

        <div className="form-group flex flex-col gap-2">
          <label htmlFor="phone" className="font-sofia text-sm font-medium text-text-secondary uppercase tracking-wider">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? 'border-red-500' : ''}
            required
          />
          {errors.phone && (
            <span className="text-red-500 text-sm mt-1">{errors.phone}</span>
          )}
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting...</span>
            </div>
          ) : (
            <span>Register Interest</span>
          )}
        </motion.button>
      </motion.form>

      {notification && (
        <motion.div
          className={`notification ${notification.type === 'error' ? 'notification-error' : ''}`}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
        >
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification(null)}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}
