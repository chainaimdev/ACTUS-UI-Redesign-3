import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FadeUp } from '@/components/fade-up'
import { IconBadge } from '@/components/section'
import { resourceTiles } from '@/data/home'

export function ResourcesStrip() {
  return (
    <section aria-labelledby="quick-resources-heading" className="border-y border-border py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <h2 id="quick-resources-heading" className="mb-6 text-sm font-semibold tracking-widest text-brand uppercase">
            Quick resources
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {resourceTiles.map((tile) => (
              <li key={tile.title}>
                <Link
                  href={tile.href}
                  className="card-brand group flex h-full items-center gap-3 p-4"
                >
                  <IconBadge icon={tile.icon} size="sm" />
                  <span className="flex-1 text-sm font-semibold text-ink">{tile.title}</span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-silver transition-colors group-hover:text-brand"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}
