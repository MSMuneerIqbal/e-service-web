import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import { services, coreServices, offerings } from '../src/content/services.ts'
import { marketplaces } from '../src/content/marketplaces.ts'
import { faqs } from '../src/content/faqs.ts'
import { caseStudies, testimonials, team } from '../src/content/proof.ts'
import { posts } from '../src/content/blog.ts'
import { site } from '../src/content/site.ts'

/**
 * Content invariants.
 *
 * These encode the Constitution rules that must never regress. They are the
 * tests worth having: a styling change breaking is obvious, but a future author
 * quietly adding "10+ years experience" to a service description is exactly the
 * kind of thing that ships unnoticed.
 */

/**
 * Phrases that must never appear, in any context.
 *
 * Deliberately excludes "guaranteed sales", "guaranteed rankings" and similar.
 * A flat substring match cannot tell a promise from its refusal, and the
 * constitution requires us to SAY "we do not promise guaranteed sales" — so
 * blocklisting the phrase outright fails on exactly the honest wording it is
 * meant to protect. The `guarantee is a negation` test below checks those with
 * surrounding context instead.
 */
const BANNED = [
  'secret strategy',
  'secret method',
  'hidden method',
  'proven formula',
  'bypass the',
  'cutting-edge',
  'revolutionary',
  'next-generation',
  'synergistic',
  'disruptive',
  'trusted by',
  'years of experience',
  'instant growth',
  'lorem ipsum',
]

/** Every string value reachable from a content object. */
function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out))
  else if (value && typeof value === 'object') {
    Object.values(value).forEach((v) => collectStrings(v, out))
  }
  return out
}

const allServiceText = collectStrings(services)
const allMarketplaceText = collectStrings(marketplaces)
const allFaqText = collectStrings(faqs)

describe('banned language (Constitution 3.3, 41)', () => {
  const corpus = [
    ['services', allServiceText],
    ['marketplaces', allMarketplaceText],
    ['faqs', allFaqText],
  ] as const

  for (const [name, strings] of corpus) {
    test(`${name} contain no banned phrases`, () => {
      const joined = strings.join(' ').toLowerCase()
      const hits = BANNED.filter((phrase) => joined.includes(phrase))
      assert.deepEqual(
        hits,
        [],
        `Banned phrase(s) found in ${name}: ${hits.join(', ')}`
      )
    })
  }

  test('every use of "guarantee" is a negation', () => {
    const joined = [...allServiceText, ...allMarketplaceText, ...allFaqText]
      .join(' ')
      .toLowerCase()

    // Find each occurrence and check the preceding window negates it.
    const negators = [
      'cannot',
      'can not',
      'do not',
      "don't",
      'no ',
      'not ',
      'never',
      'without',
      'anyone promising',
      'anyone offering',
    ]

    for (const match of joined.matchAll(/guarantee/g)) {
      const start = Math.max(0, match.index - 90)
      const window = joined.slice(start, match.index)
      const negated =
        negators.some((n) => window.includes(n)) ||
        // eBay's actual policy name, a factual reference not a promise
        joined.slice(match.index - 18, match.index + 9).includes('money back')
      assert.ok(
        negated,
        `Unqualified "guarantee" at index ${match.index}: ...${joined.slice(start, match.index + 60)}...`
      )
    }
  })
})

describe('no fabricated numeric claims (Constitution 3.4)', () => {
  test('service copy contains no standalone statistics', () => {
    // Allow legitimate figures: prices in the demo listing, "5.3", "IPX5",
    // "30-hour" etc. live in components, not here. Service copy should have
    // no digits attached to a claim at all.
    const claimFields = services.flatMap((s) => [
      s.shortDescription,
      s.longDescription,
      s.limitations,
      ...s.bullets,
      ...s.deliverables,
      ...s.process.map((p) => p.description),
    ])

    const withDigits = claimFields.filter((text) => /\d/.test(text))
    assert.deepEqual(
      withDigits,
      [],
      `Service claim copy must contain no digits. Offenders:\n${withDigits.join('\n')}`
    )
  })

  test('no percentage or currency claims anywhere in content', () => {
    const joined = [
      ...allServiceText,
      ...allMarketplaceText,
      ...allFaqText,
    ].join(' ')
    assert.equal(/\d+\s*%/.test(joined), false, 'percentage claim found')
    assert.equal(/[$£€]\s*\d/.test(joined), false, 'currency claim found')
  })
})

describe('service structure', () => {
  test('four core services and two packaged offerings', () => {
    assert.equal(coreServices.length, 4)
    assert.equal(offerings.length, 2)
    assert.equal(services.length, 6)
  })

  test('every service carries an honest limitations statement', () => {
    for (const service of services) {
      assert.ok(
        service.limitations && service.limitations.length > 80,
        `${service.slug} needs a substantive limitations statement (Constitution 3.3)`
      )
    }
  })

  test('service slugs are unique', () => {
    const slugs = services.map((s) => s.slug)
    assert.equal(new Set(slugs).size, slugs.length)
  })

  test('every service has SEO metadata within length limits', () => {
    for (const service of services) {
      assert.ok(service.metaTitle.length > 0 && service.metaTitle.length <= 70, `${service.slug} metaTitle length`)
      assert.ok(
        service.metaDescription.length > 0 && service.metaDescription.length <= 165,
        `${service.slug} metaDescription length ${service.metaDescription.length}`
      )
    }
  })
})

