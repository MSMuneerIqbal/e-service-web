import type { Metadata } from 'next'
import { Container, Section } from '@/components/primitives/Section'
import { Icon } from '@/components/primitives/Icon'
import { site, hasContactChannels } from '@/content/site'
import { buildMetadata } from '@/lib/seo'

/**
 * Privacy notice — specs.md §5.9
 *
 * IMPORTANT: this is NOT fabricated legal boilerplate. Everything stated below
 * is a factual description of what this website actually does, verifiable
 * against the source: the form fields in lib/validation.ts, the delivery path
 * in lib/email.ts, the event properties in lib/analytics.ts, and the absence of
 * any cookie-setting code.
 *
 * A lawyer-reviewed policy covering the wider business relationship is still
 * outstanding (CLIENT_INPUTS.md item 5). The notice at the top says so plainly
 * rather than implying legal completeness the page does not have.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How this website collects, uses and stores the information you submit through the consultation form.',
  path: '/privacy-policy',
  noindex: true,
})

const sections = [
  {
    heading: 'What this notice covers',
    body: [
      'This notice describes how information submitted through the consultation form on this website is handled. It covers the website only.',
    ],
  },
  {
    heading: 'What we collect',
    body: [
      'When you submit the consultation form we collect: your name, email address, phone or WhatsApp number, the marketplace you sell on, your current store status, the service you are interested in, an optional indication of sales volume, and an optional message.',
      'The sales volume field is optional and defaults to "Prefer not to say". You are not required to disclose it.',
      'We do not collect payment details, identity documents, or marketplace account credentials through this website.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'Your details are used solely to respond to your enquiry and to discuss whether we can help with your store.',
      'We do not sell your information, share it with third parties for marketing, or add you to a mailing list without your explicit request.',
    ],
  },
  {
    heading: 'How it reaches us',
    body: [
      'Form submissions are sent by email to our business inbox using a transactional email provider. You also receive an automatic acknowledgement at the address you supplied.',
      'This website does not store your submission in a database. The record of your enquiry exists in our email inbox and with the email provider that delivered it.',
    ],
  },
  {
    heading: 'Cookies and tracking',
    body: [
      'This website does not set advertising or marketing cookies, and does not use cross-site tracking.',
      'We measure aggregate page usage — such as which pages are visited and whether a form was started or completed — without recording the contents of any form field. Your name, email address, phone number, message text and sales volume are never included in that measurement.',
    ],
  },
  {
    heading: 'Spam protection',
    body: [
      'To reduce automated submissions the form includes a hidden field that people do not see, and the server limits how many submissions can come from the same network address in a short period. The network address is used for that check only. It is not stored alongside your enquiry.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Enquiry emails are retained for as long as needed to respond and to maintain a record of business correspondence. You can ask us to delete your enquiry at any time.',
    ],
  },
  {
    heading: 'Your choices',
    body: [
      'You can ask what information we hold about your enquiry, ask for it to be corrected, or ask for it to be deleted. Contact us and we will action it.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <Container>
        <div className="measure">
          <h1 className="text-h1">Privacy Policy</h1>

          <div className="mt-8 flex items-start gap-3 rounded-lg border border-line bg-surface-muted p-5">
            <Icon
              name="alert"
              className="mt-0.5 size-5 shrink-0 text-accent-700"
            />
            <p className="text-small text-ink-700">
              <span className="font-semibold text-ink-900">
                Awaiting legal review.
              </span>{' '}
              What follows is an accurate description of how this website
              handles information submitted through its form. A full policy
              covering the wider business relationship, prepared with
              professional advice, will replace this notice before launch.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-9">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-h3">{section.heading}</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.body.map((paragraph, index) => (
                    <p key={index} className="text-body text-ink-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-h3">Contact</h2>
              <p className="mt-3 text-body text-ink-700">
                {hasContactChannels ? (
                  <>
                    For any question about this notice, contact{' '}
                    {site.businessName} using the details in the footer.
                  </>
                ) : (
                  <>
                    Contact details will be published here alongside the
                    reviewed policy. Until then, use the consultation form and
                    mark your message as a privacy enquiry.
                  </>
                )}
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  )
}
