import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContentPage } from "@/components/content/ContentPage";
import { getInternationalPage } from "@/lib/content";
import { createLocalizedMetadata } from "@/lib/seo";

interface PageProps { params: Promise<{ locale: string }> }

// The Morocco page content lives in files named
// "Implantation & Développement au Maroc.md" in content/{locale}/international/.
// The URL slug stays /international/extension-maroc (stable, no accents/spaces).
const MOROCCO_CONTENT_SLUG = "Implantation & Développement au Maroc";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const document = getInternationalPage(locale, MOROCCO_CONTENT_SLUG);
  return createLocalizedMetadata(locale, "/international/extension-maroc", document.metaTitle, document.metaDescription);
}

export default async function ExtensionMoroccoPage({ params }: PageProps) {
  const { locale } = await params;
  const [document, t] = await Promise.all([
    getInternationalPage(locale, MOROCCO_CONTENT_SLUG),
    getTranslations({ locale, namespace: "pages.international" }),
  ]);
  return <ContentPage document={document} eyebrow={t("eyebrow")} />;
}
