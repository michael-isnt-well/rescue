<script setup lang="ts">
import type { Country, DogSize, SliceKey } from '~/utils/adoptionCosts'

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const KIT_ITEMS = [
  { id: 'harness', label: 'Escape-resistant harness', hint: 'The one bit of kit not to skimp on' },
  { id: 'collar', label: 'Martingale collar', hint: 'Backup point of contact' },
  { id: 'lead', label: 'Double-ended lead', hint: 'Clips to harness and collar' },
  { id: 'tag', label: 'ID tag', hint: 'Legally required in public' },
  { id: 'bed', label: 'Bed', hint: '' },
  { id: 'crate', label: 'Crate or pen', hint: 'Somewhere safe to retreat' },
  { id: 'bowls', label: 'Bowls', hint: '' },
  { id: 'food', label: 'First food shop', hint: 'Ask the rescue what your dog’s been eating' },
  { id: 'other', label: 'Anything else', hint: 'Toys, chews, stair gate, car guard…' },
] as const
type KitId = (typeof KIT_ITEMS)[number]['id']

const SIZE_OPTIONS: { value: DogSize; label: string }[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
]

function defaults() {
  return {
    country: 'romania' as Country,
    rescueId: 'pawprints' as string, // or 'custom'
    customFee: 500,
    vetOn: true,
    vetCheck: VET_CHECK.default,
    brucellaOn: true,
    brucellaTest: BRUCELLA_TEST.default,
    otherTests: 0,
    gpsOn: true,
    gpsPlan: 'basic-1y' as string,
    kit: Object.fromEntries(KIT_ITEMS.map((k) => [k.id, 0])) as Record<KitId, number>,
    size: 'medium' as DogSize,
    monthlyOverride: null as number | null,
    extrasOneOff: 0,
    extrasMonthly: 0,
  }
}
const s = reactive(defaults())

const countries = Object.keys(COUNTRY_META) as Country[]
const countryFees = computed(() => feesFor(s.country))
const selectedFee = computed(() => RESCUE_FEES.find((f) => f.id === s.rescueId) || null)
const fee = computed(() => (s.rescueId === 'custom' ? Number(s.customFee) || 0 : selectedFee.value?.fee ?? 0))

function pickCountry(c: Country) {
  s.country = c
  // Keep a custom figure if the user has one; otherwise select the first rescue.
  if (s.rescueId !== 'custom') s.rescueId = feesFor(c)[0]!.id
}

const gpsMonthly = computed(() => GPS_PLANS.find((p) => p.id === s.gpsPlan)?.monthly ?? GPS_PLANS[1].monthly)
const monthly = computed(() => s.monthlyOverride ?? PDSA_MONTHLY[s.size])
const kitTotal = computed(() => Object.values(s.kit).reduce((a, n) => a + (Number(n) || 0), 0))

const result = computed(() =>
  calculate({
    fee: fee.value,
    vetCheck: s.vetOn ? Number(s.vetCheck) : null,
    brucellaTest: s.brucellaOn ? Number(s.brucellaTest) : null,
    otherTests: Number(s.otherTests) || 0,
    kit: kitTotal.value,
    gpsMonthly: s.gpsOn ? gpsMonthly.value : null,
    monthly: monthly.value,
    extrasOneOff: Number(s.extrasOneOff) || 0,
    extrasMonthly: Number(s.extrasMonthly) || 0,
  }),
)

// ---------------------------------------------------------------------------
// Presentation helpers
// ---------------------------------------------------------------------------
const SLICE_VAR: Record<SliceKey, string> = {
  fee: 'var(--acc-fee)',
  arrival: 'var(--acc-arrival)',
  kit: 'var(--acc-kit)',
  running: 'var(--acc-running)',
  gps: 'var(--acc-gps)',
  extras: 'var(--acc-extras)',
}

// Dot plot of every published fee we've sourced.
const allRange = feeRange()
const PLOT_MIN = Math.floor((allRange.min - 50) / 100) * 100
const PLOT_MAX = Math.ceil((allRange.max + 50) / 100) * 100
const plotPos = (n: number) => `${((Math.min(Math.max(n, PLOT_MIN), PLOT_MAX) - PLOT_MIN) / (PLOT_MAX - PLOT_MIN)) * 100}%`
const plotTicks = computed(() => {
  const ticks: number[] = []
  for (let t = PLOT_MIN; t <= PLOT_MAX; t += 200) ticks.push(t)
  return ticks
})

const breakdown = FEE_BREAKDOWN
const bTotal = breakdownTotal()
const bMax = Math.max(...breakdown.items.map((i) => i.max))

