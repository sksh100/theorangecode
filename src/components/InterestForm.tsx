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
  countryCode: string
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
    countryCode: '+971', // Default to UAE
  })
  
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' } | null>(null)

  // Complete list of country codes
  const countryCodes = [
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+7', country: 'Russia/Kazakhstan', flag: '🇷🇺' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+30', country: 'Greece', flag: '🇬🇷' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+40', country: 'Romania', flag: '🇷🇴' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+51', country: 'Peru', flag: '🇵🇪' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+53', country: 'Cuba', flag: '🇨🇺' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+95', country: 'Myanmar', flag: '🇲🇲' },
    { code: '+98', country: 'Iran', flag: '🇮🇷' },
    { code: '+212', country: 'Morocco', flag: '🇲🇦' },
    { code: '+213', country: 'Algeria', flag: '🇩🇿' },
    { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
    { code: '+218', country: 'Libya', flag: '🇱🇾' },
    { code: '+220', country: 'Gambia', flag: '🇬🇲' },
    { code: '+221', country: 'Senegal', flag: '🇸🇳' },
    { code: '+222', country: 'Mauritania', flag: '🇲🇷' },
    { code: '+223', country: 'Mali', flag: '🇲🇱' },
    { code: '+224', country: 'Guinea', flag: '🇬🇳' },
    { code: '+225', country: 'Ivory Coast', flag: '🇨🇮' },
    { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+227', country: 'Niger', flag: '🇳🇪' },
    { code: '+228', country: 'Togo', flag: '🇹🇬' },
    { code: '+229', country: 'Benin', flag: '🇧🇯' },
    { code: '+230', country: 'Mauritius', flag: '🇲🇺' },
    { code: '+231', country: 'Liberia', flag: '🇱🇷' },
    { code: '+232', country: 'Sierra Leone', flag: '🇸🇱' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+235', country: 'Chad', flag: '🇹🇩' },
    { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
    { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
    { code: '+238', country: 'Cape Verde', flag: '🇨🇻' },
    { code: '+239', country: 'São Tomé and Príncipe', flag: '🇸🇹' },
    { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: '+241', country: 'Gabon', flag: '🇬🇦' },
    { code: '+242', country: 'Republic of the Congo', flag: '🇨🇬' },
    { code: '+243', country: 'Democratic Republic of the Congo', flag: '🇨🇩' },
    { code: '+244', country: 'Angola', flag: '🇦🇴' },
    { code: '+245', country: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: '+246', country: 'British Indian Ocean Territory', flag: '🇮🇴' },
    { code: '+248', country: 'Seychelles', flag: '🇸🇨' },
    { code: '+249', country: 'Sudan', flag: '🇸🇩' },
    { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
    { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '+252', country: 'Somalia', flag: '🇸🇴' },
    { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
    { code: '+256', country: 'Uganda', flag: '🇺🇬' },
    { code: '+257', country: 'Burundi', flag: '🇧🇮' },
    { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
    { code: '+260', country: 'Zambia', flag: '🇿🇲' },
    { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
    { code: '+262', country: 'Réunion', flag: '🇷🇪' },
    { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
    { code: '+264', country: 'Namibia', flag: '🇳🇦' },
    { code: '+265', country: 'Malawi', flag: '🇲🇼' },
    { code: '+266', country: 'Lesotho', flag: '🇱🇸' },
    { code: '+267', country: 'Botswana', flag: '🇧🇼' },
    { code: '+268', country: 'Swaziland', flag: '🇸🇿' },
    { code: '+269', country: 'Comoros', flag: '🇰🇲' },
    { code: '+290', country: 'Saint Helena', flag: '🇸🇭' },
    { code: '+291', country: 'Eritrea', flag: '🇪🇷' },
    { code: '+297', country: 'Aruba', flag: '🇦🇼' },
    { code: '+298', country: 'Faroe Islands', flag: '🇫🇴' },
    { code: '+299', country: 'Greenland', flag: '🇬🇱' },
    { code: '+350', country: 'Gibraltar', flag: '🇬🇮' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+354', country: 'Iceland', flag: '🇮🇸' },
    { code: '+355', country: 'Albania', flag: '🇦🇱' },
    { code: '+356', country: 'Malta', flag: '🇲🇹' },
    { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
    { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
    { code: '+371', country: 'Latvia', flag: '🇱🇻' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+373', country: 'Moldova', flag: '🇲🇩' },
    { code: '+374', country: 'Armenia', flag: '🇦🇲' },
    { code: '+375', country: 'Belarus', flag: '🇧🇾' },
    { code: '+376', country: 'Andorra', flag: '🇦🇩' },
    { code: '+377', country: 'Monaco', flag: '🇲🇨' },
    { code: '+378', country: 'San Marino', flag: '🇸🇲' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
    { code: '+381', country: 'Serbia', flag: '🇷🇸' },
    { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
    { code: '+383', country: 'Kosovo', flag: '🇽🇰' },
    { code: '+385', country: 'Croatia', flag: '🇭🇷' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { code: '+389', country: 'North Macedonia', flag: '🇲🇰' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+423', country: 'Liechtenstein', flag: '🇱🇮' },
    { code: '+500', country: 'Falkland Islands', flag: '🇫🇰' },
    { code: '+501', country: 'Belize', flag: '🇧🇿' },
    { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
    { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
    { code: '+504', country: 'Honduras', flag: '🇭🇳' },
    { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
    { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
    { code: '+507', country: 'Panama', flag: '🇵🇦' },
    { code: '+508', country: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
    { code: '+509', country: 'Haiti', flag: '🇭🇹' },
    { code: '+590', country: 'Guadeloupe', flag: '🇬🇵' },
    { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
    { code: '+592', country: 'Guyana', flag: '🇬🇾' },
    { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
    { code: '+594', country: 'French Guiana', flag: '🇬🇫' },
    { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
    { code: '+596', country: 'Martinique', flag: '🇲🇶' },
    { code: '+597', country: 'Suriname', flag: '🇸🇷' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    { code: '+599', country: 'Netherlands Antilles', flag: '🇧🇶' },
    { code: '+670', country: 'East Timor', flag: '🇹🇱' },
    { code: '+672', country: 'Australian External Territories', flag: '🇦🇶' },
    { code: '+673', country: 'Brunei', flag: '🇧🇳' },
    { code: '+674', country: 'Nauru', flag: '🇳🇷' },
    { code: '+675', country: 'Papua New Guinea', flag: '🇵🇬' },
    { code: '+676', country: 'Tonga', flag: '🇹🇴' },
    { code: '+677', country: 'Solomon Islands', flag: '🇸🇧' },
    { code: '+678', country: 'Vanuatu', flag: '🇻🇺' },
    { code: '+679', country: 'Fiji', flag: '🇫🇯' },
    { code: '+680', country: 'Palau', flag: '🇵🇼' },
    { code: '+681', country: 'Wallis and Futuna', flag: '🇼🇫' },
    { code: '+682', country: 'Cook Islands', flag: '🇨🇰' },
    { code: '+683', country: 'Niue', flag: '🇳🇺' },
    { code: '+684', country: 'American Samoa', flag: '🇦🇸' },
    { code: '+685', country: 'Samoa', flag: '🇼🇸' },
    { code: '+686', country: 'Kiribati', flag: '🇰🇮' },
    { code: '+687', country: 'New Caledonia', flag: '🇳🇨' },
    { code: '+688', country: 'Tuvalu', flag: '🇹🇻' },
    { code: '+689', country: 'French Polynesia', flag: '🇵🇫' },
    { code: '+690', country: 'Tokelau', flag: '🇹🇰' },
    { code: '+691', country: 'Micronesia', flag: '🇫🇲' },
    { code: '+692', country: 'Marshall Islands', flag: '🇲🇭' },
    { code: '+850', country: 'North Korea', flag: '🇰🇵' },
    { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
    { code: '+853', country: 'Macau', flag: '🇲🇴' },
    { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
    { code: '+856', country: 'Laos', flag: '🇱🇦' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
    { code: '+960', country: 'Maldives', flag: '🇲🇻' },
    { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
    { code: '+962', country: 'Jordan', flag: '🇯🇴' },
    { code: '+963', country: 'Syria', flag: '🇸🇾' },
    { code: '+964', country: 'Iraq', flag: '🇮🇶' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+967', country: 'Yemen', flag: '🇾🇪' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+970', country: 'Palestine', flag: '🇵🇸' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+972', country: 'Israel', flag: '🇮🇱' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
    { code: '+976', country: 'Mongolia', flag: '🇲🇳' },
    { code: '+977', country: 'Nepal', flag: '🇳🇵' },
    { code: '+992', country: 'Tajikistan', flag: '🇹🇯' },
    { code: '+993', country: 'Turkmenistan', flag: '🇹🇲' },
    { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+995', country: 'Georgia', flag: '🇬🇪' },
    { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+998', country: 'Uzbekistan', flag: '🇺🇿' },
  ]

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string, countryCode: string): boolean => {
    // Remove spaces, dashes, and parentheses
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    
    // Basic validation - should be 7-15 digits after country code
    const phoneRegex = /^[0-9]{7,15}$/
    return phoneRegex.test(cleanPhone)
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
    } else if (!validatePhone(formData.phone, formData.countryCode)) {
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
          phone: `${formData.countryCode}${formData.phone.trim()}`,
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
          <div className="flex gap-2">
            <select
              value={formData.countryCode}
              onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
              className="p-4 px-3 bg-dark-blue border-2 border-azure-blue rounded-xl text-white text-sm font-montserrat backdrop-blur-[10px] transition-all duration-300 min-w-[140px] focus:outline-none focus:border-azure-luminous focus:shadow-glow-azure"
              style={{
                backgroundColor: '#01011e',
                color: '#ffffff',
                borderColor: '#00d4ff'
              }}
            >
              {countryCodes.map((country) => (
                <option 
                  key={country.code} 
                  value={country.code} 
                  style={{
                    backgroundColor: '#01011e',
                    color: '#ffffff',
                    padding: '8px'
                  }}
                >
                  {country.flag} {country.code} {country.country}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`flex-1 ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="Enter phone number"
              required
            />
          </div>
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
