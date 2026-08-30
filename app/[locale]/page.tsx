import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { AllecosAboutIntro } from "@/components/sections/AllecosAboutIntro";
import { createLocalizedMetadata } from "@/lib/seo";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return createLocalizedMetadata(locale, "/", t("metaTitle"), t("metaDescription"));
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main className="w-full bg-slate-100">
      <AboutHero />
      
      {/* ALLECO SOLUTIONS with Globe */}
      <AllecosAboutIntro />
      
      {/* Additional About Section */}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <AboutSection eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
      </div>
    </main>
  );
}