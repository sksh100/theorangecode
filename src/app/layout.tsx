import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Orange Code - Coming Soon',
  description: 'The Orange Code - Premium AI-powered luxury services coming soon. Register your interest for our exclusive event on Thursday, October 9, 2025.',
  keywords: ['luxury', 'ai', 'coming-soon', 'glass-morphism', 'futuristic'],
  authors: [{ name: 'The Orange Code' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/flavicon/favicon.ico' },
      { url: '/flavicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/flavicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: ['/apple-touch-icon.png', '/flavicon/apple-touch-icon.png'],
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
      { rel: 'android-chrome', url: '/flavicon/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/flavicon/android-chrome-512x512.png', sizes: '512x512' },
    ],
    shortcut: ['/favicon.ico', '/flavicon/favicon.ico'],
  },
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
  themeColor: '#01011e',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', 'Glacial Indifference', sans-serif" }} className="antialiased">
        {children}
      </body>
    </html>
  )
}
