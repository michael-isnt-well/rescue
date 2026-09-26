<script setup lang="ts">
import type { Phase, PlannedTask } from '~/utils/arrivalPlanner'

const SITE = 'https://rescuejourney.co.uk'
const KEY = 'arrival-planner-v1'

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const arrival = ref('') // YYYY-MM-DD, '' until chosen
const dogName = ref('')
const done = reactive<Record<string, boolean>>({})
const open = reactive<Record<string, boolean>>({})
const today = ref<string | null>(null) // set on the client only

function localIso(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const hasDate = computed(() => isIsoDate(arrival.value))
const name = computed(() => dogName.value.trim())
const dogLabel = computed(() => name.value || 'your dog')
const DogLabel = computed(() => name.value || 'Your dog')

const plan = computed<PlannedTask[] | null>(() =>
  hasDate.value && today.value ? planFor(arrival.value, today.value) : null,
)

// Without a date (and on the server), show relative timings only.
const rows = computed(() =>
  (plan.value ?? TASKS.map((t) => ({ ...t, date: '', daysFromToday: NaN }))).slice().sort((a, b) => a.offset - b.offset),
)
const byPhase = computed(() =>
  PHASES.map((p) => ({ ...p, tasks: rows.value.filter((t) => t.phase === p.id) })).filter((p) => p.tasks.length),
)

const daysToArrival = computed(() => (hasDate.value && today.value ? daysBetween(today.value, arrival.value) : null))
const doneCount = computed(() => TASKS.filter((t) => done[t.id]).length)
const pct = computed(() => Math.round((doneCount.value / TASKS.length) * 100))

const nextUp = computed(() => {
  if (!plan.value) return null
  return plan.value.find((t) => !done[t.id] && t.daysFromToday >= 0) ?? null
})
const overdue = computed(() => (plan.value ? plan.value.filter((t) => !done[t.id] && t.daysFromToday < 0).length : 0))

// Where to draw the "today" marker: before the first task dated today or later.
const todayMarkerBefore = computed(() => {
  if (!plan.value) return null
  const first = plan.value.find((t) => t.daysFromToday >= 0)
  return first && plan.value[0]!.id !== first.id ? first.id : null
})

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------
function fmtDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
function relative(days: number) {
  if (days === 0) return 'today'
  if (days === 1) return 'tomorrow'
  if (days === -1) return 'yesterday'
  const abs = Math.abs(days)
  const unit = abs >= 60 ? `${Math.round(abs / 30)} months` : abs >= 14 ? `${Math.round(abs / 7)} weeks` : `${abs} days`
  return days > 0 ? `in ${unit}` : `${unit} ago`
}

const PHASE_ICON: Record<Phase, string> = {
  before: '📋',
  arrival: '🚐',
  settling: '🏡',
  health: '🩺',
  year: '🎂',
}

// ---------------------------------------------------------------------------
// Persistence: URL (?d=&n=) for sharing, localStorage for ticks
// ---------------------------------------------------------------------------
onMounted(() => {
  today.value = localIso()
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (saved) {
      if (isIsoDate(saved.arrival)) arrival.value = saved.arrival
      if (typeof saved.name === 'string') dogName.value = saved.name.slice(0, 30)
      if (saved.done && typeof saved.done === 'object') Object.assign(done, saved.done)
    }
  } catch {
    /* storage unavailable */
  }
  try {
    const p = new URLSearchParams(window.location.search)
    const d = p.get('d')
    if (isIsoDate(d)) arrival.value = d
    const n = p.get('n')
    if (n) dogName.value = n.slice(0, 30)
  } catch {
    /* ignore */
  }
})

watch(
  [arrival, dogName, done],
  () => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ arrival: arrival.value, name: dogName.value, done: { ...done } }))
    } catch {
      /* ignore */
    }
  },
  { deep: true },
)

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
function toggle(id: string) {
  done[id] = !done[id]
}

