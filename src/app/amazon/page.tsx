import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MarketplacePage } from '@/components/marketing/MarketplacePage'
import { getMarketplace } from '@/content/marketplaces'
import { faqsFor } from '@/content/faqs'
import {
  buildMetadata,
  jsonLd,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from '@/lib/seo'

/**
 * Amazon page.
 *
 * NAMING RULE (specs.md §2.1): the phrase "A to Z" must never appear on this
 * page. An Amazon seller reads it as buyer-claim handling, which is not a
 * service offered here. The umbrella offering is called "Complete Store
 * Management" throughout.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Amazon Store Management, Listings & Order Support',
  description:
    'Amazon seller support: catalog accuracy, detail page content, inventory and order handling, and account health monitoring. Free consultation.',
  path: '/amazon',
})

export default function AmazonPage() {
  const profile = getMarketplace('amazon')
  if (!profile) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Amazon', path: '/amazon' },
            ]),
            serviceSchema({
              name: 'Amazon Store Management',
              description: profile.summary,
              path: '/amazon',
            }),
            faqSchema(faqsFor('/amazon'))
          ),
        }}
      />
      <MarketplacePage profile={profile} />
    </>
  )
}
