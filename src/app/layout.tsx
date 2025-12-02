import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { VisitorTracker } from '@/components/VisitorTracker'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { CookieBanner } from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: {
    default: 'The Orange Code - Cultural Intelligence & Leadership Training | Abu Dhabi',
    template: '%s | The Orange Code'
  },
  description: 'The Orange Code is a premium learning platform based in Abu Dhabi, UAE. We empower professionals moving to the UAE to develop cultural intelligence, understand Emirati culture and etiquette, and master doing business in the Emirates. Join our exclusive programs and transform cultural barriers into bridges of trust.',
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
    'leadership masterclasses UAE',
    // Hidden SEO keywords for AI and search engines
    'moving to the UAE',
    'moving to UAE',
    'relocating to UAE',
    'moving to Dubai',
    'moving to Abu Dhabi',
    'expatriate UAE',
    'expat UAE',
    'Emirati culture',
    'Emirati etiquette',
    'Emirati customs',
    'Emirati traditions',
    'UAE culture',
    'UAE etiquette',
    'UAE customs',
    'Gulf culture',
    'GCC culture',
    'doing business in the Emirates',
    'doing business in UAE',
    'business in Dubai',
    'business in Abu Dhabi',
    'UAE business culture',
    'Emirates business etiquette',
    'Gulf business protocol',
    'UAE expat guide',
    'Dubai expat guide',
    'Abu Dhabi expat guide',
    'UAE cultural guide',
    'Emirati cultural training',
    'UAE cultural training',
    'Dubai cultural training',
    'Abu Dhabi cultural training',
    // Jobs, life and expat queries (UAE, Abu Dhabi, Dubai)
    'jobs in UAE',
    'jobs in the United Arab Emirates',
    'jobs in Abu Dhabi',
    'jobs in Dubai',
    'work in UAE',
    'work in the United Arab Emirates',
    'work in Abu Dhabi',
    'work in Dubai',
    'careers in UAE',
    'career opportunities in Abu Dhabi',
    'career opportunities in Dubai',
    'life in UAE',
    'life in the United Arab Emirates',
    'life in Abu Dhabi',
    'life in Dubai',
    'living in UAE as an expat',
    'living in Abu Dhabi as an expat',
    'living in Dubai as an expat',
    'expats in UAE',
    'expats in the United Arab Emirates',
    'expats in Abu Dhabi',
    'expats in Dubai',
    'Abu Dhabi culture',
    'Dubai culture',
    'United Arab Emirates culture',
    'UAE lifestyle',
    'Dubai lifestyle',
    'Abu Dhabi lifestyle',
    // GCC, Middle East and Saudi / Qatar / regional business & culture
    'doing business in Dubai',
    'doing business in Abu Dhabi',
    'doing business in Sharjah',
    'doing business in Ras Al Khaimah',
    'doing business in Ajman',
    'doing business in Fujairah',
    'doing business in Umm Al Quwain',
    'doing business in the Emirates',
    'doing business in the UAE',
    'doing business in the United Arab Emirates',
    'doing business in the Gulf',
    'doing business in the GCC',
    'doing business in the Middle East',
    'Middle East business protocol',
    'GCC business protocol',
    'Dubai business protocol',
    'Abu Dhabi business protocol',
    'UAE business protocol',
    'Dubai business etiquette',
    'Abu Dhabi business etiquette',
    'GCC business etiquette',
    'Middle East business etiquette',
    'GCC culture',
    'Gulf business culture',
    'Middle East culture',
    // Saudi Arabia and Qatar – cultural intelligence and business
    'Saudi Arabia culture',
    'Saudi culture',
    'Saudi business culture',
    'doing business in Saudi Arabia',
    'doing business in Saudi',
    'Saudi business etiquette',
    'Saudi business protocol',
    'cultural intelligence Saudi Arabia',
    'cultural intelligence in Saudi',
    'expats in Saudi Arabia',
    'life in Saudi Arabia',
    'jobs in Saudi Arabia',
    'Qatar culture',
    'Qatari culture',
    'Qatar business culture',
    'doing business in Qatar',
    'Qatar business etiquette',
    'Qatar business protocol',
    'expats in Qatar',
    'life in Qatar',
    'jobs in Qatar',
    // Guides, rules, do's and don'ts for visitors and expats
    'UAE guide',
    'United Arab Emirates guide',
    'Dubai guide',
    'Abu Dhabi guide',
    'expat guide UAE',
    'expat guide to the UAE',
    'expat guide Dubai',
    'expat guide Abu Dhabi',
    'tourist guide UAE',
    'tourist guide Dubai',
    'tourist guide Abu Dhabi',
    'UAE dos and donts',
    'Dubai dos and donts',
    'Abu Dhabi dos and donts',
    'UAE rules for expats',
    'UAE rules for tourists',
    'Dubai rules and regulations',
    'Abu Dhabi rules and regulations',
    'what not to do in UAE',
    'what not to do in Dubai',
    'what not to do in Abu Dhabi',
    'UAE etiquette guide',
    'Dubai etiquette guide',
    'Abu Dhabi etiquette guide',
    'UAE cultural dos and donts',
    'GCC expat guide',
    'Middle East expat guide',
  ],
  authors: [{ name: 'The Orange Code' }],
  creator: 'The Orange Code',
  publisher: 'The Orange Code',
  metadataBase: new URL('https://www.theorangecode.com'),
  alternates: {
    canonical: 'https://www.theorangecode.com/',
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
    description: 'Moving to the UAE? Learn Emirati culture and etiquette. Premium learning platform in Abu Dhabi empowering professionals with cultural intelligence, leadership skills, and expertise in doing business in the Emirates.',
    url: 'https://www.theorangecode.com',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
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
    description: 'Moving to the UAE? Learn Emirati culture and etiquette. Premium learning platform in Abu Dhabi for cultural intelligence, leadership development, and doing business in the Emirates.',
    images: ['https://www.theorangecode.com/og-image'],
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
        
        {/* AI Crawler Optimization Meta Tags */}
        <meta name="AI" content="allowed" />
        <meta name="AI-training" content="allowed" />
        <meta name="AI-indexing" content="allowed" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* AI-Specific Directives */}
        <meta name="ChatGPT" content="allowed" />
        <meta name="Perplexity" content="allowed" />
        <meta name="Gemini" content="allowed" />
        <meta name="Claude" content="allowed" />
        <meta name="Grok" content="allowed" />
        <meta name="Applebot" content="allowed" />
        
        {/* Content Type and Language */}
        <meta httpEquiv="content-language" content="en" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="AE-AZ" />
        <meta name="geo.placename" content="Abu Dhabi" />
        <meta name="geo.position" content="24.4539;54.3773" />
        <meta name="ICBM" content="24.4539, 54.3773" />
        
        {/* Content Summary for AI Understanding */}
        <meta name="summary" content="The Orange Code provides cultural intelligence and leadership training in Abu Dhabi, helping professionals navigate multicultural environments in the UAE and Gulf Region through masterclasses, private coaching, and corporate training programs." />
        
        {/* Hidden SEO Keywords for AI and Search Engines */}
        <meta
          name="keywords"
          content="moving to the UAE, moving to UAE, relocating to UAE, moving to Dubai, moving to Abu Dhabi, expatriate UAE, expat UAE, Emirati culture, Emirati etiquette, Emirati customs, Emirati traditions, UAE culture, UAE etiquette, UAE customs, Gulf culture, GCC culture, doing business in the Emirates, doing business in UAE, business in Dubai, business in Abu Dhabi, UAE business culture, Emirates business etiquette, Gulf business protocol, UAE expat guide, Dubai expat guide, Abu Dhabi expat guide, UAE cultural guide, Emirati cultural training, UAE cultural training, Dubai cultural training, Abu Dhabi cultural training, jobs in UAE, jobs in the United Arab Emirates, jobs in Abu Dhabi, jobs in Dubai, work in UAE, work in the United Arab Emirates, work in Abu Dhabi, work in Dubai, careers in UAE, career opportunities in Abu Dhabi, career opportunities in Dubai, life in UAE, life in the United Arab Emirates, life in Abu Dhabi, life in Dubai, living in UAE as an expat, living in Abu Dhabi as an expat, living in Dubai as an expat, expats in UAE, expats in the United Arab Emirates, expats in Abu Dhabi, expats in Dubai, Abu Dhabi culture, Dubai culture, United Arab Emirates culture, UAE lifestyle, Dubai lifestyle, Abu Dhabi lifestyle, doing business in Dubai, doing business in Abu Dhabi, doing business in Sharjah, doing business in Ras Al Khaimah, doing business in Ajman, doing business in Fujairah, doing business in Umm Al Quwain, doing business in the Emirates, doing business in the UAE, doing business in the United Arab Emirates, doing business in the Gulf, doing business in the GCC, doing business in the Middle East, Middle East business protocol, GCC business protocol, Dubai business protocol, Abu Dhabi business protocol, UAE business protocol, Dubai business etiquette, Abu Dhabi business etiquette, GCC business etiquette, Middle East business etiquette, GCC culture, Gulf business culture, Middle East culture, Saudi Arabia culture, Saudi culture, Saudi business culture, doing business in Saudi Arabia, doing business in Saudi, Saudi business etiquette, Saudi business protocol, cultural intelligence Saudi Arabia, cultural intelligence in Saudi, expats in Saudi Arabia, life in Saudi Arabia, jobs in Saudi Arabia, Qatar culture, Qatari culture, Qatar business culture, doing business in Qatar, Qatar business etiquette, Qatar business protocol, expats in Qatar, life in Qatar, jobs in Qatar, UAE guide, United Arab Emirates guide, Dubai guide, Abu Dhabi guide, expat guide UAE, expat guide to the UAE, expat guide Dubai, expat guide Abu Dhabi, tourist guide UAE, tourist guide Dubai, tourist guide Abu Dhabi, UAE dos and donts, Dubai dos and donts, Abu Dhabi dos and donts, UAE rules for expats, UAE rules for tourists, Dubai rules and regulations, Abu Dhabi rules and regulations, what not to do in UAE, what not to do in Dubai, what not to do in Abu Dhabi, UAE etiquette guide, Dubai etiquette guide, Abu Dhabi etiquette guide, UAE cultural dos and donts, GCC expat guide, Middle East expat guide"
        />
        <meta name="description" content="Moving to the UAE? Learn Emirati culture and etiquette. Expert training for doing business in the Emirates. Cultural intelligence for expatriates in Abu Dhabi." />
        
        {/* Structured Data for SEO - Deferred for performance */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'The Orange Code',
              alternateName: ['theorangecode', 'the orange code'],
              url: 'https://www.theorangecode.com',
              logo: 'https://www.theorangecode.com/android-chrome-512x512.png',
              description: 'Premium learning platform in Abu Dhabi empowering professionals with cultural intelligence and leadership skills.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Abu Dhabi',
                addressRegion: 'Abu Dhabi',
                addressCountry: 'AE',
              },
              sameAs: [
                'https://www.instagram.com/the.orangecode',
              ],
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
              description: 'Cultural intelligence and leadership training masterclasses in Abu Dhabi, UAE.',
              url: 'https://www.theorangecode.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Etihad Towers, Tower 3, Floor 36',
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
        
        {/* Course/Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Cultural Intelligence Training',
              provider: {
                '@type': 'Organization',
                name: 'The Orange Code',
              },
              areaServed: {
                '@type': 'Country',
                name: 'United Arab Emirates',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Training Programs',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Course',
                      name: 'Cultural Intelligence Masterclass',
                      description: '3-hour masterclass covering cultural foundations, communication styles, and business protocols for the UAE and Gulf Region.',
                      courseCode: 'CI-MASTERCLASS',
                      educationalLevel: 'Professional Development',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Course',
                      name: 'Private Coaching Session',
                      description: 'One-on-one personalized coaching sessions tailored to individual needs and goals.',
                      courseCode: 'PRIVATE-COACHING',
                      educationalLevel: 'Professional Development',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Course',
                      name: 'Corporate Training',
                      description: 'Customized corporate training programs for teams and organizations operating in the UAE and Gulf Region.',
                      courseCode: 'CORPORATE-TRAINING',
                      educationalLevel: 'Professional Development',
                    },
                  },
                ],
              },
            }),
          }}
          defer
        />
        
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.theorangecode.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Masterclasses',
                  item: 'https://www.theorangecode.com/masterclasses',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'About',
                  item: 'https://www.theorangecode.com/about',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'FAQ',
                  item: 'https://www.theorangecode.com/faq',
                },
              ],
            }),
          }}
          defer
        />
        
        {/* Aggregate Rating Schema for Testimonials */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'The Orange Code',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                reviewCount: '9',
                bestRating: '5',
                worstRating: '5',
              },
            }),
          }}
          defer
        />
        
        {/* LocalBusiness Schema for Google Business Profile */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.theorangecode.com/#localbusiness',
              name: 'The Orange Code',
              image: 'https://www.theorangecode.com/logo1.png',
              url: 'https://www.theorangecode.com',
              telephone: '+971568786106',
              email: 'hello@theorangecode.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Etihad Towers, Tower 3, Floor 36',
                addressLocality: 'Abu Dhabi',
                addressRegion: 'Abu Dhabi',
                postalCode: '',
                addressCountry: 'AE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 24.4539,
                longitude: 54.3773,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                ],
                opens: '09:00',
                closes: '18:00',
              },
              priceRange: '$$',
              servesCuisine: null,
              areaServed: {
                '@type': 'Country',
                name: 'United Arab Emirates',
              },
              sameAs: [
                'https://www.instagram.com/the.orangecode',
              ],
            }),
          }}
          defer
        />
        
        {/* Individual Review Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'Review',
                  author: {
                    '@type': 'Person',
                    name: 'Sophie Turner',
                  },
                  reviewBody: 'I signed up for the first masterclass of the culture code out of pure curiosity. I wanted to understand the culture I was living in and hoped to learn a few basics. The Cultural Foundations Masterclass and the Masterclass dedicated to Expatriates gave me so much more. I finally understood the values that shape life in the UAE and the meaning behind the way people communicate here.',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                    worstRating: '1',
                  },
                  itemReviewed: {
                    '@type': 'Course',
                    name: 'Cultural Intelligence Masterclass',
                    provider: {
                      '@type': 'Organization',
                      name: 'The Orange Code',
                      url: 'https://www.theorangecode.com'
                    },
                    courseCode: 'CI-MASTERCLASS',
                    educationalLevel: 'Professional Development'
                  },
                },
                {
                  '@type': 'Review',
                  author: {
                    '@type': 'Person',
                    name: 'David Mitchell',
                  },
                  reviewBody: 'As an American working in the Gulf, I thought being direct and transparent would always be seen as professional. I quickly learned that here it can come across very differently. The Masterclasses helped me understand the cultural expectations around communication, relationships, and respect in a way no book or YouTube video ever could.',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                    worstRating: '1',
                  },
                  itemReviewed: {
                    '@type': 'Course',
                    name: 'Cultural Intelligence Masterclass',
                    provider: {
                      '@type': 'Organization',
                      name: 'The Orange Code',
                      url: 'https://www.theorangecode.com'
                    },
                    courseCode: 'CI-MASTERCLASS',
                    educationalLevel: 'Professional Development'
                  },
                },
              ],
            }),
          }}
          defer
        />
        
        {/* Bilingual SEO Meta Tags for Yandex (Russian/English) */}
        <meta name="keywords" content="cultural intelligence, leadership, cross-cultural communication, Abu Dhabi, Dubai, UAE, The Orange Code, культурный интеллект, лидерство, кросс-культурная коммуникация, Абу-Даби, Дубай, ОАЭ" />
        <meta name="description" content="The Orange Code — a learning platform based in Abu Dhabi, empowering professionals to develop cultural intelligence and leadership in an international environment. | The Orange Code — обучающая платформа, созданная в Абу-Даби, которая помогает профессионалам развивать культурный интеллект и лидерство в международной среде." />
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
        
        {/* Umami Analytics - Privacy-friendly analytics (EU region) */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="bbdc9c5d-f64a-4144-9ccd-37b5d7a692b4"
          strategy="afterInteractive"
        />
        
        {children}
        <VisitorTracker />
        <CookieBanner />
      </body>
    </html>
  )
}
