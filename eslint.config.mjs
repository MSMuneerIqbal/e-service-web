import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

/**
 * ESLint flat config.
 *
 * `next lint` was removed in Next 16, so the lint script calls eslint directly.
 * eslint-config-next 16 ships flat-config arrays under its subpath exports.
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // Enforced by the design system: components must not invent one-off
      // values, but that is a review concern rather than a lintable one.
      // Kept minimal deliberately - a noisy lint config gets ignored.
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
]

export default config
