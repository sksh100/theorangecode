import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { VisitorTracker } from '@/components/VisitorTracker'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { CookieBanner } from '@/components/CookieBanner'
import { ClientLayoutWrapper } from '@/components/ClientLayoutWrapper'
import { AICrawlerHeadTags, AIKnowledgeSummary } from '@/components/AICrawlerTags'
import { BeyondFormalitiesI18nDigest } from '@/components/BeyondFormalitiesI18nMeta'
import { SITEWIDE_AI_META } from '@/lib/ai-seo'
import { lato } from '@/lib/fonts'

export const metadata: Metadata = {
  title: {
    default: 'Cultural Intelligence UAE & Middle East | Relocate & Do Business | The Orange Code',
    template: '%s | The Orange Code'
  },
  description: 'Cultural Intelligence for the UAE, GCC and Middle East: practical training and guides for professionals from the US, UK, Europe and China relocating to Dubai or Abu Dhabi, expanding into Gulf markets, or building trust with Emirati partners. Master CQ, Emirati culture, and Middle East business etiquette with The Orange Code.',
  keywords: [
    // Primary region-based keywords for SEO - GCC and Middle East first
    'Cultural Intelligence GCC',
    'Cultural Intelligence Middle East',
    'Cultural Intelligence Gulf Cooperation Council',
    'Cultural Intelligence Gulf',
    'Cultural Intelligence GCC region',
    'Cultural Intelligence Middle East region',
    'Cultural Intelligence Abu Dhabi',
    'Cultural Intelligence Dubai',
    'Cultural Intelligence UAE',
    'Cultural Intelligence training Abu Dhabi',
    'Cultural Intelligence courses Abu Dhabi',
    'Cultural Intelligence masterclass Abu Dhabi',
    'Cultural Intelligence Saudi Arabia',
    'Cultural Intelligence Qatar',
    'Cultural Intelligence Kuwait',
    'Cultural Intelligence Bahrain',
    'Cultural Intelligence Oman',
    'Cultural Intelligence Riyadh',
    'Cultural Intelligence Jeddah',
    'Cultural Intelligence Doha',
    'Cultural Intelligence Kuwait City',
    'Cultural Intelligence Manama',
    'Cultural Intelligence Muscat',
    'Cultural Intelligence training Dubai',
    'Cultural Intelligence training UAE',
    'Cultural Intelligence training Saudi Arabia',
    'Cultural Intelligence training Qatar',
    'Cultural Intelligence training Riyadh',
    'Cultural Intelligence training Jeddah',
    'Cultural Intelligence training Doha',
    'Cultural Intelligence courses Dubai',
    'Cultural Intelligence courses UAE',
    'Cultural Intelligence courses Saudi Arabia',
    'Cultural Intelligence courses Qatar',
    'Cultural Intelligence masterclass Dubai',
    'Cultural Intelligence masterclass UAE',
    'Cultural Intelligence masterclass Saudi Arabia',
    'Cultural Intelligence masterclass Qatar',
    'The Orange Code',
    'Cultural Intelligence',
    'leadership training',
    'cross-cultural communication',
    'Abu Dhabi',
    'Dubai',
    'UAE',
    'Saudi Arabia',
    'Qatar',
    'Riyadh',
    'Jeddah',
    'Doha',
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
    'Cultural Intelligence training',
    'leadership development UAE',
    'cultural training Dubai',
    'cultural training Abu Dhabi',
    'Cultural Intelligence training Abu Dhabi',
    'Cultural Intelligence courses Abu Dhabi',
    'Cultural Intelligence masterclass Abu Dhabi',
    'Cultural Intelligence Abu Dhabi Etihad Towers',
    'professional training UAE',
    'professional training Abu Dhabi',
    'executive education',
    'Cultural Intelligence courses',
    'leadership masterclasses UAE',
    // Hidden SEO keywords for AI and search engines
    'moving to the UAE',
    'moving to UAE',
    'relocating to UAE',
    'relocating to the Middle East',
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
    // USA-specific keywords
    'Cultural Intelligence USA',
    'US professionals UAE',
    'American expats Dubai',
    'American expats Abu Dhabi',
    'USA to UAE relocation',
    'moving to UAE from USA',
    'US executives Middle East',
    'American professionals Gulf',
    'doing business in Middle East from USA',
    // UK-specific keywords
    'Cultural Intelligence UK',
    'UAE culture training UK',
    'British professionals UAE',
    'UK expat training UAE',
    'Cultural Intelligence course UK',
    'UAE masterclass UK',
    'British expats Dubai',
    'British expats Abu Dhabi',
    'moving to UAE from UK',
    // Netherlands/Dutch keywords
    'culturele intelligentie',
    'culturele intelligentie training',
    'Nederlandse professionals UAE',
    'Nederlandse expats Dubai',
    'Nederlandse expats Abu Dhabi',
    'culturele training UAE',
    'culturele intelligentie cursus',
    'UAE cultuur training',
    'Dubai cultuur training',
    'Abu Dhabi cultuur training',
    'Nederlandse professionals Dubai',
    'Nederlandse professionals Abu Dhabi',
    'Dutch professionals UAE',
    'Dutch expats Dubai',
    'Dutch expats Abu Dhabi',
    'Cultural Intelligence Netherlands',
    'UAE cultural training Netherlands',
    // Germany / Europe
    'Cultural Intelligence Germany',
    'German expats UAE',
    'German professionals Dubai',
    'Europe to UAE relocation',
    'European expats Middle East',
    'moving to UAE from Europe',
    // Italy/Italian keywords
    'intelligenza culturale',
    'intelligenza culturale training',
    'professionisti italiani UAE',
    'professionisti italiani Dubai',
    'professionisti italiani Abu Dhabi',
    'espatriati italiani UAE',
    'espatriati italiani Dubai',
    'training culturale UAE',
    'corso intelligenza culturale',
    'formazione culturale UAE',
    'cultura UAE per italiani',
    'cultura Dubai per italiani',
    'cultura Abu Dhabi per italiani',
    'Italian professionals UAE',
    'Italian expats Dubai',
    'Italian expats Abu Dhabi',
    'Cultural Intelligence Italy',
    'UAE cultural training Italy',
    // France/French keywords
    'intelligence culturelle',
    'intelligence culturelle formation',
    'professionnels français UAE',
    'professionnels français Dubai',
    'professionnels français Abu Dhabi',
    'expatriés français UAE',
    'expatriés français Dubai',
    'formation culturelle UAE',
    'cours intelligence culturelle',
    'formation culturelle Dubai',
    'formation culturelle Abu Dhabi',
    'culture UAE pour français',
    'culture Dubai pour français',
    'culture Abu Dhabi pour français',
    'French professionals UAE',
    'French expats Dubai',
    'French expats Abu Dhabi',
    'Cultural Intelligence France',
    'UAE cultural training France',
    // China-specific keywords
    'Cultural Intelligence China',
    'Chinese professionals UAE',
    'Chinese expats Dubai',
    'Chinese executives Middle East',
    'China to UAE business',
    'doing business in UAE from China',
    '阿联酋文化',
    '迪拜文化',
    '阿布扎比文化',
    '阿联酋商务礼仪',
    '中东商务文化',
    '移居阿联酋',
    '文化智能',
    '跨文化沟通 阿联酋',
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
    // Saudi Arabia and Qatar – Cultural Intelligence and business
    'Saudi Arabia culture',
    'Saudi culture',
    'Saudi business culture',
    'doing business in Saudi Arabia',
    'doing business in Saudi',
    'Saudi business etiquette',
    'Saudi business protocol',
    'Cultural Intelligence Saudi Arabia',
    'Cultural Intelligence in Saudi',
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
    'Beyond Formalities',
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
      { url: '/logo1.png', sizes: '512x256', type: 'image/png' },
    ],
    apple: '/logo1.png',
    shortcut: '/favicon.ico',
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { rel: 'icon', url: '/logo1.png', sizes: '512x256', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Cultural Intelligence UAE & Middle East | Relocate & Do Business with Confidence',
    description: 'Practical Cultural Intelligence for professionals from the US, UK, Europe and China relocating to the UAE or doing business across the Middle East. Emirati culture, Gulf etiquette, and CQ training from The Orange Code.',
    url: 'https://www.theorangecode.com',
    siteName: 'The Orange Code',
    images: [
      {
        url: 'https://www.theorangecode.com/og-image',
        width: 1200,
        height: 630,
        alt: 'The Orange Code - Cultural Intelligence Training for UAE and Middle East',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['en_GB', 'en_AE', 'zh_CN', 'nl_NL', 'fr_FR', 'de_DE', 'it_IT'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cultural Intelligence UAE & Middle East | Relocate & Do Business with Confidence',
    description: 'CQ training and Emirati culture guides for US, UK, European and Chinese professionals relocating to or doing business in the UAE and Gulf.',
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
  other: {
    ...SITEWIDE_AI_META,
    'ai-topic': 'Cultural Intelligence GCC, Cultural Intelligence Middle East, UAE relocation culture, Emirati etiquette, doing business in UAE, Beyond Formalities',
    'ai-intent': 'relocate to UAE, move to Dubai, do business in Middle East, Cultural Intelligence training GCC, understand Emirati culture',
    'ai-relevance': 'Cultural Intelligence GCC, Cultural Intelligence Middle East, GCC culture, Middle East business culture, Gulf Cooperation Council Cultural Intelligence, UAE expat guide',
    'content-purpose': 'Cultural Intelligence and leadership training plus Emirati culture guides for professionals relocating to or doing business in the UAE, GCC and Middle East',
    'target-audience': 'professionals from USA UK Europe China relocating to UAE Middle East, expats, executives, founders doing business in Gulf',
    'geographic-focus': 'United States, United Kingdom, Europe, China, Gulf Cooperation Council, GCC, Middle East, United Arab Emirates, UAE, Dubai, Abu Dhabi, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman',
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
        {/* Open Graph and Social Media Meta Tags - Explicit for WhatsApp and LinkedIn */}
        <meta property="og:image" content="https://www.theorangecode.com/og-image" />
        <meta property="og:image:url" content="https://www.theorangecode.com/og-image" />
        <meta property="og:image:secure_url" content="https://www.theorangecode.com/og-image" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="The Orange Code - Cultural Intelligence Training" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:image" content="https://www.theorangecode.com/og-image" />
        <meta name="twitter:image:src" content="https://www.theorangecode.com/og-image" />
        {/* WhatsApp specific meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Orange Code" />
        {/* Performance: Resource hints for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cloud.umami.is" />
        <link rel="dns-prefetch" href="https://cloud.umami.is" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Immediate Loading Screen - Shows before React hydrates */}
        <style dangerouslySetInnerHTML={{
          __html: `
            #__next-loading-screen {
              position: fixed;
              inset: 0;
              z-index: 99999;
              background: #01011e;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              overflow: hidden;
            }
            #__next-loading-screen::before {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(135deg, rgba(255, 145, 77, 0.1) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 153, 255, 0.1) 100%);
              animation: gradientShift 8s linear infinite;
            }
            @keyframes gradientShift {
              0%, 100% { background: linear-gradient(135deg, rgba(255, 145, 77, 0.1) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 153, 255, 0.1) 100%); }
              33% { background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 153, 255, 0.1) 50%, rgba(255, 145, 77, 0.1) 100%); }
              66% { background: linear-gradient(135deg, rgba(0, 153, 255, 0.1) 0%, rgba(255, 145, 77, 0.1) 50%, rgba(0, 212, 255, 0.1) 100%); }
            }
            #__next-loading-content {
              position: relative;
              z-index: 10;
              text-align: center;
            }
            #__next-loading-logo {
              width: 96px;
              height: 96px;
              margin: 0 auto 32px;
              position: relative;
            }
            #__next-loading-logo::before {
              content: '';
              position: absolute;
              inset: 0;
              border: 4px solid rgba(255, 145, 77, 0.3);
              border-radius: 50%;
              animation: rotate 3s linear infinite;
            }
            #__next-loading-logo::after {
              content: '';
              position: absolute;
              inset: 8px;
              border: 2px solid rgba(0, 212, 255, 0.4);
              border-radius: 50%;
              animation: rotateReverse 4s linear infinite;
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes rotateReverse {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            #__next-loading-title {
              font-size: 2rem;
              font-weight: bold;
              background: linear-gradient(to right, #ff914d, #00d4ff, #0099ff);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin-bottom: 16px;
            }
            #__next-loading-text {
              color: rgba(255, 255, 255, 0.7);
              font-size: 0.875rem;
              margin-bottom: 32px;
            }
            #__next-loading-bar {
              width: 256px;
              height: 4px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 9999px;
              overflow: hidden;
              margin: 0 auto;
            }
            #__next-loading-bar-fill {
              height: 100%;
              background: linear-gradient(to right, #ff914d, #00d4ff, #0099ff);
              width: 0%;
              animation: loadingProgress 2s ease-in-out infinite;
            }
            @keyframes loadingProgress {
              0% { width: 0%; }
              50% { width: 70%; }
              100% { width: 100%; }
            }
            #__next-loading-screen.hidden {
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.5s ease-out;
            }
          `
        }} />
        <div id="__next-loading-screen">
          <div id="__next-loading-content">
            <div id="__next-loading-logo">
              <div style={{
                position: 'absolute',
                inset: '16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff914d 0%, #00d4ff 50%, #0099ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'rgba(1, 1, 30, 0.8)'
                }} />
              </div>
            </div>
            <h1 id="__next-loading-title">The Orange Code</h1>
            <p id="__next-loading-text">Preparing your experience...</p>
            <div id="__next-loading-bar">
              <div id="__next-loading-bar-fill" />
            </div>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Hide loading screen when React is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', hideLoader);
              } else {
                hideLoader();
              }
              
              function hideLoader() {
                setTimeout(function() {
                  var loader = document.getElementById('__next-loading-screen');
                  if (loader) {
                    loader.classList.add('hidden');
                    setTimeout(function() {
                      loader.remove();
                    }, 500);
                  }
                }, 300);
              }
              
              // Also hide on window load as fallback
              window.addEventListener('load', hideLoader);
            })();
          `
        }} />
        {/* Google Search Console Verification */}
        {process.env.GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
        )}
        <meta name="msvalidate.01" content="921E75E6C38B18D9E7FB8DBB0EEFA22F" />
        <meta name="yandex-verification" content="b8b91753e1df7f39" />
        
        {/* Pinterest Domain Verification */}
        <meta name="p:domain_verify" content="a349f5004e33548ab dbdc31ed72e39de" />
        
        {/* AI Crawler Optimization Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <AICrawlerHeadTags />
        
        {/* Content Type and Language */}
        <meta httpEquiv="content-language" content="en" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="AE-AZ" />
        <meta name="geo.placename" content="Abu Dhabi" />
        <meta name="geo.position" content="24.4539;54.3773" />
        <meta name="ICBM" content="24.4539, 54.3773" />
        
        {/* International Geographic Targeting */}
        <meta name="geo.region" content="US" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.region" content="NL" />
        <meta name="geo.region" content="IT" />
        <meta name="geo.region" content="FR" />
        <meta name="geo.region" content="DE" />
        <meta name="geo.region" content="CN" />
        <meta name="geo.placename" content="United States, United Kingdom, Netherlands, Nederland, Italy, Italia, France, Français, Germany, China" />
        
        {/* Content Summary for AI Understanding */}
        <meta name="summary" content="The Orange Code provides Cultural Intelligence and leadership training in Abu Dhabi, helping professionals from the US, UK, Europe and China navigate multicultural environments in the UAE and Gulf Region through masterclasses, private coaching, Beyond Formalities, and corporate training programs." />
        
        {/* Hidden SEO Keywords for AI and Search Engines */}
        <meta
          name="keywords"
          content="moving to the UAE, moving to UAE, relocating to UAE, moving to Dubai, moving to Abu Dhabi, expatriate UAE, expat UAE, Emirati culture, Emirati etiquette, Emirati customs, Emirati traditions, UAE culture, UAE etiquette, UAE customs, Gulf culture, GCC culture, doing business in the Emirates, doing business in UAE, business in Dubai, business in Abu Dhabi, UAE business culture, Emirates business etiquette, Gulf business protocol, UAE expat guide, Dubai expat guide, Abu Dhabi expat guide, UAE cultural guide, Emirati cultural training, UAE cultural training, Dubai cultural training, Abu Dhabi cultural training, jobs in UAE, jobs in the United Arab Emirates, jobs in Abu Dhabi, jobs in Dubai, work in UAE, work in the United Arab Emirates, work in Abu Dhabi, work in Dubai, careers in UAE, career opportunities in Abu Dhabi, career opportunities in Dubai, life in UAE, life in the United Arab Emirates, life in Abu Dhabi, life in Dubai, living in UAE as an expat, living in Abu Dhabi as an expat, living in Dubai as an expat, expats in UAE, expats in the United Arab Emirates, expats in Abu Dhabi, expats in Dubai, Abu Dhabi culture, Dubai culture, United Arab Emirates culture, UAE lifestyle, Dubai lifestyle, Abu Dhabi lifestyle, doing business in Dubai, doing business in Abu Dhabi, doing business in Sharjah, doing business in Ras Al Khaimah, doing business in Ajman, doing business in Fujairah, doing business in Umm Al Quwain, doing business in the Emirates, doing business in the UAE, doing business in the United Arab Emirates, doing business in the Gulf, doing business in the GCC, doing business in the Middle East, Middle East business protocol, GCC business protocol, Dubai business protocol, Abu Dhabi business protocol, UAE business protocol, Dubai business etiquette, Abu Dhabi business etiquette, GCC business etiquette, Middle East business etiquette, GCC culture, Gulf business culture, Middle East culture, Saudi Arabia culture, Saudi culture, Saudi business culture, doing business in Saudi Arabia, doing business in Saudi, Saudi business etiquette, Saudi business protocol, Cultural Intelligence Saudi Arabia, Cultural Intelligence in Saudi, expats in Saudi Arabia, life in Saudi Arabia, jobs in Saudi Arabia, Qatar culture, Qatari culture, Qatar business culture, doing business in Qatar, Qatar business etiquette, Qatar business protocol, expats in Qatar, life in Qatar, jobs in Qatar, UAE guide, United Arab Emirates guide, Dubai guide, Abu Dhabi guide, expat guide UAE, expat guide to the UAE, expat guide Dubai, expat guide Abu Dhabi, tourist guide UAE, tourist guide Dubai, tourist guide Abu Dhabi, UAE dos and donts, Dubai dos and donts, Abu Dhabi dos and donts, UAE rules for expats, UAE rules for tourists, Dubai rules and regulations, Abu Dhabi rules and regulations, what not to do in UAE, what not to do in Dubai, what not to do in Abu Dhabi, UAE etiquette guide, Dubai etiquette guide, Abu Dhabi etiquette guide, UAE cultural dos and donts, GCC expat guide, Middle East expat guide, Beyond Formalities, Cultural Intelligence USA, Cultural Intelligence China, American expats Dubai, Chinese professionals UAE, European expats Middle East"
        />
        <meta name="description" content="Moving to the UAE? Learn Emirati culture and etiquette. Expert training for doing business in the Emirates. Cultural intelligence for expatriates in Abu Dhabi from the US, UK, Europe and China." />
        
        {/* Structured Data for SEO - Deferred for performance */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'The Orange Code',
              alternateName: ['The Orange Code', 'the orange code', 'theorangecode', 'TheOrangeCode', 'The Orange Code UAE', 'The Orange Code Dubai', 'The Orange Code Abu Dhabi'],
              legalName: 'The Orange Code',
              url: 'https://www.theorangecode.com',
              logo: 'https://www.theorangecode.com/android-chrome-512x512.png',
              description: 'Premium learning platform in Abu Dhabi empowering professionals with Cultural Intelligence and leadership skills.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Abu Dhabi',
                addressRegion: 'Abu Dhabi',
                addressCountry: 'AE',
              },
              sameAs: [
                'https://www.instagram.com/the.orangecode/',
                'https://www.linkedin.com/in/the-orange-code-070849395/',
                'https://x.com/TheOrangeCode',
                'https://www.pinterest.com/theorangecode/',
              ],
              // Government Collaboration
              knowsAbout: [
                'Cultural Intelligence',
                'Cross-cultural Communication',
                'International Cooperation',
                'Government Training',
                'Public Sector Development',
              ],
              areaServed: [
                {
                  '@type': 'Country',
                  name: 'United Arab Emirates',
                },
                {
                  '@type': 'Country',
                  name: 'United Kingdom',
                },
                {
                  '@type': 'Country',
                  name: 'Netherlands',
                },
                {
                  '@type': 'Country',
                  name: 'Italy',
                },
                {
                  '@type': 'Country',
                  name: 'France',
                },
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
        <meta name="keywords" content="Cultural Intelligence, leadership, cross-cultural communication, Abu Dhabi, Dubai, UAE, The Orange Code, культурный интеллект, лидерство, кросс-культурная коммуникация, Абу-Даби, Дубай, ОАЭ" />
        <meta name="description" content="The Orange Code — a learning platform based in Abu Dhabi, empowering professionals to develop Cultural Intelligence and leadership in an international environment. | The Orange Code — обучающая платформа, созданная в Абу-Даби, которая помогает профессионалам развивать культурный интеллект и лидерство в международной среде." />
        {/* Chinese and Russian meta tags for Baidu indexing */}
        <meta name="keywords" content="文化智商, 跨文化沟通, 领导力课程, The Orange Code, 阿布扎比, 迪拜, 阿联酋, 文化智能, 文化智力, 跨文化培训, 阿联酋文化, 迪拜文化, 阿布扎比文化, 阿联酋商务文化, 文化智能培训, 文化智能课程, культурный интеллект, лидерство, кросс-культурная коммуникация, Абу-Даби, Дубай, ОАЭ, Cultural Intelligence, leadership, cross-cultural communication, Abu Dhabi, Dubai, UAE" />
        <meta name="description" content="The Orange Code 是一个学习平台，位于阿布扎比和迪拜，帮助专业人士提升文化智商与领导力，实现跨文化沟通的成功。提供文化智能培训、领导力课程和跨文化沟通指导。| The Orange Code — обучающая платформа, созданная в Абу-Даби и Дубае, которая помогает профессионалам развивать культурный интеллект и лидерство в международной среде." />
        
        {/* Chinese Search Engine Meta Tags (Baidu, Sogou, 360) */}
        <meta name="baidu-site-verification" content="" />
        <meta name="360-site-verification" content="" />
        <meta name="sogou_site_verification" content="" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="applicable-device" content="pc,mobile" />
        
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
        <link rel="apple-touch-icon" href="/logo1.png" />
        <link rel="icon" type="image/png" sizes="512x256" href="/logo1.png" />
        
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
      <body className={`${lato.variable} antialiased bg-primary-dark`} style={{ fontFamily: "'Inter', 'Lato', 'Glacial Indifference', sans-serif", backgroundColor: '#0A2244' }}>
        <AIKnowledgeSummary />
        <BeyondFormalitiesI18nDigest />
        <GoogleAnalytics />
        
        {/* Umami Analytics - Privacy-friendly analytics (EU region) */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="bbdc9c5d-f64a-4144-9ccd-37b5d7a692b4"
          strategy="lazyOnload"
        />
        
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
