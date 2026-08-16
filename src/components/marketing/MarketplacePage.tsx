import { Container, Section, SectionHeading } from '@/components/primitives/Section'
import { Icon } from '@/components/primitives/Icon'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from './Hero'
import { ServiceCard, OfferingCard } from './ServiceCard'
import { ProcessTimeline, CTASection, LimitationsNote } from './Blocks'
import { FAQAccordion } from './FAQAccordion'
import { MarketplaceBadge } from '@/components/marketplace/MarketplaceBadge'
import { coreServices, offerings } from '@/content/services'
import { faqsFor } from '@/content/faqs'
import type { MarketplaceProfile } from '@/content/types'

/**
 * Shared marketplace page — specs.md §5.4
 *
 * The LAYOUT is shared; the CONTENT is not. Every word rendered here comes from
 * that marketplace's own record in marketplaces.ts, which carries its own
 * vocabulary, workflow, audience and FAQ set. Constitution §22.2 treats
 * find-and-replace pages as a quality failure, so the uniqueness lives in the
 * data rather than in three duplicated templates.
 *
 * Brand safety (§43): no marketplace logos, no marketplace brand colours, and
 * no wording implying affiliation, partnership or certification.
 */
export function MarketplacePage({ profile }: { profile: MarketplaceProfile }) {
  const faqs = faqsFor(`/${profile.slug}`)

  const trail = [
    { name: 'Home', path: '/' },
    { name: profile.name, path: `/${profile.slug}` },
  ]

  return (
    <>
      <PageHero
        eyebrow={`${profile.name} services`}
        title={profile.heading}
        description={profile.intro}
      />

      {/* --- Platform vocabulary ------------------------------------- */}
      <Section labelledBy="terms-heading">
        <Container>
          <Breadcrumbs trail={trail} />

          <SectionHeading
            id="terms-heading"
            eyebrow={`${profile.name} specifics`}
            title={`What actually matters on ${profile.name}`}
            description="These are the mechanics that decide how your products are found, ranked and judged. Explained in plain language, and in terms of what each one means for your store."
          />

          <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {profile.platformTerms.map((term) => (
              <li key={term.term}>
                <h3 className="text-h3">{term.term}</h3>
                <p className="mt-2.5 text-body text-ink-700">
                  {term.explanation}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* --- Workflow ------------------------------------------------- */}
      <Section tone="dark" labelledBy="workflow-heading">
        <Container>
          <SectionHeading
            id="workflow-heading"
            eyebrow="How we work"
            title={`Running a ${profile.name} store day to day`}
            tone="dark"
          />
          <div className="mt-12">
            <ProcessTimeline steps={profile.workflow} tone="dark" />
          </div>
        </Container>
      </Section>

      {/* --- Services ------------------------------------------------- */}
      <Section labelledBy="services-heading">
        <Container>
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title={`What we handle on ${profile.name}`}
            description="Take a single service, or hand over the store end to end."
          />

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

      {/* --- Audience + compliance ------------------------------------ */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-h2">Who this is for</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {profile.audience.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-ink-700">
                    <Icon
                      name="check"
                      className="mt-1 size-4.5 shrink-0 text-accent-700"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <MarketplaceBadge id={profile.id} name={profile.name} />
              </div>
            </div>

            {/* Constitution §16 — policy-conscious positioning */}
            <LimitationsNote title="Working within the rules">
              Everything we do on {profile.name} stays inside the platform&rsquo;s
              published policies. We do not write, buy or arrange reviews,
              manipulate feedback, use artificial engagement, or attempt to work
              around the rules that govern seller accounts. Those tactics put the
              account your income depends on at risk, and the account is harder
              to get back than the short-term gain is worth. If a request would
              cross that line, we will say so rather than quietly do it.
            </LimitationsNote>
          </div>
        </Container>
      </Section>

      {/* --- FAQ ------------------------------------------------------- */}
      {faqs.length > 0 ? (
        <Section labelledBy="faq-heading">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionHeading
                  id="faq-heading"
                  eyebrow="Questions"
                  title={`${profile.name} questions`}
                />
              </div>
              <div className="lg:col-span-8">
                <FAQAccordion items={faqs} />
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <CTASection />
    </>
  )
}
