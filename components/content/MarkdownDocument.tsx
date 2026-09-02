import ReactMarkdown from "react-markdown";
import type { Element } from "hast";
import { ArrowRight } from "lucide-react";

interface MarkdownDocumentProps {
  body: string;
  className?: string;
}

// Section headings (## / ### / ####) are rendered in a bold brand-green that
// stands out clearly against the white body paragraphs on the dark FrostedCard
// surfaces (ContentPage / ServiceTimelinePage). The light green matches the
// brand line-art used elsewhere on the site and keeps strong contrast on the
// near-black card backgrounds.
const headingBase =
  "mb-3 mt-8 font-bold text-[#8FD66C] first:mt-0";
const headingSizes: Record<string, string> = {
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-lg",
};

// Bullet lists are indented from the left so they clearly read as sub-items
// of the sentence introducing them (e.g. "Interventions notamment sur les :").
const ulClass = "my-4 ml-6 list-disc space-y-2 pl-2 marker:text-[#8FD66C]";

// Call-to-action: a paragraph containing ONLY a link is rendered as a button
// (e.g. "[Remplir le formulaire](https://forms.gle/...)" on the Morocco page).
// Authors get the CTA look just by putting the link alone in its own paragraph.
function isStandaloneLink(paragraph: Element): boolean {
  const children = paragraph.children;
  return children.length === 1 && children[0].type === "element" && children[0].tagName === "a";
}

function getLinkHref(anchor: Element): string {
  const href = anchor.properties?.href;
  return typeof href === "string" ? href : "#";
}

function getLinkText(anchor: Element): string {
  const first = anchor.children[0];
  return first && first.type === "text" ? first.value : "";
}

// Attractive CTA button: brand gradient, glowing shadow, subtle scale on hover
// and an arrow that slides right to invite the click.
const ctaButtonClass =
  "group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#4BA625] to-[#6BC53F] px-10 text-lg font-semibold text-white shadow-lg shadow-[#4BA625]/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4BA625]/50 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4BA625] active:translate-y-0 active:shadow-md";

const ctaArrowClass =
  "h-5 w-5 transition-transform duration-200 group-hover:translate-x-1.5";

export function MarkdownDocument({
  body,
  className = "prose max-w-prose text-lg leading-relaxed text-muted-foreground",
}: MarkdownDocumentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          h2: ({ children }) => <h2 className={`${headingBase} ${headingSizes.h2}`}>{children}</h2>,
          h3: ({ children }) => <h3 className={`${headingBase} ${headingSizes.h3}`}>{children}</h3>,
          h4: ({ children }) => <h4 className={`${headingBase} ${headingSizes.h4}`}>{children}</h4>,
          ul: ({ children }) => <ul className={ulClass}>{children}</ul>,
          ol: ({ children }) => <ol className={`${ulClass} list-decimal`}>{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          p: ({ node, children }) => {
            if (isStandaloneLink(node)) {
              const anchor = node.children[0] as Element;
              return (
                <p className="mt-8">
                  <a
                    href={getLinkHref(anchor)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaButtonClass}
                  >
                    {getLinkText(anchor)}
                    <ArrowRight className={ctaArrowClass} aria-hidden="true" />
                  </a>
                </p>
              );
            }
            return <p>{children}</p>;
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
