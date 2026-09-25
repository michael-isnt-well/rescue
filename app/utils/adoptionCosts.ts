/**
 * Cost of adopting a dog from abroad — data + calculator engine.
 *
 * VERIFY, DON'T GUESS: every default below comes from a named source, checked
 * on the date in SOURCES_CHECKED. Anything we couldn't source (kit prices,
 * extra screening panels, training) is left for the user to enter and starts
 * at zero rather than at an invented "typical" figure.
 *
 * Deliberately pure (no framework imports) so it can be unit-tested.
 */

export type Country = 'romania' | 'cyprus' | 'bulgaria' | 'greece' | 'spain'
export type DogSize = 'small' | 'medium' | 'large'

export const SOURCES_CHECKED = '2026-09-25'

// ---------------------------------------------------------------------------
// Rescue fees — each from the rescue's own website. `fee` is the all-in cost
// to get the dog to the UK as published (adoption fee + any separately quoted
// transport / paperwork). `parts` shows how the rescue itself splits it.
// ---------------------------------------------------------------------------

export interface RescueFee {
  id: string
  rescue: string
  country: Country
  variant: string // "Adult dog", "Puppy"...
  fee: number
  approx?: boolean // rescue itself says "around" / "approximately" / "minimum"
  parts: { label: string; amount: number }[]
  note: string
  sourceUrl: string
  profilePath?: string // our own rescue profile, where one exists
}

