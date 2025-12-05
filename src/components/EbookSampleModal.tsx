'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, User, Download, Loader2, CheckCircle } from 'lucide-react'

interface EbookSampleModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EbookSampleModal({ isOpen, onClose }: EbookSampleModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      // Submit contact details and get sample download link
      const response = await fetch('/api/ebook-sample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request')
      }

      // Success - show download button
      setSuccess(true)
      setDownloadUrl(data.downloadUrl)
      
      // Also add to MailerLite (optional, but good for lead capture)
      try {
        await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: '',
            timestamp: new Date().toISOString(),
            source: 'Ebook Sample Request',
          }),
        })
      } catch (mailerliteError) {
        // Don't fail if MailerLite fails
        console.error('MailerLite error:', mailerliteError)
      }
    } catch (err: any) {
      console.error('Sample request error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
      // Close modal after a short delay
      setTimeout(() => {
        onClose()
        // Reset form
        setFormData({ name: '', email: '' })
        setSuccess(false)
        setDownloadUrl(null)
        setError(null)
      }, 1000)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      // Reset form
      setFormData({ name: '', email: '' })
      setSuccess(false)
      setDownloadUrl(null)
      setError(null)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="glass-card bg-primary-dark/95 backdrop-blur-[30px] border border-azure-blue/30 rounded-3xl p-8 md:p-12 shadow-glow relative max-w-lg w-full pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {!success ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange/20 to-azure-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-orange" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Get Your Free Sample
                    </h2>
                    <p className="text-white/70 text-sm md:text-base">
                      Enter your details to download the first 7 pages of the UK to UAE Cultural Intelligence Guide
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange/50 focus:bg-white/10 transition-all"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange/50 focus:bg-white/10 transition-all"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-orange to-orange/80 hover:from-orange/90 hover:to-orange/70 text-white font-semibold rounded-xl transition-all duration-300 shadow-glow-orange hover:shadow-glow-orange disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Get Free Sample
                        </>
                      )}
                    </button>

                    <p className="text-white/50 text-xs text-center">
                      By downloading, you agree to receive occasional updates from The Orange Code. You can unsubscribe at any time.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-azure-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Sample Ready!
                  </h2>
                  <p className="text-white/70 text-sm md:text-base mb-6">
                    Your sample is ready to download. Click the button below to get your first 7 pages.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange to-orange/80 hover:from-orange/90 hover:to-orange/70 text-white font-semibold rounded-xl transition-all duration-300 shadow-glow-orange hover:shadow-glow-orange flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Sample PDF
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

