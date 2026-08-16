# Implementation Plan

**Project:** Marketplace management website — eBay, Amazon, TikTok Shop
**Owner:** Sagheer Ur Rahman
**Governed by:** [constitution.md](constitution.md) → [specs.md](specs.md) → this plan
**Started:** 2026-08-16

---

## 1. Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16, App Router | Spec D3. Server-first rendering, file routing, built-in metadata API. Fully static output — no serverless functions. |
| Language | TypeScript, strict | Literal types enforce the anti-fabrication rules (specs §9) |
| Styling | Tailwind CSS v4 | CSS-first `@theme` maps 1:1 onto the spec's design tokens |
| Fonts | Inter via `next/font/google` | Self-hosted, no external request, `display: swap` |
| Content | Typed TS modules in `src/content/` | Spec D3. No CMS runtime dependency |
| Forms | Browser posts directly to Web3Forms | Spec D4 / §23 — no backend, no serverless function |
| Imagery | Hand-authored SVG components | Constitution §18 forbids stock/AI business photos; §6.4 wants dashboard visual language |
| Deploy | Vercel | Static generation, edge headers |

## 2. Architectural decisions

**D-A. Server components by default.** Only eight components carry `"use client"`: `MobileDrawer`, `NavDropdown`, `FAQAccordion`, `ConsultationForm`, `GrowthChart`, `ResearchMatrix`, `Reveal`, `StickyCta`. Everything else renders on the server. Keeps first-load JS inside the ≤120KB budget (specs §12).

**D-B. Content is data, never markup.** Every string a non-developer might change lives in `src/content/`. Components take props. This is what makes the site editable later without touching UI code, and what makes a CMS migration mechanical.

**D-C. Fabrication is a compile error.** `CaseStudy.clientPermission`, `Testimonial.verified`, and `TeamMember.real` are the literal type `true`. You cannot add an unverified record without TypeScript rejecting it. Constitution §48 Rules 1/2/11 become build-enforced rather than remembered.

**D-D. Evidence sections are data-gated.** Sections reading `caseStudies[]`, `testimonials[]`, `team[]` return `null` when empty — no shells, no "coming soon", no placeholder faces. Section spacing is owned by each `Section`, so page rhythm survives the absence.

**D-E. No marketplace brand assets.** No eBay/Amazon/TikTok logos or brand colors anywhere. Constitution §43 — using them implies affiliation. Marketplaces are named in text on neutral badges.

**D-F. Illustrative data is always labelled.** Any component rendering example figures requires an `isExample` prop and renders an `ExampleLabel`. Constitution §42 forbids blurring demonstration and fact.

**D-G. All visuals are SVG components, not image files.** Dashboard, listing preview, research matrix, growth chart, OG images. Zero raster downloads, sharp at any DPI, tokens flow through via `currentColor` and CSS variables. Decorative ones are `aria-hidden` with an adjacent text summary.

## 3. Assumptions taken (no client input available)

The client instructed implementation to proceed without further questions. Where specs.md §15 marks an input as blocking, this build takes the following position — every one is recorded in `CLIENT_INPUTS.md` and none fabricates a fact.

| Input | Position taken |
|---|---|
| Business name | `Sagheer Ur Rahman` (spec D9) |
| Entity type | Treated as a personal/trading name. No company number, no registered-address claim |
| Contact email / WhatsApp / phone | Read from `site.ts`; **left empty**. Contact rows render only when populated. Form delivery is env-driven (`NEXT_PUBLIC_WEB3FORMS_KEY`) |
| Experience / tenure | **None claimed anywhere.** Site rests entirely on process depth (specs §2.3) |
| Testimonials / case studies / team / metrics | Empty arrays → sections hidden |
| Pricing | Not shown. No `Offer` schema |
| Response times | No commitment stated |
| Target countries | No geographic claim; `areaServed` omitted from schema |
| Legal pages | Structural scaffolds with an explicit "awaiting review" notice — not fake legal text |
| Marketplace logos | None used |
| Sourcing models | Described neutrally; retail-arbitrage dropshipping never advertised |

## 4. Execution order

Dependency-ordered so nothing is built twice.

```
Phase 0  Scaffold ....... package.json, tsconfig, next.config, Tailwind theme, globals
Phase 1  Foundations .... types, content modules, lib (seo, analytics, validation, utils)
Phase 2  Primitives ..... Button, Badge, Icon, Container, Section, SectionHeading, Prose
Phase 3  Layout ......... Navbar, NavDropdown, MobileDrawer, Footer, SkipLink, StickyCta, Breadcrumbs
Phase 4  Visuals ........ DashboardVisual, ListingPreview, ResearchMatrix, GrowthChart,
                          MarketplaceBadge, ExampleLabel, icon set, OG image route
Phase 5  Marketing ...... Hero, ServiceCard, OfferingCard, FeatureSplit, ValueGrid,
                          ProcessTimeline, JourneySteps, FAQAccordion, CTASection, EmptyState
Phase 6  Forms .......... field primitives, ConsultationForm, direct-to-provider submit
Phase 7  Pages .......... Home → Services hub → 6 service pages → 3 marketplace pages
                          → About → Contact → Case Studies → Blog → Legal → 404/500
Phase 8  SEO ............ metadata per page, JSON-LD, sitemap, robots
Phase 9  QA ............. build, typecheck, lint, a11y sweep, responsive sweep, budget check
```

## 5. Quality gates

Every page must clear all eight before it counts as done (specs §21):
visual · responsive · accessibility · SEO · interaction · performance · content accuracy · security.

Enforced continuously, not at the end:
- `npx tsc --noEmit` clean after every phase
- `npm run build` clean after every phase from 7 onward
- No page file over ~150 lines
- No hardcoded copy outside `src/content/`
- Grep sweep for banned language before sign-off (see §6)

## 6. Banned-language sweep

Run before completion. Zero hits required.

```
guarantee | guaranteed | secret | hidden method | bypass | proven formula
#1 ranking | instant | cutting-edge | revolutionary | next-generation
synergistic | disruptive | trusted by | years of experience
$2000 | 2000+ | lorem | TODO | placeholder
```

Plus: the string `A to Z` must not appear on `/amazon` (specs §2.1 — an Amazon seller reads it as buyer-claim handling).

## 7. Risks

| Risk | Mitigation |
|---|---|
| Three marketplace pages become near-duplicates (Constitution §22.2) | Each written from a distinct platform-terminology set defined in `marketplaces.ts`; verified side by side at QA |
| Empty proof arrays leave visual holes | Section-owned spacing; every gated section verified in both empty and seeded states |
| Client-side JS creep past budget | Eight-component allowlist; `npm run build` output checked each phase |
| Site reads thin without evidence | Compensated by process specificity and platform-correct terminology — the explanation step carries the weight (specs §2.3) |
| Legal pages ship as fake boilerplate | Scaffolds carry an explicit awaiting-review notice and stay out of the sitemap |

## 8. Definition of done

- All 15 pages + 2 legal render, build clean, typecheck clean.
- Zero fabricated facts, numbers, testimonials, logos, or people.
- Zero banned-language hits.
- Keyboard-navigable throughout; visible focus everywhere; reduced-motion honoured.
- Lighthouse mobile ≥90 performance, 100 accessibility.
- `CLIENT_INPUTS.md` lists every outstanding input with the section it unblocks.
- `README.md` documents setup, env vars, content editing, and deployment.
