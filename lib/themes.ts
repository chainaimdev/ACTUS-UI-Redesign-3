/**
 * Central theme registry.
 *
 * Each entry maps to a `[data-theme="<id>"]` block in app/globals.css that
 * overrides the brand tokens. Components never reference a theme directly —
 * they read CSS variables, so adding a theme = one entry here + one CSS block.
 *
 * Source projects merged into this registry:
 *   white-blue  ← Actus_white_blue-main     (base project, "Midnight Sovereign")
 *   black-gold  ← actus-black-gold-main     ("Carbon Black → Gunmetal with Gold")
 *   dark-blue   ← actus-bg-dark-blue-main   ("Midnight Navy → Electric Blue")
 *   graphite    ← actus-graphite-main       ("Graphite Oxblood")
 *   ocean-light, ivory-navy  (added themes)
 *
 * Extra colour palettes (separate "Colors" dropdown, same layout):
 *   sandpaper, sage, harbor, plum
 */

export type ThemeId =
  // "Theme" dropdown — the four merged source projects
  | 'white-blue'
  | 'black-gold'
  | 'dark-blue'
  | 'graphite'
  | 'ocean-light'
  | 'ivory-navy'
  // "Colors" dropdown — additional colour palettes on the same layout
  | 'sandpaper'
  | 'sage'
  | 'harbor'
  | 'plum'

/** Which header dropdown lists the entry. Only one theme/palette is active at a time. */
export type ThemeGroup = 'theme' | 'palette'

export const THEME_GROUPS: Record<ThemeGroup, { label: string }> = {
  theme: { label: 'Theme' },
  palette: { label: 'Colors' },
}

export type ThemeDefinition = {
  id: ThemeId
  label: string
  group: ThemeGroup
  /** Native UI (scrollbars, form controls) + toggles the `.dark` class for shadcn primitives. */
  colorScheme: 'light' | 'dark'
  /** Browser chrome colour (<meta name="theme-color">). */
  themeColor: string
  /** Swatch colours shown in the dropdown: [background, brand]. */
  swatch: [string, string]
}

export const THEMES: readonly ThemeDefinition[] = [
  { id: 'white-blue', label: 'White & Blue (Default)', group: 'theme', colorScheme: 'light', themeColor: '#fbfcfd', swatch: ['#fbfcfd', '#002d56'] },
  { id: 'ocean-light', label: 'Ocean Light', group: 'theme', colorScheme: 'light', themeColor: '#f4f9fb', swatch: ['#f4f9fb', '#0284c7'] },
  { id: 'ivory-navy', label: 'Ivory & Navy', group: 'theme', colorScheme: 'light', themeColor: '#fbf8f1', swatch: ['#fbf8f1', '#14213d'] },
  { id: 'sandpaper', label: 'Sandpaper', group: 'palette', colorScheme: 'light', themeColor: '#f4ede1', swatch: ['#f4ede1', '#8c5530'] },
  { id: 'sage', label: 'Sage', group: 'palette', colorScheme: 'light', themeColor: '#f4f6f1', swatch: ['#f4f6f1', '#4a7458'] },
  { id: 'harbor', label: 'Harbor', group: 'palette', colorScheme: 'light', themeColor: '#f2f7f8', swatch: ['#f2f7f8', '#0f6e7e'] },
  { id: 'plum', label: 'Plum Noir', group: 'palette', colorScheme: 'dark', themeColor: '#140f17', swatch: ['#140f17', '#e2a6a0'] },
] as const

export const THEME_IDS = THEMES.map((t) => t.id) as ThemeId[]

/** localStorage key used to persist the visitor's choice. */
export const THEME_STORAGE_KEY = 'actus-theme'

/** Optional `?theme=<id>` URL parameter, handy for sharing a specific skin. */
export const THEME_QUERY_PARAM = 'theme'

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && (THEME_IDS as string[]).includes(value)
}

/**
 * Site-wide default. Override at build time with NEXT_PUBLIC_DEFAULT_THEME
 * (e.g. NEXT_PUBLIC_DEFAULT_THEME=dark-blue). Falls back to the base project.
 */
export const DEFAULT_THEME: ThemeId = isThemeId(process.env.NEXT_PUBLIC_DEFAULT_THEME)
  ? process.env.NEXT_PUBLIC_DEFAULT_THEME
  : 'white-blue'

export function getTheme(id: ThemeId): ThemeDefinition {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}

/** Applies a theme to <html>: data-theme attribute, `.dark` class, color-scheme and theme-color meta. */
export function applyThemeToDocument(id: ThemeId) {
  const theme = getTheme(id)
  const root = document.documentElement
  root.dataset.theme = theme.id
  root.classList.toggle('dark', theme.colorScheme === 'dark')
  root.style.colorScheme = theme.colorScheme
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', theme.themeColor))
}

/**
 * Inline script run in <head> before first paint so the stored theme is
 * applied without a flash of the default skin. Kept self-contained (no imports).
 */
export function themeBootScript(): string {
  const themes = Object.fromEntries(THEMES.map((t) => [t.id, [t.colorScheme, t.themeColor]]))
  return `(function(){try{var T=${JSON.stringify(themes)},d=${JSON.stringify(DEFAULT_THEME)},k=${JSON.stringify(
    THEME_STORAGE_KEY,
  )},q=new URLSearchParams(location.search).get(${JSON.stringify(THEME_QUERY_PARAM)}),s=null;try{s=localStorage.getItem(k)}catch(e){}var id=T[q]?q:T[s]?s:d,r=document.documentElement;r.setAttribute('data-theme',id);if(T[id][0]==='dark')r.classList.add('dark');r.style.colorScheme=T[id][0];}catch(e){}})();`
}
