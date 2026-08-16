import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/primitives/Section'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CTASection } from '@/components/marketing/Blocks'
import { posts, getPost } from '@/content/blog'
import { getService } from '@/content/services'
import { site } from '@/content/site'
import { buildMetadata, jsonLd, breadcrumbSchema, absoluteUrlFor } from '@/lib/seo'

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]

  const related = post.relatedServices
    .map((s) => getService(s))
    .filter((s) => s !== undefined)

  // Author is a required field with no fallback — a post cannot publish
  // without a real named author (Constitution §48 Rule 2).
  const articleSchema = {
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: site.businessName },
    mainEntityOfPage: absoluteUrlFor(`/blog/${post.slug}`),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema(trail), articleSchema),
        }}
      />

      <Section>
        <Container>
          <Breadcrumbs trail={trail} />

          <article className="measure">
            <header>
              <h1 className="text-h1 text-balance">{post.title}</h1>
              <p className="mt-4 text-small text-ink-500">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                {' · '}
                {post.author}
              </p>
            </header>

            <div className="mt-8 flex flex-col gap-5 text-body-lg text-ink-700">
              {post.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {related.length > 0 ? (
              <aside className="mt-12 rounded-xl border border-line bg-surface-muted p-6">
                <h2 className="text-h3">Related services</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {related.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-body font-medium text-accent-700 underline underline-offset-4"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </article>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
