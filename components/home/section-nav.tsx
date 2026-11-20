'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SectionNavItem = {
  /** Element id on the page. 'top' scrolls to the top of the page (the hero). */
  id: string
  label: string
}

/** Home page sections, in page order. An id that is not on the page is skipped. */
export const homeSections: SectionNavItem[] = [
  { id: 'top', label: 'Home' },
  { id: 'what-is-actus', label: 'What is ACTUS?' },
  { id: 'why-important', label: 'Why ACTUS' },
  { id: 'try-actus', label: 'Try ACTUS' },
  { id: 'quick-resources', label: 'Quick resources' },
  // The Showcase box opens with Announcements; Winners is its own stop inside the same box.
  { id: 'showcase', label: 'Announcements' },
  { id: 'winners', label: 'Winners' },
  { id: 'pulse', label: 'Pulse' },
  { id: 'get-involved', label: 'Get involved' },
  { id: 'contact', label: 'Contact' },
]

type SectionNavProps = {
  /** Sections the dots jump to. Default: homeSections. */
  sections?: SectionNavItem[]
  /** Show the side dots on the left edge (desktop, lg and up). Default: true. */
  showDots?: boolean
  /** Show the floating "Back to top" button. Default: true. */
  showBackToTop?: boolean
  /** Scroll distance in px before "Back to top" appears. Default: 600. */
  backToTopOffset?: number
  /** A section counts as current once its top passes this fraction of the viewport height. Default: 0.5 (screen middle). */
  activeThreshold?: number
  /**
   * Where a section lands after a dot click. 'center': middle of the visible area below the sticky
   * header (a section taller than that area lands with its top under the header instead).
   * 'start': top under the header. Default: 'center'.
   */
  align?: 'center' | 'start'
  /** Space in px kept between the sticky header and a section that lands at the top. Default: 12. */
  headerGap?: number
  /** Element whose left edge the dot column lines up with (the page's text column). Default: '#hero-heading'. */
  alignTo?: string
  /** Gap in px between the dot column and that text edge. Default: 28. */
  gapToContent?: number
}

/** Width of one dot button (size-6). */
const DOT_SIZE = 24

/**
 * Floating page navigation: side dots that jump to each section, and a "Back to top" button.
 * It sits over the page (fixed position) and does not change any section's layout or content.
 */
export function SectionNav({
  sections = homeSections,
  showDots = true,
  showBackToTop = true,
  backToTopOffset = 600,
  activeThreshold = 0.5,
  align = 'center',
  headerGap = 12,
  alignTo = '#hero-heading',
  gapToContent = 28,
}: SectionNavProps) {
  const [available, setAvailable] = useState<SectionNavItem[]>([])
  // Left position of the dot column, measured from the text column so the gap is the same on every screen.
  const [dotsLeft, setDotsLeft] = useState<number | null>(null)

  useEffect(() => {
    const place = () => {
      const target = document.querySelector(alignTo)
      if (!target) return setDotsLeft(null)
      const textLeft = target.getBoundingClientRect().left
      setDotsLeft(Math.max(4, Math.round(textLeft - gapToContent - DOT_SIZE)))
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [alignTo, gapToContent])
  const [activeId, setActiveId] = useState('top')
  const [showTop, setShowTop] = useState(false)

  // Keep only the sections that exist on this page.
  useEffect(() => {
    setAvailable(sections.filter((s) => s.id === 'top' || document.getElementById(s.id)))
  }, [sections])

  // Track the current section and whether "Back to top" should show.
  useEffect(() => {
    if (available.length === 0) return
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * activeThreshold
      let current = 'top'
      for (const s of available) {
        if (s.id === 'top') continue
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }
      setActiveId(current)
      setShowTop(window.scrollY > backToTopOffset)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [available, activeThreshold, backToTopOffset])

  const goTo = useCallback(
    (id: string) => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior })
        return
      }
      const el = document.getElementById(id)
      if (!el) return

      // Visible area = viewport minus the sticky header (measured, so theme or size changes are covered).
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      const visible = window.innerHeight - headerHeight
      const rect = el.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top

      let target = sectionTop - headerHeight - headerGap
      if (align === 'center' && rect.height < visible) {
        // Equal space above and below the section inside the visible area.
        target = sectionTop - headerHeight - (visible - rect.height) / 2
      }
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: Math.max(0, Math.min(target, maxScroll)), behavior })
    },
    [align, headerGap],
  )

  return (
    <>
      {showDots && available.length > 1 && (
        // Own column left of the text: always gapToContent (28px) before the text edge.
        <nav
          aria-label="Page sections"
          className="fixed top-1/2 left-1.5 z-40 hidden -translate-y-1/2 flex-col items-start gap-3 lg:flex"
          style={dotsLeft !== null ? { left: dotsLeft } : undefined}
        >
          {available.map((s) => {
            const active = s.id === activeId
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={active ? 'true' : undefined}
                className="group relative flex size-6 items-center justify-center rounded-full"
              >
                {/* Section name pill, shown to the right of the dot on hover or keyboard focus. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-8 rounded-md border border-border bg-elevated px-2.5 py-1 text-xs font-medium whitespace-nowrap text-ink opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {s.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'rounded-full transition-all duration-300',
                    active ? 'bg-brand-gradient size-3' : 'size-2 bg-silver/60 group-hover:bg-silver',
                  )}
                />
              </button>
            )
          })}
        </nav>
      )}

      {showBackToTop && (
        <button
          type="button"
          onClick={() => goTo('top')}
          aria-label="Back to top"
          tabIndex={showTop ? 0 : -1}
          aria-hidden={showTop ? undefined : true}
          className={cn(
            'bg-brand-gradient fixed right-6 bottom-6 z-40 inline-flex size-12 items-center justify-center rounded-full text-on-brand shadow-lg shadow-grad-from/25 transition-all duration-300',
            showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
          )}
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </button>
      )}
    </>
  )
}
