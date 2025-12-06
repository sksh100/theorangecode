'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  variant?: 'text' | 'card' | 'circle' | 'rect'
  width?: string | number
  height?: string | number
  className?: string
  count?: number
}

export function LoadingSkeleton({ 
  variant = 'rect',
  width,
  height,
  className = '',
  count = 1
}: LoadingSkeletonProps) {
  const baseClasses = 'bg-gradient-to-r from-white/10 via-white/5 to-white/10 bg-[length:200%_100%] rounded-lg'
  
  const variantClasses = {
    text: 'h-4',
    card: 'h-48',
    circle: 'rounded-full',
    rect: 'h-24'
  }

  const style: React.CSSProperties = {
    width: width || (variant === 'circle' ? height : '100%'),
    height: height || variantClasses[variant],
    animation: 'shimmer 2s infinite'
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          style={style}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        />
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  )
}

