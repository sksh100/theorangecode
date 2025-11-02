'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { ModernFooter } from '@/components/ModernFooter'
import { BookOpen, User, Settings, ArrowRight, Edit2, Save, Upload, Linkedin, Twitter, Facebook, Instagram, Globe, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface UserProfile {
  firstName: string
  lastName: string
  bio: string
  profilePhoto: string | null
  coverPhoto: string | null
  linkedin: string
  twitter: string
  facebook: string
  instagram: string
  website: string
  showInCommunity: boolean
}

export default function Dashboard() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    bio: '',
    profilePhoto: null,
    coverPhoto: null,
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    website: '',
    showInCommunity: false
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load profile from localStorage
    const saved = localStorage.getItem('user-profile')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setProfile(prev => ({ ...prev, ...parsed }))
      } catch (e) {
        console.error('Error loading profile:', e)
      }
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('user-profile', JSON.stringify(profile))
    setIsEditing(false)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePhoto: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, coverPhoto: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
    
    if (wordCount <= 300) {
      setProfile(prev => ({ ...prev, bio: text }))
    }
  }

  const getBioWordCount = () => {
    return profile.bio.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="glass-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-primary">
                    My Dashboard
                  </h1>
                  <p className="text-white/70">
                    Welcome back! {profile.firstName && `${profile.firstName} ${profile.lastName}`.trim()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section - Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-card overflow-hidden">
                {/* Cover Photo */}
                {profile.coverPhoto && (
                  <div className="relative w-full h-48 -mx-6 -mt-6 mb-6">
                    <Image
                      src={profile.coverPhoto}
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                    
                    {isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => coverFileInputRef.current?.click()}
                        className="absolute bottom-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg flex items-center gap-2 text-white hover:bg-black/80 transition-all shadow-lg"
                      >
                        <Upload className="w-4 h-4" />
                        <span className="text-sm font-medium">Change Cover</span>
                      </motion.button>
                    )}
                  </div>
                )}
                
                {/* Upload Cover Button - Only shown in edit mode when no cover photo */}
                {isEditing && !profile.coverPhoto && (
                  <div className="mb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => coverFileInputRef.current?.click()}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center gap-2 text-white hover:bg-white/20 transition-all"
                    >
                      <Upload className="w-5 h-5" />
                      <span className="font-medium">Upload Cover Picture</span>
                    </motion.button>
                    
                    <input
                      ref={coverFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverPhotoUpload}
                      className="hidden"
                    />
                  </div>
                )}
                
                {/* Hidden input for when cover photo exists */}
                {profile.coverPhoto && (
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPhotoUpload}
                    className="hidden"
                  />
                )}

                {/* Profile Photo */}
                <div className="mb-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {profile.profilePhoto ? (
                      <Image
                        src={profile.profilePhoto}
                        alt="Profile"
                        fill
                        className="rounded-full object-cover border-2 border-azure-blue/50"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-primary flex items-center justify-center border-2 border-azure-blue/50">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )}
                    
                    {isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-glow transition-all"
                      >
                        <Upload className="w-5 h-5 text-white" />
                      </motion.button>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  {!isEditing && (
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {profile.firstName || 'Your'} {profile.lastName || 'Name'}
                      </h2>
                    </div>
                  )}
                </div>

                {/* Edit/Save Button */}
                <div className="mb-6">
                  {isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="w-full px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="w-full px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/20"
                    >
                      <Edit2 className="w-5 h-5" />
                      Edit Profile
                    </motion.button>
                  )}
                </div>

                {/* Profile Fields */}
                {isEditing ? (
                  <div className="space-y-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                        placeholder="Enter your first name"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                        placeholder="Enter your last name"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Bio <span className="text-white/50">({getBioWordCount()}/300 words)</span>
                      </label>
                      <textarea
                        value={profile.bio}
                        onChange={handleBioChange}
                        rows={6}
                        maxLength={2000}
                        className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all resize-none"
                        placeholder="Tell us about yourself (0-300 words)..."
                      />
                      <p className="text-xs text-white/50 mt-1">
                        {getBioWordCount()}/300 words
                      </p>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h3 className="text-sm font-semibold text-white/80 mb-3">Social Media & Website</h3>
                      
                      {/* LinkedIn */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          value={profile.linkedin}
                          onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                          className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                          placeholder="linkedin.com/in/yourprofile"
                        />
                      </div>

                      {/* X (Twitter) */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                          <Twitter className="w-4 h-4" />
                          X (Twitter)
                        </label>
                        <input
                          type="text"
                          value={profile.twitter}
                          onChange={(e) => setProfile(prev => ({ ...prev, twitter: e.target.value }))}
                          className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                          placeholder="@yourusername"
                        />
                      </div>

                      {/* Facebook */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                          <Facebook className="w-4 h-4" />
                          Facebook
                        </label>
                        <input
                          type="text"
                          value={profile.facebook}
                          onChange={(e) => setProfile(prev => ({ ...prev, facebook: e.target.value }))}
                          className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                          placeholder="facebook.com/yourprofile"
                        />
                      </div>

                      {/* Instagram */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                          <Instagram className="w-4 h-4" />
                          Instagram
                        </label>
                        <input
                          type="text"
                          value={profile.instagram}
                          onChange={(e) => setProfile(prev => ({ ...prev, instagram: e.target.value }))}
                          className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                          placeholder="@yourusername"
                        />
                      </div>

                      {/* Website */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                          <Globe className="w-4 h-4" />
                          Website
                        </label>
                        <input
                          type="url"
                          value={profile.website}
                          onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                          className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>

                    {/* Community Visibility */}
                    <div className="pt-4 border-t border-white/10">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={profile.showInCommunity}
                          onChange={(e) => setProfile(prev => ({ ...prev, showInCommunity: e.target.checked }))}
                          className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-azure-blue" />
                            <span className="text-sm font-medium text-white group-hover:text-azure-blue transition-colors">
                              Show in Public Community
                            </span>
                          </div>
                          <p className="text-xs text-white/60">
                            Allow your profile to be visible in our future public community space, enabling members to connect with you. You can change this anytime.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Display Mode */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Name</h3>
                      <p className="text-white/80">
                        {profile.firstName || 'Your'} {profile.lastName || 'Name'}
                      </p>
                    </div>

                    {profile.bio && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Bio</h3>
                        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                          {profile.bio}
                        </p>
                      </div>
                    )}

                    {(profile.linkedin || profile.twitter || profile.facebook || profile.instagram || profile.website) && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">Connect</h3>
                        <div className="flex flex-wrap gap-3">
                          {profile.linkedin && (
                            <a
                              href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
                            >
                              <Linkedin className="w-4 h-4" />
                              <span className="text-sm">LinkedIn</span>
                            </a>
                          )}
                          {profile.twitter && (
                            <a
                              href={profile.twitter.startsWith('http') ? profile.twitter : `https://x.com/${profile.twitter.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
                            >
                              <Twitter className="w-4 h-4" />
                              <span className="text-sm">X</span>
                            </a>
                          )}
                          {profile.facebook && (
                            <a
                              href={profile.facebook.startsWith('http') ? profile.facebook : `https://${profile.facebook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
                            >
                              <Facebook className="w-4 h-4" />
                              <span className="text-sm">Facebook</span>
                            </a>
                          )}
                          {profile.instagram && (
                            <a
                              href={profile.instagram.startsWith('http') ? profile.instagram : `https://instagram.com/${profile.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
                            >
                              <Instagram className="w-4 h-4" />
                              <span className="text-sm">Instagram</span>
                            </a>
                          )}
                          {profile.website && (
                            <a
                              href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
                            >
                              <Globe className="w-4 h-4" />
                              <span className="text-sm">Website</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {profile.showInCommunity && (
                      <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <Users className="w-4 h-4" />
                          <span>Visible in Public Community</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Courses Section - Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-white">My Courses</h2>
                
                <Link href="/courses/cultural-intelligence">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card cursor-pointer group hover:border-azure-blue/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-10 h-10 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-2xl font-bold text-white group-hover:text-azure-blue transition-colors">
                            Cultural Intelligence
                          </h3>
                          <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-azure-blue group-hover:translate-x-2 transition-all" />
                        </div>
                        <p className="text-white/70 mb-3">
                          Transform your ability to work effectively across cultures. Master the four dimensions of CQ and apply them in real-world situations.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>10 Modules</span>
                          <span>•</span>
                          <span>Self-Paced</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}
