import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://allecosolutions.com";

export function createLocalizedMetadata(
  locale: string,
  pathname: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}${pathname}`,
      languages: {
        fr: `${siteUrl}/fr${pathname}`,
        es: `${siteUrl}/es${pathname}`,
      },
    },
  };
}
