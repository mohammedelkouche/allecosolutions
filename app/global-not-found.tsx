import type { Metadata } from "next";
import Image from "next/image";

import "./globals.css";

// Routing-level 404 for URLs that match NO route at all (e.g. paths with a
// file extension that the next-intl proxy skips). This app's root layout is
// the dynamic app/[locale]/layout.tsx, so a root not-found.tsx cannot be
// composed — Next 16's documented answer is global-not-found.tsx, which
// bypasses the layout and must therefore render its own <html>/<body> and
// import the global styles itself.
export const metadata: Metadata = {
  title: "404 — Page introuvable | Alleco Solutions",
  description: "La page que vous recherchez n’existe pas.",
};

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="flex min-h-screen items-center justify-center bg-background">
        <main className="flex flex-col items-center justify-center gap-6 px-4 text-center">
          <Image
            src="/Logoalleco.png"
            alt="Alleco Solutions"
            width={160}
            height={90}
            priority
          />
          <h1 className="text-3xl font-semibold text-foreground">
            404 — Page introuvable
          </h1>
          <p className="text-sm text-muted-foreground">
            La page que vous recherchez n’existe pas.
          </p>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Retour à l’accueil
          </a>
        </main>
      </body>
    </html>
  );
}
