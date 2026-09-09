import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { createLocalizedMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Google Form for spontaneous applications, opened in a new tab by the CTA.
const formUrl = process.env.NEXT_PUBLIC_REJOIGNEZ_NOUS_FORM_URL ?? "#";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.joinUs" });
  return createLocalizedMetadata(locale, "/rejoignez-nous", t("metaTitle"), t("metaDescription"));
}

export default async function JoinUsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.joinUs" });

  return (
    <main className="w-full">
      {/* Hero — full-bleed background image with the title and subtitle
          displayed on top of it, centered, over a dark overlay for legibility. */}
      <section className="relative isolate flex min-h-[520px] items-center justify-center overflow-hidden bg-secondary">
        {/* Optimized hero photo (resized 1920px / ~600KB instead of the 4.4MB
            original) so the background paints immediately; --priority and
            fetchPriority=high make the browser preload it. The section's
            bg-secondary shows instantly if the photo is still decoding. */}
        <Image
          src="/rejoignez-nous-hero.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay so the white title/subtitle stay legible over the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/70"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          {/* <h1 className="text-6xl font-bold text-[#18ff00]">{t("heroTitle")}</h1> */}
          <h1 className="text-6xl font-bold text-primary">{t("heroTitle")}</h1>
          {/* <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90"> */}
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/90">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Two-column section — the charcoal background covers the WHOLE band
          (image + texts on the left, CTA on the right). LEFT: branding graphic
          + corporate text, RIGHT: spontaneous-application CTA with the Google
          Form button. */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Charcoal CARD (inset, rounded) wrapping both columns — not full-bleed. */}
        {/* <div className="rounded-2xl border border-white/10 bg-[#3d3f3f]/97 p-6 shadow-xl backdrop-blur-lg sm:p-10"> */}
        <div className="rounded-2xl border border-white/10 bg-secondary p-6 shadow-xl backdrop-blur-lg sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
            {/* LEFT — visual & branding */}
            <div>
              {/* <div className="relative mx-auto aspect-square w-full max-w-56 overflow-hidden"> */}
              <div className="relative mx-auto aspect-square w-full max-w-45 overflow-hidden">
                <Image
                  src="/rejoignez-nous-content.png"
                  alt={t("heroTitle")}
                  fill
                  sizes="180px"
                  // sizes="(min-width: 1024px) 224px, 224px"
                  // sizes="(min-width: 100px) 100px, 100px"
                  className="object-contain"
                />
              </div>
              {/* <div className="mx-auto mt-8 max-w-2xl space-y-4 text-justify text-base leading-relaxed text-slate-200 hyphens-auto"> */}
              <div className="mx-auto max-w-2xl text-justify text-base leading-relaxed text-black hyphens-auto">
                <p>{t("corporateText1")}</p>
                <p>{t("corporateText2")}</p>
                <p>{t("corporateText3")}</p>
                <p>{t("corporateText4")}</p>
                <p>{t("corporateText5")}</p>
              </div>
            </div>

            {/* RIGHT — call to action */}
            <div className="flex flex-col items-center justify-center text-center">
              {/* Alleco Solutions logo above the CTA text — slightly bigger,
                  with top/bottom margins, aligned with the top of the left
                  content image */}
              <Image
                src="/Logoalleco.png"
                alt="Alleco Solutions"
                // width={226}
                width={226}
                height={128}
                // className="my-6 h-14 w-auto object-contain lg:my-8"
                className="my-6 h-24 w-auto object-contain lg:my-8"
              />
              {/* <p className="max-w-md text-3xl leading-relaxed text-black "> */}
              <p className="mt-6 max-w-md font-semibold leading-relaxed text-black ">
                {t("ctaText")}
              </p>
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4BA625] to-[#6BC53F] px-10 text-base font-semibold text-white shadow-lg shadow-[#4BA625]/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4BA625]/50 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4BA625] active:translate-y-0"
              >
                {t("ctaButton")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
