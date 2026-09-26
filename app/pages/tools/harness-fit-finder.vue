<script setup lang="ts">
const route = useRoute()

usePageSeo({
  title: 'Bolt-Risk Harness Finder — the safest setup for a rescue dog',
  description:
    'A free tool that recommends an escape-resistant harness setup for your rescue dog, based on flight risk, build and where you walk. Safety-led, redundancy-first.',
})

const faqs = [
  {
    question: 'Is any dog harness truly escape-proof?',
    answer:
      'No. A panicked or determined dog can escape almost any single harness. The reliable approach is redundancy: a snug escape-resistant harness plus a martingale collar plus a double-ended lead clipped to both, so no single failure lets your dog loose.',
  },
  {
    question: 'What is the safest setup for a bolt-risk rescue dog?',
    answer:
      'The "triple-contact" setup: an escape-resistant Y-front harness, a martingale collar, and a double-ended lead clipped to both points at once. Add a GPS tracker and an ID tag. That way a slipped or failed harness is caught by the collar.',
  },
  {
    question: 'My rescue dog is deep-chested — why does that matter?',
    answer:
      'Deep-chested dogs with a narrow waist (sighthounds, lurchers and many Romanian rescues) can reverse straight out of a collar or a loose harness. They need a snug Y-front harness with an extra waist strap plus a backup point of contact.',
  },
  {
    question: 'How should an escape-resistant harness fit?',
    answer:
      'Snug — two fingers under any strap, no more, with no gap a dog can twist out of. Measure girth and neck and match the specific product\'s size chart, since sizing varies a lot by brand. A loose harness is the single most common way dogs slip out.',
  },
]

const schema = computed(() => [
  buildArticle({
    headline: 'Bolt-Risk Harness Finder',
    description:
      'How to choose an escape-resistant harness setup for a rescue dog, based on flight risk, build and walking environment.',
    path: route.path,
  }),
])

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'Harness Finder', path: '/tools/harness-fit-finder' },
]
</script>

<template>
  <div>
    <Breadcrumbs :items="crumbs" class="mb-8" />

    <header>
      <p class="eyebrow">Free tool · Beta</p>
      <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">Bolt-Risk Harness Finder</h1>
      <p class="lede mt-4">
        Answer four questions about your dog and get a safety-led gear setup —
        built for the one fear every overseas-rescue adopter shares: your dog
        slipping its harness and bolting.
      </p>
    </header>

    <div class="prose mt-6">
      <p>
        Let's be honest about the phrase <strong>"escape-proof harness"</strong>:
        there's no such thing. A frightened dog in full flight can twist, back
        out of, or snap its way free of almost any single piece of gear. Search
        results are full of products promising otherwise — and every year dogs
        still escape them.
      </p>
      <p>
        The setups that actually hold aren't about one clever product. They're
        about <strong>redundancy</strong>: layering independent points of
        contact so that if one fails, another catches your dog. This tool works
        out how much redundancy your dog needs — from a single well-fitted
        harness for a settled dog, up to the "triple-contact" setup (harness +
        martingale collar + double-ended lead) for a genuine flight risk.
      </p>
      <p>
        If your dog is newly arrived, the tool starts at "high security" whatever else you answer.
        Some rescues, including
        <a href="https://www.pawprints2freedom.co.uk/info-packs" target="_blank" rel="noopener">Pawprints to Freedom</a>,
        require a harness with a waist strap and double-leading for every dog they rehome. Your rescue’s
        rules always come first.
      </p>
      <p>
        It pairs with the advice in
        <NuxtLink to="/guides/transport-day">transport day</NuxtLink> and the
        <NuxtLink to="/guides/decompression-first-three-weeks">first three weeks</NuxtLink>,
        where escape risk is at its highest.
      </p>
    </div>

    <!-- The tool -->
    <section class="mt-10 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-7">
      <HarnessFinder />
    </section>

    <Faq :items="faqs" heading="Escape-proof harnesses: the honest answers" />

    <p class="mt-10 text-xs text-[var(--color-faint)]">
      How we choose: recommendations are led by safety and fit, never by
      commission. This tool is in beta and does not yet link to any products;
      when it does, those links will be clearly marked and it won't change the
      advice.
    </p>

    <JsonLd :schema="schema" />
  </div>
</template>
