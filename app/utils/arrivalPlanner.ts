/**
 * Arrival planner — dated checklist + calendar export for an overseas rescue.
 *
 * Every task is anchored to the arrival date by a day offset. Facts in the
 * `detail` text carry a source; timings that are plain good practice (e.g.
 * "set up a safe space a few days before") are presented as suggestions.
 *
 * Deliberately pure (no framework imports) so it can be unit-tested.
 */

export type Phase = 'before' | 'arrival' | 'settling' | 'health' | 'year'

export interface TaskDef {
  id: string
  phase: Phase
  offset: number // days relative to arrival day (0)
  title: string
  detail: string
  link?: { label: string; to: string } // internal page
  source?: { label: string; url: string }
}

export const PHASES: { id: Phase; label: string; blurb: string }[] = [
  { id: 'before', label: 'Before arrival', blurb: 'Get the essentials sorted while you wait.' },
  { id: 'arrival', label: 'Arrival day', blurb: 'Calm, secure, and straight home.' },
  { id: 'settling', label: 'The first three weeks', blurb: 'Cover kicks in; let your dog decompress.' },
  { id: 'health', label: 'Follow-up health checks', blurb: 'Some infections take months to show up on a test.' },
  { id: 'year', label: 'One year home', blurb: 'Renewals, and a milestone worth celebrating.' },
]

const LANGFORD = {
  label: 'Langford Vets — recommended testing for imported dogs',
  url: 'https://www.langfordvets.co.uk/animal-insights/dogs-puppies/recommended-testing-for-imported-dogs/',
}
const APHA = {
  label: 'APHA — bringing new pets into Great Britain responsibly',
  url: 'https://aphascience.blog.gov.uk/2025/07/23/bringing-new-pets-into-great-britain-responsibly',
}
const GOV_MICROCHIP = { label: 'GOV.UK — get your dog microchipped', url: 'https://www.gov.uk/get-your-dog-microchipped' }

