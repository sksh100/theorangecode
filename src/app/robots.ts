import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // OpenAI / ChatGPT
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'ChatGPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // Anthropic / Claude
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // Google AI / Gemini
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'Perplexity',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // Apple / Siri
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // Microsoft / Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // X.AI / Grok
      {
        userAgent: 'xai-grok',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'Grok',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // Common Crawl
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // LinkedIn
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // Other search engines
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      // Default rule for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
    ],
    sitemap: 'https://www.theorangecode.com/sitemap.xml',
  }
}

