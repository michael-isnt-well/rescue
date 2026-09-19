import { describe, it, expect } from 'vitest'
import {
  recommendSetup,
  riskScore,
  type FinderInput,
  type Recommendation,
} from '../app/utils/harnessFinder'

const rec = (i: FinderInput): Recommendation => recommendSetup(i)
const ruleIds = (r: Recommendation) => r.rulesTriggered.map((x) => x.id)
const categories = (items: { category: string }[]) => items.map((i) => i.category)

describe('riskScore', () => {
  it('is zero for a calm, standard dog in a quiet place', () => {
    expect(riskScore({ fear: 0, morphotype: 'standard', environment: 0 })).toBe(0)
  })
  it('is driven mostly by fear', () => {
    expect(riskScore({ fear: 3, morphotype: 'standard', environment: 0 })).toBe(9)
  })
  it('weights deep-chested morphology and busy roads', () => {
    // fear 1 (*3) + env 2 + deep-chested (2*2) = 3 + 2 + 4
    expect(riskScore({ fear: 1, morphotype: 'deep-chested', environment: 2 })).toBe(9)
  })
})

describe('tier selection', () => {
  it('recommends standard for a settled, low-risk dog', () => {
    const r = rec({ fear: 0, morphotype: 'standard', environment: 0 })
    expect(r.tier).toBe('standard')
    expect(r.rulesTriggered).toHaveLength(0)
    expect(categories(r.essentials)).toEqual(['harness', 'lead'])
  })

  it('floors at high security near busy roads even for a calm dog', () => {
    const r = rec({ fear: 0, morphotype: 'standard', environment: 2 })
    expect(r.tier).toBe('high')
    expect(ruleIds(r)).toContain('busy-roads')
  })

  it('floors at high security for an anxious deep-chested dog', () => {
    const r = rec({ fear: 1, morphotype: 'deep-chested', environment: 0 })
    expect(r.tier).toBe('high')
    expect(ruleIds(r)).toContain('deep-chested-slip')
  })

  it('mandates maximum (triple-contact) for a flight risk', () => {
    const r = rec({ fear: 2, morphotype: 'standard', environment: 0 })
    expect(r.tier).toBe('maximum')
    expect(ruleIds(r)).toContain('flight-risk')
    // triple-contact = harness + collar + lead
    expect(categories(r.essentials)).toEqual(['harness', 'collar', 'lead'])
  })

  it('stacks every rule for a severe flight risk near main roads', () => {
    const r = rec({ fear: 3, morphotype: 'deep-chested', environment: 2 })
    expect(r.tier).toBe('maximum')
    expect(ruleIds(r).sort()).toEqual(['busy-roads', 'deep-chested-slip', 'flight-risk'])
  })
})

describe('safety invariant: a rule can never be downgraded by the score', () => {
  it('keeps maximum for a flight risk in a quiet field, even though the score alone is only "high"', () => {
    const input: FinderInput = { fear: 2, morphotype: 'standard', environment: 0 }
    // score = 6 which alone maps to "high"...
    expect(riskScore(input)).toBe(6)
    // ...but the flight-risk rule forces maximum.
    expect(rec(input).tier).toBe('maximum')
  })

  it('never returns standard when any mandatory rule has fired', () => {
    const inputs: FinderInput[] = []
    for (const fear of [0, 1, 2, 3] as const) {
      for (const morphotype of ['deep-chested', 'standard', 'bully-broad'] as const) {
        for (const environment of [0, 1, 2] as const) {
          inputs.push({ fear, morphotype, environment })
        }
      }
    }
    for (const i of inputs) {
      const r = rec(i)
      if (r.rulesTriggered.length > 0) {
        expect(r.tier).not.toBe('standard')
      }
      if (r.tier === 'maximum') {
        // maximum is always the triple-contact set
        expect(categories(r.essentials)).toEqual(['harness', 'collar', 'lead'])
      }
    }
  })
})

describe('add-ons', () => {
  it('always recommends an ID tag', () => {
    const r = rec({ fear: 0, morphotype: 'standard', environment: 0 })
    expect(categories(r.addons)).toContain('id-tag')
  })
  it('recommends a GPS tracker once there is any fear or traffic', () => {
    expect(categories(rec({ fear: 0, morphotype: 'standard', environment: 0 }).addons)).not.toContain('tracker')
    expect(categories(rec({ fear: 1, morphotype: 'standard', environment: 0 }).addons)).toContain('tracker')
    expect(categories(rec({ fear: 0, morphotype: 'standard', environment: 1 }).addons)).toContain('tracker')
  })
  it('recommends a long line for a dog with any fear (decompression walks)', () => {
    expect(categories(rec({ fear: 0, morphotype: 'standard', environment: 2 }).addons)).not.toContain('longline')
    expect(categories(rec({ fear: 1, morphotype: 'standard', environment: 0 }).addons)).toContain('longline')
  })
})
