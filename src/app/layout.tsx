import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { site } from '@/content/site'
import { jsonLd, organizationSchema, websiteSchema } from '@/lib/seo'
import { SkipLink } from '@/components/layout/SkipLink'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { StickyCta } from '@/components/layout/StickyCta'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: `${site.businessName} — Marketplace Management for eBay, Amazon & TikTok Shop`,
    template: `%s | ${site.businessName}`,
  },
  description: site.tagline,
  applicationName: site.businessName,
  formatDetection: { telephone: false, address: false, email: false },
}

export const viewport: Viewport = {
  themeColor: '#0a1a2f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schema = jsonLd(websiteSchema(), organizationSchema())

  return (
    <html lang={site.language} className={inter.variable}>
      <body className="flex min-h-dvh flex-col antialiased">
        <script
          type="application/ld+json"
          // Serialised from typed builders in lib/seo.ts, never from user input.
          dangerouslySetInnerHTML={{ __html: schema }}
        />
        <SkipLink />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  )
}
