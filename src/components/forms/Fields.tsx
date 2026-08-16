'use client'

import { useId } from 'react'
import { Icon } from '@/components/primitives/Icon'
import { cn } from '@/lib/utils'

/**
 * Form field primitives — Constitution §21, §34
 *
 * Every field here guarantees:
 *  - a visible <label> bound with htmlFor (never placeholder-as-label)
 *  - hint and error wired through aria-describedby
 *  - aria-invalid on failure
 *  - the error stated in TEXT, so it is never carried by colour alone
 *  - a 44px minimum target
 */

const controlBase =
  'w-full min-h-11 rounded-md border bg-surface px-3.5 py-2.5 text-body text-ink-900 ' +
  'transition-colors placeholder:text-ink-500/70 ' +
  'disabled:cursor-not-allowed disabled:bg-surface-muted'

const controlState = (invalid: boolean) =>
  invalid
    ? 'border-danger'
    : 'border-ink-900/20 hover:border-ink-900/35'

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-body font-semibold text-ink-900"
    >
      {children}
      {required ? (
        <span className="ml-1 text-accent-700" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1.5 text-small font-normal text-ink-500">
          (optional)
        </span>
      )}
    </label>
  )
}

function Messages({
  hintId,
  hint,
  errorId,
  error,
}: {
  hintId: string
  hint?: string
  errorId: string
  error?: string
}) {
  return (
    <>
      {hint && !error ? (
        <p id={hintId} className="mt-1.5 text-small text-ink-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          className="mt-1.5 flex items-start gap-1.5 text-small font-medium text-danger"
        >
          <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </>
  )
}

function describedBy(hint: string | undefined, error: string | undefined, hintId: string, errorId: string) {
  const ids = [hint && !error ? hintId : null, error ? errorId : null].filter(
    Boolean
  )
  return ids.length > 0 ? ids.join(' ') : undefined
}

/* ------------------------------------------------------------------ */

interface BaseFieldProps {
  label: string
  name: string
  hint?: string
  error?: string
  required?: boolean
}

export function InputField({
  label,
  name,
  hint,
  error,
  required,
  type = 'text',
  ...rest
}: BaseFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'id'>) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, hintId, errorId)}
        className={cn(controlBase, controlState(Boolean(error)))}
        {...rest}
      />
      <Messages hintId={hintId} hint={hint} errorId={errorId} error={error} />
    </div>
  )
}

export function SelectField({
  label,
  name,
  hint,
  error,
  required,
  options,
  ...rest
}: BaseFieldProps & {
  options: readonly { value: string; label: string }[]
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name' | 'id'>) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hint, error, hintId, errorId)}
          className={cn(
            controlBase,
            controlState(Boolean(error)),
            'appearance-none pr-10'
          )}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-500"
        />
      </div>
      <Messages hintId={hintId} hint={hint} errorId={errorId} error={error} />
    </div>
  )
}

export function TextareaField({
  label,
  name,
  hint,
  error,
  required,
  ...rest
}: BaseFieldProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'id'>) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, hintId, errorId)}
        className={cn(controlBase, controlState(Boolean(error)), 'resize-y')}
        {...rest}
      />
      <Messages hintId={hintId} hint={hint} errorId={errorId} error={error} />
    </div>
  )
}

export function CheckboxField({
  label,
  name,
  error,
  required,
  ...rest
}: Omit<BaseFieldProps, 'label'> & {
  label: React.ReactNode
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'id' | 'type'>) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'mt-0.5 size-5 shrink-0 rounded border-2 accent-[var(--color-accent-600)]',
            error ? 'border-danger' : 'border-ink-900/30'
          )}
          {...rest}
        />
        <label htmlFor={id} className="text-body text-ink-700">
          {label}
        </label>
      </div>
      {error ? (
        <p
          id={errorId}
          className="mt-1.5 flex items-start gap-1.5 text-small font-medium text-danger"
        >
          <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Honeypot — specs.md §6.1
 * Hidden from sighted users AND from assistive tech, and excluded from the tab
 * order. A real person cannot fill it in; naive bots will.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website-field">Website</label>
      <input
        id="website-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  )
}
