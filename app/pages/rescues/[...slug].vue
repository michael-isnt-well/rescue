<script setup lang="ts">
const route = useRoute()

const { data: doc } = await useAsyncData(`rescue-${route.path}`, () =>
  queryCollection('rescues').path(route.path).first(),
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Rescue not found', fatal: true })
}

const r = computed(() => doc.value!)

// Internal linking: guides that mention any of this rescue's countries.
const { data: relatedGuides } = await useAsyncData(
  `rescue-guides-${route.path}`,
  async () => {
    const countries = doc.value?.countries || []
    if (!countries.length) return []
    const all = await queryCollection('guides')
      .select('title', 'path', 'countries')
      .all()
    return all
      .filter((g) => (g.countries || []).some((c) => countries.includes(c)))
      .slice(0, 6)
  },
)

usePageSeo({
  title: `${r.value.name} — rescue profile`,
  description:
    r.value.description ||
    `Profile of ${r.value.name}, a UK rescue rehoming dogs from overseas.`,
})

const schema = computed(() =>
  buildRescueOrg({
    name: r.value.name,
    path: route.path,
    description: r.value.description,
    websiteUrl: r.value.websiteUrl,
    charityNumber: r.value.charityNumber,
    sameAs: [r.value.websiteUrl, r.value.facebookUrl, r.value.charityRegisterUrl],
  }),
)

const crumbs = computed(() => [
  { name: 'Home', path: '/' },
  { name: 'Rescues', path: '/rescues' },
  { name: r.value.name, path: route.path },
])

const fee = computed(() => {
  const { adoptionFeeMin: min, adoptionFeeMax: max } = r.value
  if (min == null && max == null) return null
  if (min != null && max != null && min !== max) return `£${min}–£${max}`
  return `£${min ?? max}`
})

// Fee with an optional qualifier (e.g. "approx., varies by dog and location").
const feeDisplay = computed(() => {
  if (!fee.value) return null
  return r.value.adoptionFeeNote ? `${fee.value} — ${r.value.adoptionFeeNote}` : fee.value
})

// The structured, verifiable facts block. Nulls are rendered as "Not stated".
const facts = computed(() => [
  { label: 'Rehomes from', value: (r.value.countries || []).map(countryLabel).join(', ') || null },
  { label: 'UK regions covered', value: (r.value.regionsCovered || []).join(', ') || null },
  { label: 'Adoption fee', value: feeDisplay.value },
  { label: 'Transport frequency', value: r.value.transportFrequency },
  { label: 'Home check', value: r.value.homeCheckType },
  { label: 'Rehomes to homes with cats', value: policyLabel(r.value.rehomesToHomesWithCats) },
  { label: 'Rehomes to homes with children', value: policyLabel(r.value.rehomesToHomesWithChildren) },
  { label: 'Rehomes without a garden', value: policyLabel(r.value.rehomesWithoutGarden) },
  { label: 'Post-adoption support', value: r.value.postAdoptionSupport },
  { label: 'Charity number', value: r.value.charityNumber },
])

const externalLinks = computed(() =>
  [
    { label: 'Website', url: r.value.websiteUrl },
    { label: 'Apply to adopt', url: r.value.applicationUrl },
    { label: 'Facebook', url: r.value.facebookUrl },
    { label: 'Charity register entry', url: r.value.charityRegisterUrl },
  ].filter((l) => l.url),
)
</script>

<template>
  <article v-if="doc">
    <Breadcrumbs :items="crumbs" class="mb-8" />

    <header>
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="eyebrow">Rescue profile</p>
          <h1 class="display mt-3 text-[2.1rem] sm:text-[2.7rem]">{{ r.name }}</h1>
        </div>
        <LastVerified :date="r.lastVerifiedAt" class="mt-2 shrink-0" />
      </div>
      <p v-if="r.description" class="lede mt-4">{{ r.description }}</p>
    </header>

    <!-- Structured facts -->
    <section class="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)]" aria-label="Key facts">
      <p class="border-b border-[var(--color-line)] bg-[var(--color-subtle)] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        Key facts
      </p>
      <dl class="divide-y divide-[var(--color-line)]">
        <div
          v-for="fact in facts"
          :key="fact.label"
          class="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-4"
        >
          <dt class="text-sm font-medium text-[var(--color-muted)]">{{ fact.label }}</dt>
          <dd class="text-sm sm:col-span-2" :class="fact.value ? 'font-medium' : 'text-[var(--color-faint)]'">
            {{ fact.value || 'Not stated' }}
          </dd>
        </div>
      </dl>
    </section>

    <div v-if="externalLinks.length" class="mt-6 flex flex-wrap gap-3">
      <a
        v-for="link in externalLinks"
        :key="link.label"
        :href="link.url!"
        rel="noopener nofollow"
        target="_blank"
        class="btn btn-ghost"
      >
        {{ link.label }} ↗
      </a>
    </div>

    <div class="prose mt-10">
      <ContentRenderer :value="doc" />
    </div>

    <section
      v-if="relatedGuides?.length"
      class="mt-12 border-t border-[var(--color-line)] pt-8"
    >
      <p class="eyebrow">Before you apply</p>
      <h2 class="display mt-2 text-xl">Guides for these countries</h2>
      <ul class="mt-4 space-y-2.5">
        <li v-for="guide in relatedGuides" :key="guide.path">
          <NuxtLink :to="guide.path" class="font-semibold text-[var(--color-brand-dark)]">
            {{ guide.title }} →
          </NuxtLink>
        </li>
      </ul>
    </section>

    <p class="mt-10 text-xs text-[var(--color-muted)]">
      Details verified {{ formatDate(r.lastVerifiedAt) }}. Policies change —
      always confirm with the rescue directly. Something out of date?
      <NuxtLink to="/takedown" class="underline">Let me know</NuxtLink>.
    </p>

    <JsonLd :schema="schema" />
  </article>
</template>
