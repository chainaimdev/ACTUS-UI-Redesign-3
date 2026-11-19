'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Menu } from 'lucide-react'
import { ActusLogo } from '@/components/actus-logo'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { mainNav, primaryCta, type NavItem } from '@/data/navigation'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-header backdrop-blur-lg transition-[border-color,box-shadow] duration-300',
        scrolled ? 'border-border shadow-[0_4px_20px_-12px_rgb(var(--shadow-rgb)/0.25)]' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-18 lg:px-8">
        <Link href="/" className="shrink-0 rounded-lg" aria-label="ACTUS home">
          <ActusLogo alt="" className="h-8 xl:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.children ? <DesktopDropdown item={item} /> : <DesktopLink item={item} />}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher group="theme" />
          <ThemeSwitcher group="palette" />
          <ExploreMenu />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

const isExternal = (href: string) => /^https?:\/\//i.test(href)

/** "Explore ACTUS" header button with a small dropdown (Learn ACTUS, Setup ACTUS). */
function ExploreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="btn-base btn-gradient hidden px-4 py-2.5 text-sm sm:inline-flex">
        {primaryCta.label}
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-48 border border-border p-1.5 shadow-xl">
        {primaryCta.children?.map((child) => (
          <DropdownMenuItem
            key={child.href}
            className="cursor-pointer px-2.5 py-2"
            render={
              isExternal(child.href) ? (
                <a href={child.href} target="_blank" rel="noopener noreferrer" />
              ) : (
                <Link href={child.href} />
              )
            }
          >
            {child.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const navLinkClass =
  'inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm max-xl:px-1.5 max-xl:text-[13px] font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink'

function DesktopLink({ item }: { item: NavItem }) {
  return (
    <Link href={item.href} className={navLinkClass}>
      {item.label}
    </Link>
  )
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          triggerRef.current?.focus()
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(navLinkClass, open && 'bg-surface text-ink')}
      >
        {item.label}
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-0 z-50 pt-2"
      >
        <ul className="min-w-60 overflow-hidden rounded-2xl border border-border bg-elevated p-2 shadow-xl shadow-grad-from/10">
          <li aria-hidden="true" className="divider-gradient mx-3 mt-1 mb-2 w-10" />
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface hover:text-ink"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        className="inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-surface lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] overflow-y-auto bg-elevated p-0 sm:max-w-sm">
        <div className="border-b border-border px-5 py-4">
          <SheetTitle>
            <ActusLogo />
          </SheetTitle>
        </div>
        <nav aria-label="Mobile" className="px-3 pb-6">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.label} className="border-b border-border/70 last:border-0">
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-2 py-3 font-medium text-ink [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <ChevronDown className="size-4 text-ink-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="mb-2 ml-2 border-l-2 border-grad-via/30 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <SheetClose
                            render={<Link href={child.href} />}
                            className="block rounded-md px-2 py-2 text-sm text-ink-muted hover:text-ink"
                          >
                            {child.label}
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <SheetClose render={<Link href={item.href} />} className="block rounded-lg px-2 py-3 font-medium text-ink">
                    {item.label}
                  </SheetClose>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 px-2 text-xs font-semibold tracking-wider text-ink-muted uppercase">{primaryCta.label}</p>
          <div className="mt-2 flex flex-col gap-2">
            {primaryCta.children?.map((child) =>
              isExternal(child.href) ? (
                <a
                  key={child.href}
                  href={child.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-gradient w-full"
                >
                  {child.label}
                </a>
              ) : (
                <SheetClose key={child.href} render={<Link href={child.href} />} className="btn-base btn-gradient w-full">
                  {child.label}
                </SheetClose>
              ),
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
