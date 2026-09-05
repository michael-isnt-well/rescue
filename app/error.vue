<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)

useHead({ title: is404.value ? 'Page not found' : 'Something went wrong' })
</script>

<template>
  <NuxtLayout>
    <div class="py-12 text-center">
      <p class="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-dark)]">
        {{ error.statusCode }}
      </p>
      <h1 class="display mt-2 text-[2.2rem] sm:text-[2.8rem]">
        {{ is404 ? 'That page isn’t here' : 'Something went wrong' }}
      </h1>
      <p class="mx-auto mt-4 max-w-md text-[var(--color-muted)]">
        <template v-if="is404">
          The page may have moved. Try one of the sections below — everything on
          the site is a click or two from here.
        </template>
        <template v-else>
          An unexpected error occurred. Please try again in a moment.
        </template>
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <NuxtLink
          v-for="link in [
            { label: 'Home', to: '/' },
            { label: 'Guides', to: '/guides' },
            { label: 'Rescues', to: '/rescues' },
            { label: 'Journal', to: '/journal' },
          ]"
          :key="link.to"
          :to="link.to"
          class="rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-medium no-underline hover:bg-[var(--color-subtle)]"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
