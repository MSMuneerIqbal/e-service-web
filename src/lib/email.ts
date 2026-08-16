import { Resend } from 'resend'
import { escapeHtml, sanitizeLine, sanitizeText } from './utils'
import {
  labelFor,
  MARKETPLACE_OPTIONS,
  REVENUE_OPTIONS,
  SERVICE_OPTIONS,
  STORE_STATUS_OPTIONS,
  type ConsultationInput,
} from './validation'
import { site } from '@/content/site'

/**
 * Transactional email — specs.md §6.3, Constitution §28
 *
 * Injection defence:
 *  - user input NEVER reaches a header field except `replyTo`, which is a
 *    Zod-validated email address and is stripped of newlines regardless
 *  - the subject line takes a sanitized single-line name
 *  - all body interpolation is HTML-escaped
 *
 * The client is created lazily so a missing API key surfaces as a handled
 * failure at request time rather than a crash at module load.
 */

let client: Resend | null = null

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!client) client = new Resend(key)
  return client
}

export interface SendResult {
  ok: boolean
  code?: string
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;vertical-align:top;color:#64748b;font-size:14px;width:180px;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;vertical-align:top;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
    </tr>`
}

export async function sendConsultationEmails(
  input: ConsultationInput
): Promise<SendResult> {
  const resend = getClient()
  const inbox = process.env.BUSINESS_INBOX
  const from = process.env.MAIL_FROM

  if (!resend || !inbox || !from) {
    // Not an error the visitor caused. Logged without PII.
    console.error(
      '[consultation] Email not configured: RESEND_API_KEY, BUSINESS_INBOX and MAIL_FROM are all required.'
    )
    return { ok: false, code: 'not_configured' }
  }

  const name = sanitizeLine(input.name)
  const email = sanitizeLine(input.email)
  const phone = sanitizeLine(input.phone)
  const message = sanitizeText(input.message ?? '')

  const marketplace = labelFor(MARKETPLACE_OPTIONS, input.marketplace)
  const storeStatus = labelFor(STORE_STATUS_OPTIONS, input.storeStatus)
  const service = labelFor(SERVICE_OPTIONS, input.service)
  const revenue = labelFor(REVENUE_OPTIONS, input.revenueRange)

  const notification = `
<div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;">
  <h1 style="margin:0 0 4px;font-size:20px;color:#0f172a;">New consultation request</h1>
  <p style="margin:0 0 24px;font-size:14px;color:#64748b;">Submitted via ${escapeHtml(site.baseUrl)}/contact</p>
  <table style="width:100%;border-collapse:collapse;border-top:1px solid #e2e8f0;">
    ${row('Name', name)}
    ${row('Email', email)}
    ${row('Phone / WhatsApp', phone)}
    ${row('Marketplace', marketplace)}
    ${row('Store status', storeStatus)}
    ${row('Service needed', service)}
    ${row('Sales volume', revenue)}
  </table>
  ${
    message
      ? `<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;">
           <p style="margin:0 0 8px;font-size:14px;color:#64748b;">Message</p>
           <p style="margin:0;font-size:14px;color:#0f172a;white-space:pre-wrap;">${escapeHtml(message)}</p>
         </div>`
      : ''
  }
</div>`

  const acknowledgement = `
<div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;">
  <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Thanks for getting in touch</h1>
  <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
    Hi ${escapeHtml(name)}, we have received your consultation request and will review it personally.
  </p>
  <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
    We will come back to you with the most suitable next step. If what you need
    falls outside what we offer, we will tell you that rather than sell you
    something adjacent.
  </p>
  <table style="width:100%;border-collapse:collapse;border-top:1px solid #e2e8f0;margin-top:8px;">
    ${row('Marketplace', marketplace)}
    ${row('Store status', storeStatus)}
    ${row('Service needed', service)}
  </table>
  <p style="margin:24px 0 0;font-size:13px;color:#64748b;">
    ${escapeHtml(site.businessName)}
  </p>
</div>`

  try {
    const notify = await resend.emails.send({
      from,
      to: inbox,
      // Zod-validated address, newline-stripped. Safe as a header value.
      replyTo: email,
      subject: `Consultation request - ${name} (${marketplace})`,
      html: notification,
    })

    if (notify.error) {
      console.error('[consultation] Notification send failed:', notify.error.name)
      return { ok: false, code: 'send_failed' }
    }

    // Acknowledgement is best effort. The lead is already captured, so a
    // failure here must not present as a failed submission to the visitor.
    const ack = await resend.emails.send({
      from,
      to: email,
      subject: 'We have received your consultation request',
      html: acknowledgement,
    })

    if (ack.error) {
      console.error('[consultation] Acknowledgement failed:', ack.error.name)
    }

    return { ok: true }
  } catch (error) {
    console.error(
      '[consultation] Unexpected send error:',
      error instanceof Error ? error.name : 'unknown'
    )
    return { ok: false, code: 'send_failed' }
  }
}
