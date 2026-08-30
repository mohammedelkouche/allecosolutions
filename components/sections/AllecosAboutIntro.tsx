import { getTranslations } from "next-intl/server";
import { GlobePolaroids, type PolaroidMarker } from "@/components/sections/GlobePolaroids";

export async function AllecosAboutIntro() {
  const t = await getTranslations("about.intro");
  const globeT = await getTranslations("international.globe");

  const markers: PolaroidMarker[] = [
    {
      id: "polaroid-france",
      location: [46.6034, 1.8883],
      image: "/locations/french.jpg",
      caption: globeT("france"),
      rotate: 2,
    },
    {
      id: "polaroid-spain",
      location: [40.4637, -3.7492],
      image: "/locations/spain.jpg",
      caption: globeT("spain"),
      rotate: -4,
    },
    {
      id: "polaroid-morocco",
      location: [31.7917, -7.0926],
      image: "/locations/morocco.jpg",
      caption: globeT("morocco"),
      rotate: 5,
    },
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

        {/* Right: Globe Polaroids */}
        <div className="flex items-center justify-center">
          <GlobePolaroids markers={markers} className="mx-auto max-w-sm" />
        </div>
      </div>
    </section>
  );
}
