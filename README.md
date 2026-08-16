# Marketplace Management Website

Next.js site for a marketplace management and growth business serving eBay, Amazon and TikTok Shop sellers.

**Document chain:** [constitution.md](constitution.md) governs → [specs.md](specs.md) specifies → [plan.md](plan.md) plans → [task.md](task.md) tracks → this README operates.
**Outstanding client input:** [CLIENT_INPUTS.md](CLIENT_INPUTS.md)

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` for both the app and the test suite |
| `npm run lint` | ESLint |
| `npm test` | Test suite (67 tests) |
| `npm run verify` | typecheck → lint → build → test. **Run this before deploying.** |

Requires **Node 22.6+** — the test suite uses Node's built-in runner and its type stripping, so there is no Jest/Vitest/ts-node dependency. The app itself only needs Node 20.9+.

---

## Tests

```bash
npm run verify
```

67 tests across three files. They exist to guard the rules that are easy to break silently — a broken layout is obvious, but a future author adding "10+ years of experience" to a service description is not.

| File | Guards |
|---|---|
| `tests/content-invariants.test.ts` | Banned language; every "guarantee" is a refusal; no digits in service claims; no percentage or currency claims; each service has a limitations statement; "A to Z" never leaks into rendered copy; marketplace vocabulary does not overlap; FAQ answers unique; proof records carry permission flags |
| `tests/validation.test.ts` | Consultation schema: required fields, formats, length caps, consent must be literal `true`, plain-language error messages, **and that the bot traps stay permissive at the schema layer** |
| `tests/rendered-output.test.ts` | Assertions against the prerendered HTML in `.next`: one `<h1>` per page, canonical + OG, no banned phrases in shipped bytes, no standalone `Organization` schema without a contact point, no `aggregateRating`/`Review`/`foundingDate`, non-affiliation footer present, `/amazon` free of "A to Z", gated pages `noindex`, no empty-section shells, marketplace pages <50% sentence overlap |

`rendered-output` needs a build first — it skips with a clear message if `.next` is absent. That is why `verify` builds before testing.

### Two regression guards worth knowing about

**The honeypot must stay permissive in the Zod schema.** An earlier version enforced `website` as empty, which made a tripped honeypot fail validation with a `422` naming the trap field — telling bots exactly what caught them. `tests/validation.test.ts` asserts a filled honeypot still *passes* schema validation so the route can reject it with a silent `200`.

**Blocklists cannot see negation.** The constitution requires the site to say *"we do not promise guaranteed sales"*, so a flat substring blocklist for "guaranteed sales" fails on exactly the honest wording it is meant to protect. The banned-phrase test excludes those terms and a separate context-aware test checks every occurrence of "guarantee" is preceded by a negation.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in. **Never commit `.env.local`.**

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes for production | Origin for canonicals, OG URLs, sitemap. No trailing slash. |
| `RESEND_API_KEY` | Yes for the form | Transactional email. Server-only — must never be prefixed `NEXT_PUBLIC_`. |
| `BUSINESS_INBOX` | Yes for the form | Where consultation requests are delivered. |
| `MAIL_FROM` | Yes for the form | Verified sender on your Resend domain. |
| `UPSTASH_REDIS_REST_URL` | Recommended | Distributed rate limiting — see note below. |
| `UPSTASH_REDIS_REST_TOKEN` | Recommended | " |

**Without the three email variables the form still validates and responds correctly, but returns a handled `502 not_configured` and the user sees the fallback error message.** It never fails silently.

### Rate limiting caveat

`src/lib/ratelimit.ts` currently uses an in-memory map. On serverless (Vercel) each lambda instance has its own memory, so this is **best effort only** — a determined caller hitting cold instances can exceed the limit. It deters casual abuse and nothing more. For production, install `@upstash/ratelimit` and swap the implementation; `checkRateLimit()` is already shaped for a drop-in replacement.

---

## Editing content

**All copy lives in `src/content/`. Components take props and contain no hardcoded text.** You should not need to touch a component to change wording.

| File | Contains |
|---|---|
| `site.ts` | Business name, tagline, CTA wording, contact channels, social links |
| `services.ts` | The four core services and two packaged offerings — full copy |
| `marketplaces.ts` | eBay / Amazon / TikTok Shop profiles, platform terms, workflows |
| `faqs.ts` | Per-page FAQ sets |
| `home.ts` | Value propositions, process steps, launch journey |
| `navigation.ts` | Primary nav and footer columns |
| `proof.ts` | Case studies, testimonials, team — **all empty** |
| `blog.ts` | Blog posts — **empty** |
| `types.ts` | Type definitions, including the anti-fabrication guards |

### Adding a contact method

Edit `site.ts`:

```ts
contact: [
  { label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com', event: 'email_click' },
  { label: 'WhatsApp', value: '+00 000 000 0000', href: 'https://wa.me/000000000000', event: 'whatsapp_click' },
],
```

The footer and contact page pick it up automatically. While the array is empty, those blocks render nothing rather than a placeholder.

---

## The anti-fabrication guards

Three content types use the literal type `true`:

```ts
CaseStudy.clientPermission: true
Testimonial.verified:       true
TeamMember.real:            true
```

Adding a record without them **fails the TypeScript build**. This turns Constitution §48 Rules 1, 2 and 11 into a compile check instead of something a future author has to remember. Do not relax them to `boolean`.

Evidence sections are also data-gated: home testimonials, home case studies, and the About team section return `null` on an empty array, and `/case-studies` and `/blog` set `noindex` and drop out of the sitemap while empty. Nothing renders a "coming soon" shell.

---

## Architecture

```
src/
  app/          routes, API handler, sitemap, robots, OG image
  components/
    primitives/ Button, Section, Container, Badge, Icon
    layout/     Navbar, MobileDrawer, Footer, StickyCta, Reveal, Breadcrumbs
    marketing/  Hero, cards, Blocks, FAQAccordion, MarketplacePage
    marketplace/ SVG visuals — DashboardVisual, ListingPreview, ResearchMatrix
    forms/      Fields, ConsultationForm
  content/      all editable copy
  lib/          seo, validation, email, ratelimit, analytics, utils
  styles/       globals.css — design tokens in @theme
```

**Server components by default.** Only four components ship client JavaScript: `NavDropdown`, `MobileDrawer`, `StickyCta`, `Reveal`, plus `ConsultationForm` on `/contact`. Everything else renders on the server.

**All imagery is inline SVG.** There are no raster assets anywhere — the hero dashboard, listing before/after, research matrix, brand mark, favicon and OG image are all generated from code. Every page ships **zero image bytes**, which is the single biggest reason mobile LCP holds up.

**Design tokens** live in one `@theme` block in `src/styles/globals.css`. Colours are contrast-checked and documented there. Do not invent one-off values in components.

---

## Deployment (Vercel)

1. Push to a Git repository and import into Vercel.
2. Add the environment variables above under Project → Settings → Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy. Every page is statically generated except `/api/consultation`.

Security headers (CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `nosniff`) are set in `next.config.ts` and apply to all routes.

---

## Before going live

Work through [CLIENT_INPUTS.md](CLIENT_INPUTS.md). The blocking items are: entity type, lead inbox, contact number, Resend setup, reviewed privacy policy, reviewed terms, target regions, production domain, and confirmation of which sourcing models are used.

Then re-run the launch checks:

```bash
npm run verify
```

Verify no page claims a track record, a number, or a guarantee — the site currently makes none of those claims, and [CLIENT_INPUTS.md](CLIENT_INPUTS.md) records exactly what is and is not asserted.
