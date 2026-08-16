import type { CaseStudy, Testimonial, TeamMember } from './types'

/**
 * Proof records — specs.md §5.5, §5.6 and D2/D11
 *
 * All three arrays are EMPTY and must stay empty until real, permitted records
 * exist. Every consumer renders `null` on an empty array — no placeholder cards,
 * no "coming soon", no stock avatars (Constitution §9, §41, §48 Rules 2 and 8).
 *
 * The literal `true` fields in the types (clientPermission / verified / real)
 * mean you physically cannot add an unconfirmed record without TypeScript
 * rejecting it. That is intentional. Do not work around it.
 *
 * Specifically excluded (specs.md §2.5): anything sourced from the third-party
 * reference gig, including its portfolio item and its sales figure. That is
 * another seller's work and is not ours to present.
 */

export const caseStudies: CaseStudy[] = []

export const testimonials: Testimonial[] = []

export const team: TeamMember[] = []

/* Gating helpers — used by pages to decide whether a section exists at all. */
export const hasCaseStudies = caseStudies.length > 0
export const hasTestimonials = testimonials.length > 0
export const hasTeam = team.length > 0

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
