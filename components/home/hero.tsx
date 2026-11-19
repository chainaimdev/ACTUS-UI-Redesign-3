import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroVisual } from '@/components/home/hero-visual'
import { hero } from '@/data/home'

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[640px] rounded-full opacity-[var(--hero-glow-a)] blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--grad-to), var(--grad-via) 45%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-[-15%] size-[520px] rounded-full opacity-[var(--hero-glow-b)] blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--grad-via), transparent 70%)' }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-14 sm:px-6 md:pt-12 md:pb-20 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-8 lg:pb-24">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 motion-reduce:animate-none">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-ink-muted">
            <span className="bg-brand-gradient size-2 rounded-full" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-heading" className="mt-6 text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
            <span className="text-gradient">{hero.headline}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-muted md:text-xl">
            {hero.subheadline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={hero.primaryCta.href} className="btn-base btn-gradient group">
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn-base btn-outline">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
