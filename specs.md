# Website Specification

**Project:** Marketplace management and growth website — eBay, Amazon, TikTok Shop
**Governing document:** [constitution.md](constitution.md) — this specification is subordinate to it, except where §20 records an agreed amendment.
**Status:** Draft v2 — pending client input (see §15)
**Date:** 2026-08-16

---

## 0. How to read this document

This spec covers Constitution Phases 2–5 (Information Architecture, Content, Design, Technical Plan). Phase 1 (Discovery) is partially complete: service scope and marketplace scope are now confirmed; business identity, contact details, and legal content are not (§15).

Every claim is labelled per Constitution §42:

| Label | Meaning |
|---|---|
| `[VERIFIED]` | Confirmed business fact. Safe to publish. |
| `[SERVICE]` | General, non-numeric service description. Safe to publish; needs sign-off for scope accuracy. |
| `[DEMO]` | Illustrative example. Must be visibly labelled as an example in the UI. |
| `[BLOCKED]` | Requires client input. Section is gated off until supplied. |

**Zero `[VERIFIED]` numeric claims exist.** No revenue figure, client count, rating, or years-of-experience number appears anywhere in v1.

### v2 changelog

| Change | Driver |
|---|---|
| TikTok Shop added as a third marketplace | Client service list — **requires a constitution amendment, see §20** |
| "A to Z" reinterpreted as *end-to-end management*, not Amazon A-to-Z claims | Client confirmation — see §2.1 |
| Service pillars restructured: 4 core services + 2 packaged offerings | Client service list (Hunting, Listing, Order, Customer Care, A-to-Z) |
| Marketplace hierarchy introduced: eBay-led, Amazon and TikTok co-offered | Client confirmation of real experience depth |
| Dropshipping supported as one sourcing model, not the headline | Client confirmation |
| "$2000+ profit" figure permanently excluded | Client cannot publish the underlying client data |
| Page count 11 → 15 (+2 legal) | Expanded service and marketplace scope |
| Seller name set to **Sagheer Ur Rahman** | Client instruction |
| Reference gig confirmed **not** the client's — supplied as a demo of the service set only | Client confirmation — see §2.5 |
| Marketplace hierarchy removed; eBay, Amazon, TikTok Shop now equal in status | Follows from §2.5 — no publishable track record on any platform |
| Consultation confirmed **free** — CTA wording locked | Client confirmation |

---

## 1. Decisions locked

| # | Decision | Choice |
|---|---|---|
| D1 | Page scope | Full site — 15 pages + Privacy + Terms |
| D2 | Proof assets | None publishable yet → all evidence sections are data-gated |
| D3 | Stack | Next.js App Router + TypeScript + Tailwind, typed local content modules, Vercel |
| D4 | Lead handling | Route Handler → Zod → Resend transactional email, no lead database |
| D5 | "A to Z" | **End-to-end store management.** Not Amazon claim handling. |
| D6 | Marketplaces | eBay, Amazon, TikTok Shop — **equal status**, eBay listed first by focus, not by track record |
| D7 | Sourcing models | Both dropshipping and own-inventory sellers served; dropshipping is a supported model, not the positioning |
| D8 | The $2,000 figure | Excluded from the site entirely |
| D9 | Seller / owner name | **Sagheer Ur Rahman** |
| D10 | Consultation | **Genuinely free.** Primary CTA is `Get a Free Consultation` sitewide; no fallback wording needed |
| D11 | Reference gig | Not the client's work. Used as a service-scope reference only; never cited, linked, or drawn from as evidence |

---

## 2. Service architecture

### 2.1 The "A to Z" resolution

Constitution §4.1 lists "Amazon A-to-Z Claim Support" as a service pillar. That was a misreading. The client's "A to Z" means **complete, end-to-end store management** — the sense used in the source gig ("A-to-Z Management: Handling listings, basic inventory checking, and optimization") and across eBay VA listings generally.

Consequences:

1. Amazon A-to-Z **claim handling is not an offered service** and must not appear anywhere on the site.
2. Constitution §4.1's sixth pillar and §22.1's "Amazon A-to-Z claim support" search theme are struck (§20).
3. **Naming rule:** the umbrella offering is called **"Complete Store Management"** in all site copy. The phrase "A to Z" is permitted only on eBay-context pages as a secondary descriptor, and is **forbidden on Amazon pages** — an Amazon seller reading "A to Z" will assume buyer-claim handling, which would be a false capability signal (Constitution §3.1 clarity, §3.5 term explanation, §48 Rule 10).

### 2.2 Service model

Four core services, sold individually or bundled into two packaged offerings.

**Core services**

| # | Service | Client's term | Scope |
|---|---|---|---|
| S1 | Product Research & Hunting | Hunting | Demand analysis, competition screening, pricing and margin assessment, supplier/sourcing feasibility, risk review, shortlist delivery |
| S2 | Listing Creation & Optimization | Listing | Titles, keywords, item specifics/attributes, bullets, descriptions, images, category placement, listing quality review |
| S3 | Order Management | Order | Order processing, fulfilment coordination, tracking upload, inventory checks, cancellation and late-dispatch prevention, store health monitoring |
| S4 | Customer Support & Returns | Customer care | Buyer messaging, returns, refund communication, delivery issues, dispute and case communication, feedback follow-up |

**Packaged offerings**

| # | Offering | Composition |
|---|---|---|
| P1 | **Complete Store Management** (A to Z) | S1–S4 delivered as an ongoing retainer. The primary commercial offer. |
| P2 | **New Store Launch** | Structured launch programme for new / zero-feedback stores. A service the client chooses to offer — not derived from any prior delivered engagement (§2.5). |

Constitution §4.1's "Marketplace Growth" pillar is absorbed into P1 and P2 rather than being sold as an abstract service — growth is the outcome those two produce, and listing it separately would be a service dump (§41).

### 2.3 Marketplace hierarchy

All four core services and both offerings are available on all three marketplaces, at **equal status**. There is no publishable track record on any of them (§2.5), so no page may imply one is more established than another.

| Marketplace | Status | Site treatment |
|---|---|---|
| **eBay** | `[SERVICE]` offered | Full page, eBay-native terms. Listed first because it is the client's stated focus — not because of tenure. |
| **Amazon** | `[SERVICE]` offered | Full page, Amazon-native terms. |
| **TikTok Shop** | `[SERVICE]` offered | Full page, TikTok-Shop-native terms. |

**How the site stays truthful without a disclaimer banner:** it describes *capability, method, and process* — all of which are truthful statements about what will be done — and makes no claim about history, volume, or results. This is a normal and entirely credible position for a new services business. What it must never do is fill the gap with invented proof.

