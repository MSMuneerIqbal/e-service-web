import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/primitives/Section'
import { Icon } from '@/components/primitives/Icon'
import { site } from '@/content/site'
import { buildMetadata } from '@/lib/seo'

/**
 * Terms — specs.md §5.9
 *
 * Deliberately NOT filled with generic boilerplate. Service terms describe a
 * commercial relationship (scope, payment, liability, termination) that has not
 * been confirmed, and inventing them would be fabricating business facts —
 * exactly what Constitution §48 Rules 1 and 10 forbid.
 *
 * What IS stated below is limited to things verifiable from this website
 * itself. The rest is marked as outstanding (CLIENT_INPUTS.md item 6).
 */
export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions',
  description:
    'Terms governing the use of this website and the basis on which its content is provided.',
  path: '/terms',
  noindex: true,
})

export default function TermsPage() {
  return (
    <Section>
      <Container>
        <div className="measure">
          <h1 className="text-h1">Terms &amp; Conditions</h1>

          <div className="mt-8 flex items-start gap-3 rounded-lg border border-line bg-surface-muted p-5">
            <Icon
              name="alert"
              className="mt-0.5 size-5 shrink-0 text-accent-700"
            />
            <p className="text-small text-ink-700">
              <span className="font-semibold text-ink-900">
                Awaiting legal review.
              </span>{' '}
              Terms covering engagements, payment and liability are being
              prepared with professional advice and will be published here
              before launch. We have not filled this page with generic
              boilerplate, because terms you cannot rely on are worse than terms
              that are visibly still coming.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-9">
            <section>
              <h2 className="text-h3">About this website</h2>
              <p className="mt-3 text-body text-ink-700">
                This website is operated by {site.businessName}. Its content
                describes marketplace management services and is provided for
                information only. Nothing on it forms a contract or a binding
                offer.
              </p>
            </section>

            <section>
              <h2 className="text-h3">No guaranteed outcomes</h2>
              <p className="mt-3 text-body text-ink-700">
                Nothing on this website should be read as a promise of sales,
                search rankings, revenue, profit, buyer feedback, or any
                particular marketplace outcome. Those depend on buyer behaviour,
                competition and marketplace decisions that are outside our
                control, and we make no representation about them.
              </p>
            </section>

            <section>
              <h2 className="text-h3">Illustrative content</h2>
              <p className="mt-3 text-body text-ink-700">
                Some pages show example dashboards, listings and research
                comparisons. These are created for demonstration, use fictional
                products and invented figures, and are labelled as examples
                where they appear. They do not represent any client&rsquo;s
                actual data or results.
              </p>
            </section>

            <section>
              <h2 className="text-h3">Marketplace names</h2>
              <p className="mt-3 text-body text-ink-700">
                eBay, Amazon and TikTok are trademarks of their respective
                owners. {site.businessName} is an independent service provider
                and is not affiliated with, endorsed by, certified by, or
                acting on behalf of any of them. Marketplace names are used only
                to describe the platforms on which services are provided.
              </p>
            </section>

            <section>
              <h2 className="text-h3">Engagement terms</h2>
              <p className="mt-3 text-body text-ink-700">
                Scope, fees, payment terms, confidentiality, account access
                arrangements, liability and termination are agreed in writing
                before any engagement begins. Those written terms govern the
                working relationship, not this page.
              </p>
            </section>

            <section>
              <h2 className="text-h3">Privacy</h2>
              <p className="mt-3 text-body text-ink-700">
                Information submitted through the consultation form is handled
                as described in the{' '}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-accent-700 underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  )
}
