/**
 * Sources Signal Desk reads from. Only feeds whose URLs were confirmed on the
 * publisher's own feed-listing page are included:
 *   - https://www.federalreserve.gov/feeds/feeds.htm
 *   - https://www.ecb.europa.eu/home/html/rss.en.html
 *
 * To add a source: add one entry here. Any RSS 2.0 or Atom feed works.
 * To turn sources off without editing code: PULSE_SOURCES=fed-press,ecb-blog
 */

export type PulseSource = {
  id: string
  /** Publisher name shown on cards. */
  publisher: string
  /** Which feed of that publisher. Shown on the Desk only. */
  channel: string
  url: string
}

export const PULSE_SOURCES: PulseSource[] = [
  {
    id: 'fed-press',
    publisher: 'Federal Reserve',
    channel: 'Press releases',
    url: 'https://www.federalreserve.gov/feeds/press_all.xml',
  },
  {
    id: 'fed-speeches',
    publisher: 'Federal Reserve',
    channel: 'Speeches',
    url: 'https://www.federalreserve.gov/feeds/speeches.xml',
  },
  {
    id: 'fed-feds-notes',
    publisher: 'Federal Reserve',
    channel: 'FEDS Notes (research)',
    url: 'https://www.federalreserve.gov/feeds/feds_notes.xml',
  },
  {
    id: 'ecb-press',
    publisher: 'European Central Bank',
    channel: 'Press, speeches, interviews',
    url: 'https://www.ecb.europa.eu/rss/press.html',
  },
  {
    id: 'ecb-blog',
    publisher: 'European Central Bank',
    channel: 'Blog',
    url: 'https://www.ecb.europa.eu/rss/blog.html',
  },
  {
    id: 'ecb-pub',
    publisher: 'European Central Bank',
    channel: 'Publications',
    url: 'https://www.ecb.europa.eu/rss/pub.html',
  },
]
