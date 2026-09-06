<script setup lang="ts">
const { data: latestJournal } = await useAsyncData('home-journal', () =>
  queryCollection('journal')
    .order('publishedAt', 'DESC')
    .select('title', 'path', 'weekNumber', 'publishedAt')
    .first(),
)

usePageSeo({
  title: 'Adopting a rescue dog from overseas — a UK guide',
  description:
    'Honest, practical help for UK adopters bringing rescue dogs home from Romania, Cyprus, Bulgaria, Greece and Spain. Guides, verified rescue profiles, and a first-person journal.',
})

// Homepage carries the site-level breadcrumb root only implicitly; we add an
// Organization + WebSite graph here so search engines have a site identity.
const site = useSiteConfig()
const schema = computed(() => [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
  },
])

const sections = [
  {
    title: 'Guides',
    to: '/guides',
    body: 'The rabies titre timeline and 21-day rule, transport day, decompression, and insurance for imported dogs. Reviewed and dated.',
  },
  {
    title: 'Rescues',
    to: '/rescues',
    body: 'Factual, structured profiles of UK rescues rehoming from overseas — fees, home checks and policies, each with a verified date.',
  },
  {
    title: 'Journal',
    to: '/journal',
    body: 'A dated, first-person account of adopting Barnie from Romania. The good days and the hard ones, published as they happen.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="pt-2">
      <p class="eyebrow">A UK adopter's field notes</p>
      <h1 class="display mt-3 text-[2.4rem] sm:text-[3.1rem]">
        Bringing a rescue dog home from overseas
      </h1>
      <p class="lede mt-6">
        We're going through the process — adopting Barnie, a 16-month-old boy from
        Romania — and I built this site to be the resource I wished existed:
        clear, honest, and specific to the UK process.
      </p>
      <p class="mt-5 text-[var(--color-ink)]">
        Everything here covers dogs coming from Romania, Cyprus, Bulgaria,
        Greece and Spain: the rabies titre and 21-day rule, transport day, the
        first three weeks of decompression, and insurance that understands
        imported dogs. Rescue profiles are checked and dated, so you can trust
        what you read. It's independent and in terms of adopting from Romania, documents our direct experience.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <NuxtLink to="/guides" class="btn btn-primary">Start with the guides</NuxtLink>
        <NuxtLink to="/journal" class="btn btn-ghost">Read Barnie's journal</NuxtLink>
      </div>
    </section>

    <hr class="rule my-14" />

    <!-- Sections -->
    <div class="grid gap-5 sm:grid-cols-3">
      <NuxtLink
        v-for="(section, i) in sections"
        :key="section.to"
        :to="section.to"
        class="card card-hover group block p-6 no-underline"
      >
        <span class="eyebrow">0{{ i + 1 }}</span>
        <h2 class="display mt-2 text-xl text-[var(--color-ink)]">{{ section.title }}</h2>
        <p class="mt-2 text-sm text-[var(--color-muted)]">{{ section.body }}</p>
        <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-dark)]">
          Explore
          <span class="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </NuxtLink>
    </div>

    <!-- Latest journal -->
    <section
      v-if="latestJournal"
      class="mt-14 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-brand-soft)] p-7 sm:p-8"
    >
      <p class="eyebrow">Latest from the journal</p>
      <h2 class="display mt-2 text-2xl">
        <NuxtLink :to="latestJournal.path" class="no-underline hover:underline">
          {{ latestJournal.title }}
        </NuxtLink>
      </h2>
      <p class="meta mt-2">
        <span v-if="latestJournal.weekNumber != null">Week {{ latestJournal.weekNumber }} · </span>
        {{ formatDate(latestJournal.publishedAt) }}
      </p>
      <NuxtLink
        :to="latestJournal.path"
        class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-dark)]"
      >
        Read the entry →
      </NuxtLink>
    </section>

    <JsonLd :schema="schema" />
  </div>
</template>
