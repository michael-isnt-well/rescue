/**
 * Rescue directory — filtering and sorting, kept pure so it can be tested.
 *
 * Honesty rule: household filters ("I have cats" etc.) only hide rescues that
 * explicitly say NO. A rescue that hasn't stated a policy stays visible —
 * "not stated" is not the same as "no".
 */

export type Policy = 'true' | 'false' | 'case-by-case' | null | undefined

export interface DirectoryRescue {
  path: string
  name: string
  countries?: string[]
  adoptionFeeMin?: number | null
  adoptionFeeMax?: number | null
  feeIncludesTransport?: 'true' | 'false' | null
  charityStatus?: 'registered' | 'not-found' | null
  rehomesToHomesWithCats?: Policy
  rehomesToHomesWithChildren?: Policy
  rehomesWithoutGarden?: Policy
  lastVerifiedAt?: string
}

export interface DirectoryFilters {
  country: string | null // null = any
  maxFee: number | null // null = any; compares against the lowest published fee
  transportIncluded: boolean
  registeredCharity: boolean
  haveCats: boolean
  haveChildren: boolean
  noGarden: boolean
}

export type SortKey = 'fee' | 'name' | 'verified'

export const EMPTY_FILTERS: DirectoryFilters = {
  country: null,
  maxFee: null,
  transportIncluded: false,
  registeredCharity: false,
  haveCats: false,
  haveChildren: false,
  noGarden: false,
}

/** Lowest published fee, or null if the rescue doesn't publish one. */
export function lowestFee(r: DirectoryRescue): number | null {
  return r.adoptionFeeMin ?? r.adoptionFeeMax ?? null
}

export function matches(r: DirectoryRescue, f: DirectoryFilters): boolean {
  if (f.country && !(r.countries || []).includes(f.country)) return false
  if (f.maxFee != null) {
    const fee = lowestFee(r)
    if (fee == null || fee > f.maxFee) return false
  }
  if (f.transportIncluded && r.feeIncludesTransport !== 'true') return false
  if (f.registeredCharity && r.charityStatus !== 'registered') return false
  if (f.haveCats && r.rehomesToHomesWithCats === 'false') return false
  if (f.haveChildren && r.rehomesToHomesWithChildren === 'false') return false
  if (f.noGarden && r.rehomesWithoutGarden === 'false') return false
  return true
}

export function filterAndSort<T extends DirectoryRescue>(list: T[], f: DirectoryFilters, sort: SortKey): T[] {
  const out = list.filter((r) => matches(r, f))
  return out.sort((a, b) => {
    if (sort === 'fee') {
      const fa = lowestFee(a)
      const fb = lowestFee(b)
      if (fa == null && fb == null) return a.name.localeCompare(b.name)
      if (fa == null) return 1 // unpublished fees last
      if (fb == null) return -1
      return fa - fb || a.name.localeCompare(b.name)
    }
    if (sort === 'verified') return (b.lastVerifiedAt || '').localeCompare(a.lastVerifiedAt || '') || a.name.localeCompare(b.name)
    return a.name.localeCompare(b.name)
  })
}

export function activeFilterCount(f: DirectoryFilters): number {
  return (Object.keys(EMPTY_FILTERS) as (keyof DirectoryFilters)[]).filter((k) => f[k] !== EMPTY_FILTERS[k]).length
}
