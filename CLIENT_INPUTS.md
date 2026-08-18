# Client Inputs Required

Live register of everything the site still needs from you. Derived from [specs.md](specs.md) §15 and Constitution §49.

**Nothing in this list is invented in the codebase.** Where an input is missing, the site either omits the claim entirely or hides the section — it never fills the gap with a placeholder, an estimate, or a plausible guess.

Status: `[ ]` outstanding · `[~]` partially supplied · `[x]` supplied

---

## Blocking — the site should not go live without these

| # | Input | What it unblocks | Where it goes |
|---|---|---|---|
| [~] 1 | Name is now **Aneq_AR** as instructed. Still confirm: is it a personal name, a trading name, or a registered company — and is the underscore intended for public use? The domain and email say *AR Services Digital* | `Organization` JSON-LD, footer, legal pages | `src/content/site.ts` → `businessName` |
| [ ] 2 | **Web3Forms access key.** Go to https://web3forms.com, enter the email where you want leads delivered, they email you a key. Free, no account. | Consultation form delivery — **the form will not send without this** | `NEXT_PUBLIC_WEB3FORMS_KEY` on Vercel |
| [x] 3 | ~~WhatsApp / phone~~ **Supplied: +971 58 858 1245** | Live in footer, contact page and floating button | `src/content/site.ts` → `contact[]` |
| [ ] 5 | Privacy policy reviewed by a professional | `/privacy-policy` — and legally, the form itself | `src/app/privacy-policy/page.tsx` |
| [ ] 6 | Terms & conditions reviewed by a professional | `/terms` | `src/app/terms/page.tsx` |
| [ ] 7 | Target countries / regions served | Copy tone, currency references, GDPR/UK-GDPR applicability | Content review |
| [ ] 8 | Production domain — **not blocking.** Vercel's own domain is used automatically until you attach a custom one | Canonicals, OG URLs, sitemap | `NEXT_PUBLIC_SITE_URL` on Vercel |
| [ ] 9 | Which sourcing models you actually use (wholesale supplier vs. retailer-shipped) | Product Research and New Store Launch policy wording | `src/content/services.ts` |

**On #9:** marketplace dropshipping rules are restrictive and differ by platform. Broadly, eBay permits dropshipping from wholesale suppliers but restricts sourcing from another retailer that ships directly to your buyer, and Amazon requires you to be the seller of record on all packing materials. **Verify both against current published policy before launch.** The site currently describes sourcing in neutral terms and never advertises retail-arbitrage dropshipping.

---

## Section-gating — the page ships, the section stays hidden

Each of these controls a section that renders `null` while its data is empty. Supplying the data is a content edit; no component changes are needed.

| # | Input | Hidden section | Where it goes |
|---|---|---|---|
| [ ] 10 | Real testimonials, with permission to publish | Testimonials (home) | `src/content/proof.ts` → `testimonials[]` |
| [ ] 11 | Case studies with **written** permission and timeframes | `/case-studies`, home evidence section | `src/content/proof.ts` → `caseStudies[]` |
| [ ] 12 | Real team names, roles, bios | About → Team | `src/content/proof.ts` → `team[]` |
| [ ] 13 | Verified metrics | All metric displays — **currently omitted entirely, never estimated** | Requires evidence first |
| [ ] 14 | Logo file (SVG preferred) | Brand mark — currently a typographic wordmark | `src/components/layout/Navbar.tsx` → `Wordmark` |
| [ ] 15 | Brand colours, if any exist | Overrides the palette | `src/styles/globals.css` → `@theme` |
| [ ] 16 | Booking link (Calendly etc.) | Contact page booking option | `src/content/site.ts` → `bookingUrl` |
| [~] 17 | Social profiles — **Upwork supplied.** Could not be opened to confirm (bot protection); verify the link resolves | Footer social row, `sameAs` schema | `src/content/site.ts` → `social[]` |
| [ ] 18 | Written permission for marketplace logos/screenshots | Any eBay/Amazon/TikTok logo — **default is none** | Brand review |
| [ ] 19 | A response-time you can consistently meet | Response-time statements — **currently omitted** | `src/content/faqs.ts` |
| [ ] 20 | Pricing model | Pricing content, `Offer` schema — **no pricing shown** | New content module |
| [ ] 21 | What actually happens after a form submission | "What happens next" steps on `/contact` | `src/app/contact/page.tsx` |
| [ ] 22 | Store access / credential handling policy | Complete Store Management access note | `src/content/services.ts` |
| [ ] 23 | Blog posts | `/blog` — currently an honest empty state | `src/content/blog.ts` → `posts[]` |
| [x] 24 | ~~Own freelance profile~~ **Upwork supplied and linked** | Footer social row | `src/content/site.ts` → `social[]` |

**On #21:** until you confirm the real process, `/contact` uses Constitution §8's sanctioned neutral wording: *"We review your requirements and contact you with the most suitable next step."* It makes no response-time promise.

---

## Compile-time protections you cannot accidentally bypass

Three types in `src/content/types.ts` use the literal type `true`:

```ts
CaseStudy.clientPermission: true
Testimonial.verified:       true
TeamMember.real:            true
```

Adding a record without these fields set to `true` is a **TypeScript compile error**, so the build fails rather than publishing an unverified testimonial or an invented team member. This is deliberate — do not relax them to `boolean`.

---

## What the site claims today

So there is no ambiguity about what has been asserted on your behalf:

- **No** numbers of any kind — no revenue, client counts, stores managed, growth percentages, ratings or review counts.
- **No** years of experience, founding date, or tenure on any marketplace.
- **No** testimonials, case studies, team members or client logos.
- **No** marketplace logos, and an explicit footer statement that you are **not** affiliated with, endorsed by, or certified by eBay, Amazon or TikTok.
- **No** guarantees of sales, rankings, revenue or feedback. Every mention of the word "guarantee" on the site is a statement that something *cannot* be guaranteed.
- **One** external profile linked (Upwork), supplied by the client as their own. Not independently verified.
- **Nothing** drawn from the third-party Fiverr gig — not its portfolio, not its packages, and not its "$2000+" figure, which was another seller's claim (specs.md §2.5).

All example dashboards, listings and research comparisons use fictional products and invented figures, and each carries a visible "Example" label.
