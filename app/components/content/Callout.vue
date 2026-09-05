<script setup lang="ts">
/**
 * Inline note for guides. Usable in markdown via MDC:
 *   ::callout{type="warning"}
 *   Body text here.
 *   ::
 */
const props = withDefaults(
  defineProps<{ type?: 'info' | 'warning' }>(),
  { type: 'info' },
)

const isWarning = computed(() => props.type === 'warning')
</script>

<template>
  <aside
    class="my-6 rounded-lg border-l-4 px-4 py-3"
    :class="
      isWarning
        ? 'border-[var(--color-warn)] bg-[var(--color-warn-bg)]'
        : 'border-[var(--color-info)] bg-[var(--color-info-bg)]'
    "
    :role="isWarning ? 'alert' : 'note'"
  >
    <p
      class="mb-1 text-xs font-semibold uppercase tracking-wide"
      :class="isWarning ? 'text-[var(--color-warn)]' : 'text-[var(--color-info)]'"
    >
      {{ isWarning ? 'Important' : 'Note' }}
    </p>
    <div class="text-[0.95rem] leading-relaxed text-[var(--color-ink)] [&>*+*]:mt-2">
      <slot />
    </div>
  </aside>
</template>
