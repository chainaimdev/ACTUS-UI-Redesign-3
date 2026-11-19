'use client'

import { ChevronDown, Palette, SwatchBook } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/theme-provider'
import { THEME_GROUPS, getTheme, isThemeId, type ThemeGroup } from '@/lib/themes'
import { cn } from '@/lib/utils'

function Swatch({ colors }: { colors: [string, string] }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-4 shrink-0 rounded-full ring-1 ring-border"
      style={{ background: `linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%)` }}
    />
  )
}

export function ThemeSwitcher({
  group = 'theme',
  className,
  showLabel = false,
  align = 'end',
}: {
  /** 'theme' = the four source-project themes; 'palette' = the separate "Colors" dropdown. */
  group?: ThemeGroup
  className?: string
  /** Show the current selection name next to the icon (very wide screens only; off by default to keep the header compact). */
  showLabel?: boolean
  align?: 'start' | 'center' | 'end'
}) {
  const { theme, themes, setTheme } = useTheme()
  const options = themes.filter((t) => t.group === group)
  const active = getTheme(theme)
  // Both dropdowns drive one active skin; the dropdown that doesn't own it shows its own name.
  const current = active.group === group ? active : null
  const groupLabel = THEME_GROUPS[group].label
  const Icon = group === 'palette' ? SwatchBook : Palette

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${groupLabel}: ${current ? current.label : 'none selected'}`}
        className={cn(
          'inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg border border-border bg-elevated px-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink data-popup-open:bg-surface data-popup-open:text-ink',
          className,
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
        {showLabel && <span className="hidden min-[1800px]:inline">{current ? current.label : groupLabel}</span>}
        {current && (
          <span className="hidden xl:inline-flex">
            <Swatch colors={current.swatch} />
          </span>
        )}
        <ChevronDown className="hidden size-3.5 xl:block" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} sideOffset={8} className="w-52 border border-border p-1.5 shadow-xl">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{groupLabel}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={current ? current.id : ''}
            onValueChange={(value) => isThemeId(value) && setTheme(value)}
          >
            {options.map((t) => (
              <DropdownMenuRadioItem key={t.id} value={t.id} closeOnClick className="gap-2.5 py-2 pl-2">
                <Swatch colors={t.swatch} />
                {t.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