export const RESCUE_FEES: RescueFee[] = [
  // Romania
  {
    id: 'pawprints',
    rescue: 'Pawprints to Freedom',
    country: 'romania',
    variant: 'Any dog',
    fee: 520,
    parts: [{ label: 'Adoption fee (transport included)', amount: 520 }],
    note: 'Covers transport, vaccinations, microchip, pet passport and neutering. The rescue says it can vary by dog and location.',
    sourceUrl: 'https://www.pawprints2freedom.co.uk/adopt',
    profilePath: '/rescues/pawprints-to-freedom',
  },
  {
    id: 'paws2rescue',
    rescue: 'Paws2Rescue',
    country: 'romania',
    variant: 'Dog or puppy',
    fee: 525,
    parts: [{ label: 'Adoption fee (transport included)', amount: 525 }],
    note: 'Covers blood tests, vaccinations, microchip, passport, vet checks and transport. The dog’s own neutering is not included. Dogs over 8 are £425.',
    sourceUrl: 'https://paws2rescue.com/adoption/',
  },
  {
    id: 'paws2rescue-senior',
    rescue: 'Paws2Rescue',
    country: 'romania',
    variant: 'Dog over 8',
    fee: 425,
    parts: [{ label: 'Adoption fee (transport included)', amount: 425 }],
    note: 'Reduced fee for dogs over the age of 8, same inclusions as the standard fee.',
    sourceUrl: 'https://paws2rescue.com/adoption/',
  },
  {
    id: 'adgs',
    rescue: 'All Dogs Great and Small Rescue',
    country: 'romania',
    variant: 'Any dog',
    fee: 505,
    approx: true,
    parts: [
      { label: 'Adoption donation', amount: 250 },
      { label: 'Transport (approx.)', amount: 255 },
    ],
    note: 'Donation covers neutering, vet check, passport, microchip, vaccinations, parasite treatment and 4DX and Brucella tests. Transport to England & Wales is quoted separately at about £255.',
    sourceUrl: 'https://www.all-dogs-great-and-small-rescue.com/adoption-process',
  },
  // Cyprus
  {
    id: 'saving-souls-adult',
    rescue: 'Saving Souls Animal Rescue',
    country: 'cyprus',
    variant: 'Adult dog',
    fee: 720,
    approx: true,
    parts: [{ label: 'Typical adoption fee (flight included)', amount: 720 }],
    note: 'Covers the flight, vaccinations, neutering, passport, microchip, pre-flight check and disease testing. Varies with each shelter’s Brucella test cost.',
    sourceUrl: 'https://www.savingsoulsrescue.org/about-saving-souls-animal-rescue/',
  },
  {
    id: 'saving-souls-puppy',
    rescue: 'Saving Souls Animal Rescue',
    country: 'cyprus',
    variant: 'Puppy',
    fee: 670,
    approx: true,
    parts: [{ label: 'Typical adoption fee (flight included)', amount: 670 }],
    note: 'Same preparation as adults, with blood testing adjusted for age.',
    sourceUrl: 'https://www.savingsoulsrescue.org/about-saving-souls-animal-rescue/',
  },
  {
    id: 'jodies',
    rescue: 'Jodie’s Cyprus Dogs Rehoming',
    country: 'cyprus',
    variant: 'Any dog',
    fee: 705,
    parts: [
      { label: 'Deposit (non-refundable)', amount: 220 },
      { label: 'Adoption fee', amount: 385 },
      { label: 'TRACES & customs', amount: 100 },
    ],
    note: 'Total rehoming fee of £705. The deposit is only refunded if the home check fails.',
    sourceUrl: 'https://www.jodiescyprusdogsrehoming.co.uk/adopt-or-foster/how-to-adopt',
  },
  {
    id: 'dali-adult',
    rescue: 'Dali Dog Rescue UK',
    country: 'cyprus',
    variant: 'Adult dog',
    fee: 610,
    parts: [
      { label: 'Adoption fee', amount: 225 },
      { label: 'Flights, transport & paperwork', amount: 385 },
    ],
    note: 'Adoption fee covers neutering, vaccinations, microchip, parasite treatment, fit-to-fly check and passport.',
    sourceUrl: 'https://www.dalidogrescue.uk/help-advice/how-much-to-rescue-dog-abroad',
  },
  {
    id: 'dali-puppy',
    rescue: 'Dali Dog Rescue UK',
    country: 'cyprus',
    variant: 'Puppy',
    fee: 540,
    parts: [
      { label: 'Adoption fee', amount: 155 },
      { label: 'Flights, transport & paperwork', amount: 385 },
    ],
    note: 'Puppy adoption fee is lower; travel costs are the same.',
    sourceUrl: 'https://www.dalidogrescue.uk/help-advice/how-much-to-rescue-dog-abroad',
  },
  // Bulgaria
  {
    id: 'santerpaws',
    rescue: 'Santerpaws Bulgarian Rescue',
    country: 'bulgaria',
    variant: 'Any dog',
    fee: 430,
    parts: [
      { label: 'Deposit (non-refundable)', amount: 40 },
      { label: 'Balance when transport is booked', amount: 390 },
    ],
    note: 'Total adoption fee of £430, including transport to the UK.',
    sourceUrl: 'https://santerpawsbulgarianrescue.com/adoption-application/',
  },
  {
    id: 'precious-pups',
    rescue: 'Rescue Dogs for Adoption (Precious Pups Provadia)',
    country: 'bulgaria',
    variant: 'Most dogs',
    fee: 650,
    approx: true,
    parts: [{ label: 'Adoption fee (delivery included)', amount: 650 }],
    note: '“Most adoption fees are £650”, covering passport, microchip, vaccinations, neutering if old enough, and delivery to you.',
    sourceUrl: 'https://www.rescuedogsforadoption.co.uk/',
  },
  // Greece
  {
    id: 'healing-paws',
    rescue: 'Healing Paws Animal Rescue (Zakynthos)',
    country: 'greece',
    variant: 'Any dog',
    fee: 680,
    approx: true,
    parts: [
      { label: 'Adoption donation (minimum)', amount: 190 },
      { label: 'Transport (approx.)', amount: 430 },
      { label: 'Health certificate & customs', amount: 60 },
    ],
    note: 'Donation covers registration, microchip, passport, parasite treatment, vaccinations and blood tests for leishmaniasis, dirofilaria, ehrlichia and anaplasma. Transport is paid to the transporter.',
    sourceUrl: 'https://healingpawsanimalrescue.com/the-adoption-process/',
  },
  // Spain
  {
    id: 'aa-dog-rescue',
    rescue: 'AA Dog Rescue',
    country: 'spain',
    variant: 'Dog or puppy',
    fee: 480,
    parts: [
      { label: 'Deposit (non-refundable)', amount: 200 },
      { label: 'Balance before transport', amount: 280 },
    ],
    note: 'Includes adoption and transport, neutering where age-appropriate, microchip, vaccinations and parasite treatment.',
    sourceUrl: 'https://www.aadogrescue.org.uk/how-to-adopt',
  },
  {
    id: 'hope-for-podencos',
    rescue: 'Hope for Podencos',
    country: 'spain',
    variant: 'Any dog',
    fee: 760,
    parts: [{ label: 'Adoption fee (transport included)', amount: 760 }],
    note: 'Includes vet care, vaccinations, microchip, neutering where appropriate, disease testing, documents, transport, and a collar and harness.',
    sourceUrl: 'https://www.hopeforpodencos.com/adoption-process',
  },
  {
    id: 'project-galgo',
    rescue: 'Project Galgo',
    country: 'spain',
    variant: 'Galgo or podenco',
    fee: 1250,
    parts: [
      { label: 'Adoption fee', amount: 750 },
      { label: 'Transport to England/Wales', amount: 500 },
    ],
    note: 'Fee includes a safety kit and three months’ use of a GPS tracker. Transport to Scotland is £550.',
    sourceUrl: 'https://projectgalgo.com/about-project-galgo/about-dog-adoption/',
  },
]

