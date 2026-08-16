'use client'

import { useEffect, useRef } from 'react'

/**
 * Scroll reveal — Constitution §19, specs.md §7.5
 *
 * Content is visible by DEFAULT. The component only sets the hidden state after
 * it has confirmed that JavaScript is running, IntersectionObserver exists, and
 * the user has not asked for reduced motion. If any of those is false, nothing
 * ever hides.
 *
 * That ordering matters: a reveal implemented as "hide in CSS, show in JS"
 * makes the whole page invisible when the script fails to load. This one
 * degrades to plain visible content.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    // Safe to hide: JS is running and motion is welcome.
    node.dataset.reveal = 'pending'

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          window.setTimeout(() => {
            el.dataset.reveal = 'shown'
          }, delay)
          observer.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
