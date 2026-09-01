import ReactMarkdown from "react-markdown";

interface MarkdownDocumentProps {
  body: string;
}

export function MarkdownDocument({ body }: MarkdownDocumentProps) {
  return (
    <div className="prose max-w-prose text-lg leading-relaxed text-muted-foreground">
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
}
