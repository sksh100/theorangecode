'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, MessageSquare } from 'lucide-react'
import { trackFormStart, trackFormComplete } from '@/lib/analytics'

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackFormStart('Contact Form', 'Contact Section');
    setIsSubmitting(true);
    setStatusMessage(null);

    const form = e.currentTarget;

    const submissionData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement | HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
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
        setStatusMessage("Thank you. Your message has been received and our team will be in touch very soon.");
        form.reset();
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-azure-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Let's Start Your{' '}
            <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out and let's discuss how we can support your cultural intelligence journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 h-full">
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
            <div className="glass-card p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone and Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-primary-dark/50 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:border-azure-blue/50 focus:ring-2 focus:ring-azure-blue/20 transition-all appearance-none cursor-pointer pr-12 hover:border-white/30 hover:bg-primary-dark/60"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '16px'
                        }}
                      >
                        <option value="" disabled className="bg-primary-dark text-white/50">Select a subject</option>
                        <option value="masterclass-inquiry" className="bg-primary-dark text-white py-2">Masterclass Inquiry</option>
                        <option value="booking" className="bg-primary-dark text-white py-2">Book a Session</option>
                        <option value="private-masterclass-inquiry" className="bg-primary-dark text-white py-2">Private Masterclass Inquiry</option>
                        <option value="partnership" className="bg-primary-dark text-white py-2">Partnership</option>
                        <option value="general" className="bg-primary-dark text-white py-2">General Question</option>
                      </select>
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

