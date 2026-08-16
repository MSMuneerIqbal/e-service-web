import type { Metadata } from 'next'
import { site, hasContactChannels } from '@/content/site'
import { absoluteUrl } from './utils'

/**
 * SEO helpers — specs.md §10
 *
 * Rules encoded here rather than left to each page:
 *  - Every indexable page gets a unique title, description and self-canonical
 *  - Gated routes (empty case studies / blog) set noindex
 *  - Organization schema is emitted ONLY when the business has a verifiable
 *    contact point. Constitution §22.4 forbids fabricated structured data, and
 *    an Organization record with no way to reach it is exactly that.
 *  - No aggregateRating, no Review, no Offer, no foundingDate, no award.
 */

/** Absolute URL against the configured site origin. */
export function absoluteUrlFor(path: string): string {
  return absoluteUrl(path, site.baseUrl)
}

interface BuildMetadataArgs {
  title: string
  description: string
  path: string
  /** Set true for routes with no content yet (specs.md §5.5, §5.7) */
  noindex?: boolean
}

export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path, site.baseUrl)

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.businessName,
      type: 'website',
      locale: site.locale,
      images: [
        {
          // A real file in public/ rather than a dynamic ImageResponse route.
          // Dynamic image routes emit nothing under `output: 'export'`, which
          // left the favicon and social preview 404ing on static hosting.
          // Regenerate with scripts/build-og.md if the branding changes.
          url: absoluteUrl('/og.png', site.baseUrl),
          width: 1200,
          height: 630,
          alt: `${site.businessName} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

type Json = Record<string, unknown>

/**
 * Organization. Returns null while no contact channel exists — emitting an
 * Organization with no contactPoint and no sameAs would be structured data
 * asserting more than we can support (Constitution §22.4).
 */
export function organizationSchema(): Json | null {
  if (!hasContactChannels && site.social.length === 0) return null

  const schema: Json = {
    '@type': 'Organization',
    '@id': `${site.baseUrl}/#organization`,
    name: site.businessName,
    url: site.baseUrl,
    description: site.tagline,
  }

  if (site.social.length > 0) {
    schema.sameAs = site.social.map((s) => s.href)
  }

  const email = site.contact.find((c) => c.event === 'email_click')
  const phone = site.contact.find((c) => c.event === 'phone_click')

  if (email || phone) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      ...(email ? { email: email.value } : {}),
      ...(phone ? { telephone: phone.value } : {}),
    }
  }

  return schema
}

export function websiteSchema(): Json {
  // No SearchAction — the site has no search (specs.md §10.3).
  return {
    '@type': 'WebSite',
    '@id': `${site.baseUrl}/#website`,
    name: site.businessName,
    url: site.baseUrl,
    description: site.tagline,
    inLanguage: site.language,
  }
}

/** No `offers` — pricing is unconfirmed, and inventing one would be fabrication. */
export function serviceSchema(args: {
  name: string
  description: string
  path: string
}): Json {
  return {
    '@type': 'Service',
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.path, site.baseUrl),
    provider: {
      '@type': 'Organization',
      name: site.businessName,
      url: site.baseUrl,
    },
  }
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[]
): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path, site.baseUrl),
    })),
  }
}

/** Markup must match the visible FAQ exactly (specs.md §10.3). */
export function faqSchema(items: { question: string; answer: string }[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/** Wraps one or more schema nodes into a single @graph document. */
export function jsonLd(...nodes: (Json | null)[]): string {
  const graph = nodes.filter((n): n is Json => n !== null)
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}