export const TASKS: TaskDef[] = [
  // Before
  {
    id: 'vet',
    phase: 'before',
    offset: -21,
    title: 'Choose a vet and register',
    detail:
      'Tell the practice your dog is coming from abroad and ask about their policy for imported dogs. Some have one: a practice we checked charges a protective-clothing fee on each visit if a Brucella canis test is declined.',
    source: { label: 'Mulberry House Vets — Brucella canis', url: 'https://mulberryhousevets.co.uk/brucellosis-in-dogs/' },
  },
  {
    id: 'kit',
    phase: 'before',
    offset: -14,
    title: 'Get the escape-resistant kit',
    detail:
      'A frightened new arrival is a bolt risk. Work out how much redundancy your dog needs, from one well-fitted harness up to harness plus martingale collar plus a double-ended lead.',
    link: { label: 'Bolt-Risk Harness Finder', to: '/tools/harness-fit-finder' },
  },
  {
    id: 'tag',
    phase: 'before',
    offset: -14,
    title: 'Order an ID tag',
    detail: 'By law, a dog must wear a collar and tag with your name and address in a public place, even though it’s microchipped.',
    source: GOV_MICROCHIP,
  },
  {
    id: 'insurance',
    phase: 'before',
    offset: -7,
    title: 'Arrange insurance to start on arrival day',
    detail:
      'Buy the policy now but set the start date to arrival day: some policies don’t begin until the dog is in your possession. Check the exclusions for leishmaniasis before you buy.',
    link: { label: 'Pet insurance for an imported rescue dog', to: '/guides/insurance-for-imported-dogs' },
  },
  {
    id: 'paperwork',
    phase: 'before',
    offset: -7,
    title: 'Ask the rescue for the paperwork',
    detail:
      'Pet passport, vaccination records and any test results. Your insurer and your vet will both want them, and they record when boosters are due.',
  },
  {
    id: 'budget',
    phase: 'before',
    offset: -7,
    title: 'Check your first-year budget',
    detail: 'Fee, first vet visit, tests, kit and running costs, all in one place.',
    link: { label: 'Adoption Cost Calculator', to: '/tools/adoption-cost-calculator' },
  },
  {
    id: 'space',
    phase: 'before',
    offset: -3,
    title: 'Set up a safe space and check the garden',
    detail:
      'A quiet crate or corner your dog can retreat to, and a walk round the fence line for gaps, low sections and gates that don’t latch.',
  },
  {
    id: 'handover',
    phase: 'before',
    offset: -1,
    title: 'Plan the handover',
    detail:
      'Your dog must be delivered to the address on the import paperwork: collecting from a service station or car park is illegal. Agree with the rescue and driver who puts the harness and slip lead on, then go straight into a fully enclosed space.',
    link: { label: 'Transport day', to: '/guides/transport-day' },
    source: APHA,
  },
  // Arrival
  {
    id: 'arrive',
    phase: 'arrival',
    offset: 0,
    title: 'Arrival day',
    detail:
      'Insurance starts today. By law your dog must stay at the delivery address for at least 48 hours, so no walks or trips out. Keep it quiet: no visitors, and on-lead in any space that isn’t fully secure.',
    link: { label: 'Transport day', to: '/guides/transport-day' },
    source: APHA,
  },
  {
    id: 'microchip',
    phase: 'arrival',
    offset: 0,
    title: 'Update the microchip registration',
    detail:
      'You must make sure your dog’s microchip details are updated to you. Ask the rescue whether they transfer it or you need to contact the database.',
    source: GOV_MICROCHIP,
  },
  // Settling
  {
    id: 'accident-cover',
    phase: 'settling',
    offset: 2,
    title: 'Accident cover usually begins',
    detail: 'Some insurers exclude accidents in the first 2 days (or 48 hours) of a new policy.',
    link: { label: 'Waiting periods explained', to: '/guides/insurance-for-imported-dogs' },
  },
  {
    id: 'vet-check',
    phase: 'settling',
    offset: 5,
    title: 'First vet health check',
    detail:
      'Your UK baseline: it records your dog’s condition at the start of cover. Take the passport and the rescue’s records, and ask about screening tests and boosters.',
  },
  {
    id: 'boosters',
    phase: 'settling',
    offset: 7,
    title: 'Check when vaccination boosters are due',
    detail:
      'Look in the pet passport. Some policies won’t pay for an illness your dog wasn’t kept vaccinated against, such as distemper, hepatitis, leptospirosis and parvovirus.',
    link: { label: 'Conditions that can void a claim', to: '/guides/insurance-for-imported-dogs' },
  },
  {
    id: 'illness-cover',
    phase: 'settling',
    offset: 14,
    title: 'Illness waiting period ends',
    detail:
      'The policies we checked all exclude illness that first shows in the first 14 days. Note anything you noticed before today and mention it to your vet.',
    link: { label: 'Waiting periods explained', to: '/guides/insurance-for-imported-dogs' },
  },
  {
    id: 'three-weeks',
    phase: 'settling',
    offset: 21,
    title: 'Three weeks home',
    detail: 'The end of the first three weeks, a milestone in the decompression guide. A good moment to take stock of how your dog is settling.',
    link: { label: 'The first three weeks', to: '/guides/decompression-first-three-weeks' },
  },
  // Health follow-ups
  {
    id: 'brucella',
    phase: 'health',
    offset: 90,
    title: 'Ask your vet about a Brucella canis test',
    detail:
      'Antibodies to Brucella canis can take up to 3 months after exposure to become detectable, so a test around now can pick up an infection an earlier test missed.',
    source: LANGFORD,
  },
  {
    id: 'leishmania',
    phase: 'health',
    offset: 150,
    title: 'Ask your vet about Leishmania testing',
    detail:
      'Only around half of infected dogs have detectable Leishmania antibodies 5 months after exposure, and some take up to 2 years, so your vet may suggest testing again later.',
    source: LANGFORD,
  },
  {
    id: 'heartworm',
    phase: 'health',
    offset: 210,
    title: 'Ask about a heartworm test',
    detail: 'It takes 6–7 months for adult heartworms to appear. Langford recommends heartworm testing for imported dogs over 6 months old.',
    source: LANGFORD,
  },
  // One year
  {
    id: 'dental',
    phase: 'year',
    offset: 330,
    title: 'Book a dental check',
    detail: 'Some policies require a vet dental check at least every 12 months. Worth doing anyway.',
    link: { label: 'Conditions that can void a claim', to: '/guides/insurance-for-imported-dogs' },
  },
  {
    id: 'anniversary',
    phase: 'year',
    offset: 365,
    title: 'One year home 🎉',
    detail: 'Your insurance renews around now: compare the renewal, and check nothing new has been excluded.',
  },
]

