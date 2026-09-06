<script setup lang="ts">
const year = new Date().getFullYear()

const cols = [
  {
    heading: 'Sections',
    links: [
      { label: 'Guides', to: '/guides' },
      { label: 'Countries', to: '/countries' },
      { label: 'Rescues', to: '/rescues' },
      { label: 'Journal', to: '/journal' },
    ],
  },
  {
    heading: 'This site',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Privacy policy', to: '/privacy' },
      { label: 'How this site is funded', to: '/affiliate-disclosure' },
      { label: 'Corrections & takedowns', to: '/takedown' },
    ],
  },
]
</script>

<template>
  <footer class="mt-24 border-t border-[var(--color-line)] bg-[var(--color-subtle)]">
    <div class="mx-auto max-w-3xl px-4 py-12">
      <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
        <div class="col-span-2 sm:col-span-1">
          <p class="font-display text-lg font-semibold" style="font-family: var(--font-display)">
            Rescue Journey
          </p>
          <p class="mt-2 text-sm text-[var(--color-muted)]">
            Honest, practical help for UK adopters bringing rescue dogs home
            from overseas.
          </p>
        </div>
        <div v-for="col in cols" :key="col.heading">
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            {{ col.heading }}
          </p>
          <ul class="mt-3 space-y-2 text-sm">
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink :to="link.to" class="text-[var(--color-ink)] no-underline hover:underline">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <p class="mt-10 text-xs text-[var(--color-muted)]">
        © {{ year }} Rescue Journey. This site offers general information, not
        veterinary or legal advice.
      </p>
    </div>
  </footer>
</template>
