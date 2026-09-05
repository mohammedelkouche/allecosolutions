import Image from "next/image";
import { getTranslations } from "next-intl/server";

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
    // Full-width white band: the partner section no longer uses the dark
    // FrostedCard background.
    <section className="w-full bg-white py-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-black hyphens-auto">{t("subtitle")}</p>

        <div className="mt-10 grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 sm:gap-12">
          {partners.map((partner) => (
            // No white box behind the logos: the PNGs have transparent
            // backgrounds (verified), so they sit directly on the white band.
            <div
              key={partner.name}
              className="relative flex h-16 w-full max-w-40 items-center justify-center"
            >
              <Image
                src={partner.src}
                alt={t("logoAlt", { name: partner.name })}
                fill
                sizes="(min-width: 640px) 160px, 45vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
