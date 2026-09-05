const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** "2026-08-12" -> "12 August 2026". Returns '' for empty/invalid input. */
export function formatDate(iso?: string | null): string {
  if (!iso) return ''
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!m) return iso
  const [, y, mo, d] = m
  const month = MONTHS[Number(mo) - 1]
  if (!month) return iso
  return `${Number(d)} ${month} ${y}`
}

const COUNTRY_LABELS: Record<string, string> = {
  romania: 'Romania',
  cyprus: 'Cyprus',
  bulgaria: 'Bulgaria',
  greece: 'Greece',
  spain: 'Spain',
}

export function countryLabel(slug: string): string {
  return COUNTRY_LABELS[slug] || slug
}

/** For "true | false | case-by-case" policy fields. */
export function policyLabel(value?: string | null): string {
  if (value === 'true') return 'Yes'
  if (value === 'false') return 'No'
  if (value === 'case-by-case') return 'Case by case'
  return 'Not stated'
}
