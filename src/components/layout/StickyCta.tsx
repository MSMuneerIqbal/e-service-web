'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { site } from '@/content/site'
import { trackCta } from '@/lib/analytics'

const SHOW_AFTER_PX = 640

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange, { passive: true })
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}

const getSnapshot = () => window.scrollY > SHOW_AFTER_PX

/** Server render: never shown, so the markup matches the client's first paint. */
const getServerSnapshot = () => false

/**
 * Mobile sticky CTA — specs.md §4, Constitution §39
 *
 * One action only. Appears past the hero, respects safe-area insets, and is
 * suppressed on /contact (the form is already there) so the site never offers
 * two competing routes to the same place.
 *
 * Scroll position is read with useSyncExternalStore rather than an effect +
 * setState. It is browser state we are subscribing to, which is exactly what
 * that hook is for, and it avoids the cascading render an effect would cause.
 * It also gets the initial value right when a page loads already scrolled
 * (back navigation restoring position), which a scroll-listener-only approach
 * would miss until the user moved.
 */
export function StickyCta() {
  const pathname = usePathname()
  const suppressed = pathname === '/contact'

  const scrolledPastHero = useSyncExternalStore(
    useCallback(
      (onChange: () => void) => (suppressed ? () => {} : subscribe(onChange)),
      [suppressed]
    ),
    suppressed ? getServerSnapshot : getSnapshot,
    getServerSnapshot
  )

  if (suppressed || !scrolledPastHero) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 p-3 backdrop-blur-sm md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <Link
        href="/contact"
        onClick={() => trackCta('sticky', pathname)}
        className="flex min-h-12 w-full items-center justify-center rounded-md bg-accent-600 px-5 text-body font-semibold text-white shadow-sm"
      >
        {site.primaryCtaLabel}
      </Link>
    </div>
  )
}
