<script setup lang="ts">
import type { FinderInput, Fear, Morphotype, Environment, HomeStage, RecommendedItem } from '~/utils/harnessFinder'

// Gear catalog (safety-led; affiliateUrl is null until a vetted link is added).
const { data: gear } = await useAsyncData('gear-catalog', () =>
  queryCollection('gear').order('order', 'ASC').all(),
)

const stageOptions = [
  { value: 'new', label: 'Arriving soon, or home under 3 months', hint: 'Still learning where home is' },
  { value: 'settled', label: 'Home 3 months or more', hint: 'Knows the house, the routine and you' },
]
const fearOptions = [
  { value: 0, label: 'Confident / calm', hint: 'Settled, not easily startled' },
  { value: 1, label: 'Mildly anxious', hint: 'Noise-sensitive, a bit unsure' },
  { value: 2, label: 'High bolt risk', hint: 'Spooks easily, has backed out of a lead' },
  { value: 3, label: 'Severe flight risk', hint: 'Recent rescue, panics, strong flight instinct' },
]
const morphoOptions = [
  { value: 'deep-chested', label: 'Deep-chested', hint: 'Deep ribcage, narrow waist — lurchers, sighthounds, many Romanian rescues' },
  { value: 'standard', label: 'Standard build', hint: 'Proportional chest and waist — Labradors, terriers' },
  { value: 'bully-broad', label: 'Broad / thick-necked', hint: 'Thick neck, broad chest — Staffies, bulldogs' },
]
const envOptions = [
  { value: 0, label: 'Quiet / rural', hint: 'Private field, quiet lanes' },
  { value: 1, label: 'Suburban streets', hint: 'Pavements with some traffic' },
  { value: 2, label: 'Busy / urban', hint: 'Main roads, high traffic' },
]

const homeStage = ref<HomeStage | null>(null)
const fear = ref<Fear | null>(null)
const morphotype = ref<Morphotype | null>(null)
const environment = ref<Environment | null>(null)

const answered = computed(
  () => homeStage.value !== null && fear.value !== null && morphotype.value !== null && environment.value !== null,
)

const input = computed<FinderInput | null>(() =>
  answered.value
    ? {
        fear: fear.value as Fear,
        morphotype: morphotype.value as Morphotype,
        environment: environment.value as Environment,
        homeStage: homeStage.value as HomeStage,
      }
    : null,
)

const result = computed(() => (input.value ? recommendSetup(input.value) : null))

// Tier presentation
const tierPanel: Record<string, string> = {
  standard: 'border-[var(--color-line)] bg-[var(--color-subtle)]',
  high: 'border-[var(--color-brand)] bg-[var(--color-brand-soft)]',
  maximum: 'border-[var(--color-brand-dark)] bg-[var(--color-brand-soft)]',
}
const TIER_INDEX: Record<string, number> = { standard: 1, high: 2, maximum: 3 }
const tierLevel = computed(() => (result.value ? TIER_INDEX[result.value.tier] : 0))

// Match the engine's recommended items to real catalog entries.
function gearFor(item: RecommendedItem) {
  const list = gear.value || []
  const tier = result.value!.tier
  const morpho = input.value!.morphotype
  return list.filter(
    (g) =>
      g.category === item.category &&
      g.role === item.role &&
      (item.role === 'addon' || (g.tiers as string[]).includes(tier)) &&
      ((g.morphotypes as string[]).includes(morpho) || (g.morphotypes as string[]).includes('all')),
  )
}

// --- Persistence (per-viewer convenience) ---------------------------------
const KEY = 'harness-finder-v2'
onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (saved) {
      homeStage.value = saved.homeStage ?? null
      fear.value = saved.fear ?? null
      morphotype.value = saved.morphotype ?? null
      environment.value = saved.environment ?? null
    }
  } catch {
    /* storage unavailable — ignore */
  }
})
watch([homeStage, fear, morphotype, environment], () => {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ homeStage: homeStage.value, fear: fear.value, morphotype: morphotype.value, environment: environment.value }),
    )
  } catch {
    /* ignore */
  }
})

function reset() {
  homeStage.value = null
  fear.value = null
  morphotype.value = null
  environment.value = null
}
</script>

