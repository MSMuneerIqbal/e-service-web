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
 * Icon only, deliberately. An earlier version carried a "Chat on WhatsApp"
 * label and the resulting pill was wide enough to sit on top of the hero
 * visual. A 56px circle is the conventional treatment and stays out of the way.
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
      title="Chat on WhatsApp"
      className="fixed right-4 bottom-24 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-150 hover:scale-105 focus-visible:scale-105 md:right-6 md:bottom-6"
    >
      <Icon name="whatsapp" className="size-7" strokeWidth={1.9} />
      {/* The control is icon-only, so the name lives here for assistive tech. */}
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  )
}
