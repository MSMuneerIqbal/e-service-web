'use client'

import { useEffect } from 'react'
import { Container, Section } from '@/components/primitives/Section'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'

/**
 * Error boundary — Constitution §35.
 *
 * The visitor sees plain language and a route forward. The technical detail
 * goes to the console for diagnosis and is NEVER rendered: raw stack traces
 * are both unhelpful to users and an information disclosure risk (§28).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app] Unhandled error:', error.digest ?? error.message)
  }, [error])

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface-muted text-ink-500">
            <Icon name="alert" className="size-6" />
          </span>

          <h1 className="mt-6 text-h1">Something went wrong</h1>

          <p className="mt-4 text-body-lg text-ink-700">
            Sorry — that did not load properly. Trying again usually fixes it.
            If it keeps happening, get in touch and we will look into it.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={reset}>Try again</Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
