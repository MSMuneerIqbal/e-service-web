/**
 * Minimal class-name joiner.
 *
 * Deliberately not `clsx` + `tailwind-merge`: this site has a small, disciplined
 * component set and no runtime class conflicts to resolve. Two fewer dependencies
 * in the client bundle (specs.md section 12 budget).
 */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ')
}

/** Absolute URL against the configured origin. */
export function absoluteUrl(path: string, baseUrl: string): string {
  if (path.startsWith('http')) return path
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Control characters, excluding \t (09), \n (0A) and \r (0D) which are handled
 * separately. Constructed from a string literal so this source file contains
 * only printable ASCII.
 */
const CONTROL_CHARS = new RegExp(
  '[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]',
  'g'
)

/**
 * Strip control characters and collapse horizontal whitespace runs.
 * Server-side input hygiene before values are templated into an email.
 * Newlines are preserved - they are meaningful in the message field.
 */
export function sanitizeText(value: string): string {
  return value.replace(CONTROL_CHARS, '').replace(/[ \t]+/g, ' ').trim()
}

/**
 * Single-line variant for fields that end up near email headers (name, subject
 * fragments). Removes newlines entirely, which closes off header injection.
 */
export function sanitizeLine(value: string): string {
  return sanitizeText(value)
    .replace(/[\r\n]+/g, ' ')
    .trim()
}

/** Escape a string for safe interpolation into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