// Animated totals — tween displayed numbers towards their targets.
const shown = reactive({ firstYear: 0, getHome: 0, firstMonth: 0, everyYearAfter: 0, perDay: 0 })
let raf = 0
let snapTimer: ReturnType<typeof setTimeout> | undefined
function animateTo() {
  const target = {
    firstYear: result.value.firstYear,
    getHome: result.value.getHome,
    firstMonth: result.value.firstMonth,
    everyYearAfter: result.value.everyYearAfter,
    perDay: result.value.perDayFirstYear,
  }
  const reduce = import.meta.client && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (!import.meta.client || reduce || document.hidden) {
    Object.assign(shown, target)
    return
  }
  cancelAnimationFrame(raf)
  clearTimeout(snapTimer)
  // rAF pauses in background tabs — never leave a stale total on screen.
  snapTimer = setTimeout(() => Object.assign(shown, target), 600)
  const from = { ...shown }
  const start = performance.now()
  const dur = 450
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / dur)
    const e = 1 - Math.pow(1 - t, 3)
    for (const k of Object.keys(target) as (keyof typeof target)[]) {
      shown[k] = from[k] + (target[k] - from[k]) * e
    }
    if (t < 1) raf = requestAnimationFrame(step)
    else Object.assign(shown, target)
  }
  raf = requestAnimationFrame(step)
}
// Render the real figures on the server (and without JS); animate after.
Object.assign(shown, {
  firstYear: result.value.firstYear,
  getHome: result.value.getHome,
  firstMonth: result.value.firstMonth,
  everyYearAfter: result.value.everyYearAfter,
  perDay: result.value.perDayFirstYear,
})
watch(result, animateTo)
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  clearTimeout(snapTimer)
})

const whole = (n: number) => gbp(Math.round(n))

// ---------------------------------------------------------------------------
// Persistence: URL (shareable) > localStorage (per-viewer convenience)
// ---------------------------------------------------------------------------
const KEY = 'adoption-cost-calculator-v1'

function toParams(): URLSearchParams {
  const p = new URLSearchParams()
  p.set('c', s.country)
  p.set('r', s.rescueId)
  if (s.rescueId === 'custom') p.set('fee', String(s.customFee))
  p.set('vet', s.vetOn ? String(s.vetCheck) : 'off')
  p.set('bt', s.brucellaOn ? String(s.brucellaTest) : 'off')
  if (s.otherTests) p.set('ot', String(s.otherTests))
  p.set('gps', s.gpsOn ? s.gpsPlan : 'off')
  const kit = KIT_ITEMS.map((k) => Number(s.kit[k.id]) || 0)
  if (kit.some(Boolean)) p.set('kit', kit.join('_'))
  p.set('size', s.size)
  if (s.monthlyOverride !== null) p.set('m', String(s.monthlyOverride))
  if (s.extrasOneOff) p.set('x1', String(s.extrasOneOff))
  if (s.extrasMonthly) p.set('xm', String(s.extrasMonthly))
  return p
}

function num(v: string | null, fallback: number) {
  const n = Number(v)
  return v !== null && Number.isFinite(n) && n >= 0 ? n : fallback
}

function fromParams(p: URLSearchParams): boolean {
  if (!p.has('c')) return false
  const d = defaults()
  const c = p.get('c') as Country
  s.country = countries.includes(c) ? c : d.country
  const r = p.get('r') || ''
  s.rescueId = r === 'custom' || RESCUE_FEES.some((f) => f.id === r && f.country === s.country) ? r : feesFor(s.country)[0]!.id
  s.customFee = num(p.get('fee'), d.customFee)
  s.vetOn = p.get('vet') !== 'off'
  s.vetCheck = num(p.get('vet'), d.vetCheck)
  s.brucellaOn = p.get('bt') !== 'off'
  s.brucellaTest = num(p.get('bt'), d.brucellaTest)
  s.otherTests = num(p.get('ot'), 0)
  const gps = p.get('gps')
  s.gpsOn = gps !== 'off'
  s.gpsPlan = GPS_PLANS.some((g) => g.id === gps) ? (gps as string) : d.gpsPlan
  const kit = (p.get('kit') || '').split('_')
  KIT_ITEMS.forEach((k, i) => (s.kit[k.id] = num(kit[i] ?? null, 0)))
  const size = p.get('size') as DogSize
  s.size = size in PDSA_MONTHLY ? size : d.size
  s.monthlyOverride = p.has('m') ? num(p.get('m'), PDSA_MONTHLY[s.size]) : null
  s.extrasOneOff = num(p.get('x1'), 0)
  s.extrasMonthly = num(p.get('xm'), 0)
  return true
}

onMounted(() => {
  try {
    const fromUrl = fromParams(new URLSearchParams(window.location.search))
    if (!fromUrl) {
      const saved = localStorage.getItem(KEY)
      if (saved) fromParams(new URLSearchParams(saved))
    }
  } catch {
    /* storage or URL unavailable — keep defaults */
  }
})

