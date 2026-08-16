import Link from 'next/link'
import { marketplaces } from '@/content/marketplaces'
import { Icon } from '@/components/primitives/Icon'
import { cn } from '@/lib/utils'

/**
 * Marketplace identity — Constitution §43, specs.md §7.1
 *
 * Deliberately NO marketplace logos and NO marketplace brand colours. Using
 * eBay red/blue/yellow, Amazon orange, or TikTok pink/cyan implies an
 * affiliation that does not exist, and would fracture the single-accent
 * palette. Marketplaces are identified by name on a neutral badge, with an
 * abstract glyph that belongs to this brand rather than to theirs.
 */

const glyphs: Record<string, React.ReactNode> = {
  ebay: (
    <>
      <circle cx="8" cy="12" r="4.2" />
      <circle cx="16" cy="12" r="4.2" />
    </>
  ),
  amazon: (
    <>
      <path d="M4 9h16l-1.5 10.5h-13z" />
      <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 7.5c1 1.4 2.4 2.2 4.2 2.3" />
    </>
  ),
}

export function MarketplaceBadge({
  id,
  name,
  className,
}: {
  id: string
  name: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-small font-semibold text-ink-900',
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 text-accent-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {glyphs[id]}
      </svg>
      {name}
    </span>
  )
}

/** Row of all three, used as the trust strip under the hero. */
export function MarketplaceStrip({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-3', className)}>
      {marketplaces.map((m) => (
        <li key={m.id}>
          <MarketplaceBadge id={m.id} name={m.name} />
        </li>
      ))}
    </ul>
  )
}

/** Card grid linking to the three marketplace pages. */
export function MarketplaceGrid() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {marketplaces.map((m) => (
        <li key={m.id}>
          <Link
            href={`/${m.slug}`}
            className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm transition-[border-color,box-shadow] hover:border-ink-900/25 hover:shadow-md"
          >
            <MarketplaceBadge id={m.id} name={m.name} className="self-start" />
            <p className="mt-4 flex-1 text-body text-ink-700">{m.summary}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-body font-semibold text-accent-700">
              {m.name} services
              <Icon
                name="arrow"
                className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
