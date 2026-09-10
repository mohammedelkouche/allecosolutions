"use client";

import Image from "next/image";
import { useEffect } from "react";

// Next.js 16: error boundaries receive `retry` (stable since 16.3), the
// recommended recovery prop — it re-fetches AND re-renders the failed segment.
// The user-facing copy is intentionally static French (default locale): the
// error may occur before the intl provider is available, and no technical
// details (error.message / error.stack) must ever leak to the user.
interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    // Forward to an error reporting service when one is configured.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <Image
        src="/Logoalleco.png"
        alt="Alleco Solutions"
        width={160}
        height={90}
        priority
      />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Une erreur est survenue.
        </h1>
        <p className="text-sm text-muted-foreground">Veuillez réessayer.</p>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Réessayer
        </button>
        {/* Plain <a> on purpose: next/link depends on the router, which we
            avoid in an error state. "/" is normalized to the default locale
            by the next-intl proxy. */}
        <a
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Retour à l’accueil
        </a>
      </div>
    </main>
  );
}
