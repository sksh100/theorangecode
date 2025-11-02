'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { ModernFooter } from '@/components/ModernFooter'
import { 
  Settings, 
  Lock, 
  Mail, 
  Bell, 
  Eye, 
  EyeOff, 
  Shield, 
  User, 
  Globe, 
  Trash2, 
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'security' | 'account' | 'notifications' | 'privacy'>('security')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [emailPreferences, setEmailPreferences] = useState({
    marketing: true,
    courseUpdates: true,
    communityUpdates: false,
    weeklyDigest: true
  })
  
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: false,
    sms: false
  })
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowDataSharing: false
  })

  const [saveSuccess, setSaveSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedEmailPrefs = localStorage.getItem('email-preferences')
    const savedNotificationPrefs = localStorage.getItem('notification-preferences')
    const savedPrivacySettings = localStorage.getItem('privacy-settings')
    
    if (savedEmailPrefs) {
      try {
        setEmailPreferences(JSON.parse(savedEmailPrefs))
      } catch (e) {
        console.error('Error loading email preferences:', e)
      }
    }
    
    if (savedNotificationPrefs) {
      try {
        setNotificationPreferences(JSON.parse(savedNotificationPrefs))
      } catch (e) {
        console.error('Error loading notification preferences:', e)
      }
    }
    
    if (savedPrivacySettings) {
      try {
        setPrivacySettings(JSON.parse(savedPrivacySettings))
      } catch (e) {
        console.error('Error loading privacy settings:', e)
      }
    }
  }, [])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const newErrors: Record<string, string> = {}
    
    // Clear previous errors
    setErrors({})
    
    // Validate old password
    if (!passwordData.oldPassword || passwordData.oldPassword.trim().length === 0) {
      newErrors.oldPassword = 'Current password is required'
    }
    
    // Validate new password
    if (!passwordData.newPassword || passwordData.newPassword.trim().length === 0) {
      newErrors.newPassword = 'New password is required'
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }
    
    // Validate confirm password
    if (!passwordData.confirmPassword || passwordData.confirmPassword.trim().length === 0) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    // Check if new password is different
    if (passwordData.oldPassword && passwordData.newPassword && 
        passwordData.oldPassword === passwordData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password'
    }
    
    // If there are errors, show them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    try {
      // Here you would normally send the password change request to your backend
      // For now, we'll simulate it
      console.log('Password change requested')
      
      // In production, call API:
      // const response = await fetch('/api/change-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     oldPassword: passwordData.oldPassword,
      //     newPassword: passwordData.newPassword
      //   })
      // })
      
      // Clear form and show success
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
      setErrors({})
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error: any) {
      console.error('Password change error:', error)
      setErrors({ submit: error.message || 'Failed to change password. Please try again.' })
    }
  }

  const handleSaveEmailPreferences = () => {
    localStorage.setItem('email-preferences', JSON.stringify(emailPreferences))
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleSaveNotificationPreferences = () => {
    localStorage.setItem('notification-preferences', JSON.stringify(notificationPreferences))
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleSavePrivacySettings = () => {
    localStorage.setItem('privacy-settings', JSON.stringify(privacySettings))
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('This will permanently delete all your data. Type DELETE to confirm.')) {
        // Here you would send delete account request to backend
        console.log('Account deletion requested')
        alert('Account deletion request has been submitted. You will receive a confirmation email.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Dashboard</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Settings Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="glass-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-primary">
                    Settings
                  </h1>
                  <p className="text-white/70">
                    Manage your account preferences and security settings
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-card p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'security'
                      ? 'bg-gradient-primary text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Security</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'account'
                      ? 'bg-gradient-primary text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Account</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'notifications'
                      ? 'bg-gradient-primary text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Notifications</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'privacy'
                      ? 'bg-gradient-primary text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">Privacy</span>
                </button>
              </div>
            </motion.div>

            {/* Settings Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              {/* Success Message */}
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card mb-6 p-4 bg-green-500/20 border border-green-500/40 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-green-400 font-medium">Settings saved successfully!</span>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="glass-card">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-azure-blue" />
                    Security Settings
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Change Password */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showOldPassword ? 'text' : 'password'}
                              value={passwordData.oldPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${
                                errors.oldPassword ? 'border-red-500/50' : 'border-white/20'
                              } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowOldPassword(!showOldPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                            >
                              {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          {errors.oldPassword && (
                            <p className="text-red-400 text-sm mt-1">{errors.oldPassword}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${
                                errors.newPassword ? 'border-red-500/50' : 'border-white/20'
                              } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                              placeholder="Enter new password (min. 8 characters)"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          {errors.newPassword && (
                            <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
                          )}
                          <p className="text-white/50 text-xs mt-1">
                            Password must be at least 8 characters long
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${
                                errors.confirmPassword ? 'border-red-500/50' : 'border-white/20'
                              } rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 transition-all`}
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePasswordChange}
                          className="px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-glow flex items-center gap-2"
                          style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                        >
                          <Lock className="w-5 h-5" />
                          Change Password
                        </motion.button>
                      </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="pt-6 border-t border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Forgot Password?</h3>
                      <p className="text-white/70 text-sm mb-4">
                        If you've forgotten your password, you can request a password reset link via email.
                      </p>
                      <Link href="/forgot-password">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-white/20 flex items-center gap-2"
                        >
                          <Mail className="w-5 h-5" />
                          Request Password Reset
                        </motion.button>
                      </Link>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="pt-6 border-t border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                      <p className="text-white/70 text-sm mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-white/20"
                      >
                        Enable 2FA
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="glass-card">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-azure-blue" />
                    Account Settings
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Email Preferences */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Email Preferences
                      </h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={emailPreferences.marketing}
                            onChange={(e) => setEmailPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Marketing Emails
                            </span>
                            <p className="text-white/60 text-sm mt-1">
                              Receive updates about new courses, features, and special offers
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={emailPreferences.courseUpdates}
                            onChange={(e) => setEmailPreferences(prev => ({ ...prev, courseUpdates: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Course Updates
                            </span>
                            <p className="text-white/60 text-sm mt-1">
                              Get notified about new modules and course content
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={emailPreferences.communityUpdates}
                            onChange={(e) => setEmailPreferences(prev => ({ ...prev, communityUpdates: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Community Updates
                            </span>
                            <p className="text-white/60 text-sm mt-1">
                              Stay updated about community events and discussions
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={emailPreferences.weeklyDigest}
                            onChange={(e) => setEmailPreferences(prev => ({ ...prev, weeklyDigest: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Weekly Digest
                            </span>
                            <p className="text-white/60 text-sm mt-1">
                              Receive a weekly summary of your progress and updates
                            </p>
                          </div>
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveEmailPreferences}
                        className="mt-4 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-glow flex items-center gap-2"
                        style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                      >
                        <Save className="w-5 h-5" />
                        Save Email Preferences
                      </motion.button>
                    </div>

                    {/* Delete Account */}
                    <div className="pt-6 border-t border-red-500/20">
                      <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
                      <p className="text-white/70 text-sm mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDeleteAccount}
                        className="px-6 py-3 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-semibold transition-all duration-300 hover:bg-red-500/30 flex items-center gap-2"
                      >
                        <Trash2 className="w-5 h-5" />
                        Delete Account
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="glass-card">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-azure-blue" />
                    Notification Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Notification Channels</h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={notificationPreferences.email}
                            onChange={(e) => setNotificationPreferences(prev => ({ ...prev, email: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Email Notifications
                            </span>
                            <p className="text-white/60 text-sm mt-1">
                              Receive notifications via email
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={notificationPreferences.push}
                            onChange={(e) => setNotificationPreferences(prev => ({ ...prev, push: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Push Notifications
                            </span>
                            <p className="text-white/60 text-sm mt-1">
                              Receive browser push notifications
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={notificationPreferences.sms}
                            onChange={(e) => setNotificationPreferences(prev => ({ ...prev, sms: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              SMS Notifications
                            </span>
                            <p className="text-white/60 text-sm mt-1">
                              Receive notifications via text message
                            </p>
                          </div>
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveNotificationPreferences}
                        className="mt-4 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-glow flex items-center gap-2"
                        style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                      >
                        <Save className="w-5 h-5" />
                        Save Notification Preferences
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="glass-card">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-azure-blue" />
                    Privacy Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Profile Visibility</h3>
                      
                      <div className="space-y-3 mb-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value="public"
                            checked={privacySettings.profileVisibility === 'public'}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value as any }))}
                            className="w-5 h-5 rounded-full border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div>
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Public
                            </span>
                            <p className="text-white/60 text-sm">Your profile is visible to everyone in the community</p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value="private"
                            checked={privacySettings.profileVisibility === 'private'}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value as any }))}
                            className="w-5 h-5 rounded-full border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div>
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Private
                            </span>
                            <p className="text-white/60 text-sm">Your profile is only visible to you</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={privacySettings.showEmail}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, showEmail: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Show Email Address
                            </span>
                            <p className="text-white/60 text-sm mt-1">
                              Allow others to see your email address on your profile
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={privacySettings.showPhone}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, showPhone: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                              Show Phone Number
                            </span>
                            <p className="text-white/60 text-sm mt-1">
                              Allow others to see your phone number on your profile
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Data & Analytics</h3>
                      
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={privacySettings.allowDataSharing}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowDataSharing: e.target.checked }))}
                          className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-azure-blue focus:ring-azure-blue/50 focus:ring-offset-0 cursor-pointer"
                        />
                        <div className="flex-1">
                          <span className="text-white font-medium group-hover:text-azure-blue transition-colors">
                            Allow Data Sharing for Analytics
                          </span>
                          <p className="text-white/60 text-sm mt-1">
                            Help us improve our platform by sharing anonymized usage data
                          </p>
                        </div>
                      </label>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSavePrivacySettings}
                      className="px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-glow flex items-center gap-2"
                      style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                    >
                      <Save className="w-5 h-5" />
                      Save Privacy Settings
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}

