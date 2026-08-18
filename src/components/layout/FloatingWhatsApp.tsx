'use client'

import { Icon } from '@/components/primitives/Icon'
import { site } from '@/content/site'
import { track } from '@/lib/analytics'

/**
 * Floating WhatsApp contact button.
 *
 * Renders only when a WhatsApp channel exists in site.ts, so it disappears
 * rather than 404s if the number is ever removed.
 *
 * Positioning: the mobile sticky CTA already occupies the bottom edge below
 * 768px, so this sits above it there and drops to the corner on desktop.
 * Two fixed elements fighting for the same corner is a common and avoidable
 * mobile annoyance.
 */
export function FloatingWhatsApp() {
  const channel = site.contact.find((c) => c.event === 'whatsapp_click')

  if (!channel) return null

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track({ name: 'whatsapp_click', props: { location: 'sticky' } })}
      aria-label={`Message us on WhatsApp at ${channel.value}`}
      className="group fixed right-4 bottom-24 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] py-3 pr-4 pl-3.5 text-white shadow-lg transition-transform duration-150 hover:scale-[1.03] focus-visible:scale-[1.03] md:right-6 md:bottom-6"
    >
      <Icon name="whatsapp" className="size-6 shrink-0" strokeWidth={1.9} />
      <span className="hidden text-body font-semibold sm:inline">
        Chat on WhatsApp
      </span>
      {/* Visible to screen readers on small screens where the label is hidden */}
      <span className="sr-only sm:hidden">Chat on WhatsApp</span>
    </a>
  )
}
