import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContentPage } from "@/components/content/ContentPage";
import { getInternationalPage } from "@/lib/content";
import { createLocalizedMetadata } from "@/lib/seo";

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const document = getInternationalPage(locale, "extension-maroc");
  return createLocalizedMetadata(locale, "/international/extension-maroc", document.metaTitle, document.metaDescription);
}

export default async function ExtensionMoroccoPage({ params }: PageProps) {
  const { locale } = await params;
  const [document, t] = await Promise.all([
    getInternationalPage(locale, "extension-maroc"),
    getTranslations({ locale, namespace: "pages.international" }),
  ]);
  return <ContentPage document={document} eyebrow={t("eyebrow")} />;
}
