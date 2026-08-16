import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/primitives/Section'
import { PageHero } from '@/components/marketing/Hero'
import { EmptyState, CTASection } from '@/components/marketing/Blocks'
import { posts } from '@/content/blog'
import { buildMetadata } from '@/lib/seo'

/**
 * Blog index — specs.md §5.7
 * noindex and out of the sitemap while empty.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description:
    'Practical guidance for eBay, Amazon and TikTok Shop sellers on product research, listings and store operations.',
  path: '/blog',
  noindex: posts.length === 0,
})

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical guidance for marketplace sellers"
        description="Notes on product research, listing structure and store operations — written for sellers rather than for search engines."
      />

      <Section>
        <Container>
          {posts.length > 0 ? (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm transition-[border-color,box-shadow] hover:border-ink-900/25 hover:shadow-md"
                  >
                    <time
                      dateTime={post.publishedAt}
                      className="text-small text-ink-500"
                    >
                      {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <h2 className="mt-2 text-h3">{post.title}</h2>
                    <p className="mt-3 flex-1 text-body text-ink-700">
                      {post.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon="listing"
              title="No posts published yet"
              description="We would rather publish nothing than publish filler. Articles will appear here as they are written, and each one will be something we would actually send to a client. In the meantime, the service pages set out how the work is done in detail."
              action={{ label: 'Read the service pages', href: '/services' }}
            />
          )}
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
