<script setup lang="ts">
/**
 * Self-contained SVG map — zero dependencies, zero external requests.
 * Land outlines come from public-domain Natural Earth data, projected with the
 * SAME equirectangular projection as the pins (see scripts/gen), so land and
 * pins are aligned by construction. The five origin countries are highlighted;
 * pass `active` to emphasise one. Simple projection => mild horizontal stretch.
 */
import geo from '~/assets/europeGeo.json'

const props = defineProps<{ active?: string }>()

// viewBox 0 0 920 500. Pin points precomputed from capital lat/long.
const UK = { x: 238, y: 162 }
const POINTS: Record<string, { x: number; y: number; name: string; flag: string; ax: 'start' | 'middle' | 'end'; dx: number; dy: number }> = {
  spain: { x: 174, y: 357, name: 'Spain', flag: '🇪🇸', ax: 'end', dx: -12, dy: 5 },
  // Romania pin marks the rescue's town, Curtea de Argeș (45.14N, 24.68E), not the capital.
  romania: { x: 692, y: 274, name: 'Romania', flag: '🇷🇴', ax: 'start', dx: 13, dy: -4 },
  bulgaria: { x: 667, y: 317, name: 'Bulgaria', flag: '🇧🇬', ax: 'end', dx: -12, dy: 15 },
  greece: { x: 674, y: 400, name: 'Greece', flag: '🇬🇷', ax: 'middle', dx: 6, dy: 26 },
  cyprus: { x: 850, y: 449, name: 'Cyprus', flag: '🇨🇾', ax: 'end', dx: -12, dy: 5 },
}
const list = Object.entries(POINTS).map(([slug, p]) => ({ slug, ...p }))
const origins = geo.origins as Record<string, string>
const activePoint = computed(() => (props.active ? POINTS[props.active] : null))
</script>

<template>
  <figure
    class="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)]"
    role="img"
    :aria-label="active ? `Map showing ${POINTS[active]?.name} relative to the UK` : 'Map of the five overseas rescue countries relative to the UK'"
  >
    <svg viewBox="0 0 920 500" class="block w-full" xmlns="http://www.w3.org/2000/svg">
      <!-- sea -->
      <rect x="0" y="0" width="920" height="500" fill="#e9eff1" />
      <!-- land (context countries) -->
      <path :d="geo.land" fill="#e3dbcc" stroke="#ffffff" stroke-width="0.6" fill-rule="evenodd" />
      <!-- the five origin countries, highlighted -->
      <path
        v-for="(d, slug) in origins"
        :key="slug"
        :d="d"
        :fill="active === slug ? '#164f42' : '#1f6f5c'"
        stroke="#ffffff"
        :stroke-width="active === slug ? 1.1 : 0.8"
      />

      <!-- connector from the UK to the active country -->
      <line
        v-if="activePoint"
        :x1="UK.x" :y1="UK.y" :x2="activePoint.x" :y2="activePoint.y"
        stroke="#164f42" stroke-width="2" stroke-dasharray="5 6" opacity="0.6"
      />

      <!-- UK anchor -->
      <circle :cx="UK.x" :cy="UK.y" r="6" fill="#1c1a17" stroke="#fff" stroke-width="2" />
      <text :x="UK.x - 10" :y="UK.y - 10" text-anchor="end" font-size="20" font-weight="700" fill="#1c1a17">UK</text>

      <!-- country pins + labels -->
      <g v-for="c in list" :key="c.slug">
        <circle
          :cx="c.x" :cy="c.y" :r="active === c.slug ? 7 : 5"
          fill="#1c1a17" stroke="#fff" stroke-width="2"
        />
        <text
          :x="c.x + c.dx" :y="c.y + c.dy" :text-anchor="c.ax"
          font-size="19"
          :font-weight="active === c.slug ? 700 : 500"
          fill="#1c1a17"
        >{{ c.flag }} {{ c.name }}</text>
      </g>
    </svg>
    <figcaption class="border-t border-[var(--color-line)] bg-[var(--color-subtle)] px-4 py-2 text-xs text-[var(--color-faint)]">
      Land: public-domain Natural Earth data. Simple projection — approximate, not to scale.
    </figcaption>
  </figure>
</template>
