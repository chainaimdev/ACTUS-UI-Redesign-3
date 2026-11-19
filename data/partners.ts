import type { ActusLogoVariant } from '@/components/actus-logo'

export const partnersSection = {
  eyebrow: 'Partners',
  title: 'Powered by ACTUS',
  description: 'The organisations behind the ACTUS standard, and the mark for solutions built on it.',
}

export type PartnerEntry = {
  id: string
  logo: ActusLogoVariant
  name: string
  caption: string
  /** Optional link; leave '' to render the tile without a link. */
  href: string
}

export const partners: PartnerEntry[] = [
  {
    id: 'foundation',
    logo: 'foundation',
    name: 'ACTUS Research Foundation',
    caption: 'Stewards and publishes the ACTUS standard.',
    href: '',
  },
  {
    id: 'association',
    logo: 'association',
    name: 'ACTUS Users Association',
    caption: 'The community of organisations putting ACTUS into practice.',
    href: '',
  },
  {
    id: 'powered-by',
    logo: 'poweredBy',
    name: 'Powered by ACTUS',
    caption: 'The mark for products and services built on the ACTUS standard.',
    href: '',
  },
]
