'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/primitives/Icon'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/content/types'

/**
 * Desktop navigation dropdown — specs.md §3.2, §11
 *
 * Keyboard contract:
 *   Enter / Space / ArrowDown  open, focus first item
 *   ArrowUp                    open, focus last item
 *   ArrowDown / ArrowUp        move between items while open
 *   Home / End                 first / last item
 *   Escape                     close, return focus to the trigger
 *   Tab out                    close without stealing focus
 *
 * Pointer users also get hover-to-open, but hover is never the only route in
 * (Constitution §34).
 */
export function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const children = item.children ?? []

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  useEffect(() => () => clearCloseTimer(), [])

  // Close on outside pointer press.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const focusItem = (index: number) => {
    const count = children.length
    if (count === 0) return
    const next = ((index % count) + count) % count
    itemRefs.current[next]?.focus()
  }

  const openAndFocus = (index: number) => {
    setOpen(true)
    requestAnimationFrame(() => focusItem(index))
  }

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault()
        openAndFocus(0)
        break
      case 'ArrowUp':
        event.preventDefault()
        openAndFocus(children.length - 1)
        break
      case 'Escape':
        setOpen(false)
        break
    }
  }

  const onItemKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        focusItem(index + 1)
        break
      case 'ArrowUp':
        event.preventDefault()
        focusItem(index - 1)
        break
      case 'Home':
        event.preventDefault()
        focusItem(0)
        break
      case 'End':
        event.preventDefault()
        focusItem(children.length - 1)
        break
      case 'Escape':
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        break
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer()
        setOpen(true)
      }}
      onMouseLeave={() => {
        clearCloseTimer()
        closeTimer.current = setTimeout(() => setOpen(false), 120)
      }}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false)
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className="inline-flex min-h-11 items-center gap-1 px-1 text-body font-medium text-ink-700 transition-colors hover:text-ink-900"
      >
        {item.label}
        <Icon
          name="chevron"
          className={cn(
            'size-4 transition-transform duration-150',
            open && 'rotate-180'
          )}
        />
      </button>

      <div
        id={menuId}
        role="group"
        aria-label={item.label}
        hidden={!open}
        className="absolute top-full left-0 z-50 w-80 pt-2"
      >
        <ul className="overflow-hidden rounded-lg border border-line bg-surface p-2 shadow-lg">
          {children.map((child, index) => (
            <li key={child.href}>
              <Link
                href={child.href}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                onKeyDown={(event) => onItemKeyDown(event, index)}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 transition-colors hover:bg-surface-muted"
              >
                <span className="block text-body font-semibold text-ink-900">
                  {child.label}
                </span>
                {child.description ? (
                  <span className="mt-0.5 block text-small text-ink-500">
                    {child.description}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
