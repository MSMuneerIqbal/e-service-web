import Link from 'next/link'
import { Container } from '@/components/primitives/Section'
import { Icon } from '@/components/primitives/Icon'
import { footerColumns } from '@/content/navigation'
import { site, hasContactChannels, hasSocialLinks } from '@/content/site'

/**
 * Footer — Constitution §26
 *
 * Contact and social rows render only when real values exist. An empty
 * contact block is better than a placeholder one (§48 Rule 8).
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark bg-navy-900 text-white/70">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="text-body-lg font-bold text-white">
              {site.businessName}
            </p>
            <p className="mt-3 max-w-xs text-body text-white/70">
              {site.tagline}
            </p>

            {hasContactChannels ? (
              <ul className="mt-6 flex flex-col gap-2">
                {site.contact.map((channel) => (
                  <li key={channel.href}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2.5 text-body text-white/80 transition-colors hover:text-white"
                    >
                      <Icon
                        name={
                          channel.event === 'whatsapp_click'
                            ? 'whatsapp'
                            : channel.event === 'email_click'
                              ? 'message'
                              : 'clock'
                        }
                        className="size-4.5 shrink-0 text-accent-400"
                      />
                      <span className="sr-only">{channel.label}: </span>
                      {channel.value}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            {hasSocialLinks ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {site.social.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-small font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                    >
                      <Icon
                        name={link.label.toLowerCase() === 'upwork' ? 'upwork' : 'arrow'}
                        className="size-4 shrink-0"
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-labelledby={`footer-${column.heading}`}>
              <p
                id={`footer-${column.heading}`}
                className="text-small font-semibold tracking-wide text-white uppercase"
              >
                {column.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-white/60">
            &copy; {year} {site.businessName}. All rights reserved.
          </p>
          <p className="max-w-lg text-small text-white/50">
            Not affiliated with, endorsed by, or certified by eBay, Amazon or
            TikTok. All marketplace names are the property of their respective
            owners.
          </p>
        </div>
      </Container>
    </footer>
  )
}
