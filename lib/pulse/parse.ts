/**
 * Dependency-free RSS 2.0 / Atom reader. It extracts only the four fields
 * Signal Desk needs (title, link, date, summary) and does not attempt to be a
 * general XML parser. If a source needs more, swap this module for a full
 * parser (e.g. fast-xml-parser) behind the same `parseFeed` signature.
 */

export type FeedEntry = {
  title: string
  url: string
  date?: string
  summary: string
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
}

export function decodeEntities(input: string): string {
  return input.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === '#') {
      const hex = entity[1] === 'x' || entity[1] === 'X'
      const code = hex ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match
  })
}

const unwrapCdata = (s: string) => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')

/** CDATA → entities → strip tags → entities again (for escaped HTML) → tidy spaces. */
export function toPlainText(raw: string): string {
  const once = decodeEntities(unwrapCdata(raw))
  const stripped = once.replace(/<[^>]*>/g, ' ')
  return decodeEntities(stripped).replace(/\s+/g, ' ').trim()
}

function firstTag(block: string, names: string[]): string | undefined {
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const match = block.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)</${escaped}>`, 'i'))
    if (match) return match[1]
  }
  return undefined
}

function atomHref(block: string): string | undefined {
  const links = block.match(/<link\b[^>]*>/gi) ?? []
  const preferred = links.find((l) => /rel=["']alternate["']/i.test(l)) ?? links.find((l) => !/rel=/i.test(l)) ?? links[0]
  return preferred?.match(/href=["']([^"']+)["']/i)?.[1]
}

function toIsoDate(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  const time = Date.parse(toPlainText(raw))
  return Number.isNaN(time) ? undefined : new Date(time).toISOString()
}

const isHttpUrl = (s: string) => /^https?:\/\//i.test(s)

export function parseFeed(xml: string): FeedEntry[] {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? []

  return blocks
    .map((block) => {
      const linkText = toPlainText(firstTag(block, ['link']) ?? '')
      const guid = toPlainText(firstTag(block, ['guid', 'id']) ?? '')
      const raw = [linkText, decodeEntities(atomHref(block) ?? ''), guid].find(isHttpUrl) ?? ''
      // Some feeds (e.g. ECB) emit "host//path"; collapse repeated slashes after the host.
      const url = raw.replace(/^(https?:\/\/[^/]+)\/{2,}/i, '$1/')

      return {
        title: toPlainText(firstTag(block, ['title']) ?? ''),
        url,
        date: toIsoDate(firstTag(block, ['pubDate', 'dc:date', 'published', 'updated'])),
        summary: toPlainText(firstTag(block, ['description', 'summary', 'content']) ?? ''),
      }
    })
    .filter((entry) => entry.title && entry.url)
}
