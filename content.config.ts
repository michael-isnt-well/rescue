import { defineContentConfig, defineCollection, z } from '@nuxt/content'

/**
 * These schemas are the contract for every markdown file — and, deliberately,
 * the migration path to a database later. Field names here are the future
 * column names, so they are typed and validated at build time. A file that
 * violates the schema fails the build rather than shipping broken.
 */

const COUNTRIES = [
  'romania',
  'cyprus',
  'bulgaria',
  'greece',
  'spain',
] as const

// ISO date string (YYYY-MM-DD). Stored as a string for predictable rendering;
// components format it for display.
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use an ISO date, e.g. 2026-08-12')

const faq = z.object({
  question: z.string(),
  answer: z.string(),
})

export default defineContentConfig({
  collections: {
    // -----------------------------------------------------------------------
    // Guides — evergreen, the primary traffic driver.
    // -----------------------------------------------------------------------
    guides: defineCollection({
      type: 'page',
      source: 'guides/**/*.md',
      schema: z.object({
        seoTitle: z.string().optional(), // <title>; falls back to title
        publishedAt: isoDate,
        updatedAt: isoDate.optional(),
        lastReviewedAt: isoDate.optional(), // rendered as a trust signal
        countries: z.array(z.enum(COUNTRIES)).default([]),
        faqs: z.array(faq).default([]), // -> FAQPage schema
        related: z.array(z.string()).default([]), // guide slugs
        // Optional structured steps -> HowTo schema (e.g. the titre timeline).
        howTo: z
          .object({
            name: z.string(),
            description: z.string().optional(),
            steps: z.array(z.object({ name: z.string(), text: z.string() })),
          })
          .optional(),
      }),
    }),

    // -----------------------------------------------------------------------
    // Rescue profiles — one page per UK-based overseas rescue. Verifiable.
    // -----------------------------------------------------------------------
    rescues: defineCollection({
      type: 'page',
      source: 'rescues/**/*.md',
      schema: z.object({
        name: z.string(),
        countries: z.array(z.enum(COUNTRIES)).default([]),
        regionsCovered: z.array(z.string()).default([]),
        charityNumber: z.string().nullable().default(null),
        charityRegisterUrl: z.string().url().nullable().default(null),
        websiteUrl: z.string().url().nullable().default(null),
        facebookUrl: z.string().url().nullable().default(null),
        applicationUrl: z.string().url().nullable().default(null),
        adoptionFeeMin: z.number().nullable().default(null),
        adoptionFeeMax: z.number().nullable().default(null),
        adoptionFeeNote: z.string().nullable().default(null), // e.g. "approx."
        transportFrequency: z.string().nullable().default(null),
        homeCheckType: z
          .enum(['virtual', 'in-person', 'both'])
          .nullable()
          .default(null),
        rehomesToHomesWithCats: z
          .enum(['true', 'false', 'case-by-case'])
          .nullable()
          .default(null),
        rehomesToHomesWithChildren: z
          .enum(['true', 'false', 'case-by-case'])
          .nullable()
          .default(null),
        rehomesWithoutGarden: z
          .enum(['true', 'false', 'case-by-case'])
          .nullable()
          .default(null),
        postAdoptionSupport: z.string().nullable().default(null),
        lastVerifiedAt: isoDate, // REQUIRED — rendered on the page
      }),
    }),

    // -----------------------------------------------------------------------
    // Journal — first-person account, published as it happens.
    // -----------------------------------------------------------------------
    journal: defineCollection({
      type: 'page',
      source: 'journal/**/*.md',
      schema: z.object({
        publishedAt: isoDate,
        weekNumber: z.number().optional(),
        guidesReferenced: z.array(z.string()).default([]), // -> auto links
        rescue: z.string().nullable().default(null), // rescue slug
      }),
    }),

    // -----------------------------------------------------------------------
    // Countries — one page per overseas origin. Facts must be cited, not
    // inferred; health content is vet-check-gated in the body.
    // -----------------------------------------------------------------------
    countries: defineCollection({
      type: 'page',
      source: 'countries/**/*.md',
      schema: z.object({
        name: z.string(),
        flag: z.string(), // emoji, e.g. "🇷🇴"
        countrySlug: z.enum(COUNTRIES), // links to guides/rescues by country
        capital: z.string().optional(),
        distanceKm: z.number(), // approx straight-line, London -> capital
        transport: z.array(z.string()).default([]),
        lastReviewedAt: isoDate,
      }),
    }),
  },
})
