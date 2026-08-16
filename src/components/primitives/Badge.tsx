import { cn } from '@/lib/utils'
import { Icon } from './Icon'

type BadgeTone = 'neutral' | 'accent' | 'dark' | 'notice'

const tones: Record<BadgeTone, string> = {
  neutral: 'border-line bg-surface text-ink-700',
  accent: 'border-accent-600/25 bg-accent-600/8 text-accent-700',
  dark: 'border-white/15 bg-white/8 text-white/85',
  notice: 'border-ink-900/15 bg-surface-muted text-ink-700',
}

export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: BadgeTone
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-small font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

/**
 * ExampleLabel — Constitution §42, specs.md §8 contract 4.
 *
 * MANDATORY on any component rendering illustrative figures. The constitution
 * forbids blurring demonstration and verified fact, and an unlabelled mock
 * dashboard is exactly that blur. The label pairs an icon with text so it is
 * never conveyed by colour alone (§21).
 */
export function ExampleLabel({
  className,
  children = 'Example — illustrative data, not client results',
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-surface-muted px-3 py-1 text-small font-medium text-ink-700',
        className
      )}
    >
      <Icon name="alert" className="size-4 shrink-0" />
      {children}
    </span>
  )
}
