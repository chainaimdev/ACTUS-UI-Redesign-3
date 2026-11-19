import { IconBadge, Section } from '@/components/section'
import { audienceSection, audienceTiles } from '@/data/home'

export function Audiences() {
  return (
    <Section id="why-important" {...audienceSection}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {audienceTiles.map((tile) => (
          <li key={tile.title} className="card-brand flex flex-col p-6">
            <IconBadge icon={tile.icon} />
            <h3 className="mt-5 text-lg">{tile.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{tile.benefit}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
