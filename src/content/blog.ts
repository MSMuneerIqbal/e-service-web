/**
 * Blog posts — specs.md §5.7
 *
 * Empty. Posts are added here (or migrated to MDX files) when they are written.
 *
 * `author` has no default and no fallback: Constitution §48 Rule 2 forbids
 * invented people, so a post cannot be published without naming a real author.
 */

export interface BlogPost {
  slug: string
  title: string
  description: string
  /** ISO date */
  publishedAt: string
  updatedAt?: string
  /** Must be a real, named person or the business entity */
  author: string
  /** Paragraphs of body copy */
  body: string[]
  /** Service slugs this post should link to */
  relatedServices: string[]
}

export const posts: BlogPost[] = []

export const hasPosts = posts.length > 0

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

/**
 * Planned topics, for whoever writes them next. Not rendered anywhere —
 * an unwritten post is not content (Constitution §48 Rule 8).
 *
 *  1. How to evaluate a product before you commit to stock
 *  2. What actually makes a listing rank and convert
 *  3. What to do when a new store has no orders yet
 */
