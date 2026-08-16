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
  title: 'TikTok Shop Management, Listings & Order Support',
  description:
    'TikTok Shop seller support: product setup and approval, listing content, order fulfilment within platform deadlines, and buyer messaging. Free consultation.',
  path: '/tiktok-shop',
})

export default function TikTokShopPage() {
  const profile = getMarketplace('tiktok-shop')
  if (!profile) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'TikTok Shop', path: '/tiktok-shop' },
            ]),
            serviceSchema({
              name: 'TikTok Shop Management',
              description: profile.summary,
              path: '/tiktok-shop',
            }),
            faqSchema(faqsFor('/tiktok-shop'))
          ),
        }}
      />
      <MarketplacePage profile={profile} />
    </>
  )
}
