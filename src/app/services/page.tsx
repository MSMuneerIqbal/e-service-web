import type { Metadata } from 'next'
import { Container, Section, SectionHeading } from '@/components/primitives/Section'
import { PageHero } from '@/components/marketing/Hero'
import { ServiceCard, OfferingCard } from '@/components/marketing/ServiceCard'
import {
  ProcessTimeline,
  CTASection,
  LimitationsNote,
} from '@/components/marketing/Blocks'
import { MarketplaceGrid } from '@/components/marketplace/MarketplaceBadge'
import { coreServices, offerings } from '@/content/services'
import { processSteps } from '@/content/home'
import { buildMetadata, jsonLd, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Marketplace Management Services for eBay, Amazon & TikTok Shop',
  description:
    'Product research, listing optimization, order management, customer support, and complete store management for marketplace sellers.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow="Services"
        title="eBay, Amazon and TikTok Shop marketplace services"
        description="Four core services that can be taken individually, and two packaged offerings that combine them. Everything is available across all three marketplaces."
      />

      {/* --- Offerings ----------------------------------------------- */}
      <Section labelledBy="offerings-heading">
        <Container>
          <SectionHeading
            id="offerings-heading"
            eyebrow="Packaged offerings"
            title="Hand over the whole operation"
            description="Most sellers do not have a listing problem or an order problem. They have a capacity problem."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {offerings.map((service) => (
              <OfferingCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Core services -------------------------------------------- */}
      <Section tone="muted" labelledBy="core-heading">
        <Container>
          <SectionHeading
            id="core-heading"
            eyebrow="Core services"
            title="Or take just the part you need"
            description="Each of these can run on its own. They are also the four components inside Complete Store Management."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* --- Process --------------------------------------------------- */}
      <Section tone="dark" id="process" labelledBy="process-heading">
        <Container>
          <SectionHeading
            id="process-heading"
            eyebrow="How it works"
            title="The operating cycle"
            description="The same five steps whether we run one service or the entire store."
            tone="dark"
          />
          <div className="mt-12">
            <ProcessTimeline steps={processSteps} tone="dark" />
          </div>
        </Container>
      </Section>

      {/* --- Marketplaces ---------------------------------------------- */}
      <Section id="marketplaces" labelledBy="marketplaces-heading">
        <Container>
          <SectionHeading
            id="marketplaces-heading"
            eyebrow="Marketplaces"
            title="Choose your platform"
            description="Each marketplace ranks, measures and penalises sellers differently. These pages set out what changes on each one."
          />
          <div className="mt-12">
            <MarketplaceGrid />
          </div>
        </Container>
      </Section>

      {/* --- Scope boundary -------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <div className="mx-auto max-w-3xl">
            <LimitationsNote title="What is not included">
              We do not write, buy or arrange reviews, manipulate feedback, use
              artificial engagement, or work around marketplace rules. We do not
              produce video or photography, run paid advertising campaigns, or
              handle company formation and tax. We do not guarantee sales,
              rankings, revenue or feedback, because those depend on buyer
              behaviour and marketplace decisions that no agency controls. If
              something you need falls outside this, we will tell you at the
              consultation rather than after the invoice.
            </LimitationsNote>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