export const COUNTRY_META: Record<Country, { name: string; flag: string }> = {
  romania: { name: 'Romania', flag: '🇷🇴' },
  cyprus: { name: 'Cyprus', flag: '🇨🇾' },
  bulgaria: { name: 'Bulgaria', flag: '🇧🇬' },
  greece: { name: 'Greece', flag: '🇬🇷' },
  spain: { name: 'Spain', flag: '🇪🇸' },
}

export function feesFor(country: Country): RescueFee[] {
  return RESCUE_FEES.filter((f) => f.country === country)
}

export function feeRange(fees: RescueFee[] = RESCUE_FEES): { min: number; max: number } {
  const all = fees.map((f) => f.fee)
  return { min: Math.min(...all), max: Math.max(...all) }
}

// ---------------------------------------------------------------------------
// Where the money goes — Pawprints to Freedom publishes its per-dog costs.
// Ranges as published; customs agent fees are listed without a figure.
// ---------------------------------------------------------------------------

export const FEE_BREAKDOWN = {
  rescue: 'Pawprints to Freedom',
  fee: 520,
  sourceUrl: 'https://www.pawprints2freedom.co.uk/adopt',
  items: [
    { label: 'Transport to the UK', min: 225, max: 260 },
    { label: 'Tests & vaccinations', min: 130, max: 170 },
    { label: 'Brucellosis test', min: 92, max: 92 },
    { label: 'Spay / neuter', min: 35, max: 45 },
    { label: 'Import fee', min: 20, max: 20 },
    { label: 'Passport, microchip & health book', min: 10, max: 10 },
    { label: 'Tick & flea treatment', min: 8, max: 8 },
    { label: 'Microchip contact change', min: 5, max: 5 },
  ],
}

export function breakdownTotal(): { min: number; max: number } {
  return FEE_BREAKDOWN.items.reduce(
    (acc, i) => ({ min: acc.min + i.min, max: acc.max + i.max }),
    { min: 0, max: 0 },
  )
}

// ---------------------------------------------------------------------------
// After arrival — sourced defaults and ranges.
// ---------------------------------------------------------------------------

export const VET_CHECK = {
  default: 59,
  min: 49,
  max: 83,
  label: 'Median published dog consultation price at Medivet practices',
  sourceName: 'Compare Vet Pricing (Medivet, 11 Sept 2026)',
  sourceUrl: 'https://comparevetpricing.co.uk/groups/medivet/prices/consultation',
}

