import { ExampleLabel } from '@/components/primitives/Badge'
import { Icon } from '@/components/primitives/Icon'

/**
 * Listing before/after — specs.md §5.3, Constitution §13
 *
 * A fictional product, invented for demonstration. It shows STRUCTURAL
 * improvement (title clarity, attribute completeness, bullet structure) rather
 * than claiming a result, because a before/after that implies a sales outcome
 * would be an unevidenced claim (§3.4).
 */

const before = {
  title: 'Bluetooth Headphones Wireless Earbuds NEW',
  attributes: [
    { label: 'Brand', value: 'Unbranded' },
    { label: 'Type', value: '—' },
    { label: 'Connectivity', value: '—' },
    { label: 'Battery life', value: '—' },
  ],
  bullets: ['Good quality', 'Fast shipping', 'Buy now!'],
  issues: [
    'Title stacks keywords instead of describing the product',
    'Item specifics mostly empty, so filtered searches exclude it',
    'Bullets say nothing a buyer can use to decide',
  ],
}

const after = {
  title:
    'Wireless Earbuds, Bluetooth 5.3, 30-Hour Battery with Charging Case, IPX5 Water Resistant',
  attributes: [
    { label: 'Brand', value: 'Acme Audio' },
    { label: 'Type', value: 'In-ear, true wireless' },
    { label: 'Connectivity', value: 'Bluetooth 5.3' },
    { label: 'Battery life', value: '6 hrs + 24 hrs case' },
  ],
  bullets: [
    '30 hours total playback — 6 in the earbuds, 24 more in the case',
    'IPX5 water resistant, rated for workouts and light rain',
    'USB-C charging, with a 10-minute quick charge for 2 hours of use',
  ],
  improvements: [
    'Title leads with what the product is, then its deciding attributes',
    'Item specifics completed so the listing appears in filtered searches',
    'Bullets answer the questions buyers ask before purchasing',
  ],
}

export function ListingPreview() {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        <ListingCard variant="before" />
        <ListingCard variant="after" />
      </div>

      <div className="mt-5 flex justify-center">
        <ExampleLabel>
          Example listing — fictional product, created for demonstration
        </ExampleLabel>
      </div>
    </div>
  )
}

function ListingCard({ variant }: { variant: 'before' | 'after' }) {
  const isAfter = variant === 'after'
  const data = isAfter ? after : before
  const notes = isAfter ? after.improvements : before.issues

  return (
    <div
      className={
        isAfter
          ? 'rounded-xl border-2 border-accent-600/30 bg-surface p-5 shadow-md'
          : 'rounded-xl border border-line bg-surface-muted p-5'
      }
    >
      <div className="mb-4 flex items-center gap-2">
        <span
          className={
            isAfter
              ? 'rounded-full bg-accent-600 px-2.5 py-0.5 text-small font-bold text-white'
              : 'rounded-full bg-ink-500/15 px-2.5 py-0.5 text-small font-bold text-ink-700'
          }
        >
          {isAfter ? 'After' : 'Before'}
        </span>
      </div>

      {/* Mock listing surface */}
      <div className="rounded-lg border border-line bg-surface p-4">
        <div className="flex gap-3">
          <ProductThumb muted={!isAfter} />
          <div className="min-w-0 flex-1">
            <p
              className={
                isAfter
                  ? 'text-body font-semibold text-ink-900'
                  : 'text-body text-ink-700'
              }
            >
              {data.title}
            </p>
            <p className="mt-1.5 text-body-lg font-bold text-ink-900">
              $39.99
            </p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-3">
          {data.attributes.map((attr) => (
            <div key={attr.label}>
              <dt className="text-small text-ink-500">{attr.label}</dt>
              <dd
                className={
                  attr.value === '—'
                    ? 'text-small text-ink-500'
                    : 'text-small font-medium text-ink-900'
                }
              >
                {attr.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-4 flex flex-col gap-1.5 border-t border-line pt-3">
          {data.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2 text-small text-ink-700"
            >
              <span className="mt-2 size-1 shrink-0 rounded-full bg-ink-500" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Annotations */}
      <ul className="mt-4 flex flex-col gap-2">
        {notes.map((note) => (
          <li key={note} className="flex gap-2 text-small text-ink-700">
            <Icon
              name={isAfter ? 'check' : 'alert'}
              className={
                isAfter
                  ? 'mt-0.5 size-4 shrink-0 text-accent-700'
                  : 'mt-0.5 size-4 shrink-0 text-ink-500'
              }
            />
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Abstract product placeholder — deliberately not a photo. */
function ProductThumb({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="size-16 shrink-0 rounded-md border border-line"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" className="fill-surface-muted" />
      <circle
        cx="32"
        cy="27"
        r="11"
        fill="none"
        strokeWidth="2.5"
        className={muted ? 'stroke-ink-500/40' : 'stroke-accent-600/60'}
      />
      <path
        d="M20 46c0-6 5.4-10 12-10s12 4 12 10"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={muted ? 'stroke-ink-500/40' : 'stroke-accent-600/60'}
      />
    </svg>
  )
}
