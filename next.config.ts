import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

/**
 * Static export mode, enabled by `npm run build:static`.
 *
 * Produces a plain `out/` folder of HTML/CSS/JS that can be uploaded to any
 * ordinary web host (IONOS, cPanel, shared hosting) with no Node runtime.
 *
 * The catch: `headers()` below stops applying, because static export has no
 * server to send them. `public/.htaccess` carries the same headers for Apache
 * hosts and is copied into the export automatically.
 */
const isStaticExport = process.env.STATIC_EXPORT === 'true'

/**
 * Content Security Policy (Constitution §28).
 * 'unsafe-eval' is permitted in development only — Next's dev overlay requires it.
 * It is never emitted in production.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // The consultation form posts straight to Web3Forms from the browser.
  // This is the only outbound host the site talks to.
  "connect-src 'self' https://api.web3forms.com" + (isDev ? ' ws: wss:' : ''),
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  ...(isStaticExport
    ? {
        output: 'export' as const,
        // No image optimizer without a server. The site uses inline SVG only,
        // so nothing actually depends on this.
        images: { unoptimized: true },
      }
    : {
        images: { formats: ['image/avif', 'image/webp'] as const },
        // Not supported in export mode; public/.htaccess covers Apache hosts.
        async headers() {
          return [{ source: '/:path*', headers: securityHeaders }]
        },
      }),
}

export default nextConfig
