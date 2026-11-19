/**
 * Server-side configuration, read from environment variables (all optional).
 *
 *   DESK_ENABLED            true | false   Default: true in `next dev`, false in production.
 *   PULSE_SOURCES           comma list of source ids from lib/pulse/sources.ts. Empty = all.
 *   PULSE_KEYWORDS          comma list. Replaces DEFAULT_KEYWORDS.
 *   PULSE_MIN_SCORE         number of matched keywords an item needs to reach the Desk. Default 0 (show all, ranked).
 *   PULSE_MAX_PER_SOURCE    newest N items read from each source. Default 25.
 *   PULSE_FETCH_TIMEOUT_MS  per-source timeout. Default 10000.
 */

export const DEFAULT_KEYWORDS = [
  'ACTUS',
  'algorithmic contract',
  'financial contract',
  'smart contract',
  'tokeniz',
  'tokenis',
  'digital asset',
  'distributed ledger',
  'DLT',
  'blockchain',
  'data standard',
  'financial data',
  'systemic risk',
  'stablecoin',
  'CBDC',
  'digital euro',
  'settlement',
]

const list = (value: string | undefined, fallback: string[]) =>
  value
    ? value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : fallback

const num = (value: string | undefined, fallback: number) => {
  const n = Number(value)
  return value !== undefined && Number.isFinite(n) ? n : fallback
}

export function pulseConfig() {
  const deskDefault = process.env.NODE_ENV === 'production' ? 'false' : 'true'
  return {
    deskEnabled: (process.env.DESK_ENABLED ?? deskDefault).toLowerCase() === 'true',
    sourceIds: list(process.env.PULSE_SOURCES, []),
    keywords: list(process.env.PULSE_KEYWORDS, DEFAULT_KEYWORDS),
    minScore: num(process.env.PULSE_MIN_SCORE, 0),
    maxPerSource: num(process.env.PULSE_MAX_PER_SOURCE, 25),
    timeoutMs: num(process.env.PULSE_FETCH_TIMEOUT_MS, 10_000),
  }
}