**Forbidden sitewide until real evidence exists (§3.4, §9, §41, §48 Rule 2):** years of experience, stores managed, clients served, orders processed, revenue or profit figures, growth percentages, ratings, review counts, "trusted by", client logos, or any phrasing implying an established history ("we've helped hundreds of sellers", "for years we've…").

**What carries the trust load instead:** depth and specificity of process, correct platform terminology, a clearly explained engagement model, transparent scope boundaries, an explicit statement of what is not offered, and a professional, policy-conscious tone. Constitution §40's **Claim → Explanation → Evidence → CTA** order degrades gracefully here to **Claim → Explanation → CTA** — the explanation must therefore be unusually concrete to carry the weight the evidence step normally would.

### 2.4 Sourcing models (D7)

The site serves both dropshipping and own-inventory sellers. Dropshipping appears as a supported sourcing model inside S1 and P2 — not as the site's identity.

**Compliance requirement (§16):** marketplace dropshipping rules are restrictive and differ by platform. Broadly, eBay permits dropshipping from wholesale suppliers but prohibits sourcing from another retailer or marketplace that ships directly to the buyer; Amazon requires the seller be the seller of record on all packing materials. **These statements must be re-verified against current published policy immediately before launch, and again if the pages are revised.** The site will:

- Describe supplier-based sourcing in neutral terms.
- Include a short "how we work within marketplace policy" block on the Product Research and New Store Launch pages.
- **Never** advertise retail-arbitrage dropshipping, marketplace-to-marketplace dropshipping, or any named tool for it.

This is an open item — see §16 Q3.

### 2.5 Provenance of the reference gig — resolved

The seller is **Sagheer Ur Rahman**. The gig at `fiverr.com/sal_ecom/grow-your-ebay-store` is bylined Salman Ahmad and **is not the client's**. It was supplied purely to demonstrate the intended service set.

Binding consequences:

1. **Nothing in that gig is evidence of anything the client has done.** Its portfolio item, its packages, its "$2000+ in sales profit" figure, and its launch narrative are another seller's material.
2. **The gig is never linked, cited, named, screenshotted, or paraphrased** on the site or in its metadata. Presenting a third party's work history as your own would breach Constitution §9, §41, §43, and §48 Rule 2 — and is the single most damaging thing this site could do to its own credibility.
3. **No marketplace carries a track record** (§2.3). All three are capability claims only.
4. **The "$2000+" figure is permanently excluded** in any form, including paraphrase, rounding, or vaguer restatement ("thousands in sales"). It was never the client's claim to make (D8, D11).
5. **The New Store Launch offering remains valid** — a launch programme for zero-feedback stores is a legitimate service to offer. It is described as a method the client will apply, never as one with a proven result behind it.

The gig retains exactly one use: **§17's language audit**, which records phrasings to avoid. That section is a "do not write this" list, not a source.

Whether "Sagheer Ur Rahman" is a personal name, a trading name, or a registered entity is still open (§15 item 1).

---

## 3. Information Architecture

### 3.1 Sitemap

```
/                                        Home
/services                                Services hub
/services/product-research               S1
/services/listing-optimization           S2
/services/order-management               S3
/services/customer-support               S4
/services/store-management               P1  Complete Store Management
/services/new-store-launch               P2  New Store Launch
/ebay                                    Marketplace — eBay
/amazon                                  Marketplace — Amazon
/tiktok-shop                             Marketplace — TikTok Shop
/case-studies  /case-studies/[slug]      Gated (empty)
/about
/blog  /blog/[slug]                      Gated (empty)
/contact
/privacy-policy
/terms
```

### 3.2 Primary navigation

Three marketplaces make the flat nav in Constitution §24 too wide, so marketplaces collapse into one dropdown. Contact is dropped from the nav because the CTA button already targets it — this keeps one unmistakable primary action (§7.4).

