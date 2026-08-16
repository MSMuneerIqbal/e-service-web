import Link from 'next/link'
import { Container } from '@/components/primitives/Section'
import { Button } from '@/components/primitives/Button'
import { NavDropdown } from './NavDropdown'
import { MobileDrawer } from './MobileDrawer'
import { primaryNav } from '@/content/navigation'
import { site } from '@/content/site'

/**
 * Site header — server component.
 * Only the two interactive pieces (NavDropdown, MobileDrawer) ship JS.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-18 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label={`${site.businessName} — home`}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {primaryNav.map((item) =>
                item.children ? (
                  <li key={item.label}>
                    <NavDropdown item={item} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-body font-medium text-ink-700 transition-colors hover:text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/contact" className="hidden sm:inline-flex">
              {site.primaryCtaLabel}
            </Button>
            <MobileDrawer
              items={primaryNav}
              ctaLabel={site.primaryCtaLabel}
            />
          </div>
        </div>
      </Container>
    </header>
  )
}

/**
 * Brand wordmark.
 *
 * A typographic mark plus a small abstract glyph, not a logo pretending to be
 * one. specs.md §15 item 13: real logo files are still outstanding, and this is
 * built so swapping in an SVG later touches one component.
 */
function Wordmark() {
  return (
    <>
      <svg
        viewBox="0 0 32 32"
        className="size-8 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="32" height="32" rx="8" className="fill-navy-900" />
        <path
          d="M9 21.5 13.5 15l4 3.5L23 10"
          fill="none"
          className="stroke-accent-400"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="10" r="2" className="fill-accent-400" />
      </svg>
      <span className="text-body font-bold tracking-tight text-ink-900">
        {site.businessName}
      </span>
    </>
  )
}