describe('"A to Z" containment (specs.md 2.1)', () => {
  test('appears only as clientTerm, never in rendered copy', () => {
    for (const service of services) {
      const rendered = [
        service.title,
        service.navLabel,
        service.shortDescription,
        service.longDescription,
        service.limitations,
        service.metaTitle,
        service.metaDescription,
        ...service.bullets,
        ...service.deliverables,
        ...service.process.flatMap((p) => [p.title, p.description]),
      ].join(' ')

      assert.equal(
        /a[\s-]to[\s-]z/i.test(rendered),
        false,
        `"${service.slug}" leaks "A to Z" into rendered copy`
      )
    }
  })

  test('no marketplace content mentions A-to-Z claim handling', () => {
    assert.equal(
      /a[\s-]to[\s-]z/i.test(allMarketplaceText.join(' ')),
      false,
      'A-to-Z claim support is not an offered service'
    )
  })
})

describe('marketplace uniqueness (Constitution 22.2)', () => {
  test('three marketplaces are defined', () => {
    assert.equal(marketplaces.length, 3)
    assert.deepEqual(
      marketplaces.map((m) => m.id),
      ['ebay', 'amazon', 'tiktok']
    )
  })

  test('platform terms do not overlap between marketplaces', () => {
    const termSets = marketplaces.map(
      (m) => new Set(m.platformTerms.map((t) => t.term.toLowerCase()))
    )

    for (let i = 0; i < termSets.length; i++) {
      for (let j = i + 1; j < termSets.length; j++) {
        const a = termSets[i]!
        const b = termSets[j]!
        const shared = [...a].filter((t) => b.has(t))
        assert.deepEqual(
          shared,
          [],
          `${marketplaces[i]!.name} and ${marketplaces[j]!.name} share terms: ${shared.join(', ')}`
        )
      }
    }
  })

  test('workflow descriptions do not repeat between marketplaces', () => {
    const all = marketplaces.flatMap((m) =>
      m.workflow.map((w) => w.description)
    )
    assert.equal(
      new Set(all).size,
      all.length,
      'A workflow description is duplicated across marketplaces'
    )
  })

  test('each marketplace defines enough distinct vocabulary', () => {
    for (const m of marketplaces) {
      assert.ok(
        m.platformTerms.length >= 5,
        `${m.name} needs at least 5 platform-specific terms to justify its own page`
      )
      assert.ok(m.workflow.length >= 4, `${m.name} needs a real workflow`)
      assert.ok(m.audience.length >= 3, `${m.name} needs an audience section`)
    }
  })
})

describe('FAQ integrity', () => {
  test('no answer is reused across pages', () => {
    const answers = faqs.map((f) => f.answer)
    assert.equal(
      new Set(answers).size,
      answers.length,
      'Duplicate FAQ answer found (Constitution 22.2)'
    )
  })

  test('no question is reused', () => {
    const questions = faqs.map((f) => f.question)
    assert.equal(new Set(questions).size, questions.length)
  })

  test('every FAQ is assigned to at least one route', () => {
    for (const faq of faqs) {
      assert.ok(faq.pages.length > 0, `Orphaned FAQ: ${faq.question}`)
    }
  })

  test('home FAQ includes a "what we do not do" answer (Constitution 16)', () => {
    const homeFaqs = faqs.filter((f) => f.pages.includes('/'))
    const hasBoundary = homeFaqs.some((f) =>
      /do not|don't/i.test(f.answer) && /review|feedback|rules/i.test(f.answer)
    )
    assert.ok(hasBoundary, 'Home FAQ must state what is not offered')
  })
})

describe('proof gating (Constitution 9, 41, 48)', () => {
  test('no unverified proof records exist', () => {
    for (const item of caseStudies) {
      assert.equal(item.clientPermission, true, `${item.slug} lacks permission`)
      assert.ok(item.timeframe, `${item.slug} lacks required timeframe context`)
    }
    for (const item of testimonials) {
      assert.equal(item.verified, true)
    }
    for (const member of team) {
      assert.equal(member.real, true)
    }
  })

  test('blog posts each name a real author', () => {
    for (const post of posts) {
      assert.ok(
        post.author && post.author.trim().length > 0,
        `Post "${post.slug}" must name a real author (Constitution 48 Rule 2)`
      )
    }
  })
})

describe('site configuration', () => {
  test('consultation is typed as genuinely free', () => {
    assert.equal(site.consultationIsFree, true)
  })

  test('CTA wording matches the free-consultation claim', () => {
    assert.match(site.primaryCtaLabel, /free/i)
  })

  test('no placeholder contact details are shipped', () => {
    for (const channel of site.contact) {
      assert.equal(
        /example\.com|000|xxx|your@|placeholder|lorem/i.test(channel.value),
        false,
        `Placeholder contact detail: ${channel.value}`
      )
    }
  })

  test('baseUrl has no trailing slash', () => {
    assert.equal(site.baseUrl.endsWith('/'), false)
  })
})
