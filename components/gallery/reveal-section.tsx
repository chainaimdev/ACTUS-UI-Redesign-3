'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * A <section> that gains `is-visible` once scrolled into view. Paired with the
 * `.gallery-stage` styles in globals.css, this plays the same staggered entrance
 * (`.gallery-head`, `.gallery-item`) used by the home-page gallery.
 */
export function RevealSection({
  children,
  className,
  threshold = 0.12,
  ...rest
}: React.ComponentPropsWithoutRef<'section'> & { threshold?: number }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <section ref={ref} className={cn(className, visible && 'is-visible')} {...rest}>
      {children}
    </section>
  )
}
