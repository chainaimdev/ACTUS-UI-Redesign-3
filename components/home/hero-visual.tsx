'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Images } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HeroIllustration } from '@/components/home/hero-illustration'
import {
  ContractTypesIllustration,
  EcosystemIllustration,
  EventTimelineIllustration,
  ScenarioIllustration,
} from '@/components/home/hero-illustrations-extra'
import { heroIllustrations, type HeroIllustrationId } from '@/data/home'

const ILLUSTRATIONS: Record<HeroIllustrationId, () => React.JSX.Element> = {
  cashflows: HeroIllustration,
  types: ContractTypesIllustration,
  events: EventTimelineIllustration,
  scenarios: ScenarioIllustration,
  ecosystem: EcosystemIllustration,
}

/** localStorage key for the visitor's chosen hero picture. */
const STORAGE_KEY = 'actus-hero-illustration'

function isIllustrationId(value: unknown): value is HeroIllustrationId {
  return typeof value === 'string' && heroIllustrations.some((h) => h.id === value)
}

/** Hero picture + caption, with a small "View" dropdown to switch between illustrations. */
export function HeroVisual() {
  const [selected, setSelected] = useState<HeroIllustrationId>(heroIllustrations[0].id)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isIllustrationId(stored)) setSelected(stored)
    } catch {
      // storage unavailable: keep the default
    }
  }, [])

  const choose = (value: unknown) => {
    if (!isIllustrationId(value)) return
    setSelected(value)
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // storage unavailable: choice applies for this visit only
    }
  }

  const current = heroIllustrations.find((h) => h.id === selected) ?? heroIllustrations[0]
  const Illustration = ILLUSTRATIONS[current.id]

  return (
    <figure className="animate-in fade-in zoom-in-95 duration-1000 motion-reduce:animate-none">
      <div className="mx-auto flex max-w-xl justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Hero illustration: ${current.label}`}
            className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-elevated px-3 text-xs font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink data-popup-open:bg-surface data-popup-open:text-ink"
          >
            <Images className="size-3.5" aria-hidden="true" />
            <span className="text-ink-muted/80">View:</span>
            <span className="text-ink">{current.label}</span>
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={6} className="w-56 border border-border p-1.5 shadow-xl">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Illustration</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={current.id} onValueChange={choose}>
                {heroIllustrations.map((h) => (
                  <DropdownMenuRadioItem key={h.id} value={h.id} closeOnClick className="py-2 pl-2">
                    {h.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* key remounts the picture + caption so each switch fades in */}
      <div key={current.id} className="animate-in fade-in duration-500 motion-reduce:animate-none">
        <div className="mt-2">
          <Illustration />
        </div>
        <figcaption
          aria-live="polite"
          className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2.5 text-center text-sm font-medium text-ink-muted md:text-base"
        >
          <span className="bg-brand-gradient h-px w-6 shrink-0 opacity-60" aria-hidden="true" />
          {current.caption}
          <span className="bg-brand-gradient h-px w-6 shrink-0 opacity-60" aria-hidden="true" />
        </figcaption>
      </div>
    </figure>
  )
}
