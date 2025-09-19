'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function DevNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <>
      {/* Dev Toggle Button */}
      <motion.button
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-orange/20 hover:bg-orange/30 border border-orange/30 rounded-full p-3 backdrop-blur-[10px] transition-all duration-300 group"
        title="Development Navigation"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          {isOpen ? (
            <span className="text-orange text-lg">×</span>
          ) : (
            <span className="text-orange text-lg">⚙️</span>
          )}
        </div>
      </motion.button>

      {/* Dev Navigation Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 z-50 bg-secondary-dark/90 border border-orange/30 rounded-2xl p-4 backdrop-blur-[20px] shadow-glow-orange min-w-[200px]"
        >
          <div className="text-center mb-3">
            <div className="w-2 h-2 bg-orange rounded-full animate-pulse mx-auto mb-2"></div>
            <span className="text-xs text-orange font-semibold uppercase tracking-wider">DEV MODE</span>
          </div>
          
          <div className="space-y-2">
            <a
              href="/dev-home"
              className="block w-full text-left px-3 py-2 text-sm text-white hover:text-orange hover:bg-orange/10 rounded-lg transition-all duration-200"
            >
              🏠 Real Homepage
            </a>
            <a
              href="/admin"
              className="block w-full text-left px-3 py-2 text-sm text-white hover:text-azure-blue hover:bg-azure-blue/10 rounded-lg transition-all duration-200"
            >
              📊 Admin Dashboard
            </a>
            <div className="border-t border-white/10 my-2"></div>
            <div className="text-xs text-white/50 px-3">
              Build your real homepage here
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
