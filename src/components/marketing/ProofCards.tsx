import Link from 'next/link'
import { Icon } from '@/components/primitives/Icon'
import {
  Container,
  Section,
  SectionHeading,
} from '@/components/primitives/Section'
import { marketplaces } from '@/content/marketplaces'
import { caseStudies, testimonials } from '@/content/proof'
import type { CaseStudy, Testimonial } from '@/content/types'

/**
 * Proof components — specs.md §5.5, §5.6
 *
 * These are BUILT BUT CURRENTLY UNUSED, because `caseStudies` and
 * `testimonials` are empty (specs.md D2). They exist so that adding a real,
 * permitted record is a data edit rather than a UI build.
 *
 * They are deliberately not exercised with sample data anywhere in the app.
 * A "preview" of a fake testimonial has a way of surviving into production.
 */

function marketplaceName(id: string): string {
  return marketplaces.find((m) => m.id === id)?.name ?? id
}

/* ================================================================== */
/* Gated sections                                                      */
/* ================================================================== */

/**
 * The gating lives HERE rather than in each page, so the rule "render nothing
 * when there is no permitted evidence" sits next to the data it guards and
 * cannot be forgotten by a future page author (plan.md D-D).
 *
 * Both return null on an empty array. No shell, no "coming soon", no
 * placeholder avatars (Constitution §41, §48 Rule 8).
 */

export function CaseStudiesSection() {
  if (caseStudies.length === 0) return null

  return (
    <Section labelledBy="cases-heading">
      <Container>
        <SectionHeading
          id="cases-heading"
          eyebrow="Evidence"
          title="Case studies"
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <li key={item.slug}>
              <CaseStudyCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export function TestimonialsSection() {
  if (testimonials.length === 0) return null

  return (
    <Section labelledBy="testimonials-heading">
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="What clients say"
          title="Testimonials"
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.authorName}>
              <TestimonialCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${item.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm transition-[border-color,box-shadow] hover:border-ink-900/25 hover:shadow-md"
    >
      <span className="inline-flex self-start rounded-full border border-line px-3 py-1 text-small font-semibold text-ink-700">
        {marketplaceName(item.marketplace)}
      </span>

      <h3 className="mt-4 text-h3">{item.title}</h3>

      <p className="mt-3 flex-1 text-body text-ink-700">{item.challenge}</p>

      {/* Timeframe is required by the type — no result renders without context */}
      <p className="mt-4 text-small text-ink-500">
        <span className="font-semibold text-ink-700">Timeframe:</span>{' '}
        {item.timeframe}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-body font-semibold text-accent-700">
        Read the case study
        <Icon
          name="arrow"
          className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm">
      <Icon name="message" className="size-6 text-accent-700" />

      <blockquote className="mt-4 flex-1">
        <p className="text-body text-ink-700">{item.quote}</p>
      </blockquote>

      <figcaption className="mt-5 border-t border-line pt-4">
        <span className="block text-body font-semibold text-ink-900">
          {item.authorName}
        </span>
        {item.authorRole || item.company ? (
          <span className="mt-0.5 block text-small text-ink-500">
            {[item.authorRole, item.company].filter(Boolean).join(', ')}
          </span>
        ) : null}
        {item.marketplace ? (
          <span className="mt-2 inline-flex rounded-full border border-line px-2.5 py-0.5 text-small text-ink-700">
            {marketplaceName(item.marketplace)}
          </span>
        ) : null}
      </figcaption>
    </figure>
  )
}
