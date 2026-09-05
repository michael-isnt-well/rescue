<script setup lang="ts">
/**
 * Trust signal shown on rescue profiles (and anywhere freshness matters):
 * "Verified 12 August 2026". Uses a <time> element for machine-readability.
 */
const props = defineProps<{
  date: string
  label?: string
}>()

const formatted = computed(() => formatDate(props.date))
</script>

<template>
  <p
    v-if="formatted"
    class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--color-subtle)] px-3 py-1 text-sm text-[var(--color-muted)]"
  >
    <svg
      class="h-3.5 w-3.5 text-[var(--color-brand)]"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clip-rule="evenodd"
      />
    </svg>
    <span>{{ label || 'Verified' }} <time :datetime="date">{{ formatted }}</time></span>
  </p>
</template>
