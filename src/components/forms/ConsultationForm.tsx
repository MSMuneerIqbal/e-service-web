'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/primitives/Icon'
import {
  InputField,
  SelectField,
  TextareaField,
  CheckboxField,
  Honeypot,
} from './Fields'
import {
  consultationSchema,
  flattenErrors,
  MARKETPLACE_OPTIONS,
  STORE_STATUS_OPTIONS,
  REVENUE_OPTIONS,
  SERVICE_OPTIONS,
  type FieldErrors,
} from '@/lib/validation'
import { track } from '@/lib/analytics'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Consultation form — specs.md §6, Constitution §34
 *
 * States covered: idle, validating, submitting, success, failure.
 * The form NEVER fails silently: a failed submission shows plain-language text
 * and falls back to the direct email route.
 *
 * Client validation here is a convenience. The API route re-parses with the
 * same schema and is the authority (specs.md §6.3).
 */
export function ConsultationForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [started, setStarted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  /**
   * Timestamp for the minimum-fill-time bot trap.
   *
   * Stamped in an effect rather than in the render body: Date.now() is impure,
   * and useRef re-evaluates its argument on every render even though it keeps
   * only the first value. Mount is also the more accurate moment to measure
   * from, since that is when the form actually becomes interactive.
   */
  const renderedAt = useRef(0)

  useEffect(() => {
    renderedAt.current = Date.now()
  }, [])

  const onFirstInteraction = () => {
    if (started) return
    setStarted(true)
    track({ name: 'form_start', props: { page: '/contact' } })
  }

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const firstKey = Object.keys(fieldErrors)[0]
    if (!firstKey || !formRef.current) return
    const el = formRef.current.querySelector<HTMLElement>(
      `[name="${firstKey}"]`
    )
    el?.focus()
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const formData = new FormData(event.currentTarget)
    const raw = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      marketplace: String(formData.get('marketplace') ?? ''),
      storeStatus: String(formData.get('storeStatus') ?? ''),
      revenueRange: String(formData.get('revenueRange') ?? 'prefer-not-to-say'),
      service: String(formData.get('service') ?? ''),
      message: String(formData.get('message') ?? ''),
      consent: formData.get('consent') === 'on',
      website: String(formData.get('website') ?? ''),
      renderedAt: renderedAt.current,
    }

    const parsed = consultationSchema.safeParse(raw)

    if (!parsed.success) {
      const fieldErrors = flattenErrors(parsed.error)
      setErrors(fieldErrors)
      setStatus('idle')
      focusFirstError(fieldErrors)
      return
    }

    setErrors({})
    setStatus('submitting')

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          code?: string
          errors?: FieldErrors
        } | null

        if (body?.errors) {
          setErrors(body.errors)
          setStatus('idle')
          focusFirstError(body.errors)
          return
        }

        track({
          name: 'form_submit_error',
          props: { code: body?.code ?? String(response.status) },
        })
        setStatus('error')
        return
      }

      track({
        name: 'form_submit_success',
        props: {
          marketplace: parsed.data.marketplace,
          storeStatus: parsed.data.storeStatus,
          service: parsed.data.service,
        },
      })

      setStatus('success')
      requestAnimationFrame(() => successRef.current?.focus())
    } catch {
      track({ name: 'form_submit_error', props: { code: 'network' } })
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-xl border border-line bg-surface-muted p-8 text-center"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
          <Icon name="check" className="size-6" />
        </span>
        <h2 className="mt-5 text-h3">Request received</h2>
        <p className="mx-auto mt-3 max-w-md text-body text-ink-700">
          Thank you. We review every request personally and will get back to you
          with the most suitable next step. If your situation would be better
          served by something we do not offer, we will tell you that too.
        </p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onChange={onFirstInteraction}
      noValidate
      className="flex flex-col gap-6"
    >
      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <InputField
          label="Your name"
          name="name"
          autoComplete="name"
          required
          error={errors.name}
        />
        <InputField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>

      <InputField
        label="Phone or WhatsApp"
        name="phone"
        type="tel"
        autoComplete="tel"
        required
        hint="Include the country code so we can reach you."
        error={errors.phone}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="Which marketplace?"
          name="marketplace"
          required
          defaultValue=""
          options={[
            { value: '', label: 'Select a marketplace' },
            ...MARKETPLACE_OPTIONS,
          ]}
          error={errors.marketplace}
        />
        <SelectField
          label="Your store right now"
          name="storeStatus"
          required
          defaultValue=""
          options={[
            { value: '', label: 'Select an option' },
            ...STORE_STATUS_OPTIONS,
          ]}
          error={errors.storeStatus}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="What do you need help with?"
          name="service"
          required
          defaultValue="not-sure"
          options={SERVICE_OPTIONS}
          error={errors.service}
        />
        <SelectField
          label="Approximate sales volume"
          name="revenueRange"
          defaultValue="prefer-not-to-say"
          options={REVENUE_OPTIONS}
          hint="Optional. It helps us judge scope, but skip it if you would rather not say."
          error={errors.revenueRange}
        />
      </div>

      <TextareaField
        label="Anything else we should know?"
        name="message"
        maxLength={2000}
        hint="What is not working, what you have tried, or what you are aiming for."
        error={errors.message}
      />

      <CheckboxField
        name="consent"
        required
        error={errors.consent}
        label={
          <>
            I am happy for these details to be used to respond to my enquiry.
            See the{' '}
            <a
              href="/privacy-policy"
              className="font-medium text-accent-700 underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </>
        }
      />

      {status === 'error' ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-md border border-danger/30 bg-danger/5 p-4"
        >
          <Icon name="alert" className="mt-0.5 size-5 shrink-0 text-danger" />
          <p className="text-body text-ink-700">
            <span className="font-semibold text-ink-900">
              We could not send that just now.
            </span>{' '}
            Please try again in a moment. If it keeps failing, contact us
            directly and we will pick it up from there.
          </p>
        </div>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent-600 px-7 text-body-lg font-semibold text-white shadow-sm transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <Spinner />
              Sending your request
            </>
          ) : (
            <>
              Request my free consultation
              <Icon name="arrow" className="size-5" />
            </>
          )}
        </button>

        <p className="mt-4 text-small text-ink-500">
          Fields marked <span aria-hidden="true">*</span>
          <span className="sr-only">with an asterisk</span> are required. We use
          your details only to respond to this enquiry.
        </p>
      </div>
    </form>
  )
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 animate-spin"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2.5"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
