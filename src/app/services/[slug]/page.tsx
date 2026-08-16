import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, Section, SectionHeading } from '@/components/primitives/Section'
import { Icon } from '@/components/primitives/Icon'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/marketing/Hero'
import {
  ProcessTimeline,
  CTASection,
  LimitationsNote,
} from '@/components/marketing/Blocks'
import { MarketplaceGrid } from '@/components/marketplace/MarketplaceBadge'
import { ResearchMatrix } from '@/components/marketplace/ResearchMatrix'
import { ListingPreview } from '@/components/marketplace/ListingPreview'
import { services, getService } from '@/content/services'
import {
  buildMetadata,
  jsonLd,
  breadcrumbSchema,
  serviceSchema,
} from '@/lib/seo'

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

/** Only two services carry an illustrative visual — the rest earn it with copy. */
function ServiceVisual({ slug }: { slug: string }) {
  if (slug === 'product-research') return <ResearchMatrix />
  if (slug === 'listing-optimization') return <ListingPreview />
  return null
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) notFound()

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.navLabel, path: `/services/${service.slug}` },
  ]

  const visual = ServiceVisual({ slug })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema(trail),
            serviceSchema({
              name: service.title,
              description: service.shortDescription,
              path: `/services/${service.slug}`,
            })
          ),
        }}
      />

      <PageHero
        eyebrow={service.kind === 'offering' ? 'Packaged offering' : 'Service'}
        title={service.title}
        description={service.shortDescription}
      />

      {/* --- Overview + inclusions ----------------------------------- */}
      <Section labelledBy="overview-heading">
        <Container>
          <Breadcrumbs trail={trail} />

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 id="overview-heading" className="text-h2">
                What this involves
              </h2>
              <p className="measure mt-5 text-body-lg text-ink-700">
                {service.longDescription}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl border border-line bg-surface-muted p-6 md:p-7">
                <h3 className="flex items-center gap-2.5 text-h3">
                  <Icon
                    name={service.icon}
                    className="size-5 shrink-0 text-accent-700"
                  />
                  What is included
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-body text-ink-700">
                      <Icon
                        name="check"
                        className="mt-1 size-4.5 shrink-0 text-accent-700"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Visual, where one adds something ------------------------ */}
      {visual ? (
        <Section tone="muted">
          <Container>{visual}</Container>
        </Section>
      ) : null}

      {/* --- Process -------------------------------------------------- */}
      <Section
        tone={visual ? 'default' : 'muted'}
        labelledBy="process-heading"
      >
        <Container>
          <SectionHeading
            id="process-heading"
            eyebrow="Process"
            title="How the work runs"
          />
          <div className="mt-12">
            <ProcessTimeline steps={service.process} />
          </div>
        </Container>
      </Section>

      {/* --- Deliverables + limitations ------------------------------- */}
      <Section tone={visual ? 'muted' : 'default'}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-h2">What you receive</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-ink-700">
                    <Icon
                      name="check"
                      className="mt-1 size-4.5 shrink-0 text-accent-700"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Constitution §3.3 — every service page states its limits */}
            <LimitationsNote>{service.limitations}</LimitationsNote>
          </div>
        </Container>
      </Section>

      {/* --- Marketplaces --------------------------------------------- */}
      <Section labelledBy="where-heading">
        <Container>
          <SectionHeading
            id="where-heading"
            eyebrow="Where this applies"
            title={`${service.title} on your marketplace`}
            description="Available on all three platforms. What changes is the terminology, the metrics, and what the marketplace penalises."
          />
          <div className="mt-12">
            <MarketplaceGrid />
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
