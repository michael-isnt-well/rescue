<script setup lang="ts">
const route = useRoute()

usePageSeo({
  title: 'Cost of adopting a dog from abroad — UK calculator',
  description:
    'Work out what adopting a rescue dog from Romania, Cyprus, Bulgaria, Greece or Spain really costs: published rescue fees, the first vet visit, tests, kit and monthly running costs. Every figure sourced.',
})

const range = feeRange()
const romania = feeRange(feesFor('romania'))
const bTotal = breakdownTotal()

const faqs = [
  {
    question: 'How much does it cost to adopt a dog from abroad?',
    answer: `The published fees we checked from ${RESCUE_FEES.length} rescue fee listings range from ${gbp(range.min)} to ${gbp(range.max)}, usually including transport to the UK. On top of that, budget for a first vet check, any tests your vet asks for, kit, and ongoing costs. PDSA puts the minimum monthly cost of a medium dog at ${gbp(PDSA_MONTHLY.medium)}.`,
  },
  {
    question: 'How much does it cost to adopt a dog from Romania?',
    answer: `The Romanian rescues we checked publish fees from ${gbp(romania.min)} to ${gbp(romania.max)}. Pawprints to Freedom charges ${gbp(520)} for mainland UK, Paws2Rescue ${gbp(525)} (${gbp(425)} for dogs over 8), and All Dogs Great and Small about ${gbp(505)} including separately quoted transport.`,
  },
  {
    question: 'Is transport included in the adoption fee?',
    answer:
      'Often, but not always. Pawprints to Freedom, Paws2Rescue, Hope for Podencos and AA Dog Rescue include transport in one fee. Others quote it separately: Project Galgo charges £500 for transport to England or Wales on top of its £750 fee, and Healing Paws in Greece has the transport paid directly to the transporter. This calculator uses the all-in figure.',
  },
  {
    question: 'Why do overseas rescue fees cost £500 or more?',
    answer: `Because getting a dog here is expensive. Pawprints to Freedom publishes its per-dog costs, covering transport, tests and vaccinations, a Brucellosis test, neutering, an import fee and paperwork, at ${gbp(bTotal.min)}–${gbp(bTotal.max)}. That's more than its ${gbp(520)} fee, before any of the shelter's own running costs.`,
  },
  {
    question: 'Is adopting a dog from abroad cheaper than buying a puppy?',
    answer: `Usually, yes. The average advertised puppy on Pets4Homes was ${gbp(989)} in December 2025, and licensed breeders average over ${gbp(1500)}. Most overseas rescue fees we checked sit between ${gbp(range.min)} and ${gbp(760)}, and the rescues that list what's included typically cover vaccinations, a microchip, a pet passport and transport, and often neutering. Running costs after that are much the same for any dog of the same size.`,
  },
  {
    question: 'What costs come after the dog arrives?',
    answer: `A first UK vet health check (a median of ${gbp(VET_CHECK.default)} for a dog consultation at Medivet practices, September 2026), possibly a Brucella canis test if your vet asks (published prices of ${gbp(87.42)}–${gbp(177)} at the practices we checked), kit such as an escape-resistant harness and ID tag, and running costs: food, insurance and parasite treatment.`,
  },
]

const sources = computed(() => {
  const seen = new Set<string>()
  const list: { name: string; url: string }[] = []
  const add = (name: string, url: string) => {
    if (seen.has(url)) return
    seen.add(url)
    list.push({ name, url })
  }
  for (const f of RESCUE_FEES) add(`${f.rescue} — adoption fees`, f.sourceUrl)
  add(VET_CHECK.sourceName, VET_CHECK.sourceUrl)
  for (const q of BRUCELLA_TEST.quotes) add(`${q.practice} — Brucella canis test`, q.url)
  add(GPS_SOURCE.name, GPS_SOURCE.url)
  add(PDSA_SOURCE.name, PDSA_SOURCE.url)
  for (const p of PUPPY_PRICES) add(`Pets4Homes — ${p.label.toLowerCase()} prices`, p.sourceUrl)
  return list
})

const schema = computed(() => [
  buildArticle({
    headline: 'Cost of adopting a dog from abroad — UK calculator',
    description:
      'A sourced calculator for the real cost of adopting an overseas rescue dog in the UK: rescue fees, first vet visit, tests, kit and running costs.',
    path: route.path,
    datePublished: '2026-09-25',
  }),
])

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'Adoption cost calculator', path: '/tools/adoption-cost-calculator' },
]
</script>

<template>
  <div>
    <Breadcrumbs :items="crumbs" class="mb-8" />

    <header>
      <p class="eyebrow">Free tool</p>
      <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">What does adopting a dog from abroad really cost?</h1>
      <p class="lede mt-4">
        Rescue fees are only the start. Pick your dog’s country and rescue, then build up
        the rest: the first vet visit, tests, kit and month-to-month costs. You’ll see
        your first year at a glance.
      </p>
    </header>

    <div class="prose mt-6">
      <p>
        Every default below comes from a published source: rescues’ own fee pages, vet
        practices’ price lists and PDSA’s cost-of-ownership figures. Where no honest
        typical figure exists, like kit, it starts at £0 for you to fill in rather than
        an invented number. Your choices are saved in this browser, and the share link
        lets you send your budget to someone else.
      </p>
    </div>

    <section class="mt-10 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-7">
      <AdoptionCostCalculator />
    </section>

    <div class="prose mt-12">
      <h2>How to use the numbers</h2>
      <p>
        Treat this as a budget, not a quote. Fees vary by dog and change over time, so confirm
        the figure with your rescue before you commit. Vet prices vary a lot between practices.
        The Competition and Markets Authority has now ordered practices to publish their prices,
        so check your own vet’s list.
      </p>
      <p>
        The biggest unknown isn’t on this page: vet bills if your dog is ill. That’s what
        insurance is for, and why the timing matters so much for an imported dog. See
        <NuxtLink to="/guides/insurance-for-imported-dogs">pet insurance for an imported rescue dog</NuxtLink>.
        For the kit, the <NuxtLink to="/tools/harness-fit-finder">Harness Finder</NuxtLink> works out
        how much escape protection your dog needs, and
        <NuxtLink to="/guides/transport-day">transport day</NuxtLink> covers what to have ready for arrival.
      </p>
    </div>

    <Faq :items="faqs" heading="Adoption costs: common questions" />

    <section class="mt-12" aria-labelledby="sources-heading">
      <h2 id="sources-heading" class="display text-2xl">Sources</h2>
      <p class="mt-2 text-sm text-[var(--color-muted)]">
        All checked on {{ formatDate(SOURCES_CHECKED) }}. Fees and prices change, so always
        confirm with the rescue or practice directly.
      </p>
      <ul class="mt-4 space-y-1.5 text-sm">
        <li v-for="src in sources" :key="src.url">
          <a :href="src.url" target="_blank" rel="noopener" class="underline">{{ src.name }}</a>
        </li>
      </ul>
    </section>

    <p class="mt-10 text-xs text-[var(--color-faint)]">
      Listing a rescue here isn’t an endorsement, and we don’t earn anything from any link on
      this page. If you run a rescue and your published fee has changed,
      <NuxtLink to="/takedown" class="underline">let us know</NuxtLink>.
    </p>

    <JsonLd :schema="schema" />
  </div>
</template>
