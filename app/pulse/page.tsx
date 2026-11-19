import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PulseCard } from '@/components/home/pulse'
import { pulseItems, pulsePage, sortPulse } from '@/data/pulse'
import { PULSE_AUDIENCES } from '@/lib/pulse/types'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: pulsePage.metaTitle,
  description: pulsePage.metaDescription,
  alternates: { canonical: '/pulse' },
}

export default async function PulsePage({ searchParams }: { searchParams: Promise<{ audience?: string }> }) {
  const { audience } = await searchParams
  const active = PULSE_AUDIENCES.find((a) => a.id === audience)?.id
  const all = sortPulse(pulseItems)
  const items = active ? all.filter((i) => i.audience?.includes(active)) : all

  const filters = [
    { id: undefined, label: pulsePage.allLabel, count: all.length },
    ...PULSE_AUDIENCES.map((a) => ({
      id: a.id,
      label: a.label,
      count: all.filter((i) => i.audience?.includes(a.id)).length,
    })),
  ]

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-elevated focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-ink-muted">
              <li>
                <Link href="/" className="rounded-sm transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-ink">
                {pulsePage.eyebrow}
              </li>
            </ol>
          </nav>

          <p className="mt-10 mb-3 text-sm font-semibold tracking-widest text-brand uppercase">{pulsePage.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl">{pulsePage.title}</h1>
          <div className="divider-gradient mt-5" aria-hidden="true" />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted">{pulsePage.description}</p>

          <nav aria-label="Filter by audience" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const on = f.id === active
                return (
                  <li key={f.label}>
                    <Link
                      href={f.id ? `/pulse?audience=${f.id}` : '/pulse'}
                      aria-current={on ? 'page' : undefined}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                        on ? 'border-brand bg-brand text-on-brand' : 'border-border text-ink-muted hover:border-brand hover:text-ink',
                      )}
                    >
                      {f.label}
                      <span className="tabular-nums opacity-70">{f.count}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {items.length > 0 ? (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.url}>
                  <PulseCard item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-ink-muted">
              {pulsePage.empty}
            </p>
          )}

          <div className="mt-14 flex justify-center">
            <Link
              href="/#pulse"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              {pulsePage.backLabel}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
