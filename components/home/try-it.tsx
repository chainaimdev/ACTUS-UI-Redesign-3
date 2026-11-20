import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { IconBadge, Section } from '@/components/section'
import { tryPanels, trySection } from '@/data/home'

export function TryIt() {
  return (
    <Section id="try-actus" {...trySection} className="bg-surface">
      <div className="grid gap-6 lg:grid-cols-2">
        {tryPanels.map((panel) => (
          <article
            key={panel.title}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-elevated p-8 pl-10 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-grad-from/10 md:p-8 md:pl-10 short:p-6 short:pl-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1.5"
              style={{ backgroundImage: 'linear-gradient(180deg, var(--grad-from), var(--grad-via), var(--grad-to))' }}
            />
            <IconBadge icon={panel.icon} size="md" />
            <h3 className="mt-4 text-2xl md:text-2xl">{panel.title}</h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-ink-muted short:mt-2">{panel.description}</p>
            <Link href={panel.cta.href} className="btn-base btn-gradient group mt-6 w-fit short:mt-4">
              {panel.cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  )
}
