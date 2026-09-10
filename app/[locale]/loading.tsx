import Image from "next/image";
import { getTranslations } from "next-intl/server";

// Server Component on purpose (Next.js default for loading.tsx): the loading
// word resolves via getTranslations, so no client boundary is needed and the
// fallback stays prerenderable per locale.
export default async function Loading() {
  const t = await getTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-4">
      <Image
        src="/Logoalleco.png"
        alt="Alleco Solutions"
        width={160}
        height={90}
        priority
      />
      <div className="flex flex-col items-center gap-4">
        <span
          aria-hidden="true"
          className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent"
        />
        <p className="text-sm text-muted-foreground">{t("loading")}</p>
      </div>
    </main>
  );
}
