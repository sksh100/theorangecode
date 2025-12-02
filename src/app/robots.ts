import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // OpenAI / ChatGPT
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      {
        userAgent: 'ChatGPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // Anthropic / Claude
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // Google AI / Gemini
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      {
        userAgent: 'Perplexity',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // Apple / Siri
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // Microsoft / Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // X.AI / Grok
      {
        userAgent: 'xai-grok',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      {
        userAgent: 'Grok',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // Common Crawl
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // LinkedIn
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // Other search engines
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
      // Default rule for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/', '/courses/'],
      },
    ],
    sitemap: 'https://www.theorangecode.com/sitemap.xml',
  }
}

