import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
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

