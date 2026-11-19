/**
 * Shared types for Signal Desk (admin curation) and ACTUS Pulse (public section).
 * Kept free of data imports so the Desk client bundle never pulls in
 * data/pulse-approved.json (writing that file would otherwise reload the Desk).
 */

export const PULSE_AUDIENCES = [
  { id: 'regulators', label: 'Regulators' },
  { id: 'banks', label: 'Banks & risk' },
  { id: 'developers', label: 'Developers' },
  { id: 'tokenization', label: 'Tokenization' },
  { id: 'research', label: 'Research' },
] as const

export type PulseAudience = (typeof PULSE_AUDIENCES)[number]['id']

export const isPulseAudience = (value: unknown): value is PulseAudience =>
  PULSE_AUDIENCES.some((a) => a.id === value)

/** An approved, published item. This is the only thing that gets saved. */
export type PulseItem = {
  url: string
  title: string
  source: string
  /** ISO date of the original publication, when the source gives one. */
  date?: string
  summary?: string
  audience?: PulseAudience[]
  pinned?: boolean
  approvedAt: string
}

/** A live item fetched from a source. Never saved. */
export type Signal = {
  url: string
  title: string
  source: string
  sourceId: string
  date?: string
  summary: string
  score: number
  matched: string[]
}

export type SourceError = { sourceId: string; source: string; message: string }

export type SignalsResponse = {
  signals: Signal[]
  approved: PulseItem[]
  errors: SourceError[]
  fetchedAt: string
  writable: boolean
}
