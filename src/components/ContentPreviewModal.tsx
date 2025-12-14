'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Instagram, Linkedin, Twitter, Image as ImageIcon, ExternalLink, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface UnsplashImage {
  id: string
  url: string
  regularUrl: string
  smallUrl: string
  photographer: {
    name: string
    username: string
    profileUrl: string
  }
  unsplashUrl: string
  attributionText: string
}

interface ContentPreview {
  content: {
    id: string
    caption: string
    hashtags: string[]
    altText: string
    mediaUrl?: string
    platforms: string[]
    scheduledDate?: string
    status: string
    unsplashImage?: UnsplashImage
  }
  previews: {
    instagram: {
      image?: string
      caption: string
      attribution: string
    }
    linkedin: {
      image?: string
      text: string
      hashtags: string[]
      attribution: string
    }
    twitter: {
      image?: string
      text: string
      hashtags: string[]
      attribution: string
    }
    pinterest: {
      image?: string
      description: string
      hashtags: string[]
      attribution: string
    }
  }
  unsplashAttribution?: {
    text: string
    photographer: string
    photographerLink: string
    unsplashLink: string
  }
}

interface ContentPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  preview: ContentPreview | null
  loading?: boolean
}

const platformIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  pinterest: ImageIcon,
}

export function ContentPreviewModal({ isOpen, onClose, preview, loading }: ContentPreviewModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-primary-dark via-secondary-dark to-primary-dark border border-white/20 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-primary-dark/95 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  Post Preview
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
                  </div>
                ) : preview ? (
                  <>
                    {/* Image Preview */}
                    {preview.content.mediaUrl && (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
                        <Image
                          src={preview.content.mediaUrl}
                          alt={preview.content.altText}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Unsplash Attribution */}
                    {preview.unsplashAttribution && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-azure-blue" />
                          <p className="text-sm font-semibold text-white">Image Attribution (Required)</p>
                        </div>
                        <p className="text-sm text-white/80 mb-2">
                          {preview.unsplashAttribution.text}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <a
                            href={preview.unsplashAttribution.photographerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-orange transition-colors flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Photographer Profile
                          </a>
                          <a
                            href={preview.unsplashAttribution.unsplashLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-azure-blue transition-colors flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View on Unsplash
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Platform Previews */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Platform Previews</h3>
                      
                      {preview.content.platforms.map((platform) => {
                        const platformPreview = preview.previews[platform as keyof typeof preview.previews]
                        const Icon = platformIcons[platform as keyof typeof platformIcons]
                        
                        if (!platformPreview) return null

                        return (
                          <div
                            key={platform}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3"
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-5 h-5 text-orange" />
                              <h4 className="font-semibold text-white capitalize">{platform}</h4>
                            </div>
                            
                            {platformPreview.image && (
                              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10">
                                <Image
                                  src={platformPreview.image}
                                  alt={preview.content.altText}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>
                            )}

                            <div className="bg-primary-dark rounded-lg p-3 border border-white/10">
                              <p className="text-sm text-white/90 whitespace-pre-wrap">
                                {platform === 'instagram' 
                                  ? ('caption' in platformPreview ? platformPreview.caption : '')
                                  : platform === 'linkedin' || platform === 'twitter'
                                  ? ('text' in platformPreview ? platformPreview.text : '')
                                  : ('description' in platformPreview ? platformPreview.description : '')
                                }
                              </p>
                              {platformPreview.attribution && (
                                <p className="text-xs text-white/60 mt-2">
                                  {platformPreview.attribution}
                                </p>
                              )}
                            </div>

                            {platform === 'linkedin' && 'hashtags' in platformPreview && (
                              <div className="flex flex-wrap gap-2">
                                {platformPreview.hashtags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs px-2 py-1 bg-orange/20 text-orange rounded border border-orange/30"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Post Details */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                      <h3 className="font-semibold text-white mb-3">Post Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white/60">Status</p>
                          <p className="text-white font-medium capitalize">{preview.content.status.replace('_', ' ')}</p>
                        </div>
                        {preview.content.scheduledDate && (
                          <div>
                            <p className="text-white/60">Scheduled</p>
                            <p className="text-white font-medium">
                              {new Date(preview.content.scheduledDate).toLocaleString()}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-white/60">Platforms</p>
                          <p className="text-white font-medium">{preview.content.platforms.length}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Hashtags</p>
                          <p className="text-white font-medium">{preview.content.hashtags.length}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/60">No preview available</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

