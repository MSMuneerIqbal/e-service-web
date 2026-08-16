import { Icon } from '@/components/primitives/Icon'
import type { Faq } from '@/content/types'

/**
 * FAQ accordion — Constitution §21, §34
 *
 * Built on native <details>/<summary>, which means:
 *  - zero client JavaScript (this is a server component)
 *  - disclosure semantics, keyboard operation and screen-reader announcement
 *    come from the browser rather than from hand-rolled ARIA
 *  - answers remain in the DOM when collapsed, so the visible content matches
 *    the FAQPage JSON-LD exactly (specs.md §10.3)
 *  - it still works if JavaScript fails to load
 *
 * An earlier version used useState + aria-expanded. Native disclosure is both
 * lighter and harder to get wrong, so there was no reason to keep it.
 */
export function FAQAccordion({ items }: { items: Faq[] }) {
  if (items.length === 0) return null

  return (
    <ul className="divide-y divide-[var(--color-line)] border-y border-line">
      {items.map((item, index) => (
        <li key={item.question}>
          <details className="group" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-body-lg font-semibold text-ink-900">
                {item.question}
              </h3>
              <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-line text-ink-700">
                <Icon
                  name="chevron"
                  className="size-4 transition-transform duration-200 group-open:rotate-180"
                />
              </span>
            </summary>
            <div className="pb-6">
              <p className="measure text-body text-ink-700">{item.answer}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  )
}
