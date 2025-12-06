'use client'

import { ReactNode } from 'react'

interface PageHeadingProps {
  level: 'h1' | 'h2'
  children: ReactNode
  className?: string
}

export function PageHeading({ level, children, className = '' }: PageHeadingProps) {
  const baseH1Classes = 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-normal text-center w-full'
  const baseH2Classes = 'text-3xl md:text-5xl font-bold mb-6 text-center'

  // Merge custom className with base classes, removing duplicates
  const mergeClasses = (base: string, custom: string) => {
    if (!custom) return base
    return `${base} ${custom}`.trim()
  }

  if (level === 'h1') {
    return (
      <h1 className={mergeClasses(baseH1Classes, className)}>
        <span className="bg-gradient-to-r from-azure-blue via-orange to-azure-blue bg-clip-text text-transparent block lg:whitespace-nowrap text-center pt-2 pb-1">
          {children}
        </span>
      </h1>
    )
  }

  return (
    <h2 className={mergeClasses(baseH2Classes, className)}>
      <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
        {children}
      </span>
    </h2>
  )
}