watch(
  s,
  () => {
    try {
      localStorage.setItem(KEY, toParams().toString())
    } catch {
      /* ignore */
    }
  },
  { deep: true },
)

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
const copied = ref<'' | 'link' | 'summary'>('')
let copiedTimer: ReturnType<typeof setTimeout> | undefined

function shareUrl() {
  return `${window.location.origin}${window.location.pathname}?${toParams().toString()}`
}

async function copy(kind: 'link' | 'summary') {
  const text =
    kind === 'link'
      ? shareUrl()
      : [
          `My overseas rescue dog budget (${COUNTRY_META[s.country].name}):`,
          `• To get your dog home: ${whole(result.value.getHome)}`,
          `• First month: ${whole(result.value.firstMonth)}`,
          `• First year: ${whole(result.value.firstYear)} (about ${gbp(Math.round(result.value.perDayFirstYear * 100) / 100)} a day)`,
          `• Each year after: ${whole(result.value.everyYearAfter)}`,
          `Worked out with ${shareUrl()}`,
        ].join('\n')
  try {
    await navigator.clipboard.writeText(text)
    copied.value = kind
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => (copied.value = ''), 2000)
  } catch {
    /* clipboard blocked — nothing sensible to do without a dialog */
  }
}

function reset() {
  Object.assign(s, defaults())
  try {
    history.replaceState(null, '', window.location.pathname)
  } catch {
    /* ignore */
  }
}

