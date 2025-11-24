'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FileText, X, BookOpen } from 'lucide-react'

interface ResourcesMegaDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function ResourcesMegaDropdown({ isOpen, onClose }: ResourcesMegaDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed top-20 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          
          {/* Mega Dropdown */}
          <motion.div
            className="fixed top-20 left-4 right-4 w-auto max-w-md z-[55]"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="mega-dropdown-glass rounded-3xl overflow-hidden border border-white/10">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Resources</h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                </div>

                {/* Ebook Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10">
                    {/* Image Placeholder */}
                    <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-orange/20 to-azure-blue/20 flex items-center justify-center">
                      <div className="text-center">
                        <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
                        <div className="w-32 h-40 bg-white/5 rounded-lg mx-auto border-2 border-dashed border-white/20" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-orange" />
                        <h4 className="text-lg font-bold text-white">Ebook Coming Soon</h4>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">
                        We're preparing exclusive cultural intelligence resources for you. Stay tuned for updates!
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

