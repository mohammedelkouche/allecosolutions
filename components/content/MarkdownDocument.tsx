import ReactMarkdown from "react-markdown";

interface MarkdownDocumentProps {
  body: string;
  className?: string;
}

export function MarkdownDocument({
  body,
  className = "prose max-w-prose text-lg leading-relaxed text-muted-foreground",
}: MarkdownDocumentProps) {
  return (
    <div className={className}>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
}
