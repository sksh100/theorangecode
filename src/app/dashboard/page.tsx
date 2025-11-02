'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { ModernFooter } from '@/components/ModernFooter'
import { BookOpen, User, Settings, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
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
                    Welcome back! Continue your learning journey.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Courses Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
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
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}

