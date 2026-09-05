<script setup lang="ts">
/**
 * Renders a Q&A list AND emits FAQPage JSON-LD from the SAME data, so the
 * visible content and the structured data can never drift apart. Answers are
 * plain text (kept in frontmatter), which keeps the schema valid.
 */
const props = defineProps<{
  items: { question: string; answer: string }[]
  heading?: string
}>()

const schema = computed(() => buildFaqPage(props.items))
</script>

<template>
  <section v-if="items.length" aria-labelledby="faq-heading" class="mt-12">
    <p class="eyebrow">FAQ</p>
    <h2 id="faq-heading" class="display mt-2 text-2xl">
      {{ heading || 'Common questions' }}
    </h2>
    <dl class="mt-6 divide-y divide-[var(--color-line)]">
      <div v-for="item in items" :key="item.question" class="py-4">
        <dt class="font-semibold text-[var(--color-ink)]">{{ item.question }}</dt>
        <dd class="mt-2 text-[var(--color-ink)]">{{ item.answer }}</dd>
      </div>
    </dl>
    <JsonLd :schema="schema" />
  </section>
</template>
