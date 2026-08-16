import type { Metadata } from 'next'
import { Container, Section, SectionHeading } from '@/components/primitives/Section'
import { Icon } from '@/components/primitives/Icon'
import { PageHero } from '@/components/marketing/Hero'
import { ValueGrid, CTASection, LimitationsNote } from '@/components/marketing/Blocks'
import { valueProps } from '@/content/home'
import { team } from '@/content/proof'
import { site } from '@/content/site'
import { buildMetadata, jsonLd, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'How we work with marketplace sellers on eBay, Amazon and TikTok Shop — our operating principles, scope, and what we will not do.',
  path: '/about',
})

/**
 * About page.
 *
 * Deliberately absent: founding year, years of experience, client counts,
 * team photos, and any claim of track record (specs.md §2.3, §5.6). The page
 * reads as complete without them because it is built around how the work is
 * done rather than how long it has been done for.
 */
export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow="About"
        title="Marketplace operations, handled properly"
        description={`${site.businessName} works with eBay, Amazon and TikTok Shop sellers on the operational side of running a store: what to sell, how it is listed, how orders are handled, and how buyers are looked after.`}
      />

      {/* --- Position -------------------------------------------------- */}
      <Section labelledBy="approach-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 id="approach-heading" className="text-h2">
                Why this work is worth doing well
              </h2>
              <div className="measure mt-6 flex flex-col gap-5 text-body-lg text-ink-700">
                <p>
                  Most marketplace stores do not fail because of one bad
                  decision. They drift. Listings get built quickly and never
                  revisited. Dispatch slips by a day, then two. Buyer messages
                  wait until the evening, and then until the weekend. None of it
                  looks serious on any given day, and all of it is being
                  recorded by the marketplace.
                </p>
                <p>
                  The work we do is mostly unglamorous: complete the item
                  specifics, upload the tracking before the deadline, answer the
                  message before it becomes a case, check that the listing still
                  matches what can actually be shipped. Done consistently, that
                  is what keeps a store in good standing and lets the growth
                  work matter.
                </p>
                <p>
                  We would rather explain the reasoning behind a recommendation
                  than ask you to trust it. If you want to challenge a product
                  shortlist or a pricing decision, the thinking behind it should
                  be written down and available for you to argue with.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl border border-line bg-surface-muted p-6 md:p-7">
                <h3 className="text-h3">Where we work</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {[
                    'eBay — listings, item specifics, dispatch, buyer cases',
                    'Amazon — catalog accuracy, detail pages, account health',
                    'TikTok Shop — product setup, approval, fulfilment deadlines',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-body text-ink-700">
                      <Icon
                        name="check"
                        className="mt-1 size-4.5 shrink-0 text-accent-700"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-h3">Who we work with</h3>
                <p className="mt-3 text-body text-ink-700">
                  Sellers who are starting out, sellers whose stores have
                  stalled, and sellers who simply do not have the hours the
                  operational work demands. Both dropshipping and own-inventory
                  sellers.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Operating principles -------------------------------------- */}
      <Section tone="muted" labelledBy="principles-heading">
        <Container>
          <SectionHeading
            id="principles-heading"
            eyebrow="How we operate"
            title="Operating principles"
          />
          <div className="mt-12">
            <ValueGrid items={valueProps} />
          </div>
        </Container>
      </Section>

      {/* --- Team — gated (specs.md §5.6) ------------------------------ */}
      {team.length > 0 ? (
        <Section labelledBy="team-heading">
          <Container>
            <SectionHeading
              id="team-heading"
              eyebrow="Team"
              title="Who you will be working with"
            />
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <li key={member.name}>
                  <h3 className="text-h3">{member.name}</h3>
                  <p className="mt-1 text-body font-medium text-accent-700">
                    {member.role}
                  </p>
                  <p className="mt-3 text-body text-ink-700">{member.bio}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* --- Boundaries -------------------------------------------------- */}
      <Section tone={team.length > 0 ? 'muted' : 'default'}>
        <Container>
          <div className="mx-auto max-w-3xl">
            <LimitationsNote title="What we will not do">
              We do not write, buy or arrange reviews. We do not manipulate
              feedback or use artificial engagement. We do not attempt to work
              around marketplace rules, and we do not claim any affiliation
              with, endorsement by, or certification from eBay, Amazon or
              TikTok. We do not promise guaranteed sales, rankings, revenue or
              feedback, because those outcomes depend on buyer behaviour and
              marketplace decisions that nobody controls. Anyone offering you a
              guarantee on those is either misunderstanding the platform or
              misrepresenting it.
            </LimitationsNote>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Talk to us about your store"
        description="Tell us what is happening and what you are aiming for. We will tell you what we would do about it, and whether we are the right people for it."
      />
    </>
  )
}
