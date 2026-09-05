<script setup lang="ts">
/**
 * Reusable affiliate-disclosure block. Placed on any page carrying affiliate
 * links (e.g. insurance guides). Honest, plain, and always visible near the
 * relevant content — not buried.
 */
withDefaults(
  defineProps<{ compact?: boolean }>(),
  { compact: false },
)
</script>

<template>
  <aside
    class="rounded-lg border border-[var(--color-line)] bg-[var(--color-subtle)] text-[var(--color-muted)]"
    :class="compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'"
    aria-label="Affiliate disclosure"
  >
    <p>
      <strong class="font-semibold text-[var(--color-ink)]">Affiliate disclosure.</strong>
      Some links on this page are affiliate links. If you buy a policy through
      one, I may earn a small commission at no extra cost to you. It never
      affects which insurers I recommend or what I write.
      <NuxtLink to="/affiliate-disclosure" class="underline">Full disclosure</NuxtLink>.
    </p>
  </aside>
</template>
