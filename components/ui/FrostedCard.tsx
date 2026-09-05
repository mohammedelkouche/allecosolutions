import type { ReactNode } from "react";

interface FrostedCardProps {
  children: ReactNode;
  className?: string;
  /** When true, renders as a full-width (full-bleed) band instead of an inset rounded card. */
  fullBleed?: boolean;
}

// Shared dark frosted-glass panel used directly as the card container across the site.
// Warm neutral dark charcoal (#3d3f3f, ~97% opaque) sampled from the reference
// screenshot — no green/blue/slate tint. The high opacity keeps text legible
// over busy photos while /97 lets the backdrop-blur register a subtle frost.
export function FrostedCard({
  children,
  className = "",
  fullBleed = false,
}: FrostedCardProps) {
  // Full-bleed variant: the background spans edge-to-edge (no rounded corners,
  // no fixed max-width), while the actual content is centered in an inner
  // wrapper so headings/paragraphs stay at a readable width.
  if (fullBleed) {
    return (
      <div
        className={`relative w-full border-y border-white/10 bg-[#3d3f3f]/97 shadow-xl backdrop-blur-lg ${className}`}
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-[#3d3f3f]/97 p-6 shadow-xl backdrop-blur-lg sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
