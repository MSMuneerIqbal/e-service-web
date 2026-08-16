import Link from 'next/link'
import { Icon } from '@/components/primitives/Icon'
import type { Service } from '@/content/types'

/**
 * Service cards — Constitution §17.5 (cards exist for a reason) and §41
 * (no service dump). The two variants create the hierarchy that stops six
 * services reading as an undifferentiated wall.
 */

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm transition-[border-color,box-shadow] hover:border-ink-900/25 hover:shadow-md"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-lg bg-accent-600/10 text-accent-700">
        <Icon name={service.icon} className="size-5.5" />
      </span>

      <h3 className="mt-5 text-h3">{service.title}</h3>

      <p className="mt-3 flex-1 text-body text-ink-700">
        {service.shortDescription}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-body font-semibold text-accent-700">
        Learn more
        <Icon
          name="arrow"
          className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}

/**
 * Packaged offerings sit above the core four, visually weighted so the
 * commercial hierarchy is legible at a glance.
 */
export function OfferingCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-xl border border-navy-900/12 bg-navy-900 p-7 text-white shadow-md transition-[transform,box-shadow] hover:shadow-lg md:p-8 on-dark"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-lg bg-white/10 text-accent-400">
        <Icon name={service.icon} className="size-5.5" />
      </span>

      <h3 className="mt-5 text-h3 text-white">{service.title}</h3>

      <p className="mt-3 flex-1 text-body text-white/75">
        {service.shortDescription}
      </p>

      <ul className="mt-5 flex flex-col gap-2">
        {service.bullets.slice(0, 4).map((bullet) => (
          <li key={bullet} className="flex gap-2.5 text-small text-white/80">
            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent-400" />
            {bullet}
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 text-body font-semibold text-accent-400">
        Explore {service.title}
        <Icon
          name="arrow"
          className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}
