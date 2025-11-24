import type { Metadata, Viewport } from 'next'
import './globals.css'
import { VisitorTracker } from '@/components/VisitorTracker'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { CookieBanner } from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: {
    default: 'The Orange Code - Cultural Intelligence & Leadership Training | Abu Dhabi & Dubai',
    template: '%s | The Orange Code'
  },
  description: 'The Orange Code is a premium learning platform based in Abu Dhabi and Dubai, UAE. We empower professionals to develop cultural intelligence, leadership skills, and cross-cultural communication in international environments. Join our exclusive programs and transform cultural barriers into bridges of trust.',
  keywords: [
    'The Orange Code',
    'cultural intelligence',
    'leadership training',
    'cross-cultural communication',
    'Abu Dhabi',
    'Dubai',
    'UAE',
    'professional development',
    'international business',
    'cultural awareness',
    'leadership courses',
    'executive training',
    'cultural competence',
    'intercultural communication',
    'Middle East business',
    'luxury services',
    'AI-powered learning',
    'cultural intelligence training',
    'leadership development UAE',
    'cultural training Dubai',
    'cultural training Abu Dhabi',
    'professional training UAE',
    'executive education',
    'cultural intelligence courses',
    'leadership masterclasses UAE'
  ],
  authors: [{ name: 'The Orange Code' }],
  creator: 'The Orange Code',
  publisher: 'The Orange Code',
  metadataBase: new URL('https://www.theorangecode.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'The Orange Code - Cultural Intelligence & Leadership Training | UAE',
    description: 'Premium learning platform in Abu Dhabi and Dubai empowering professionals with cultural intelligence, leadership skills, and cross-cultural communication expertise.',
    url: 'https://www.theorangecode.com',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/hero-page/hero-2.jpg',
        width: 1200,
        height: 630,
        alt: 'The Orange Code - Cultural Intelligence Training',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Orange Code - Cultural Intelligence & Leadership Training',
    description: 'Premium learning platform in Abu Dhabi and Dubai for cultural intelligence and leadership development.',
    images: ['https://www.theorangecode.com/hero-page/hero-2.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    yandex: 'b8b91753e1df7f39',
    other: {
      'msvalidate.01': '921E75E6C38B18D9E7FB8DBB0EEFA22F',
    },
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
        {/* Google Search Console Verification */}
        {process.env.GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
        )}
        <meta name="msvalidate.01" content="921E75E6C38B18D9E7FB8DBB0EEFA22F" />
        <meta name="yandex-verification" content="b8b91753e1df7f39" />
        
        {/* Structured Data for SEO - Deferred for performance */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'The Orange Code',
              url: 'https://www.theorangecode.com',
              logo: 'https://www.theorangecode.com/android-chrome-512x512.png',
              description: 'Premium learning platform in Abu Dhabi and Dubai empowering professionals with cultural intelligence and leadership skills.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Abu Dhabi',
                addressRegion: 'Abu Dhabi',
                addressCountry: 'AE',
              },
              sameAs: [
                // Add your social media profiles here when available
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                areaServed: 'AE',
                availableLanguage: ['en', 'ar'],
              },
            }),
          }}
          defer
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'The Orange Code',
              description: 'Cultural intelligence and leadership training masterclasses in Abu Dhabi and Dubai, UAE.',
              url: 'https://www.theorangecode.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Abu Dhabi',
                addressRegion: 'Abu Dhabi',
                addressCountry: 'AE',
              },
              areaServed: {
                '@type': 'Country',
                name: 'United Arab Emirates',
              },
            }),
          }}
          defer
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'The Orange Code',
              url: 'https://www.theorangecode.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.theorangecode.com/?s={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
          defer
        />
        
        {/* Bilingual SEO Meta Tags for Yandex (Russian/English) */}
        <meta name="keywords" content="cultural intelligence, leadership, cross-cultural communication, Abu Dhabi, Dubai, UAE, The Orange Code, культурный интеллект, лидерство, кросс-культурная коммуникация, Абу-Даби, Дубай, ОАЭ" />
        <meta name="description" content="The Orange Code — a learning platform based in Abu Dhabi and Dubai, empowering professionals to develop cultural intelligence and leadership in an international environment. | The Orange Code — обучающая платформа, созданная в Абу-Даби и Дубае, которая помогает профессионалам развивать культурный интеллект и лидерство в международной среде." />
        {/* Chinese and Russian meta tags for Baidu indexing */}
        <meta name="keywords" content="文化智商, 跨文化沟通, 领导力课程, The Orange Code, 阿布扎比, 迪拜, 阿联酋, культурный интеллект, лидерство, кросс-культурная коммуникация, Абу-Даби, Дубай, ОАЭ, cultural intelligence, leadership, cross-cultural communication, Abu Dhabi, Dubai, UAE" />
        <meta name="description" content="The Orange Code 是一个学习平台，位于阿布扎比和迪拜，帮助专业人士提升文化智商与领导力，实现跨文化沟通的成功。| The Orange Code — обучающая платформа, созданная в Абу-Даби и Дубае, которая помогает профессионалам развивать культурный интеллект и лидерство в международной среде." />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        
        {/* Favicon Links */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A2244" />
        
        {/* Google Search Organization Logo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com",
              "logo": "https://www.theorangecode.com/android-chrome-512x512.png",
              "sameAs": [
                "https://www.instagram.com/the.orangecode"
              ]
            })
          }}
          defer
        />
      </head>
      <body style={{ fontFamily: "'Inter', 'Glacial Indifference', sans-serif" }} className="antialiased">
        <GoogleAnalytics />
        {children}
        <VisitorTracker />
        <CookieBanner />
      </body>
    </html>
  )
}
