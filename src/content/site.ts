import type { SiteConfig } from './types'

/** Vercel supplies bare hostnames with no scheme. */
function withProtocol(host: string | undefined): string | undefined {
  const trimmed = host?.trim()
  if (!trimmed) return undefined
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
}

/**
 * Resolve the site origin from the environment, in priority order:
 *
 *   1. NEXT_PUBLIC_SITE_URL           explicit configuration always wins
 *   2. VERCEL_PROJECT_PRODUCTION_URL  stable production domain
 *   3. VERCEL_URL                     this deployment (correct for previews)
 *   4. http://localhost:3000          local development
 *
 * The Vercel fallbacks matter: without them, a deploy made before
 * NEXT_PUBLIC_SITE_URL is configured would emit canonicals, Open Graph URLs
 * and a sitemap all pointing at localhost - broken for crawlers, and the kind
 * of thing nobody notices until rankings do.
 *
 * Deliberately takes env as a parameter and lives in this module rather than
 * lib/: content modules use only relative imports and no path aliases, which
 * is what lets the test runner import them directly without a build step.
 */
export function resolveBaseUrl(
  env: Record<string, string | undefined>
): string {
  const candidate =
    withProtocol(env.NEXT_PUBLIC_SITE_URL) ??
    withProtocol(env.VERCEL_PROJECT_PRODUCTION_URL) ??
    withProtocol(env.VERCEL_URL) ??
    'http://localhost:3000'

  return candidate.replace(/\/+$/, '')
}

/**
 * Site configuration — the single source of truth for identity and CTA wording.
 *
 * `contact` and `social` are intentionally EMPTY. Every consumer renders
 * nothing rather than a placeholder, per Constitution §48 Rule 8 and
 * specs.md §15. Fill them in from CLIENT_INPUTS.md when the details land —
 * no component changes are needed.
 */
export const site: SiteConfig = {
  businessName: 'Aneq_AR',

  tagline:
    'Marketplace management and growth for eBay, Amazon and TikTok Shop sellers.',

  // Constitution §7.3 — one wording, used everywhere. Changing it here
  // changes it sitewide, which is what makes a single-variable A/B test possible.
  primaryCtaLabel: 'Get a Free Consultation',
  secondaryCtaLabel: 'See How It Works',

  // specs.md D10 — confirmed free. Typed as a literal so it cannot be
  // flipped casually; Constitution §8 forbids implying free if it is not.
  consultationIsFree: true,

  contact: [
    {
      label: 'WhatsApp',
      value: '+971 58 858 1245',
      // wa.me needs digits only - no plus, spaces or dashes.
      href: 'https://wa.me/971588581245',
      event: 'whatsapp_click',
    },
    // [AWAITING CLIENT INPUT] Business email. Add when confirmed:
    //   { label: 'Email', value: 'info@…', href: 'mailto:info@…', event: 'email_click' },
  ],

  social: [
    // Supplied by the client as their own profile. Not independently verified -
    // Upwork sits behind bot protection - so confirm the link resolves before launch.
    { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~0194a9cd6c8a2d6bd4' },
  ],

  /**
   * Safe to read non-public env vars here: baseUrl is consumed only by
   * build-time SEO code (lib/seo.ts, layout metadata, sitemap.ts, robots.ts)
   * and never by a client component, so nothing depends on it being inlined
   * into the browser bundle.
   */
  baseUrl: resolveBaseUrl(process.env),

  locale: 'en_US',
  language: 'en',
}

/** True when at least one contact channel is available to render. */
export const hasContactChannels = site.contact.length > 0

/** True when the footer social row has anything to show. */
export const hasSocialLinks = site.social.length > 0
