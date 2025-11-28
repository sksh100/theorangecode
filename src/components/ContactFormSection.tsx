'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, MessageSquare, ChevronDown } from 'lucide-react'
import { trackFormStart, trackFormComplete } from '@/lib/analytics'
import { trackFormStart as trackFormStartNew, trackFormComplete as trackFormCompleteNew, trackFormAbandon } from '@/lib/tracking'

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emailConfirm: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const formStartTracked = useRef(false)
  const fieldsFilledRef = useRef(0)
  
  const subjectOptions = [
    { value: '', label: 'Select a subject', disabled: true },
    { value: 'masterclass-inquiry', label: 'Masterclass Inquiry' },
    { value: 'booking', label: 'Corporate Training' },
    { value: 'private-masterclass-inquiry', label: 'Private Coaching Session' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'general', label: 'General Question' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value
    const name = e.target.name
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Track form start on first field interaction
    if (!formStartTracked.current) {
      formStartTracked.current = true;
      trackFormStartNew('Contact Form', window.location.pathname);
    }
    
    // Count filled fields
    const filledFields = Object.values({ ...formData, [name]: value }).filter(v => v && v.trim()).length;
    fieldsFilledRef.current = filledFields;
    
    // Validate email match in real-time
    if (name === 'email' || name === 'emailConfirm') {
      const email = name === 'email' ? value : formData.email
      const emailConfirm = name === 'emailConfirm' ? value : formData.emailConfirm
      
      if (email && emailConfirm && email !== emailConfirm) {
        setEmailError('Email addresses do not match')
      } else {
        setEmailError(null)
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Validate email match before submission
    if (formData.email !== formData.emailConfirm) {
      setEmailError('Email addresses do not match. Please check and try again.')
      setStatusMessage('Please ensure both email addresses match.')
      return
    }
    
    trackFormStart('Contact Form', 'Contact Section');
    setIsSubmitting(true);
    setStatusMessage(null);
    setEmailError(null);

    const form = e.currentTarget;

    const submissionData = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (res.ok) {
        trackFormComplete('Contact Form', 'Contact Section', {
          form_name: submissionData.name,
          form_email: submissionData.email,
          form_subject: submissionData.subject,
        });
        trackFormCompleteNew('Contact Form', window.location.pathname, {
          form_name: submissionData.name,
          form_email: submissionData.email,
          form_subject: submissionData.subject,
        });
        setStatusMessage("Thank you. Your message has been received and our team will be in touch very soon.");
        form.reset();
        setFormData({ firstName: '', lastName: '', email: '', emailConfirm: '', phone: '', subject: '', message: '' });
        setEmailError(null);
      } else {
        console.error('API error:', data);
        setStatusMessage(data.error || "Something went wrong, please try again.");
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatusMessage("Something went wrong, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-azure-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-x-hidden">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            <span className="text-azure-blue font-semibold text-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <div className="w-2 h-2 bg-azure-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </motion.div>

          <h2 className="text-title text-white mb-6">
            Have Questions?{' '}
            <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
              We Are Here to Help
            </span>
          </h2>
          <div className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto space-y-4 mb-8">
            <p className="text-lg md:text-xl tracking-normal">
              We answer every message with care so you can move forward with confidence.{' '}
              <span className="text-orange font-bold text-lg md:text-xl">
                Let's Connect!
              </span>
            </p>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-normal">
              Share your details below so our team can reply shortly.
            </p>
          </div>
          
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 max-w-md">
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-6 sm:p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-azure-blue/20 to-azure-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-azure-blue/20">
                    <Mail className="w-6 h-6 text-azure-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a href="mailto:hello@theorangecode.com" className="text-white/70 hover:text-orange transition-colors">
                      hello@theorangecode.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-orange/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-orange/20">
                    <Phone className="w-6 h-6 text-orange" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <a href="tel:+971568786106" className="text-white/70 hover:text-orange transition-colors">
                      +971 56 878 6106
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-bright-blue/20 to-bright-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-bright-blue/20">
                    <MapPin className="w-6 h-6 text-bright-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-white/70 leading-relaxed">
                      Etihad Towers<br />
                      Tower 3, Floor 36,<br />
                      Abu Dhabi,<br />
                      United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name and Last Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-white font-semibold mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all"
                      placeholder="First Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-white font-semibold mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                {/* E-mail and Confirm E-mail Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                      E-mail Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-primary-dark/50 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        emailError 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-white/20 focus:border-orange/50 focus:ring-orange/20'
                      }`}
                      placeholder="Your best e-mail"
                    />
                  </div>

                  <div>
                    <label htmlFor="emailConfirm" className="block text-white font-semibold mb-2">
                      Confirm E-mail Address *
                    </label>
                    <input
                      type="email"
                      id="emailConfirm"
                      name="emailConfirm"
                      value={formData.emailConfirm}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-primary-dark/50 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        emailError 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-white/20 focus:border-orange/50 focus:ring-orange/20'
                      }`}
                      placeholder="Your best e-mail"
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-red-400">{emailError}</p>
                    )}
                  </div>
                </div>

                {/* Phone and Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-white font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-azure-blue/50 focus:ring-2 focus:ring-azure-blue/20 transition-all"
                      placeholder="+971 50 123 4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white font-semibold mb-2">
                      Subject *
                    </label>
                    <div className="relative group" ref={dropdownRef}>
                      {/* Gradient border effect on focus/hover */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange/50 via-azure-blue/50 to-orange/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur-sm transition-opacity duration-300 -z-10" />
                      
                      {/* Custom Dropdown Button */}
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 bg-gradient-to-br from-primary-dark/80 via-primary-dark/60 to-primary-dark/80 backdrop-blur-[20px] border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/30 transition-all cursor-pointer pr-12 hover:border-azure-blue/40 hover:bg-gradient-to-br hover:from-primary-dark/90 hover:via-primary-dark/70 hover:to-primary-dark/90 relative z-10 shadow-lg hover:shadow-orange/10 text-left"
                      >
                        <span className={formData.subject ? 'text-white' : 'text-white/50'}>
                          {formData.subject 
                            ? subjectOptions.find(opt => opt.value === formData.subject)?.label 
                            : 'Select a subject'}
                        </span>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                          <ChevronDown className={`w-5 h-5 text-white/70 group-hover:text-orange transition-all duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                      
                      {/* Custom Dropdown Menu */}
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-50 w-full mt-2 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark backdrop-blur-[20px] border border-white/20 rounded-xl shadow-2xl overflow-hidden"
                        >
                          <div className="py-2">
                            {subjectOptions.map((option, index) => (
                              <button
                                key={option.value || `option-${index}`}
                                type="button"
                                onClick={() => {
                                  if (!option.disabled) {
                                    setFormData(prev => ({ ...prev, subject: option.value }))
                                    setIsDropdownOpen(false)
                                  }
                                }}
                                disabled={option.disabled}
                                className={`w-full px-4 py-3 text-left text-white transition-all duration-200 ${
                                  option.disabled
                                    ? 'text-white/50 cursor-not-allowed'
                                    : formData.subject === option.value
                                    ? 'bg-gradient-to-r from-orange/20 to-azure-blue/20 text-white font-semibold'
                                    : 'hover:bg-gradient-to-r hover:from-orange/10 hover:to-azure-blue/10 hover:text-white'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Hidden input for form validation */}
                      <input
                        type="hidden"
                        name="subject"
                        value={formData.subject}
                        required
                      />
                      
                      {/* Glow effect on focus */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange/0 via-azure-blue/0 to-orange/0 opacity-0 group-focus-within:opacity-20 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all resize-none"
                    placeholder="Tell us about your needs and how we can help..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cta-button-glow px-8 py-4 rounded-xl font-bold text-lg text-white disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Status Message */}
                {statusMessage && (
                  <p className="mt-4 text-sm text-neutral-200">
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

