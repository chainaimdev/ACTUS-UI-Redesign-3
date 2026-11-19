import Link from 'next/link'
import { Section } from '@/components/section'
import { ActusLogo } from '@/components/actus-logo'
import { partners, partnersSection } from '@/data/partners'

export function PoweredBy() {
  return (
    <Section id="partners" {...partnersSection}>
      <ul className="grid gap-6 md:grid-cols-3">
        {partners.map((partner) => {
          const body = (
            <>
              <div className="flex h-32 items-center justify-center border-b border-border px-8">
                {/* alt="" because the name is printed right below the logo */}
                <ActusLogo variant={partner.logo} alt="" className="h-14 max-w-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-lg">{partner.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{partner.caption}</p>
              </div>
            </>
          )
          return (
            <li key={partner.id} className="card-brand">
              {partner.href ? (
                <Link href={partner.href} className="block rounded-[inherit]">
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
