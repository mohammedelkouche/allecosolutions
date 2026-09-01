import type { ContentDocument } from "@/lib/content";
import { MarkdownDocument } from "@/components/content/MarkdownDocument";
import { FrostedCard } from "@/components/ui/FrostedCard";

interface ContentPageProps {
  document: ContentDocument;
  eyebrow: string;
}

export function ContentPage({ document, eyebrow }: ContentPageProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <FrostedCard>
        <p className="text-sm font-semibold uppercase tracking-wide text-white/70">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold text-white">{document.title}</h1>
        <div className="mt-10">
          <MarkdownDocument
            body={document.body}
            className="max-w-prose text-justify text-lg leading-relaxed text-white/90 hyphens-auto"
          />
        </div>
      </FrostedCard>
    </main>
  );
}
