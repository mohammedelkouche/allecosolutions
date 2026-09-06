import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactHeroCard } from "@/components/sections/ContactHeroCard";
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
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <ContactHeroCard
        eyebrow={t("eyebrow")}
        title={document.title}
        body={document.body}
        ctaLabel={t("cta")}
        ctaHref={process.env.NEXT_PUBLIC_CONTACT_FORM_URL ?? "#"}
      />
    </main>
  );
}