import { describe, it, expect } from 'vitest'
import {
  calculate,
  feeRange,
  feesFor,
  breakdownTotal,
  gbp,
  RESCUE_FEES,
  type CostInput,
} from '../app/utils/adoptionCosts'

const base: CostInput = {
  fee: 520,
  vetCheck: 59,
  brucellaTest: 115,
  otherTests: 0,
  kit: 150,
  gpsMonthly: 7,
  monthly: 83,
  extrasOneOff: 0,
  extrasMonthly: 0,
}

describe('calculate', () => {
  it('splits one-off and monthly costs across the periods', () => {
    const r = calculate(base)
    // one-off: 520 + 59 + 115 + 150 = 844; monthly: 83 + 7 = 90
    expect(r.getHome).toBe(520)
    expect(r.firstMonth).toBe(934)
    expect(r.firstYear).toBe(844 + 90 * 12)
    expect(r.everyYearAfter).toBe(1080)
  })

  it('treats excluded (null) and negative / NaN inputs as zero', () => {
    const r = calculate({ ...base, vetCheck: null, brucellaTest: null, gpsMonthly: null, kit: -5, otherTests: NaN })
    expect(r.firstYear).toBe(520 + 83 * 12)
  })

  it('drops empty slices and keeps slices summing to the first-year total', () => {
    const r = calculate({ ...base, kit: 0 })
    expect(r.slices.find((s) => s.key === 'kit')).toBeUndefined()
    const sum = r.slices.reduce((a, s) => a + s.amount, 0)
    expect(sum).toBeCloseTo(r.firstYear, 2)
  })

  it('works out a per-day figure over the first year', () => {
    const r = calculate({ ...base, fee: 0, vetCheck: null, brucellaTest: null, kit: 0, gpsMonthly: null, monthly: 365 / 12 })
    expect(r.perDayFirstYear).toBe(1)
  })
})

describe('data', () => {
  it('has at least one sourced rescue fee for every country', () => {
    for (const c of ['romania', 'cyprus', 'bulgaria', 'greece', 'spain'] as const) {
      expect(feesFor(c).length).toBeGreaterThan(0)
    }
  })

  it('every fee has a source and parts that add up to the total', () => {
    for (const f of RESCUE_FEES) {
      expect(f.sourceUrl).toMatch(/^https:\/\//)
      expect(f.parts.reduce((a, p) => a + p.amount, 0)).toBe(f.fee)
    }
  })

  it('has unique ids', () => {
    const ids = RESCUE_FEES.map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('computes the published fee range', () => {
    expect(feeRange()).toEqual({ min: 425, max: 1250 })
  })

  it('shows the published per-dog costs exceed the Pawprints fee', () => {
    expect(breakdownTotal()).toEqual({ min: 525, max: 610 })
  })
})

describe('gbp', () => {
  it('formats whole pounds and pennies', () => {
    expect(gbp(1234)).toBe('£1,234')
    expect(gbp(12.5)).toBe('£12.50')
  })
})