// ---------------------------------------------------------------------------
// Dates (all UTC-date arithmetic on YYYY-MM-DD strings — no timezone drift)
// ---------------------------------------------------------------------------

export function isIsoDate(s: string | null | undefined): s is string {
  if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
  const d = new Date(`${s}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((Date.parse(`${toIso}T00:00:00Z`) - Date.parse(`${fromIso}T00:00:00Z`)) / 86_400_000)
}

export interface PlannedTask extends TaskDef {
  date: string
  daysFromToday: number
}

export function planFor(arrival: string, today: string, tasks: TaskDef[] = TASKS): PlannedTask[] {
  return tasks
    .map((t) => {
      const date = addDays(arrival, t.offset)
      return { ...t, date, daysFromToday: daysBetween(today, date) }
    })
    .sort((a, b) => a.offset - b.offset)
}

/** Human label for an offset: "3 weeks before", "Arrival day", "Day 14", "5 months". */
export function offsetLabel(offset: number): string {
  if (offset === 0) return 'Arrival day'
  if (offset < 0) {
    const d = -offset
    if (d % 7 === 0) return `${d / 7} week${d === 7 ? '' : 's'} before`
    return `${d} day${d === 1 ? '' : 's'} before`
  }
  if (offset >= 365 && offset % 365 === 0) return `${offset / 365} year${offset === 365 ? '' : 's'}`
  if (offset >= 60) return `${Math.round(offset / 30)} months`
  return `Day ${offset}`
}

// ---------------------------------------------------------------------------
// iCalendar export (RFC 5545) — all-day events, one per task.
// ---------------------------------------------------------------------------

function icsEscape(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

/** Fold content lines to 75 octets as the spec requires. */
function fold(line: string): string {
  const bytes = new TextEncoder().encode(line)
  if (bytes.length <= 75) return line
  const out: string[] = []
  let current = ''
  let size = 0
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length
    if (size + n > (out.length ? 74 : 75)) {
      out.push(current)
      current = ''
      size = 0
    }
    current += ch
    size += n
  }
  out.push(current)
  return out.join('\r\n ')
}

export function buildIcs(
  tasks: PlannedTask[],
  opts: { dogName?: string; siteUrl: string; stamp: string },
): string {
  const name = opts.dogName?.trim()
  const dtstamp = opts.stamp.replace(/[-:]/g, '').replace(/\.\d+/, '')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rescue Journey//Arrival Planner//EN',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${icsEscape(name ? `${name}'s arrival plan` : 'Rescue dog arrival plan')}`,
  ]
  for (const t of tasks) {
    const start = t.date.replace(/-/g, '')
    const end = addDays(t.date, 1).replace(/-/g, '')
    const url = t.link ? `${opts.siteUrl}${t.link.to}` : t.source?.url
    lines.push(
      'BEGIN:VEVENT',
      `UID:${t.id}-${start}@rescuejourney.co.uk`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${icsEscape(name ? `${name}: ${t.title}` : t.title)}`,
      `DESCRIPTION:${icsEscape(t.detail + (url ? `\n\n${url}` : ''))}`,
      ...(url ? [`URL:${url}`] : []),
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')
  return lines.map(fold).join('\r\n') + '\r\n'
}
