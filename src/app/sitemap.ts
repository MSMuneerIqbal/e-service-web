import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { services } from '@/content/services'
import { marketplaces } from '@/content/marketplaces'
import { caseStudies } from '@/content/proof'
import { posts } from '@/content/blog'

/**
 * Sitemap — specs.md §10.4
 *
 * Gated routes exclude themselves automatically: /case-studies and /blog only
 * appear once they have content, and the legal pages stay out until they have
 * been reviewed. A sitemap that advertises empty pages is a quality signal
 * working against you.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const url = (path: string) => `${site.baseUrl}${path}`

  const entries: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    {
      url: url('/services'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: url('/contact'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: url('/about'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  for (const marketplace of marketplaces) {
    entries.push({
      url: url(`/${marketplace.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  }

  for (const service of services) {
    entries.push({
      url: url(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: service.kind === 'offering' ? 0.8 : 0.7,
    })
  }

  // Gated: only listed once real content exists.
  if (caseStudies.length > 0) {
    entries.push({
      url: url('/case-studies'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
    for (const item of caseStudies) {
      entries.push({
        url: url(`/case-studies/${item.slug}`),
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.6,
      })
    }
  }

  if (posts.length > 0) {
    entries.push({
      url: url('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
    for (const post of posts) {
      entries.push({
        url: url(`/blog/${post.slug}`),
        lastModified: new Date(post.updatedAt ?? post.publishedAt),
        changeFrequency: 'yearly',
        priority: 0.5,
      })
    }
  }

  return entries
}
