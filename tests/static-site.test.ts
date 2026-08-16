import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

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
    const allowed = new Set([
      'NEXT_PUBLIC_SITE_URL',
      'NEXT_PUBLIC_WEB3FORMS_KEY',
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
