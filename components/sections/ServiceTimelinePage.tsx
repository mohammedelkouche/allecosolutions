import Image from "next/image";
import type { ContentDocument, ContentSection } from "@/lib/content";
import { MarkdownDocument } from "@/components/content/MarkdownDocument";
import { FrostedCard } from "@/components/ui/FrostedCard";

interface ServiceTimelinePageProps {
  service: ContentDocument;
}

interface ServiceSectionProps {
  section: ContentSection;
  index: number;
}

function ServiceSection({ section, index }: ServiceSectionProps) {
  const isReversed = index % 2 === 1;

  return (
    <article className="relative">
      {/* Desktop-only timeline segment for THIS card: top dot → vertical line →
          bottom dot, all vertically centered on the card's horizontal midpoint.
          Hidden on mobile (no dot/line/layout impact). z-10 keeps them above the
          opaque FrostedCard background. */}
      {/* Top dot — sits on the top border (half above / half below), centered. */}
      <span aria-hidden="true" className="absolute left-1/2 top-0 z-10 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow-sm lg:flex" />
      {/* Vertical line — from just below the top dot to just above the bottom.
          White and semi-bold (w-0.5) for clear visibility against the card. */}
      <span aria-hidden="true" className="absolute left-1/2 top-4 bottom-4 z-10 hidden w-0.5 -translate-x-1/2 bg-white lg:block" />
      {/* Bottom dot — sits on the bottom border, mirroring the top dot. */}
      <span aria-hidden="true" className="absolute bottom-0 left-1/2 z-10 hidden size-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-primary shadow-sm lg:flex" />
      {/* Single unified card: image inset on one side, heading + text directly on the card background on the other. */}
      <FrostedCard className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
        {section.image && (
          <div className={`relative order-2 aspect-4/3 overflow-hidden rounded-xl ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
            <Image
              src={section.image}
              alt={section.title}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className={`order-1 ${isReversed ? "lg:order-1" : "lg:order-2"} ${section.image ? "" : "lg:col-span-2"}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">0{index + 1}</p>
          <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">{section.title}</h2>
          <div className="mt-5">
            <MarkdownDocument
              body={section.body}
              className="max-w-prose text-justify text-lg leading-relaxed text-slate-200 hyphens-auto"
            />
          </div>
        </div>
      </FrostedCard>
    </article>
  );
}


export function ServiceTimelinePage({ service }: ServiceTimelinePageProps) {
  const sections = service.sections ?? [];

  return (
    <main className="bg-white">
      {/* Full-viewport-width hero: each service's own image as the background
          layer (fills the entire viewport, edge to edge), with a dark gradient
          on top so the page title stays legible over any photo. The image is
          the hero itself — the previous inset framed picture and the dark
          bg-foreground + SVG decoration were removed. */}
      {/* Hero height: min-h gives the full-bleed background its height (the
          fill Image stretches to fill it); padding adds breathing room for the title. */}
      <section className="relative isolate min-h-[320px] overflow-hidden text-white md:min-h-[420px]">
        {service.heroImage ? (
          <>
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Dark gradient overlay so the title is always legible. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10"
            />
          </>
        ) : (
          // Fallback for a service without a hero image: neutral dark surface.
          <div aria-hidden="true" className="absolute inset-0 bg-[#3d3f3f]" />
        )}
        <div className="relative mx-auto flex w-full max-w-6xl items-end px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-normal drop-shadow-md text-white md:text-5xl">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="relative space-y-10 lg:space-y-14">
          {sections.map((section, index) => <ServiceSection key={section.title} section={section} index={index} />)}
        </div>
      </section>
    </main>
  );
}
