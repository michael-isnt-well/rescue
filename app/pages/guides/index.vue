<script setup lang="ts">
const { data: guides } = await useAsyncData('guides-index', () =>
  queryCollection('guides')
    .order('publishedAt', 'DESC')
    .select('title', 'path', 'description', 'countries', 'lastReviewedAt')
    .all(),
)

usePageSeo({
  title: 'Guides',
  description:
    'Practical, verified guides for adopting a rescue dog from overseas: the rabies titre timeline, transport day, decompression, and insurance.',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Guides', path: '/guides' },
]
</script>

<template>
  <div>
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <header>
      <p class="eyebrow">Guides</p>
      <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">Practical guidance, reviewed and dated</h1>
      <p class="lede mt-4">
        Evergreen help for the parts of the process that confused me most — so
        you know exactly what's coming and when.
      </p>
    </header>

    <ul class="mt-12 space-y-4">
      <li v-for="guide in guides" :key="guide.path">
        <NuxtLink :to="guide.path" class="card card-hover group block p-6 no-underline">
          <div class="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
            <h2 class="display text-xl text-[var(--color-ink)]">{{ guide.title }}</h2>
            <span v-if="guide.lastReviewedAt" class="meta whitespace-nowrap pt-1">
              Reviewed {{ formatDate(guide.lastReviewedAt) }}
            </span>
          </div>
          <p v-if="guide.description" class="mt-2 text-[var(--color-muted)]">
            {{ guide.description }}
          </p>
          <div v-if="guide.countries?.length" class="mt-4 flex flex-wrap gap-1.5">
            <span v-for="c in guide.countries" :key="c" class="pill">{{ countryLabel(c) }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
