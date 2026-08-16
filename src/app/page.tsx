import type { Metadata } from 'next'
import { Container, Section, SectionHeading } from '@/components/primitives/Section'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Reveal } from '@/components/layout/Reveal'
import { Hero } from '@/components/marketing/Hero'
import { ServiceCard, OfferingCard } from '@/components/marketing/ServiceCard'
import {
  FeatureBlock,
  ValueGrid,
  ProcessTimeline,
  JourneySteps,
  CTASection,
} from '@/components/marketing/Blocks'
import { FAQAccordion } from '@/components/marketing/FAQAccordion'
import {
  CaseStudiesSection,
  TestimonialsSection,
} from '@/components/marketing/ProofCards'
import { ListingPreview } from '@/components/marketplace/ListingPreview'
import { ResearchMatrix } from '@/components/marketplace/ResearchMatrix'
import { MarketplaceGrid } from '@/components/marketplace/MarketplaceBadge'
import { coreServices, offerings } from '@/content/services'
import {
  valueProps,
  processSteps,
  launchJourney,
  homeSections as copy,
} from '@/content/home'
import { faqsFor } from '@/content/faqs'
import { buildMetadata, jsonLd, faqSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'eBay, Amazon & TikTok Shop Store Management Services',
  description:
    'Product research, listing optimization, order management and customer support for marketplace sellers. Free consultation, no obligation.',
  path: '/',
})

export default function HomePage() {
  const faqs = faqsFor('/')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }}
      />

      <Hero />

      <Section labelledBy="services-heading">
        <Container>
          <SectionHeading id="services-heading" {...copy.services} />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {offerings.map((service) => (
              <OfferingCard key={service.slug} service={service} />
            ))}
          </div>

          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/*
        FeatureBlock, not FeatureSplit: both visuals are themselves
        multi-column compositions and were being crushed into a half-width
        column. See the component comment.
      */}
      <Section tone="muted">
        <Container>
          <Reveal>
            <FeatureBlock
              {...copy.research}
              visual={<ResearchMatrix />}
              cta={{ label: 'How research works', href: '/services/product-research' }}
            />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <FeatureBlock
              {...copy.listing}
              visual={<ListingPreview />}
              cta={{
                label: 'How optimization works',
                href: '/services/listing-optimization',
              }}
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="dark" id="process" labelledBy="process-heading">
        <Container>
          <SectionHeading id="process-heading" {...copy.process} tone="dark" />
          <div className="mt-12">
            <ProcessTimeline steps={processSteps} tone="dark" />
          </div>
        </Container>
      </Section>

      <Section tone="muted" labelledBy="launch-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading id="launch-heading" {...copy.launch} />
              <Button
                href="/services/new-store-launch"
                variant="secondary"
                className="mt-8"
              >
                New store launch support
                <Icon name="arrow" className="size-4" />
              </Button>
            </div>
            <div className="flex flex-col justify-center">
              <JourneySteps steps={launchJourney} />
              <p className="mt-6 text-body text-ink-700">{copy.launch.note}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Self-gating: renders nothing until permitted evidence exists (D-D) */}
      <CaseStudiesSection />

      <Section id="marketplaces" labelledBy="marketplaces-heading">
        <Container>
          <SectionHeading id="marketplaces-heading" {...copy.marketplaces} />
          <div className="mt-12">
            <MarketplaceGrid />
          </div>
        </Container>
      </Section>

      <Section tone="muted" labelledBy="why-heading">
        <Container>
          <SectionHeading id="why-heading" {...copy.why} />
          <div className="mt-12">
            <ValueGrid items={valueProps} />
          </div>
        </Container>
      </Section>

      <TestimonialsSection />

      <Section labelledBy="faq-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading id="faq-heading" {...copy.faq} />
            </div>
            <div className="lg:col-span-8">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
