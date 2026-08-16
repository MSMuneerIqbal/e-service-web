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
| `NEXT_PUBLIC_SITE_URL` | Optional | Origin for canonicals, OG URLs, sitemap. Falls back automatically — see below. |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | For the form only | Routes form submissions to your inbox. |

**You can deploy with neither set.** The site builds and every page works; only the form is inactive.

### Site URL resolves itself

`resolveBaseUrl()` in `src/content/site.ts` picks the origin in this order:

1. `NEXT_PUBLIC_SITE_URL` — explicit, always wins
2. `VERCEL_PROJECT_PRODUCTION_URL` — your stable production domain, injected by Vercel
3. `VERCEL_URL` — this specific deployment, so preview builds get correct URLs too
4. `http://localhost:3000` — local development

This exists because without it, a deploy made before you set `NEXT_PUBLIC_SITE_URL` would emit canonicals, Open Graph tags and a sitemap all pointing at `localhost:3000` — broken for crawlers, and the kind of thing nobody notices until rankings do. Vercel injects 2 and 3 automatically, so **the SEO output is correct on your very first deploy**.

Set `NEXT_PUBLIC_SITE_URL` once you attach a custom domain. Blank values are ignored rather than treated as configured, and trailing slashes are stripped.

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

**Import the repo into Vercel and click Deploy. That is the whole process** — the Next.js preset is detected automatically, there is no build configuration, and no environment variable is required for the site to build and render correctly.

Two things to do afterwards, whenever you are ready:

1. **`NEXT_PUBLIC_WEB3FORMS_KEY`** — until this is set the form shows a visible "not connected yet" notice and refuses to submit. Everything else works.
2. **`NEXT_PUBLIC_SITE_URL`** — only once you attach a custom domain. Until then Vercel's own domain is used automatically.

**Every page is statically generated.** There are no serverless functions, so the site runs comfortably inside Vercel's free tier and has no cold starts.

Security headers (CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `nosniff`) are set in `next.config.ts` and applied by Vercel to all routes. The CSP `connect-src` allows exactly one outbound host, `api.web3forms.com`, which is the form endpoint.

---

## Deploying to ordinary hosting (IONOS, cPanel, shared)

Because the site is fully static it does not need Node on the server. It can be uploaded to any normal web host.

```bash
npm run build:static
```

This produces `out/` — plain HTML, CSS, JS. **Upload the contents of `out/` to your web root** (`/`, `htdocs/`, or `public_html/` depending on host).

### Three things that will bite you

**1. `.htaccess` is a hidden file.** It carries every security header, the HTTPS redirect, the clean-URL rewrite and the 404 page — because `next.config.ts` headers do not apply without a Next server. Most FTP clients and File Managers hide dotfiles by default. **Enable "show hidden files" or the site ships with no security headers and broken URLs.** The build script copies it into `out/` and prints a confirmation line.

**2. Clean URLs depend on `mod_rewrite`.** The export writes `about.html`, and the `.htaccess` rewrites `/about` → `/about.html`. On Apache (IONOS, cPanel) this works out of the box. On nginx you need an equivalent `try_files` rule instead.

**3. Redeploys are manual.** There is no git integration — you re-run `build:static` and re-upload. This is the main reason Vercel is easier.

### Replacing an existing WordPress site

Uploading into a web root that already runs WordPress will collide with its `index.php` and `.htaccess`. Back up and remove the WordPress files first, or move them to a subfolder. Do this only once the new site is confirmed working, and keep the backup.

### Regenerating the social image

`public/og.png` and `src/app/icon.svg` are **static files on purpose**. They were previously dynamic `ImageResponse` routes, which emit nothing under `output: 'export'` — the favicon and every social preview 404'd while the build still reported success.

To regenerate `og.png` after a branding change, render a 1200×630 page and screenshot it:

```bash
chrome --headless=new --window-size=1200,630 --screenshot=public/og.png file:///path/to/template.html
```

---

## Before going live

Work through [CLIENT_INPUTS.md](CLIENT_INPUTS.md). The blocking items are: entity type, lead inbox, contact number, Resend setup, reviewed privacy policy, reviewed terms, target regions, production domain, and confirmation of which sourcing models are used.

Then re-run the launch checks:

```bash
npm run verify
```

Verify no page claims a track record, a number, or a guarantee — the site currently makes none of those claims, and [CLIENT_INPUTS.md](CLIENT_INPUTS.md) records exactly what is and is not asserted.
