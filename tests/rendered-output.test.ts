import { test, describe, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Rendered-output tests.
 *
 * These assert against the prerendered HTML in .next/server/app rather than
 * against source. That matters: source can be correct while a component quietly
 * leaks a value into the DOM, and it is the shipped bytes the visitor and the
 * crawler actually see.
 *
 * Requires `npm run build` first. The suite skips with a clear message rather
 * than failing if no build is present.
 */

const APP_DIR = join(process.cwd(), '.next', 'server', 'app')
const hasBuild = existsSync(APP_DIR)

const pages = new Map<string, string>()

before(() => {
  if (!hasBuild) return
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.html')) {
        const key = full
          .slice(APP_DIR.length)
          .replace(/\\/g, '/')
          .replace(/\.html$/, '')
        pages.set(key === '/index' ? '/' : key, readFileSync(full, 'utf8'))
      }
    }
  }
  walk(APP_DIR)
})

const skip = hasBuild
  ? false
  : 'No production build found - run `npm run build` first'

/**
 * Framework-internal pages. `_global-error` replaces the entire document and
 * never mounts the root layout, so it legitimately has no canonical, no footer
 * and no shared chrome. Assertions about public pages must not apply to it.
 */
const isPublicPage = (path: string) => !path.split('/').pop()!.startsWith('_')

const publicPages = () =>
  [...pages.entries()].filter(([path]) => isPublicPage(path))

describe('shipped HTML', { skip }, () => {
  test('all expected pages were prerendered', () => {
    assert.ok(pages.size >= 15, `only ${pages.size} pages prerendered`)
    for (const key of ['/', '/about', '/contact', '/ebay', '/amazon', '/tiktok-shop']) {
      assert.ok(pages.has(key), `missing prerendered page: ${key}`)
    }
  })

  test('every page has exactly one <h1>', () => {
    for (const [path, html] of pages) {
      const count = (html.match(/<h1[\s>]/g) ?? []).length
      assert.equal(count, 1, `${path} has ${count} h1 elements`)
    }
  })

  test('every public page has a canonical link and OG title', () => {
    for (const [path, html] of publicPages()) {
      assert.match(html, /rel="canonical"/, `${path} missing canonical`)
      assert.match(html, /property="og:title"/, `${path} missing og:title`)
    }
  })

  test('no page contains banned promotional language', () => {
    const banned = [
      'secret strategy',
      'secret method',
      'hidden method',
      'proven formula',
      'bypass the',
      'cutting-edge',
      'revolutionary',
      'next-generation',
      'synergistic',
      'trusted by',
      'years of experience',
      'lorem ipsum',
      '$2000',
      '2000+',
    ]
    for (const [path, html] of pages) {
      const lower = html.toLowerCase()
      for (const phrase of banned) {
        assert.equal(
          lower.includes(phrase),
          false,
          `${path} contains banned phrase "${phrase}"`
        )
      }
    }
  })

  test('every "guarantee" in shipped HTML is a refusal', () => {
    for (const [path, html] of pages) {
      const text = html.toLowerCase()
      for (const match of text.matchAll(/guarantee/g)) {
        const window = text.slice(Math.max(0, match.index - 100), match.index)
        const negated =
          /cannot|can not|do not|don't|no |not |never|without|promising|offering/.test(
            window
          ) || text.slice(match.index - 20, match.index).includes('money back')
        assert.ok(negated, `${path}: unqualified guarantee near index ${match.index}`)
      }
    }
  })
})

