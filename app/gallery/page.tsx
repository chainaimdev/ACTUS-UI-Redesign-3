import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealSection } from "@/components/gallery/reveal-section";
import { categoryIcon } from "@/components/gallery/category-icons";
import { GalleryCard } from "@/components/home/gallery";
import { galleryCategories, galleryItems, galleryPage } from "@/data/gallery";

export const metadata: Metadata = {
  title: galleryPage.metaTitle,
  description: galleryPage.metaDescription,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const sections = galleryCategories.map((category) => ({
    ...category,
    items: galleryItems.filter((item) => item.category === category.id),
  }));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-elevated focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="gallery-stage text-white">
        {/* ---------- Page hero ---------- */}
        <RevealSection
          aria-labelledby="gallery-page-heading"
          className="gallery-stage relative isolate overflow-hidden pt-10 pb-14 md:pt-14 md:pb-20"
          threshold={0}
        >
          <div
            aria-hidden="true"
            className="gallery-backdrop pointer-events-none absolute inset-0 -z-10"
          />
          <div className="gallery-head mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1.5 text-sm text-white/60">
                  <li>
                    <Link
                      href="/"
                      className="rounded-sm transition-colors hover:text-white"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="size-3.5" />
                  </li>
                  <li aria-current="page" className="text-white">
                    {galleryPage.title}
                  </li>
                </ol>
              </nav>
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--footer-bg)] shadow-[0_10px_30px_-12px_rgb(255_255_255/0.45)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <ArrowLeft
                  className="size-4 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                {galleryPage.backLabel}
              </Link>
            </div>

            <p className="mt-10 mb-3 text-sm font-semibold tracking-widest text-[var(--gallery-accent)] uppercase">
              {galleryPage.eyebrow}
            </p>
            <h1
              id="gallery-page-heading"
              className="text-5xl leading-[1.02] text-white md:text-6xl lg:text-7xl"
            >
              {galleryPage.title}
            </h1>
            <div
              aria-hidden="true"
              className="gallery-rule mt-6 h-[3px] w-16 rounded-full"
            />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/70 md:text-xl">
              {galleryPage.description}
            </p>
          </div>
        </RevealSection>

        {/* ---------- One section per category ---------- */}
        {sections.map((section) => {
          const Icon = categoryIcon[section.id];
          const headingId = `${section.id}-heading`;
          return (
            <RevealSection
              key={section.id}
              id={section.id}
              aria-labelledby={headingId}
              className="gallery-stage scroll-mt-20 border-t border-white/10 py-14 md:py-20"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="gallery-head flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--gallery-accent)]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h2
                        id={headingId}
                        className="text-3xl text-white md:text-4xl"
                      >
                        {section.label}
                      </h2>
                      <p className="mt-2 max-w-xl text-white/65">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white/50 tabular-nums">
                    {section.items.length}{" "}
                    {section.items.length === 1 ? "item" : "items"}
                  </p>
                </div>

                {section.items.length > 0 ? (
                  <ul className="mt-10 grid auto-rows-[300px] gap-4 md:grid-cols-2 md:auto-rows-[340px]">
                    {section.items.map((item, index) => (
                      <li
                        key={item.id}
                        className={
                          item.poster
                            ? "gallery-item row-span-2 sm:row-span-1 md:col-span-2"
                            : "gallery-item"
                        }
                        style={{ "--i": index } as React.CSSProperties}
                      >
                        <GalleryCard item={item} large />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="gallery-head mt-10 rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/60">
                    Nothing here yet. Check back soon.
                  </p>
                )}
              </div>
            </RevealSection>
          );
        })}

        {/* ---------- Back to home ---------- */}
        <div className="border-t border-white/10 py-12">
          <div className="mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <ArrowLeft
                className="size-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              {galleryPage.backLabel}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