function downloadIcs() {
  if (!plan.value) return
  const ics = buildIcs(plan.value, { dogName: name.value, siteUrl: SITE, stamp: new Date().toISOString() })
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${(name.value || 'rescue-dog').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-arrival-plan.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const copied = ref(false)
async function copyLink() {
  const p = new URLSearchParams()
  if (hasDate.value) p.set('d', arrival.value)
  if (name.value) p.set('n', name.value)
  try {
    await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${p.toString()}`)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    /* clipboard blocked */
  }
}

function printPlan() {
  window.print()
}

function resetTicks() {
  for (const k of Object.keys(done)) delete done[k]
}
</script>

<template>
  <div class="planner">
    <!-- Inputs -->
    <div class="grid gap-3 sm:grid-cols-2 print:hidden">
      <label class="field-wrap">
        <span class="text-sm font-semibold">Arrival date</span>
        <input v-model="arrival" type="date" class="field mt-1.5" aria-describedby="date-hint" />
        <span id="date-hint" class="mt-1 block text-xs text-[var(--color-muted)]">Your best estimate is fine. Change it any time.</span>
      </label>
      <label class="field-wrap">
        <span class="text-sm font-semibold">Dog’s name <span class="font-normal text-[var(--color-muted)]">(optional)</span></span>
        <input v-model="dogName" type="text" maxlength="30" placeholder="e.g. Barnie" class="field mt-1.5" autocomplete="off" />
      </label>
    </div>

    <!-- Status -->
    <div class="status mt-6 rounded-[var(--radius-lg)] p-5 sm:p-6">
      <template v-if="daysToArrival === null">
        <p class="eyebrow">Your plan</p>
        <p class="display mt-1 text-2xl">Add an arrival date to put this on a calendar</p>
        <p class="mt-2 text-sm text-[var(--color-muted)]">
          Below is the full checklist with timings relative to arrival day. Add a date to get real dates, a countdown
          and a calendar you can import.
        </p>
      </template>
      <template v-else>
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="eyebrow">{{ daysToArrival > 0 ? 'Countdown' : daysToArrival === 0 ? 'Today’s the day' : 'Home and settling' }}</p>
            <p class="mt-1 font-display text-[2.4rem] leading-none tabular-nums">
              <template v-if="daysToArrival > 0">{{ daysToArrival }} <span class="text-xl">day{{ daysToArrival === 1 ? '' : 's' }}</span></template>
              <template v-else-if="daysToArrival === 0">🐾</template>
              <template v-else>Day {{ -daysToArrival }}</template>
            </p>
            <p class="mt-2 text-sm">
              <template v-if="daysToArrival > 0">until {{ dogLabel }} arrives on {{ fmtDate(arrival) }}</template>
              <template v-else-if="daysToArrival === 0">{{ DogLabel }} arrives today. Keep it calm and quiet.</template>
              <template v-else>{{ DogLabel }} has been home {{ -daysToArrival }} day{{ daysToArrival === -1 ? '' : 's' }}</template>
            </p>
          </div>
          <div class="min-w-[9rem] flex-1 sm:max-w-[14rem]">
            <div class="flex justify-between text-xs text-[var(--color-muted)]">
              <span>{{ doneCount }} of {{ TASKS.length }} done</span><span>{{ pct }}%</span>
            </div>
            <div class="mt-1 h-2.5 overflow-hidden rounded-full bg-[var(--color-subtle)]">
              <div class="bar h-full rounded-full bg-[var(--color-brand)]" :style="{ width: `${pct}%` }" />
            </div>
          </div>
        </div>

        <div v-if="nextUp" class="next mt-5 rounded-lg p-3 text-sm">
          <span class="font-semibold">Next up · {{ relative(nextUp.daysFromToday) }}:</span> {{ nextUp.title }}
        </div>
        <p v-if="overdue" class="mt-2 text-xs text-[var(--color-warn)]">
          {{ overdue }} earlier item{{ overdue === 1 ? '' : 's' }} not ticked yet. Still worth doing if you haven’t.
        </p>

        <div class="mt-5 flex flex-wrap gap-2 print:hidden">
          <button type="button" class="btn btn-primary text-sm" @click="downloadIcs">Add to my calendar (.ics)</button>
          <button type="button" class="btn btn-ghost text-sm" @click="copyLink">{{ copied ? 'Link copied ✓' : 'Copy share link' }}</button>
          <button type="button" class="btn btn-ghost text-sm" @click="printPlan">Print</button>
        </div>
      </template>
    </div>

    <!-- Timeline -->
    <div class="mt-8 space-y-8">
      <section v-for="phase in byPhase" :key="phase.id" :aria-labelledby="`phase-${phase.id}`">
        <div class="flex items-center gap-2">
          <span class="text-xl" aria-hidden="true">{{ PHASE_ICON[phase.id] }}</span>
          <h2 :id="`phase-${phase.id}`" class="display text-xl">{{ phase.label }}</h2>
        </div>
        <p class="ml-8 text-sm text-[var(--color-muted)]">{{ phase.blurb }}</p>

        <ol class="timeline mt-3">
          <template v-for="t in phase.tasks" :key="t.id">
            <li v-if="todayMarkerBefore === t.id" class="today-marker" aria-label="Today">
              <span>Today</span>
            </li>
            <li
              class="task"
              :class="{
                'task-done': done[t.id],
                'task-overdue': plan && !done[t.id] && t.daysFromToday < 0,
                'task-today': plan && t.daysFromToday === 0,
              }"
            >
              <button
                type="button"
                class="tick print:hidden"
                role="checkbox"
                :aria-checked="!!done[t.id]"
                :aria-label="`Mark “${t.title}” as done`"
                @click="toggle(t.id)"
              >
                <span aria-hidden="true">{{ done[t.id] ? '✓' : '' }}</span>
              </button>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span class="when">
                    <template v-if="t.date">{{ fmtDate(t.date) }}</template>
                    <template v-else>{{ offsetLabel(t.offset) }}</template>
                  </span>
                  <span v-if="t.date && !done[t.id]" class="text-xs text-[var(--color-faint)]">{{ relative(t.daysFromToday) }}</span>
                </div>
                <button type="button" class="task-title mt-0.5 text-left" :aria-expanded="!!open[t.id]" @click="open[t.id] = !open[t.id]">
                  {{ t.title }}
                  <span class="chev print:hidden" :class="{ 'chev-open': open[t.id] }" aria-hidden="true">›</span>
                </button>
                <div v-show="open[t.id]" class="detail mt-1.5 text-sm text-[var(--color-muted)]">
                  <p>{{ t.detail }}</p>
                  <p v-if="t.link || t.source" class="mt-1.5 flex flex-wrap gap-x-3 text-xs">
                    <NuxtLink v-if="t.link" :to="t.link.to" class="underline">{{ t.link.label }} →</NuxtLink>
                    <a v-if="t.source" :href="t.source.url" target="_blank" rel="noopener" class="underline">Source: {{ t.source.label }}</a>
                  </p>
                </div>
              </div>
            </li>
          </template>
        </ol>
      </section>
    </div>

    <p v-if="doneCount" class="mt-6 text-center print:hidden">
      <button type="button" class="text-xs text-[var(--color-muted)] underline" @click="resetTicks">Clear all ticks</button>
    </p>
  </div>
</template>

<style scoped>
.field-wrap {
  display: block;
}
.field {
  display: block;
  width: 100%;
  border: 1px solid var(--color-line);
  border-radius: 0.5rem;
  background: var(--color-paper);
  color: var(--color-ink);
  padding: 0.55rem 0.7rem;
  font-size: 1rem;
  color-scheme: light dark;
}
.field:focus {
  outline: 2px solid var(--color-brand);
  outline-offset: 1px;
}
.status {
  background: var(--color-brand-soft);
  border: 1px solid color-mix(in srgb, var(--color-brand) 25%, transparent);
}
.next {
  background: var(--color-paper);
  border: 1px solid var(--color-line);
}
.bar {
  transition: width 0.4s ease;
}

/* Timeline */
.timeline {
  position: relative;
  margin-left: 0.75rem;
  padding-left: 1.4rem;
  border-left: 2px solid var(--color-line);
}
.task {
  position: relative;
  display: flex;
  gap: 0.75rem;
  padding: 0.6rem 0;
}
.tick {
  position: absolute;
  left: -2.15rem;
  top: 0.7rem;
  display: grid;
  place-items: center;
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 999px;
  border: 2px solid var(--color-line);
  background: var(--color-paper);
  color: var(--color-paper);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
}
.tick:hover {
  border-color: var(--color-brand);
}
.tick:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
.task-done .tick {
  background: var(--color-brand);
  border-color: var(--color-brand);
  transform: scale(1.05);
}
.task-done .task-title {
  text-decoration: line-through;
  text-decoration-color: var(--color-faint);
  color: var(--color-muted);
}
.task-today .tick {
  border-color: var(--color-brand);
  box-shadow: 0 0 0 4px var(--color-brand-soft);
}
.task-overdue .when {
  color: var(--color-warn);
}
.when {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-brand-dark);
}
.task-title {
  font-weight: 600;
  color: var(--color-ink);
}
.chev {
  display: inline-block;
  margin-left: 0.2rem;
  color: var(--color-faint);
  transition: transform 0.2s ease;
}
.chev-open {
  transform: rotate(90deg);
}
.today-marker {
  position: relative;
  margin: 0.4rem 0 0.4rem -1.4rem;
  border-top: 2px dashed var(--color-brand);
}
.today-marker span {
  position: absolute;
  top: -0.7rem;
  left: 0.6rem;
  padding: 0 0.4rem;
  background: var(--color-paper);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-brand-dark);
}

@media print {
  .detail {
    display: block !important;
  }
  .status {
    border: 1px solid #ccc;
    background: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .bar,
  .tick,
  .chev {
    transition: none;
  }
}
</style>
