import { getTranslations } from "next-intl/server";
import { StaticGlobe, type CountryMarker } from "@/components/sections/StaticGlobe";

export default async function InternationalGlobeSection() {
  const t = await getTranslations("international.globe");

  const markers: CountryMarker[] = [
    { id: "france", anchor: { x: 50, y: 38 }, position: { x: 54, y: 11 }, rotate: 2, image: "/locations/french.jpg", caption: t("france") },
    { id: "spain", anchor: { x: 45, y: 47 }, position: { x: 15, y: 34 }, rotate: -5, image: "/locations/spain.jpg", caption: t("spain") },
    { id: "morocco", anchor: { x: 47, y: 52 }, position: { x: 85, y: 62 }, rotate: 4, image: "/locations/morocco.jpg", caption: t("morocco") },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">{t("title")}</h2>
        <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
      </div>
      <StaticGlobe markers={markers} className="mx-auto max-w-lg" />
    </section>
  );
}