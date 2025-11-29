'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Share2 } from 'lucide-react'
import { useState } from 'react'
import { trackCTAClick } from '@/lib/tracking'

interface WhatsAppShareButtonProps {
  url?: string
  message?: string
  variant?: 'default' | 'large' | 'icon-only'
  className?: string
}

export function WhatsAppShareButton({ 
  url = 'https://www.theorangecode.com/uk-to-uae-relocation',
  message = 'I found this UK to UAE relocation cultural guide and it helped me avoid big mistakes. Thought you might need it.',
  variant = 'default',
  className = ''
}: WhatsAppShareButtonProps) {
  const [clicked, setClicked] = useState(false)

  const handleShare = () => {
    const fullMessage = `${message} Link: ${url}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`
    
    // Track the share click
    trackCTAClick('WhatsApp Share Button', window.location.pathname, {
      shareType: 'whatsapp',
      url: url
    })
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    
    setClicked(true)
    setTimeout(() => setClicked(false), 2000)
  }

  if (variant === 'icon-only') {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        className={`p-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    )
  }

  if (variant === 'large') {
    return (
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleShare}
        className={`flex items-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold font-montserrat rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
      >
        <MessageCircle className="w-6 h-6" />
        <span>Share this guide with someone moving to the UAE</span>
        <Share2 className="w-5 h-5" />
      </motion.button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className={`flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium font-montserrat rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span>Share on WhatsApp</span>
    </motion.button>
  )
}

