import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cultural Intelligence Course | The Orange Code',
  description: 'Cultural Intelligence Course - Access your learning modules and track your progress.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function CulturalIntelligenceCourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

