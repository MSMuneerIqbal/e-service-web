import type { Metadata } from 'next'
import { Container, Section } from '@/components/primitives/Section'
import { EmptyState, CTASection } from '@/components/marketing/Blocks'
import { CaseStudyCard } from '@/components/marketing/ProofCards'
import { PageHero } from '@/components/marketing/Hero'
import { caseStudies } from '@/content/proof'
import { buildMetadata } from '@/lib/seo'

/**
 * Case studies — specs.md §5.5
 *
 * The route exists so a real case study is a data addition rather than a build.
 * While `caseStudies` is empty the page is noindex and excluded from the
 * sitemap and the primary navigation. It shows an honest empty state rather
 * than invented cards (Constitution §41, §48 Rule 2).
 */
export const metadata: Metadata = buildMetadata({
  title: 'Case Studies',
  description:
    'Case studies from marketplace management engagements, published only with client permission.',
  path: '/case-studies',
  noindex: caseStudies.length === 0,
})

export default function CaseStudiesPage() {
  const hasAny = caseStudies.length > 0

  return (
    <>
      <PageHero
        eyebrow="Evidence"
        title="Case studies"
        description="Detailed accounts of marketplace engagements — the situation, what was done, and what changed."
      />

      <Section>
        <Container>
          {hasAny ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((item) => (
                <li key={item.slug}>
                  <CaseStudyCard item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon="shield"
              title="No case studies published yet"
              description="We publish case studies only where a client has given written permission to share the details, and only with enough context — timeframe, marketplace, starting position — for the result to mean something. Nothing is published without that. Until then, the service pages set out exactly how the work is done."
              action={{ label: 'See how we work', href: '/services' }}
            />
          )}
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
