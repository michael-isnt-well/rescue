<script setup lang="ts">
const { data: entries } = await useAsyncData('journal-index', () =>
  queryCollection('journal')
    .order('publishedAt', 'DESC')
    .select('title', 'path', 'description', 'publishedAt', 'weekNumber')
    .all(),
)

usePageSeo({
  title: 'The journal — adopting Barnie from Romania',
  description:
    'A first-person, dated account of adopting Barnie, a 16-month-old rescue dog from Romania — published honestly, as it happens.',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Journal', path: '/journal' },
]
</script>

<template>
  <div>
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <header>
      <p class="eyebrow">Journal</p>
      <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">Barnie, week by week</h1>
      <p class="lede mt-4">
        Adopting a 16-month-old boy from Romania — written as it happens, the
        good days and the hard ones.
      </p>
    </header>

    <ol class="mt-12 space-y-3">
      <li v-for="entry in entries" :key="entry.path">
        <NuxtLink
          :to="entry.path"
          class="group flex flex-col gap-3 rounded-[var(--radius-lg)] px-5 py-5 no-underline transition-colors hover:bg-[var(--color-subtle)] sm:flex-row sm:items-baseline sm:gap-6"
        >
          <span
            v-if="entry.weekNumber != null"
            class="shrink-0 font-display text-2xl font-semibold text-[var(--color-faint)] sm:w-24"
            style="font-family: var(--font-display)"
          >
            Week {{ entry.weekNumber }}
          </span>
          <div>
            <h2 class="display text-xl text-[var(--color-ink)] group-hover:text-[var(--color-brand-dark)]">
              {{ entry.title }}
            </h2>
            <p class="meta mt-1">{{ formatDate(entry.publishedAt) }}</p>
            <p v-if="entry.description" class="mt-2 text-[var(--color-muted)]">
              {{ entry.description }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>