describe('anti-fabrication in shipped HTML', { skip }, () => {
  test('no STANDALONE Organization entity is emitted without a contact point', () => {
    // lib/seo.ts returns null for the Organization entity until real contact
    // details exist, because an organisation record with no way to reach it
    // asserts more than we can support (Constitution 22.4).
    //
    // A `provider: {Organization, name, url}` nested inside a Service is a
    // different thing: it names who provides the service, both values are
    // true, and Service schema is meaningless without it. Only the standalone
    // entity — identified by the #organization @id — is checked here.
    for (const [path, html] of pages) {
      if (!html.includes('#organization')) continue
      const hasContact =
        html.includes('"contactPoint"') || html.includes('"sameAs"')
      assert.ok(
        hasContact,
        `${path} emits a standalone Organization entity with no verifiable contact point`
      )
    }
  })

  test('provider references assert nothing beyond name and url', () => {
    for (const [path, html] of pages) {
      for (const match of html.matchAll(
        /"provider":\{"@type":"Organization"(.*?)\}/g
      )) {
        const body = match[1] ?? ''
        for (const overclaim of [
          'aggregateRating',
          'foundingDate',
          'numberOfEmployees',
          'award',
          'slogan',
        ]) {
          assert.equal(
            body.includes(overclaim),
            false,
            `${path} provider asserts unverified "${overclaim}"`
          )
        }
      }
    }
  })

  test('no rating, review or price schema is emitted', () => {
    for (const [path, html] of pages) {
      for (const forbidden of [
        'aggregateRating',
        '"@type":"Review"',
        'foundingDate',
        '"award"',
      ]) {
        assert.equal(
          html.includes(forbidden),
          false,
          `${path} emits forbidden schema field ${forbidden}`
        )
      }
    }
  })

  test('non-affiliation statement appears on every public page', () => {
    for (const [path, html] of publicPages()) {
      assert.match(
        html,
        /Not affiliated with, endorsed by, or certified by/,
        `${path} missing the non-affiliation footer statement (Constitution 43)`
      )
    }
  })

  test('illustrative data always carries an Example label', () => {
    // Pages that render a demo visual must label it (Constitution 42).
    for (const path of ['/', '/services/product-research', '/services/listing-optimization']) {
      const html = pages.get(path)
      if (!html) continue
      assert.match(
        html,
        /Example/,
        `${path} renders illustrative data without an Example label`
      )
    }
  })
})

describe('"A to Z" containment (specs.md 2.1)', { skip }, () => {
  test('the phrase never appears on the Amazon page', () => {
    const html = pages.get('/amazon')
    assert.ok(html, 'amazon page not prerendered')
    assert.ok(html!.length > 10_000, 'amazon page suspiciously short - check the fixture')
    assert.equal(
      /a[\s-]to[\s-]z/i.test(html!),
      false,
      'An Amazon seller reads "A to Z" as buyer-claim handling, which is not offered'
    )
  })
})

describe('gating (specs.md 5.5, 5.7)', { skip }, () => {
  test('empty case-studies and blog pages are noindex', () => {
    for (const path of ['/case-studies', '/blog']) {
      const html = pages.get(path)
      if (!html) continue
      assert.match(
        html,
        /name="robots"[^>]*noindex/,
        `${path} must be noindex while empty`
      )
    }
  })

  test('legal scaffolds are noindex until reviewed', () => {
    for (const path of ['/privacy-policy', '/terms']) {
      const html = pages.get(path)
      if (!html) continue
      assert.match(html, /name="robots"[^>]*noindex/, `${path} must be noindex`)
    }
  })

  test('indexable pages are not accidentally noindexed', () => {
    for (const path of ['/', '/services', '/ebay', '/amazon', '/tiktok-shop', '/about', '/contact']) {
      const html = pages.get(path)
      if (!html) continue
      assert.equal(
        /name="robots"[^>]*noindex/.test(html),
        false,
        `${path} must be indexable`
      )
    }
  })

  test('no empty-section shells are rendered', () => {
    const home = pages.get('/')
    assert.ok(home)
    // Gated sections return null, so their headings must be absent entirely.
    assert.equal(
      home!.includes('id="testimonials-heading"'),
      false,
      'Testimonials section rendered a shell despite having no data'
    )
    assert.equal(
      home!.includes('id="cases-heading"'),
      false,
      'Case studies section rendered a shell despite having no data'
    )
  })
})

describe('marketplace page uniqueness (Constitution 22.2)', { skip }, () => {
  const strip = (html: string) =>
    html
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .toLowerCase()

  test('no two marketplace pages share more than half their sentences', () => {
    const paths = ['/ebay', '/amazon', '/tiktok-shop']
    const texts = paths.map((p) => strip(pages.get(p) ?? ''))

    const sentences = (t: string) =>
      new Set(
        t
          .split(/(?<=[.!?])\s+/)
          .map((s) => s.trim())
          .filter((s) => s.length > 40)
      )

    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        const a = sentences(texts[i]!)
        const b = sentences(texts[j]!)
        assert.ok(a.size > 5, `${paths[i]} has too little content to compare`)
        const shared = [...a].filter((s) => b.has(s)).length
        const overlap = shared / a.size
        assert.ok(
          overlap < 0.5,
          `${paths[i]} and ${paths[j]} overlap ${(overlap * 100).toFixed(0)}% - too similar`
        )
      }
    }
  })
})
