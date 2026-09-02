import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutHero } from "@/components/sections/AboutHero";
import { AllecosAboutIntro } from "@/components/sections/AllecosAboutIntro";
import { MapNewsletterSection } from "@/components/sections/MapNewsletterSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
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
  return (
    <main className="w-full bg-background">
      <AboutHero />
      
      {/* ALLECO SOLUTIONS with Globe */}
      <AllecosAboutIntro />

      {/* Ils nous font confiance */}
      <PartnersSection />

      {/* Carte + newsletter */}
      <MapNewsletterSection />
    </main>
  );
}