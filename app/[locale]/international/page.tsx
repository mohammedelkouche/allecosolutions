import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createLocalizedMetadata } from "@/lib/seo";

interface InternationalPageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: InternationalPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.international" });
  return createLocalizedMetadata(locale, "/international", t("title"), t("metaDescription"));
}

export default async function InternationalPage({ params }: InternationalPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.international" });
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-slate-950">{t("title")}</h1>
        <p className="mt-6 text-base leading-relaxed text-slate-600">{t("intro")}</p>
      </div>
    </main>
  );
}
