import Image from "next/image";
import type { ContentDocument } from "@/lib/content";
import { MarkdownDocument } from "@/components/content/MarkdownDocument";
import { FrostedCard } from "@/components/ui/FrostedCard";

interface ContentPageProps {
  document: ContentDocument;
  eyebrow: string;
  /** Optional image rendered to the LEFT of the content text (e.g. Formations). */
  image?: string;
}

export function ContentPage({ document, eyebrow, image }: ContentPageProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <FrostedCard>
        <div
          className={
            image
              ? "grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch"
              : ""
          }
        >
          {/* Left column: illustration image (desktop), stacked above on mobile */}
          {image && (
            <div className="relative aspect-4/3 overflow-hidden rounded-xl lg:aspect-auto lg:h-auto lg:min-h-96">
              <Image
                src={image}
                alt={document.title}
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">{eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold text-white">{document.title}</h1>
            <div className="mt-10">
              <MarkdownDocument
                body={document.body}
                className="mx-auto text-justify max-w-3xl text-lg leading-relaxed text-slate-200 hyphens-auto"
              />
            </div>
          </div>
        </div>
      </FrostedCard>
    </main>
  );
}