// Hide the sticky total while the full summary is visible.
const summaryEl = ref<HTMLElement | null>(null)
const summaryVisible = ref(false)
let observer: IntersectionObserver | undefined
onMounted(() => {
  if (!summaryEl.value || !('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(([e]) => (summaryVisible.value = !!e?.isIntersecting), { threshold: 0.15 })
  observer.observe(summaryEl.value)
})
onBeforeUnmount(() => observer?.disconnect())

function scrollToSummary() {
  document.getElementById('cost-summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="acc-root">
    <!-- ================================================================ -->
    <!-- Inputs                                                           -->
    <!-- ================================================================ -->
    <div class="space-y-10">
      <!-- Step 1: country + rescue -->
      <section aria-labelledby="step-1">
        <p class="step-num">Step 1</p>
        <h2 id="step-1" class="display text-xl">Where is your dog coming from?</h2>
        <div class="mt-4 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Country">
          <button
            v-for="c in countries"
            :key="c"
            type="button"
            role="radio"
            :aria-checked="s.country === c"
            class="tile flex flex-col items-center gap-1 rounded-lg border px-1 py-3 text-xs font-medium sm:text-sm"
            :class="s.country === c ? 'tile-on' : ''"
            @click="pickCountry(c)"
          >
            <span class="flag text-2xl sm:text-3xl" aria-hidden="true">{{ COUNTRY_META[c].flag }}</span>
            {{ COUNTRY_META[c].name }}
          </button>
        </div>

        <h3 class="mt-7 text-sm font-semibold">Pick a rescue’s published fee, or enter your own</h3>
        <div class="mt-3 grid gap-2 sm:grid-cols-2">
          <label
            v-for="f in countryFees"
            :key="f.id"
            class="option relative block cursor-pointer rounded-lg border p-3"
            :class="s.rescueId === f.id ? 'option-on' : ''"
          >
            <input v-model="s.rescueId" type="radio" name="rescue" :value="f.id" class="sr-only" />
            <span class="flex items-baseline justify-between gap-3">
              <span class="text-sm font-medium">{{ f.rescue }}</span>
              <span class="font-display text-lg tabular-nums">{{ f.approx ? '~' : '' }}{{ gbp(f.fee) }}</span>
            </span>
            <span class="mt-0.5 block text-xs text-[var(--color-muted)]">{{ f.variant }}</span>
          </label>
          <label class="option relative block cursor-pointer rounded-lg border p-3" :class="s.rescueId === 'custom' ? 'option-on' : ''">
            <input v-model="s.rescueId" type="radio" name="rescue" value="custom" class="sr-only" />
            <span class="text-sm font-medium">Another rescue</span>
            <span class="mt-1 flex items-center gap-2">
              <span class="text-sm text-[var(--color-muted)]">£</span>
              <input
                v-model.number="s.customFee"
                type="number"
                min="0"
                step="5"
                inputmode="numeric"
                class="field w-24"
                aria-label="Your rescue's total fee including transport"
                @focus="s.rescueId = 'custom'"
              />
              <span class="text-xs text-[var(--color-muted)]">incl. transport</span>
            </span>
          </label>
        </div>

        <!-- Selected rescue detail -->
          <div v-if="selectedFee" :key="selectedFee.id" class="mt-4 rounded-lg bg-[var(--color-subtle)] p-4 text-sm">
            <div v-if="selectedFee.parts.length > 1" class="mb-3 flex h-2.5 overflow-hidden rounded-full" aria-hidden="true">
              <span
                v-for="(p, i) in selectedFee.parts"
                :key="p.label"
                class="h-full"
                :style="{ width: `${(p.amount / selectedFee.fee) * 100}%`, background: i % 2 ? 'var(--acc-fee-2)' : 'var(--acc-fee)' }"
              />
            </div>
            <ul v-if="selectedFee.parts.length > 1" class="mb-3 space-y-1">
              <li v-for="p in selectedFee.parts" :key="p.label" class="flex justify-between gap-3">
                <span>{{ p.label }}</span><span class="tabular-nums">{{ gbp(p.amount) }}</span>
              </li>
            </ul>
            <p class="text-[var(--color-muted)]">{{ selectedFee.note }}</p>
            <p class="mt-2 text-xs">
              <a :href="selectedFee.sourceUrl" target="_blank" rel="noopener" class="underline">Source: {{ selectedFee.rescue }}</a>
              <template v-if="selectedFee.profilePath">
                · <NuxtLink :to="selectedFee.profilePath" class="underline">Our profile of this rescue</NuxtLink>
              </template>
            </p>
          </div>

        <!-- Dot plot -->
        <div class="mt-6">
          <p class="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Where this sits among {{ RESCUE_FEES.length }} published fees
          </p>
          <div class="relative mx-4 mt-4 h-10" role="img" :aria-label="`Published fees range from ${gbp(allRange.min)} to ${gbp(allRange.max)}. Yours: ${gbp(fee)}.`">
            <div class="absolute inset-x-0 top-3 h-px bg-[var(--color-line)]" />
            <span
              v-for="f in RESCUE_FEES"
              :key="f.id"
              class="dot absolute top-3 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              :class="f.country === s.country ? 'dot-country' : 'dot-other'"
              :style="{ left: plotPos(f.fee) }"
              :title="`${f.rescue} (${f.variant}): ${gbp(f.fee)}`"
            />
            <span class="marker absolute top-3 -translate-x-1/2 -translate-y-1/2" :style="{ left: plotPos(fee) }" />
            <span
              v-for="t in plotTicks"
              :key="t"
              class="absolute top-6 -translate-x-1/2 text-[0.65rem] tabular-nums text-[var(--color-faint)]"
              :style="{ left: plotPos(t) }"
            >£{{ t.toLocaleString('en-GB') }}</span>
          </div>
          <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-muted)]">
            <span><span class="legend-dot dot-country" /> {{ COUNTRY_META[s.country].name }}</span>
            <span><span class="legend-dot dot-other" /> Other countries</span>
            <span><span class="legend-marker" /> Your figure</span>
          </p>
        </div>

        <!-- Where the fee goes -->
        <details class="insight mt-6 rounded-[var(--radius-lg)] border border-[var(--color-line)] p-4">
          <summary class="cursor-pointer text-sm font-semibold">
            Why is it £500+? See where one rescue’s fee goes
          </summary>
          <p class="mt-3 text-sm">
            {{ breakdown.rescue }} publishes what it spends getting one dog to the UK:
            <strong>{{ gbp(bTotal.min) }}–{{ gbp(bTotal.max) }}</strong>, against a
            {{ gbp(breakdown.fee) }} fee, before customs agent fees or any of the shelter’s own running costs.
          </p>
          <ul class="mt-4 space-y-2">
            <li v-for="i in breakdown.items" :key="i.label" class="text-sm">
              <div class="flex justify-between gap-3">
                <span>{{ i.label }}</span>
                <span class="tabular-nums text-[var(--color-muted)]">{{ i.min === i.max ? gbp(i.min) : `${gbp(i.min)}–${gbp(i.max)}` }}</span>
              </div>
              <div class="mt-1 h-1.5 rounded-full bg-[var(--color-subtle)]">
                <div class="relative h-full" :style="{ width: `${(i.max / bMax) * 100}%` }">
                  <span class="absolute inset-y-0 left-0 rounded-full bg-[var(--acc-fee)]" :style="{ width: `${(i.min / i.max) * 100}%` }" />
                  <span class="absolute inset-y-0 right-0 rounded-r-full bg-[var(--acc-fee)] opacity-40" :style="{ width: `${100 - (i.min / i.max) * 100}%` }" />
                </div>
              </div>
            </li>
          </ul>
          <p class="mt-3 text-xs">
            <a :href="breakdown.sourceUrl" target="_blank" rel="noopener" class="underline">Source: {{ breakdown.rescue }}</a>
          </p>
        </details>
      </section>

      <!-- Step 2: first weeks -->
      <section aria-labelledby="step-2">
        <p class="step-num">Step 2</p>
        <h2 id="step-2" class="display text-xl">The first few weeks home</h2>

        <div class="mt-4 space-y-3">
          <!-- Vet check -->
          <div class="row" :class="{ 'row-off': !s.vetOn }">
            <label class="flex items-center justify-between gap-3">
              <span>
                <span class="block text-sm font-medium">First vet health check</span>
                <span class="block text-xs text-[var(--color-muted)]">Your UK baseline, which matters for insurance</span>
              </span>
              <span class="switch"><input v-model="s.vetOn" type="checkbox" role="switch" /><span /></span>
            </label>
            <div v-if="s.vetOn" class="mt-3">
              <div class="flex items-center gap-3">
                <input v-model.number="s.vetCheck" type="range" min="30" max="130" step="1" class="slider flex-1" aria-label="First vet check cost" />
                <span class="w-14 text-right font-display text-lg tabular-nums">{{ gbp(s.vetCheck) }}</span>
              </div>
              <p class="mt-1 text-xs text-[var(--color-muted)]">
                Default {{ gbp(VET_CHECK.default) }}: median published dog consultation at Medivet, range
                {{ gbp(VET_CHECK.min) }}–{{ gbp(VET_CHECK.max) }}
                (<a :href="VET_CHECK.sourceUrl" target="_blank" rel="noopener" class="underline">{{ VET_CHECK.sourceName }}</a>). Your vet will differ.
              </p>
            </div>
          </div>

          <!-- Brucella -->
          <div class="row" :class="{ 'row-off': !s.brucellaOn }">
            <label class="flex items-center justify-between gap-3">
              <span>
                <span class="block text-sm font-medium">Brucella canis test</span>
                <span class="block text-xs text-[var(--color-muted)]">Many UK vets ask for this before treating an imported dog</span>
              </span>
              <span class="switch"><input v-model="s.brucellaOn" type="checkbox" role="switch" /><span /></span>
            </label>
            <div v-if="s.brucellaOn" class="mt-3">
              <div class="flex items-center gap-3">
                <input v-model.number="s.brucellaTest" type="range" min="50" max="200" step="1" class="slider flex-1" aria-label="Brucella test cost" />
                <span class="w-14 text-right font-display text-lg tabular-nums">{{ gbp(s.brucellaTest) }}</span>
              </div>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <button
                  v-for="q in BRUCELLA_TEST.quotes"
                  :key="q.practice"
                  type="button"
                  class="chip"
                  :class="{ 'chip-on': s.brucellaTest === Math.round(q.price) }"
                  @click="s.brucellaTest = Math.round(q.price)"
                >
                  {{ q.practice }} · {{ gbp(q.price) }}
                </button>
              </div>
              <p class="mt-1.5 text-xs text-[var(--color-muted)]">
                Published prices at three practices:
                <template v-for="(q, i) in BRUCELLA_TEST.quotes" :key="q.url">
                  <a :href="q.url" target="_blank" rel="noopener" class="underline">{{ q.practice }}</a>{{ i < BRUCELLA_TEST.quotes.length - 1 ? ', ' : '.' }}
                </template>
                Your rescue may already have tested your dog. Ask for the results.
              </p>
            </div>
          </div>

          <!-- Other screening -->
          <div class="row">
            <label class="flex items-center justify-between gap-3">
              <span>
                <span class="block text-sm font-medium">Other screening tests</span>
                <span class="block text-xs text-[var(--color-muted)]">
                  e.g. Leishmania, Ehrlichia, heartworm. Ask your vet for a quote
                </span>
              </span>
              <span class="flex items-center gap-1">
                <span class="text-sm text-[var(--color-muted)]">£</span>
                <input v-model.number="s.otherTests" type="number" min="0" step="5" inputmode="numeric" class="field w-20" aria-label="Other screening tests cost" />
              </span>
            </label>
          </div>

          <!-- GPS -->
          <div class="row" :class="{ 'row-off': !s.gpsOn }">
            <label class="flex items-center justify-between gap-3">
              <span>
                <span class="block text-sm font-medium">GPS tracker subscription</span>
                <span class="block text-xs text-[var(--color-muted)]">A safety net for the bolt-risk early weeks</span>
              </span>
              <span class="switch"><input v-model="s.gpsOn" type="checkbox" role="switch" /><span /></span>
            </label>
            <div v-if="s.gpsOn" class="mt-3">
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="p in GPS_PLANS"
                  :key="p.id"
                  type="button"
                  class="chip"
                  :class="{ 'chip-on': s.gpsPlan === p.id }"
                  @click="s.gpsPlan = p.id"
                >
                  {{ p.label }} · {{ gbp(p.monthly) }}/mo
                </button>
              </div>
              <p class="mt-1.5 text-xs text-[var(--color-muted)]">
                Example prices from the <a :href="GPS_SOURCE.url" target="_blank" rel="noopener" class="underline">{{ GPS_SOURCE.name }}</a>, plus the cost of the device.
                Not an endorsement. See the <NuxtLink to="/tools/harness-fit-finder" class="underline">Harness Finder</NuxtLink> for where a tracker fits in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Step 3: kit -->
      <section aria-labelledby="step-3">
        <div class="flex items-baseline justify-between gap-3">
          <div>
            <p class="step-num">Step 3</p>
            <h2 id="step-3" class="display text-xl">Kit and home setup</h2>
          </div>
          <span class="font-display text-lg tabular-nums">{{ gbp(kitTotal) }}</span>
        </div>
        <p class="mt-2 text-sm text-[var(--color-muted)]">
          Prices vary too much to guess, so add your own: what you’ve bought or plan to buy.
          Leave anything you already have at £0.
        </p>
        <div class="mt-4 grid gap-2 sm:grid-cols-2">
          <label v-for="k in KIT_ITEMS" :key="k.id" class="kit-row flex items-center justify-between gap-3 rounded-lg border p-3" :class="{ 'kit-on': s.kit[k.id] > 0 }">
            <span class="min-w-0">
              <span class="flex items-center gap-1.5 text-sm font-medium">
                <span class="tick" aria-hidden="true">{{ s.kit[k.id] > 0 ? '✓' : '' }}</span><span>{{ k.label }}</span>
              </span>
              <span v-if="k.hint" class="block pl-[1.375rem] text-xs text-[var(--color-muted)]">{{ k.hint }}</span>
            </span>
            <span class="flex shrink-0 items-center gap-1">
              <span class="text-sm text-[var(--color-muted)]">£</span>
              <input v-model.number="s.kit[k.id]" type="number" min="0" step="1" inputmode="numeric" class="field w-16" :aria-label="`${k.label} cost`" />
            </span>
          </label>
        </div>
      </section>

      <!-- Step 4: running costs -->
      <section aria-labelledby="step-4">
        <p class="step-num">Step 4</p>
        <h2 id="step-4" class="display text-xl">Month-to-month running costs</h2>
        <div class="mt-4 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Dog size">
          <button
            v-for="o in SIZE_OPTIONS"
            :key="o.value"
            type="button"
            role="radio"
            :aria-checked="s.size === o.value"
            class="tile flex flex-col items-center rounded-lg border px-2 py-3"
            :class="s.size === o.value ? 'tile-on' : ''"
            @click="s.size = o.value; s.monthlyOverride = null"
          >
            <span class="flex h-8 items-end" aria-hidden="true"><svg viewBox="0 0 24 24" :width="o.value === 'small' ? 20 : o.value === 'medium' ? 26 : 32" :height="o.value === 'small' ? 20 : o.value === 'medium' ? 26 : 32" fill="currentColor" aria-hidden="true" class="text-[var(--color-brand)]">
              <path d="M4.5 9.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm5-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm5 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm5 3a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 11c2.8 0 6 3.6 6 6.4 0 1.9-1.4 2.6-3 2.6-1.2 0-2-.6-3-.6s-1.8.6-3 .6c-1.6 0-3-.7-3-2.6C6 14.6 9.2 11 12 11Z" />
            </svg></span>
            <span class="mt-1 text-sm font-medium">{{ o.label }}</span>
            <span class="text-xs tabular-nums text-[var(--color-muted)]">{{ gbp(PDSA_MONTHLY[o.value]) }}/mo</span>
          </button>
        </div>
        <div class="row mt-3">
          <div class="flex items-center gap-3">
            <input
              :value="monthly"
              type="range"
              min="30"
              max="250"
              step="1"
              class="slider flex-1"
              aria-label="Monthly running costs"
              @input="s.monthlyOverride = Number(($event.target as HTMLInputElement).value)"
            />
            <span class="w-20 text-right font-display text-lg tabular-nums">{{ gbp(monthly) }}<span class="text-xs text-[var(--color-muted)]">/mo</span></span>
          </div>
          <p class="mt-1.5 text-xs text-[var(--color-muted)]">
            Default: <a :href="PDSA_SOURCE.url" target="_blank" rel="noopener" class="underline">PDSA’s minimum monthly cost</a>
            for a {{ s.size }} dog (worked out in 2024): food, insurance, flea and worm treatment, boosters, health checks
            and small consumables. It doesn’t include vet bills for illness, grooming, training or boarding.
            <button v-if="s.monthlyOverride !== null" type="button" class="underline" @click="s.monthlyOverride = null">Reset to PDSA figure</button>
          </p>
        </div>
      </section>

      <!-- Step 5: extras -->
      <section aria-labelledby="step-5">
        <p class="step-num">Step 5 · optional</p>
        <h2 id="step-5" class="display text-xl">Training and extras</h2>
        <p class="mt-2 text-sm text-[var(--color-muted)]">
          Nervous imported dogs often benefit from a qualified behaviourist or trainer early on. Add any quotes you have.
        </p>
        <div class="mt-4 grid gap-2 sm:grid-cols-2">
          <label class="row flex items-center justify-between gap-3">
            <span class="text-sm font-medium">One-off (behaviourist, classes)</span>
            <span class="flex items-center gap-1">
              <span class="text-sm text-[var(--color-muted)]">£</span>
              <input v-model.number="s.extrasOneOff" type="number" min="0" step="5" inputmode="numeric" class="field w-20" aria-label="One-off extras" />
            </span>
          </label>
          <label class="row flex items-center justify-between gap-3">
            <span class="text-sm font-medium">Monthly (walker, daycare, secure fields)</span>
            <span class="flex items-center gap-1">
              <span class="text-sm text-[var(--color-muted)]">£</span>
              <input v-model.number="s.extrasMonthly" type="number" min="0" step="5" inputmode="numeric" class="field w-20" aria-label="Monthly extras" />
            </span>
          </label>
        </div>
      </section>
    </div>

    <!-- Sticky running total; hides once the full summary is on screen -->
    <button type="button" class="total-bar" :class="{ 'total-bar-hidden': summaryVisible }" :aria-hidden="summaryVisible" :tabindex="summaryVisible ? -1 : 0" @click="scrollToSummary">
      <span class="whitespace-nowrap text-xs uppercase tracking-wide opacity-80">First year</span>
      <span class="font-display text-xl tabular-nums">{{ whole(shown.firstYear) }}</span>
      <span class="whitespace-nowrap text-xs opacity-80"><span class="hidden sm:inline">See </span>breakdown ↓</span>
    </button>

    <!-- ================================================================ -->
    <!-- Summary                                                          -->
    <!-- ================================================================ -->
    <aside id="cost-summary" ref="summaryEl" class="mt-6 scroll-mt-6">
      <div class="summary rounded-[var(--radius-lg)] border border-[var(--color-line)] p-5 sm:p-6">
        <p class="eyebrow">Your first year</p>
        <p class="mt-1 font-display text-[2.6rem] leading-none tabular-nums" aria-live="polite">{{ whole(shown.firstYear) }}</p>
        <p class="mt-2 text-sm text-[var(--color-muted)]">
          About <strong class="text-[var(--color-ink)] tabular-nums">{{ gbp(Math.round(shown.perDay * 100) / 100) }}</strong> a day
        </p>

        <!-- Stacked bar -->
        <div class="mt-5 flex h-3 overflow-hidden rounded-full bg-[var(--color-subtle)]" aria-hidden="true">
          <span
            v-for="sl in result.slices"
            :key="sl.key"
            class="seg h-full"
            :style="{ width: `${(sl.amount / result.firstYear) * 100}%`, background: SLICE_VAR[sl.key] }"
          />
        </div>
        <ul class="mt-3 space-y-1.5 text-sm">
          <li v-for="sl in result.slices" :key="sl.key" class="flex items-center justify-between gap-3">
            <span class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 shrink-0 rounded-full" :style="{ background: SLICE_VAR[sl.key] }" />{{ sl.label }}
            </span>
            <span class="tabular-nums">{{ whole(sl.amount) }}</span>
          </li>
        </ul>

        <dl class="mt-5 grid grid-cols-3 gap-2 border-t border-[var(--color-line)] pt-4 text-center">
          <div>
            <dt class="text-[0.7rem] uppercase tracking-wide text-[var(--color-muted)]">Getting home</dt>
            <dd class="mt-1 font-display text-lg tabular-nums">{{ whole(shown.getHome) }}</dd>
          </div>
          <div>
            <dt class="text-[0.7rem] uppercase tracking-wide text-[var(--color-muted)]">First month</dt>
            <dd class="mt-1 font-display text-lg tabular-nums">{{ whole(shown.firstMonth) }}</dd>
          </div>
          <div>
            <dt class="text-[0.7rem] uppercase tracking-wide text-[var(--color-muted)]">Each year after</dt>
            <dd class="mt-1 font-display text-lg tabular-nums">{{ whole(shown.everyYearAfter) }}</dd>
          </div>
        </dl>

        <p class="mt-4 rounded-lg bg-[var(--color-subtle)] p-3 text-xs text-[var(--color-muted)]">
          For the long view, PDSA puts the <em>minimum</em> lifetime cost of a {{ s.size }} dog at
          <strong class="text-[var(--color-ink)]">{{ gbp(PDSA_LIFETIME[s.size].min) }}–{{ gbp(PDSA_LIFETIME[s.size].max) }}</strong>,
          before any adoption fee.
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <button type="button" class="btn btn-primary flex-1 justify-center text-sm" @click="copy('link')">
            {{ copied === 'link' ? 'Link copied ✓' : 'Copy share link' }}
          </button>
          <button type="button" class="btn btn-ghost flex-1 justify-center text-sm" @click="copy('summary')">
            {{ copied === 'summary' ? 'Copied ✓' : 'Copy summary' }}
          </button>
        </div>
        <button type="button" class="mt-3 w-full text-center text-xs text-[var(--color-muted)] underline" @click="reset">
          Reset everything
        </button>
      </div>
    </aside>

  </div>
</template>

<style>
/* Slice palette — tokens so both themes stay legible. */
.acc-root {
  --acc-fee: var(--color-brand);
  --acc-fee-2: #6fae9c;
  --acc-arrival: #2f6fa8;
  --acc-kit: #c07a2c;
  --acc-running: #7a5ea8;
  --acc-gps: #c24d6a;
  --acc-extras: #8a8175;
}
:root[data-theme='dark'] .acc-root {
  --acc-fee-2: #3f7466;
  --acc-arrival: #6ea6d8;
  --acc-kit: #e0a86a;
  --acc-running: #ab93d6;
  --acc-gps: #e58aa0;
  --acc-extras: #a8a294;
}
</style>

<style scoped>
.step-num {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-brand-dark);
}
.tile,
.option,
.kit-row {
  border-color: var(--color-line);
  background: var(--color-paper);
  transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}
.tile-on,
.option-on {
  border-color: var(--color-brand);
  background: var(--color-brand-soft);
  box-shadow: 0 0 0 1px var(--color-brand);
}
.kit-on {
  border-color: var(--color-brand);
}
.tick {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  border: 1.5px solid var(--color-line);
  font-size: 0.6rem;
  line-height: 1;
  color: var(--color-paper);
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.kit-on .tick {
  border-color: var(--color-brand);
  background: var(--color-brand);
}
.flag {
  transition: transform 0.2s ease;
}
.tile-on .flag {
  transform: scale(1.12);
}
.row {
  border: 1px solid var(--color-line);
  border-radius: 0.5rem;
  padding: 0.85rem;
  background: var(--color-paper);
  transition: opacity 0.2s ease;
}
.row-off {
  opacity: 0.7;
}
.field {
  border: 1px solid var(--color-line);
  border-radius: 0.4rem;
  background: var(--color-paper);
  color: var(--color-ink);
  padding: 0.3rem 0.45rem;
  font-variant-numeric: tabular-nums;
  text-align: right;
}
.field:focus {
  outline: 2px solid var(--color-brand);
  outline-offset: 1px;
}
.chip {
  border: 1px solid var(--color-line);
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  font-size: 0.75rem;
  background: var(--color-paper);
  color: var(--color-ink);
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.chip-on {
  border-color: var(--color-brand);
  background: var(--color-brand-soft);
}

/* Range slider */
.slider {
  accent-color: var(--color-brand);
  height: 1.5rem;
}

/* Toggle switch */
.switch {
  position: relative;
  flex-shrink: 0;
  width: 2.6rem;
  height: 1.5rem;
}
.switch input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
  margin: 0;
}
.switch span {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-ink) 18%, transparent);
  transition: background-color 0.2s ease;
}
.switch span::after {
  content: '';
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 999px;
  background: var(--color-paper);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}
