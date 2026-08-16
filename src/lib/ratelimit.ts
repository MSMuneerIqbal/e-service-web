/**
 * Rate limiting — specs.md §6.3, §13
 *
 * 5 requests per IP per 10 minutes on the consultation endpoint.
 *
 * The in-memory implementation below is per-instance. On serverless that means
 * it is BEST EFFORT ONLY: separate lambda instances do not share the map, so a
 * determined caller hitting cold instances can exceed the limit. It is a real
 * deterrent against casual abuse and worthless against a targeted attack.
 *
 * For production, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN and
 * install @upstash/ratelimit — `checkRateLimit` is already shaped for a drop-in
 * swap. This is documented in README.md rather than pretending the fallback is
 * sufficient.
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

/** Bound the map so a flood of unique IPs cannot grow it without limit. */
const MAX_TRACKED_KEYS = 10_000

function sweep(now: number): void {
  if (buckets.size < MAX_TRACKED_KEYS) return
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
  // Still oversized after sweeping expired entries: drop the oldest.
  if (buckets.size >= MAX_TRACKED_KEYS) {
    const oldest = [...buckets.entries()]
      .sort((a, b) => a[1].resetAt - b[1].resetAt)
      .slice(0, Math.floor(MAX_TRACKED_KEYS / 2))
    for (const [key] of oldest) buckets.delete(key)
  }
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const existing = buckets.get(identifier)

  if (!existing || existing.resetAt <= now) {
    const bucket: Bucket = { count: 1, resetAt: now + WINDOW_MS }
    buckets.set(identifier, bucket)
    return { success: true, remaining: MAX_REQUESTS - 1, resetAt: bucket.resetAt }
  }

  if (existing.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  return {
    success: true,
    remaining: MAX_REQUESTS - existing.count,
    resetAt: existing.resetAt,
  }
}

/**
 * Best-effort client IP from proxy headers.
 * Used only as a rate-limit key and never logged or stored (Constitution §27).
 */
export function clientIdentifier(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]
    if (first) return first.trim()
  }
  return headers.get('x-real-ip') ?? 'unknown'
}
