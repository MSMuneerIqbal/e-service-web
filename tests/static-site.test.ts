import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { resolveBaseUrl } from '../src/content/site.ts'

/**
 * Static-site guarantees.
 *
 * The site must stay fully static: no API routes, no serverless functions, no
 * server-side secrets. These tests fail the build if someone reintroduces a
 * backend, because that would silently change the deployment model and add
 * runtime cost on Vercel.
 */

const ROOT = process.cwd()
const APP = join(ROOT, 'src', 'app')

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

const appFiles = walk(APP)
const srcFiles = walk(join(ROOT, 'src'))

describe('no backend', () => {
  test('there are no route handlers', () => {
    const handlers = appFiles.filter((f) => /[\\/]route\.(ts|js|tsx)$/.test(f))
    assert.deepEqual(
      handlers.map((f) => f.slice(ROOT.length)),
      [],
      'A route handler makes this a serverless deployment rather than a static one'
    )
  })

  test('there is no /api directory', () => {
    assert.equal(existsSync(join(APP, 'api')), false)
  })

  test('no page opts into dynamic or nodejs runtime', () => {
    for (const file of appFiles.filter((f) => /\.(ts|tsx)$/.test(f))) {
      const source = readFileSync(file, 'utf8')
      assert.equal(
        /export\s+const\s+dynamic\s*=\s*['"]force-dynamic['"]/.test(source),
        false,
        `${file.slice(ROOT.length)} forces dynamic rendering`
      )
      assert.equal(
        /export\s+const\s+runtime\s*=/.test(source),
        false,
        `${file.slice(ROOT.length)} pins a server runtime`
      )
    }
  })

  test('no server-only dependencies remain in package.json', () => {
    const pkg = JSON.parse(
      readFileSync(join(ROOT, 'package.json'), 'utf8')
    ) as { dependencies?: Record<string, string> }

    const serverOnly = ['resend', 'nodemailer', '@upstash/redis', '@upstash/ratelimit', 'express', 'prisma']
    for (const dep of serverOnly) {
      assert.equal(
        dep in (pkg.dependencies ?? {}),
        false,
        `${dep} implies a backend this site does not have`
      )
    }
  })
})

describe('no leaked secrets', () => {
  test('no server-side secret env vars are referenced', () => {
    // Anything the browser needs must be NEXT_PUBLIC_ and therefore public.
    // A non-public env var in a static build is either dead code or a mistake.
    //
    // The two VERCEL_* entries are build-time only, injected by the platform,
    // and contain a hostname rather than a credential. They are read solely to
    // derive the site origin for SEO metadata (see content/site.ts).
    const allowed = new Set([
      'NEXT_PUBLIC_SITE_URL',
      'NEXT_PUBLIC_WEB3FORMS_KEY',
      'VERCEL_PROJECT_PRODUCTION_URL',
      'VERCEL_URL',
      'NODE_ENV',
    ])

    for (const file of srcFiles.filter((f) => /\.(ts|tsx)$/.test(f))) {
      const source = readFileSync(file, 'utf8')
      for (const match of source.matchAll(/process\.env\.([A-Z0-9_]+)/g)) {
        const name = match[1]!
        assert.ok(
          allowed.has(name),
          `${file.slice(ROOT.length)} reads process.env.${name}, which cannot exist in a static build`
        )
      }
    }
  })

  test('the form access key is public by design, not a secret', () => {
    const forms = readFileSync(join(ROOT, 'src', 'lib', 'forms.ts'), 'utf8')
    assert.match(
      forms,
      /NEXT_PUBLIC_WEB3FORMS_KEY/,
      'the access key must be a NEXT_PUBLIC_ var so the browser can read it'
    )
    // Guard against someone pasting a real key in as a fallback default.
    assert.equal(
      /NEXT_PUBLIC_WEB3FORMS_KEY\s*\?\?\s*['"][a-f0-9-]{8,}['"]/i.test(forms),
      false,
      'a hardcoded access key fallback would commit the key to the repo'
    )
  })

  test('.env.example contains names only, never values', () => {
    const example = readFileSync(join(ROOT, '.env.example'), 'utf8')
    for (const line of example.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const [name, ...rest] = trimmed.split('=')
      const value = rest.join('=').trim()
      // A documented placeholder origin is fine; anything else is a real value.
      const isPlaceholder = value === '' || value === 'https://example.com'
      assert.ok(
        isPlaceholder,
        `.env.example sets a real value for ${name}`
      )
    }
  })
})

describe('deployment readiness', () => {
  test('explicit configuration wins over everything', () => {
    assert.equal(
      resolveBaseUrl({
        NEXT_PUBLIC_SITE_URL: 'https://real-domain.com',
        VERCEL_PROJECT_PRODUCTION_URL: 'proj.vercel.app',
        VERCEL_URL: 'deploy-abc.vercel.app',
      }),
      'https://real-domain.com'
    )
  })

  test('falls back to the stable production domain', () => {
    assert.equal(
      resolveBaseUrl({
        VERCEL_PROJECT_PRODUCTION_URL: 'proj.vercel.app',
        VERCEL_URL: 'deploy-abc.vercel.app',
      }),
      'https://proj.vercel.app'
    )
  })

  test('falls back to the per-deployment URL for previews', () => {
    assert.equal(
      resolveBaseUrl({ VERCEL_URL: 'deploy-abc.vercel.app' }),
      'https://deploy-abc.vercel.app'
    )
  })

  test('localhost is the last resort only', () => {
    assert.equal(resolveBaseUrl({}), 'http://localhost:3000')
  })

  test('empty strings are ignored, not treated as configured', () => {
    // A Vercel env var set but left blank is a very easy mistake to make.
    assert.equal(
      resolveBaseUrl({
        NEXT_PUBLIC_SITE_URL: '',
        VERCEL_PROJECT_PRODUCTION_URL: '   ',
        VERCEL_URL: 'deploy-abc.vercel.app',
      }),
      'https://deploy-abc.vercel.app'
    )
  })

  test('bare hostnames get https, existing schemes are preserved', () => {
    assert.equal(resolveBaseUrl({ VERCEL_URL: 'x.vercel.app' }), 'https://x.vercel.app')
    assert.equal(
      resolveBaseUrl({ NEXT_PUBLIC_SITE_URL: 'http://staging.local' }),
      'http://staging.local'
    )
  })

  test('trailing slashes are stripped', () => {
    // Double slashes in canonicals are a real and easily-missed SEO defect.
    assert.equal(
      resolveBaseUrl({ NEXT_PUBLIC_SITE_URL: 'https://real-domain.com///' }),
      'https://real-domain.com'
    )
  })

  test('favicon and social image are real files, not dynamic routes', () => {
    // Regression guard. These were previously ImageResponse routes
    // (app/icon.tsx, app/opengraph-image.tsx). Dynamic image routes emit
    // NOTHING under `output: 'export'`, so on static hosting the favicon and
    // every social preview 404'd while the build reported success.
    assert.ok(
      existsSync(join(ROOT, 'src', 'app', 'icon.svg')),
      'favicon must be a static file so it survives a static export'
    )
    assert.ok(
      existsSync(join(ROOT, 'public', 'og.png')),
      'social image must be a static file so it survives a static export'
    )
    assert.equal(
      existsSync(join(ROOT, 'src', 'app', 'icon.tsx')),
      false,
      'a dynamic icon route would produce no file in a static export'
    )
    assert.equal(
      existsSync(join(ROOT, 'src', 'app', 'opengraph-image.tsx')),
      false,
      'a dynamic OG route would produce no file in a static export'
    )
  })

  test('an .htaccess exists to carry headers on non-Vercel hosts', () => {
    // next.config.ts headers() does not apply to a static export - there is no
    // server to send them. Without this file the exported site would ship with
    // no security headers at all.
    const htaccess = join(ROOT, 'public', '.htaccess')
    assert.ok(existsSync(htaccess), 'public/.htaccess is required for static hosting')

    const source = readFileSync(htaccess, 'utf8')
    for (const header of [
      'X-Content-Type-Options',
      'X-Frame-Options',
      'Referrer-Policy',
      'Content-Security-Policy',
      'Strict-Transport-Security',
    ]) {
      assert.match(source, new RegExp(header), `.htaccess must set ${header}`)
    }
    assert.match(
      source,
      /api\.web3forms\.com/,
      '.htaccess CSP must allow the form endpoint or submissions will be blocked'
    )
  })

  test('package.json declares a Node engine Vercel can honour', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      engines?: { node?: string }
      scripts?: Record<string, string>
    }
    assert.ok(pkg.engines?.node, 'engines.node should be declared')
    assert.equal(pkg.scripts?.build, 'next build')
  })
})

