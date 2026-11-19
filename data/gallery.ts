/**
 * Gallery content.
 *
 * PLACEHOLDER content: titles and descriptions are generic stand-ins (no real
 * event names, dates or winners). Replace each entry with real material:
 *  - `image`: path under /public (e.g. '/gallery/hackathon-2026.jpg'). When empty,
 *    the card renders generated ACTUS tile artwork in the active theme's colours.
 *  - `href`:  link to the full post or event page. When empty, the card is not a link.
 */

export type GalleryCategoryId = 'hackathons' | 'announcements' | 'community' | 'winners' | 'upcoming'

/**
 * Sections shown on the /gallery page, in this order. Categories not listed here
 * ('announcements', 'winners', 'upcoming') are kept in the data but not shown.
 * Announcements now appear in the home-page Showcase box instead.
 */
export const galleryCategories: { id: GalleryCategoryId; label: string; description: string }[] = [
  {
    id: 'hackathons',
    label: 'Use Case Competition 2026',
    description: 'Recaps and highlights from the ACTUS Use Case Competition 2026.',
  },
  { id: 'community', label: 'Community News', description: 'News from the ACTUS foundation and its members.' },
]

export type GalleryItem = {
  id: string
  category: GalleryCategoryId
  title: string
  description: string
  /** Short meta line, e.g. a date or "Date TBA". */
  meta: string
  image: string
  href: string
  /** Alt text for `image` (posters with text in them should describe it). */
  imageAlt?: string
  /** Square poster with text in it: shown whole beside the title instead of as a cropped background. */
  poster?: boolean
  /** Layout hints for the "All" view: featured = 2×2 tile, wide = 2×1 tile. */
  featured?: boolean
  wide?: boolean
}

export const gallerySection = {
  eyebrow: 'Community',
  title: 'Gallery',
  description: 'Use case competitions, past winners and what is coming next across the ACTUS community.',
  /** "Read more" button under the home-page gallery → dedicated gallery page. */
  readMore: { label: 'Read more', href: '/gallery' },
  /**
   * Items shown on the home page, in order. The first is the large primary card.
   * The /gallery page always shows every item.
   */
  homeItemIds: ['hack-1', 'ann-2'],
}

/** Copy for the dedicated /gallery page. */
export const galleryPage = {
  metaTitle: 'Gallery | ACTUS',
  metaDescription:
    'Use case competitions, announcements, previous winners and upcoming events from the ACTUS community.',
  eyebrow: 'ACTUS Community',
  title: 'Gallery',
  description:
    'Everything happening around the ACTUS standard in one place: use case competition highlights, announcements, the teams recognised at past events, and what is coming next.',
  backLabel: 'Go back to home page',
}

/* ---------- /gallery/showcase: the competition projects ---------- */

export const showcasePage = {
  metaTitle: 'Build sprint showcase | ACTUS',
  metaDescription: 'All 16 projects presented in the ACTUS Algorithmic Financial Contracts Use Case Competition.',
  eyebrow: 'Use Case Competition 2026',
  title: 'Build sprint showcase',
  description: 'All 16 projects presented in the ACTUS Algorithmic Financial Contracts Use Case Competition, in presentation order.',
  backLabel: 'Back to Gallery',
}

/**
 * Projects from the competition's solution-interview schedule: title and presenter only
 * (recording links and passcodes are private and intentionally not included).
 */
