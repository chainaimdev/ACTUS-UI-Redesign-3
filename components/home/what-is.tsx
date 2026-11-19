import { Section } from '@/components/section'
import { FeatureCard } from '@/components/home/feature-card'
import { whatIsCards, whatIsSection } from '@/data/home'

export function WhatIs() {
  return (
    <Section id="what-is-actus" {...whatIsSection} className="bg-surface">
      <div className="grid gap-6 md:grid-cols-2">
        {whatIsCards.map((card) => (
          <FeatureCard key={card.title} card={card} compact />
        ))}
      </div>
    </Section>
  )
}
