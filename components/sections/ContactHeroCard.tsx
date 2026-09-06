import Image from "next/image";
import { MarkdownDocument } from "@/components/content/MarkdownDocument";

interface ContactHeroCardProps {
  eyebrow: string;
  title: string;
  /** Raw markdown body of the contact page (already env-expanded). */
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

// Contact hero card, split in two halves: decorative photo on the left, dark
// charcoal content card on the right (same charcoal as FrostedCard). The world
// map is a subtle watermark overlay in the card's top-right corner. On mobile
// the halves stack (photo on top, content below).
export function ContactHeroCard({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
}: ContactHeroCardProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-2xl shadow-xl lg:flex-row">
      {/* LEFT HALF — decorative photo (hand holding a headset). */}
      <div className="relative min-h-[220px] w-full lg:min-h-[420px] lg:w-2/5">
        <Image
          src="/contactez-nous.jpg"
          fill
          className="object-cover object-center"
          alt=""
          aria-hidden="true"
        />
      </div>

      {/* RIGHT HALF — dark content card. Charcoal value reused from
          components/ui/FrostedCard.tsx (bg-[#3d3f3f]/97 + backdrop-blur). */}
      <div className="relative flex flex-col justify-center gap-6 bg-[#3d3f3f]/97 p-8 backdrop-blur-lg lg:w-3/5">
        {/* World map watermark, top-right corner (decorative only). */}
        <div className="pointer-events-none absolute right-4 top-4 h-20 w-28 opacity-60">
          <Image
            src="/World_map.png"
            fill
            className="object-contain"
            alt=""
            aria-hidden="true"
          />
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-white/60">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-bold text-white lg:text-4xl">{title}</h1>

        <div className="text-base leading-relaxed text-white/85 hyphens-auto text-justify">
          <MarkdownDocument
            body={body}
            className="text-base leading-relaxed text-white/85 hyphens-auto text-justify"
          />
        </div>

        {/* CTA — external Google Form, opened in a new tab. */}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}