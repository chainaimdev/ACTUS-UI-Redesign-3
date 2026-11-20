'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RotatingHeadlineProps = {
  /** id for the <h1>, used by the hero section's aria-labelledby. */
  id: string
  /** Main motto: the <h1>'s text for screen readers and SEO. Should equal mottos[0]. */
  headline: string
  /** Mottos to rotate through; the first shows first. */
  mottos: readonly string[]
  /** Time each motto stays on screen, in ms. Default: 4000. */
  intervalMs?: number
  /** Show one clickable dot per motto at the bottom of the column. Default: true. */
  showDots?: boolean
  /** Classes for the <h1> (size, spacing). */
  className?: string
  /** Content above the headline (the eyebrow). */
  before?: ReactNode
  /** Content below the headline (subheadline, buttons). */
  after?: ReactNode
}

/**
 * Hero text column with a rotating headline. Every motto sits in the same grid cell, so the
 * headline takes the height of the tallest one and the page never jumps while they change.
 * The motto dots sit at the BOTTOM of the column: with the column stretched to the picture's
 * height (lg:self-stretch in hero.tsx), they line up with the picture dots on the right.
 * Auto-advances; pauses on hover or keyboard focus and while the tab is hidden.
 * Reduced-motion visitors get no auto-advance (the dots still work).
 */
export function RotatingHeadline({
  id,
  headline,
  mottos,
  intervalMs = 4000,
  showDots = true,
  className,
  before,
  after,
}: RotatingHeadlineProps) {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Restarts whenever the motto changes, so a dot click gives the chosen motto a full interval.
  useEffect(() => {
    if (hovered || focused || reduced || mottos.length < 2) return
    let timer: number | undefined
    const start = () => {
      timer = window.setTimeout(() => setIndex((i) => (i + 1) % mottos.length), intervalMs)
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
  }, [index, hovered, focused, reduced, intervalMs, mottos.length])

  const pauseHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  return (
    <div
      className="flex h-full flex-col"
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
      }}
    >
      <div className="flex flex-1 flex-col justify-center">
        <div>{before}</div>
        <h1 id={id} className={className} {...pauseHandlers}>
          <span className="sr-only">{headline}</span>
          <span aria-hidden="true" className="grid">
            {mottos.map((motto, i) => (
              <span
                key={motto}
                className={cn(
                  // pb/-mb: room under the last line so the gradient also paints the descenders
                  // (g, p, y), which the tight line height would otherwise clip. The negative margin
                  // keeps the headline's height and spacing exactly as before.
                  'text-gradient col-start-1 row-start-1 -mb-[0.16em] block pb-[0.16em] transition-all duration-700 ease-out motion-reduce:transition-none',
                  i === index ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
                )}
              >
                {motto}
              </span>
            ))}
          </span>
        </h1>
        {after}
      </div>

      {showDots && mottos.length > 1 && (
        // Same size and style as the picture dots (hero-visual.tsx): a 24px row of 24px buttons.
        <div className="mt-8 flex items-center justify-center gap-2 lg:mt-4" role="group" aria-label="Choose motto" {...pauseHandlers}>
          {mottos.map((motto, i) => (
            <button
              key={motto}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show motto: ${motto}`}
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
      )}
    </div>
  )
}
