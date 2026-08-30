import { getTranslations } from "next-intl/server";
import { StaticGlobe, type CountryMarker } from "@/components/sections/StaticGlobe";

export async function AllecosAboutIntro() {
  const t = await getTranslations("about.intro");
  const globeT = await getTranslations("international.globe");

  const markers: CountryMarker[] = [
    { id: "france", anchor: { x: 46, y: 40 }, position: { x: 49, y: 11 }, rotate: 1, image: "/locations/french.jpg", caption: globeT("france") },
    { id: "spain", anchor: { x: 39, y: 48 }, position: { x: 15, y: 34 }, rotate: -5, image: "/locations/spain.jpg", caption: globeT("spain") },
    { id: "morocco", anchor: { x: 39, y: 56 }, position: { x: 85, y: 62 }, rotate: 4, image: "/locations/morocco.jpg", caption: globeT("morocco") },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center">
          <h2 className="mb-6 text-4xl font-bold text-slate-950">
            {t("companyName")}
          </h2>
          
          <div className="space-y-6 text-lg text-slate-700">
            <p className="leading-relaxed">
              {t("mission")}
            </p>
            
            <p className="leading-relaxed">
              {t("description")}
            </p>
            
            <p className="leading-relaxed">
              {t("expertise")}
            </p>
            
            <p className="leading-relaxed">
              {t("approach")}
            </p>
            
            <p className="font-semibold text-amber-700">
              {t("objective")}
            </p>
          </div>
        </div>

        {/* Right: Globe */}
        <div className="flex items-center justify-center">
          <StaticGlobe markers={markers} className="mx-auto max-w-sm" />
        </div>
      </div>
    </section>
  );
}
