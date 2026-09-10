import Image from "next/image";

// 404 UI for notFound() calls thrown inside [locale] routes and for unknown
// /{locale}/... paths. Renders within the [locale] layout (header/footer
// present). Static French copy: this page receives no params and the default
// locale of the site is fr.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
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
      {/* Plain <a>: no router dependency, "/" is normalized to the default
          locale by the next-intl proxy. */}
      <a
        href="/"
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Retour à l’accueil
      </a>
    </main>
  );
}
