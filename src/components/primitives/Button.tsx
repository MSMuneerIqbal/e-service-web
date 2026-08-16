import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Button — specs.md §8
 *
 * Renders an <a> when `href` is supplied and a <button> otherwise, so a link
 * is never faked with a click handler (Constitution §34: links and buttons must
 * behave consistently).
 *
 * Every variant has a visible non-hover affordance. Hover is never the only
 * signal that something is interactive (§34).
 */

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[var(--ease-brand)] ' +
  'disabled:cursor-not-allowed disabled:opacity-60 ' +
  // 44px minimum touch target (specs.md §11)
  'min-h-11'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-600 text-white shadow-sm hover:bg-accent-700 active:translate-y-px',
  secondary:
    'border border-ink-900/15 bg-surface text-ink-900 shadow-sm hover:border-ink-900/30 hover:bg-surface-muted active:translate-y-px',
  ghost:
    'text-accent-700 underline decoration-accent-600/40 underline-offset-4 hover:decoration-accent-600',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-small',
  md: 'px-5 py-2.5 text-body',
  lg: 'px-7 py-3.5 text-body-lg',
}

/** Ghost has no fill, so it needs no horizontal padding at any size. */
const ghostSizes: Record<Size, string> = {
  sm: 'text-small',
  md: 'text-body',
  lg: 'text-body-lg',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonAsLink = CommonProps & {
  href: string
  external?: boolean
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>

type ButtonAsButton = CommonProps & {
  href?: undefined
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export type ButtonProps = ButtonAsLink | ButtonAsButton

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...rest
  } = props

  const classes = cn(
    base,
    variants[variant],
    variant === 'ghost' ? ghostSizes[size] : sizes[size],
    className
  )

  if ('href' in props && props.href !== undefined) {
    const { href, external, ...anchorRest } =
      rest as ButtonAsLink

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          rel="noopener noreferrer"
          {...anchorRest}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    )
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof CommonProps | 'href'>

  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
