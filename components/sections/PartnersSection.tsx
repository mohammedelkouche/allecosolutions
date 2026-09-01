import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FrostedCard } from "@/components/ui/FrostedCard";

interface Partner {
  name: string;
  src: string;
}

const partners: Partner[] = [
  { name: "CAEX", src: "/Our-partners/CAEX.png" },
  { name: "IZO10", src: "/Our-partners/IZO10.png" },
  { name: "CertiCasa", src: "/Our-partners/CERTICASA.png" },
];

export async function PartnersSection() {
  const t = await getTranslations("partners");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <FrostedCard className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">{t("eyebrow")}</p>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-justify text-lg leading-relaxed text-white/90 hyphens-auto">{t("subtitle")}</p>

        <div className="mt-10 grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 sm:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="relative flex h-16 w-full max-w-40 items-center justify-center rounded-lg bg-white p-3"
            >
              <Image
                src={partner.src}
                alt={t("logoAlt", { name: partner.name })}
                fill
                sizes="(min-width: 640px) 160px, 45vw"
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>
      </FrostedCard>
    </section>
  );
}
