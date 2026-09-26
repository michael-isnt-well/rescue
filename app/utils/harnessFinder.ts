/**
 * Bolt-Risk Harness Finder — decision engine.
 *
 * SAFETY-CRITICAL and deliberately pure (no framework imports) so it can be
 * unit-tested in isolation. The guiding principle is REDUNDANCY: for a real
 * flight risk, no single harness is "escape-proof", so the right answer is
 * layered points of contact (harness + martingale collar + double-ended lead),
 * not one clever product.
 *
 * Mandatory safety rules OVERRIDE the numeric risk score — the score can only
 * ever raise the security tier, never lower what a rule requires.
 */

export type Fear = 0 | 1 | 2 | 3
export type Morphotype = 'deep-chested' | 'standard' | 'bully-broad'
export type Environment = 0 | 1 | 2
/** 'new' = not arrived yet or home under ~3 months; 'settled' = longer. */
export type HomeStage = 'new' | 'settled'
export type Tier = 'standard' | 'high' | 'maximum'
export type GearCategory = 'harness' | 'collar' | 'lead' | 'longline' | 'tracker' | 'id-tag'
export type GearRole = 'primary' | 'backup' | 'connector' | 'addon'

export interface FinderInput {
  fear: Fear
  morphotype: Morphotype
  environment: Environment
  /** Optional for backward compatibility; treated as 'settled' when absent. */
  homeStage?: HomeStage
}

export interface RecommendedItem {
  category: GearCategory
  role: GearRole
  why: string
}

export interface Recommendation {
  tier: Tier
  tierLabel: string
  tagline: string
  score: number
  rulesTriggered: { id: string; text: string }[]
  essentials: RecommendedItem[]
  addons: RecommendedItem[]
}

const TIER_ORDER: Record<Tier, number> = { standard: 0, high: 1, maximum: 2 }
const mostSecure = (a: Tier, b: Tier): Tier => (TIER_ORDER[a] >= TIER_ORDER[b] ? a : b)

const TIER_LABEL: Record<Tier, string> = {
  standard: 'Standard secure',
  high: 'High security',
  maximum: 'Maximum security — triple-contact',
}

const TIER_TAGLINE: Record<Tier, string> = {
  standard: 'A single, well-fitted point of contact is appropriate for a settled, low-risk dog.',
  high: 'Two independent points of contact, so a single failure or a slipped harness is not the end of the walk.',
  maximum: 'Three points of contact clipped together — harness, martingale collar and a double-ended lead — so no single failure lets your dog loose.',
}

/**
 * Numeric risk score. Fear dominates; deep-chested morphology (which can reverse
 * out of gear) and busy roads add weight. Used only to RAISE the tier a rule
 * has already set — never to lower it.
 */
export function riskScore(input: FinderInput): number {
  const morphoSlip = input.morphotype === 'deep-chested' ? 2 : input.morphotype === 'bully-broad' ? 1 : 0
  return input.fear * 3 + input.environment + morphoSlip * 2
}

export function recommendSetup(input: FinderInput): Recommendation {
  const { fear, morphotype, environment } = input
  const score = riskScore(input)
  const rulesTriggered: { id: string; text: string }[] = []

  // --- Mandatory safety rules (the security floor) ---------------------------
  let tier: Tier = 'standard'

  // A busy-road environment means a single point of failure is catastrophic.
  if (environment === 2) {
    tier = mostSecure(tier, 'high')
    rulesTriggered.push({
      id: 'busy-roads',
      text: 'Near main roads, one slipped clip is catastrophic — a second, independent point of contact is required.',
    })
  }

  // Deep-chested dogs can reverse straight out of a collar or a loose harness.
  if (morphotype === 'deep-chested' && fear >= 1) {
    tier = mostSecure(tier, 'high')
    rulesTriggered.push({
      id: 'deep-chested-slip',
      text: 'Deep-chested dogs can back out of gear — a snug Y-front harness plus a backup point of contact is required.',
    })
  }

  // A newly arrived import is the classic escape risk, however calm it seems:
  // some rescues require a waist-strap harness and double-leading for every dog.
  if (input.homeStage === 'new') {
    tier = mostSecure(tier, 'high')
    rulesTriggered.push({
      id: 'new-arrival',
      text: 'A newly arrived rescue is in a strange country and hasn’t learned where home is. Some rescues require a harness with a waist strap and double-leading for every dog, so this is the minimum until your dog is settled. Your rescue’s own rules come first.',
    })
  }

  // A real flight risk needs redundancy regardless of anything else.
  if (fear >= 2) {
    tier = mostSecure(tier, 'maximum')
    rulesTriggered.push({
      id: 'flight-risk',
      text: 'For a genuine flight risk, redundancy is non-negotiable — harness, martingale collar and a double-ended lead, so if one point fails there is still a backup.',
    })
  }

  // --- Score can only RAISE the tier, never lower a rule's requirement -------
  const scoreTier: Tier = score >= 12 ? 'maximum' : score >= 6 ? 'high' : 'standard'
  tier = mostSecure(tier, scoreTier)

  // --- Build the setup for the resolved tier --------------------------------
  const essentials: RecommendedItem[] = []
  if (tier === 'standard') {
    essentials.push(
      { category: 'harness', role: 'primary', why: 'A well-fitted Y-front harness that clips at the back and does not restrict the shoulders.' },
      { category: 'lead', role: 'primary', why: 'A standard lead clipped to the harness.' },
    )
  } else if (tier === 'high') {
    essentials.push(
      { category: 'harness', role: 'primary', why: 'An escape-resistant Y-front harness, fitted snug (two fingers, no more) so it cannot be reversed out of.' },
      { category: 'collar', role: 'backup', why: 'A martingale ("limited-slip") collar as an independent second point of contact.' },
      { category: 'lead', role: 'connector', why: 'A lead — ideally double-ended — so you can clip to both the harness and the collar.' },
    )
  } else {
    essentials.push(
      { category: 'harness', role: 'primary', why: 'An escape-resistant Y-front harness, fitted snug and checked every walk — the primary point of contact.' },
      { category: 'collar', role: 'backup', why: 'A martingale ("limited-slip") collar — the independent backup that catches a slipped harness.' },
      { category: 'lead', role: 'connector', why: 'A double-ended lead clipped to BOTH the harness and the collar. This is the "triple-contact" setup: no single failure sets your dog loose.' },
    )
  }

  // --- Add-ons (situational) ------------------------------------------------
  const addons: RecommendedItem[] = [
    { category: 'id-tag', role: 'addon', why: "A legal requirement in the UK, and your dog's fastest route home — fit it before the first walk." },
  ]
  if (fear >= 1 || environment >= 1) {
    addons.push({
      category: 'tracker',
      role: 'addon',
      why: 'A GPS tracker turns "he\'s gone" into "he\'s 400m north" — strongly advised for any dog with a flight risk near roads.',
    })
  }
  if (fear >= 1) {
    addons.push({
      category: 'longline',
      role: 'addon',
      why: 'A long training line lets a decompressing dog sniff and explore safely, without any off-lead risk in the early weeks.',
    })
  }

  return {
    tier,
    tierLabel: TIER_LABEL[tier],
    tagline: TIER_TAGLINE[tier],
    score,
    rulesTriggered,
    essentials,
    addons,
  }
}
