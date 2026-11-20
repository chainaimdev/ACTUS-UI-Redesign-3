import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { IconBadge } from '@/components/section'
import type { FeatureCard as FeatureCardData } from '@/data/home'
import { cn } from '@/lib/utils'

export function FeatureCard({
  card,
  className,
  compact = false,
}: {
  card: FeatureCardData
  className?: string
  /** Smaller padding, icon and title. Off by default, so other sections keep the full size. */
  compact?: boolean
}) {
  return (
    <article
      className={cn('card-brand flex h-full flex-col', compact ? 'p-6 md:p-7 short:p-5' : 'p-7 md:p-9 short:p-6', className)}
    >
      <IconBadge icon={card.icon} size={compact ? 'md' : 'lg'} />
      <h3 className={compact ? 'mt-4 text-xl short:mt-3' : 'mt-6 text-2xl short:mt-4'}>{card.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-ink-muted short:mt-2">{card.description}</p>
      <Link
        href={card.cta.href}
        className="group mt-6 short:mt-4 inline-flex w-fit items-center gap-1.5 rounded-md font-semibold text-brand hover:underline hover:underline-offset-4"
      >
        {card.cta.label}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        <span className="sr-only">{`: ${card.title}`}</span>
      </Link>
    </article>
  )
}
