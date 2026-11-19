'use client'

import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Section } from '@/components/section'
import { ShowcaseCard } from '@/components/home/showcase-card'
import { projectItems, projectsSection } from '@/data/showcase'
import { cn } from '@/lib/utils'

export function ProjectsCarousel({ loop = false }: { loop?: boolean }) {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  useEffect(() => {
    if (!api) return
    const update = () => {
      setSnapCount(api.scrollSnapList().length)
      setSelected(api.selectedScrollSnap())
    }
    update()
    api.on('select', update)
    api.on('reInit', update)
    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  return (
    <Section id="projects" {...projectsSection}>
      <Carousel setApi={setApi} opts={{ align: 'start', loop }} aria-label="ACTUS projects">
        <CarouselContent className="-ml-5 py-2">
          {projectItems.map((entry, index) => (
            <CarouselItem
              key={entry.id}
              className="pl-5 sm:basis-1/2 lg:basis-1/3"
              aria-label={`${index + 1} of ${projectItems.length}`}
            >
              <ShowcaseCard entry={entry} index={index} placeholderLabel="Project" />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected ? 'true' : undefined}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  i === selected ? 'bg-brand-gradient w-8' : 'w-2.5 bg-silver/50 hover:bg-silver',
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <CarouselPrevious className="static size-11 translate-x-0 translate-y-0 rounded-full border-border text-ink hover:border-brand hover:text-brand" />
            <CarouselNext className="static size-11 translate-x-0 translate-y-0 rounded-full border-border text-ink hover:border-brand hover:text-brand" />
          </div>
        </div>
      </Carousel>
    </Section>
  )
}
