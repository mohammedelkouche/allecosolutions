import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/lib/content";
import { createLocalizedMetadata } from "@/lib/seo";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return createLocalizedMetadata(locale, "/services", t("title"), t("metaDescription"));
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  const services = getServices(locale);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-foreground">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("intro")}</p>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.slug} className="rounded-md border border-border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">{service.title}</h2>
            <Link href={`/services/${service.slug}`} className="mt-6 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              {t("readMore")}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
