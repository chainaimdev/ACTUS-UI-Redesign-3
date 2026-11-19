'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Trophy } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { FadeUp } from '@/components/fade-up'
import { GalleryCard } from '@/components/home/gallery'
import { galleryItems } from '@/data/gallery'
import {
  announcementsSection,
  projectItems,
  projectsSection,
  useCaseItems,
  useCasesSection,
  winnerItems,
  winnersCarousel,
  winnersSection,
  type ShowcaseEntry,
  type ShowcaseSectionCopy,
  type WinnerEntry,
} from '@/data/showcase'
import { cn } from '@/lib/utils'

/* ---------- Shared sub-section heading inside the box ---------- */

function SubHeading({ id, copy }: { id: string; copy: ShowcaseSectionCopy }) {
  return (
    <div className="mb-8 max-w-2xl">
      {copy.eyebrow && (
        <p className="mb-2 text-sm font-semibold tracking-widest text-brand uppercase">{copy.eyebrow}</p>
      )}
      <h2 id={id} className="text-2xl md:text-3xl">
        {copy.title}
      </h2>
      <div className="divider-gradient mt-4" aria-hidden="true" />
      {copy.description && <p className="mt-4 text-ink-muted">{copy.description}</p>}
    </div>
  )
}

/* ---------- Winner card ---------- */

