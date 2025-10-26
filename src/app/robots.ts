import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://smartstudy.me'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/blog',
          '/blog/*',
          '/login',
          '/sitemap.xml',
        ],
        disallow: [
          '/api/*',
          '/app/*',
          '/obrigado/*',
          '/billing/*',
          '/on-boarding/*',
          '/quiz/*',
          '/settings/*',
          '/_next/*',
          '/admin/*',
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
