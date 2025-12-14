'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Sparkles,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  CheckSquare,
  Square,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react'
import { ContentPreviewModal } from './ContentPreviewModal'

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

interface ContentPost {
  id: string
  caption: string
  hashtags: string[]
  altText: string
  mediaUrl?: string
  platforms: string[]
  scheduledDate?: string
  publishedDate?: string
  status: 'draft' | 'ready_for_review' | 'approved' | 'scheduled' | 'published'
  unsplashImage?: UnsplashImage
  imageCacheKey?: string
  createdAt: string
  updatedAt: string
}

const platformIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  pinterest: Pinterest,
}

export function DayContentGenerator() {
  const [content, setContent] = useState<ContentPost[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set())
  const [previewPost, setPreviewPost] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<any>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('ready_for_review')
  const [approving, setApproving] = useState(false)
  const [startDate, setStartDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 1) // Start tomorrow
    return date.toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchContent()
  }, [statusFilter])

  const fetchContent = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/content?status=${statusFilter === 'all' ? 'all' : statusFilter}`)
      const data = await response.json()
      if (data.success) {
        // Filter for 30-day generated content
        const filtered = data.data.content.filter((post: ContentPost) => 
          post.id.startsWith('content_30day_')
        )
        setContent(filtered.sort((a: ContentPost, b: ContentPost) => {
          const dateA = a.scheduledDate || a.createdAt
          const dateB = b.scheduledDate || b.createdAt
          return new Date(dateA).getTime() - new Date(dateB).getTime()
        }))
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!confirm('This will generate 30 days of content. Continue?')) return

    setGenerating(true)
    try {
      const response = await fetch('/api/admin/generate-30-day-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate }),
      })

      const data = await response.json()
      if (data.success) {
        alert(`Successfully generated ${data.data.totalGenerated} posts!`)
        await fetchContent()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error: any) {
      alert(`Error generating content: ${error.message}`)
    } finally {
      setGenerating(false)
    }
  }

  const handlePreview = async (postId: string) => {
    setPreviewPost(postId)
    setPreviewLoading(true)
    try {
      const response = await fetch(`/api/admin/content-preview?id=${postId}`)
      const data = await response.json()
      if (data.success) {
        setPreviewData(data.data)
      }
    } catch (error) {
      console.error('Error fetching preview:', error)
    } finally {
      setPreviewLoading(false)
    }
  }

  const handleApprove = async (postIds?: string[]) => {
    const idsToApprove = postIds || Array.from(selectedPosts)
    if (idsToApprove.length === 0) {
      alert('Please select posts to approve')
      return
    }

    if (!confirm(`Approve ${idsToApprove.length} post(s)?`)) return

    setApproving(true)
    try {
      const response = await fetch('/api/admin/approve-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentIds: idsToApprove }),
      })

      const data = await response.json()
      if (data.success) {
        alert(`Successfully approved ${data.data.approvedCount} post(s)!`)
        setSelectedPosts(new Set())
        await fetchContent()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error: any) {
      alert(`Error approving content: ${error.message}`)
    } finally {
      setApproving(false)
    }
  }

  const handleBulkApprove = async () => {
    if (!confirm('Approve all posts ready for review?')) return

    setApproving(true)
    try {
      const response = await fetch('/api/admin/approve-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approveAll: true }),
      })

      const data = await response.json()
      if (data.success) {
        alert(`Successfully approved ${data.data.approvedCount} post(s)!`)
        setSelectedPosts(new Set())
        await fetchContent()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error: any) {
      alert(`Error approving content: ${error.message}`)
    } finally {
      setApproving(false)
    }
  }

  const toggleSelect = (postId: string) => {
    const newSelected = new Set(selectedPosts)
    if (newSelected.has(postId)) {
      newSelected.delete(postId)
    } else {
      newSelected.add(postId)
    }
    setSelectedPosts(newSelected)
  }

  const toggleSelectAll = () => {
    const readyPosts = content.filter(p => p.status === 'ready_for_review')
    if (selectedPosts.size === readyPosts.length) {
      setSelectedPosts(new Set())
    } else {
      setSelectedPosts(new Set(readyPosts.map(p => p.id)))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready_for_review':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'approved':
        return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'scheduled':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      case 'published':
        return 'text-purple-400 bg-purple-400/20 border-purple-400/30'
      default:
        return 'text-white/60 bg-white/5 border-white/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-orange" />
            30-Day Content Generator
          </h2>
          <p className="text-white/60 mt-1">Generate and manage 30 days of "Beyond Formalities" ebook content</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            disabled={generating}
          />
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-6 py-2 bg-gradient-to-r from-orange to-azure-blue rounded-lg text-white font-semibold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate 30 Days
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Filter & Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white/60">Filter:</span>
          {['all', 'ready_for_review', 'approved', 'scheduled', 'published'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-gradient-to-r from-orange to-azure-blue text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>

        {statusFilter === 'ready_for_review' && content.filter(p => p.status === 'ready_for_review').length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSelectAll}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-sm flex items-center gap-2"
            >
              {selectedPosts.size === content.filter(p => p.status === 'ready_for_review').length ? (
                <CheckSquare className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              Select All
            </button>
            {selectedPosts.size > 0 && (
              <button
                onClick={() => handleApprove()}
                disabled={approving}
                className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {approving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Approve Selected ({selectedPosts.size})
                  </>
                )}
              </button>
            )}
            <button
              onClick={handleBulkApprove}
              disabled={approving}
              className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {approving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Approve All Ready
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange" />
        </div>
      ) : content.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-xl">
          <AlertCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60">No content found. Generate 30 days of content to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.map((post) => {
            const PlatformIcons = post.platforms.map(p => {
              const Icon = platformIcons[p as keyof typeof platformIcons]
              return Icon ? <Icon key={p} className="w-4 h-4" /> : null
            })

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 hover:bg-white/10 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {statusFilter === 'ready_for_review' && (
                        <button
                          onClick={() => toggleSelect(post.id)}
                          className="mt-1"
                        >
                          {selectedPosts.has(post.id) ? (
                            <CheckSquare className="w-4 h-4 text-orange" />
                          ) : (
                            <Square className="w-4 h-4 text-white/40" />
                          )}
                        </button>
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(post.status)}`}>
                        {post.status.replace('_', ' ')}
                      </span>
                    </div>
                    {post.scheduledDate && (
                      <p className="text-xs text-white/60 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(post.scheduledDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image Preview */}
                {post.mediaUrl && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5">
                    <img
                      src={post.mediaUrl}
                      alt={post.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Caption Preview */}
                <p className="text-sm text-white/80 line-clamp-3">
                  {post.caption.substring(0, 150)}...
                </p>

                {/* Platforms */}
                <div className="flex items-center gap-2">
                  {PlatformIcons}
                  <span className="text-xs text-white/60">{post.platforms.length} platform(s)</span>
                </div>

                {/* Unsplash Attribution */}
                {post.unsplashImage && (
                  <div className="text-xs text-white/60 bg-white/5 rounded p-2 border border-white/10">
                    📸 {post.unsplashImage.attributionText}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => handlePreview(post.id)}
                    className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  {post.status === 'ready_for_review' && (
                    <button
                      onClick={() => handleApprove([post.id])}
                      disabled={approving}
                      className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-sm text-green-400 transition-colors disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Preview Modal */}
      <ContentPreviewModal
        isOpen={previewPost !== null}
        onClose={() => {
          setPreviewPost(null)
          setPreviewData(null)
        }}
        preview={previewData}
        loading={previewLoading}
      />
    </div>
  )
}

