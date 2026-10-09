import { describe, it, expect } from 'vitest'
import {
  EMPTY_FILTERS,
  activeFilterCount,
  filterAndSort,
  lowestFee,
  matches,
  type DirectoryRescue,
} from '../app/utils/rescueDirectory'

const a: DirectoryRescue = {
  path: '/rescues/a',
  name: 'Alpha Rescue',
  countries: ['romania'],
  adoptionFeeMin: 425,
  adoptionFeeMax: 525,
  feeIncludesTransport: 'true',
  charityStatus: 'registered',
  rehomesToHomesWithCats: 'case-by-case',
  rehomesWithoutGarden: 'false',
  lastVerifiedAt: '2026-10-01',
}
const b: DirectoryRescue = {
  path: '/rescues/b',
  name: 'Bravo Rescue',
  countries: ['cyprus'],
  adoptionFeeMin: 700,
  feeIncludesTransport: 'false',
  charityStatus: 'not-found',
  rehomesToHomesWithCats: 'false',
  lastVerifiedAt: '2026-10-09',
}
const c: DirectoryRescue = { path: '/rescues/c', name: 'Charlie Rescue', countries: ['romania', 'bulgaria'] }

describe('matches', () => {
  it('passes everything with empty filters', () => {
    for (const r of [a, b, c]) expect(matches(r, EMPTY_FILTERS)).toBe(true)
  })

  it('filters by country', () => {
    expect(matches(b, { ...EMPTY_FILTERS, country: 'romania' })).toBe(false)
    expect(matches(c, { ...EMPTY_FILTERS, country: 'bulgaria' })).toBe(true)
  })

  it('compares max fee against the lowest published fee, hiding unpublished fees', () => {
    expect(matches(a, { ...EMPTY_FILTERS, maxFee: 450 })).toBe(true)
    expect(matches(b, { ...EMPTY_FILTERS, maxFee: 600 })).toBe(false)
    expect(matches(c, { ...EMPTY_FILTERS, maxFee: 2000 })).toBe(false)
  })

  it('requires explicit yes for transport and registered charity', () => {
    expect(matches(a, { ...EMPTY_FILTERS, transportIncluded: true, registeredCharity: true })).toBe(true)
    expect(matches(b, { ...EMPTY_FILTERS, transportIncluded: true })).toBe(false)
    expect(matches(c, { ...EMPTY_FILTERS, registeredCharity: true })).toBe(false)
  })

  it('household filters only hide an explicit "no" — not stated stays visible', () => {
    expect(matches(b, { ...EMPTY_FILTERS, haveCats: true })).toBe(false)
    expect(matches(a, { ...EMPTY_FILTERS, haveCats: true })).toBe(true)
    expect(matches(c, { ...EMPTY_FILTERS, haveCats: true, haveChildren: true, noGarden: true })).toBe(true)
    expect(matches(a, { ...EMPTY_FILTERS, noGarden: true })).toBe(false)
  })
})

describe('filterAndSort', () => {
  it('sorts by lowest fee with unpublished fees last', () => {
    expect(filterAndSort([c, b, a], EMPTY_FILTERS, 'fee').map((r) => r.name)).toEqual(['Alpha Rescue', 'Bravo Rescue', 'Charlie Rescue'])
  })
  it('sorts by most recently verified', () => {
    expect(filterAndSort([a, b, c], EMPTY_FILTERS, 'verified')[0]!.name).toBe('Bravo Rescue')
  })
  it('sorts by name', () => {
    expect(filterAndSort([c, a, b], EMPTY_FILTERS, 'name').map((r) => r.name)).toEqual(['Alpha Rescue', 'Bravo Rescue', 'Charlie Rescue'])
  })
})

describe('helpers', () => {
  it('lowestFee falls back to max, then null', () => {
    expect(lowestFee(a)).toBe(425)
    expect(lowestFee({ ...c, adoptionFeeMax: 600 })).toBe(600)
    expect(lowestFee(c)).toBeNull()
  })
  it('counts active filters', () => {
    expect(activeFilterCount(EMPTY_FILTERS)).toBe(0)
    expect(activeFilterCount({ ...EMPTY_FILTERS, country: 'romania', haveCats: true })).toBe(2)
  })
})
