import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ContentPage } from "@/components/content/ContentPage";
import { getCountry } from "@/lib/content";
import { countries } from "@/lib/navigation";
import { createLocalizedMetadata } from "@/lib/seo";

interface PageProps { params: Promise<{ locale: string; country: string }> }

export function generateStaticParams() {
  return ["fr", "es"].flatMap((locale) => countries.map((country) => ({ locale, country })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, country } = await params;
  if (!countries.includes(country as (typeof countries)[number])) notFound();
  const document = getCountry(locale, country);
  return createLocalizedMetadata(locale, `/international/renovation-energetique/${country}`, document.metaTitle, document.metaDescription);
}

export default async function CountryPage({ params }: PageProps) {
  const { locale, country } = await params;
  if (!countries.includes(country as (typeof countries)[number])) notFound();
  const [document, t] = await Promise.all([
    getCountry(locale, country),
    getTranslations({ locale, namespace: "pages.renovation" }),
  ]);
  return <ContentPage document={document} eyebrow={t("eyebrow")} />;
}
