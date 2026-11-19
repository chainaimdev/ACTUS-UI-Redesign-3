import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ShowcaseEntry } from '@/data/showcase'
import { cn } from '@/lib/utils'

/**
 * Card shared by the Use cases grid and the Projects carousel.
 * Renders an explicit placeholder state while `title` is empty.
 */
export function ShowcaseCard({
  entry,
  placeholderLabel,
  index,
  className,
}: {
  entry: ShowcaseEntry
  /** e.g. "Use case" → shown as "Use case 1" while the entry is empty. */
  placeholderLabel: string
  index: number
  className?: string
}) {
  const isPlaceholder = entry.title.trim() === ''
  const title = isPlaceholder ? `${placeholderLabel} ${index + 1}` : entry.title

  return (
    <article
      className={cn('card-brand flex h-full min-h-64 flex-col p-6', className)}
      data-placeholder={isPlaceholder || undefined}
    >
      <div
        aria-hidden="true"
        className="bg-brand-gradient mb-5 h-24 rounded-xl opacity-90"
        style={{ backgroundSize: '160% 160%', backgroundPosition: `${(index * 30) % 100}% 50%` }}
      />
      <h3 className="text-lg">{title}</h3>
      {isPlaceholder ? (
        <div className="mt-3 flex flex-1 flex-col gap-2" aria-label="Content coming soon">
          <span className="h-2.5 w-full rounded-full bg-border/70" />
          <span className="h-2.5 w-4/5 rounded-full bg-border/70" />
          <span className="h-2.5 w-3/5 rounded-full bg-border/70" />
        </div>
      ) : (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{entry.description}</p>
      )}
      {!isPlaceholder && entry.href && (
        <Link
          href={entry.href}
          className="group mt-5 inline-flex w-fit items-center gap-1.5 rounded-md text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          Read more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          <span className="sr-only">{`: ${entry.title}`}</span>
        </Link>
      )}
    </article>
  )
}
