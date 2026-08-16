import type { NavItem, FooterColumn } from './types'
import { services } from './services'
import { marketplaces } from './marketplaces'

/**
 * Navigation — specs.md §3.2
 *
 * "Contact" is deliberately absent from the primary nav: the CTA button already
 * targets it, and two routes to the same place weakens the single clear next
 * action Constitution §7.4 asks for. Contact remains in the footer.
 *
 * "Case Studies" is absent while there is nothing to show (specs.md §5.5).
 */

export const primaryNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      ...services.map((s) => ({
        label: s.navLabel,
        href: `/services/${s.slug}`,
        description: s.shortDescription,
      })),
      { label: 'All services', href: '/services' },
    ],
  },
  {
    label: 'Marketplaces',
    href: '/services#marketplaces',
    children: marketplaces.map((m) => ({
      label: m.name,
      href: `/${m.slug}`,
      description: m.summary,
    })),
  },
  { label: 'How It Works', href: '/services#process' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Services',
    links: services.map((s) => ({
      label: s.navLabel,
      href: `/services/${s.slug}`,
    })),
  },
  {
    heading: 'Marketplaces',
    links: marketplaces.map((m) => ({ label: m.name, href: `/${m.slug}` })),
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
]
