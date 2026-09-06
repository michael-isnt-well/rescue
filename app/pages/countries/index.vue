<script setup lang="ts">
const { data: countries } = await useAsyncData('countries-index', () =>
  queryCollection('countries')
    .order('distanceKm', 'ASC')
    .select('name', 'path', 'flag', 'distanceKm', 'transport', 'description', 'capital')
    .all(),
)

// Scale the distance bars relative to the farthest country.
const maxKm = computed(() =>
  Math.max(1, ...(countries.value || []).map((c) => c.distanceKm)),
)
function barWidth(km: number) {
  return `${Math.round((km / maxKm.value) * 100)}%`
}
function fmtKm(km: number) {
  return `~${km.toLocaleString('en-GB')} km`
}

usePageSeo({
  title: 'The five countries — Romania, Cyprus, Bulgaria, Greece & Spain',
  description:
    'How adopting a rescue dog differs by country of origin: distance from the UK, transport, health/disease considerations and the dogs themselves — with sources.',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Countries', path: '/countries' },
]
</script>

<template>
  <div>
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <header>
      <p class="eyebrow">Countries</p>
      <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">Where the dogs come from</h1>
      <p class="lede mt-4">
        Most UK adopters bring dogs from one of five countries. The paperwork to
        get here is much the same for all of them — the real differences are
        distance, the health risks to test for, and the dogs themselves.
      </p>
    </header>

    <Callout type="info" class="mt-6">
      Our own experience is Romania — that's the country we're adopting from and
      can speak to first-hand. The rest of this section is a researched resource
      built from cited sources, not personal experience. Health details are
      general and should be confirmed with a vet.
    </Callout>

    <CountryLocator class="mt-8" />

    <!-- Distance-from-the-UK visual -->
    <section class="mt-10" aria-label="Distance from the UK">
      <p class="eyebrow">How far from the UK</p>
      <ul class="mt-4 space-y-3">
        <li
          v-for="c in countries"
          :key="c.path"
          class="card card-hover p-5"
        >
          <NuxtLink :to="c.path" class="no-underline">
            <div class="flex items-baseline justify-between gap-4">
              <h2 class="display text-xl text-[var(--color-ink)]">
                <span class="mr-2 text-2xl" aria-hidden="true">{{ c.flag }}</span>{{ c.name }}
              </h2>
              <span class="meta whitespace-nowrap">{{ fmtKm(c.distanceKm) }}</span>
            </div>
            <div class="mt-3 h-3.5 w-full overflow-hidden rounded-full bg-[var(--color-subtle)] ring-1 ring-inset ring-[var(--color-line)]">
              <div
                class="h-full rounded-full bg-[var(--color-brand)]"
                :style="{ width: barWidth(c.distanceKm), minWidth: '10px' }"
              />
            </div>
            <p v-if="c.transport?.length" class="mt-2 text-xs text-[var(--color-muted)]">
              {{ c.transport.join(' · ') }}
            </p>
            <p v-if="c.description" class="mt-2 text-sm text-[var(--color-ink)]">
              {{ c.description }}
            </p>
            <span class="mt-3 inline-block text-sm font-semibold text-[var(--color-brand-dark)]">
              Read more →
            </span>
          </NuxtLink>
        </li>
      </ul>
      <p class="mt-4 text-xs text-[var(--color-faint)]">
        Bars show approximate straight-line distance from London to each capital,
        for comparison only — road/ferry routes are longer.
      </p>
    </section>
  </div>
</template>