<template>
  <div>
    <!-- Questions -->
    <form class="space-y-7" @submit.prevent>
      <fieldset>
        <legend class="text-sm font-semibold">1. How long has your dog been home?</legend>
        <div class="mt-3 grid gap-2 sm:grid-cols-2">
          <label
            v-for="o in stageOptions"
            :key="o.value"
            class="option relative cursor-pointer rounded-lg border p-3"
            :class="homeStage === o.value ? 'border-[var(--color-brand)] bg-[var(--color-brand-soft)]' : 'border-[var(--color-line)] hover:bg-[var(--color-subtle)]'"
          >
            <input v-model="homeStage" type="radio" name="stage" :value="o.value" class="sr-only" />
            <span v-if="homeStage === o.value" class="check">✓</span>
            <span class="block pr-5 text-sm font-medium">{{ o.label }}</span>
            <span class="block text-xs text-[var(--color-muted)]">{{ o.hint }}</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-sm font-semibold">2. How is your dog on a lead?</legend>
        <div class="mt-3 grid gap-2 sm:grid-cols-2">
          <label
            v-for="o in fearOptions"
            :key="o.value"
            class="option relative cursor-pointer rounded-lg border p-3"
            :class="fear === o.value ? 'border-[var(--color-brand)] bg-[var(--color-brand-soft)]' : 'border-[var(--color-line)] hover:bg-[var(--color-subtle)]'"
          >
            <input v-model="fear" type="radio" name="fear" :value="o.value" class="sr-only" />
            <span v-if="fear === o.value" class="check">✓</span>
            <span class="block pr-5 text-sm font-medium">{{ o.label }}</span>
            <span class="block text-xs text-[var(--color-muted)]">{{ o.hint }}</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-sm font-semibold">3. What's your dog's build?</legend>
        <div class="mt-3 grid gap-2 sm:grid-cols-3">
          <label
            v-for="o in morphoOptions"
            :key="o.value"
            class="option relative cursor-pointer rounded-lg border p-3"
            :class="morphotype === o.value ? 'border-[var(--color-brand)] bg-[var(--color-brand-soft)]' : 'border-[var(--color-line)] hover:bg-[var(--color-subtle)]'"
          >
            <input v-model="morphotype" type="radio" name="morpho" :value="o.value" class="sr-only" />
            <span v-if="morphotype === o.value" class="check">✓</span>
            <span class="block pr-5 text-sm font-medium">{{ o.label }}</span>
            <span class="block text-xs text-[var(--color-muted)]">{{ o.hint }}</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-sm font-semibold">4. Where will you mostly walk?</legend>
        <div class="mt-3 grid gap-2 sm:grid-cols-3">
          <label
            v-for="o in envOptions"
            :key="o.value"
            class="option relative cursor-pointer rounded-lg border p-3"
            :class="environment === o.value ? 'border-[var(--color-brand)] bg-[var(--color-brand-soft)]' : 'border-[var(--color-line)] hover:bg-[var(--color-subtle)]'"
          >
            <input v-model="environment" type="radio" name="env" :value="o.value" class="sr-only" />
            <span v-if="environment === o.value" class="check">✓</span>
            <span class="block pr-5 text-sm font-medium">{{ o.label }}</span>
            <span class="block text-xs text-[var(--color-muted)]">{{ o.hint }}</span>
          </label>
        </div>
      </fieldset>
    </form>

    <!-- Prompt until answered -->
    <p v-if="!answered" class="mt-8 rounded-lg bg-[var(--color-subtle)] px-4 py-3 text-sm text-[var(--color-muted)]">
      Answer the four questions above to see a recommended setup.
    </p>

    <!-- Result -->
    <Transition name="reveal">
      <div v-if="answered && result" :key="result.tier" class="mt-8">
        <!-- Tier-tinted panel: label, security meter, tagline -->
        <div class="rounded-[var(--radius-lg)] border-l-4 p-5" :class="tierPanel[result.tier]">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="eyebrow">Recommended setup</p>
              <h2 class="display mt-1 text-2xl">{{ result.tierLabel }}</h2>
            </div>
            <button type="button" class="shrink-0 text-sm text-[var(--color-muted)] underline" @click="reset">
              Start over
            </button>
          </div>
          <div class="mt-4 flex items-center gap-3">
            <span class="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Security level</span>
            <div class="flex gap-1.5" role="img" :aria-label="`Security level ${tierLevel} of 3`">
              <span
                v-for="n in 3"
                :key="n"
                class="meter-seg h-2.5 w-9 rounded-full"
                :class="n <= tierLevel ? 'bg-[var(--color-brand)]' : 'bg-[color-mix(in_srgb,var(--color-ink)_14%,transparent)]'"
              />
            </div>
          </div>
          <p class="mt-3 text-[var(--color-ink)]">{{ result.tagline }}</p>
        </div>

        <!-- Why (transparency of the safety rules) -->
        <div v-if="result.rulesTriggered.length" class="mt-5 rounded-[var(--radius-lg)] border-l-4 border-[var(--color-warn)] bg-[var(--color-warn-bg)] px-4 py-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-warn)]">Why this setup</p>
          <ul class="mt-2 space-y-1.5 text-sm text-[var(--color-ink)]">
            <li v-for="r in result.rulesTriggered" :key="r.id">• {{ r.text }}</li>
          </ul>
        </div>

        <!-- Essentials -->
        <h3 class="display mt-8 text-lg">The setup</h3>
        <div class="mt-4 space-y-4">
          <div v-for="item in result.essentials" :key="item.category + item.role">
            <div v-for="g in gearFor(item)" :key="g.name" class="card p-5">
              <span class="pill">{{ item.role }}</span>
              <h4 class="mt-2 font-semibold">{{ g.name }}</h4>
              <p class="mt-2 text-sm text-[var(--color-ink)]">{{ item.why }}</p>
              <p class="mt-2 text-sm text-[var(--color-muted)]">{{ g.summary }}</p>
              <ul v-if="g.features?.length" class="mt-3 space-y-1 text-sm text-[var(--color-muted)]">
                <li v-for="f in g.features" :key="f">— {{ f }}</li>
              </ul>
              <p v-if="g.sizingNote" class="mt-3 text-xs text-[var(--color-faint)]"><strong>Fit:</strong> {{ g.sizingNote }}</p>
              <div class="mt-4">
                <a
                  v-if="g.affiliateUrl"
                  :href="g.affiliateUrl"
                  rel="sponsored nofollow"
                  target="_blank"
                  class="btn btn-primary"
                >View a vetted option →</a>
                <p v-else class="text-xs text-[var(--color-faint)]">
                  No product linked here yet — use the "what to look for" points above to choose a vetted one.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Add-ons -->
        <h3 class="display mt-8 text-lg">Worth adding</h3>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <template v-for="item in result.addons" :key="item.category">
            <div v-for="g in gearFor(item)" :key="g.name" class="card p-5">
              <h4 class="font-semibold">{{ g.name }}</h4>
              <p class="mt-2 text-sm text-[var(--color-ink)]">{{ item.why }}</p>
              <ul v-if="g.features?.length" class="mt-3 space-y-1 text-sm text-[var(--color-muted)]">
                <li v-for="f in g.features" :key="f">— {{ f }}</li>
              </ul>
              <div class="mt-4">
                <a
                  v-if="g.affiliateUrl"
                  :href="g.affiliateUrl"
                  rel="sponsored nofollow"
                  target="_blank"
                  class="btn btn-ghost"
                >View a vetted option →</a>
              </div>
            </div>
          </template>
        </div>

        <!-- Safety disclaimer -->
        <div class="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-subtle)] px-4 py-3 text-sm text-[var(--color-muted)]">
          <strong class="text-[var(--color-ink)]">No harness is truly escape-proof.</strong>
          This is general guidance, not a fitting service. The setup only works if
          every piece is <em>fitted correctly</em> and checked before each walk —
          get the fit checked in person if you can, and always follow your rescue's
          advice for your individual dog.
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Subtle interactivity — all guarded by prefers-reduced-motion. */
.option {
  transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
}
.check {
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  font-size: 0.8rem;
  line-height: 1;
  color: var(--color-brand-dark);
}
.meter-seg {
  transition: background-color 0.35s ease;
}
.reveal-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.reveal-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.reveal-leave-active {
  transition: opacity 0.2s ease;
}
.reveal-leave-to {
  opacity: 0;
}
@media (hover: hover) {
  .option:hover {
    transform: translateY(-1px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .option,
  .meter-seg,
  .reveal-enter-active,
  .reveal-leave-active {
    transition: none;
  }
  .option:hover {
    transform: none;
  }
  .reveal-enter-from {
    transform: none;
  }
}
</style>
