import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Orange Code - Coming Soon',
  description: 'The Orange Code - Premium AI-powered luxury services coming soon. Register your interest for our exclusive event on Thursday, October 9, 2025.',
  keywords: ['luxury', 'ai', 'coming-soon', 'glass-morphism', 'futuristic'],
  authors: [{ name: 'The Orange Code' }],
  openGraph: {
    title: 'The Orange Code - Coming Soon',
    description: 'Experience the future of luxury with AI-powered precision',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Orange Code - Coming Soon',
    description: 'Experience the future of luxury with AI-powered precision',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Glacial+Indifference:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Glacial Indifference', sans-serif" }} className="antialiased">
        {children}
      </body>
    </html>
  )
}
