import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
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
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
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
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/login/', '/signup/', '/settings/'],
      },
    ],
    sitemap: 'https://www.theorangecode.com/sitemap.xml',
  }
}

