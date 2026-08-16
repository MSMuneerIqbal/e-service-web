import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import {
  consultationSchema,
  flattenErrors,
  labelFor,
  MARKETPLACE_OPTIONS,
  SERVICE_OPTIONS,
} from '../src/lib/validation.ts'

/**
 * Consultation schema.
 *
 * The bot-trap tests here guard a real bug that shipped and was caught in QA:
 * an earlier schema enforced `website` as empty, which made a tripped honeypot
 * fail validation with a 422 naming the trap field. The traps must stay
 * permissive at the schema layer so the route can reject them silently.
 */

const valid = {
  name: 'Test Person',
  email: 'test@example.com',
  phone: '+44 7700 900000',
  marketplace: 'ebay',
  storeStatus: 'new',
  revenueRange: 'prefer-not-to-say',
  service: 'not-sure',
  message: 'Some context about my store.',
  consent: true,
  website: '',
  renderedAt: Date.now() - 10_000,
}

describe('valid input', () => {
  test('accepts a complete submission', () => {
    const result = consultationSchema.safeParse(valid)
    assert.equal(result.success, true)
  })

  test('message is optional', () => {
    const { message, ...rest } = valid
    void message
    assert.equal(consultationSchema.safeParse(rest).success, true)
  })

  test('revenueRange defaults to prefer-not-to-say', () => {
    const { revenueRange, ...rest } = valid
    void revenueRange
    const result = consultationSchema.safeParse(rest)
    assert.equal(result.success, true)
    if (result.success) {
      assert.equal(result.data.revenueRange, 'prefer-not-to-say')
    }
  })

  test('trims surrounding whitespace', () => {
    const result = consultationSchema.safeParse({
      ...valid,
      name: '  Test Person  ',
    })
    assert.equal(result.success, true)
    if (result.success) assert.equal(result.data.name, 'Test Person')
  })
})

describe('required fields', () => {
  const required = [
    'name',
    'email',
    'phone',
    'marketplace',
    'storeStatus',
    'service',
    'consent',
  ] as const

  for (const field of required) {
    test(`rejects a missing ${field}`, () => {
      const input: Record<string, unknown> = { ...valid }
      delete input[field]
      const result = consultationSchema.safeParse(input)
      assert.equal(result.success, false, `${field} should be required`)
      if (!result.success) {
        assert.ok(
          field in flattenErrors(result.error),
          `error should be keyed to ${field}`
        )
      }
    })
  }
})

describe('field validation', () => {
  test('rejects a malformed email', () => {
    const result = consultationSchema.safeParse({ ...valid, email: 'nope' })
    assert.equal(result.success, false)
  })

  test('rejects a phone number containing letters', () => {
    const result = consultationSchema.safeParse({ ...valid, phone: 'call me' })
    assert.equal(result.success, false)
  })

  test('accepts international phone formats', () => {
    for (const phone of ['+92 300 1234567', '(020) 7946-0958', '+1 555 0100']) {
      assert.equal(
        consultationSchema.safeParse({ ...valid, phone }).success,
        true,
        `should accept ${phone}`
      )
    }
  })

  test('rejects consent that is not explicitly true', () => {
    for (const consent of [false, 'yes', 1, undefined]) {
      assert.equal(
        consultationSchema.safeParse({ ...valid, consent }).success,
        false,
        `consent=${String(consent)} must be rejected`
      )
    }
  })

  test('rejects an unknown marketplace', () => {
    assert.equal(
      consultationSchema.safeParse({ ...valid, marketplace: 'etsy' }).success,
      false
    )
  })

  test('caps message length at 2000', () => {
    assert.equal(
      consultationSchema.safeParse({ ...valid, message: 'x'.repeat(2001) })
        .success,
      false
    )
    assert.equal(
      consultationSchema.safeParse({ ...valid, message: 'x'.repeat(2000) })
        .success,
      true
    )
  })

  test('caps name length at 80', () => {
    assert.equal(
      consultationSchema.safeParse({ ...valid, name: 'x'.repeat(81) }).success,
      false
    )
  })
})

describe('bot traps stay permissive at the schema layer', () => {
  test('a filled honeypot still PASSES validation', () => {
    // Regression guard. If this starts failing, the route will return a 422
    // naming the honeypot field and tell bots exactly what caught them.
    const result = consultationSchema.safeParse({
      ...valid,
      website: 'http://spam.example',
    })
    assert.equal(
      result.success,
      true,
      'honeypot must not be enforced by the schema - the route rejects it silently'
    )
  })

  test('a too-fast renderedAt still passes validation', () => {
    const result = consultationSchema.safeParse({
      ...valid,
      renderedAt: Date.now(),
    })
    assert.equal(result.success, true)
  })
})

describe('error shaping', () => {
  test('flattenErrors returns one message per field', () => {
    const result = consultationSchema.safeParse({})
    assert.equal(result.success, false)
    if (!result.success) {
      const errors = flattenErrors(result.error)
      assert.ok(Object.keys(errors).length > 0)
      for (const message of Object.values(errors)) {
        assert.equal(typeof message, 'string')
        assert.ok(message!.length > 0)
      }
    }
  })

  test('error messages are plain language, not technical', () => {
    const result = consultationSchema.safeParse({ ...valid, email: 'nope' })
    assert.equal(result.success, false)
    if (!result.success) {
      const message = flattenErrors(result.error).email ?? ''
      assert.equal(/zod|regex|schema|invalid_type/i.test(message), false)
      assert.match(message, /email/i)
    }
  })
})

describe('option labels', () => {
  test('labelFor resolves every marketplace value', () => {
    for (const option of MARKETPLACE_OPTIONS) {
      assert.equal(labelFor(MARKETPLACE_OPTIONS, option.value), option.label)
    }
  })

  test('service options include a not-sure escape hatch', () => {
    assert.ok(SERVICE_OPTIONS.some((o) => o.value === 'not-sure'))
  })

  test('revenue options let the user decline', () => {
    assert.ok(
      MARKETPLACE_OPTIONS.some((o) => o.value === 'not-selling-yet'),
      'new sellers must be able to say they have not started'
    )
  })
})
