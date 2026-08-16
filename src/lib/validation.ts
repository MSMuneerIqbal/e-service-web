import { z } from 'zod'

/**
 * Consultation form schema — specs.md §6.1
 *
 * Shared by the client (UX validation) and the API route (authoritative).
 * The server always re-parses; client validation is a convenience only.
 */

export const MARKETPLACE_OPTIONS = [
  { value: 'ebay', label: 'eBay' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'tiktok', label: 'TikTok Shop' },
  { value: 'multiple', label: 'More than one' },
  { value: 'not-selling-yet', label: 'Not selling yet' },
] as const

export const STORE_STATUS_OPTIONS = [
  { value: 'new', label: 'New store' },
  { value: 'existing', label: 'Existing store' },
  { value: 'needs-improvement', label: 'Sales need improvement' },
  { value: 'full-management', label: 'Need complete management' },
] as const

/**
 * Optional, and defaulted to "prefer not to say".
 * Constitution §27 — do not collect more than the purpose requires.
 */
export const REVENUE_OPTIONS = [
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  { value: 'pre-revenue', label: 'Not selling yet' },
  { value: 'starting', label: 'Just getting started' },
  { value: 'growing', label: 'Growing steadily' },
  { value: 'established', label: 'Established volume' },
] as const

export const SERVICE_OPTIONS = [
  { value: 'not-sure', label: 'Not sure yet' },
  { value: 'product-research', label: 'Product Research & Hunting' },
  { value: 'listing-optimization', label: 'Listing Creation & Optimization' },
  { value: 'order-management', label: 'Order Management' },
  { value: 'customer-support', label: 'Customer Support & Returns' },
  { value: 'store-management', label: 'Complete Store Management' },
  { value: 'new-store-launch', label: 'New Store Launch' },
] as const

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [string, ...string[]]

export const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'That name is longer than we can accept.'),

  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .max(160, 'That email address is longer than we can accept.')
    .email('Please enter a valid email address.'),

  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a contact number we can reach you on.')
    .max(20, 'That number is longer than we can accept.')
    .regex(
      /^[0-9+()\-.\s]+$/,
      'Please use digits, spaces, and + ( ) - only.'
    ),

  marketplace: z.enum(values(MARKETPLACE_OPTIONS), {
    errorMap: () => ({ message: 'Please choose a marketplace.' }),
  }),

  storeStatus: z.enum(values(STORE_STATUS_OPTIONS), {
    errorMap: () => ({ message: 'Please choose the option closest to your situation.' }),
  }),

  revenueRange: z.enum(values(REVENUE_OPTIONS)).default('prefer-not-to-say'),

  service: z.enum(values(SERVICE_OPTIONS), {
    errorMap: () => ({ message: 'Please choose a service, or "Not sure yet".' }),
  }),

  message: z
    .string()
    .trim()
    .max(2000, 'Please keep the message under 2000 characters.')
    .optional()
    .or(z.literal('')),

  consent: z.literal(true, {
    errorMap: () => ({
      message: 'Please confirm you are happy for us to use these details to reply.',
    }),
  }),

  /* --- Bot traps. Never rendered to a sighted or screen-reader user. ---
   *
   * These are intentionally PERMISSIVE. Enforcing "website must be empty" here
   * would make a tripped honeypot fail validation with a 422 naming the field,
   * which tells a bot exactly what caught it. Instead the values pass through
   * and the route handler inspects them, returning a silent 200 (specs.md §6.3).
   */
  website: z.string().optional(),
  renderedAt: z.coerce.number().optional(),
})

export type ConsultationInput = z.infer<typeof consultationSchema>

/** Field-keyed errors, shaped for the form's inline rendering. */
export type FieldErrors = Partial<
  Record<keyof ConsultationInput | 'form', string>
>

export function flattenErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !(key in out)) {
      out[key as keyof FieldErrors] = issue.message
    }
  }
  return out
}

/** Human labels for the notification email. */
export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string
): string {
  return options.find((o) => o.value === value)?.label ?? value
}
