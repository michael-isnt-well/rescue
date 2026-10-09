<script setup lang="ts">
/**
 * Good-faith notice for rescue profiles. Rendered automatically by the profile
 * template (pages/rescues/[...slug].vue), so every profile — including ones
 * drafted by the weekly routine — carries it without the author remembering.
 */
defineProps<{ name: string; verifiedAt?: string | null }>()
</script>

<template>
  <aside
    class="rounded-lg border border-[var(--color-line)] bg-[var(--color-subtle)] px-4 py-3 text-sm text-[var(--color-muted)]"
    role="note"
    aria-label="About this profile"
  >
    <p>
      <strong class="font-semibold text-[var(--color-ink)]">Compiled in good faith, to the best of our knowledge.</strong>
      This profile summarises what {{ name }} publishes about itself, and what official registers
      show<template v-if="verifiedAt">, as checked on {{ formatDate(verifiedAt) }}</template>. It may be
      incomplete or out of date, and it isn't an endorsement or a recommendation. Always confirm fees,
      policies and anything else that matters to you directly with the rescue before you apply.
      Spotted something wrong? <NuxtLink to="/takedown" class="underline">Let us know</NuxtLink>.
    </p>
  </aside>
</template>
