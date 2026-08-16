'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/primitives/Icon'
import { Button } from '@/components/primitives/Button'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/content/types'

/**
 * Mobile navigation drawer — specs.md §3.2, §11
 *
 * Accessibility contract:
 *  - Focus is trapped inside the open drawer
 *  - Escape closes and returns focus to the trigger
 *  - Background scroll is locked while open
 *  - Route change closes the drawer
 *  - Groups render as plain expandable lists, not as hover dropdowns
 */
export function MobileDrawer({
  items,
  ctaLabel,
}: {
  items: NavItem[]
  ctaLabel: string
}) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  /**
   * Close whenever the route changes.
   *
   * Adjusted during render rather than in an effect. An effect that calls
   * setState synchronously schedules a second render pass; React's documented
   * pattern for "reset state when a value changes" is to compare against the
   * previous value during render and set state immediately, which React
   * handles before committing anything to the DOM.
   */
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpen(false)
  }

  // Lock background scroll while open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Escape to close, and a focus trap across Tab / Shift+Tab.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables || focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLElement>('a[href], button:not([disabled])')
        ?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Open navigation menu"
        className="inline-flex size-11 items-center justify-center rounded-md text-ink-900 lg:hidden"
      >
        <Icon name="menu" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-100 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-surface shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="text-body font-semibold text-ink-900">Menu</span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
                aria-label="Close navigation menu"
                className="inline-flex size-11 items-center justify-center rounded-md text-ink-700"
              >
                <Icon name="close" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {items.map((item) => {
                  const hasChildren = (item.children?.length ?? 0) > 0
                  const isExpanded = expanded === item.label

                  if (!hasChildren) {
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-3 text-body font-medium text-ink-900 hover:bg-surface-muted"
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  }

                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded(isExpanded ? null : item.label)
                        }
                        aria-expanded={isExpanded}
                        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-body font-medium text-ink-900 hover:bg-surface-muted"
                      >
                        {item.label}
                        <Icon
                          name="chevron"
                          className={cn(
                            'size-4 transition-transform duration-150',
                            isExpanded && 'rotate-180'
                          )}
                        />
                      </button>

                      {isExpanded ? (
                        <ul className="mt-1 mb-2 ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                          {item.children?.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-md px-3 py-2.5 text-body text-ink-700 hover:bg-surface-muted hover:text-ink-900"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="border-t border-line p-5">
              <Button href="/contact" size="lg" className="w-full">
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
