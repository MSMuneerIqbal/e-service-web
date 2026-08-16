import { NextResponse } from 'next/server'
import { consultationSchema, flattenErrors } from '@/lib/validation'
import { checkRateLimit, clientIdentifier } from '@/lib/ratelimit'
import { sendConsultationEmails } from '@/lib/email'

/**
 * Consultation endpoint — specs.md §6.3
 *
 * Pipeline: rate limit -> bot traps -> Zod (authoritative) -> send.
 *
 * Two deliberate choices:
 *  1. Bot rejections return 200 { ok: true } and send nothing. Returning an
 *     error would teach a bot exactly which trap it tripped.
 *  2. Nothing is persisted and nothing is logged beyond a non-identifying
 *     error name (Constitution §27).
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Minimum time a genuine person needs to complete the form. */
const MIN_FILL_MS = 3000

export async function POST(request: Request) {
  /* --- 1. Rate limit ------------------------------------------------ */
  const identifier = clientIdentifier(request.headers)
  const limit = checkRateLimit(identifier)

  if (!limit.success) {
    return NextResponse.json(
      { ok: false, code: 'rate_limited' },
      {
        status: 429,
        headers: {
          'Retry-After': String(
            Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))
          ),
        },
      }
    )
  }

  /* --- 2. Parse body ------------------------------------------------ */
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_body' },
      { status: 400 }
    )
  }

  /* --- 3. Validate (authoritative) ---------------------------------- */
  const parsed = consultationSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: 'validation_failed', errors: flattenErrors(parsed.error) },
      { status: 422 }
    )
  }

  const data = parsed.data

  /* --- 4. Bot traps — silent success -------------------------------- */
  const honeypotTripped = Boolean(data.website && data.website.length > 0)
  const tooFast =
    typeof data.renderedAt === 'number' &&
    Date.now() - data.renderedAt < MIN_FILL_MS

  if (honeypotTripped || tooFast) {
    return NextResponse.json({ ok: true })
  }

  /* --- 5. Send ------------------------------------------------------ */
  const result = await sendConsultationEmails(data)

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, code: result.code ?? 'send_failed' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}

/** Anything other than POST is not part of the contract. */
export function GET() {
  return NextResponse.json({ ok: false, code: 'method_not_allowed' }, { status: 405 })
}
