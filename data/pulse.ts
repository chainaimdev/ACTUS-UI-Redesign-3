import approved from './pulse-approved.json'
import type { PulseItem } from '@/lib/pulse/types'

/** Published items. Written by Signal Desk (/desk), read at build time. */
export const pulseItems = approved as PulseItem[]

/** Pinned first, then newest first. */
export function sortPulse(items: PulseItem[]): PulseItem[] {
  return [...items].sort(
    (a, b) =>
      Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) ||
      (Date.parse(b.date ?? b.approvedAt) || 0) - (Date.parse(a.date ?? a.approvedAt) || 0),
  )
}

export const pulseSection = {
  eyebrow: 'ACTUS Pulse',
  title: 'What the industry is saying',
  description: 'News Feed from ACTUS ecosystem curated by ACTUS foundation.',
  /** Number of cards on the home page. */
  homeCount: 3,
  empty: 'No updates published yet. Check back soon.',
  readMore: { label: 'See all updates', href: '/pulse' },
}

export const pulsePage = {
  metaTitle: 'ACTUS Pulse',
  metaDescription:
    'Selected updates from regulators, central banks and the financial-standards community, curated by the ACTUS team.',
  eyebrow: 'ACTUS Pulse',
  title: 'What the industry is saying',
  description:
    'Updates from regulators, central banks and the financial-standards community, selected by the ACTUS team. Filter by who it matters to.',
  allLabel: 'All',
  empty: 'Nothing here yet. Check back soon.',
  backLabel: 'Back to home',
}
