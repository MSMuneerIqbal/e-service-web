/**
 * Analytics events — specs.md §14
 *
 * Hard rule enforced by the types below: no event property may carry personal
 * data. Name, email, phone, message text, revenue range and IP are never sent
 * (Constitution §27, §37). The property types are closed unions, so adding a
 * free-text field is a compile error rather than an oversight.
 *
 * Transport is Vercel Analytics if present. The helper degrades to a no-op
 * when it is not, so nothing here can break a page render.
 */

type CtaLocation = 'nav' | 'hero' | 'mid' | 'final' | 'sticky' | 'footer'

export type AnalyticsEvent =
  | { name: 'cta_click'; props: { location: CtaLocation; page: string } }
  | { name: 'form_start'; props: { page: string } }
  | {
      name: 'form_submit_success'
      props: { marketplace: string; storeStatus: string; service: string }
    }
  | { name: 'form_submit_error'; props: { code: string } }
  | { name: 'whatsapp_click'; props: { location: CtaLocation } }
  | { name: 'email_click'; props: { location: CtaLocation } }
  | { name: 'phone_click'; props: { location: CtaLocation } }
  | { name: 'service_page_engaged'; props: { slug: string } }
  | { name: 'marketplace_page_engaged'; props: { marketplace: string } }
  | { name: 'case_study_engaged'; props: { slug: string } }

type VercelAnalytics = {
  track?: (name: string, props?: Record<string, string | number | boolean>) => void
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return

  const va = (window as unknown as { va?: VercelAnalytics }).va
  va?.track?.(event.name, event.props as Record<string, string>)
}

/** Convenience for the most common event. */
export function trackCta(location: CtaLocation, page: string): void {
  track({ name: 'cta_click', props: { location, page } })
}
