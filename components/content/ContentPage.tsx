import type { ContentDocument } from "@/lib/content";
import { MarkdownDocument } from "@/components/content/MarkdownDocument";

interface ContentPageProps {
  document: ContentDocument;
  eyebrow: string;
}

export function ContentPage({ document, eyebrow }: ContentPageProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold text-foreground">{document.title}</h1>
      <div className="mt-10"><MarkdownDocument body={document.body} /></div>
    </main>
  );
}
