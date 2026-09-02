import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContentPage } from "@/components/content/ContentPage";
import { getContactPage } from "@/lib/content";
import { createLocalizedMetadata } from "@/lib/seo";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const document = getContactPage(locale);
  return createLocalizedMetadata(locale, "/contact", document.metaTitle, document.metaDescription);
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const [document, t] = await Promise.all([
    getContactPage(locale),
    getTranslations({ locale, namespace: "contact" }),
  ]);
  return <ContentPage document={document} eyebrow={t("eyebrow")} />;
}