import { ExampleLabel } from '@/components/primitives/Badge'
import { Icon } from '@/components/primitives/Icon'

/**
 * Hero visual — Constitution §6.4, §18; specs.md §5.1.1
 *
 * A purpose-built store-overview composition, not a stock photo and not a
 * screenshot of anyone's real account. Every figure is invented for
 * illustration and the panel carries a permanent Example label (§42).
 *
 * Built from markup + inline SVG rather than an image file:
 *  - no LCP image download (specs.md §12)
 *  - sharp at any density
 *  - colours follow the design tokens automatically
 *
 * The whole composition is aria-hidden. A text summary sits beside it in the
 * hero, so nothing here is information-bearing for assistive tech (§21).
 */
export function DashboardVisual() {
  return (
    <div className="relative">
      <div
        className="overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
        aria-hidden="true"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line bg-surface-muted px-4 py-3">
          <span className="size-2.5 rounded-full bg-ink-500/25" />
          <span className="size-2.5 rounded-full bg-ink-500/25" />
          <span className="size-2.5 rounded-full bg-ink-500/25" />
          <span className="ml-2 text-small font-medium text-ink-500">
            Store overview
          </span>
        </div>

        {/* Marketplace tabs */}
        <div className="flex gap-1 border-b border-line px-4 pt-3">
          {['eBay', 'Amazon', 'TikTok Shop'].map((label, i) => (
            <span
              key={label}
              className={
                i === 0
                  ? 'rounded-t-md border-b-2 border-accent-600 px-3 py-2 text-small font-semibold text-ink-900'
                  : 'px-3 py-2 text-small text-ink-500'
              }
            >
              {label}
            </span>
          ))}
        </div>

        <div className="p-4 sm:p-5">
          {/* Metric tiles */}
          <div className="grid grid-cols-3 gap-3">
            <MetricTile label="Orders" value="128" trend="up" delta="+12" />
            <MetricTile label="Listings live" value="342" trend="up" delta="+18" />
            <MetricTile label="Open cases" value="2" trend="down" delta="-3" />
          </div>

          {/* Trend chart */}
          <div className="mt-4 rounded-lg border border-line p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-small font-semibold text-ink-900">
                Orders per week
              </span>
              <span className="text-small text-ink-500">Last 12 weeks</span>
            </div>
            <TrendChart />
          </div>

          {/* Order pipeline */}
          <div className="mt-4 rounded-lg border border-line">
            <div className="border-b border-line px-4 py-2.5">
              <span className="text-small font-semibold text-ink-900">
                Today&rsquo;s queue
              </span>
            </div>
            <ul className="divide-y divide-[var(--color-line)]">
              <PipelineRow label="Awaiting dispatch" count="14" state="active" />
              <PipelineRow label="Tracking to upload" count="6" state="active" />
              <PipelineRow label="Buyer messages" count="9" state="active" />
              <PipelineRow label="Returns in progress" count="3" state="idle" />
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

function MetricTile({
  label,
  value,
  trend,
  delta,
}: {
  label: string
  value: string
  trend: 'up' | 'down'
  delta: string
}) {
  return (
    <div className="rounded-lg border border-line p-3">
      <p className="text-small text-ink-500">{label}</p>
      <p className="mt-1 text-h3 font-bold text-ink-900">{value}</p>
      {/* Direction is carried by the arrow glyph and the sign, not by colour alone */}
      <p className="mt-0.5 flex items-center gap-1 text-small text-ink-500">
        <span aria-hidden="true">{trend === 'up' ? '▲' : '▼'}</span>
        {delta}
      </p>
    </div>
  )
}

function PipelineRow({
  label,
  count,
  state,
}: {
  label: string
  count: string
  state: 'active' | 'idle'
}) {
  return (
    <li className="flex items-center justify-between px-4 py-2.5">
      <span className="flex items-center gap-2.5 text-small text-ink-700">
        <Icon
          name={state === 'active' ? 'clock' : 'check'}
          className="size-4 text-ink-500"
        />
        {label}
      </span>
      <span className="rounded-full bg-surface-muted px-2 py-0.5 text-small font-semibold text-ink-900">
        {count}
      </span>
    </li>
  )
}

/**
 * Trend line. The draw-in animation is decorative — the shape is fully rendered
 * without it, and the global reduced-motion rule disables it entirely.
 */
function TrendChart() {
  const points = [18, 22, 19, 28, 26, 34, 31, 42, 46, 44, 55, 62]
  const width = 320
  const height = 90
  const max = Math.max(...points)
  const step = width / (points.length - 1)

  const coords = points.map((p, i) => ({
    x: i * step,
    y: height - (p / max) * (height - 8) - 4,
  }))

  const line = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(' ')

  const area = `${line} L${width},${height} L0,${height} Z`

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
          <stop offset="0%" stopColor="var(--color-accent-600)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-accent-600)" stopOpacity="0" />
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

      <path d={area} fill="url(#trend-fill)" />
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
