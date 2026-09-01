import type { ReactNode } from "react";

interface FrostedCardProps {
  children: ReactNode;
  className?: string;
}

// Shared dark frosted-glass panel used directly as the card container across the site.
export function FrostedCard({ children, className = "" }: FrostedCardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-slate-950/90 p-6 backdrop-blur-md sm:p-8 ${className}`}
    >
      {children}

    </div>
  );
}
