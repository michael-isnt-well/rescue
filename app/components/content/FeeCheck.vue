<script setup lang="ts">
/**
 * Small tag shown next to every rescue fee: where the number comes from, when
 * it was checked, and a nudge to confirm with the rescue. When the rescue's own
 * pages give different prices (`differs`), it says so instead of picking one.
 * A native <details> element, so it opens without JavaScript and is keyboard
 * accessible.
 */
const props = defineProps<{
  checked?: string | null
  differs?: boolean
}>()

const when = computed(() => (props.checked ? formatDate(props.checked) : null))
</script>

<template>
  <details class="fee-check" :class="{ 'fee-check-differs': differs }">
    <summary class="fee-check-tag">
      <svg class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          v-if="differs"
          fill-rule="evenodd"
          d="M8.3 3.2a2 2 0 0 1 3.4 0l6 10.4A2 2 0 0 1 16 16.6H4a2 2 0 0 1-1.7-3l6-10.4ZM10 7a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          clip-rule="evenodd"
        />
        <path
          v-else
          fill-rule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm1-11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 2a1 1 0 0 1 2 0v4a1 1 0 1 1-2 0V9Z"
          clip-rule="evenodd"
        />
      </svg>
      <span>{{ differs ? 'Pages differ' : 'As published' }}</span>
    </summary>
    <p class="fee-check-body">
      <template v-if="differs">
        The rescue's own web pages give different prices, so we show what each one says rather than
        picking one<template v-if="when"> (checked {{ when }})</template>. Ask the rescue which price
        applies to you before you pay anything.
      </template>
      <template v-else>
        Taken from the rescue's own website<template v-if="when">, checked {{ when }}</template>.
        Rescues change their fees, so confirm the current price with them before you pay anything.
      </template>
    </p>
  </details>
</template>

<style scoped>
.fee-check {
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
}
.fee-check-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  list-style: none;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-info) 25%, transparent);
  background: var(--color-info-bg);
  color: var(--color-info);
  padding: 0.1rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.4;
  white-space: nowrap;
  user-select: none;
}
.fee-check-tag::-webkit-details-marker {
  display: none;
}
.fee-check-tag:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
.fee-check-differs .fee-check-tag {
  border-color: color-mix(in srgb, var(--color-warn) 30%, transparent);
  background: var(--color-warn-bg);
  color: var(--color-warn);
}
.fee-check-body {
  margin-top: 0.4rem;
  max-width: 34ch;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.45;
  color: var(--color-muted);
  white-space: normal;
}
</style>
