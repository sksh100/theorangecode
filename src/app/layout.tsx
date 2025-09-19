import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Your Luxury Agent - Coming Soon',
  description: 'Your Luxury Agent - Premium AI-powered luxury services coming soon. Register your interest for our exclusive event on Thursday, October 9, 2025.',
  keywords: ['luxury', 'ai', 'coming-soon', 'glass-morphism', 'futuristic'],
  authors: [{ name: 'Your Luxury Agent' }],
  openGraph: {
    title: 'Your Luxury Agent - Coming Soon',
    description: 'Experience the future of luxury with AI-powered precision',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Luxury Agent - Coming Soon',
    description: 'Experience the future of luxury with AI-powered precision',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-montserrat antialiased">
        {children}
      </body>
    </html>
  )
}
