import type { SiteConfig } from './types'

/**
 * Site configuration — the single source of truth for identity and CTA wording.
 *
 * `contact` and `social` are intentionally EMPTY. Every consumer renders
 * nothing rather than a placeholder, per Constitution §48 Rule 8 and
 * specs.md §15. Fill them in from CLIENT_INPUTS.md when the details land —
 * no component changes are needed.
 */
export const site: SiteConfig = {
  businessName: 'Sagheer Ur Rahman',

  tagline:
    'Marketplace management and growth for eBay, Amazon and TikTok Shop sellers.',

  // Constitution §7.3 — one wording, used everywhere. Changing it here
  // changes it sitewide, which is what makes a single-variable A/B test possible.
  primaryCtaLabel: 'Get a Free Consultation',
  secondaryCtaLabel: 'See How It Works',

  // specs.md D10 — confirmed free. Typed as a literal so it cannot be
  // flipped casually; Constitution §8 forbids implying free if it is not.
  consultationIsFree: true,

  // [AWAITING CLIENT INPUT] — see CLIENT_INPUTS.md items 2 and 3.
  // Example of the shape, for when the values arrive:
  //   { label: 'Email',    value: 'hello@…',      href: 'mailto:hello@…',        event: 'email_click' },
  //   { label: 'WhatsApp', value: '+00 000 000',  href: 'https://wa.me/00000',   event: 'whatsapp_click' },
  contact: [],

  // [AWAITING CLIENT INPUT] — item 16. Only real, active profiles.
  social: [],

  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
    /\/$/,
    ''
  ),

  locale: 'en_US',
  language: 'en',
}

/** True when at least one contact channel is available to render. */
export const hasContactChannels = site.contact.length > 0

/** True when the footer social row has anything to show. */
export const hasSocialLinks = site.social.length > 0
