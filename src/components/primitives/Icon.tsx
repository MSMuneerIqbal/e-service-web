import type { IconName } from '@/content/types'

/**
 * Icon set — hand-authored SVG paths.
 *
 * No icon library dependency: sixteen 24px stroke icons cost less than a
 * package and keep the client bundle inside the specs.md §12 budget.
 * All icons inherit `currentColor` so they follow the design tokens.
 *
 * Icons are decorative by default (`aria-hidden`). When an icon is the only
 * content of a control, the control itself must carry an accessible name.
 */

const paths: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  listing: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 13h6M7 16.5h9" />
    </>
  ),
  orders: (
    <>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
      <path d="m3 7.5 9 4.5 9-4.5M12 12v9" />
    </>
  ),
  support: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.8L3 21l1.9-5.4A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" />
    </>
  ),
  manage: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </>
  ),
  launch: (
    <>
      <path d="M12 3c3.5 2.2 5.5 5.6 5.5 9.4L17 17H7l-.5-4.6C6.5 8.6 8.5 5.2 12 3z" />
      <circle cx="12" cy="10.5" r="2" />
      <path d="M9 17.5 7 21m8-3.5L17 21" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="m7.5 15 3.5-4 3 2.5 4.5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  message: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8.5 10.5h7" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.2M12 16.2v.2" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  // Nominative use: identifies the contact channel, implies no endorsement.
  whatsapp: (
    <>
      <path d="M3.5 20.5 4.9 16a8 8 0 1 1 3.1 3.1z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.5 0 1-.4 1-.9v-.9l-1.8-.8-.9 1a5.2 5.2 0 0 1-2.2-2.2l1-.9-.8-1.8h-.9c-.5 0-.9.5-.9 1z" />
    </>
  ),
  upwork: (
    <>
      <path d="M4 8v4.5a3.5 3.5 0 0 0 7 0V8" />
      <path d="M11 11.5c1-3 2.4-4.5 4.5-4.5a4 4 0 0 1 0 8c-2.6 0-4-2.4-4.9-5" />
    </>
  ),
}

interface IconProps {
  name: IconName
  className?: string
  /** Provide only when the icon conveys meaning no adjacent text carries. */
  title?: string
  strokeWidth?: number
}

export function Icon({
  name,
  className = 'size-6',
  title,
  strokeWidth = 1.75,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  )
}
