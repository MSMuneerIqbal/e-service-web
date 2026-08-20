import { Icon } from '@/components/primitives/Icon'
import { Button } from '@/components/primitives/Button'
import { Container, Section, SectionHeading } from '@/components/primitives/Section'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'
import type { IconName } from '@/content/types'

/* ================================================================== */
/* FeatureSplit — text on one side, a visual on the other              */
/* ================================================================== */

export function FeatureSplit({
  eyebrow,
  title,
  description,
  points,
  visual,
  reverse = false,
  cta,
}: {
  eyebrow?: string
  title: string
  description: string
  /** readonly so `as const` content modules can be spread in directly */
  points?: readonly string[]
  visual: React.ReactNode
  reverse?: boolean
  cta?: { label: string; href: string }
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className={cn(reverse && 'lg:order-2')}>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {points ? (
          <ul className="mt-7 flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-body text-ink-700">
                <Icon
                  name="check"
                  className="mt-1 size-4.5 shrink-0 text-accent-700"
                />
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        {cta ? (
          <Button href={cta.href} variant="secondary" className="mt-8">
            {cta.label}
            <Icon name="arrow" className="size-4" />
          </Button>
        ) : null}
      </div>

      <div className={cn('min-w-0', reverse && 'lg:order-1')}>{visual}</div>
    </div>
  )
}

/* ================================================================== */
/* FeatureBlock — heading above, visual full width below               */
/* ================================================================== */

/**
 * Use this instead of FeatureSplit whenever the visual is itself a
 * multi-column composition.
 *
 * FeatureSplit puts the visual in a half-width column. Nesting the
 * before/after listing comparison inside it gave each card roughly a quarter
 * of the page - titles wrapped to nine lines and a large dead space opened up
 * beneath the shorter text column. This layout gives the visual the full
 * container width and reads far better at every breakpoint.
 */
export function FeatureBlock({
  eyebrow,
  title,
  description,
  points,
  visual,
  cta,
}: {
  eyebrow?: string
  title: string
  description: string
  points?: readonly string[]
  visual: React.ReactNode
  cta?: { label: string; href: string }
}) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </div>

        {points ? (
          <div className="lg:col-span-5 lg:pt-2">
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-1">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-body text-ink-700">
                  <Icon
                    name="check"
                    className="mt-1 size-4.5 shrink-0 text-accent-700"
                  />
                  {point}
                </li>
              ))}
            </ul>

            {cta ? (
              <Button href={cta.href} variant="secondary" className="mt-6">
                {cta.label}
                <Icon name="arrow" className="size-4" />
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-12 min-w-0">{visual}</div>
    </div>
  )
}

/* ================================================================== */
/* ValueGrid — differentiators                                         */
/* ================================================================== */

export function ValueGrid({
  items,
}: {
  items: readonly { icon: IconName; title: string; description: string }[]
}) {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.title}>
          <span className="inline-flex size-11 items-center justify-center rounded-lg bg-accent-600/10 text-accent-700">
            <Icon name={item.icon} className="size-5.5" />
          </span>
          <h3 className="mt-4 text-h3">{item.title}</h3>
          <p className="mt-2.5 text-body text-ink-700">{item.description}</p>
        </li>
      ))}
    </ul>
  )
}

/* ================================================================== */
/* ProcessTimeline — numbered, ordered steps                           */
/* ================================================================== */

export function ProcessTimeline({
  steps,
  tone = 'light',
}: {
  steps: readonly { title: string; description: string }[]
  tone?: 'light' | 'dark'
}) {
  const isDark = tone === 'dark'

  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="relative">
          <span
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full text-body font-bold',
              isDark
                ? 'bg-white/10 text-accent-400'
                : 'bg-navy-900 text-white'
            )}
          >
            {index + 1}
          </span>
          <h3
            className={cn('mt-4 text-h3', isDark && 'text-white')}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              'mt-2.5 text-body',
              isDark ? 'text-white/75' : 'text-ink-700'
            )}
          >
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  )
}

/* ================================================================== */
/* JourneySteps — a horizontal path (New Store -> ... -> Growth)       */
/* ================================================================== */

export function JourneySteps({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-small font-semibold text-ink-900">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <Icon
              name="arrow"
              className="size-4 shrink-0 text-ink-500"
            />
          ) : null}
        </li>
      ))}
    </ol>
  )
}

/* ================================================================== */
/* LimitationsNote — the honesty block every service page carries      */
/* ================================================================== */

/**
 * Constitution §3.3 and §40. Stating a limitation next to a claim is what
 * makes the claim credible; it is a trust device, not a disclaimer.
 */
export function LimitationsNote({
  title = 'Being straight with you',
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-line bg-surface-muted p-6 md:p-8">
      <h3 className="flex items-center gap-2.5 text-h3">
        <Icon name="shield" className="size-5 shrink-0 text-accent-700" />
        {title}
      </h3>
      <p className="measure mt-3 text-body text-ink-700">{children}</p>
    </div>
  )
}

/* ================================================================== */
/* CTASection — the single closing action on every page                */
/* ================================================================== */

export function CTASection({
  title = 'Find out what your store actually needs',
  description = 'Tell us where your store is now and what is not working. We will tell you what we would do about it, in what order, and whether we are the right people for it.',
}: {
  title?: string
  description?: string
}) {
  return (
    <Section tone="dark" labelledBy="cta-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            id="cta-heading"
            title={title}
            description={description}
            align="center"
            tone="dark"
            className="mx-auto"
          />
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="/contact" size="lg">
              {site.primaryCtaLabel}
              <Icon name="arrow" className="size-5" />
            </Button>
            <Button
              href="/services"
              variant="secondary"
              size="lg"
              className="border-white/25 bg-transparent text-white hover:border-white/50 hover:bg-white/10"
            >
              Explore services
            </Button>
          </div>
          <p className="mt-5 text-small text-white/60">
            Free consultation. No obligation to continue.
          </p>
        </div>
      </Container>
    </Section>
  )
}

/* ================================================================== */
/* EmptyState — for gated sections that have a route but no content    */
/* ================================================================== */

/**
 * Constitution §35. An honest empty state beats a fabricated filled one, and
 * beats a "coming soon" placeholder that says nothing.
 */
export function EmptyState({
  icon = 'message',
  title,
  description,
  action,
}: {
  icon?: IconName
  title: string
  description: string
  action?: { label: string; href: string }
}) {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-line bg-surface-muted p-10 text-center">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface text-ink-500 shadow-sm">
        <Icon name={icon} className="size-6" />
      </span>
      <h2 className="mt-5 text-h3">{title}</h2>
      <p className="mt-3 text-body text-ink-700">{description}</p>
      {action ? (
        <Button href={action.href} className="mt-7">
          {action.label}
        </Button>
      ) : null}
    </div>
  )
}
