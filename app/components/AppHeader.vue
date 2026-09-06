<script setup lang="ts">
const nav = [
  { label: 'Guides', to: '/guides' },
  { label: 'Countries', to: '/countries' },
  { label: 'Rescues', to: '/rescues' },
  { label: 'Journal', to: '/journal' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper)_88%,transparent)] backdrop-blur"
  >
    <div class="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3.5">
      <NuxtLink to="/" class="flex items-center gap-2 no-underline" aria-label="Home">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-[var(--color-brand)] text-white">
          <svg class="h-4 w-4" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <ellipse cx="10" cy="12" rx="2.3" ry="3" />
            <ellipse cx="22" cy="12" rx="2.3" ry="3" />
            <ellipse cx="6.5" cy="17" rx="2" ry="2.6" />
            <ellipse cx="25.5" cy="17" rx="2" ry="2.6" />
            <path d="M16 16.5c-3.4 0-6.2 2.6-6.2 5.4 0 2 1.7 3.1 3.7 2.6 1.6-.4 3.4-.4 5 0 2 .5 3.7-.6 3.7-2.6 0-2.8-2.8-5.4-6.2-5.4z" />
          </svg>
        </span>
        <span class="font-display text-[1.05rem] font-semibold tracking-tight text-[var(--color-ink)]">
          Rescue Journey
        </span>
      </NuxtLink>
      <nav aria-label="Primary">
        <ul class="flex items-center gap-1 text-sm sm:gap-2">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="rounded-lg px-2.5 py-1.5 text-[var(--color-muted)] no-underline transition-colors hover:bg-[var(--color-subtle)] hover:text-[var(--color-ink)]"
              active-class="!text-[var(--color-ink)] font-semibold"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.font-display {
  font-family: var(--font-display);
}
</style>