export const showcaseProjects: { title: string; presenter: string }[] = [
  { title: 'ACTUS-DRAPS: Dynamic Risk-Adaptive Portfolio Swaps for Supply Chain Finance', presenter: 'Christina Blessy' },
  { title: 'Stress Testing UBS Bank: A Unified Approach to Financial Analysis', presenter: 'Thomas Meier' },
  { title: 'An ACTUS-driven smart enterprise treasury', presenter: 'Anusha Rajesh' },
  { title: 'Debt Algorand Standard Application', presenter: 'Cosimo' },
  // Title as given in the schedule; it appears to be cut off at the start.
  { title: '9 with High-Performance portfolio projections', presenter: 'Frans van Ek' },
  { title: 'StableRisk AI: Deterministic ACTUS Simulations with AI-Driven Risk Factor Prediction for Proactive Stablecoin Reserve Management', presenter: 'Bala Murughan' },
  { title: 'ACTUS Mentor: Natural Language Contract and Risk Modeling for deterministic cashflow with AI Tutoring', presenter: 'Nishanthi' },
  // Spelled "Rodriquez" in the schedule; "Rodriguez" matches the official winner poster.
  { title: 'JACTUS: Where Finance Meets Modern AI', presenter: 'Pedro Rodriguez' },
  { title: 'Comprehensive, Standardized, Machine-Readable Contract Representation', presenter: 'Mark Flood' },
  { title: 'FinanceVM: A Sovereign, Standard-Compliant Virtual Machine for Financial Asset Tokenisation', presenter: 'Jim Lin' },
  { title: 'Risk Management in DeFi Through ACTUS-Based Liquidation Prediction and Hybrid Collateral Modeling', presenter: 'Harshanth Thangavel' },
  { title: 'Generic No-Code ACTUS Transformer', presenter: 'Krimisha Deore' },
  { title: 'Standardization of ESG Carbon Contracts and reporting Using ACTUS', presenter: 'Malarvizhi G' },
  { title: 'ACTUS-Based Liquidity and Regulatory Risk Analytics Engine', presenter: 'Qiyuan Cong' },
  { title: 'ContexQ: Graph AI for Enterprise Risk Intelligence & Financial Stability', presenter: 'Ajay Kararania / ContexQ' },
  { title: 'ACTUS OnRamp: Simplifying Data Onboarding by Mapping Real-World Contract Data into ACTUS Standards', presenter: 'Neel Khot' },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 'hack-1',
    category: 'hackathons',
    title: 'ACTUS Use Case Competition highlights',
    description: 'Teams turning financial contracts into executable code with the ACTUS standard.',
    meta: 'Event recap',
    image: '',
    href: '',
    featured: true,
  },
  {
    id: 'up-1',
    category: 'upcoming',
    title: 'Next ACTUS Use Case Competition',
    description: 'Registration details will be announced here.',
    meta: 'Date TBA',
    image: '',
    href: '',
  },
  {
    id: 'win-1',
    category: 'winners',
    title: 'Winning team spotlight',
    description: 'The top project from a past ACTUS Use Case Competition.',
    meta: 'Past edition',
    image: '',
    href: '',
  },
  {
    id: 'ann-winners',
    category: 'announcements',
    title: 'Use Case Competition winners announced',
    description:
      'Results of the ACTUS Algorithmic Financial Contracts Use Case Competition, powered by apix. Where every contract speaks the same language.',
    meta: 'Winners announcement',
    image: '/gallery/competition-winners-announcement.jpg',
    imageAlt:
      'ACTUS Algorithmic Financial Contracts Use Case Competition: Winners Announcement poster, powered by apix',
    // LinkedIn post: "Congratulations to the winners of ACTUS" (opens in a new tab)
    href: 'https://lnkd.in/p/gU85yJkn',
    poster: true,
  },
  {
    id: 'ann-1',
    category: 'announcements',
    title: 'Standard update',
    description: 'Release notes and changes to the ACTUS specification.',
    meta: 'Announcement',
    image: '',
    href: '',
    wide: true,
  },
  {
    id: 'hack-2',
    category: 'hackathons',
    title: 'Build sprint showcase',
    description: 'All 16 projects presented in the ACTUS Use Case Competition.',
    meta: 'Event recap',
    image: '',
    href: '/gallery/showcase',
  },
  {
    id: 'ann-2',
    category: 'community',
    title: 'Community news',
    description: 'News from the ACTUS foundation and its members.',
    meta: 'Announcement',
    image: '',
    href: '',
  },
  {
    id: 'win-2',
    category: 'winners',
    title: 'Honourable mentions',
    description: 'Standout entries recognised by the judges.',
    meta: 'Past edition',
    image: '',
    href: '',
  },
  {
    id: 'up-2',
    category: 'upcoming',
    title: 'Community webinar',
    description: 'A live session on applying the ACTUS standard.',
    meta: 'Date TBA',
    image: '',
    href: '',
  },
]
