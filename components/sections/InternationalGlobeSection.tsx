import { getTranslations } from "next-intl/server";
import { GlobePolaroids, type PolaroidMarker } from "@/components/sections/GlobePolaroids";

export default async function InternationalGlobeSection() {
  const t = await getTranslations("international.globe");

  const markers: PolaroidMarker[] = [
    {
      id: "polaroid-france",
      location: [46.6034, 1.8883],
      image: "/locations/french.jpg",
      caption: t("france"),
      rotate: 2,
    },
    {
      id: "polaroid-spain",
      location: [40.4637, -3.7492],
      image: "/locations/spain.jpg",
      caption: t("spain"),
      rotate: -4,
    },
    {
      id: "polaroid-morocco",
      location: [31.7917, -7.0926],
      image: "/locations/morocco.jpg",
      caption: t("morocco"),
      rotate: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">{t("title")}</h2>
        <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
      </div>
      <GlobePolaroids markers={markers} className="mx-auto max-w-lg" />
    </section>
  );
}
