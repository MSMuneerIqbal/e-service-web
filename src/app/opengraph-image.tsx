import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

/**
 * Social share image — specs.md §10.2
 *
 * Generated at build time from the design tokens, so it stays in sync with the
 * site and needs no external asset. No fonts are fetched (a strict CSP and the
 * offline build both rule that out), so the system stack is used deliberately.
 */

export const alt = `${site.businessName} — marketplace management for eBay, Amazon and TikTok Shop`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a1a2f',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#12263f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="34" height="34" viewBox="0 0 32 32">
              <path
                d="M9 21.5 13.5 15l4 3.5L23 10"
                fill="none"
                stroke="#f59e42"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="23" cy="10" r="2.4" fill="#f59e42" />
            </svg>
          </div>
          <div style={{ color: '#ffffff', fontSize: 30, fontWeight: 700 }}>
            {site.businessName}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1.5,
              maxWidth: 940,
            }}
          >
            Marketplace management for eBay, Amazon and TikTok Shop
          </div>
          <div
            style={{
              marginTop: 26,
              color: '#cbd5e1',
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            Product research, listing optimization, order management and
            customer support.
          </div>
        </div>

        {/* Marketplace strip */}
        <div style={{ display: 'flex', gap: 14 }}>
          {['eBay', 'Amazon', 'TikTok Shop'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                padding: '10px 22px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
