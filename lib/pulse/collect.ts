import { pulseConfig } from './config'
import { parseFeed } from './parse'
import { PULSE_SOURCES, type PulseSource } from './sources'
import type { Signal, SourceError } from './types'

const SUMMARY_MAX = 400

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Keywords match at the start of a word, case-insensitive ("tokeniz" matches "tokenization"). */
function matchKeywords(text: string, keywords: string[]): string[] {
  return keywords.filter((k) => new RegExp(`\\b${escapeRegex(k)}`, 'i').test(text))
}

async function readSource(source: PulseSource, timeoutMs: number, maxItems: number) {
  const res = await fetch(source.url, {
    headers: {
      'User-Agent': 'ACTUS-Pulse/1.0',
      Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
    },
    signal: AbortSignal.timeout(timeoutMs),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const entries = parseFeed(await res.text())
  if (entries.length === 0) throw new Error('No items found (feed format not recognised)')
  return entries.slice(0, maxItems)
}

export async function collectSignals(): Promise<{ signals: Signal[]; errors: SourceError[] }> {
  const cfg = pulseConfig()
  const sources = cfg.sourceIds.length ? PULSE_SOURCES.filter((s) => cfg.sourceIds.includes(s.id)) : PULSE_SOURCES

  const results = await Promise.allSettled(sources.map((s) => readSource(s, cfg.timeoutMs, cfg.maxPerSource)))

  const errors: SourceError[] = []
  const byUrl = new Map<string, Signal>()

  results.forEach((result, i) => {
    const source = sources[i]
    if (result.status === 'rejected') {
      const reason = result.reason
      errors.push({
        sourceId: source.id,
        source: `${source.publisher}: ${source.channel}`,
        message: reason instanceof Error ? reason.message : String(reason),
      })
      return
    }
    for (const entry of result.value) {
      if (byUrl.has(entry.url)) continue
      const matched = matchKeywords(`${entry.title} ${entry.summary}`, cfg.keywords)
      if (matched.length < cfg.minScore) continue
      byUrl.set(entry.url, {
        url: entry.url,
        title: entry.title,
        source: source.publisher,
        sourceId: source.id,
        date: entry.date,
        summary: entry.summary.length > SUMMARY_MAX ? `${entry.summary.slice(0, SUMMARY_MAX).trimEnd()}…` : entry.summary,
        score: matched.length,
        matched,
      })
    }
  })

  const signals = [...byUrl.values()].sort(
    (a, b) => b.score - a.score || (Date.parse(b.date ?? '') || 0) - (Date.parse(a.date ?? '') || 0),
  )
  return { signals, errors }
}
