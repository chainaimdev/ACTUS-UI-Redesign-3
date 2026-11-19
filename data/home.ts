import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Building2,
  Code2,
  Download,
  FileCode2,
  GraduationCap,
  Landmark,
  Layers,
  LibraryBig,
  MonitorPlay,
  Network,
  Scale,
  ScrollText,
  Users,
  Briefcase,
  Workflow,
  Zap,
} from 'lucide-react'

export type Cta = { label: string; href: string }

export type FeatureCard = {
  title: string
  description: string
  icon: LucideIcon
  cta: Cta
}

export type AudienceTile = {
  title: string
  benefit: string
  icon: LucideIcon
}

export type ResourceTile = {
  title: string
  href: string
  icon: LucideIcon
}

export const hero = {
  eyebrow: 'Algorithmic Contract Types™',
  headline: 'Finance speaks one language',
  subheadline: 'Empowering efficient, transparent and consistent financial ecosystems',
  primaryCta: { label: 'Explore the Standard', href: '/standards' },
  secondaryCta: { label: 'Try Community Edition', href: '/developers/community-edition' },
  /** One-line caption under the hero illustration. */
  illustrationCaption: 'From legal terms to cash flows, in one standard language.',
}

/**
 * Hero picture options for the "View" dropdown above the hero illustration.
 * The first entry is the default. Each has its own one-line caption.
 */
export const heroIllustrations = [
  { id: 'cashflows', label: 'Contract to cash flows', caption: 'From legal terms to cash flows, in one standard language.' },
  { id: 'types', label: 'Contract types', caption: 'One taxonomy for every contract, from loans to derivatives.' },
  { id: 'events', label: 'Event timeline', caption: 'Every contract event, on one timeline, computed one way.' },
  { id: 'scenarios', label: 'Risk scenarios', caption: 'Change the scenario, never the contract.' },
  { id: 'ecosystem', label: 'Shared ecosystem', caption: 'Banks, regulators and ledgers, reading one contract.' },
] as const

export type HeroIllustrationId = (typeof heroIllustrations)[number]['id']

export const whatIsSection = {
  eyebrow: 'Overview',
  title: 'What is ACTUS?',
  description:
    'Algorithmic Contract Types Unified Standards — an open, machine-readable standard for financial contracts, and the foundation that stewards ACTUS.',
}

export const whatIsCards: FeatureCard[] = [
  {
    title: 'The Foundation',
    description:
      'The ACTUS Financial Research Foundation is the non-profit organization that stewards, maintains and advances the ACTUS standard together with industry, academia and regulators.',
    icon: Landmark,
    cta: { label: 'Learn more', href: '/about/foundation' },
  },
  {
    title: 'The ACTUS Standard',
    description:
      'A standardized, machine-readable way to express how financial contracts behave — from simple loans to complex derivatives — so systems can simulate and analyze them without relying on legal text or custom code.',
    icon: FileCode2,
    cta: { label: 'Learn more', href: '/standards/fundamentals' },
  },
]

export const audienceSection = {
  eyebrow: 'Impact',
  title: 'Why is ACTUS important?',
  description: 'One shared contract language creates value for everyone across the financial system.',
}

export const audienceTiles: AudienceTile[] = [
  // TODO(client): confirm benefit wording for each audience.
  {
    title: 'FinTech & DeFi',
    benefit: 'Build interoperable products on contract logic that is precise and verifiable.',
    icon: Zap,
  },
  {
    title: 'Consultants & Vendors',
    benefit: 'Deliver solutions faster on a common, vendor-neutral contract model.',
    icon: Briefcase,
  },
  {
    title: 'Financial Institutions',
    benefit: 'Generate consistent cash flows for risk, finance and reporting from one source.',
    icon: Building2,
  },
  {
    title: 'Regulators',
    benefit: 'Gain transparent, comparable insight into exposures across the system.',
    icon: Scale,
  },
  {
    title: 'Education & Research',
    benefit: 'Teach and study financial contracts with an open, rigorous reference.',
    icon: GraduationCap,
  },
]

export const trySection = {
  eyebrow: 'Get started',
  title: 'How can you try ACTUS?',
  description: 'Explore how ACTUS fits your organization, or run the reference implementation yourself.',
}

export const tryPanels: FeatureCard[] = [
  {
    title: 'How to use ACTUS in your firm',
    description:
      'Understand where ACTUS adds value — from risk and treasury to regulatory reporting — and plan an adoption path that fits your existing systems and data.',
    icon: Workflow,
    cta: { label: 'Read the adoption guide', href: 'https://documentation.actusfrf.org/docs/quickstart' },
  },
  {
    title: 'ACTUS Service Community Edition',
    description:
      'Download and run the open-source ACTUS service locally. Simulate contract events and cash flows through a simple API in minutes.',
    icon: Download,
    cta: { label: 'Download & run', href: '/developers/community-edition' },
  },
]

export const resourceTiles: ResourceTile[] = [
  { title: 'ACTUS Taxonomy', href: '/standards/taxonomy', icon: Network },
  { title: 'Data Dictionary', href: '/standards/data-dictionary', icon: LibraryBig },
  { title: 'Documentation', href: '/developers/documentation', icon: BookOpen },
  { title: 'Demo App', href: '/standards/demo-app', icon: Layers },
  { title: 'ACTUS Code', href: '/developers/code', icon: Code2 },
]

export const involvedCards: FeatureCard[] = [
  {
    title: 'Join and Contribute to ACTUS!',
    description:
      'Become a member, join a work group and help shape the future of the standard alongside industry and academic partners.',
    icon: Users,
    cta: { label: 'Become a member', href: '/membership' },
  },
  {
    title: 'ACTUS Reference Documentation',
    description:
      'Dive into the technical specification, contract type definitions and the full data dictionary.',
    icon: ScrollText,
    cta: { label: 'Browse documentation', href: '/standards/technical-specification' },
  },
  {
    title: 'ACTUS Training, Media, Webinars',
    description:
      'Learn at your own pace with recorded webinars, talks, training material and media coverage.',
    icon: MonitorPlay,
    cta: { label: 'Start learning', href: '/about/resources' },
  },
]

export const contactSection = {
  eyebrow: 'Contact',
  title: 'Connect with ACTUS',
  description:
    'Questions about the standard, membership or partnerships? Send us a message and the foundation team will get back to you.',
}

export const foundationInfo = {
  name: 'ACTUS Financial Research Foundation',
  location: '1507 Blue Meadow Road, Rockville, MD 20854 USA',
  tagline: 'Algorithmic Contract Types Unified Standards',
  /** Footer copyright year: "© 2019 ACTUS Financial Research Foundation". */
  copyrightYear: '2019',
}

/** Foundation social profiles, shown at the end of the footer. Each opens in a new tab. */
export const socialLinks = [
  { id: 'linkedin', label: 'ACTUS Research on LinkedIn', href: 'https://www.linkedin.com/company/actus-research/' },
  { id: 'x', label: 'ACTUS Research on X', href: 'https://x.com/ActusResearch' },
] as const
