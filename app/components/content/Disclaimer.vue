<script setup lang="ts">
/**
 * Baseline "general information, not professional advice" disclaimer. Rendered
 * automatically at the foot of every guide (see pages/guides/[...slug].vue), so
 * every guide — current and future — carries it without the author having to
 * remember. Contextual callouts inside a guide are still encouraged on top.
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
    role="note"
    aria-label="Disclaimer"
  >
    <p>
      <strong class="font-semibold text-[var(--color-ink)]">General information, not professional advice.</strong>
      This guide is written from personal experience to help you prepare. It
      isn't veterinary, legal or financial advice, and the rules around
      importing dogs can change. Always confirm current requirements with
      official sources such as
      <a href="https://www.gov.uk/bring-your-pet-to-great-britain" rel="noopener" target="_blank">GOV.UK</a>,
      and check anything about your dog's health or your finances with your vet
      or a qualified adviser.
    </p>
  </aside>
</template>
