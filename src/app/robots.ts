import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  // No disallow rules: the site is fully static and has no API routes or
  // private paths. Pages that should stay out of the index (empty case
  // studies, empty blog, unreviewed legal pages) carry their own noindex and
  // are excluded from the sitemap, which is the more reliable signal.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${site.baseUrl}/sitemap.xml`,
  }
}
