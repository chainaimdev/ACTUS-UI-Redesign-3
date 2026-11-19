/* eslint-disable @next/next/no-img-element -- static brand PNGs; next.config sets images.unoptimized */
import { cn } from '@/lib/utils'

/**
 * Official ACTUS logo lockups (web derivatives in /public/brand, generated from
 * the source files in Actus-UI-Redesign/ACTUS-Logos with white backgrounds removed).
 */
export const ACTUS_LOGOS = {
  /** Mark + ACTUS wordmark (tagline removed: illegible at header size). */
  wordmark: { src: '/brand/actus-wordmark.png', width: 1072, height: 288, alt: 'ACTUS' },
  foundation: {
    src: '/brand/actus-research-foundation.png',
    width: 1072,
    height: 337,
    alt: 'ACTUS Research Foundation',
  },
  association: {
    src: '/brand/actus-users-association.png',
    width: 1072,
    height: 338,
    alt: 'ACTUS Users Association',
  },
  poweredBy: { src: '/brand/powered-by-actus.png', width: 1200, height: 376, alt: 'Powered by ACTUS' },
} as const

export type ActusLogoVariant = keyof typeof ACTUS_LOGOS

/**
 * tone:
 *  - 'auto'    full colour on light themes, reversed (white) on dark themes
 *  - 'color'   always full colour
 *  - 'reverse' always white — for permanently dark surfaces (footer, gallery stage)
 */
export function ActusLogo({
  variant = 'wordmark',
  tone,
  inverted = false,
  className,
  alt,
}: {
  variant?: ActusLogoVariant
  tone?: 'auto' | 'color' | 'reverse'
  /** Back-compat alias for tone="reverse". */
  inverted?: boolean
  /** Height is set by className (e.g. h-9); width follows the aspect ratio. */
  className?: string
  /** Override alt text; pass "" when the logo sits next to visible text that names it. */
  alt?: string
}) {
  const logo = ACTUS_LOGOS[variant]
  const resolvedTone = tone ?? (inverted ? 'reverse' : 'auto')
  return (
    <img
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={alt ?? logo.alt}
      decoding="async"
      draggable={false}
      data-tone={resolvedTone}
      className={cn('brand-logo block h-9 w-auto shrink-0 select-none', className)}
    />
  )
}
