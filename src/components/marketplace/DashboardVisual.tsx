'use client'

import { useRef, useState } from 'react'
import { ExampleLabel } from '@/components/primitives/Badge'
import { Icon } from '@/components/primitives/Icon'
import type { IconName } from '@/content/types'

/**
 * Hero visual — Constitution §6.4, §18; specs.md §5.1.1
 *
 * A purpose-built store-overview composition. Not a stock photo, not a
 * screenshot of anyone's account. Every figure is invented for illustration
 * and the panel carries a permanent Example label (§42).
 *
 * The marketplace tabs are REAL controls. They previously looked like tabs but
 * were inert spans showing eBay data only — an affordance that invites a click
 * and then does nothing is worse than no affordance at all. They now implement
 * the ARIA tabs pattern with arrow-key navigation, and each marketplace shows
 * figures in its own vocabulary.
 *
 * Because the tabs are interactive, this composition is NOT aria-hidden; only
 * the decorative chart inside it is. Focusable controls inside an aria-hidden
 * subtree are reachable by keyboard but invisible to assistive tech, which is
 * a serious accessibility defect.
 */

interface Metric {
  label: string
  value: string
  trend: 'up' | 'down'
  delta: string
}

interface QueueRow {
  label: string
  count: string
  icon: IconName
}

interface Board {
  id: string
  name: string
  metrics: Metric[]
  /** Weekly order counts, oldest first. Illustrative. */
  trend: number[]
  queue: QueueRow[]
}

/**
 * Each board uses its own platform's vocabulary rather than relabelled eBay
 * data. Note the Amazon board deliberately has no A-to-Z claim handling —
 * that service is not offered (specs.md §2.1).
 */
