'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { ModernFooter } from '@/components/ModernFooter'
import { BookOpen, User, Settings, ArrowRight, Edit2, Save, Upload, Linkedin, Twitter, Facebook, Instagram, Globe, Users, ChevronRight, AlertCircle, CheckCircle2, TrendingUp, Play, Clock, Trophy, Award, Target, Calendar, Zap, Activity, BarChart3, Download, FileText, Sparkles, Flame, Star, Medal, Gift } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface UserProfile {
  firstName: string
  lastName: string
  company: string
  position: string
  countryOfResidency: string
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
    company: '',
    position: '',
    countryOfResidency: '',
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
  
  // Learning stats and activity
  const [learningStats, setLearningStats] = useState({
    modulesCompleted: 0,
    totalModules: 10,
    courseCompletion: 0,
    totalLearningTime: 0, // in minutes
    learningStreak: 0,
    lastAccessedModule: null as string | null,
    lastAccessedCourse: null as string | null,
  })
  const [recentActivity, setRecentActivity] = useState<Array<{
    type: 'module' | 'course' | 'achievement'
    title: string
    timestamp: number
    icon: string
  }>>([])
  const [achievements, setAchievements] = useState<Array<{
    id: string
    title: string
    description: string
    icon: string
    unlocked: boolean
    unlockedAt?: number
  }>>([
    { id: 'first-module', title: 'First Steps', description: 'Complete your first module', icon: '🎯', unlocked: false },
    { id: 'halfway', title: 'Halfway Hero', description: 'Complete 50% of the course', icon: '🎖️', unlocked: false },
    { id: 'week-streak', title: 'Consistent Learner', description: '7-day learning streak', icon: '🔥', unlocked: false },
    { id: 'completed', title: 'Master Achiever', description: 'Complete the entire course', icon: '🏆', unlocked: false },
  ])

  useEffect(() => {
    // Load learning stats from localStorage
    const progressData = localStorage.getItem('cultural-intelligence-progress')
    if (progressData) {
      try {
        const progress = JSON.parse(progressData)
        const completedModules = progress.completedModules || []
        const totalModules = 10
        const modulesCompleted = completedModules.length
        const courseCompletion = Math.round((modulesCompleted / totalModules) * 100)
        
        // Calculate learning time (estimate: 20 min per module on average)
        const totalLearningTime = modulesCompleted * 20
        
        // Get learning streak (simplified: check last 7 days)
        const lastActivity = localStorage.getItem('last-learning-activity')
        const streak = lastActivity ? calculateStreak(lastActivity) : 0
        
        // Get last accessed module
        const lastModule = localStorage.getItem('last-accessed-module')
        
        setLearningStats({
          modulesCompleted,
          totalModules,
          courseCompletion,
          totalLearningTime,
          learningStreak: streak,
          lastAccessedModule: lastModule,
          lastAccessedCourse: 'cultural-intelligence',
        })
      } catch (e) {
        console.error('Error loading learning stats:', e)
      }
    }
    
    // Load recent activity
    const activityData = localStorage.getItem('recent-activity')
    if (activityData) {
      try {
        setRecentActivity(JSON.parse(activityData))
      } catch (e) {
        console.error('Error loading recent activity:', e)
      }
    }
    
    // Check and unlock achievements
    checkAchievements()
  }, [profile, isEditing])

  const calculateStreak = (lastActivityDate: string): number => {
    const lastDate = new Date(lastActivityDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    lastDate.setHours(0, 0, 0, 0)
    
    const diffTime = today.getTime() - lastDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays === 0 ? 1 : 0 // Simplified: 1 if today, 0 otherwise
  }

  const checkAchievements = () => {
    const progressData = localStorage.getItem('cultural-intelligence-progress')
    if (progressData) {
      try {
        const progress = JSON.parse(progressData)
        const completedModules = (progress.completedModules || []).length
        const courseCompleted = progress.courseCompleted || false
        
        setAchievements(prev => prev.map(achievement => {
          let unlocked = achievement.unlocked
          
          if (achievement.id === 'first-module' && completedModules >= 1 && !unlocked) {
            unlocked = true
          } else if (achievement.id === 'halfway' && completedModules >= 5 && !unlocked) {
            unlocked = true
          } else if (achievement.id === 'completed' && courseCompleted && !unlocked) {
            unlocked = true
          }
          
          return {
            ...achievement,
            unlocked,
            unlockedAt: unlocked && !achievement.unlockedAt ? Date.now() : achievement.unlockedAt,
          }
        }))
      } catch (e) {
        console.error('Error checking achievements:', e)
      }
    }
  }

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

  const calculateProfileCompletion = () => {
    const essentialFields = [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'profilePhoto', label: 'Profile Photo' },
      { key: 'bio', label: 'Bio' },
      { key: 'company', label: 'Company' },
      { key: 'position', label: 'Position/Title' },
      { key: 'countryOfResidency', label: 'Country of Residency' },
    ]

    const completedFields = essentialFields.filter(field => {
      const value = profile[field.key as keyof UserProfile]
      return value !== null && value !== undefined && String(value).trim().length > 0
    })

    const completionPercentage = Math.round((completedFields.length / essentialFields.length) * 100)
    const missingFields = essentialFields.filter(field => {
      const value = profile[field.key as keyof UserProfile]
      return !value || value === null || value === undefined || String(value).trim().length === 0
    })

    return {
      percentage: completionPercentage,
      completedCount: completedFields.length,
      totalCount: essentialFields.length,
      missingFields: missingFields.map(f => f.label),
      isComplete: completionPercentage === 100
    }
  }

  const profileCompletion = calculateProfileCompletion()

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
            className="mb-6"
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

          {/* Profile Completion Banner - Compact - Only shows when incomplete */}
          {!profileCompletion.isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <div className="glass-card border border-azure-blue/50 bg-gradient-to-r from-azure-blue/10 to-transparent p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">
                        Complete Your Profile
                      </span>
                      <span className="text-xs font-bold text-azure-blue">
                        {profileCompletion.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${profileCompletion.percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-primary rounded-full"
                      />
                    </div>
                    {profileCompletion.missingFields.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {profileCompletion.missingFields.slice(0, 2).map((field, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-1.5 py-0.5 bg-white/10 rounded text-white/70"
                          >
                            {field}
                          </span>
                        ))}
                        {profileCompletion.missingFields.length > 2 && (
                          <span className="text-xs text-white/50">
                            +{profileCompletion.missingFields.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {!isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:shadow-glow flex items-center justify-center gap-1.5 whitespace-nowrap flex-shrink-0"
                      style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Profile & Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1 space-y-6"
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

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                        placeholder="Enter your company name"
                      />
                    </div>

                    {/* Position/Title */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Position / Title
                      </label>
                      <input
                        type="text"
                        value={profile.position}
                        onChange={(e) => setProfile(prev => ({ ...prev, position: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                        placeholder="Enter your position or job title"
                      />
                    </div>

                    {/* Country of Residency */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Country of Residency
                      </label>
                      <input
                        type="text"
                        value={profile.countryOfResidency}
                        onChange={(e) => setProfile(prev => ({ ...prev, countryOfResidency: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all"
                        placeholder="Enter your country of residency"
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

                    {(profile.company || profile.position || profile.countryOfResidency) && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Professional Info</h3>
                        {profile.position && (
                          <p className="text-white/80 mb-1">
                            {profile.position}
                          </p>
                        )}
                        {profile.company && (
                          <p className="text-white/70 text-sm mb-1">
                            {profile.company}
                          </p>
                        )}
                        {profile.countryOfResidency && (
                          <p className="text-white/70 text-sm">
                            {profile.countryOfResidency}
                          </p>
                        )}
                      </div>
                    )}

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

              {/* Settings Box - Placed under Profile */}
              <Link href="/settings">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card cursor-pointer group hover:border-azure-blue/50 transition-all duration-300 p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-azure-blue transition-colors">
                          Settings
                        </h3>
                        <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-azure-blue group-hover:translate-x-2 transition-all flex-shrink-0" />
                      </div>
                      <p className="text-white/70 text-sm mb-2 leading-relaxed">
                        Manage your account, security, notifications, and privacy settings.
                      </p>
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <span>Security</span>
                        <span className="text-white/30">•</span>
                        <span>Privacy</span>
                        <span className="text-white/30">•</span>
                        <span>Notifications</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Right Side - My Courses & Dashboard Features */}
            <div className="lg:col-span-3 space-y-6">
              {/* Courses Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
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
                          {learningStats.modulesCompleted > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-azure-blue font-semibold">
                                {learningStats.modulesCompleted} completed
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Statistics Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/60 mb-1">Modules</p>
                      <p className="text-xl font-bold text-white">
                        {learningStats.modulesCompleted}/{learningStats.totalModules}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/60 mb-1">Completion</p>
                      <p className="text-xl font-bold text-white">{learningStats.courseCompletion}%</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/60 mb-1">Time Spent</p>
                      <p className="text-xl font-bold text-white">{learningStats.totalLearningTime}m</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/60 mb-1">Streak</p>
                      <p className="text-xl font-bold text-white">{learningStats.learningStreak} days</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Continue Learning & Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Continue Learning */}
                {learningStats.lastAccessedModule && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Continue Learning</h3>
                      </div>
                      <p className="text-white/70 text-sm mb-4">
                        Pick up where you left off
                      </p>
                      <Link href={`/courses/cultural-intelligence/module/${learningStats.lastAccessedModule}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-4 py-3 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                          style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                        >
                          <Play className="w-5 h-5" />
                          Continue Module
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <Link href="/courses/cultural-intelligence">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex flex-col items-center gap-2"
                        >
                          <BookOpen className="w-5 h-5" />
                          <span className="text-xs font-medium">Courses</span>
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex flex-col items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        <span className="text-xs font-medium">Resources</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex flex-col items-center gap-2"
                      >
                        <Target className="w-5 h-5" />
                        <span className="text-xs font-medium">Goals</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Progress Overview & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Progress Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Progress Overview</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/80">Cultural Intelligence</span>
                          <span className="text-sm font-bold text-azure-blue">{learningStats.courseCompletion}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${learningStats.courseCompletion}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-gradient-primary rounded-full"
                          />
                        </div>
                        <p className="text-xs text-white/60 mt-1">
                          {learningStats.modulesCompleted} of {learningStats.totalModules} modules completed
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Achievement Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Achievements</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-3 rounded-xl border ${
                            achievement.unlocked
                              ? 'bg-green-500/10 border-green-500/40'
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <div className="text-2xl mb-1">{achievement.icon}</div>
                          <p className={`text-xs font-semibold mb-1 ${
                            achievement.unlocked ? 'text-white' : 'text-white/50'
                          }`}>
                            {achievement.title}
                          </p>
                          <p className={`text-xs ${
                            achievement.unlocked ? 'text-white/70' : 'text-white/40'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity & Recommended Next Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                    </div>
                    {recentActivity.length > 0 ? (
                      <div className="space-y-3">
                        {recentActivity.slice(0, 5).map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                              {activity.type === 'module' ? (
                                <Play className="w-4 h-4 text-white" />
                              ) : activity.type === 'course' ? (
                                <BookOpen className="w-4 h-4 text-white" />
                              ) : (
                                <Award className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white font-medium truncate">{activity.title}</p>
                              <p className="text-xs text-white/60">
                                {new Date(activity.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-white/60">No recent activity</p>
                    )}
                  </div>
                </motion.div>

                {/* Recommended Next Steps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Recommended Next</h3>
                    </div>
                    {learningStats.modulesCompleted < learningStats.totalModules ? (
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-white/5 border border-azure-blue/30">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                              <Play className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white">
                                Module {learningStats.modulesCompleted + 1}
                              </p>
                              <p className="text-xs text-white/60">
                                Continue your learning journey
                              </p>
                            </div>
                          </div>
                          <Link href="/courses/cultural-intelligence">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full mt-3 px-4 py-2 rounded-full text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                              style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                            >
                              Start Next Module
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-2">
                          <Trophy className="w-8 h-8 text-green-400" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white">
                              Course Completed! 🎉
                            </p>
                            <p className="text-xs text-white/60">
                              Great work! Consider exploring advanced courses.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Learning Goals & Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Learning Goals & Schedule</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Target className="w-5 h-5 text-azure-blue" />
                        <h4 className="text-sm font-semibold text-white">This Week's Goal</h4>
                      </div>
                      <p className="text-sm text-white/70 mb-2">
                        Complete {Math.min(3, learningStats.totalModules - learningStats.modulesCompleted)} modules
                      </p>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary rounded-full"
                          style={{ width: `${Math.min(100, (learningStats.modulesCompleted / learningStats.totalModules) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-azure-blue" />
                        <h4 className="text-sm font-semibold text-white">Study Schedule</h4>
                      </div>
                      <p className="text-sm text-white/70 mb-2">
                        Recommended: 2-3 modules per week
                      </p>
                      <p className="text-xs text-white/60">
                        Self-paced learning - study at your own pace
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}
