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

export const metadata: Metadata = buildMetadata({
  title: 'eBay Store Management, Listings & Order Support',
  description:
    'eBay store management for sellers: item specifics, listing optimization, dispatch and tracking, buyer messages and returns. Free consultation.',
  path: '/ebay',
})

export default function EbayPage() {
  const profile = getMarketplace('ebay')
  if (!profile) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'eBay', path: '/ebay' },
            ]),
            serviceSchema({
              name: 'eBay Store Management',
              description: profile.summary,
              path: '/ebay',
            }),
            faqSchema(faqsFor('/ebay'))
          ),
        }}
      />
      <MarketplacePage profile={profile} />
    </>
  )
}