function WinnerCard({
  winner,
  index,
  total,
  active,
}: {
  winner: WinnerEntry
  index: number
  total: number
  active: boolean
}) {
  return (
    <article className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[var(--footer-bg)] shadow-[0_24px_48px_-28px_rgb(var(--shadow-rgb)/0.45)] lg:h-[440px] lg:flex-row">
      {/* Official winner poster, shown whole (square), with a slow zoom on the active slide */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden lg:h-full lg:w-auto">
        <div
          className={cn(
            'h-full w-full transition-transform duration-[6000ms] ease-out motion-reduce:transition-none',
            active ? 'scale-[1.03]' : 'scale-100',
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- images.unoptimized is set in next.config */}
          <img src={winner.image} alt={winner.imageAlt} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>

      {/* Details (same information as the poster, readable and searchable) */}
      <div className="flex flex-1 flex-col justify-start p-6 text-white sm:p-8 lg:justify-center lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold">
            <Trophy className="size-4" aria-hidden="true" />
            {winner.award}
          </span>
          <span className="text-sm text-white/70">{`Winner ${index + 1} of ${total}`}</span>
        </div>

        <ul className="mt-6 space-y-5">
          {winner.groups.map((group) => (
            <li key={group.names} className="border-l-2 border-[var(--logo-inverted-mid)]/60 pl-4">
              <p className="text-xs font-semibold tracking-widest text-[var(--logo-inverted-mid)] uppercase">
                {group.country}
              </p>
              <h3 className="mt-1 text-lg leading-snug text-white sm:text-xl">{group.names}</h3>
              <p className="mt-1 text-sm text-white/70">{group.track}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs font-semibold tracking-widest text-white/50 uppercase">{winner.edition}</p>
        {winner.href && (
          <Link
            href={winner.href}
            className="group mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--footer-bg)]"
          >
            Read more
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  )
}

/* ---------- Auto-sliding winners carousel ---------- */

function WinnersCarousel({
  autoplay = winnersCarousel.autoplay,
  intervalMs = winnersCarousel.intervalMs,
}: {
  autoplay?: boolean
  intervalMs?: number
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)
  const [playing, setPlaying] = useState(autoplay)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)
  // Time left on the current slide. Kept across pauses so the countdown resumes instead of restarting.
  const remainingRef = useRef(intervalMs)

  // Respect reduced-motion: start paused, the visitor can still press play.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  useEffect(() => {
    if (!api) return
    const update = () => {
      setSnapCount(api.scrollSnapList().length)
      setSelected(api.selectedScrollSnap())
    }
    update()
    api.on('select', update)
    api.on('reInit', update)
    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  // Only run the timer while the carousel is actually on screen.
  useEffect(() => {
    if (!api) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(api.rootNode())
    return () => observer.disconnect()
  }, [api])

  // A new slide (automatic or clicked) starts with a full interval.
  useEffect(() => {
    remainingRef.current = intervalMs
  }, [selected, intervalMs])

  // Count down only while playing, on screen, not hovered and the tab is visible.
  // Pausing saves the time left; resuming continues from it (no reset).
  useEffect(() => {
    if (!api || !playing || !inView || hovered) return
    let timeoutId: number | undefined
    let startedAt = 0

    const start = () => {
      startedAt = performance.now()
      timeoutId = window.setTimeout(() => {
        timeoutId = undefined
        remainingRef.current = intervalMs
        // Wrap to the first winner when looping isn't possible (few slides on wide screens).
        if (api.canScrollNext()) api.scrollNext()
        else api.scrollTo(0)
        start()
      }, remainingRef.current)
    }
    const stop = () => {
      if (timeoutId === undefined) return
      window.clearTimeout(timeoutId)
      timeoutId = undefined
      remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAt))
    }
    const onVisibility = () => (document.visibilityState === 'visible' ? start() : stop())

    if (document.visibilityState === 'visible') start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      stop()
    }
  }, [api, playing, inView, hovered, intervalMs, selected])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: 'start', loop: true }}
      aria-label="Winners of ACTUS projects"
      // Real mouse movement only: scrolling the page under a still cursor must not pause autoplay.
      onPointerMove={(e) => {
        if (e.pointerType === 'mouse' && !hovered) setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <CarouselContent className="-ml-5 py-2" aria-live={playing ? 'off' : 'polite'}>
        {winnerItems.map((winner, index) => (
          <CarouselItem
            key={winner.id}
            className="basis-full pl-5"
            aria-label={`${index + 1} of ${winnerItems.length}`}
          >
            <WinnerCard winner={winner} index={index} total={winnerItems.length} active={index === selected} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected ? 'true' : undefined}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  i === selected ? 'bg-brand-gradient w-8' : 'w-2.5 bg-silver/50 hover:bg-silver',
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <CarouselPrevious className="static size-11 translate-x-0 translate-y-0 rounded-full border-border text-ink hover:border-brand hover:text-brand" />
          <CarouselNext className="static size-11 translate-x-0 translate-y-0 rounded-full border-border text-ink hover:border-brand hover:text-brand" />
        </div>
      </div>
    </Carousel>
  )
}

/* ---------- Use cases / Projects: a card with one link per line ---------- */

function LinkListCard({
  id,
  copy,
  items,
  placeholderLabel,
}: {
  id: string
  copy: ShowcaseSectionCopy
  items: ShowcaseEntry[]
  /** Shown for entries with no title yet, e.g. "Use case 1". */
  placeholderLabel: string
}) {
  const headingId = `${id}-heading`
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={headingId}
      className="scroll-mt-24 rounded-2xl border border-border bg-elevated p-6 sm:p-8"
    >
      {copy.eyebrow && (
        <p className="mb-2 text-sm font-semibold tracking-widest text-brand uppercase">{copy.eyebrow}</p>
      )}
      <h2 id={headingId} className="text-xl md:text-2xl">
        {copy.title}
      </h2>
      <div className="divider-gradient mt-3" aria-hidden="true" />
      <ul className="mt-5 divide-y divide-border">
        {items.map((entry, index) => (
          <li key={entry.id}>
            {entry.title && entry.href ? (
              <Link
                href={entry.href}
                className="group flex items-center justify-between gap-4 py-3.5 font-medium text-ink transition-colors hover:text-brand"
              >
                <span className="group-hover:underline group-hover:underline-offset-4">{entry.title}</span>
                <ArrowRight
                  className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-brand"
                  aria-hidden="true"
                />
              </Link>
            ) : (
              // Not filled in yet (data/showcase.ts): muted, not clickable.
              <p className="py-3.5 text-ink-muted">{entry.title || `${placeholderLabel} ${index + 1}`}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- The combined box ---------- */

// Real announcements only (with an image); empty placeholders are skipped.
const announcementItems = galleryItems.filter((item) => item.category === 'announcements' && item.image)

export function ShowcaseHub() {
  const hasAnnouncements = announcementItems.length > 0
  return (
    <section id="showcase" aria-label="ACTUS use cases, projects and winners" className="scroll-mt-20 bg-surface py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="rounded-3xl border border-border bg-elevated shadow-[0_1px_3px_rgb(var(--shadow-rgb)/0.06),0_24px_48px_-32px_rgb(var(--shadow-rgb)/0.25)]">
            {/* Announcements, on top */}
            {hasAnnouncements && (
              <div
                id="announcements"
                aria-labelledby="announcements-heading"
                role="region"
                className="scroll-mt-24 border-b border-border p-6 sm:p-8 lg:p-12"
              >
                <SubHeading id="announcements-heading" copy={announcementsSection} />
                <ul className="space-y-6">
                  {announcementItems.map((item) => (
                    // Fixed height from tablet up so the square poster sits beside its text.
                    <li key={item.id} className="sm:h-[320px] lg:h-[360px]">
                      <GalleryCard item={item} large />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Use Case Competition Winners carousel */}
            <div
              id="winners"
              aria-labelledby="winners-heading"
              role="region"
              className={cn('scroll-mt-24 bg-surface/60 p-6 sm:p-8 lg:p-12', !hasAnnouncements && 'rounded-t-3xl')}
            >
              <SubHeading id="winners-heading" copy={winnersSection} />
              <WinnersCarousel />
            </div>

            {/* Use cases and Projects side by side (stacked on phones), one link per line */}
            <div className="grid gap-6 border-t border-border p-6 sm:p-8 lg:grid-cols-2 lg:p-12">
              <LinkListCard id="use-cases" copy={useCasesSection} items={useCaseItems} placeholderLabel="Use case" />
              <LinkListCard id="projects" copy={projectsSection} items={projectItems} placeholderLabel="Project" />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
