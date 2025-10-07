import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://smartstudy.me'
  
  return [
    {
      url: baseUrl,
      lastModified: "2025-10-07T21:08:52.029Z",
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: "2025-10-07T21:08:52.029Z",
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]
}