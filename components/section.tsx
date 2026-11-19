import type { LucideIcon } from 'lucide-react'
import { FadeUp } from '@/components/fade-up'
import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  eyebrow?: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function Section({ id, eyebrow, title, description, children, className, align = 'left' }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-20 py-12 md:py-20', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className={cn('mb-10 max-w-2xl md:mb-14', align === 'center' && 'mx-auto text-center')}>
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold tracking-widest text-brand uppercase">{eyebrow}</p>
            )}
            <h2 id={headingId} className="text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <div className={cn('divider-gradient mt-5', align === 'center' && 'mx-auto')} aria-hidden="true" />
            {description && <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-muted">{description}</p>}
          </div>
          {children}
        </FadeUp>
      </div>
    </section>
  )
}

export function IconBadge({ icon: Icon, size = 'md' }: { icon: LucideIcon; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'bg-brand-gradient inline-flex shrink-0 items-center justify-center rounded-xl text-on-brand shadow-md shadow-grad-via/20',
        size === 'sm' && 'size-10 [&_svg]:size-5',
        size === 'md' && 'size-12 [&_svg]:size-6',
        size === 'lg' && 'size-14 [&_svg]:size-7',
      )}
    >
      <Icon strokeWidth={1.75} />
    </span>
  )
}
