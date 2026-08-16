import { cn } from '@/lib/utils'

/**
 * Layout primitives — specs.md §7.3
 *
 * Section owns ALL vertical rhythm. Sibling components never set their own
 * top/bottom margins. This is what allows a gated section to return null
 * without leaving a gap or doubling the spacing around the hole
 * (specs.md §5.1, D-D).
 */

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1200px] px-5 md:px-6', className)}>
      {children}
    </div>
  )
}

type Tone = 'default' | 'muted' | 'dark'

const tones: Record<Tone, string> = {
  default: 'bg-surface',
  muted: 'bg-surface-muted',
  // `on-dark` switches the focus ring to a colour that survives the navy ground
  dark: 'bg-navy-900 text-white on-dark',
}

interface SectionProps {
  tone?: Tone
  /** Renders as <section> unless a landmark-free wrapper is wanted */
  as?: 'section' | 'div'
  id?: string
  className?: string
  /** Ties the section to its heading for assistive tech */
  labelledBy?: string
  children: React.ReactNode
}

export function Section({
  tone = 'default',
  as: Tag = 'section',
  id,
  className,
  labelledBy,
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      // Tightened from py-16/24/32. The original rhythm left sections feeling
      // sparse rather than generous, especially where a short text column sat
      // beside a tall visual.
      className={cn('py-14 md:py-20 lg:py-24', tones[tone], className)}
    >
      {children}
    </Tag>
  )
}

interface SectionHeadingProps {
  /** Small label above the heading. Never the only carrier of meaning. */
  eyebrow?: string
  title: string
  description?: string
  id?: string
  /** h2 by default; pass h1 only on a page's single top-level heading */
  as?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  as: Tag = 'h2',
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const isDark = tone === 'dark'

  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 text-small font-semibold tracking-wide uppercase',
            isDark ? 'text-accent-400' : 'text-accent-700'
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <Tag
        id={id}
        className={cn(
          Tag === 'h1' ? 'text-h1' : 'text-h2',
          isDark && 'text-white'
        )}
      >
        {title}
      </Tag>

      {description ? (
        <p
          className={cn(
            'mt-5 text-body-lg',
            isDark ? 'text-white/75' : 'text-ink-700'
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
