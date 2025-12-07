'use client'

import { Component, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * ErrorBoundary component
 * Catches JavaScript errors anywhere in the child component tree
 * Prevents white screens by showing a fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Report to error tracking
    if (typeof window !== 'undefined') {
      fetch('/api/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          url: window.location.href,
        }),
      }).catch(() => {
        // Silently fail if error reporting fails
      })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-primary-dark text-white flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="glass-card p-8">
              <AlertTriangle className="w-16 h-16 text-orange mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Something went wrong</h2>
              <p className="text-white/70 mb-6">
                We encountered an error. Please try refreshing the page.
              </p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  onClick={() => window.location.reload()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-orange rounded-xl text-white font-semibold flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Refresh Page
                </motion.button>
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/10 rounded-xl text-white font-semibold flex items-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Go Home
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}