| Item | Behaviour |
|---|---|
| Services | Dropdown → 4 core services, then Complete Store Management, New Store Launch, All Services |
| Marketplaces | Dropdown → eBay, Amazon, TikTok Shop (that order — client's stated focus, not a status ranking) |
| How It Works | `/services#process` |
| Case Studies | **Hidden while empty** |
| About | `/about` |
| Blog | `/blog` |
| **Get a Free Consultation** | Primary CTA → `/contact`. Consultation is confirmed free (D10), so this wording is final and used sitewide |

Both dropdowns are keyboard-operable (Enter/Space open, arrows move, Escape closes, focus returns to trigger) and render as plain expandable lists in the mobile drawer.

### 3.3 Internal linking

- Each service page links up to `/services` and across to all three marketplace pages using marketplace-specific anchor text.
- Each marketplace page links down to all six service offerings.
- `/services/new-store-launch` is linked prominently from all three marketplace pages — it is the offering with the clearest audience match (sellers who have not started yet).
- Every blog post links to at least one service page.
- Every page ends with one CTA section.

### 3.4 Duplicate-content control

Six service pages × three marketplaces is exactly the shape that produces thin, near-duplicate pages (§22.2, §41). Two hard rules:

1. **Marketplace pages are the marketplace-specific surface.** Service pages describe the method across all marketplaces; marketplace pages describe how it differs on that platform.
2. **Each marketplace page must be ≥50% unique content**, built from genuinely platform-specific material:

| eBay | Amazon | TikTok Shop |
|---|---|---|
| Item specifics, listing quality, GTC listings, Best Offer, Promoted Listings, feedback percentage, Money Back Guarantee and item-not-received cases, seller performance standards | Catalog/ASIN structure, backend search terms, A+ content, Buy Box, FBA vs FBM, account health, order defect rate | Product cards, video and LIVE attachment, creator/affiliate collaboration, Seller Center flows, product approval review, shipping SLA and violation points |

No page is produced by find-and-replace from another. A reviewer must be able to open any two marketplace pages side by side and see substantively different copy.

---

## 4. Conversion architecture

**Primary conversion:** consultation request on `/contact`.

| Level | Wording | Placement |
|---|---|---|
| Primary | `Get a Free Consultation` — final wording, consultation confirmed free (D10) | Navbar, hero, one mid-page band, final CTA section |
| Secondary | `Explore Services` / `See How It Works` | Hero secondary slot only |
| Tertiary | WhatsApp / email | Contact page and footer only |

CTA wording is defined once in `src/content/site.ts`, so it cannot drift (§7.3) and a single-variable A/B test (§38) needs no refactor.

**Mobile sticky CTA** (§39): appears past the hero under 768px, one action only, respects safe-area insets, suppressed on `/contact` and while the drawer is open.

**No popups, interstitials, or exit-intent modals** (§41).

---

## 5. Page specifications

### 5.1 Home — `/`

Follows Constitution §5. Journey: **Understand → Trust → Explore → See Evidence → Act**.

| # | Section | Status | Notes |
|---|---|---|---|
| 1 | Sticky navbar | `[SERVICE]` | |
| 2 | Hero | `[SERVICE]` | Names all three marketplaces |
| 3 | Marketplace strip | `[SERVICE]` | eBay · Amazon · TikTok Shop as text badges, no logos |
| 4 | Core services grid | `[SERVICE]` | 4 core services + 2 offerings, with the offerings visually distinguished |
| 5 | Product research feature | `[SERVICE]` + `[DEMO]` | `ResearchMatrix`, labelled example |
| 6 | Listing optimization feature | `[SERVICE]` + `[DEMO]` | `ListingPreview` before/after, labelled example |
| 7 | Complete Store Management workflow | `[SERVICE]` | The A-to-Z operational loop |
| 8 | New Store Launch | `[SERVICE]` | The differentiator — see 5.1.2 |
| 9 | Case studies | `[BLOCKED]` **gated** | |
| 10 | Why choose us | `[SERVICE]` | |
| 11 | Testimonials | `[BLOCKED]` **gated** | |
| 12 | FAQ | `[SERVICE]` | Includes a "what we don't do" answer |
| 13 | Final CTA | `[SERVICE]` | |
| 14 | Footer | `[SERVICE]` | |

Sections 9 and 11 read from `caseStudies[]` and `testimonials[]`; empty arrays return `null` — no empty shells, no "coming soon", no placeholder avatars. Section spacing is owned by each `Section`, so the page rhythm is unaffected.

#### 5.1.1 Hero — draft copy `[SERVICE]`

- **H1:** "Grow Your eBay, Amazon & TikTok Shop Store With Expert Marketplace Management"
- **Subhead:** "We handle product research, listing optimization, order management, and customer support — so your store runs properly and keeps improving."
- **Primary CTA:** `Get a Free Consultation`
- **Secondary CTA:** `See How It Works`
- **Visual:** purpose-built SVG/CSS dashboard composition (sales trend, order pipeline, listing quality tile), `aria-hidden`, carrying a visible `Example view` label. All figures illustrative. Not a photo, not real client data (§6.4, §18, §42).

#### 5.1.2 New Store Launch section — the rewrite

The launch offering is real and sellable; the reference gig's *language* for it is not usable (§17). Blocked phrasings and their compliant equivalents, recorded so the pattern is clear to whoever writes the final copy:

| Gig phrase | Site copy `[SERVICE]` |
|---|---|
| "Bypass the 0-Rating Barrier" | "Starting a store with no feedback history" |
| "secret strategy" / "Hidden Optimization Method" | "A structured launch method built on demand-tested products and conversion-focused listings" |
| "get your very first sequence of orders fast" | "We help new sellers build a stronger foundation for their first marketplace orders and long-term store growth" *(Constitution §11's sanctioned wording, verbatim)* |
| "proven launch formula" | "A repeatable launch process we apply to new stores" |

The section describes the journey from Constitution §11 — **New Store → Product Strategy → Optimized Listings → First Orders → Positive Feedback → Sustainable Growth** — with an explicit statement that orders and feedback are not guaranteed.

### 5.2 Services hub — `/services`

1. H1 "eBay, Amazon & TikTok Shop Marketplace Services" + positioning paragraph.
2. Four core service cards → detail pages.
3. Two offering cards (Complete Store Management, New Store Launch), visually weighted above the core four.
4. `#process` — **Assess → Plan → Execute → Monitor → Improve**.
5. Marketplace split — three cards → `/ebay`, `/amazon`, `/tiktok-shop`.
6. Scope boundary block — what is and is not included (§14).
7. CTA section.

### 5.3 Service detail pages

Shared template: hero → what's included → method/process → what you receive → an honesty/limitations block → related marketplaces → FAQ → CTA.

| Page | H1 (draft) | Distinctive content |
|---|---|---|
| `/services/product-research` | eBay, Amazon & TikTok Shop Product Research and Hunting | Framework **Demand → Competition → Economics → Product Fit → Opportunity**; 8 analysis dimensions; `ResearchMatrix` `[DEMO]`; sourcing-model and policy block (§2.4); limitations block stating research reduces but does not eliminate risk (§12, §3.3) |
| `/services/listing-optimization` | Marketplace Listing Creation and Optimization | Titles, keywords, attributes/item specifics, bullets, descriptions, images, structured content; `ListingPreview` before/after `[DEMO]`; honesty block stating keyword placement alone does not determine ranking (§13) |
| `/services/order-management` | Marketplace Order Management and Store Operations | Order processing, fulfilment coordination, tracking upload, inventory checks, cancellation and late-dispatch prevention, store health monitoring (§14) |
| `/services/customer-support` | Marketplace Customer Support and Returns Handling | Buyer messaging, returns, refund communication, delivery issues, dispute communication, feedback follow-up; positioned as a reliability function, not a call centre (§15); **no response-time commitment unless confirmed** |
| `/services/store-management` | Complete Store Management for Marketplace Sellers | The A-to-Z retainer: what is covered, cadence, reporting, communication, access model. Highest commercial intent page. |
| `/services/new-store-launch` | New Store Launch Support for Marketplace Sellers | Constitution §11 journey; rewritten launch method per §5.1.2; explicit non-guarantee statement |

### 5.4 Marketplace pages — `/ebay`, `/amazon`, `/tiktok-shop`

Shared template, independently written bodies (§3.4).

1. Hero — marketplace-specific H1 and value proposition.
2. Capability grid — the six offerings in that marketplace's own terminology.
3. Platform-specific workflow — using the differentiators in §3.4.
4. Who this is for — new sellers, stalled sellers, sellers wanting full management.
5. Policy-conscious block (§16).
6. Marketplace-specific FAQ — no answers duplicated across the three pages.
7. CTA section.

All three pages carry equal depth and equal claim strength (§2.3). Each links prominently to New Store Launch.

**Brand safety (§43), all three:** no marketplace logos, no marketplace-branded imagery, no wording implying partnership, certification, endorsement, or employment. Marketplace names appear as plain text only, unless and until documented permission exists. `/amazon` must not use the phrase "A to Z" (§2.1).

### 5.5 Case Studies — gated

Route ships; `caseStudies` is empty. Index renders an `EmptyState` explaining that case studies are published only with client permission, plus a CTA. `noindex` while empty, excluded from sitemap and nav. `generateStaticParams` returns `[]`.

Detail template follows §10: **Challenge → Strategy → Execution → Result → Evidence**, timeframe mandatory on every result.

**Note on the $2,000 figure (D8):** excluded from the site. If the client later obtains written permission for an anonymised account, it becomes the first case study — with marketplace, timeframe, whether the figure is revenue or profit, and the fact that it is a single account all stated (§10 forbids an isolated metric without context). Until then it appears nowhere, in any form, including paraphrase.

### 5.6 About — `/about`

Hero → how we work → team (`[BLOCKED]`, gated on `team[]`) → what we don't do (§16) → CTA. No founding year, no tenure, no years-of-experience claim. The page reads as complete without them.

### 5.7 Blog — gated

MDX in `src/content/blog/`. Index `EmptyState` + `noindex` while empty. Post template: H1, published/updated dates, reading time, body, related service links, CTA, `Article` JSON-LD with a real named author.

Launch topics proposed (`[SERVICE]`, unwritten): evaluating a product before sourcing; what actually makes a listing rank and convert; what to do when a new store has no orders yet.

### 5.8 Contact — `/contact`

H1 "Request a Free Consultation" (final — D10) → one sentence on what happens next → `ConsultationForm` (§6) → direct contact panel (each entry renders only if present in `site.ts`) → "what happens after you submit" three steps (§8 requires this) → short FAQ.

### 5.9 Privacy Policy and Terms

Route scaffolds with typed content modules, both `[BLOCKED]` — legal text must come from the client or their counsel. Excluded from the sitemap until populated. Footer links to them regardless: the form cannot lawfully ship without a privacy statement (§27, §43).

---

## 6. Consultation form

### 6.1 Fields (§8)

| Field | Type | Required | Validation |
|---|---|---|---|
| `name` | text | Yes | 2–80 chars |
| `email` | email | Yes | RFC-shaped, ≤160 |
| `phone` | tel | Yes | 7–20 chars, digits/`+`/space/hyphen |
| `marketplace` | select | Yes | `ebay` \| `amazon` \| `tiktok` \| `multiple` \| `not-selling-yet` |
| `storeStatus` | select | Yes | `new` \| `existing` \| `needs-improvement` \| `full-management` |
| `revenueRange` | select | No | Enum incl. `prefer-not-to-say` (**default**) |
| `service` | select | Yes | S1–S4, P1, P2, or `not-sure` |
| `message` | textarea | No | ≤2000 chars |
| `consent` | checkbox | Yes | Must be true; label links to `/privacy-policy` |
| `website` | hidden | — | Honeypot, must be empty |
| `renderedAt` | hidden | — | Submissions under 3s rejected |

`marketplace` gains `not-selling-yet` because New Store Launch targets people who have not started. `revenueRange` is optional and defaults to "prefer not to say" — forcing it is disproportionate to purpose (§27).

### 6.2 Behaviour (§34)

Visible bound `<label>` elements, never placeholder-only. Validation on blur and submit, server authoritative. Inline errors wired via `aria-describedby`, focus moved to the first invalid field. Disabled loading state on submit with an accessible name change; double submission impossible. Success replaces the form with a confirmation panel announced `aria-live="polite"`. Failure shows plain-language text plus the direct email fallback. **Never fails silently.** No countdowns, false scarcity, or guilt-worded declines (§41).

### 6.3 Server pipeline

```
POST /api/consultation
  → rate limit (IP + route)
  → honeypot + time-trap
  → Zod parse (authoritative)
  → normalise: trim, strip control chars, cap lengths
  → Resend: notification to BUSINESS_INBOX
  → Resend: acknowledgement to the lead
  → 200 { ok: true } | 4xx/5xx { ok: false, code }
```

- Rate limit: 5 per IP per 10 minutes, via Upstash Redis (Vercel instances do not share memory). In-memory fallback is dev-only and documented as best-effort.
- Bot rejections return `200 { ok: true }` and send nothing — never teach a bot the detection rule.
- Email failure logs a request id only, no PII beyond it.
- No lead data persisted to disk or rendered publicly (§27).
- `RESEND_API_KEY`, `BUSINESS_INBOX`, `UPSTASH_*` in environment variables only (§28).

---

## 7. Design system

### 7.1 Colour tokens

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--navy-950` | `#060F1C` | Deepest surfaces | — |
| `--navy-900` | `#0A1A2F` | Dark sections, footer | 17.4:1 vs white |
| `--navy-800` | `#12263F` | Dark cards | — |
| `--navy-700` | `#1B3557` | Dark borders/hover | — |
| `--ink-900` | `#0F172A` | Headings on light | 16.9:1 |
| `--ink-700` | `#334155` | Body on light | 10.4:1 |
| `--ink-500` | `#64748B` | Meta on light | 4.8:1 |
| `--line` | `#E2E8F0` | Borders | non-text |
| `--surface` | `#FFFFFF` | Content bg | — |
| `--surface-muted` | `#F8FAFC` | Alternating sections | — |
| `--accent-700` | `#9E4506` | Accent **text** on light | 6.3:1 |
| `--accent-600` | `#C25608` | Primary button fill, white text | 4.5:1 |
| `--accent-400` | `#F59E42` | Accent on navy **only** | 8.2:1 vs navy-900 |
| `--success` | `#15803D` | Form success | 4.8:1 |
| `--danger` | `#B91C1C` | Form error | 6.4:1 |
| `--focus` | `#2563EB` | Focus ring | ≥3:1 both grounds |

One accent family only (§17.2). `--accent-400` never used for text on white. State always pairs colour with icon and text (§21).

**Marketplace colours are deliberately not used.** No eBay multicolour, no Amazon orange, no TikTok pink/cyan — using platform brand colours implies affiliation (§43) and would fracture the palette (§17.2). Marketplaces are distinguished by name and neutral badge only.

### 7.2 Typography

**Inter** via `next/font/google`, `display: swap`, latin subset, self-hosted. Fluid `clamp()` scale: display 40→60, h1 34→48, h2 26→36, h3 20→24, body-lg 18, body 16, small 14. **Minimum body 16px** (§17.3). Line height 1.15 / 1.25 / 1.65. Measure capped 68ch. Weights 400/500/600/700 only.

### 7.3 Spacing, radius, shadow, motion

Spacing (4px base): 1,2,3,4,6,8,12,16,20,24,32 → 4…128px. Section rhythm 64 / 96 / 128px. Radius sm 6, md 10, lg 16, xl 24, full. Three shadow levels. Durations 150/250/400ms, easing `cubic-bezier(0.16,1,0.3,1)`.

### 7.4 Breakpoints

`sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536. Container 1200px, gutters 20px (24 from `md`).

### 7.5 Motion (§19)

Allowed: entrance fade+rise (≤400ms, once, ≤16px), hover elevation on interactive cards, chart draw-in, accordion height. Forbidden: parallax, infinite float, spin, scroll-hijack, blocking animation, motion on everything.

`prefers-reduced-motion: reduce` disables all transforms and reveals. Reveal animations are built so **content is visible by default** and only animates when the observer runs — never hidden behind a script that might not execute.

### 7.6 Card discipline (§17.5)

Cards for services, metrics, case studies, features, process steps only. Prose uses headings and spacing. Maximum one nesting level.

---

## 8. Component inventory (§31)

**Layout:** `Navbar`, `NavDropdown`, `MobileDrawer`, `Container`, `Section`, `SectionHeading`, `Footer`, `Breadcrumbs`, `SkipLink`

**Primitives:** `Button` (`primary`/`secondary`/`ghost`; `sm`/`md`/`lg`; renders `<a>` with `href`, else `<button>`), `Link`, `Badge`, `Icon`, `Prose`

**Marketing:** `Hero`, `ServiceCard`, `OfferingCard`, `FeatureSplit`, `ValueGrid`, `ProcessTimeline`, `JourneySteps`, `MetricCard`, `CaseStudyCard`, `TestimonialCard`, `FAQAccordion`, `FAQItem`, `CTASection`, `EmptyState`

**Marketplace:** `MarketplaceBadge`, `MarketplaceGrid`, `ProductCard`, `ListingPreview`, `ResearchMatrix`, `GrowthChart`, `StoreMetric`, `DashboardVisual`, `ExampleLabel`

**Forms:** `ConsultationForm`, `InputField`, `SelectField`, `TextareaField`, `CheckboxField`, `FormError`, `FormSuccess`, `SubmitButton`

**Contracts:**

1. Data via props; only page-level compositions read content modules.
2. **Server components by default.** Client components limited to: `MobileDrawer`, `NavDropdown`, `FAQAccordion`, `ConsultationForm`, `GrowthChart`, `ResearchMatrix`, the scroll-reveal wrapper, the mobile sticky CTA (§30).
3. No page file over ~150 lines; pages compose sections (§30).
4. `ExampleLabel` mandatory on any component rendering illustrative data. `ResearchMatrix`, `ListingPreview`, `GrowthChart`, `DashboardVisual`, `StoreMetric` each require `isExample` and refuse to render unlabelled demo numbers (§42).

---

## 9. Content data layer (§32)

```ts
// src/content/types.ts

export type Marketplace = 'ebay' | 'amazon' | 'tiktok'

export interface SiteConfig {
  businessName: string           // 'Sagheer Ur Rahman' — entity type still open, §15 item 1
  tagline: string
  primaryCtaLabel: string        // 'Get a Free Consultation' — single source of CTA wording
  consultationIsFree: true       // literal — confirmed free (D10); flipping it is a deliberate edit
  email?: string                 // [BLOCKED]
  whatsapp?: string              // [BLOCKED]
  phone?: string                 // [BLOCKED]
  bookingUrl?: string            // [BLOCKED]
  address?: string               // [BLOCKED] — omit if not public
  social: { label: string; href: string }[]
  baseUrl: string
}

export interface MarketplaceProfile {
  id: Marketplace
  name: string                   // "eBay" | "Amazon" | "TikTok Shop"
  slug: string
  isPrimary: boolean             // eBay only — drives ordering and example placement
  intro: string
  platformTerms: string[]        // enforces the §3.4 uniqueness rule
}

export interface Service {
  slug: string
  title: string
  clientTerm: string             // "Hunting", "Listing", "Order", "Customer care"
  kind: 'core' | 'offering'
  shortDescription: string       // outcome-oriented (§3.2)
  longDescription: string
  bullets: string[]
  icon: string
}

export interface CaseStudy {
  slug: string
  title: string
  marketplace: Marketplace
  challenge: string
  strategy: string
  execution: string
  result: string
  timeframe: string              // required (§10)
  evidence?: { type: 'screenshot' | 'chart'; src: string; alt: string; caption: string }[]
  clientPermission: true         // literal
}

export interface Testimonial {
  quote: string
  authorName: string
  authorRole?: string
  company?: string
  marketplace?: Marketplace
  verified: true                 // literal
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo?: { src: string; alt: string }
  real: true                     // literal
}

export interface Faq { question: string; answer: string; pages: string[] }
```

The `clientPermission: true`, `verified: true`, and `real: true` **literal types** make it a TypeScript compile error to add an unverified case study, testimonial, or team member. Constitution §48 Rules 1, 2, and 11 become build-checked rather than remembered.

Files: `site.ts`, `marketplaces.ts`, `services.ts`, `faqs.ts`, `navigation.ts`, `footer.ts`, `caseStudies.ts` (empty), `testimonials.ts` (empty), `team.ts` (empty), `blog/`.

---

## 10. SEO specification (§22)

### 10.1 Theme → page map

| Page | Primary theme |
|---|---|
| `/` | marketplace store management services |
| `/ebay` | eBay store management |
| `/amazon` | Amazon store management |
| `/tiktok-shop` | TikTok Shop management |
| `/services/product-research` | eBay & Amazon product research / product hunting |
| `/services/listing-optimization` | marketplace listing optimization, eBay SEO, Amazon SEO |
| `/services/order-management` | marketplace order management |
| `/services/customer-support` | marketplace customer support / returns handling |
| `/services/store-management` | complete store management, eBay virtual assistant |
| `/services/new-store-launch` | new eBay store launch / no-feedback store support |
| `/blog/*` | long-tail informational |

One page per theme. **"Amazon A-to-Z claim support" is removed as a target theme** — the service is not offered (§2.1, §20).

### 10.2 Metadata

Each indexable page exports: unique `title` (≤60) and `description` (≤155), absolute self-canonical, Open Graph (title, description, url, siteName, type, locale, 1200×630 image), Twitter `summary_large_image`, `robots: index, follow` — except gated routes which set `noindex, follow`.

Draft titles `[SERVICE]`:

| Page | Title |
|---|---|
| `/` | eBay, Amazon & TikTok Shop Store Management Services |
| `/ebay` | eBay Store Management, Listings & Order Support |
| `/amazon` | Amazon Store Management, Listings & Order Support |
| `/tiktok-shop` | TikTok Shop Management, Listings & Order Support |
| `/services/store-management` | Complete Marketplace Store Management Services |
| `/services/new-store-launch` | New Store Launch Support for Marketplace Sellers |
| `/contact` | Request a Consultation — Marketplace Management |

### 10.3 Structured data (§22.4)

| Type | Where | Constraints |
|---|---|---|
| `Organization` | root layout | Emitted only once `businessName` and one contact method are verified. No `foundingDate`, `award`, or `aggregateRating`. |
| `WebSite` | root layout | No `SearchAction` (no site search in v1) |
| `Service` | each service page | `serviceType`, `provider`, `areaServed`. No `offers` until pricing is confirmed. |
| `BreadcrumbList` | nested pages | Mirrors visible breadcrumb |
| `FAQPage` | pages with visible FAQ | Markup matches visible text exactly |
| `Article` | blog posts | Real named author only |

Never emitted: `Review`, `AggregateRating`, invented `Offer`, or any affiliation claim to eBay, Amazon, or TikTok (§43).

### 10.4 Technical

`app/sitemap.ts` generated from routes + content arrays, gated routes auto-excluded. `app/robots.ts` allows all, points to sitemap, disallows `/api/`. One `<h1>` per page, no skipped heading levels. Semantic landmarks. Consistent trailing-slash behaviour. Branded, helpful 404 and 500 (§35).

---

## 11. Accessibility (§21) — target WCAG 2.2 AA

| Requirement | Implementation |
|---|---|
| Semantic HTML | Native elements; `div` for layout only |
| Keyboard | Everything reachable and operable; both dropdowns support arrows + Escape; focus trapped in the open drawer and restored on close |
| Focus visible | 2px `--focus` ring, 2px offset, `:focus-visible`; never `outline: none` without replacement |
| Skip link | First focusable element |
| Contrast | Text ≥4.5:1 (≥3:1 large); UI boundaries and focus ≥3:1 |
| Forms | Visible bound labels; `aria-describedby`; `aria-invalid`; errors in text not colour |
| Images | Descriptive `alt` for meaningful; `aria-hidden` + `alt=""` for decorative |
| Motion | `prefers-reduced-motion` honoured globally |
| Colour independence | No state or category by colour alone |
| Targets | ≥44×44px on touch |
| Language | `<html lang>` from one config value (§36) |
| Announcements | Form outcomes via `aria-live="polite"` |

Verification: `axe-core` on every route, plus a manual keyboard-only pass and a screen-reader pass (NVDA or VoiceOver) over navigation and the form before launch.

---

## 12. Performance (§29)

| Metric | Target |
|---|---|
| LCP mobile (field) | ≤2.5s |
| INP | ≤200ms |
| CLS | ≤0.1 |
| Lighthouse mobile perf | ≥90 |
| First-load JS, any page | ≤145KB gz |
| CSS | ≤15KB gz |
| Above-fold image weight | 0 (all visuals are inline SVG) |

**Budget revised after measurement.** The original targets were 120KB (home) and 150KB (any page). Measured against the production build: `/terms` — a page with essentially no interactive content — is **139KB gzipped**, and the home page is **139.7KB**. The delta between the emptiest and busiest page is under 1KB, which means the figure is almost entirely the Next 16 + React 19 App Router runtime, not application code. The 120KB target was not achievable on this framework version and has been corrected rather than left as a target the build silently fails.

Measured on the production build:

| Page | JS (gz) | CSS (gz) | Fonts | Images |
|---|---|---|---|---|
| `/` | 139.7KB | 8KB | 47.3KB | **0** |
| `/terms` | 139.0KB | 8KB | 47.3KB | **0** |

Zero image bytes on every page is the result worth noting — it comes from building every visual as inline SVG (D-G) rather than shipping raster assets, and it is what protects LCP on mobile.

Server components by default; client JS limited to the eight components in §8. `next/image` with AVIF/WebP, explicit dimensions, per-breakpoint `sizes`, `priority` on the hero only. Hero is inline SVG/CSS — no LCP image download. `next/font` self-hosted, one family, four weights, latin subset. `next/dynamic` for `GrowthChart` and `ResearchMatrix` if interactive. **Zero third-party scripts at launch** beyond first-party analytics; any addition must be justified against the budget. All pages statically generated.

---

## 13. Security and privacy (§27, §28)

| Control | Implementation |
|---|---|
| Secrets | Env vars only; `.env.local` gitignored; `.env.example` names without values |
| Client keys | None — Resend key is server-only, never `NEXT_PUBLIC_` |
| Validation | Zod server-side, authoritative; client validation is UX only |
| Sanitisation | Trim, strip control chars, cap lengths before templating |
| Email injection | Headers never interpolate user input; user content HTML-escaped into the body only |
| Rate limiting | 5 / IP / 10 min on `/api/consultation` |
| Spam | Honeypot + minimum-time trap. CAPTCHA avoided at launch on accessibility and friction grounds; Cloudflare Turnstile is the documented escalation |
| Headers | HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` (camera/mic/geo denied), CSP without `unsafe-eval` |
| Data minimisation | Only §6.1 fields; revenue optional; no field values in analytics |
| Data exposure | No lead persisted or rendered publicly |
| Dependencies | Pinned, `npm audit` in CI, Dependabot on |
| Admin surfaces | None in v1 — nothing to authenticate is the safest posture |

No cookie banner in v1 because no non-essential cookies are set. Adding GA4 or any marketing tag makes a compliant consent mechanism a prerequisite of that change (§27).

---

## 14. Analytics (§37)

**Vercel Analytics + Speed Insights** — cookieless, no PII, no consent banner needed.

| Event | Trigger | Properties |
|---|---|---|
| `cta_click` | Any primary CTA | `location`, `page` |
| `form_start` | First field interaction | `page` |
| `form_submit_success` | 200 | `marketplace`, `storeStatus`, `service` |
| `form_submit_error` | Non-200 | `code` |
| `whatsapp_click` / `email_click` / `phone_click` | Respective links | `location` |
| `service_page_engaged` | 30s or 50% scroll | `slug` |
| `marketplace_page_engaged` | 30s or 50% scroll | `marketplace` |
| `case_study_engaged` | 30s or 50% scroll | `slug` |

**Never sent:** name, email, phone, message text, revenue range, IP, or any free-text value.

A/B testing (§38) is out of scope for v1; `primaryCtaLabel` and hero copy are already isolated for a later single-variable test.

---

## 15. Required client inputs

### Blocking — cannot launch without

| # | Input | Blocks |
|---|---|---|
| 1 | Whether **Sagheer Ur Rahman** is a personal name, a trading name, or a registered entity | Brand, metadata, `Organization` schema, footer, legal |
| 2 | Business email for leads | Form delivery |
| 3 | WhatsApp and/or phone | Contact page, footer |
| 4 | ~~Is the consultation free?~~ **Resolved — yes (D10)** | — |
| 5 | Privacy policy content or approval to draft | `/privacy-policy` — and legally, the form |
| 6 | Terms content or approval to draft | `/terms` |
| 7 | Target countries / regions served | Copy, `areaServed`, currency and timezone references, GDPR/UK-GDPR applicability |
| 8 | Confirmation of which sourcing models are used (§2.4, §16 Q3) | Product Research and New Store Launch policy blocks |

### Section-gating — page ships, section hidden

| # | Input | Gated |
|---|---|---|
| 9 | Real testimonials with publication permission | Testimonials |
| 10 | Case studies with written permission + timeframes | `/case-studies`, Home evidence |
| 11 | Real team names, roles, photos | About → Team |
| 12 | Verified metrics | All metric displays — **omitted, never estimated** |
| 13 | Logo files (SVG preferred) | Brand mark — falls back to a wordmark |
| 14 | Brand colours, if any | Overrides §7.1 |
| 15 | Booking link | Contact booking option |
| 16 | Social profile URLs | Footer social row, `sameAs` |
| 17 | Documented permission for marketplace logos/screenshots | Any logo or screenshot use — **default is none** |
| 18 | Response-time commitment reliably met | Response-time statements — **omitted if unconfirmed** |
| 19 | Pricing model | Pricing content and `Offer` schema — **no pricing in v1 unless supplied** |
| 20 | What actually happens after a form submission | "What happens next" steps (§8 requires accuracy) |
| 21 | Store access / credential handling policy | Complete Store Management access note (§28) |
| 22 | Whether to link the Fiverr profile publicly | Footer/About social row (§16 Q4) |

Until #20 is supplied, the "what happens next" block uses Constitution §8's sanctioned wording verbatim: *"We review your requirements and contact you with the most suitable next step."*

---

## 16. Open questions

1. **What experience can you actually describe?** The priority question now (§2.3). Personal selling on any of the three platforms, unpaid or informal store work, a portfolio store of your own, relevant employment, or a completed course/certification — any of these is publishable if true, and each meaningfully strengthens the About page. If the honest answer is "none yet," the site still works; it just leans entirely on process depth. What it cannot do is imply a history that doesn't exist.
2. **Is "Sagheer Ur Rahman" a personal name, a trading name, or a registered company?**
3. **Which sourcing models do you actually use?** Specifically: do you source from wholesale/supplier accounts, or from another retailer or marketplace shipping directly to the buyer? The second is restricted on eBay and the site must not advertise it (§2.4, §16).
4. **Do you have your own Fiverr, Upwork, or marketplace-seller profile?** If so it can be linked as genuine proof of an operating service business. The reference gig cannot (§2.5).
5. **TikTok Shop region.** TikTok Shop operates differently by market (UK, US, SEA). Which do you serve?
6. **Do you work inside client accounts?** Via granted user permissions, shared credentials, or advisory only? Affects both the Complete Store Management copy and the security statement.
7. **Blog ownership.** Who writes and approves posts? An unmaintained blog damages trust more than no blog.
8. **Any client who would consent to an anonymised case study?** One unlocks the strongest section on the site.

---

## 17. Source-gig language audit

The reference gig (`fiverr.com/sal_ecom/grow-your-ebay-store`) is **not the client's work** (§2.5). It was supplied only to communicate the intended service scope, and this section exists only as a "do not write this" list. Nothing from it may be used as evidence, copy, or citation.

It contains four constructions that **must not** reach the website.

| Gig phrase | Constitution rule | Status |
|---|---|---|
| "generated over $2000+ in sales profit" | §3.4 claims require evidence; §10 no isolated metric; §48 Rule 2 | **Excluded entirely, in any form including paraphrase.** It is another seller's claim (§2.5). |
| "secret strategy", "Hidden Optimization Method", "secret optimization" | §3.3 never overpromise; §41 excessive buzzwords | **Rewritten** (§5.1.2) |
| "Bypass the 0-Rating Barrier" | §16 no circumvention language | **Rewritten** (§5.1.2) |
| "get your very first sequence of orders fast", "proven launch formula", "trigger quick buyer decisions" | §3.3 no guaranteed sales; §11 no guaranteed feedback | **Rewritten** (§5.1.2) |

The *service concept* — a structured launch programme for new, zero-feedback stores — is legitimate and gets its own page (§5.3, `/services/new-store-launch`). It is described as a method the client applies, never as one with a proven result behind it (§2.5).

A business website and a Fiverr gig carry different risk. Guarantee language on a marketplace-services site is a liability a gig page does not have, and the audience here — sellers evaluating a retainer — reads qualified, specific language as more credible than superlatives, not less.

---

## 18. Project structure

```
src/
  app/
    layout.tsx  page.tsx  sitemap.ts  robots.ts  not-found.tsx  error.tsx
    services/page.tsx
    services/[slug]/page.tsx        six service pages
    ebay/page.tsx  amazon/page.tsx  tiktok-shop/page.tsx
    case-studies/page.tsx  case-studies/[slug]/page.tsx
    about/page.tsx
    blog/page.tsx  blog/[slug]/page.tsx
    contact/page.tsx
    privacy-policy/page.tsx  terms/page.tsx
    api/consultation/route.ts
  components/  layout/ primitives/ marketing/ marketplace/ forms/ seo/
  content/
    types.ts site.ts marketplaces.ts services.ts faqs.ts navigation.ts footer.ts
    caseStudies.ts testimonials.ts team.ts blog/
  lib/
    validation.ts email.ts ratelimit.ts analytics.ts seo.ts utils.ts
  styles/globals.css
CLIENT_INPUTS.md
```

---

## 19. Build phases

Pages are tiered so the site can go live before all fifteen exist.

| Phase | Deliverable | Tier | Exit condition |
|---|---|---|---|
| 0 | Init, tokens, Tailwind theme, fonts, layout shell, Navbar + Footer | — | Nav keyboard-accessible; Lighthouse a11y 100 on the shell |
| 1 | Primitives, content types, content modules | — | Types compile; no copy hardcoded in components |
| 2 | Home, all sections including gated | **Launch** | Renders correctly with empty proof arrays |
| 3 | Services hub + `/services/store-management` + `/services/new-store-launch` | **Launch** | Highest-intent pages live |
| 4 | `/ebay` (deepest), then `/amazon`, `/tiktok-shop` | **Launch** | ≥50% unique content each, verified side by side |
| 5 | Contact + form + API + email + rate limit | **Launch** | End-to-end submission, failure path, and spam traps all verified |
| 6 | About, Privacy, Terms, 404/500 | **Launch** | Legal pages populated |
| 7 | Four core service detail pages | Follow-on | Each substantive, none thin |
| 8 | Case Studies + Blog scaffolds | Follow-on | Empty states correct; gated routes `noindex` and out of sitemap |
| 9 | SEO layer — metadata, JSON-LD, sitemap, robots | **Launch** | Rich Results Test passes; no fabricated schema fields |
| 10 | Motion, polish, responsive sweep | **Launch** | Reduced-motion verified; no horizontal overflow from 320px up |
| 11 | QA gates (§21) | **Launch** | All eight gates pass on every live page |

Minimum viable launch = phases 0–6 and 9–11. Phases 7–8 follow without restructuring.

---

## 20. Constitution amendments required

Two decisions in this spec conflict with the constitution as written. The constitution is the source of truth (§0), so these need the client's explicit approval before implementation, and `constitution.md` should be patched to match.

| # | Constitution text | Required change | Reason |
|---|---|---|---|
| A1 | §4.2 "Amazon and eBay must be treated as two major service domains" | Three domains: eBay, Amazon, TikTok Shop | Client offers TikTok Shop |
| A2 | §4.1 pillar "Amazon A-to-Z Claim Support"; §22.1 theme "Amazon A-to-Z claim support" | **Strike both** | Service is not offered — "A to Z" means end-to-end management (§2.1) |
| A3 | §4.1 pillar "Marketplace Growth" | Absorb into Complete Store Management and New Store Launch | Growth is the outcome of those offerings, not a separate sellable service (§41 service dump) |
| A4 | §24 primary navigation list | Marketplaces dropdown; Contact removed from nav | Three marketplaces make a flat nav too wide (§24 "avoid deep navigation", §7.4 one clear action) |
| A5 | §25 page list | Add TikTok Shop; split service pages per §3.1 | Follows from A1 and the confirmed service list |
| A6 | §1.1 positioning line "We manage, optimize, and grow Amazon and eBay stores." | Add TikTok Shop | Follows from A1 |

Everything else in the constitution is followed as written. **I have not edited `constitution.md`** — say the word and I will apply A1–A6.

---

## 21. Quality gates (§44, §45)

Every page passes all eight before it is done:

1. **Visual** — token system respected; no one-off values; consistent with siblings.
2. **Responsive** — 320/375/768/1024/1440/1920; no horizontal scroll; mobile is not a squeezed desktop.
3. **Accessibility** — axe zero violations; keyboard-only pass; focus visible; heading order valid; contrast verified.
4. **SEO** — unique title/description; one H1; canonical; OG image; valid schema; internal links present.
5. **Interaction** — every control works; forms show label, validation, error, loading, success; nothing fails silently.
6. **Performance** — within §12 budgets; Lighthouse mobile ≥90.
7. **Content accuracy** — every claim maps to `[VERIFIED]`, `[SERVICE]`, or a visibly labelled `[DEMO]`; zero unqualified numbers; zero guarantee language; zero placeholder text.
8. **Security** — no secrets in the bundle; server validation present; headers set.

### Launch blockers

- Any fabricated testimonial, metric, logo, team member, or case study.
- Any guarantee of sales, rankings, profit, feedback, or account outcomes (§3.3, §11).
- The "$2000+" figure, or any paraphrase of it, appearing anywhere (D8).
- Any "secret method", "hidden strategy", or "bypass" construction (§17).
- The phrase "A to Z" on `/amazon` (§2.1).
- Any marketplace logo or affiliation implication without documented permission (§43).
- Any claim of tenure, delivered volume, client count, or track record on any marketplace (§2.3).
- Any reference, link, screenshot, or paraphrase of the third-party gig (§2.5).
- Any unresolved blocking item from §15.
- Any remaining `Lorem ipsum`, `TODO`, or dummy contact detail.

---

## 22. Constitution compliance map

| Constitution | Satisfied in |
|---|---|
| §1 Vision, §2 Brand | §5.1 hero, §7 |
| §3 Messaging, §42 Evidence | §0 labelling, §9 literal types, §17, §21 gate 7 |
| §4 Service architecture | §2, §3.1 — **amended, see §20** |
| §5 Homepage | §5.1 |
| §6 Hero | §5.1.1 |
| §7 Conversion, §39 Mobile | §4 |
| §8 Lead form | §6 |
| §9 Trust, §41 Anti-patterns | §5 gating, §15, §17 |
| §10 Case studies | §5.5 |
| §11 New store | §5.1.2, §5.3 |
| §12 Research, §13 Listings, §14 Operations, §15 Support | §5.3 |
| §16 Compliance | §2.4, §5.1 FAQ, §5.4 |
| §17 Visual, §33 Design system | §7 |
| §18 Imagery | §5.1.1, §8 `ExampleLabel` |
| §19 Motion | §7.5 |
| §20 Responsive | §7.4, §21 gate 2 |
| §21 Accessibility, §36 i18n | §11, §9 |
| §22 SEO, §23 Content | §10, §3.4 |
| §24 Navigation, §26 Footer | §3.2 — **amended** |
| §25 Pages | §5 — **amended** |
| §27 Privacy, §28 Security | §13 |
| §29 Performance | §12 |
| §30 Next.js, §31 Components, §32 Data | §8, §9, §18 |
| §34 Interaction, §35 Errors | §6.2, §5.5, §5.7 |
| §37 Analytics, §38 A/B | §14 |
| §40 Trust order | §5 section ordering |
| §43 Legal, §49 Client inputs | §5.4, §15 |
| §44 Gates, §45 Done | §21 |
| §47 Decision hierarchy | See below |

**§47 hierarchy applied:** truthfulness over polish (proof sections hidden rather than plausibly filled; the $2,000 figure dropped; no track record implied on any marketplace; a third party's work never presented as the client's). User clarity over conversion (revenue range optional and defaulted to "prefer not to say"; "A to Z" renamed on Amazon pages even though it is the client's own term). Accessibility over visual effect (no CAPTCHA, reduced-motion honoured, focus rings never removed). Performance over novelty (inline SVG hero, zero third-party scripts at launch).

---

*End of specification. Subordinate to [constitution.md](constitution.md), except where §20 records an agreed amendment.*
