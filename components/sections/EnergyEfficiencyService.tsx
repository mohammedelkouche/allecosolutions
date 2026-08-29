import Image from "next/image";
import type { ContentDocument, ContentSection } from "@/lib/content";
import { MarkdownDocument } from "@/components/content/MarkdownDocument";

interface EnergyEfficiencyServiceProps {
  service: ContentDocument;
}

interface ServiceSectionProps {
  section: ContentSection;
  index: number;
}

function ServiceSection({ section, index }: ServiceSectionProps) {
  const isReversed = index % 2 === 1;

  return (
    <article className="relative grid gap-8 pl-8 sm:pl-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pl-0">
      <span aria-hidden="true" className="absolute left-0 top-2 size-4 rounded-full border-4 border-white bg-amber-600 shadow-sm lg:left-1/2 lg:-translate-x-1/2" />
      <div className={`order-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
        {section.image && (
          <div className="relative aspect-4/3">
            <Image
              src={section.image}
              alt={section.title}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-contain"
            />
          </div>
        )}
      </div>
      <div className={`order-1 max-w-prose ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-700">0{index + 1}</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950 md:text-3xl">{section.title}</h2>
        <div className="mt-5 text-lg leading-relaxed text-slate-700">
          <MarkdownDocument body={section.body} />
        </div>
      </div>
    </article>
  );
}

export function EnergyEfficiencyService({ service }: EnergyEfficiencyServiceProps) {
  const sections = service.sections ?? [];

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-35" viewBox="0 0 1440 620" fill="none" preserveAspectRatio="none">
          <path d="M-40 520L250 230L520 500L820 180L1080 440L1490 30" stroke="#D6A84F" strokeWidth="1" />
          <path d="M-80 430L220 130L510 420L820 110L1110 400L1510 0" stroke="#F0C978" strokeWidth="1" opacity="0.55" />
          <path d="M180 620L500 300L820 620M690 620L1010 300L1330 620" stroke="#C58B32" strokeWidth="1" opacity="0.7" />
          <path d="M40 90H390L560 260H910L1080 90H1430M40 530H390L560 360H910L1080 530H1430" stroke="#E6B95D" strokeWidth="1" opacity="0.5" />
          <path d="M1050 70L1210 230L1050 390L890 230L1050 70ZM1210 230L1370 390L1210 550L1050 390L1210 230Z" stroke="#D6A84F" strokeWidth="1.2" />
          <path d="M250 230L410 390L250 550L90 390L250 230ZM410 390L570 550L410 710L250 550L410 390Z" stroke="#C58B32" strokeWidth="1" opacity="0.75" />
          <circle cx="560" cy="260" r="5" stroke="#F0C978" strokeWidth="1" />
          <circle cx="910" cy="360" r="5" stroke="#F0C978" strokeWidth="1" />
          <circle cx="1050" cy="230" r="5" fill="#D6A84F" />
          <circle cx="250" cy="390" r="5" fill="#D6A84F" />
        </svg>
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="max-w-xl">
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-5xl">{service.title}</h1>
          </div>
          {service.heroImage && (
            <div className="relative mx-auto aspect-16/9 w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-200/60 bg-white/5 p-3 shadow-sm sm:p-5">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="relative space-y-16 before:absolute before:bottom-0 before:left-2 before:top-0 before:w-px before:bg-amber-200 lg:space-y-24 lg:before:left-1/2">
          {sections.map((section, index) => <ServiceSection key={section.title} section={section} index={index} />)}
        </div>
      </section>
    </main>
  );
}
