import { ExampleLabel } from '@/components/primitives/Badge'

/**
 * Product research comparison — Constitution §12, specs.md §5.3
 *
 * Shows research as a DECISION FRAMEWORK, not a "winning product" reveal.
 * Every candidate and every score is invented for demonstration, the products
 * are anonymised, and the panel carries a permanent Example label (§42).
 *
 * Note the third candidate scores badly and is marked "Pass". A matrix where
 * every option looks good would misrepresent what the work actually produces.
 */

type Verdict = 'shortlist' | 'consider' | 'pass'

interface Candidate {
  ref: string
  category: string
  scores: { demand: number; competition: number; margin: number; risk: number }
  verdict: Verdict
  note: string
}

const DIMENSIONS = [
  { key: 'demand', label: 'Demand' },
  { key: 'competition', label: 'Competition' },
  { key: 'margin', label: 'Margin' },
  { key: 'risk', label: 'Risk profile' },
] as const

const candidates: Candidate[] = [
  {
    ref: 'Candidate A',
    category: 'Home organisation',
    scores: { demand: 4, competition: 4, margin: 3, risk: 4 },
    verdict: 'shortlist',
    note: 'Steady demand, fragmented competition, ships small and flat.',
  },
  {
    ref: 'Candidate B',
    category: 'Pet accessories',
    scores: { demand: 5, competition: 2, margin: 3, risk: 3 },
    verdict: 'consider',
    note: 'Strong demand, but several established sellers hold the category.',
  },
  {
    ref: 'Candidate C',
    category: 'Consumer electronics',
    scores: { demand: 4, competition: 1, margin: 1, risk: 1 },
    verdict: 'pass',
    note: 'Thin margin after fees, high return rate, saturated on price.',
  },
]

const verdictStyles: Record<Verdict, { label: string; className: string }> = {
  shortlist: {
    label: 'Shortlist',
    className: 'border-accent-600/30 bg-accent-600/10 text-accent-700',
  },
  consider: {
    label: 'Consider',
    className: 'border-ink-900/15 bg-surface-muted text-ink-700',
  },
  pass: {
    label: 'Pass',
    className: 'border-ink-900/15 bg-surface-muted text-ink-500',
  },
}

export function ResearchMatrix() {
  return (
    <div>
      <div className="min-w-0 overflow-x-auto rounded-xl border border-line bg-surface shadow-sm">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">
            Example product research comparison across demand, competition,
            margin and risk. All values are illustrative.
          </caption>
          <thead>
            <tr className="border-b border-line bg-surface-muted">
              <th scope="col" className="px-4 py-3 text-small font-semibold text-ink-900">
                Candidate
              </th>
              {DIMENSIONS.map((d) => (
                <th
                  key={d.key}
                  scope="col"
                  className="px-4 py-3 text-small font-semibold text-ink-900"
                >
                  {d.label}
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-small font-semibold text-ink-900">
                Verdict
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-line)]">
            {candidates.map((c) => (
              <tr key={c.ref}>
                <th scope="row" className="px-4 py-4 align-top font-normal">
                  <span className="block text-body font-semibold text-ink-900">
                    {c.ref}
                  </span>
                  <span className="mt-0.5 block text-small text-ink-500">
                    {c.category}
                  </span>
                  <span className="mt-1.5 block max-w-56 text-small text-ink-700">
                    {c.note}
                  </span>
                </th>

                {DIMENSIONS.map((d) => (
                  <td key={d.key} className="px-4 py-4 align-top">
                    <ScoreMeter
                      value={c.scores[d.key]}
                      label={`${d.label} for ${c.ref}`}
                    />
                  </td>
                ))}

                <td className="px-4 py-4 align-top">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-small font-semibold ${verdictStyles[c.verdict].className}`}
                  >
                    {verdictStyles[c.verdict].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex justify-center">
        <ExampleLabel>
          Example analysis — illustrative scores, not client research output
        </ExampleLabel>
      </div>
    </div>
  )
}

/**
 * Score meter. The numeric value is exposed as text to assistive tech, so the
 * rating is never carried by the filled bars alone (Constitution §21).
 */
function ScoreMeter({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex flex-col gap-1">
      <span className="sr-only">{`${label}: ${value} out of 5`}</span>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={
              i <= value
                ? 'h-4 w-1.5 rounded-full bg-accent-600'
                : 'h-4 w-1.5 rounded-full bg-ink-500/20'
            }
          />
        ))}
      </span>
      <span className="text-small text-ink-500" aria-hidden="true">
        {value}/5
      </span>
    </span>
  )
}
