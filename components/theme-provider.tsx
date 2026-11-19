'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_THEME,
  THEME_QUERY_PARAM,
  THEME_STORAGE_KEY,
  THEMES,
  applyThemeToDocument,
  isThemeId,
  type ThemeDefinition,
  type ThemeId,
} from '@/lib/themes'

type ThemeContextValue = {
  theme: ThemeId
  themes: readonly ThemeDefinition[]
  setTheme: (id: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  persist = true,
}: {
  children: React.ReactNode
  /** Theme used when nothing is stored and no ?theme= param is present. */
  defaultTheme?: ThemeId
  /** Save the visitor's choice to localStorage. */
  persist?: boolean
}) {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme)

  // Sync React state with what the boot script already applied to <html>.
  useEffect(() => {
    const fromDom = document.documentElement.dataset.theme
    const fromQuery = new URLSearchParams(window.location.search).get(THEME_QUERY_PARAM)
    const initial = isThemeId(fromQuery) ? fromQuery : isThemeId(fromDom) ? fromDom : defaultTheme
    setThemeState(initial)
    applyThemeToDocument(initial)
  }, [defaultTheme])

  const setTheme = useCallback(
    (id: ThemeId) => {
      if (!isThemeId(id)) return
      setThemeState(id)
      applyThemeToDocument(id)
      if (persist) {
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, id)
        } catch {
          // Storage can be unavailable (private mode, sandboxed iframe) — the theme still applies for this visit.
        }
      }
    },
    [persist],
  )

  const value = useMemo(() => ({ theme, themes: THEMES, setTheme }), [theme, setTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
