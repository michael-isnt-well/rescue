/**
 * One call to set per-page SEO consistently: <title>, meta description,
 * and OG/Twitter tags with a sensible fallback image.
 *
 * Canonicals and trailing-slash normalisation are handled automatically by
 * @nuxtjs/seo (seo-utils) from the site URL + current route, so we don't set
 * them here.
 */

const DEFAULT_OG_IMAGE = '/og-default.svg'

export interface PageSeo {
  title: string
  description?: string
  /** Absolute or root-relative image path. Falls back to the site default. */
  image?: string | null
  /** article | website | profile — defaults to website. */
  type?: 'article' | 'website' | 'profile'
  publishedTime?: string
  modifiedTime?: string
}

export function usePageSeo(seo: PageSeo) {
  const site = useSiteConfig()
  const image = seo.image || DEFAULT_OG_IMAGE

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogType: seo.type || 'website',
    ogImage: image,
    ogSiteName: site.name,
    twitterCard: 'summary_large_image',
    twitterTitle: seo.title,
    twitterDescription: seo.description,
    twitterImage: image,
    ...(seo.publishedTime ? { articlePublishedTime: seo.publishedTime } : {}),
    ...(seo.modifiedTime ? { articleModifiedTime: seo.modifiedTime } : {}),
  })
}
