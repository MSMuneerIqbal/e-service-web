import type { Metadata } from 'next'
import { Container, Section, SectionHeading } from '@/components/primitives/Section'
import { Icon } from '@/components/primitives/Icon'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { FAQAccordion } from '@/components/marketing/FAQAccordion'
import { faqsFor } from '@/content/faqs'
import { site, hasContactChannels } from '@/content/site'
import { buildMetadata, jsonLd, breadcrumbSchema, faqSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Request a Free Consultation',
  description:
    'Tell us about your eBay, Amazon or TikTok Shop store. Free consultation, no obligation, and a straight answer about whether we can help.',
  path: '/contact',
})

/**
 * Contact page — specs.md §5.8
 *
 * The "what happens next" block is required by Constitution §8 and uses the
 * sanctioned neutral wording, because the client's actual consultation process
 * is still unconfirmed (CLIENT_INPUTS.md item 20). It states nothing we cannot
 * stand behind — in particular no response-time commitment (§15).
 */
export default function ContactPage() {
  const faqs = faqsFor('/contact')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Contact', path: '/contact' },
            ]),
            faqSchema(faqs)
          ),
        }}
      />

      <Section className="pb-0 md:pb-0 lg:pb-0">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-3 text-small font-semibold tracking-wide text-accent-700 uppercase">
              Free consultation
            </p>
            <h1 className="text-h1 text-balance">
              Tell us about your store
            </h1>
            <p className="mt-5 text-body-lg text-ink-700">
              Fill this in and we will review it personally. There is no cost,
              no obligation, and if what you need falls outside what we offer we
              will tell you that rather than sell you something adjacent.
            </p>
          </div>
        </Container>
      </Section>

      <Section labelledBy="form-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 id="form-heading" className="sr-only">
                Consultation request form
              </h2>
              <ConsultationForm />
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-xl border border-line bg-surface-muted p-6 md:p-7">
                <h2 className="text-h3">What happens next</h2>
                <ol className="mt-5 flex flex-col gap-5">
                  {[
                    {
                      title: 'We read what you sent',
                      body: 'Every request is reviewed personally. Nothing is handled by an autoresponder.',
                    },
                    {
                      title: 'We come back to you',
                      body: 'We review your requirements and contact you with the most suitable next step.',
                    },
                    {
                      title: 'You decide',
                      body: 'No obligation to continue. If we are not the right fit, we will say so.',
                    },
                  ].map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-small font-bold text-white">
                        {index + 1}
                      </span>
                      <span>
                        <span className="block text-body font-semibold text-ink-900">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-body text-ink-700">
                          {step.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>

                {/*
                  Direct channels render only when real values exist in site.ts
                  (specs.md §15 items 2 and 3). No placeholder contact details.
                */}
                {hasContactChannels ? (
                  <div className="mt-8 border-t border-line pt-6">
                    <h3 className="text-body font-semibold text-ink-900">
                      Or reach us directly
                    </h3>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {site.contact.map((channel) => (
                        <li key={channel.href}>
                          <a
                            href={channel.href}
                            className="inline-flex items-center gap-2 text-body text-accent-700 underline underline-offset-4"
                          >
                            <Icon name="message" className="size-4 shrink-0" />
                            <span className="sr-only">{channel.label}: </span>
                            {channel.value}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-8 flex items-start gap-3 border-t border-line pt-6">
                  <Icon
                    name="shield"
                    className="mt-0.5 size-5 shrink-0 text-accent-700"
                  />
                  <p className="text-small text-ink-700">
                    Your details are used only to respond to this enquiry. They
                    are not published, sold, or added to a marketing list.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {faqs.length > 0 ? (
        <Section tone="muted" labelledBy="contact-faq-heading">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionHeading
                  id="contact-faq-heading"
                  eyebrow="Questions"
                  title="Before you send"
                />
              </div>
              <div className="lg:col-span-8">
                <FAQAccordion items={faqs} />
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  )
}