describe('build output is fully static', () => {
  const buildDir = join(ROOT, '.next', 'server', 'app')
  const skip = existsSync(buildDir)
    ? false
    : 'No production build found - run `npm run build` first'

  test('no API route artifacts were emitted', { skip }, () => {
    const emitted = walk(buildDir).filter((f) =>
      /[\\/]api[\\/].*route\.js$/.test(f)
    )
    assert.deepEqual(emitted, [])
  })

  test('every emitted route handler is prerendered, not on-demand', { skip }, () => {
    // Next compiles its own metadata routes (icon, opengraph-image, robots.txt,
    // sitemap.xml) to route.js. That is fine ONLY while they are prerendered at
    // build time and served as static files. If one ever becomes dynamic it
    // would deploy as a live function, which is what this guards against.
    const manifestPath = join(ROOT, '.next', 'prerender-manifest.json')
    if (!existsSync(manifestPath)) return

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
      routes?: Record<string, unknown>
    }
    const prerendered = new Set(Object.keys(manifest.routes ?? {}))

    const handlers = walk(buildDir)
      .filter((f) => /[\\/]route\.js$/.test(f))
      .map((f) => {
        const rel = f.slice(buildDir.length).replace(/\\/g, '/')
        return '/' + rel.replace(/^\//, '').replace(/\/route\.js$/, '')
      })

    for (const route of handlers) {
      assert.ok(
        prerendered.has(route),
        `${route} emits a route handler that is NOT prerendered - it would deploy as a serverless function`
      )
    }
  })

  test('every public page was prerendered to HTML', { skip }, () => {
    const html = walk(buildDir).filter((f) => f.endsWith('.html'))
    assert.ok(
      html.length >= 15,
      `expected every page prerendered, found ${html.length} HTML files`
    )
  })
})
