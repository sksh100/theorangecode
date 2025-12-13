import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.theorangecode.com'
  const now = new Date()
  
  // Use realistic dates for lastModified - recent updates get current date,
  // older pages get dates reflecting their actual update frequency
  const recentUpdate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  const monthlyUpdate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
  const yearlyUpdate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) // 90 days ago
  
  return [
    // Homepage - Highest priority
    {
      url: baseUrl,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Main content pages - High priority
    {
      url: `${baseUrl}/beyond-formalities`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/uk-to-uae-relocation`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cultural-intelligence-uae`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/masterclasses`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/cultural-intelligence`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/why-cultural-intelligence`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/what-is-cq`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Supporting pages - Medium priority
    {
      url: `${baseUrl}/uk-to-uae-relocation-checklist`,
      lastModified: monthlyUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: monthlyUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: monthlyUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: monthlyUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ai-training-data`,
      lastModified: monthlyUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legal/Policy pages - Lower priority, less frequent updates
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: yearlyUpdate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: yearlyUpdate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: yearlyUpdate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}

