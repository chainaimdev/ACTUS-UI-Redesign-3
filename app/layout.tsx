import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { DEFAULT_THEME, getTheme, themeBootScript } from '@/lib/themes'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.actusfrf.org'),
  title: 'ACTUS — Algorithmic Contract Types Unified Standards',
  description:
    'ACTUS Financial Research Foundation stewards the open, machine-readable standard for financial contracts — empowering efficient, transparent and consistent financial ecosystems.',
  generator: 'v0.app',
  openGraph: {
    title: 'ACTUS — Finance speaks one language',
    description: 'The open, machine-readable standard for financial contracts.',
    siteName: 'ACTUS Financial Research Foundation',
    type: 'website',
  },
  icons: {
    // Official ACTUS favicon (ACTUS-Logos/ACTUS Favicon.png), web sizes in /public/brand.
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/brand/favicon-32-dark.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/brand/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/brand/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/brand/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: getTheme(DEFAULT_THEME).colorScheme,
  themeColor: getTheme(DEFAULT_THEME).themeColor,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}
      // The boot script may swap data-theme / .dark before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Applies the stored / ?theme= skin before first paint (no flash of the default theme). */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript() }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
