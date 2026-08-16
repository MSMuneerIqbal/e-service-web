import Link from 'next/link'
import { Icon } from '@/components/primitives/Icon'

export interface Crumb {
  name: string
  path: string
}

/**
 * Visible breadcrumb trail. Must mirror the BreadcrumbList JSON-LD exactly
 * (specs.md §10.3) — structured data that disagrees with the page is a
 * fabricated claim about the page's own structure.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  if (trail.length < 2) return null

  const last = trail.length - 1

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-small">
        {trail.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-1.5">
            {index > 0 ? (
              <Icon
                name="chevron"
                className="size-3.5 -rotate-90 text-ink-500"
              />
            ) : null}

            {index === last ? (
              <span className="text-ink-500" aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="text-ink-700 underline decoration-ink-500/30 underline-offset-4 hover:text-ink-900 hover:decoration-ink-500"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
