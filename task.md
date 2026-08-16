# Task List

Tracks [plan.md](plan.md). Status: `[x]` done · `[!]` blocked on client input

**Build status:** `npm run verify` green — typecheck clean · lint clean · build clean (23 routes) · **67/67 tests pass** · 0 npm vulnerabilities

---

## Phase 0 — Scaffold

- [x] 0.1 `package.json` — Next 16.3.1, React 19.2.8, TypeScript, Tailwind v4, Zod, Resend
- [x] 0.2 `tsconfig.json` strict + `noUncheckedIndexedAccess`, path alias `@/*`
- [x] 0.3 `next.config.ts` — CSP, HSTS, frame-options, referrer-policy, permissions-policy
- [x] 0.4 `globals.css` — full token set in Tailwind v4 `@theme`
- [x] 0.5 `.env.example`, `.gitignore`
- [x] 0.6 `npm install` clean — **upgraded off Next 15.5.4 (CVE-2025-66478) then off 15.5.23 (sharp/postcss advisories) to 16.3.1; audit now reports 0 vulnerabilities**

## Phase 1 — Foundations

- [x] 1.1 `types.ts` — literal-`true` guards on CaseStudy / Testimonial / TeamMember
- [x] 1.2 `site.ts` — identity, CTA wording, `consultationIsFree: true`, empty contact array
- [x] 1.3 `marketplaces.ts` — three profiles, distinct platform vocabulary each
- [x] 1.4 `services.ts` — 4 core + 2 offerings, each with a `limitations` statement
- [x] 1.5 `faqs.ts` — 17 questions across 5 route sets, no cross-page duplication
- [x] 1.6 `navigation.ts`, `home.ts`, `blog.ts`
- [x] 1.7 `proof.ts` — caseStudies / testimonials / team all empty
- [x] 1.8 `utils.ts`, `seo.ts`, `analytics.ts`, `validation.ts`, `ratelimit.ts`, `email.ts`

## Phase 2 — Primitives

- [x] 2.1 `Button` — 3 variants, 3 sizes, renders `<a>` or `<button>` by prop
- [x] 2.2 `Container`, `Section` (owns all vertical rhythm), `SectionHeading`
- [x] 2.3 `Badge`, `ExampleLabel`, 16-icon SVG set (no icon library)

## Phase 3 — Layout

- [x] 3.1 `SkipLink`
- [x] 3.2 `Navbar` + `NavDropdown` — arrows / Home / End / Escape, focus return
- [x] 3.3 `MobileDrawer` — focus trap, scroll lock, route-change close
- [x] 3.4 `Footer` — gated contact + social, non-affiliation statement
- [x] 3.5 `StickyCta` — mobile only, suppressed on `/contact`
- [x] 3.6 `Breadcrumbs` — mirrors BreadcrumbList JSON-LD
- [x] 3.7 `Reveal` — content visible by default, hides only after confirming JS + motion allowed

## Phase 4 — Visuals (all hand-authored SVG, zero raster assets)

- [x] 4.1 `ExampleLabel` on every illustrative component
- [x] 4.2 `DashboardVisual` — tabs, metric tiles, trend chart, order queue
- [x] 4.3 Trend chart with decorative draw-in, disabled under reduced motion
- [x] 4.4 `ListingPreview` — before/after with annotated issues and fixes
- [x] 4.5 `ResearchMatrix` — 3 candidates scored on 4 dimensions, one scored "Pass"
- [x] 4.6 `MarketplaceBadge` / `MarketplaceStrip` / `MarketplaceGrid` — no platform logos or brand colours
- [x] 4.7 `opengraph-image.tsx` — generated from tokens
- [x] 4.8 `icon.tsx` favicon + `Wordmark`

## Phase 5 — Marketing

- [x] 5.1 `Hero` + `PageHero`
- [x] 5.2 `ServiceCard`, `OfferingCard`
- [x] 5.3 `FeatureSplit`, `ValueGrid`
- [x] 5.4 `ProcessTimeline`, `JourneySteps`, `LimitationsNote`
- [x] 5.5 `FAQAccordion` — **native `<details>`, zero client JS**
- [x] 5.6 `CTASection`, `EmptyState`
- [x] 5.7 `CaseStudyCard`, `TestimonialCard` — built, deliberately unused while gated
- [x] 5.8 `MarketplacePage` — shared layout, per-marketplace content

## Phase 6 — Forms

- [x] 6.1 `InputField`, `SelectField`, `TextareaField`, `CheckboxField`, `Honeypot`
- [x] 6.2 All states: label, hint, error, loading, success
- [x] 6.3 `ConsultationForm` — validation, focus-first-error, aria-live success, error fallback
- [x] 6.4 `ratelimit.ts` (5/IP/10min), `email.ts` (injection-safe templating)
- [x] 6.5 `/api/consultation` — rate limit → bot traps → Zod → send

## Phase 7 — Pages (17 routes)

