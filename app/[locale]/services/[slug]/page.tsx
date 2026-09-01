import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTimelinePage } from "@/components/sections/ServiceTimelinePage";
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

  return <ServiceTimelinePage service={service} />;
}

