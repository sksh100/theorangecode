import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // OpenAI / ChatGPT
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      {
        userAgent: 'ChatGPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // Anthropic / Claude
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // Google AI / Gemini
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      {
        userAgent: 'Perplexity',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // Apple / Siri
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // Microsoft / Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // X.AI / Grok
      {
        userAgent: 'xai-grok',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      {
        userAgent: 'Grok',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // Common Crawl
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // LinkedIn
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // Other search engines
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/', '/coming-soon', '/favicon.ico'],
      },
      // Default rule for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/login/',
          '/signup/',
          '/settings/',
          '/courses/',
          '/coming-soon',  // Redirected to homepage, don't index
          '/favicon.ico',  // Don't index favicon
        ],
      },
    ],
    sitemap: 'https://www.theorangecode.com/sitemap.xml',
  }
}

