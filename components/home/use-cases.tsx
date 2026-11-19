import { Section } from '@/components/section'
import { ShowcaseCard } from '@/components/home/showcase-card'
import { useCaseItems, useCasesSection } from '@/data/showcase'

export function UseCases() {
  return (
    <Section id="use-cases" {...useCasesSection} className="bg-surface">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {useCaseItems.map((entry, index) => (
          <li key={entry.id}>
            <ShowcaseCard entry={entry} index={index} placeholderLabel="Use case" />
          </li>
        ))}
      </ul>
    </Section>
  )
}