const boards: Board[] = [
  {
    id: 'ebay',
    name: 'eBay',
    metrics: [
      { label: 'Orders', value: '128', trend: 'up', delta: '+12' },
      { label: 'Listings live', value: '342', trend: 'up', delta: '+18' },
      { label: 'Open cases', value: '2', trend: 'down', delta: '-3' },
    ],
    trend: [18, 22, 19, 28, 26, 34, 31, 42, 46, 44, 55, 62],
    queue: [
      { label: 'Awaiting dispatch', count: '14', icon: 'clock' },
      { label: 'Tracking to upload', count: '6', icon: 'clock' },
      { label: 'Buyer messages', count: '9', icon: 'message' },
      { label: 'Returns in progress', count: '3', icon: 'check' },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    metrics: [
      { label: 'Orders', value: '206', trend: 'up', delta: '+24' },
      { label: 'Active listings', value: '178', trend: 'up', delta: '+9' },
      { label: 'Late shipments', value: '1', trend: 'down', delta: '-4' },
    ],
    trend: [30, 28, 35, 33, 41, 39, 48, 52, 50, 61, 58, 71],
    queue: [
      { label: 'Awaiting dispatch', count: '21', icon: 'clock' },
      { label: 'Stock to replenish', count: '5', icon: 'orders' },
      { label: 'Buyer messages', count: '12', icon: 'message' },
      { label: 'Returns to review', count: '4', icon: 'check' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    metrics: [
      { label: 'Orders', value: '94', trend: 'up', delta: '+31' },
      { label: 'Products live', value: '63', trend: 'up', delta: '+7' },
      { label: 'In review', value: '3', trend: 'down', delta: '-2' },
    ],
    trend: [8, 11, 16, 14, 23, 29, 27, 38, 44, 41, 57, 68],
    queue: [
      { label: 'Awaiting dispatch', count: '11', icon: 'clock' },
      { label: 'Products in review', count: '3', icon: 'search' },
      { label: 'Buyer messages', count: '7', icon: 'message' },
      { label: 'Returns in progress', count: '2', icon: 'check' },
    ],
  },
]

export function DashboardVisual() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const board = boards[active]!

  /** Arrow keys move between tabs; Home and End jump to the ends. */
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = boards.length - 1
    let next: number | null = null

    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last

    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-lg">
        {/* Window chrome — decoration only */}
        <div
          className="flex items-center gap-2 border-b border-line bg-surface-muted px-4 py-3"
          aria-hidden="true"
        >
          <span className="size-2.5 rounded-full bg-ink-500/25" />
          <span className="size-2.5 rounded-full bg-ink-500/25" />
          <span className="size-2.5 rounded-full bg-ink-500/25" />
          <span className="ml-2 text-small font-medium text-ink-500">
            Store overview
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Example store overview by marketplace"
          className="flex gap-1 border-b border-line px-4 pt-3"
        >
          {boards.map((b, i) => (
            <button
              key={b.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`board-tab-${b.id}`}
              aria-selected={i === active}
              aria-controls={`board-panel-${b.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={
                i === active
                  ? 'rounded-t-md border-b-2 border-accent-600 px-3 py-2 text-small font-semibold text-ink-900'
                  : 'rounded-t-md border-b-2 border-transparent px-3 py-2 text-small text-ink-500 transition-colors hover:text-ink-900'
              }
            >
              {b.name}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`board-panel-${board.id}`}
          aria-labelledby={`board-tab-${board.id}`}
          tabIndex={0}
          className="p-4 sm:p-5"
        >
          <div className="grid grid-cols-3 gap-3">
            {board.metrics.map((metric) => (
              <MetricTile key={metric.label} {...metric} />
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-line p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-small font-semibold text-ink-900">
                Orders per week
              </span>
              <span className="text-small text-ink-500">Last 12 weeks</span>
            </div>
            <TrendChart points={board.trend} />
          </div>

          <div className="mt-4 rounded-lg border border-line">
            <div className="border-b border-line px-4 py-2.5">
              <span className="text-small font-semibold text-ink-900">
                Today&rsquo;s queue
              </span>
            </div>
            <ul className="divide-y divide-[var(--color-line)]">
              {board.queue.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <span className="flex items-center gap-2.5 text-small text-ink-700">
                    <Icon name={row.icon} className="size-4 text-ink-500" />
                    {row.label}
                  </span>
                  <span className="rounded-full bg-surface-muted px-2 py-0.5 text-small font-semibold text-ink-900">
                    {row.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <ExampleLabel />
      </div>
    </div>
  )
}

function MetricTile({ label, value, trend, delta }: Metric) {
  return (
    <div className="rounded-lg border border-line p-3">
      <p className="text-small text-ink-500">{label}</p>
      <p className="mt-1 text-h3 font-bold text-ink-900">{value}</p>
      {/* Direction is carried by the word and the sign, never by colour alone */}
      <p className="mt-0.5 flex items-center gap-1 text-small text-ink-500">
        <span aria-hidden="true">{trend === 'up' ? '▲' : '▼'}</span>
        <span className="sr-only">{trend === 'up' ? 'up' : 'down'} </span>
        {delta}
      </p>
    </div>
  )
}

/** Decorative. The figures beside it carry the meaning. */
function TrendChart({ points }: { points: number[] }) {
  const width = 320
  const height = 90
  const max = Math.max(...points)
  const step = width / (points.length - 1)

  const coords = points.map((point, i) => ({
    x: i * step,
    y: height - (point / max) * (height - 8) - 4,
  }))

  const line = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-24 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="var(--color-accent-600)"
            stopOpacity="0.18"
          />
          <stop
            offset="100%"
            stopColor="var(--color-accent-600)"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1="0"
          x2={width}
          y1={height * t}
          y2={height * t}
          stroke="var(--color-line)"
          strokeWidth="1"
        />
      ))}

      <path
        d={`${line} L${width},${height} L0,${height} Z`}
        fill="url(#trend-fill)"
      />
      <path
        d={line}
        fill="none"
        stroke="var(--color-accent-600)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="trend-line"
      />
      <circle
        cx={coords[coords.length - 1]?.x ?? 0}
        cy={coords[coords.length - 1]?.y ?? 0}
        r="3.5"
        fill="var(--color-accent-600)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
