import type { Service } from './types'

/**
 * Service content — specs.md §2.2
 *
 * Four core services plus two packaged offerings. Copy rules applied throughout:
 *  - Outcome-oriented, not task-oriented (Constitution §3.2)
 *  - No guarantees of sales, rankings, profit or feedback (§3.3)
 *  - No numbers of any kind (§3.4)
 *  - Marketplace terms explained in plain language (§3.5)
 *  - Every service carries an honest `limitations` statement (§3.3)
 *
 * The phrase "A to Z" appears only as `clientTerm` on store-management, and is
 * never rendered on Amazon pages — an Amazon seller reads it as buyer-claim
 * handling, which is not offered (specs.md §2.1).
 */

export const services: Service[] = [
  /* ================================================================== */
  /* CORE 1 — Product Research & Hunting                                */
  /* ================================================================== */
  {
    slug: 'product-research',
    title: 'Product Research & Hunting',
    navLabel: 'Product Research',
    clientTerm: 'Hunting',
    kind: 'core',
    icon: 'search',
    shortDescription:
      'Structured product analysis that narrows a crowded market down to a shortlist you can defend with reasons, not guesswork.',
    longDescription:
      'Choosing what to sell is the decision that constrains every decision after it. A product with thin margins cannot be rescued by a better listing, and a saturated category will absorb whatever advertising budget you put behind it. Product research is where that risk is examined before your money is committed, not after.',
    bullets: [
      'Demand assessment across the categories you are considering',
      'Competition review — who is already selling, how well established they are',
      'Selling price and estimated margin after marketplace fees and shipping',
      'Saturation and differentiation check',
      'Sourcing and supplier feasibility',
      'Operational load — returns risk, fragility, size and weight, seasonality',
      'Documented shortlist with the reasoning behind each candidate',
    ],
    process: [
      {
        title: 'Demand',
        description:
          'We look at whether people are actually buying in the category, how steady that buying is across the year, and whether interest is growing or fading.',
      },
      {
        title: 'Competition',
        description:
          'We review who already holds the category, how entrenched they are, how strong their listings look, and whether a new seller has room to be noticed.',
      },
      {
        title: 'Economics',
        description:
          'We work through selling price, marketplace fees, shipping, and expected returns to see what margin realistically survives — before sourcing, not after.',
      },
      {
        title: 'Product fit',
        description:
          'We check the practical side: how the item ships, how fragile it is, how often it gets returned, and whether it fits how you want to run your store.',
      },
      {
        title: 'Opportunity',
        description:
          'Everything above is weighed together into a shortlist, with the reasoning written down so you can challenge it rather than take it on trust.',
      },
    ],
    deliverables: [
      'A shortlist of candidate products with the reasoning for each',
      'Demand, competition and margin notes per candidate',
      'Identified risk factors and operational considerations',
      'Clear notes on anything we could not verify',
    ],
    limitations:
      'Research reduces risk. It does not remove it. Marketplaces shift, competitors enter, suppliers change their pricing, and demand moves in ways no analysis predicts perfectly. What this work gives you is a decision made on evidence and stated reasoning, rather than on a hunch — and a written record you can revisit when conditions change.',
    metaTitle: 'Product Research & Hunting for eBay, Amazon & TikTok Shop',
    metaDescription:
      'Structured product research for marketplace sellers — demand, competition, margin and risk assessed before you commit to stock. Free consultation.',
  },

  /* ================================================================== */
  /* CORE 2 — Listing Creation & Optimization                           */
  /* ================================================================== */
  {
    slug: 'listing-optimization',
    title: 'Listing Creation & Optimization',
    navLabel: 'Listing Optimization',
    clientTerm: 'Listing',
    kind: 'core',
    icon: 'listing',
    shortDescription:
      'Listings built so search can categorise them correctly and buyers can decide quickly — structured titles, complete attributes, clear copy.',
    longDescription:
      'A listing does two jobs at once. It tells the marketplace what the product is, so the item can be matched to the right searches. And it tells a buyer why this one is worth choosing, in the few seconds before they scroll on. Most underperforming listings fail at one of those two jobs, and it is usually visible within a minute of looking at them.',
    bullets: [
      'Titles structured around how buyers actually search',
      'Keyword research grounded in real search language, not guesswork',
      'Complete, accurate item attributes and category placement',
      'Bullet points written for scanning, not for word count',
      'Descriptions that answer the questions buyers ask before purchasing',
      'Image sequence and coverage review',
      'Listing quality and completeness checks',
    ],
    process: [
      {
        title: 'Audit',
        description:
          'We go through the existing listing against how the marketplace reads it — what is missing, what is miscategorised, what a buyer cannot tell from the page.',
      },
      {
        title: 'Keyword research',
        description:
          'We identify the language buyers use for this product, including the variations and synonyms that get missed when the title is written from the supplier sheet.',
      },
      {
        title: 'Rewrite',
        description:
          'Title, bullets and description are rewritten to be readable first and searchable second. Keyword stuffing reads as spam to buyers and does not help.',
      },
      {
        title: 'Structure',
        description:
          'Attributes, item specifics and category placement are completed properly. This is the least visible part of a listing and often the most consequential.',
      },
      {
        title: 'Review',
        description:
          'The listing is checked against marketplace requirements and against what a first-time buyer would need to know.',
      },
    ],
    deliverables: [
      'Rewritten titles, bullets, descriptions and attributes',
      'Keyword notes showing what was targeted and why',
      'Image and content gaps identified',
      'A before-and-after record of what changed',
    ],
    limitations:
      'Keyword placement alone does not determine where a listing ranks. Marketplaces weigh relevance, conversion, pricing, fulfilment performance and account health together, and most of those sit outside a listing page. Good listing work removes the obstacles that are within your control. It cannot override the ones that are not.',
    metaTitle: 'Marketplace Listing Creation & Optimization Services',
    metaDescription:
      'Listing creation and optimization for eBay, Amazon and TikTok Shop — structured titles, complete attributes, buyer-focused copy. Free consultation.',
  },

  /* ================================================================== */
  /* CORE 3 — Order Management                                          */
  /* ================================================================== */
  {
    slug: 'order-management',
    title: 'Order Management',
    navLabel: 'Order Management',
    clientTerm: 'Order',
    kind: 'core',
    icon: 'orders',
    shortDescription:
      'The daily operational work that keeps a store in good standing — orders processed, tracking uploaded, stock checked, problems caught early.',
    longDescription:
      'Marketplaces measure sellers on operational consistency, and the metrics that matter are unforgiving. A late dispatch, a cancelled order, a tracking number uploaded after the deadline — each one is small on its own and each one is recorded. Order management is the unglamorous work of making sure those things do not accumulate.',
    bullets: [
      'Daily order processing and dispatch coordination',
      'Tracking uploaded within marketplace deadlines',
      'Stock level checks and low-stock flagging',
      'Supplier and fulfilment coordination',
      'Cancellation and late-dispatch prevention',
      'Store health and performance metric monitoring',
      'Listing maintenance — pricing, availability, corrections',
    ],
    process: [
      {
        title: 'Daily order review',
        description:
          'New orders are checked and processed on a set schedule, so nothing sits waiting over a weekend or a holiday.',
      },
      {
        title: 'Fulfilment coordination',
        description:
          'We coordinate with your supplier or fulfilment route, confirm dispatch, and chase anything that has not moved when it should have.',
      },
      {
        title: 'Tracking and confirmation',
        description:
          'Tracking is uploaded within the window the marketplace expects, because late tracking counts against the store even when the parcel arrives on time.',
      },
      {
        title: 'Stock and listing maintenance',
        description:
          'Availability is checked against listings so you are not selling what cannot be shipped — the fastest route to cancellations and defects.',
      },
      {
        title: 'Health monitoring',
        description:
          'Store performance metrics are watched so a developing problem is raised while it is still small.',
      },
    ],
    deliverables: [
      'Orders processed and dispatched on an agreed schedule',
      'Tracking uploaded within marketplace deadlines',
      'Stock and availability kept aligned with live listings',
      'Store health issues raised as they appear, not after they escalate',
    ],
    limitations:
      'We can control process, timing and communication. We cannot control a supplier who ships late, a carrier who loses a parcel, or a marketplace policy change. What consistent operational handling does is reduce the number of preventable problems and make the unavoidable ones visible early enough to act on.',
    metaTitle: 'Marketplace Order Management & Store Operations',
    metaDescription:
      'Daily order management for eBay, Amazon and TikTok Shop sellers — processing, tracking, stock checks and store health monitoring. Free consultation.',
  },

  /* ================================================================== */
  /* CORE 4 — Customer Support & Returns                                */
  /* ================================================================== */
  {
    slug: 'customer-support',
    title: 'Customer Support & Returns',
    navLabel: 'Customer Support',
    clientTerm: 'Customer care',
    kind: 'core',
    icon: 'support',
    shortDescription:
      'Buyer messages, returns and disputes handled in a consistent professional voice — the reliability function behind your feedback score.',
    longDescription:
      'Buyer messages are not a support cost. They are the last point at which a difficult order can still end well. A clear reply within a reasonable window frequently prevents a return, a dispute, or the negative feedback that follows both. Handled badly — or handled late — the same message becomes a case.',
    bullets: [
      'Buyer message handling in a consistent, professional voice',
      'Pre-purchase questions answered accurately',
      'Return requests processed according to your policy',
      'Refund-related communication',
      'Delivery problems and non-arrival enquiries',
      'Dispute and case communication',
      'Post-resolution follow-up where appropriate',
    ],
    process: [
      {
        title: 'Message triage',
        description:
          'Incoming messages are sorted by what they actually are — a pre-sale question, a delivery chase, or a problem that needs resolving now.',
      },
      {
        title: 'Consistent response',
        description:
          'Replies follow an agreed tone and an agreed policy, so a buyer gets the same answer regardless of who is at the keyboard or what day it is.',
      },
      {
        title: 'Returns handling',
        description:
          'Return requests are processed against your stated policy and the marketplace rules that sit above it, with the reasoning explained to the buyer.',
      },
      {
        title: 'Escalation',
        description:
          'Anything outside the agreed scope — a policy exception, a goodwill decision, a large refund — comes to you rather than being decided for you.',
      },
      {
        title: 'Follow-up',
        description:
          'Where a problem was resolved well, appropriate follow-up gives the buyer the opportunity to reflect that. It is never incentivised or scripted.',
      },
    ],
    deliverables: [
      'Buyer messages handled on an agreed schedule',
      'Returns and refunds processed against your policy',
      'Disputes and cases communicated and documented',
      'Escalation to you on anything outside agreed scope',
    ],
    limitations:
      'Feedback cannot be guaranteed, requested selectively, or influenced by anything other than the buyer experience itself. We do not solicit positive reviews, offer anything in exchange for them, or attempt to suppress negative ones — all of which are against marketplace rules and would put your account at risk. Good support improves the odds. It does not manufacture the result.',
    metaTitle: 'Marketplace Customer Support & Returns Handling',
    metaDescription:
      'Buyer messaging, returns and dispute handling for eBay, Amazon and TikTok Shop sellers — consistent, professional, policy-conscious. Free consultation.',
  },

  /* ================================================================== */
  /* OFFERING 1 — Complete Store Management  (the client's "A to Z")    */
  /* ================================================================== */
  {
    slug: 'store-management',
    title: 'Complete Store Management',
    navLabel: 'Complete Store Management',
    clientTerm: 'A to Z',
    kind: 'offering',
    icon: 'manage',
    shortDescription:
      'All four services running together as one ongoing engagement — research, listings, orders and support, with a single point of contact.',
    longDescription:
      'Most sellers do not have a listing problem or an order problem. They have a capacity problem: the operational work grows faster than the hours available for it, and the strategic work stops happening because the day-to-day never ends. Complete Store Management takes the whole operational layer, so the store runs on a schedule rather than on whatever attention is left over.',
    bullets: [
      'Product research and shortlisting on an ongoing basis',
      'Listing creation, optimization and maintenance',
      'Daily order processing and fulfilment coordination',
      'Buyer messaging, returns and dispute handling',
      'Stock, pricing and availability management',
      'Store health and performance monitoring',
      'Regular reporting and a single point of contact',
    ],
    process: [
      {
        title: 'Assess',
        description:
          'We review the store as it stands — listings, operational metrics, buyer communication, and whatever is currently causing the most friction.',
      },
      {
        title: 'Plan',
        description:
          'We agree the scope, the working schedule, what we decide independently, and what always comes back to you before action.',
      },
      {
        title: 'Execute',
        description:
          'The operational work runs on that schedule: orders, listings, messages, stock. The parts that repeat become routine rather than emergencies.',
      },
      {
        title: 'Monitor',
        description:
          'Store health metrics and listing performance are watched continuously, so problems surface as signals rather than as suspensions.',
      },
      {
        title: 'Improve',
        description:
          'What the operational work reveals feeds back into the next cycle — listings that underperform, products that are not worth restocking, processes worth changing.',
      },
    ],
    deliverables: [
      'An agreed operational schedule with defined scope',
      'Day-to-day store operations handled end to end',
      'Regular reporting on what was done and what needs your decision',
      'A single point of contact for the store',
    ],
    limitations:
      'This is an operational partnership, not an autopilot. Decisions about capital, pricing strategy, supplier relationships and business direction remain yours, and the scope of what we act on independently is agreed in writing before the engagement starts. We will also tell you when something you have asked for would put the account at risk.',
    metaTitle: 'Complete Marketplace Store Management Services',
    metaDescription:
      'End-to-end store management for eBay, Amazon and TikTok Shop — research, listings, orders, customer support and reporting. Free consultation.',
  },

  /* ================================================================== */
  /* OFFERING 2 — New Store Launch                                      */
  /* ================================================================== */
  {
    slug: 'new-store-launch',
    title: 'New Store Launch',
    navLabel: 'New Store Launch',
    clientTerm: 'New store',
    kind: 'offering',
    icon: 'launch',
    shortDescription:
      'A structured launch process for stores with no selling history — product strategy, properly built listings, and operational habits set from day one.',
    longDescription:
      'A new store starts with nothing a buyer can use to judge it: no feedback, no sales history, no signal that ordering is safe. That is a real disadvantage and it is worth being straight about it. What a structured launch does is remove every other reason to hesitate — a sensible product choice, a listing that answers the buyer\'s questions, accurate delivery expectations, and support that responds properly when someone gets in touch.',
    bullets: [
      'Product selection suited to a store with no selling history',
      'Listings built correctly from the start rather than fixed later',
      'Realistic pricing and delivery expectations',
      'Operational routine established before order volume arrives',
      'Buyer communication handled from the first message',
      'Store setup reviewed against marketplace requirements',
      'A clear picture of what to expect in the early weeks',
    ],
    process: [
      {
        title: 'New store',
        description:
          'We start from where you actually are — account status, category access, what you can source, and what you can realistically commit each week.',
      },
      {
        title: 'Product strategy',
        description:
          'Early product choice matters more for a new store than for an established one. We prioritise items where a store with no history is not at an obvious disadvantage.',
      },
      {
        title: 'Optimized listings',
        description:
          'Listings are built properly from the start — complete attributes, honest descriptions, accurate delivery timelines. Nothing that will need unpicking later.',
      },
      {
        title: 'First orders',
        description:
          'Early orders carry disproportionate weight, so they get disproportionate care: dispatched promptly, tracked accurately, communicated clearly.',
      },
      {
        title: 'Positive feedback',
        description:
          'Feedback follows from the experience, and cannot be solicited, incentivised or arranged. What we control is giving every early buyer a reason to leave it.',
      },
      {
        title: 'Sustainable growth',
        description:
          'Once orders are moving consistently, the focus shifts to widening the range and building on what the early data shows.',
      },
    ],
    deliverables: [
      'A researched starting product selection with reasoning',
      'Listings built to marketplace requirements from the start',
      'An operating routine for orders and buyer messages',
      'A realistic view of the early weeks, including what may not work',
    ],
    limitations:
      'We help new sellers build a stronger foundation for their first marketplace orders and long-term store growth. We cannot guarantee orders, feedback, revenue or a timeline, and no one honestly can — buyer behaviour, competition and marketplace visibility are outside any seller\'s control. Anyone promising you guaranteed first sales is either misunderstanding the platform or misrepresenting it. What is within our control is that nothing on your side gives a buyer a reason to hesitate.',
    metaTitle: 'New Store Launch Support for Marketplace Sellers',
    metaDescription:
      'Structured launch support for new eBay, Amazon and TikTok Shop stores — product strategy, listings built right, operations from day one. Free consultation.',
  },
]

/* ------------------------------------------------------------------ */
/* Derived collections                                                 */
/* ------------------------------------------------------------------ */

export const coreServices = services.filter((s) => s.kind === 'core')
export const offerings = services.filter((s) => s.kind === 'offering')

export const serviceSlugs = services.map((s) => s.slug)

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
