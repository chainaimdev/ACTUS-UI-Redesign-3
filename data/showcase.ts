/**
 * Content for the combined "Use cases · Projects · Winners" box on the home page.
 *
 * PLACEHOLDER content — every entry below is an intentionally empty slot.
 * Fill in `title`, `description` and `href` when real content is ready;
 * the components render a placeholder state for any field left empty.
 */

export type ShowcaseEntry = {
  id: string
  /** Leave empty to render the placeholder label. */
  title: string
  description: string
  /** Leave empty ('') to hide the "Read more" link. */
  href: string
}

export type ShowcaseSectionCopy = {
  eyebrow?: string
  title: string
  description?: string
}

export const useCasesSection: ShowcaseSectionCopy = {
  title: 'ACTUS Use cases',
}

export const useCaseItems: ShowcaseEntry[] = [
  { id: 'use-case-1', title: '', description: '', href: '' },
  { id: 'use-case-2', title: '', description: '', href: '' },
  { id: 'use-case-3', title: '', description: '', href: '' },
]

export const projectsSection: ShowcaseSectionCopy = {
  title: 'ACTUS Projects',
}

export const projectItems: ShowcaseEntry[] = [
  { id: 'project-1', title: '', description: '', href: '' },
  { id: 'project-2', title: '', description: '', href: '' },
  { id: 'project-3', title: '', description: '', href: '' },
]

/* ---------- Winners carousel (inside the same box, below projects) ---------- */

/** Announcements, shown at the top of the box. Items come from data/gallery.ts (category 'announcements', with an image). */
export const announcementsSection: ShowcaseSectionCopy = {
  title: 'Announcements',
}

export const winnersSection: ShowcaseSectionCopy = {
  title: 'Use Case Competition Winners',
}

export type WinnerGroup = {
  /** Country or countries, as shown on the poster. */
  country: string
  /** Winner names, comma-separated. */
  names: string
  /** Competition track. */
  track: string
}

export type WinnerEntry = {
  id: string
  /** Rank label, e.g. "TOP 1". */
  award: string
  /** Square winner poster under /public. */
  image: string
  /** Alt text describing the poster. */
  imageAlt: string
  /** Winners on this poster (one or more groups). */
  groups: WinnerGroup[]
  /** Event the award came from. */
  edition: string
  /** Optional link; leave '' for no link. */
  href: string
}

const EDITION = 'ACTUS Algorithmic Financial Contracts Use Case Competition'

/**
 * Winners of the ACTUS Algorithmic Financial Contracts Use Case Competition (powered by apix),
 * transcribed from the official posters in ACTUS-Logos/HACK-img.
 * Note: the source file names run opposite to the ranks ("Winner -3.jpeg" is TOP 1).
 */
export const winnerItems: WinnerEntry[] = [
  {
    id: 'top-1',
    award: 'TOP 1',
    image: '/winners/top-1.jpg',
    imageAlt: 'TOP 1 winner poster: Pedro N Rodriguez Hernandez, Switzerland, ACTUS Enhancements & Education',
    groups: [
      { country: 'Switzerland', names: 'Pedro N Rodriguez Hernandez', track: 'ACTUS Enhancements & Education' },
    ],
    edition: EDITION,
    href: '',
  },
  {
    id: 'top-2',
    award: 'TOP 2',
    image: '/winners/top-2.jpg',
    imageAlt:
      'TOP 2 winners poster: Cosimo Bassi, Italy, FinTech Innovation & Digital Assets; Nishanthini S, Harishmitha K, Kaviyaa N, Serin K Thomas and Dr. S. Thiliga, India, ACTUS Enhancements & Education',
    groups: [
      { country: 'Italy', names: 'Cosimo Bassi', track: 'FinTech Innovation & Digital Assets' },
      {
        country: 'India',
        names: 'Nishanthini S, Harishmitha K, Kaviyaa N, Serin K Thomas, Dr. S. Thiliga',
        track: 'ACTUS Enhancements & Education',
      },
    ],
    edition: EDITION,
    href: '',
  },
  {
    id: 'top-3',
    award: 'TOP 3',
    image: '/winners/top-3.jpg',
    imageAlt:
      'TOP 3 winners poster: Ajay Kumar Kakarania, Singapore, and Frans Van Ek, France, Risk Management & Financial Stability; Mark Flood, Elisa Kendall, Pete Rivett, Meng Weng Wong and Matt Wilson, USA, ACTUS Enhancements & Education',
    groups: [
      {
        country: 'Singapore · France',
        names: 'Ajay Kumar Kakarania, Frans Van Ek',
        track: 'Risk Management & Financial Stability',
      },
      {
        country: 'United States',
        names: 'Mark Flood, Elisa Kendall, Pete Rivett, Meng Weng Wong, Matt Wilson',
        track: 'ACTUS Enhancements & Education',
      },
    ],
    edition: EDITION,
    href: '',
  },
]

/** Winners carousel autoplay settings. */
export const winnersCarousel = {
  autoplay: true,
  intervalMs: 4500,
}
