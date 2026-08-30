import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutSection } from "@/components/sections/AboutSection";
import InternationalGlobeSection from "@/components/sections/InternationalGlobeSection";
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
  const aboutT = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <main id="accueil" className="w-full">
        <section className="flex items-center justify-center px-6 py-24">
          <h1 className="text-center text-4xl font-semibold text-slate-950 md:text-6xl">
            {t("title")}
          </h1>
        </section>

        <InternationalGlobeSection />
        <AboutSection eyebrow={aboutT("eyebrow")} title={aboutT("title")} body={aboutT("body")} />
      </main>
    </div>
  );
}