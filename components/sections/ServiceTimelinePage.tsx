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
      <section className="relative isolate overflow-hidden bg-foreground text-white">
        {/* Decorative background pattern, tinted with brand greens (canvas/SVG can't consume CSS vars). */}
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-35" viewBox="0 0 1440 620" fill="none" preserveAspectRatio="none">
          <path d="M-40 520L250 230L520 500L820 180L1080 440L1490 30" stroke="#4BA625" strokeWidth="1" />
          <path d="M-80 430L220 130L510 420L820 110L1110 400L1510 0" stroke="#8FD66C" strokeWidth="1" opacity="0.55" />
          <path d="M180 620L500 300L820 620M690 620L1010 300L1330 620" stroke="#2E7D32" strokeWidth="1" opacity="0.7" />
          <path d="M40 90H390L560 260H910L1080 90H1430M40 530H390L560 360H910L1080 530H1430" stroke="#6FC24A" strokeWidth="1" opacity="0.5" />
          <path d="M1050 70L1210 230L1050 390L890 230L1050 70ZM1210 230L1370 390L1210 550L1050 390L1210 230Z" stroke="#4BA625" strokeWidth="1.2" />
          <path d="M250 230L410 390L250 550L90 390L250 230ZM410 390L570 550L410 710L250 550L410 390Z" stroke="#2E7D32" strokeWidth="1" opacity="0.75" />
          <circle cx="560" cy="260" r="5" stroke="#8FD66C" strokeWidth="1" />
          <circle cx="560" cy="260" r="5" stroke="#8FD66C" strokeWidth="1" />
          <circle cx="910" cy="360" r="5" stroke="#8FD66C" strokeWidth="1" />
          <circle cx="1050" cy="230" r="5" fill="#4BA625" />
          <circle cx="250" cy="390" r="5" fill="#4BA625" />
        </svg>
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:px-8">
          <div className="max-w-xl">
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-5xl">{service.title}</h1>
          </div>
          {service.heroImage && (
            <div className="mx-auto inline-block w-full max-w-90 rounded-2xl border border-primary/30 bg-white/5 p-1 shadow-sm sm:p-1 lg:justify-self-end">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  width={360}
                  height={440}
                  priority
                  className="block h-auto w-full rounded-xl object-cover"
                />
              </div>
            </div>
          )}
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
