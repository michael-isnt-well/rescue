import { describe, it, expect } from 'vitest'
import { TASKS, PHASES, addDays, daysBetween, isIsoDate, planFor, buildIcs, offsetLabel } from '../app/utils/arrivalPlanner'

describe('date helpers', () => {
  it('adds days across month and year ends', () => {
    expect(addDays('2026-09-26', 14)).toBe('2026-10-10')
    expect(addDays('2026-12-25', 7)).toBe('2027-01-01')
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28')
  })

  it('counts days between dates', () => {
    expect(daysBetween('2026-09-26', '2026-10-10')).toBe(14)
    expect(daysBetween('2026-10-10', '2026-09-26')).toBe(-14)
  })

  it('validates ISO dates', () => {
    expect(isIsoDate('2026-09-26')).toBe(true)
    expect(isIsoDate('2026-02-30')).toBe(false)
    expect(isIsoDate('26/09/2026')).toBe(false)
    expect(isIsoDate(null)).toBe(false)
  })
})

describe('offsetLabel', () => {
  it('labels offsets in plain English', () => {
    expect(offsetLabel(-21)).toBe('3 weeks before')
    expect(offsetLabel(-7)).toBe('1 week before')
    expect(offsetLabel(-1)).toBe('1 day before')
    expect(offsetLabel(0)).toBe('Arrival day')
    expect(offsetLabel(14)).toBe('Day 14')
    expect(offsetLabel(90)).toBe('3 months')
    expect(offsetLabel(365)).toBe('1 year')
  })
})

describe('planFor', () => {
  const plan = planFor('2026-09-26', '2026-09-20')

  it('dates every task relative to arrival, in order', () => {
    expect(plan).toHaveLength(TASKS.length)
    expect(plan.find((t) => t.id === 'arrive')!.date).toBe('2026-09-26')
    expect(plan.find((t) => t.id === 'illness-cover')!.date).toBe('2026-10-10')
    expect(plan.find((t) => t.id === 'brucella')!.date).toBe('2026-12-25')
    const offsets = plan.map((t) => t.offset)
    expect([...offsets].sort((a, b) => a - b)).toEqual(offsets)
  })

  it('knows how far each task is from today', () => {
    expect(plan.find((t) => t.id === 'arrive')!.daysFromToday).toBe(6)
    expect(plan.find((t) => t.id === 'vet')!.daysFromToday).toBe(-15)
  })
})

describe('task data', () => {
  it('has unique ids and a known phase for every task', () => {
    const ids = TASKS.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
    const phases = new Set(PHASES.map((p) => p.id))
    for (const t of TASKS) expect(phases.has(t.phase)).toBe(true)
  })

  it('keeps phases consistent with offsets', () => {
    for (const t of TASKS) {
      if (t.phase === 'before') expect(t.offset).toBeLessThan(0)
      if (t.phase === 'arrival') expect(t.offset).toBe(0)
      if (t.phase !== 'before' && t.phase !== 'arrival') expect(t.offset).toBeGreaterThan(0)
    }
  })

  it('links only to internal paths and sources to https', () => {
    for (const t of TASKS) {
      if (t.link) expect(t.link.to).toMatch(/^\/[a-z]/)
      if (t.source) expect(t.source.url).toMatch(/^https:\/\//)
    }
  })
})

describe('buildIcs', () => {
  const plan = planFor('2026-09-26', '2026-09-20')
  const ics = buildIcs(plan, { dogName: 'Barnie', siteUrl: 'https://rescuejourney.co.uk', stamp: '2026-09-26T12:00:00.000Z' })

  it('produces a calendar with one all-day event per task', () => {
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true)
    expect(ics.trimEnd().endsWith('END:VCALENDAR')).toBe(true)
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(TASKS.length)
    expect(ics).toContain('DTSTART;VALUE=DATE:20260926')
    expect(ics).toContain('DTEND;VALUE=DATE:20260927')
    expect(ics).toContain('DTSTAMP:20260926T120000Z')
  })

  it('personalises titles and escapes special characters', () => {
    expect(ics).toContain('SUMMARY:Barnie: Arrival day')
    expect(ics).not.toMatch(/SUMMARY:[^\r]*[^\\],/)
  })

  it('folds every line to 75 octets', () => {
    for (const line of ics.split('\r\n')) {
      expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75)
    }
  })
})
