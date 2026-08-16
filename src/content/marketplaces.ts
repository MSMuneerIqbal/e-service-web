import type { MarketplaceProfile } from './types'

/**
 * Marketplace profiles — specs.md §2.3 and §3.4
 *
 * These three records exist to enforce one rule: no marketplace page may be a
 * find-and-replace variant of another (Constitution §22.2, §41). Each carries
 * its own platform vocabulary, its own workflow and its own audience framing.
 *
 * All three are EQUAL in status (specs.md §2.3). eBay is listed first because
 * it is the stated focus, not because of any track record. No copy here claims
 * tenure, volume, client counts or results on any platform.
 */

export const marketplaces: MarketplaceProfile[] = [
  /* ================================================================== */
  {
    id: 'ebay',
    name: 'eBay',
    shortName: 'eBay',
    slug: 'ebay',
    summary:
      'Listing structure, item specifics, order handling and buyer communication for eBay sellers.',
    heading: 'eBay Store Management, Listings & Order Support',
    intro:
      'eBay rewards sellers who get the unglamorous parts right: complete item specifics, listings that survive Best Match, dispatch inside the stated handling time, and buyer messages answered before a question becomes a case. We handle that layer so your store stays in good standing while it grows.',
    platformTerms: [
      {
        term: 'Item specifics',
        explanation:
          'The structured attribute fields eBay uses to understand what your product actually is. Incomplete specifics are one of the most common reasons a listing fails to appear in filtered searches, and one of the easiest things to fix.',
      },
      {
        term: 'Best Match',
        explanation:
          'eBay\'s default sort order. It weighs relevance, listing quality, price competitiveness and seller performance together — which is why listing work alone cannot carry a store with weak operational metrics.',
      },
      {
        term: 'Good ’Til Cancelled',
        explanation:
          'A listing format that renews automatically and accumulates sales history over time. It behaves differently from a fixed-duration listing, and choosing the wrong one costs you that accumulated history.',
      },
      {
        term: 'Seller performance standards',
        explanation:
          'eBay\'s rating of your account, based on defects, late dispatch and case rates. Falling below standard affects visibility and fees, and it recovers slowly — which is why it is worth monitoring rather than reacting to.',
      },
      {
        term: 'Item not received cases',
        explanation:
          'Opened when a buyer says a parcel has not arrived. Fast, documented communication frequently resolves these before they are escalated and recorded against the account.',
      },
      {
        term: 'Money Back Guarantee',
        explanation:
          'eBay\'s buyer protection framework. It sets the outer boundary of what your own returns policy can say, so both need to be understood together.',
      },
    ],
    workflow: [
      {
        title: 'Listing structure and item specifics',
        description:
          'Titles rebuilt around buyer search language, item specifics completed properly, and category placement corrected where a listing has been filed somewhere it will not be found.',
      },
      {
        title: 'Listing format and pricing',
        description:
          'Format, duration, Best Offer settings and pricing reviewed against what the category actually supports.',
      },
      {
        title: 'Dispatch inside handling time',
        description:
          'Orders processed and tracking uploaded within the handling time your listings state, because late dispatch is recorded against the account whether or not the parcel arrives on time.',
      },
      {
        title: 'Buyer messages and returns',
        description:
          'Messages answered in a consistent voice, return requests processed against your policy, and non-arrival enquiries handled before they become cases.',
      },
      {
        title: 'Seller standards monitoring',
        description:
          'Defect rate, late dispatch rate and case rate watched continuously so a developing pattern is caught while it is still correctable.',
      },
    ],
    audience: [
      'New eBay sellers with no feedback history yet',
      'Sellers whose listings get impressions but few sales',
      'Sellers falling behind on dispatch times or buyer messages',
      'Sellers who want the day-to-day store operation handled entirely',
    ],
  },

  /* ================================================================== */
  {
    id: 'amazon',
    name: 'Amazon',
    shortName: 'Amazon',
    slug: 'amazon',
    summary:
      'Catalog accuracy, listing content, order handling and account health support for Amazon sellers.',
    heading: 'Amazon Store Management, Listings & Order Support',
    intro:
      'Amazon is less forgiving than most marketplaces about catalog accuracy and account health. A miscategorised product, an incomplete detail page, or a drifting defect rate all cost visibility long before anyone tells you why. We handle the catalog and operational layer so those problems are caught as signals rather than as suspensions.',
    platformTerms: [
      {
        term: 'ASIN and catalog data',
        explanation:
          'Every product on Amazon sits against a catalog identifier, and the data attached to it determines where the product can appear. Getting catalog data wrong is harder to undo than getting it right the first time.',
      },
      {
        term: 'Backend search terms',
        explanation:
          'Keyword fields buyers never see, used by Amazon to match your product to searches. They are frequently left empty, duplicated from the title, or filled with terms that do not belong there.',
      },
      {
        term: 'Featured Offer',
        explanation:
          'The purchase box on a product page, often called the Buy Box. Which seller holds it depends on price, fulfilment method, availability and seller metrics together — not on any single one of them.',
      },
      {
        term: 'FBA and FBM',
        explanation:
          'Fulfilment by Amazon means Amazon stores and ships your stock. Fulfilment by Merchant means you do. They carry different cost structures, different delivery expectations and different operational workloads.',
      },
      {
        term: 'Account health',
        explanation:
          'Amazon\'s ongoing assessment of your selling account, including order defect rate and late shipment rate. It is the metric most worth protecting, because recovery is slow and enforcement can be abrupt.',
      },
      {
        term: 'Detail page content',
        explanation:
          'Title, bullets, description and images on the product page. Enhanced content formats exist for brand-registered sellers, and whether you qualify changes what is worth building.',
      },
    ],
    workflow: [
      {
        title: 'Catalog and listing audit',
        description:
          'Detail pages reviewed for category placement, attribute completeness, content gaps and anything that would limit where the product can surface.',
      },
      {
        title: 'Detail page content',
        description:
          'Titles, bullets and descriptions rewritten for buyer clarity and search relevance, with backend search terms used properly rather than stuffed.',
      },
      {
        title: 'Inventory and availability',
        description:
          'Stock levels tracked against live listings so items do not stay buyable when they cannot be shipped — the fastest route to defects.',
      },
      {
        title: 'Order and fulfilment handling',
        description:
          'Orders processed on schedule with dispatch confirmed and tracked inside Amazon\'s expected window.',
      },
      {
        title: 'Account health monitoring',
        description:
          'Defect and late shipment indicators watched continuously, with anything trending in the wrong direction raised immediately.',
      },
    ],
    audience: [
      'New Amazon sellers setting up their first listings',
      'Sellers with detail pages that are incomplete or miscategorised',
      'Sellers watching account health metrics drift',
      'Sellers who want catalog and operational work handled ongoing',
    ],
  },

  /* ================================================================== */
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    shortName: 'TikTok',
    slug: 'tiktok-shop',
    summary:
      'Product setup, content-linked selling, order handling and buyer support for TikTok Shop sellers.',
    heading: 'TikTok Shop Management, Listings & Order Support',
    intro:
      'TikTok Shop behaves less like a search marketplace and more like a storefront attached to a content feed. Products surface because something links to them — a video, a live session, a creator — and the operational bar for fulfilment and response times is set tight. We handle product setup, order operations and buyer messaging so the commerce side keeps up with the content side.',
    platformTerms: [
      {
        term: 'Seller Center',
        explanation:
          'The dashboard where products, orders, shipping settings and account standing are managed. Most operational problems are visible here well before they affect sales.',
      },
      {
        term: 'Product approval',
        explanation:
          'New products are reviewed before going live. Rejections usually come down to category rules, claims made in the description, or images that do not meet requirements — all avoidable at setup.',
      },
      {
        term: 'Content-attached products',
        explanation:
          'Products linked to videos or live sessions so viewers can buy without leaving the feed. Whether a product is set up correctly for attachment determines whether content can convert at all.',
      },
      {
        term: 'Creator collaboration',
        explanation:
          'Arrangements where creators feature your products in exchange for commission. Your product listing, pricing and stock reliability are what make a collaboration worth their while.',
      },
      {
        term: 'Fulfilment deadlines',
        explanation:
          'TikTok Shop expects dispatch within a defined window. The window is shorter than sellers coming from other marketplaces tend to expect, and missing it is recorded.',
      },
      {
        term: 'Account health and violations',
        explanation:
          'Operational and policy issues accumulate against the account. Enough of them restricts what the shop can do, so the goal is avoiding the first one rather than managing the total.',
      },
    ],
    workflow: [
      {
        title: 'Product setup and approval',
        description:
          'Products built to meet category and content requirements the first time, so they pass review rather than cycling through rejections.',
      },
      {
        title: 'Listing content and imagery',
        description:
          'Titles, descriptions and images written for a feed-driven audience making fast decisions, while staying inside claim and content rules.',
      },
      {
        title: 'Commerce-side readiness',
        description:
          'Pricing, stock and variant setup kept accurate so products stay ready to convert whenever content sends traffic to them.',
      },
      {
        title: 'Order and dispatch handling',
        description:
          'Orders processed and shipped inside TikTok Shop\'s fulfilment window, with tracking confirmed.',
      },
      {
        title: 'Buyer messages and after-sales',
        description:
          'Enquiries, delivery questions and return requests handled promptly in a consistent voice.',
      },
    ],
    audience: [
      'Sellers opening a TikTok Shop for the first time',
      'Sellers whose products keep failing review at setup',
      'Sellers whose content converts but whose operations cannot keep pace',
      'Sellers who want the commerce side handled while they focus on content',
    ],
  },
]

/* ------------------------------------------------------------------ */

export const marketplaceSlugs = marketplaces.map((m) => m.slug)

export function getMarketplace(slug: string): MarketplaceProfile | undefined {
  return marketplaces.find((m) => m.slug === slug)
}