.switch input:checked + span {
  background: var(--color-brand);
}
.switch input:checked + span::after {
  transform: translateX(1.1rem);
}
.switch input:focus-visible + span {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

/* Dot plot */
.dot {
  transition: background-color 0.25s ease, transform 0.25s ease;
}
.dot-country {
  background: var(--acc-fee);
}
.dot-other {
  background: color-mix(in srgb, var(--color-ink) 22%, transparent);
}
.marker {
  width: 0;
  height: 0;
  margin-top: -0.55rem;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 9px solid var(--color-ink);
  transition: left 0.35s ease;
}
.legend-dot {
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.legend-marker {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid var(--color-ink);
}

.insight summary::marker {
  color: var(--color-brand);
}

.summary {
  background: var(--color-paper);
  box-shadow: var(--shadow-card);
}
.seg {
  transition: width 0.4s ease;
}

.total-bar {
  position: sticky;
  bottom: 0.75rem;
  z-index: 20;
  margin-top: 1.5rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  background: var(--color-brand-dark);
  color: var(--color-paper);
  box-shadow: var(--shadow-card);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.total-bar-hidden {
  opacity: 0;
  transform: translateY(0.5rem);
  pointer-events: none;
}

@media (hover: hover) {
  .tile:hover,
  .option:hover {
    transform: translateY(-1px);
    border-color: var(--color-brand);
  }
}
@media (prefers-reduced-motion: reduce) {
  .tile,
  .option,
  .kit-row,
  .flag,
  .row,
  .chip,
  .dot,
  .marker,
  .seg,
  .switch span,
  .switch span::after,
  .total-bar {
    transition: none;
  }
  .tile:hover,
  .option:hover,
  .tile-on .flag {
    transform: none;
  }
}
</style>
