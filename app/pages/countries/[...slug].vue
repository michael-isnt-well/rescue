<script setup lang="ts">
const route = useRoute()

const { data: doc } = await useAsyncData(`country-${route.path}`, () =>
  queryCollection('countries').path(route.path).first(),
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Country not found', fatal: true })
}

const c = computed(() => doc.value!)

// Auto-link every guide and rescue tagged to this country.
const { data: linked } = await useAsyncData(`country-linked-${route.path}`, async () => {
  const slug = doc.value?.countrySlug
  if (!slug) return { guides: [], rescues: [] }
  const [allGuides, allRescues] = await Promise.all([
    queryCollection('guides').select('title', 'path', 'countries').all(),
    queryCollection('rescues').select('name', 'path', 'countries').all(),
  ])
  return {
    guides: allGuides.filter((g) => (g.countries || []).includes(slug)),
    rescues: allRescues.filter((r) => (r.countries || []).includes(slug)),
  }
})

usePageSeo({
  title: c.value.seoTitle || `Adopting a rescue dog from ${c.value.name}`,
  description: c.value.description,
  type: 'article',
  modifiedTime: c.value.lastReviewedAt,
})

const schema = computed(() =>
  buildArticle({
    headline: c.value.title,
    description: c.value.description,
    path: route.path,
    dateModified: c.value.lastReviewedAt,
  }),
)

const crumbs = computed(() => [
  { name: 'Home', path: '/' },
  { name: 'Countries', path: '/countries' },
  { name: c.value.name, path: route.path },
])
</script>

<template>
  <article v-if="doc" class="measure">
    <Breadcrumbs :items="crumbs" class="mb-8" />

    <header>
      <p class="eyebrow">Country guide</p>
      <h1 class="display mt-3 text-[2rem] leading-tight sm:text-[2.6rem]">
        <span class="mr-2" aria-hidden="true">{{ c.flag }}</span>{{ c.title }}
      </h1>
      <p v-if="c.description" class="lede mt-4">{{ c.description }}</p>

      <dl class="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-[var(--color-line)] py-4 text-sm">
        <div>
          <dt class="text-[var(--color-faint)]">Distance from the UK</dt>
          <dd class="font-semibold">~{{ c.distanceKm.toLocaleString('en-GB') }} km<span v-if="c.capital" class="font-normal text-[var(--color-muted)]"> (to {{ c.capital }})</span></dd>
        </div>
        <div v-if="c.transport?.length">
          <dt class="text-[var(--color-faint)]">Typical transport</dt>
          <dd class="font-semibold">{{ c.transport.join(', ') }}</dd>
        </div>
        <div v-if="c.lastReviewedAt">
          <dt class="text-[var(--color-faint)]">Last reviewed</dt>
          <dd class="font-semibold">{{ formatDate(c.lastReviewedAt) }}</dd>
        </div>
      </dl>
    </header>

    <CountryLocator :active="c.countrySlug" class="mt-8" />

    <div class="prose mt-8">
      <ContentRenderer :value="doc" />
    </div>

    <section
      v-if="linked && (linked.guides.length || linked.rescues.length)"
      class="mt-12 border-t border-[var(--color-line)] pt-8"
    >
      <p class="eyebrow">On this country</p>
      <div class="mt-4 grid gap-8 sm:grid-cols-2">
        <div v-if="linked.rescues.length">
          <h2 class="display text-lg">Rescues</h2>
          <ul class="mt-3 space-y-2 text-sm">
            <li v-for="r in linked.rescues" :key="r.path">
              <NuxtLink :to="r.path" class="font-semibold text-[var(--color-brand-dark)]">{{ r.name }} →</NuxtLink>
            </li>
          </ul>
        </div>
        <div v-if="linked.guides.length">
          <h2 class="display text-lg">Guides</h2>
          <ul class="mt-3 space-y-2 text-sm">
            <li v-for="g in linked.guides" :key="g.path">
              <NuxtLink :to="g.path" class="font-semibold text-[var(--color-brand-dark)]">{{ g.title }} →</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <JsonLd :schema="schema" />
  </article>
</template>
