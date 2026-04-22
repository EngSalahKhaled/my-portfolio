import { MetadataRoute } from 'next'

// Replace with your actual domain when deployed
const SITE_URL = 'https://salahkhaled.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
