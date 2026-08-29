import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MarkdownDocument } from "@/components/content/MarkdownDocument";
import { EnergyEfficiencyService } from "@/components/sections/EnergyEfficiencyService";
import { getService } from "@/lib/content";
import { serviceSlugs } from "@/lib/navigation";
import { createLocalizedMetadata } from "@/lib/seo";

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return ["fr", "es"].flatMap((locale) =>
    serviceSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!serviceSlugs.includes(slug as (typeof serviceSlugs)[number])) notFound();
  const service = getService(locale, slug);
  return createLocalizedMetadata(locale, `/services/${slug}`, service.metaTitle, service.metaDescription);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  if (!serviceSlugs.includes(slug as (typeof serviceSlugs)[number])) notFound();
  const service = getService(locale, slug);
  const t = await getTranslations({ locale, namespace: "pages.service" });

  if (slug === "efficacite-energetique") {
    return <EnergyEfficiencyService service={service} />;
  }

  return (
    <main className="bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">{t("eyebrow")}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-slate-950 md:text-5xl">{service.title}</h1>

        {service.heroImage && (
          <div className="relative mx-auto mt-10 aspect-16/7 max-w-5xl overflow-hidden rounded-2xl bg-white shadow-sm">
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {service.sections?.map((section) => (
          <section key={section.title} className="mt-12 grid gap-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1fr)] lg:items-start lg:p-12">
            {section.image && (
              <div className="relative order-2 flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-4 sm:p-6 lg:order-1">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  sizes="(min-width: 1024px) 384px, 100vw"
                  className="object-contain"
                />
              </div>
            )}
            <div className="order-1 max-w-prose lg:order-2">
              <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">{section.title}</h2>
              <div className="mt-5"><MarkdownDocument body={section.body} /></div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
