<script setup lang="ts">
const route = useRoute()

const { data: doc } = await useAsyncData(`guide-${route.path}`, () =>
  queryCollection('guides').path(route.path).first(),
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Guide not found', fatal: true })
}

// Resolve related guide slugs -> full stubs for titled internal links.
const { data: related } = await useAsyncData(`guide-related-${route.path}`, async () => {
  const slugs = doc.value?.related || []
  if (!slugs.length) return []
  const paths = slugs.map((s) => `/guides/${s}`)
  return queryCollection('guides')
    .where('path', 'IN', paths)
    .select('title', 'path', 'description')
    .all()
})

const g = computed(() => doc.value!)

// Top-level headings for the "On this page" nav (empty if the guide is short).
const toc = computed<{ id: string; text: string }[]>(
  () => (doc.value as any)?.body?.toc?.links ?? [],
)

usePageSeo({
  title: g.value.seoTitle || g.value.title,
  description: g.value.description,
  type: 'article',
  publishedTime: g.value.publishedAt,
  modifiedTime: g.value.updatedAt || g.value.publishedAt,
})

// JSON-LD: Article always; FAQPage when FAQs exist; HowTo when steps exist.
const schema = computed(() => {
  const graph: Record<string, unknown>[] = [
    buildArticle({
      headline: g.value.title,
      description: g.value.description,
      path: route.path,
      datePublished: g.value.publishedAt,
      dateModified: g.value.updatedAt || g.value.publishedAt,
    }),
  ]
  if (g.value.howTo) {
    graph.push(
      buildHowTo({
        name: g.value.howTo.name,
        description: g.value.howTo.description,
        steps: g.value.howTo.steps,
      }),
    )
  }
  return graph
})

const crumbs = computed(() => [
  { name: 'Home', path: '/' },
  { name: 'Guides', path: '/guides' },
  { name: g.value.title, path: route.path },
])
</script>

<template>
  <article v-if="doc" class="measure">
    <Breadcrumbs :items="crumbs" class="mb-8" />

    <header>
      <p class="eyebrow">Guide</p>
      <h1 class="display mt-3 text-[2rem] leading-tight sm:text-[2.6rem]">{{ doc.title }}</h1>
      <p v-if="doc.description" class="lede mt-4">{{ doc.description }}</p>

      <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[var(--color-line)] py-3 text-sm text-[var(--color-muted)]">
        <span v-if="doc.lastReviewedAt">
          Last reviewed
          <time :datetime="doc.lastReviewedAt" class="font-medium text-[var(--color-ink)]">{{ formatDate(doc.lastReviewedAt) }}</time>
        </span>
        <span v-if="doc.countries?.length" class="flex flex-wrap gap-1.5">
          <span v-for="c in doc.countries" :key="c" class="pill">{{ countryLabel(c) }}</span>
        </span>
      </div>
    </header>

    <!-- On this page -->
    <nav
      v-if="toc.length"
      aria-label="On this page"
      class="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-subtle)] px-5 py-4"
    >
      <p class="eyebrow">On this page</p>
      <ul class="mt-2 space-y-1.5 text-sm">
        <li v-for="link in toc" :key="link.id">
          <a :href="`#${link.id}`" class="text-[var(--color-muted)] no-underline hover:text-[var(--color-brand-dark)]">
            {{ link.text }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="prose mt-10">
      <ContentRenderer :value="doc" />
    </div>

    <Faq v-if="doc.faqs?.length" :items="doc.faqs" />

    <!-- Baseline disclaimer on every guide (health/legal/financial content). -->
    <Disclaimer class="mt-12" />

    <section v-if="related?.length" class="mt-12 border-t border-[var(--color-line)] pt-8">
      <p class="eyebrow">Keep reading</p>
      <h2 class="display mt-2 text-xl">Related guides</h2>
      <ul class="mt-4 space-y-4">
        <li v-for="r in related" :key="r.path">
          <NuxtLink :to="r.path" class="font-semibold text-[var(--color-brand-dark)]">
            {{ r.title }}
          </NuxtLink>
          <p v-if="r.description" class="text-sm text-[var(--color-muted)]">
            {{ r.description }}
          </p>
        </li>
      </ul>
    </section>

    <JsonLd :schema="schema" />
  </article>
</template>
