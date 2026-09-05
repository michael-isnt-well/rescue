<script setup lang="ts">
/**
 * The single JSON-LD injector for the whole site. Pass a schema object (or an
 * array of them) built by the helpers in composables/useSchema.ts. Renders
 * nothing visible — it appends <script type="application/ld+json"> to <head>,
 * so it is prerendered into the static HTML.
 */
const props = defineProps<{
  schema: Record<string, unknown> | Record<string, unknown>[]
}>()

const scripts = computed(() => {
  const items = Array.isArray(props.schema) ? props.schema : [props.schema]
  return items
    .filter(Boolean)
    .map((s) => ({
      type: 'application/ld+json' as const,
      // Escape "<" so a stray value can never break out of the script element.
      innerHTML: JSON.stringify(s).replace(/</g, '\\u003c'),
    }))
})

useHead({ script: scripts })
</script>

<template>
  <!-- JSON-LD is injected into <head>; nothing rendered here. -->
</template>
