import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { WhatIs } from '@/components/home/what-is'
import { Audiences } from '@/components/home/audiences'
import { TryIt } from '@/components/home/try-it'
import { ResourcesStrip } from '@/components/home/resources-strip'
import { ShowcaseHub } from '@/components/home/showcase-hub'
import { Gallery } from '@/components/home/gallery'
import { Pulse } from '@/components/home/pulse'
import { GetInvolved } from '@/components/home/get-involved'
import { ContactSection } from '@/components/home/contact-section'

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-elevated focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <WhatIs />
        <Audiences />
        <TryIt />
        <ResourcesStrip />
        <ShowcaseHub />
        <Gallery />
        <Pulse />
        <GetInvolved />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
