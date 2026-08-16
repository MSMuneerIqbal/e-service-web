import type { Faq } from './types'

/**
 * FAQs — specs.md §5.1, §5.4
 *
 * No answer is reused across pages. Constitution §22.2 treats near-duplicate
 * content as a quality problem, and FAQ blocks are where duplication usually
 * creeps in first.
 *
 * The "what we don't do" answers are deliberate. They are a trust signal and a
 * qualification filter at the same time, and they are required by
 * Constitution §16.
 */

export const faqs: Faq[] = [
  /* ---------------- Home ---------------- */
  {
    pages: ['/'],
    question: 'Which marketplaces do you work with?',
    answer:
      'eBay, Amazon and TikTok Shop. The four core services — product research, listing optimization, order management and customer support — are available on all three. Each platform works differently underneath, so the approach is adapted to the marketplace rather than applied identically across them.',
  },
  {
    pages: ['/'],
    question: 'Do you only work with new stores, or established ones too?',
    answer:
      'Both. New stores usually need product strategy and listings built correctly from the start. Established stores more often need the operational load taken off them, or listings that were built quickly at the time and never revisited. The consultation is where we work out which of those you are.',
  },
  {
    pages: ['/'],
    question: 'What happens in the free consultation?',
    answer:
      'We look at your store or your plans, talk through what is actually causing the problem, and tell you what we would do about it and in what order. If your situation would be better served by something we do not offer, we will say so. There is no obligation and nothing to pay.',
  },
  {
    pages: ['/'],
    question: 'How do you handle access to my store?',
    answer:
      'Access is agreed before any work starts, kept to the minimum needed for the scope, and set up through the marketplace\'s own permission system wherever the platform provides one. The specific arrangement is confirmed in writing at the outset so there is no ambiguity about what we can and cannot do.',
  },
  {
    pages: ['/'],
    question: 'What do you not do?',
    answer:
      'We do not write, buy or arrange reviews. We do not manipulate feedback, use artificial engagement, or attempt to work around marketplace rules. We do not promise guaranteed sales, guaranteed rankings or guaranteed feedback, because no one can honestly offer those. If a request would put your account at risk, we will tell you rather than do it quietly.',
  },

  /* ---------------- eBay ---------------- */
  {
    pages: ['/ebay'],
    question: 'My listings get views but almost no sales. What is usually wrong?',
    answer:
      'Most often the listing is being seen by the wrong people, or it is being seen by the right people and not answering their questions. Incomplete item specifics cause the first. Thin descriptions, unclear delivery expectations and weak image coverage cause the second. Both are visible from a listing review before any money is spent finding out.',
  },
  {
    pages: ['/ebay'],
    question: 'Does my seller performance rating really affect visibility?',
    answer:
      'Yes. eBay weighs seller performance alongside listing relevance in Best Match, so a store with defects or late dispatch is competing at a disadvantage regardless of listing quality. It also recovers slowly, which is why it is worth monitoring continuously rather than reacting once it has slipped.',
  },
  {
    pages: ['/ebay'],
    question: 'Can you handle returns and item not received cases?',
    answer:
      'Yes. Return requests are processed against your policy and eBay\'s buyer protection framework, and non-arrival enquiries are answered with tracking evidence promptly, which frequently resolves them before they escalate into recorded cases. Anything requiring a goodwill decision or a policy exception comes to you.',
  },

  /* ---------------- Amazon ---------------- */
  {
    pages: ['/amazon'],
    question: 'Why is catalog accuracy such a big deal on Amazon?',
    answer:
      'Because the catalog decides where your product can appear at all. A product filed under the wrong category, or missing the attributes buyers filter by, is invisible to a large share of the searches it should match — and correcting catalog data after the fact is considerably harder than entering it correctly at setup.',
  },
  {
    pages: ['/amazon'],
    question: 'Do you handle FBA, FBM, or both?',
    answer:
      'Both, though the operational work differs. With Fulfilment by Merchant the dispatch, tracking and delivery performance sit with you and we manage that directly. With Fulfilment by Amazon the focus shifts to inventory planning, catalog accuracy and the listing itself. Which one you use is confirmed at the consultation.',
  },
  {
    pages: ['/amazon'],
    question: 'What do you monitor on account health?',
    answer:
      'Order defect indicators, late shipment rate and the operational signals that feed them, checked on a regular schedule. The point is to raise something while it is still a trend rather than after it has triggered enforcement, since Amazon acts on account health faster than it explains itself.',
  },

  /* ---------------- TikTok Shop ---------------- */
  {
    pages: ['/tiktok-shop'],
    question: 'My products keep getting rejected at review. Why?',
    answer:
      'Usually one of three things: the product sits in a category with restrictions that were not checked first, the description makes a claim that is not permitted, or the images do not meet the platform\'s requirements. All three are avoidable at setup, which is considerably less work than appealing after rejection.',
  },
  {
    pages: ['/tiktok-shop'],
    question: 'Do you create the video content as well?',
    answer:
      'No. We handle the commerce side — product setup, listings, orders, stock and buyer support — so that the shop is ready to convert whenever content sends traffic to it. Content production is a separate discipline and we would rather tell you that than do it badly.',
  },
  {
    pages: ['/tiktok-shop'],
    question: 'How tight are the fulfilment deadlines?',
    answer:
      'Tighter than most sellers expect if they are coming from other marketplaces, and missing them is recorded against the shop. Setting up an operational routine that meets the window consistently is a large part of what the order management work is for.',
  },

  /* ---------------- Contact ---------------- */
  {
    pages: ['/contact'],
    question: 'Is the consultation really free?',
    answer:
      'Yes. There is no cost and no obligation to continue afterwards. If what you need is outside what we offer, we will tell you that rather than sell you something adjacent.',
  },
  {
    pages: ['/contact'],
    question: 'What information should I have ready?',
    answer:
      'Whatever you have is enough to start. If you are already selling, the marketplace and roughly what is not working is plenty. If you have not started yet, just tell us that — it changes the conversation but it does not make it a shorter one.',
  },
  {
    pages: ['/contact'],
    question: 'What happens to the information I submit?',
    answer:
      'It is sent directly to our business inbox and used only to respond to your enquiry. It is not published, sold, or added to a marketing list. The Privacy Policy sets out the detail.',
  },
]

/** All FAQs registered for a given route. */
export function faqsFor(path: string): Faq[] {
  return faqs.filter((f) => f.pages.includes(path))
}
