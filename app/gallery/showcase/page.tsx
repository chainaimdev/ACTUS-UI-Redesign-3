import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { showcasePage, showcaseProjects } from '@/data/gallery'

export const metadata: Metadata = {
  title: showcasePage.metaTitle,
  description: showcasePage.metaDescription,
  alternates: { canonical: '/gallery/showcase' },
}

/** /gallery/showcase: the competition projects (title + presenter), opened from the "Build sprint showcase" card. */
export default function ShowcasePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-elevated focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="gallery-stage relative isolate overflow-hidden text-white">
        <div aria-hidden="true" className="gallery-backdrop pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 md:pt-14 md:pb-20 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-white/60">
              <li>
                <Link href="/" className="rounded-sm transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link href="/gallery" className="rounded-sm transition-colors hover:text-white">
                  Gallery
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-white">
                {showcasePage.title}
              </li>
            </ol>
          </nav>

          <p className="mt-10 mb-3 text-sm font-semibold tracking-widest text-[var(--gallery-accent)] uppercase">
            {showcasePage.eyebrow}
          </p>
          <h1 className="text-4xl leading-[1.05] text-white md:text-5xl">{showcasePage.title}</h1>
          <div aria-hidden="true" className="gallery-rule mt-6 h-[3px] w-16 rounded-full" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/70">{showcasePage.description}</p>

          {/* Compact grid: 4 cards per row on desktop (4 rows for 16), 2 on tablets, 1 on phones */}
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {showcaseProjects.map((project, index) => (
              <li
                key={project.title}
                className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/10"
              >
                <span className="text-xs font-semibold text-white/45 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-1.5 flex-1 text-sm leading-snug font-medium text-white">{project.title}</p>
                <p className="mt-3 text-xs font-semibold text-[var(--gallery-accent)]">{project.presenter}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex justify-center">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              {showcasePage.backLabel}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
