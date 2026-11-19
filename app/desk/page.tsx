import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SignalDesk } from '@/components/desk/signal-desk'
import { pulseConfig } from '@/lib/pulse/config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Signal Desk',
  robots: { index: false, follow: false },
}

export default function DeskPage() {
  if (!pulseConfig().deskEnabled) notFound()
  return (
    <>
      <SiteHeader />
      <main id="main">
        <SignalDesk />
      </main>
      <SiteFooter />
    </>
  )
}
