import { Container, Section } from '@/components/primitives/Section'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'

/**
 * 404 — Constitution §35.
 * Helpful and branded, with real routes out. No stack traces, no dead end.
 */
export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface-muted text-ink-500">
            <Icon name="search" className="size-6" />
          </span>

          <h1 className="mt-6 text-h1">Page not found</h1>

          <p className="mt-4 text-body-lg text-ink-700">
            That page does not exist, or it has moved. Here is where most people
            are heading.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/services">Browse services</Button>
            <Button href="/contact" variant="secondary">
              Get a free consultation
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: 'Home', href: '/' },
              { label: 'eBay', href: '/ebay' },
              { label: 'Amazon', href: '/amazon' },
              { label: 'TikTok Shop', href: '/tiktok-shop' },
              { label: 'About', href: '/about' },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body text-accent-700 underline underline-offset-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
