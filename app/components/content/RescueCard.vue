<script setup lang="ts">
/**
 * Summary card for a rescue, used on listing pages. Frontmatter-driven and
 * generic — it reads only fields present on the rescue collection, so it works
 * unchanged for any site built from this starter.
 */
const props = defineProps<{
  rescue: {
    path: string
    name: string
    description?: string
    countries?: string[]
    regionsCovered?: string[]
    adoptionFeeMin?: number | null
    adoptionFeeMax?: number | null
    homeCheckType?: string | null
    lastVerifiedAt?: string
  }
}>()

const fee = computed(() => {
  const { adoptionFeeMin: min, adoptionFeeMax: max } = props.rescue
  if (min == null && max == null) return null
  if (min != null && max != null && min !== max) return `£${min}–£${max}`
  return `£${min ?? max}`
})

const countries = computed(() =>
  (props.rescue.countries || []).map(countryLabel).join(', '),
)
</script>

<template>
  <article class="card card-hover flex h-full flex-col p-6">
    <h3 class="display text-lg leading-snug">
      <NuxtLink :to="rescue.path" class="no-underline hover:text-[var(--color-brand-dark)]">
        {{ rescue.name }}
      </NuxtLink>
    </h3>

    <p v-if="countries" class="mt-1 text-sm text-[var(--color-muted)]">
      Rehomes from {{ countries }}
    </p>

    <p v-if="rescue.description" class="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">
      {{ rescue.description }}
    </p>

    <dl class="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
      <div v-if="fee">
        <dt class="text-xs uppercase tracking-wide text-[var(--color-faint)]">Adoption fee</dt>
        <dd class="mt-0.5 font-semibold">{{ fee }} (approx / varies)</dd>
      </div>
      <div v-if="rescue.homeCheckType">
        <dt class="text-xs uppercase tracking-wide text-[var(--color-faint)]">Home check</dt>
        <dd class="mt-0.5 font-semibold capitalize">{{ rescue.homeCheckType }}</dd>
      </div>
    </dl>

    <div class="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-[var(--color-line)] pt-4">
      <LastVerified v-if="rescue.lastVerifiedAt" :date="rescue.lastVerifiedAt" />
      <NuxtLink
        :to="rescue.path"
        class="whitespace-nowrap text-sm font-semibold text-[var(--color-brand-dark)] hover:underline"
      >
        View profile →
      </NuxtLink>
    </div>
  </article>
</template>
