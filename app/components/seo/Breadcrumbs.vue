<script setup lang="ts">
/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD from one source.
 * Always include the home crumb first; the last item is the current page.
 */
const props = defineProps<{
  items: { name: string; path: string }[]
}>()

const schema = computed(() => buildBreadcrumbs(props.items))
</script>

<template>
  <nav aria-label="Breadcrumb" class="text-sm text-[var(--color-muted)]">
    <ol class="flex flex-wrap items-center gap-1.5">
      <li
        v-for="(item, i) in items"
        :key="item.path"
        class="flex items-center gap-1.5"
      >
        <NuxtLink
          v-if="i < items.length - 1"
          :to="item.path"
          class="hover:text-[var(--color-ink)]"
        >
          {{ item.name }}
        </NuxtLink>
        <span v-else aria-current="page" class="text-[var(--color-ink)]">
          {{ item.name }}
        </span>
        <span v-if="i < items.length - 1" aria-hidden="true">/</span>
      </li>
    </ol>
    <JsonLd :schema="schema" />
  </nav>
</template>