- [x] 7.1 `layout.tsx` — fonts, metadata, JSON-LD, skip link, sticky CTA
- [x] 7.2 `/` — 10 sections, 2 data-gated
- [x] 7.3 `/services`
- [x] 7.4 `/services/[slug]` × 6
- [x] 7.5 `/ebay` · [x] 7.6 `/amazon` · [x] 7.7 `/tiktok-shop`
- [x] 7.8 `/about` — team section gated
- [x] 7.9 `/contact`
- [x] 7.10 `/case-studies` + `[slug]` — empty state, noindex
- [x] 7.11 `/blog` + `[slug]` — empty state, noindex
- [x] 7.12 `/privacy-policy` (factual, accurate) · `/terms` (scoped to verifiable claims)
- [x] 7.13 `not-found.tsx`, `error.tsx` — no stack traces rendered

## Phase 8 — SEO

- [x] 8.1 Unique title + description + canonical + OG on all 17 routes
- [x] 8.2 JSON-LD: WebSite, Service, BreadcrumbList, FAQPage. **Organization suppressed until a contact point exists** — no fabricated schema
- [x] 8.3 `sitemap.ts` — 13 URLs, gated routes auto-excluded
- [x] 8.4 `robots.ts` — disallows `/api/`

## Phase 9 — QA (all verified, not assumed)

- [x] 9.1 `tsc --noEmit` clean
- [x] 9.2 `npm run build` clean — 23 routes
- [x] 9.3 Banned-language sweep across **shipped HTML**: zero hits. All 20 "guarantee" occurrences are negations
- [x] 9.4 `"A to Z"` absent from `/amazon` — verified in prerendered HTML; `clientTerm` never rendered by any component
- [x] 9.5 No horizontal overflow; research table scrolls inside its own container
- [x] 9.6 One `<h1>` per page, zero heading-level skips, zero console errors
- [x] 9.7 Dropdowns confirmed `display:none` + `hidden` when closed
- [x] 9.8 **Bug found and fixed:** honeypot returned 422 naming the trap field; now a silent 200
- [x] 9.9 API contract verified: 422 validation, 200 silent bot rejection, 429 rate limit, 405 wrong method, 502 handled when email unconfigured
- [x] 9.10 Form UI verified end-to-end — shows error alert with fallback, never fails silently
- [x] 9.11 Marketplace pages **84–86% unique** (requirement: ≥50%)
- [x] 9.12 All 17 routes 200, 404 works, sitemap correct
- [x] 9.13 Measured bundles — **budget corrected in specs.md §12** after measurement showed the 120KB target was below the framework floor
- [x] 9.14 `CLIENT_INPUTS.md` + `README.md`

## Phase 10 — Tooling and automated tests

Added after the manual QA pass, on the principle that a check nobody can re-run is not a check.

- [x] 10.1 **`npm run lint` never worked** — `next lint` was removed in Next 16 and no ESLint config existed. Created `eslint.config.mjs` (flat config) and pointed the script at `eslint .`
- [x] 10.2 **Lint found 3 real React issues, all fixed:**
  - `ConsultationForm` called `Date.now()` in the render body via `useRef` — impure, re-evaluated every render. Moved to a mount effect, which is also the more accurate moment to stamp the bot-trap timestamp
  - `MobileDrawer` called `setState` synchronously inside an effect on route change — replaced with React's documented adjust-during-render pattern, removing a cascading render
  - `StickyCta` did the same for scroll state — rewritten with `useSyncExternalStore`, which is the right tool for subscribing to browser state and fixes initial position on restored-scroll navigations
- [x] 10.3 `tests/content-invariants.test.ts` — 26 tests
- [x] 10.4 `tests/validation.test.ts` — 25 tests
- [x] 10.5 `tests/rendered-output.test.ts` — 16 tests against prerendered HTML
- [x] 10.6 Separate `tests/tsconfig.json` — **the app build was failing** because test files use `.ts` import extensions (required by Node's type stripper) and were inside the app's typecheck scope
- [x] 10.7 `npm run verify` — typecheck → lint → build → test, in that order (rendered-output needs a build)
- [x] 10.8 Zero test dependencies added — Node 22 built-in runner + `--experimental-strip-types`

### Test findings resolved

| Finding | Verdict |
|---|---|
| Banned-phrase test flagged "guaranteed sales" in FAQ copy | **False positive in the test.** The text is *"we do not promise guaranteed sales"* — a negation the constitution requires. Flat blocklists cannot see negation; removed those terms and rely on the context-aware test |
| `/amazon` emits an `Organization` node without a contact point | **False positive.** It is a `provider` reference nested in `Service` (`name` + `url`, both true), not the standalone entity. Test narrowed to `#organization` |
| `_global-error` missing canonical and footer | **Correct behaviour.** Next's framework-internal 500 replaces the whole document and never mounts the root layout. Test now scopes to public pages |

---

## Blocked on client input

See [CLIENT_INPUTS.md](CLIENT_INPUTS.md) — 9 blocking items, 15 section-gating items.

- [!] Entity type for "Sagheer Ur Rahman"
- [!] Lead inbox, phone/WhatsApp, Resend credentials, production domain
- [!] Reviewed privacy policy and terms
- [!] Target regions; confirmed sourcing models
- [!] Testimonials, case studies, team, metrics, logo, pricing, social links
