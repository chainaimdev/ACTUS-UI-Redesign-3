import { FadeUp } from '@/components/fade-up'
import { FeatureCard } from '@/components/home/feature-card'
import { involvedCards } from '@/data/home'

export function GetInvolved() {
  return (
    <section aria-label="Get involved" className="bg-surface py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="grid gap-6 md:grid-cols-3">
            {involvedCards.map((card) => (
              <FeatureCard key={card.title} card={card} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
