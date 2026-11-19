'use client'

import { useCallback, useEffect, useState } from 'react'
import { HeroIllustration } from '@/components/home/hero-illustration'
import {
  ContractTypesIllustration,
  EcosystemIllustration,
  EventTimelineIllustration,
  ScenarioIllustration,
} from '@/components/home/hero-illustrations-extra'
import { heroIllustrations, type HeroIllustrationId } from '@/data/home'
import { cn } from '@/lib/utils'

const ILLUSTRATIONS: Record<HeroIllustrationId, () => React.JSX.Element> = {
  cashflows: HeroIllustration,
  types: ContractTypesIllustration,
  events: EventTimelineIllustration,
  scenarios: ScenarioIllustration,
  ecosystem: EcosystemIllustration,
}

type HeroVisualProps = {
  /** Advance to the next picture on its own. Default: true. */
  autoplay?: boolean
  /** Time each picture stays on screen, in ms. Default: 5000. */
  intervalMs?: number
}

/**
 * Hero picture + caption as a carousel: one dot per picture (no arrows, so the picture gets the full space),
 * and auto-play that pauses on hover, on keyboard focus and while the tab is hidden.
 * Visitors who prefer reduced motion get no auto-play (the dots still work).
 */
export function HeroVisual({ autoplay = true, intervalMs = 5000 }: HeroVisualProps) {
  const total = heroIllustrations.length
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(autoplay)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  // Reduced motion: start paused.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total])

  // Auto-advance. Restarts the countdown whenever the picture changes (also after a click).
  useEffect(() => {
    if (!playing || hovered || focused || total < 2) return
    let timer: number | undefined
    const start = () => {
      timer = window.setTimeout(() => setIndex((i) => (i + 1) % total), intervalMs)
    }
    const stop = () => {
      if (timer !== undefined) window.clearTimeout(timer)
      timer = undefined
    }
    const onVisibility = () => (document.visibilityState === 'visible' ? (stop(), start()) : stop())
    if (document.visibilityState === 'visible') start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      stop()
    }
  }, [index, playing, hovered, focused, intervalMs, total])

  const current = heroIllustrations[index]
  const Illustration = ILLUSTRATIONS[current.id]

  return (
    <figure
      aria-roledescription="carousel"
      aria-label="ACTUS illustrations"
      className="animate-in fade-in zoom-in-95 duration-1000 motion-reduce:animate-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
      }}
    >
      {/* key remounts the picture + caption so each switch fades in */}
      <div
        key={current.id}
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${total}: ${current.label}`}
        className="animate-in fade-in duration-500 motion-reduce:animate-none"
      >
        <div>
          <Illustration />
        </div>
        <figcaption
          aria-live={playing && !hovered && !focused ? 'off' : 'polite'}
          className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2.5 text-center text-sm font-medium text-ink-muted md:text-base"
        >
          <span className="bg-brand-gradient h-px w-6 shrink-0 opacity-60" aria-hidden="true" />
          {current.caption}
          <span className="bg-brand-gradient h-px w-6 shrink-0 opacity-60" aria-hidden="true" />
        </figcaption>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" role="group" aria-label="Choose illustration">
        {heroIllustrations.map((h, i) => (
          <button
            key={h.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show ${h.label}`}
            aria-current={i === index ? 'true' : undefined}
            className="flex size-6 items-center justify-center rounded-full"
          >
            <span
              aria-hidden="true"
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === index ? 'bg-brand-gradient w-6' : 'w-2 bg-silver/60 hover:bg-silver',
              )}
            />
          </button>
        ))}
      </div>
    </figure>
  )
}
