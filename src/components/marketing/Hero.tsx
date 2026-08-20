import { Container } from '@/components/primitives/Section'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { MarketplaceStrip } from '@/components/marketplace/MarketplaceBadge'
import { DashboardVisual } from '@/components/marketplace/DashboardVisual'
import { site } from '@/content/site'

/**
 * Home hero — Constitution §6, specs.md §5.1.1
 *
 * Answers the five questions from Constitution §1.4 above the fold: what this
 * is, which marketplaces, what problems it solves, why it is credible, and
 * what to do next.
 *
 * No numbers, no tenure claims, no "trusted by" (specs.md §2.3).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-muted">
      {/* Soft radial wash. Purely decorative depth - no information here. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_32rem_at_15%_-10%,rgba(194,86,8,0.07),transparent_60%),radial-gradient(50rem_28rem_at_95%_10%,rgba(10,26,47,0.06),transparent_60%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-10 py-14 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="lg:col-span-6">
            <h1 className="max-w-2xl text-h1 text-balance">
              Grow your eBay, Amazon and TikTok Shop store with expert
              marketplace management
            </h1>

            <p className="mt-6 max-w-xl text-body-lg text-ink-700">
              We handle product research, listing optimization, order management
              and customer support, so your store runs properly and keeps
              improving.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                {site.primaryCtaLabel}
                <Icon name="arrow" className="size-5" />
              </Button>
              <Button href="/services#process" variant="secondary" size="lg">
                {site.secondaryCtaLabel}
              </Button>
            </div>

            <p className="mt-4 text-small text-ink-500">
              No cost and no obligation. We will tell you if we are not the
              right fit.
            </p>

            <MarketplaceStrip className="mt-10" />
          </div>

          <div className="lg:col-span-6">
            {/*
              The dashboard is no longer aria-hidden - its tabs are real
              controls - so its content is announced directly and does not need
              a duplicate summary. This line only establishes that the figures
              are illustrative, which Constitution §42 requires.
            */}
            <p className="sr-only">
              The following is an example store overview. All figures are
              illustrative, not client results.
            </p>
            <DashboardVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}

/**
 * Compact hero for interior pages. Same structure, one CTA, no visual —
 * interior pages earn attention with content, not with repeated ornament.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <section className="border-b border-line bg-surface-muted">
      <Container>
        <div className="max-w-3xl py-14 md:py-20">
          {eyebrow ? (
            <p className="mb-3 text-small font-semibold tracking-wide text-accent-700 uppercase">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-h1 text-balance">{title}</h1>

          <p className="mt-5 text-body-lg text-ink-700">{description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg">
              {site.primaryCtaLabel}
              <Icon name="arrow" className="size-5" />
            </Button>
            {children}
          </div>
        </div>
      </Container>
    </section>
  )
}
