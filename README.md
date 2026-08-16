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

76 tests across four files. They exist to guard the rules that are easy to break silently — a broken layout is obvious, but a future author adding "10+ years of experience" to a service description is not.

| File | Guards |
|---|---|
| `tests/content-invariants.test.ts` | Banned language; every "guarantee" is a refusal; no digits in service claims; no percentage or currency claims; each service has a limitations statement; "A to Z" never leaks into rendered copy; marketplace vocabulary does not overlap; FAQ answers unique; proof records carry permission flags |
| `tests/validation.test.ts` | Consultation schema: required fields, formats, length caps, consent must be literal `true`, plain-language error messages, **and that the bot traps stay permissive at the schema layer** |
| `tests/static-site.test.ts` | That the site stays static: no route handlers, no `/api` directory, no `runtime`/`force-dynamic` exports, no server-only dependencies, no non-public env vars, no hardcoded access key, and no real values in `.env.example` |
| `tests/rendered-output.test.ts` | Assertions against the prerendered HTML in `.next`: one `<h1>` per page, canonical + OG, no banned phrases in shipped bytes, no standalone `Organization` schema without a contact point, no `aggregateRating`/`Review`/`foundingDate`, non-affiliation footer present, `/amazon` free of "A to Z", gated pages `noindex`, no empty-section shells, marketplace pages <50% sentence overlap |

`rendered-output` needs a build first — it skips with a clear message if `.next` is absent. That is why `verify` builds before testing.

### Two regression guards worth knowing about

**The honeypot must stay permissive in the Zod schema.** An earlier version enforced `website` as empty, which made a tripped honeypot fail validation with a `422` naming the trap field — telling bots exactly what caught them. `tests/validation.test.ts` asserts a filled honeypot still *passes* schema validation so the route can reject it with a silent `200`.

**Blocklists cannot see negation.** The constitution requires the site to say *"we do not promise guaranteed sales"*, so a flat substring blocklist for "guaranteed sales" fails on exactly the honest wording it is meant to protect. The banned-phrase test excludes those terms and a separate context-aware test checks every occurrence of "guarantee" is preceded by a negation.

---

## This site has no backend

Worth stating plainly, because it shapes everything else:

- **No API routes, no serverless functions.** Every route is prerendered to static HTML at build time. The `npm run build` output shows only `○ Static` and `● SSG` — no `ƒ Dynamic` entries.
- **No server-side secrets.** There is nothing to leak, because there is no server.
- **No database, no CMS, no admin panel.** Content lives in typed modules in `src/content/` and changes through code.
- **The consultation form posts directly from the browser** to Web3Forms, which emails the submission to you.

`tests/static-site.test.ts` enforces all of this — adding a route handler, a `runtime` export, or a server-only dependency fails the build.

---

## Environment variables

Two variables, neither of them secret. Set them on Vercel under **Project → Settings → Environment Variables**, or in `.env.local` for local dev.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes for production | Origin for canonicals, OG URLs, sitemap. No trailing slash. |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Yes for the form | Routes form submissions to your inbox. |

### Getting the form key

1. Go to **https://web3forms.com**
2. Enter the email address where you want leads delivered.
3. They email you an access key. No account, no password, free.
4. Set it as `NEXT_PUBLIC_WEB3FORMS_KEY` and redeploy.

**The key is public by design.** It identifies which inbox a submission belongs to and grants no read access to anything, which is why `NEXT_PUBLIC_` is correct here. Never use that prefix for an actual secret.

**Until the key is set,** the form renders with a visible notice saying it is not connected, and refuses to submit. It does not silently discard leads.

### The tradeoff of having no server

With no backend, form validation is **client-side only** and can be bypassed by posting to the provider's endpoint directly. Web3Forms applies its own spam filtering and rate limits on top, and the honeypot plus a minimum-fill-time check still run in the browser.

For a lead form that is a fair exchange for having nothing to run or maintain. It would **not** be acceptable for anything that wrote to a database, moved money, or granted access — those need server-side validation you can trust.

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
  app/          routes, sitemap, robots, OG image (no API handlers)
  components/
    primitives/ Button, Section, Container, Badge, Icon
    layout/     Navbar, MobileDrawer, Footer, StickyCta, Reveal, Breadcrumbs
    marketing/  Hero, cards, Blocks, FAQAccordion, MarketplacePage
    marketplace/ SVG visuals — DashboardVisual, ListingPreview, ResearchMatrix
    forms/      Fields, ConsultationForm
  content/      all editable copy
  lib/          seo, validation, forms, analytics, utils
  styles/       globals.css — design tokens in @theme
```

**Server components by default.** Only four components ship client JavaScript: `NavDropdown`, `MobileDrawer`, `StickyCta`, `Reveal`, plus `ConsultationForm` on `/contact`. Everything else renders on the server.

**All imagery is inline SVG.** There are no raster assets anywhere — the hero dashboard, listing before/after, research matrix, brand mark, favicon and OG image are all generated from code. Every page ships **zero image bytes**, which is the single biggest reason mobile LCP holds up.

**Design tokens** live in one `@theme` block in `src/styles/globals.css`. Colours are contrast-checked and documented there. Do not invent one-off values in components.

---

## Deployment (Vercel)

1. Push to a Git repository and import into Vercel. Framework preset is detected automatically — no build configuration needed.
2. Add the two environment variables under **Project → Settings → Environment Variables**.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy.

**Every page is statically generated.** There are no serverless functions, so the site runs comfortably inside Vercel's free tier and has no cold starts.

Security headers (CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `nosniff`) are set in `next.config.ts` and applied by Vercel to all routes. The CSP `connect-src` allows exactly one outbound host, `api.web3forms.com`, which is the form endpoint.

---

## Before going live

Work through [CLIENT_INPUTS.md](CLIENT_INPUTS.md). The blocking items are: entity type, lead inbox, contact number, Resend setup, reviewed privacy policy, reviewed terms, target regions, production domain, and confirmation of which sourcing models are used.

Then re-run the launch checks:

```bash
npm run verify
```

Verify no page claims a track record, a number, or a guarantee — the site currently makes none of those claims, and [CLIENT_INPUTS.md](CLIENT_INPUTS.md) records exactly what is and is not asserted.
