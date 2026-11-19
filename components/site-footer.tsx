import Link from 'next/link'
import { ActusLogo } from '@/components/actus-logo'
import { NewsletterForm } from '@/components/newsletter-form'
import { footerColumns } from '@/data/navigation'
import { foundationInfo, socialLinks } from '@/data/home'

/** Brand marks drawn inline (24×24, single path) so they follow the footer text colour. */
const SOCIAL_ICON_PATHS: Record<(typeof socialLinks)[number]['id'], string> = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
}

export function SiteFooter() {
  return (
    <footer className="bg-footer text-white">
      <div aria-hidden="true" className="h-1 w-full" style={{ backgroundImage: 'var(--brand-gradient)' }} />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ActusLogo variant="foundation" tone="reverse" className="h-14 sm:h-16" />
            <p className="mt-4 max-w-sm leading-relaxed text-white/75">{foundationInfo.tagline}</p>
            <div className="mt-8">
              <h2 className="font-heading text-base font-semibold text-white">Sign up for news</h2>
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Site map" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">{column.title}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="rounded-sm text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-8 text-sm text-white/70 sm:flex-row sm:justify-between">
          <p>{`© ${foundationInfo.copyrightYear} ${foundationInfo.name}`}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p>{foundationInfo.location}</p>
            <ul className="flex items-center gap-3" aria-label="ACTUS on social media">
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-white"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                      <path d={SOCIAL_ICON_PATHS[social.id]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
