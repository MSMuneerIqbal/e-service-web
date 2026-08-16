import type { IconName } from './types'

/**
 * Home page content — specs.md §5.1
 *
 * Note what is NOT here: no statistics, no client counts, no years of
 * experience, no "trusted by". The differentiators below are all statements
 * about how the work is done, which is something we can stand behind
 * (specs.md §2.3).
 */

export const valueProps: {
  icon: IconName
  title: string
  description: string
}[] = [
  {
    icon: 'manage',
    title: 'One team across all four functions',
    description:
      'Research, listings, orders and buyer support handled together rather than by four disconnected people. What the order queue reveals feeds straight back into the listings.',
  },
  {
    icon: 'shield',
    title: 'Policy-conscious by default',
    description:
      'No review manipulation, no artificial engagement, no working around marketplace rules. Short-term tricks put the account you depend on at risk, and we will not take that trade.',
  },
  {
    icon: 'chart',
    title: 'Decisions you can audit',
    description:
      'Product shortlists come with the reasoning attached, and listing changes come with a record of what changed. You can challenge the thinking rather than take it on trust.',
  },
  {
    icon: 'clock',
    title: 'Operations on a schedule',
    description:
      'Orders, tracking and messages handled on an agreed rhythm, so the work that protects your seller metrics happens whether or not it was an emergency that week.',
  },
  {
    icon: 'message',
    title: 'One point of contact',
    description:
      'You talk to the person doing the work. Nothing gets lost being relayed through an account manager who has not seen your store.',
  },
  {
    icon: 'alert',
    title: 'We tell you what we cannot do',
    description:
      'If a request would put your account at risk, or if what you need falls outside what we offer, you will hear that plainly rather than after the invoice.',
  },
]

export const processSteps = [
  {
    title: 'Assess',
    description:
      'We review the store as it stands: listings, seller metrics, buyer communication, and whatever is causing the most friction right now.',
  },
  {
    title: 'Plan',
    description:
      'We agree scope, working schedule, what we decide independently, and what always comes back to you before action is taken.',
  },
  {
    title: 'Execute',
    description:
      'The operational work runs on that schedule. Orders, listings, messages and stock stop being emergencies and become routine.',
  },
  {
    title: 'Monitor',
    description:
      'Seller performance metrics and listing results are watched continuously, so a developing problem surfaces as a signal rather than a suspension.',
  },
  {
    title: 'Improve',
    description:
      'What the operational work reveals feeds the next cycle: listings worth rewriting, products not worth restocking, processes worth changing.',
  },
]

/**
 * Section copy for the home page.
 *
 * This lives here rather than inline in page.tsx because of plan.md D-B:
 * anything a non-developer might want to reword is content, not markup.
 */
export const homeSections = {
  services: {
    eyebrow: 'What we do',
    title: 'Four services, or the whole operation',
    description:
      'Take a single service where you need it, or hand over the store end to end. Everything below is available on eBay, Amazon and TikTok Shop.',
  },
  research: {
    eyebrow: 'Product research',
    title: 'A decision framework, not a winning-product promise',
    description:
      'Anyone can hand you a list of products. What matters is whether the reasoning behind it survives contact with fees, competition and returns.',
    points: [
      'Demand checked before competition, competition before margin',
      'Margin calculated after marketplace fees, shipping and expected returns',
      'Risk factors and operational load stated openly',
      'Every shortlist arrives with its reasoning attached',
    ],
  },
  listing: {
    eyebrow: 'Listing optimization',
    title: 'Listings that search can read and buyers can decide from',
    description:
      'Most underperforming listings fail in one of two ways: the marketplace cannot categorise them, or the buyer cannot answer their own question. Both are visible within a minute of looking.',
    points: [
      'Titles that describe the product before they chase keywords',
      'Item specifics and attributes completed properly',
      'Bullets that answer pre-purchase questions',
      'Image coverage and content gaps identified',
    ],
  },
  process: {
    eyebrow: 'How it works',
    title: 'The operating cycle',
    description:
      'The same five steps whether we run one service or the entire store.',
  },
  launch: {
    eyebrow: 'New stores',
    title: 'Starting a store with no selling history',
    description:
      'A new store begins with nothing a buyer can use to judge it. That is a real disadvantage and it is worth being straight about. What a structured launch does is remove every other reason to hesitate.',
    // Constitution §11 sanctioned wording — do not strengthen this claim.
    note: 'We help new sellers build a stronger foundation for their first marketplace orders and long-term store growth. Orders and feedback cannot be guaranteed by anyone, and we will not pretend otherwise.',
  },
  marketplaces: {
    eyebrow: 'Marketplaces',
    title: 'Three platforms, handled on their own terms',
    description:
      'The services are the same. How each marketplace ranks, measures and penalises sellers is not, so the approach is adapted to the platform rather than copied across it.',
  },
  why: {
    eyebrow: 'Why work with us',
    title: 'How we operate',
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Before you get in touch',
  },
} as const

export const launchJourney = [
  'New store',
  'Product strategy',
  'Optimized listings',
  'First orders',
  'Positive feedback',
  'Sustainable growth',
]
