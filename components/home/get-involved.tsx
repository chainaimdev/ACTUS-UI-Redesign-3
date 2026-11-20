import { FadeUp } from '@/components/fade-up'
import { FeatureCard } from '@/components/home/feature-card'
import { involvedCards } from '@/data/home'

export function GetInvolved() {
  return (
    <section id="get-involved" aria-label="Get involved" className="scroll-mt-20 bg-surface py-12 md:py-20 short:py-8">
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
