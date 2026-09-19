<script setup lang="ts">
usePageSeo({
  title: 'Tools for overseas rescue adopters',
  description:
    'Free, practical tools for adopting a rescue dog from overseas — starting with the Bolt-Risk Harness Finder for building an escape-resistant setup.',
})

const tools = [
  {
    title: 'Bolt-Risk Harness Finder',
    to: '/tools/harness-fit-finder',
    tag: 'Beta',
    body: "Answer three questions about your dog and get a safety-led gear setup — from a single well-fitted harness to the full triple-contact rig for a genuine flight risk.",
  },
]

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
]
</script>

<template>
  <div>
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <header>
      <p class="eyebrow">Tools</p>
      <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">Practical tools</h1>
      <p class="lede mt-4">
        Free, no-sign-up tools to take some of the guesswork out of adopting a
        rescue dog from overseas.
      </p>
    </header>

    <ul class="mt-10 space-y-4">
      <li v-for="tool in tools" :key="tool.to">
        <NuxtLink :to="tool.to" class="card card-hover group block p-6 no-underline">
          <div class="flex flex-wrap items-center gap-3">
            <h2 class="display text-xl text-[var(--color-ink)]">{{ tool.title }}</h2>
            <span v-if="tool.tag" class="pill">{{ tool.tag }}</span>
          </div>
          <p class="mt-2 text-[var(--color-muted)]">{{ tool.body }}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-dark)]">
            Open the tool
            <span class="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </NuxtLink>
      </li>
    </ul>

    <p class="mt-8 text-sm text-[var(--color-muted)]">More tools are on the way as the site grows.</p>
  </div>
</template>
