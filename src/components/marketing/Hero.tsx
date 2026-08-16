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
    <section className="border-b border-line bg-surface-muted">
      <Container>
        <div className="grid items-center gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-6">
            <h1 className="text-h1 text-balance">
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
              Text summary of the adjacent visual. The dashboard itself is
              aria-hidden, so this carries the meaning for assistive tech (§21).
            */}
            <p className="sr-only">
              Illustration: a store overview showing weekly order trends, live
              listing counts, and a daily queue of dispatches, tracking uploads
              and buyer messages. All figures shown are examples.
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
