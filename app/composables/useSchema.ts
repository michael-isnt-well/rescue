/**
 * Schema.org (JSON-LD) builders — one place, typed, per page type.
 *
 * These return plain objects. Render them with <JsonLd :schema="..." />.
 * Keeping construction here (not scattered in templates) means the graph
 * stays consistent and easy to audit against Google's Rich Results test.
 */

interface Author {
  name: string
  url: string
}

// The site's canonical author/publisher identity. Edit per client.
export const SITE_AUTHOR: Author = {
  name: 'Mike Harper',
  url: '/about',
}

function absUrl(path: string): string {
  const site = useSiteConfig()
  const base = (site.url || '').replace(/\/$/, '')
  if (/^https?:\/\//.test(path)) return path
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`
}

export interface ArticleInput {
  headline: string
  description?: string
  path: string
  image?: string
  datePublished?: string
  dateModified?: string
}

/** Article schema for guides and journal entries. */
export function buildArticle(input: ArticleInput) {
  const site = useSiteConfig()
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absUrl(input.path) },
    ...(input.image ? { image: absUrl(input.image) } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    dateModified: input.dateModified || input.datePublished,
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      url: absUrl(SITE_AUTHOR.url),
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: absUrl('/'),
    },
  }
}

export interface FaqItem {
  question: string
  answer: string
}

/** FAQPage schema — built from the SAME faqs used to render the <Faq> block. */
export function buildFaqPage(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export interface HowToStep {
  name: string
  text: string
}

/** HowTo schema — e.g. the rabies titre / 21-day timeline. */
export function buildHowTo(input: {
  name: string
  description?: string
  steps: HowToStep[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

/** BreadcrumbList — used sitewide. */
export function buildBreadcrumbs(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  }
}

export interface RescueInput {
  name: string
  path: string
  description?: string
  websiteUrl?: string | null
  charityNumber?: string | null
  sameAs?: (string | null)[]
}

/** NGO schema for rescue profiles (falls back to Organization semantics). */
export function buildRescueOrg(input: RescueInput) {
  const sameAs = (input.sameAs || []).filter(Boolean) as string[]
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: input.name,
    url: absUrl(input.path),
    ...(input.description ? { description: input.description } : {}),
    ...(input.websiteUrl ? { mainEntityOfPage: input.websiteUrl } : {}),
    ...(input.charityNumber
      ? {
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'UK Charity Number',
            value: input.charityNumber,
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  }
}

/** Person schema for the about/author page. */
export function buildPerson(input: {
  name: string
  path: string
  description?: string
  image?: string
  sameAs?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: input.name,
    url: absUrl(input.path),
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: absUrl(input.image) } : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
  }
}
