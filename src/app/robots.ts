import { MetadataRoute } from 'next'
import { AI_CRAWLER_ALLOWLIST, AI_DISALLOWED_PATHS, SITE_URL } from '@/lib/ai-seo'

export default function robots(): MetadataRoute.Robots {
  const disallow = [...AI_DISALLOWED_PATHS]

  return {
    rules: [
      ...AI_CRAWLER_ALLOWLIST.map((userAgent) => ({
        userAgent,
        allow: '/' as const,
        disallow,
      })),
      // Default rule for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
