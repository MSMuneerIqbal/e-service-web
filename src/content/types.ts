/**
 * Content type definitions — specs.md §9
 *
 * The literal `true` types on CaseStudy.clientPermission, Testimonial.verified
 * and TeamMember.real are deliberate. They make it a TypeScript compile error
 * to add a proof record that has not been confirmed and permitted, which turns
 * Constitution §48 Rules 1, 2 and 11 into a build check rather than something
 * a future author has to remember.
 *
 * Do not relax them to `boolean`.
 */

export type MarketplaceId = 'ebay' | 'amazon' | 'tiktok'

export type ServiceKind = 'core' | 'offering'

/* ------------------------------------------------------------------ */
/* Site configuration                                                  */
/* ------------------------------------------------------------------ */

export interface ContactChannel {
  /** Rendered label, e.g. "Email" */
  label: string
  /** Display value, e.g. "hello@example.com" */
  value: string
  /** href — mailto:, https://wa.me/…, tel: */
  href: string
  /** Analytics event name fired on click */
  event: 'email_click' | 'whatsapp_click' | 'phone_click'
}

export interface SocialLink {
  label: string
  href: string
}

export interface SiteConfig {
  /** specs.md D9. Entity type still unconfirmed — see CLIENT_INPUTS.md */
  businessName: string
  /** Short positioning line for the footer and OG description */
  tagline: string
  /** Single source of CTA wording — specs.md §4, Constitution §7.3 */
  primaryCtaLabel: string
  secondaryCtaLabel: string
  /**
   * Literal `true`: the consultation is confirmed free (specs.md D10).
   * Constitution §8 forbids implying "free" unless it actually is, so
   * changing this must be a deliberate typed edit, not a config toggle.
   */
  consultationIsFree: true
  /**
   * Contact channels. Empty until the client supplies them — every consumer
   * renders nothing rather than a placeholder (Constitution §48 Rule 8).
   */
  contact: ContactChannel[]
  /** Empty until real profiles are confirmed */
  social: SocialLink[]
  /** Optional booking link */
  bookingUrl?: string
  /** Absolute origin, no trailing slash */
  baseUrl: string
  locale: string
  language: string
}

/* ------------------------------------------------------------------ */
/* Marketplaces                                                        */
/* ------------------------------------------------------------------ */

export interface MarketplaceProfile {
  id: MarketplaceId
  /** "eBay" | "Amazon" | "TikTok Shop" */
  name: string
  slug: string
  /** Short label for badges and nav */
  shortName: string
  /** One-line positioning for cards */
  summary: string
  /** Page hero H1 */
  heading: string
  /** Page hero subheading */
  intro: string
  /**
   * Platform-native vocabulary. Enforces the specs.md §3.4 rule that no two
   * marketplace pages may be find-and-replace variants of each other.
   */
  platformTerms: { term: string; explanation: string }[]
  /** Platform-specific operational steps */
  workflow: { title: string; description: string }[]
  /** Who the page is for */
  audience: string[]
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export interface Service {
  slug: string
  /** Site-facing name, e.g. "Product Research & Hunting" */
  title: string
  /** Short nav/card label */
  navLabel: string
  /** The client's own term for it, e.g. "Hunting" */
  clientTerm: string
  kind: ServiceKind
  /** Outcome-oriented one-liner — Constitution §3.2 */
  shortDescription: string
  /** Opening paragraph on the detail page */
  longDescription: string
  /** What's included */
  bullets: string[]
  /** Icon key, resolved by the Icon component */
  icon: IconName
  /** Ordered process steps for the detail page */
  process: { title: string; description: string }[]
  /** What the client receives */
  deliverables: string[]
  /**
   * Honest limitation statement — Constitution §3.3.
   * Every service page carries one. This is not optional.
   */
  limitations: string
  /** SEO */
  metaTitle: string
  metaDescription: string
}

/* ------------------------------------------------------------------ */
/* Proof records — all gated, all compile-time guarded                 */
/* ------------------------------------------------------------------ */

export interface CaseStudyEvidence {
  type: 'screenshot' | 'chart'
  src: string
  alt: string
  caption: string
}

export interface CaseStudy {
  slug: string
  title: string
  marketplace: MarketplaceId
  /** Constitution §10 structure */
  challenge: string
  strategy: string
  execution: string
  result: string
  /** Required. Constitution §10 forbids an isolated metric without context. */
  timeframe: string
  evidence?: CaseStudyEvidence[]
  /** Literal true — a record cannot exist without documented permission */
  clientPermission: true
}

export interface Testimonial {
  quote: string
  authorName: string
  authorRole?: string
  company?: string
  marketplace?: MarketplaceId
  /** Literal true — unverified testimonials cannot be typed */
  verified: true
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo?: { src: string; alt: string }
  /** Literal true — invented people cannot be typed */
  real: true
}

/* ------------------------------------------------------------------ */
/* Shared content                                                      */
/* ------------------------------------------------------------------ */

export interface Faq {
  question: string
  answer: string
  /** Route paths this FAQ appears on. No answer is reused across pages. */
  pages: string[]
}

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

export interface FooterColumn {
  heading: string
  links: { label: string; href: string }[]
}

export type IconName =
  | 'search'
  | 'listing'
  | 'orders'
  | 'support'
  | 'manage'
  | 'launch'
  | 'check'
  | 'chevron'
  | 'arrow'
  | 'shield'
  | 'chart'
  | 'clock'
  | 'message'
  | 'alert'
  | 'close'
  | 'menu'
