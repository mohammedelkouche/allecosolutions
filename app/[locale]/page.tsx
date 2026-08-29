import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createLocalizedMetadata } from "@/lib/seo";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return createLocalizedMetadata(locale, "/", t("metaTitle"), t("metaDescription"));
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <main id="accueil" className="flex flex-1 items-center justify-center px-6 py-24">
        <h1 className="text-center text-4xl font-semibold text-slate-950">
          {t("title")}
        </h1>
      </main>
    </div>
  );
}