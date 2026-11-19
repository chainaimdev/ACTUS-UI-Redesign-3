export type NavLink = {
  label: string
  href: string
}

export type NavItem = NavLink & {
  children?: NavLink[]
}

export type FooterColumn = {
  title: string
  links: NavLink[]
}

/** Header button; opens a small dropdown with these options. Links starting with http open in a new tab. */
export const primaryCta: NavItem = {
  label: 'Explore ACTUS',
  href: '/standards/demo-app',
  children: [
    { label: 'Learn ACTUS', href: 'https://documentation.actusfrf.org/docs/quickstart' },
    { label: 'Setup ACTUS', href: '/developers/community-edition' },
  ],
}

export const mainNav: NavItem[] = [
  {
    label: 'Standards',
    href: '/standards',
    children: [
      { label: 'Fundamentals', href: '/standards/fundamentals' },
      { label: 'Taxonomy', href: '/standards/taxonomy' },
      { label: 'Data Dictionary', href: '/standards/data-dictionary' },
      { label: 'Applicability', href: '/standards/applicability' },
      { label: 'Rules', href: '/standards/rules' },
      { label: 'Technical Specification', href: '/standards/technical-specification' },
      { label: 'Demo App', href: '/standards/demo-app' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Background', href: '/about/background' },
      { label: 'ACTUS Foundation', href: '/about/foundation' },
      { label: 'ACTUS Board', href: '/about/board' },
      { label: 'Contributors', href: '/about/contributors' },
      { label: 'Resources', href: '/about/resources' },
    ],
  },
  { label: 'Developers', href: '/developers' },
  {
    label: 'Work Groups',
    href: '/work-groups',
    children: [
      { label: 'User Forum', href: '/work-groups/user-forum' },
      { label: 'Standards', href: '/work-groups/standards' },
      { label: 'Events', href: '/work-groups/events' },
    ],
  },
  { label: 'Membership', href: '/membership' },
  { label: 'Gallery', href: '/gallery' },
  {
    label: 'Updates',
    href: '/news',
    children: [
      { label: 'News', href: '/news' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  { label: 'Contact', href: '#contact' },
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Standards',
    links: mainNav[0].children ?? [],
  },
  {
    title: 'About',
    links: mainNav[1].children ?? [],
  },
  {
    title: 'Community',
    links: [
      { label: 'Work Groups', href: '/work-groups' },
      { label: 'User Forum', href: '/work-groups/user-forum' },
      { label: 'Events', href: '/work-groups/events' },
      { label: 'Membership', href: '/membership' },
      { label: 'News', href: '/news' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Developers', href: '/developers' },
      { label: 'Documentation', href: '/developers/documentation' },
      { label: 'ACTUS Code', href: '/developers/code' },
      { label: 'Community Edition', href: '/developers/community-edition' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]
