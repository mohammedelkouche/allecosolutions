import ReactMarkdown from "react-markdown";

interface MarkdownDocumentProps {
  body: string;
}

export function MarkdownDocument({ body }: MarkdownDocumentProps) {
  return (
    <div className="prose prose-slate max-w-prose text-lg leading-relaxed text-slate-700">
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
}
