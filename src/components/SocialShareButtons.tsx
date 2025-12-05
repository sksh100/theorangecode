'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Linkedin, Facebook, Instagram, Share2, Copy, Check, Image } from 'lucide-react'
import { useState } from 'react'
import { trackCTAClick } from '@/lib/tracking'

interface SocialShareButtonsProps {
  url?: string
  title?: string
  description?: string
  imageUrl?: string
  variant?: 'default' | 'compact' | 'icon-only'
  className?: string
  showLabel?: boolean
  platforms?: string[] // Optional: filter which platforms to show (e.g., ['WhatsApp', 'Copy Link'])
}

export function SocialShareButtons({
  url = 'https://www.theorangecode.com/uk-to-uae-relocation',
  title = 'UK to UAE Relocation Cultural Guide',
  description = 'A practical cultural intelligence guide for British professionals relocating to the UAE. Learn workplace culture, etiquette, communication and expectations before you arrive.',
  imageUrl = 'https://www.theorangecode.com/og-image',
  variant = 'default',
  className = '',
  showLabel = true,
  platforms
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    url,
    title,
    description,
    imageUrl
  }

  const handleShare = (platform: string, shareUrl: string) => {
    trackCTAClick(`Share on ${platform}`, window.location.pathname, {
      shareType: platform,
      url: shareData.url
    })
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      trackCTAClick('Copy Link', window.location.pathname, { shareType: 'copy' })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // WhatsApp
  const whatsappMessage = `I found this UK to UAE relocation cultural guide... Thought you might need it! Link: ${url}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`

  // LinkedIn
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  // Facebook
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

  // Pinterest
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title + ' - ' + description)}`

  // Instagram (Note: Instagram doesn't support direct URL sharing, so we'll copy the link)
  const handleInstagramShare = () => {
    // Instagram doesn't support direct URL sharing via web
    // So we copy the link and show instructions
    handleCopyLink()
    alert('Link copied! Paste it in your Instagram story or post. Instagram doesn\'t support direct web sharing.')
  }

  const allButtons = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#20BA5A]',
      onClick: () => handleShare('WhatsApp', whatsappUrl)
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0077B5] hover:bg-[#006399]',
      onClick: () => handleShare('LinkedIn', linkedinUrl)
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#166FE5]',
      onClick: () => handleShare('Facebook', facebookUrl)
    },
    {
      name: 'Pinterest',
      icon: Image, // Using Image icon as Pinterest alternative (lucide-react doesn't have Pinterest icon)
      color: 'bg-[#BD081C] hover:bg-[#A5071A]',
      onClick: () => handleShare('Pinterest', pinterestUrl)
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-90',
      onClick: handleInstagramShare
    },
    {
      name: 'Copy Link',
      icon: copied ? Check : Copy,
      color: 'bg-white/10 hover:bg-white/20 border border-white/20',
      onClick: handleCopyLink,
      textColor: 'text-white'
    }
  ]

  // Filter buttons if platforms prop is provided
  const buttons = platforms 
    ? allButtons.filter(button => platforms.includes(button.name))
    : allButtons

  if (variant === 'icon-only') {
    return (
      <div className={`flex flex-wrap gap-3 justify-center ${className}`}>
        {buttons.map((button) => {
          const Icon = button.icon
          return (
            <motion.button
              key={button.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={button.onClick}
              className={`p-3 ${button.color} text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${button.textColor || ''}`}
              aria-label={`Share on ${button.name}`}
              title={button.name}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          )
        })}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {buttons.map((button) => {
          const Icon = button.icon
          return (
            <motion.button
              key={button.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={button.onClick}
              className={`flex items-center gap-2 px-3 py-2 ${button.color} text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${button.textColor || ''}`}
            >
              <Icon className="w-4 h-4" />
              {showLabel && <span>{button.name}</span>}
            </motion.button>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {showLabel && (
        <p className="text-white/80 text-sm mb-4 text-center">
          Share this guide with someone moving to the UAE
        </p>
      )}
      <div className="flex flex-wrap gap-3 justify-center">
        {buttons.map((button) => {
          const Icon = button.icon
          return (
            <motion.button
              key={button.name}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={button.onClick}
              className={`flex flex-col items-center gap-2 px-4 py-3 ${button.color} text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl min-w-[80px] ${button.textColor || ''}`}
              title={button.name}
            >
              <Icon className="w-6 h-6" />
              {showLabel && (
                <span className="text-xs font-semibold">{button.name}</span>
              )}
            </motion.button>
          )
        })}
      </div>
      {copied && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-green-400 text-sm mt-3"
        >
          ✓ Link copied to clipboard!
        </motion.p>
      )}
    </div>
  )
}

