/**
 * Skip link — Constitution §21.
 * First focusable element on every page. Visually hidden until focused.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable absolute top-3 left-3 z-200 rounded-md bg-navy-900 px-4 py-2.5 text-body font-semibold text-white shadow-lg"
    >
      Skip to main content
    </a>
  )
}
