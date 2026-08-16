import {
  labelFor,
  MARKETPLACE_OPTIONS,
  REVENUE_OPTIONS,
  SERVICE_OPTIONS,
  STORE_STATUS_OPTIONS,
  type ConsultationInput,
} from './validation'
import { sanitizeLine, sanitizeText } from './utils'

/**
 * Form delivery — no server involved.
 *
 * The site is fully static: there is no API route and no serverless function.
 * The browser posts directly to Web3Forms, which emails the submission on.
 *
 * The access key is PUBLIC by design. It identifies which inbox a submission
 * belongs to and grants no read access to anything, which is why it is safe to
 * ship in the client bundle. Never put a secret behind a NEXT_PUBLIC_ prefix;
 * this one is not a secret.
 *
 * Honest tradeoff of going serverless: validation is now client-side only and
 * can be bypassed by anyone posting to the endpoint directly. Web3Forms applies
 * its own spam filtering and rate limits on top. For a lead form that is an
 * acceptable exchange for having no backend to run; it would not be acceptable
 * for anything that wrote to a database or triggered a payment.
 */

const ENDPOINT = 'https://api.web3forms.com/submit'

export const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

/** False until an access key is configured — the form surfaces this clearly. */
export const isFormConfigured = accessKey.length > 0

export type SubmitResult =
  | { ok: true }
  | { ok: false; code: 'not_configured' | 'rejected' | 'network' }

/** Minimum time a genuine person needs to fill the form in. */
export const MIN_FILL_MS = 3000

export async function submitConsultation(
  data: ConsultationInput,
  renderedAt: number
): Promise<SubmitResult> {
  if (!isFormConfigured) {
    console.error(
      '[consultation] NEXT_PUBLIC_WEB3FORMS_KEY is not set. See CLIENT_INPUTS.md item 2.'
    )
    return { ok: false, code: 'not_configured' }
  }

  // Bot traps. Silently accepted so a bot learns nothing from the response.
  const honeypotTripped = Boolean(data.website && data.website.length > 0)
  const tooFast = Date.now() - renderedAt < MIN_FILL_MS
  if (honeypotTripped || tooFast) return { ok: true }

  const name = sanitizeLine(data.name)
  const marketplace = labelFor(MARKETPLACE_OPTIONS, data.marketplace)

  const payload = {
    access_key: accessKey,
    subject: `Consultation request - ${name} (${marketplace})`,
    from_name: 'Marketplace management website',
    // Web3Forms uses this as the reply-to address.
    email: sanitizeLine(data.email),

    Name: name,
    Email: sanitizeLine(data.email),
    'Phone / WhatsApp': sanitizeLine(data.phone),
    Marketplace: marketplace,
    'Store status': labelFor(STORE_STATUS_OPTIONS, data.storeStatus),
    'Service needed': labelFor(SERVICE_OPTIONS, data.service),
    'Sales volume': labelFor(REVENUE_OPTIONS, data.revenueRange),
    Message: sanitizeText(data.message ?? '') || '(none)',

    // Web3Forms' own honeypot field.
    botcheck: '',
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) return { ok: false, code: 'rejected' }

    const body = (await response.json().catch(() => null)) as {
      success?: boolean
    } | null

    return body?.success ? { ok: true } : { ok: false, code: 'rejected' }
  } catch {
    return { ok: false, code: 'network' }
  }
}
