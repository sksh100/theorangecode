'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'inline' | 'minimal'
  message?: string
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'inline',
  message,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-2 border-transparent`}
          style={{
            borderTopColor: '#ff914d',
            borderRightColor: '#00d4ff',
            borderBottomColor: '#0099ff',
            borderLeftColor: 'transparent',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    )
  }

  if (variant === 'full') {
    return (
      <div className={`fixed inset-0 z-[9999] bg-primary-dark flex items-center justify-center overflow-hidden ${className}`}>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 145, 77, 0.1) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 153, 255, 0.1) 100%)',
            }}
            animate={{
              background: [
                'linear-gradient(135deg, rgba(255, 145, 77, 0.1) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 153, 255, 0.1) 100%)',
                'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 153, 255, 0.1) 50%, rgba(255, 145, 77, 0.1) 100%)',
                'linear-gradient(135deg, rgba(0, 153, 255, 0.1) 0%, rgba(255, 145, 77, 0.1) 50%, rgba(0, 212, 255, 0.1) 100%)',
                'linear-gradient(135deg, rgba(255, 145, 77, 0.1) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 153, 255, 0.1) 100%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <LoadingSpinnerContent size={size} message={message} />
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <LoadingSpinnerContent size={size} message={message} />
    </div>
  )
}

function LoadingSpinnerContent({ size, message }: { size: string, message?: string }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  return (
    <>
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`relative ${sizeClasses[size as keyof typeof sizeClasses]}`}>
          {/* Outer Glow Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: 'rgba(255, 145, 77, 0.3)' }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />
          
          {/* Middle Ring */}
          <motion.div
            className="absolute inset-1 rounded-full border-2"
            style={{ borderColor: 'rgba(0, 212, 255, 0.4)' }}
            animate={{
              rotate: -360,
              scale: [1, 0.9, 1],
            }}
            transition={{
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              },
              scale: {
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              },
            }}
          />
          
          {/* Inner Core */}
          <div 
            className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #ff914d 0%, #00d4ff 50%, #0099ff 100%)',
            }}
          >
            <motion.div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: 'rgba(1, 1, 30, 0.8)' }}
              animate={{
                scale: [1, 0.95, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </motion.div>

      {message && (
        <motion.p
          className="text-white/70 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}

      {/* Loading Dots */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: 'linear-gradient(to right, #ff914d, #00d4ff)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </>
  )
}

