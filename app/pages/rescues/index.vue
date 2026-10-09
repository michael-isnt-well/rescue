<script setup lang="ts">
import type { DirectoryFilters, SortKey } from '~/utils/rescueDirectory'

const { data: rescues } = await useAsyncData('rescues-index', () =>
  queryCollection('rescues')
    .order('name', 'ASC')
    .select(
      'name',
      'path',
      'description',
      'countries',
      'regionsCovered',
      'adoptionFeeMin',
      'adoptionFeeMax',
      'homeCheckType',
      'feeIncludesTransport',
      'charityStatus',
      'rehomesToHomesWithCats',
      'rehomesToHomesWithChildren',
      'rehomesWithoutGarden',
      'lastVerifiedAt',
    )
    .all(),
)

usePageSeo({
  title: 'UK rescues rehoming dogs from overseas — a verified directory',
  description:
    'A directory of UK rescues rehoming dogs from Romania, Cyprus, Bulgaria, Greece and Spain. Filter by country, fee, transport and charity status — every profile checked against its sources.',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Rescues', path: '/rescues' },
]

const filters = reactive<DirectoryFilters>({ ...EMPTY_FILTERS })
const sort = ref<SortKey>('name')

const all = computed(() => rescues.value || [])
const countriesPresent = computed(() =>
  Object.keys(COUNTRY_META).filter((c) => all.value.some((r) => (r.countries || []).includes(c))),
)
const results = computed(() => filterAndSort(all.value, filters, sort.value))
const active = computed(() => activeFilterCount(filters))

const FEE_CAPS = [450, 550, 700, 1000]
const TOGGLES: { key: keyof DirectoryFilters; label: string; hint: string }[] = [
  { key: 'transportIncluded', label: 'Fee includes transport', hint: 'One all-in price' },
  { key: 'registeredCharity', label: 'Registered charity', hint: 'Checked on the charity register' },
  { key: 'haveCats', label: 'I have cats', hint: 'Hides rescues that say no' },
  { key: 'haveChildren', label: 'I have children', hint: 'Hides rescues that say no' },
  { key: 'noGarden', label: 'No garden', hint: 'Hides rescues that say no' },
]

function reset() {
  Object.assign(filters, EMPTY_FILTERS)
}
</script>

<template>
  <div>
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <header>
      <p class="eyebrow">Rescues</p>
      <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">Overseas rescues rehoming to the UK</h1>
      <p class="lede mt-4">
        A directory of UK rescues bringing dogs from abroad. Every profile is structured the same way,
        built from the rescue’s own published information, checked against the official charity
        register, and dated.
      </p>
    </header>

    <!-- Filters -->
    <section class="filters mt-10 rounded-[var(--radius-lg)] border border-[var(--color-line)] p-5" aria-label="Filter rescues">
      <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Country">
        <span class="mr-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Country</span>
        <button type="button" class="chip" :class="{ 'chip-on': !filters.country }" @click="filters.country = null">Any</button>
        <button
          v-for="c in countriesPresent"
          :key="c"
          type="button"
          class="chip"
          :class="{ 'chip-on': filters.country === c }"
          :aria-pressed="filters.country === c"
          @click="filters.country = filters.country === c ? null : c"
        >
          {{ COUNTRY_META[c as keyof typeof COUNTRY_META].flag }} {{ COUNTRY_META[c as keyof typeof COUNTRY_META].name }}
        </button>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Maximum fee">
        <span class="mr-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Fee from</span>
        <button type="button" class="chip" :class="{ 'chip-on': filters.maxFee == null }" @click="filters.maxFee = null">Any</button>
        <button
          v-for="cap in FEE_CAPS"
          :key="cap"
          type="button"
          class="chip"
          :class="{ 'chip-on': filters.maxFee === cap }"
          :aria-pressed="filters.maxFee === cap"
          @click="filters.maxFee = filters.maxFee === cap ? null : cap"
        >
          up to £{{ cap.toLocaleString('en-GB') }}
        </button>
      </div>

      <div class="mt-4 grid gap-2 sm:grid-cols-2">
        <label v-for="t in TOGGLES" :key="t.key" class="toggle flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2" :class="{ 'toggle-on': filters[t.key] }">
          <span>
            <span class="block text-sm font-medium">{{ t.label }}</span>
            <span class="block text-xs text-[var(--color-muted)]">{{ t.hint }}</span>
          </span>
          <input v-model="(filters[t.key] as boolean)" type="checkbox" class="h-4 w-4 accent-[var(--color-brand)]" />
        </label>
      </div>

      <div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-line)] pt-4 text-sm">
        <p aria-live="polite">
          <strong>{{ results.length }}</strong> of {{ all.length }} rescue{{ all.length === 1 ? '' : 's' }}
          <button v-if="active" type="button" class="ml-2 text-[var(--color-muted)] underline" @click="reset">Clear filters</button>
        </p>
        <label class="flex items-center gap-2 text-[var(--color-muted)]">
          Sort
          <select v-model="sort" class="sort rounded-md border px-2 py-1 text-[var(--color-ink)]">
            <option value="name">A–Z</option>
            <option value="fee">Lowest fee</option>
            <option value="verified">Recently verified</option>
          </select>
        </label>
      </div>
    </section>

    <div v-if="results.length" class="mt-8 grid gap-5 sm:grid-cols-2">
      <RescueCard v-for="rescue in results" :key="rescue.path" :rescue="rescue" />
    </div>
    <p v-else class="mt-8 rounded-lg bg-[var(--color-subtle)] px-4 py-3 text-sm text-[var(--color-muted)]">
      No rescues match those filters yet. Try removing one, or
      <button type="button" class="underline" @click="reset">clear them all</button>.
    </p>

    <div class="prose mt-12">
      <h2>How this directory works</h2>
      <p>
        Only rescues that bring dogs into the UK from overseas are listed. Each profile is built from the
        rescue’s own website and documents, and charity status is checked against the Charity
        Commission’s register for England and Wales. Anything a rescue doesn’t publish is shown as
        “Not stated” rather than guessed.
      </p>
      <p>
        Listing is free and isn’t an endorsement. Nobody pays to appear here or to be ranked higher.
        If you run a rescue and something is wrong or out of date,
        <NuxtLink to="/takedown">let us know</NuxtLink>.
      </p>
      <p>
        Not sure what a rescue’s fee really covers? The
        <NuxtLink to="/tools/adoption-cost-calculator">adoption cost calculator</NuxtLink> breaks it down,
        alongside everything else in the first year.
      </p>
    </div>
  </div>
</template>

<style scoped>
.filters {
  background: var(--color-paper);
}
.chip {
  border: 1px solid var(--color-line);
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  background: var(--color-paper);
  color: var(--color-ink);
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.chip-on {
  border-color: var(--color-brand);
  background: var(--color-brand-soft);
}
.toggle {
  border-color: var(--color-line);
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
.toggle-on {
  border-color: var(--color-brand);
  background: var(--color-brand-soft);
}
.sort {
  border-color: var(--color-line);
  background: var(--color-paper);
}
@media (prefers-reduced-motion: reduce) {
  .chip,
  .toggle {
    transition: none;
  }
}
</style>
