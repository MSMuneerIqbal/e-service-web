import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/primitives/Section'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/marketing/Hero'
import { CTASection } from '@/components/marketing/Blocks'
import { marketplaces } from '@/content/marketplaces'
import { caseStudies, getCaseStudy } from '@/content/proof'
import { buildMetadata, jsonLd, breadcrumbSchema } from '@/lib/seo'

/** Empty while there are no permitted case studies — no routes are generated. */
export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getCaseStudy(slug)
  if (!item) return {}

  return buildMetadata({
    title: item.title,
    description: item.challenge.slice(0, 155),
    path: `/case-studies/${item.slug}`,
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getCaseStudy(slug)

  if (!item) notFound()

  const marketplace =
    marketplaces.find((m) => m.id === item.marketplace)?.name ?? item.marketplace

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: item.title, path: `/case-studies/${item.slug}` },
  ]

  // Constitution §10 structure. Timeframe is a required field on the type, so
  // a result can never render without the context needed to read it correctly.
  const sections = [
    { heading: 'The challenge', body: item.challenge },
    { heading: 'Strategy', body: item.strategy },
    { heading: 'Execution', body: item.execution },
    { heading: 'Result', body: item.result },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(trail)) }}
      />

      <PageHero
        eyebrow={`${marketplace} case study`}
        title={item.title}
        description={`Timeframe: ${item.timeframe}`}
      />

      <Section>
        <Container>
          <Breadcrumbs trail={trail} />

          <div className="measure flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-h2">{section.heading}</h2>
                <p className="mt-4 text-body-lg text-ink-700">{section.body}</p>
              </div>
            ))}

            {item.evidence && item.evidence.length > 0 ? (
              <div>
                <h2 className="text-h2">Evidence</h2>
                <ul className="mt-6 flex flex-col gap-6">
                  {item.evidence.map((evidence) => (
                    <li key={evidence.src}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={evidence.src}
                        alt={evidence.alt}
                        className="w-full rounded-lg border border-line"
                      />
                      <p className="mt-2 text-small text-ink-500">
                        {evidence.caption}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="rounded-lg border border-line bg-surface-muted p-5 text-small text-ink-700">
              Published with the client&rsquo;s permission. Results described
              here reflect one store over the stated timeframe and are not a
              prediction of what another store will achieve.
            </p>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
