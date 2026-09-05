<script setup lang="ts">
const route = useRoute()

const { data: doc } = await useAsyncData(`journal-${route.path}`, () =>
  queryCollection('journal').path(route.path).first(),
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Entry not found', fatal: true })
}

const j = computed(() => doc.value!)

// Auto internal links: referenced guides + the rescue this entry is about.
const { data: refs } = await useAsyncData(`journal-refs-${route.path}`, async () => {
  const guideSlugs = doc.value?.guidesReferenced || []
  const rescueSlug = doc.value?.rescue
  const [guides, rescue] = await Promise.all([
    guideSlugs.length
      ? queryCollection('guides')
          .where('path', 'IN', guideSlugs.map((s) => `/guides/${s}`))
          .select('title', 'path')
          .all()
      : Promise.resolve([]),
    rescueSlug
      ? queryCollection('rescues')
          .path(`/rescues/${rescueSlug}`)
          .select('name', 'path')
          .first()
      : Promise.resolve(null),
  ])
  return { guides, rescue }
})

usePageSeo({
  title: j.value.title,
  description: j.value.description,
  type: 'article',
  publishedTime: j.value.publishedAt,
})

const schema = computed(() =>
  buildArticle({
    headline: j.value.title,
    description: j.value.description,
    path: route.path,
    datePublished: j.value.publishedAt,
  }),
)

const crumbs = computed(() => [
  { name: 'Home', path: '/' },
  { name: 'Journal', path: '/journal' },
  { name: j.value.title, path: route.path },
])
</script>

<template>
  <article v-if="doc" class="measure">
    <Breadcrumbs :items="crumbs" class="mb-8" />

    <header class="text-center">
      <p class="meta">
        <span v-if="j.weekNumber != null" class="font-semibold text-[var(--color-brand-dark)]">
          Week {{ j.weekNumber }}
        </span>
        <span v-if="j.weekNumber != null"> · </span>
        <time :datetime="j.publishedAt">{{ formatDate(j.publishedAt) }}</time>
      </p>
      <h1 class="display mt-3 text-[2.1rem] leading-tight sm:text-[2.7rem]">{{ j.title }}</h1>
    </header>

    <hr class="rule mx-auto mt-8 w-16 !border-t-2 !border-[var(--color-brand)]" />

    <div class="prose mt-8">
      <ContentRenderer :value="doc" />
    </div>

    <aside
      v-if="refs && (refs.guides.length || refs.rescue)"
      class="mt-12 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-subtle)] p-6"
    >
      <p class="eyebrow">Referenced in this entry</p>
      <ul class="mt-3 space-y-2 text-sm">
        <li v-if="refs.rescue">
          <span class="text-[var(--color-muted)]">Rescue: </span>
          <NuxtLink :to="refs.rescue.path" class="font-medium text-[var(--color-brand-dark)]">
            {{ refs.rescue.name }}
          </NuxtLink>
        </li>
        <li v-for="guide in refs.guides" :key="guide.path">
          <span class="text-[var(--color-muted)]">Guide: </span>
          <NuxtLink :to="guide.path" class="font-medium text-[var(--color-brand-dark)]">
            {{ guide.title }}
          </NuxtLink>
        </li>
      </ul>
    </aside>

    <JsonLd :schema="schema" />
  </article>
</template>
