import { ImageResponse } from 'next/og'

/** Favicon, generated from the brand mark so there is no binary asset to keep in sync. */

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a1a2f',
          borderRadius: 7,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32">
          <path
            d="M8 22 13.5 14.5l4.5 4L24 9"
            fill="none"
            stroke="#f59e42"
            strokeWidth="3.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size
  )
}