export const BRUCELLA_TEST = {
  default: 115,
  min: 87,
  max: 177,
  quotes: [
    { practice: 'Mulberry House Vets', price: 87.42, url: 'https://mulberryhousevets.co.uk/brucellosis-in-dogs/' },
    { practice: 'Greenbay Vets', price: 115, url: 'https://www.greenbayvets.co.uk/brucella-canis-information/' },
    { practice: 'Taylor Vets', price: 177, url: 'https://taylor.vet/imported-pet-information/' },
  ],
}

export const GPS_PLANS = [
  { id: 'basic-2y', label: '2-year Basic', monthly: 4.5 },
  { id: 'basic-1y', label: '1-year Basic', monthly: 7 },
  { id: 'basic-monthly', label: 'Monthly Basic', monthly: 13.5 },
] as const
export const GPS_SOURCE = { name: 'Tractive plans page', url: 'https://tractive.com/en/c/plans' }

// PDSA minimum monthly running costs (calculated 2024): health checks,
// boosters, flea/worm treatment, insurance, food, toys, poo bags, toothpaste.
export const PDSA_MONTHLY: Record<DogSize, number> = { small: 69, medium: 83, large: 116 }
// PDSA minimum lifetime costs (2024).
export const PDSA_LIFETIME: Record<DogSize, { min: number; max: number }> = {
  small: { min: 6200, max: 12000 },
  medium: { min: 9000, max: 14000 },
  large: { min: 8200, max: 18800 },
}
export const PDSA_SOURCE = {
  name: 'PDSA — the cost of owning a dog',
  url: 'https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/puppies-dogs/the-cost-of-owning-a-dog',
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

export interface CostInput {
  fee: number
  vetCheck: number | null // null = not included
  brucellaTest: number | null
  otherTests: number
  kit: number
  gpsMonthly: number | null
  monthly: number
  extrasOneOff: number
  extrasMonthly: number
}

export type SliceKey = 'fee' | 'arrival' | 'kit' | 'running' | 'gps' | 'extras'

export interface CostResult {
  getHome: number
  firstMonth: number
  firstYear: number
  everyYearAfter: number
  perDayFirstYear: number
  slices: { key: SliceKey; label: string; amount: number }[]
}

const clamp = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0)
const round2 = (n: number) => Math.round(n * 100) / 100

export function calculate(input: CostInput): CostResult {
  const fee = clamp(input.fee)
  const arrival = clamp(input.vetCheck ?? 0) + clamp(input.brucellaTest ?? 0) + clamp(input.otherTests)
  const kit = clamp(input.kit)
  const monthly = clamp(input.monthly)
  const gps = clamp(input.gpsMonthly ?? 0)
  const extrasOneOff = clamp(input.extrasOneOff)
  const extrasMonthly = clamp(input.extrasMonthly)

  const oneOff = fee + arrival + kit + extrasOneOff
  const perMonth = monthly + gps + extrasMonthly

  const firstYear = oneOff + perMonth * 12

  return {
    getHome: round2(fee),
    firstMonth: round2(oneOff + perMonth),
    firstYear: round2(firstYear),
    everyYearAfter: round2(perMonth * 12),
    perDayFirstYear: round2(firstYear / 365),
    slices: [
      { key: 'fee' as const, label: 'Adoption & transport', amount: round2(fee) },
      { key: 'arrival' as const, label: 'Vet check & tests', amount: round2(arrival) },
      { key: 'kit' as const, label: 'Kit & home', amount: round2(kit) },
      { key: 'running' as const, label: 'Running costs (12 months)', amount: round2(monthly * 12) },
      { key: 'gps' as const, label: 'GPS tracker (12 months)', amount: round2(gps * 12) },
      { key: 'extras' as const, label: 'Training & extras', amount: round2(extrasOneOff + extrasMonthly * 12) },
    ].filter((s) => s.amount > 0),
  }
}

/** "£1,234" (or "£12.50" when there are pennies). */
export function gbp(n: number): string {
  const hasPennies = Math.round(n * 100) % 100 !== 0
  return (
    '£' +
    n.toLocaleString('en-GB', {
      minimumFractionDigits: hasPennies ? 2 : 0,
      maximumFractionDigits: hasPennies ? 2 : 0,
    })
  )
}
