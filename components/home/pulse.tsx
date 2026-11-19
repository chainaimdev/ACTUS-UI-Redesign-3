import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Pin } from 'lucide-react'
import { Section } from '@/components/section'
import { pulseItems, pulseSection, sortPulse } from '@/data/pulse'
import { PULSE_AUDIENCES, type PulseItem } from '@/lib/pulse/types'

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null

const audienceLabel = (id: string) => PULSE_AUDIENCES.find((a) => a.id === id)?.label ?? id

export function Pulse() {
  const items = sortPulse(pulseItems).slice(0, pulseSection.homeCount)

  return (
    <Section id="pulse" eyebrow={pulseSection.eyebrow} title={pulseSection.title} description={pulseSection.description}>
      {items.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.url}>
              <PulseCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-ink-muted">
          {pulseSection.empty}
        </p>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href={pulseSection.readMore.href}
          className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          {pulseSection.readMore.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  )
}

export function PulseCard({ item }: { item: PulseItem }) {
  const date = formatDate(item.date)
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-brand group flex h-full flex-col p-6"
    >
      <p className="flex items-center gap-2 text-sm text-ink-muted">
        {item.pinned && <Pin className="size-3.5 text-brand" aria-label="Pinned" />}
        <span className="font-semibold text-brand">{item.source}</span>
        {date && (
          <>
            <span aria-hidden="true">·</span>
            <time dateTime={item.date}>{date}</time>
          </>
        )}
      </p>
      <h3 className="mt-3 text-lg leading-snug font-semibold text-ink">{item.title}</h3>
      {item.summary && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">{item.summary}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        {item.audience?.map((a) => (
          <span key={a} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-ink-muted">
            {audienceLabel(a)}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition-colors group-hover:text-brand">
          Read at source
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  )
}
