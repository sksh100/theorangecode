'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function DevHomePage() {
  const [isVisible, setIsVisible] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen bg-dark-blue flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-white/70">This page is not available in production.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-blue text-white font-montserrat">
      {/* Development Header */}
      <div className="bg-secondary-dark border-b border-azure-blue/30 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-orange rounded-full animate-pulse"></div>
            <span className="text-sm text-orange font-semibold">DEVELOPMENT MODE</span>
          </div>
          <div className="flex gap-4">
            <a 
              href="/" 
              className="text-azure-blue hover:text-azure-luminous transition-colors text-sm"
            >
              ← Back to Coming Soon
            </a>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="bg-azure-blue/20 hover:bg-azure-blue/30 text-azure-blue px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {isVisible ? 'Hide' : 'Show'} Content
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-luminous bg-clip-text text-transparent">
            Your Luxury Agent
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Welcome to the development version of your real home page. 
            This is where we'll build the complete luxury experience.
          </p>
        </motion.div>

        {/* Development Sections */}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Hero Section Placeholder */}
            <div className="bg-secondary-dark/50 border border-azure-blue/30 rounded-2xl p-6 backdrop-blur-[10px]">
              <div className="w-12 h-12 bg-gradient-azure rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-azure-luminous mb-2">Hero Section</h3>
              <p className="text-white/70 text-sm">
                Main landing area with luxury branding and call-to-action
              </p>
            </div>

            {/* Services Section Placeholder */}
            <div className="bg-secondary-dark/50 border border-orange-transparent rounded-2xl p-6 backdrop-blur-[10px]">
              <div className="w-12 h-12 bg-gradient-orange rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-orange mb-2">Services</h3>
              <p className="text-white/70 text-sm">
                Premium luxury services and AI-powered solutions
              </p>
            </div>

            {/* About Section Placeholder */}
            <div className="bg-secondary-dark/50 border border-bright-blue-transparent rounded-2xl p-6 backdrop-blur-[10px]">
              <div className="w-12 h-12 bg-gradient-bright-blue rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="text-xl font-semibold text-bright-blue mb-2">About</h3>
              <p className="text-white/70 text-sm">
                Your story and luxury expertise showcase
              </p>
            </div>

            {/* Portfolio Section Placeholder */}
            <div className="bg-secondary-dark/50 border border-azure-blue/30 rounded-2xl p-6 backdrop-blur-[10px]">
              <div className="w-12 h-12 bg-gradient-azure rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-azure-luminous mb-2">Portfolio</h3>
              <p className="text-white/70 text-sm">
                Showcase of luxury projects and achievements
              </p>
            </div>

            {/* Contact Section Placeholder */}
            <div className="bg-secondary-dark/50 border border-orange-transparent rounded-2xl p-6 backdrop-blur-[10px]">
              <div className="w-12 h-12 bg-gradient-orange rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold text-orange mb-2">Contact</h3>
              <p className="text-white/70 text-sm">
                Luxury consultation and booking system
              </p>
            </div>

            {/* Blog Section Placeholder */}
            <div className="bg-secondary-dark/50 border border-bright-blue-transparent rounded-2xl p-6 backdrop-blur-[10px]">
              <div className="w-12 h-12 bg-gradient-bright-blue rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-bright-blue mb-2">Blog</h3>
              <p className="text-white/70 text-sm">
                Luxury insights and industry expertise
              </p>
            </div>
          </motion.div>
        )}

        {/* Development Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-secondary-dark/30 border border-azure-blue/20 rounded-2xl p-6 backdrop-blur-[10px]"
        >
          <h3 className="text-lg font-semibold text-azure-luminous mb-4">Development Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
            <div>
              <h4 className="font-semibold text-white mb-2">Current Status:</h4>
              <ul className="space-y-1">
                <li>• Coming Soon page: ✅ Complete</li>
                <li>• Form system: ✅ Complete</li>
                <li>• Brand colors: ✅ Complete</li>
                <li>• Real homepage: 🚧 In Development</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Next Steps:</h4>
              <ul className="space-y-1">
                <li>• Design hero section</li>
                <li>• Create services showcase</li>
                <li>• Build portfolio gallery</li>
                <li>• Add contact system</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
