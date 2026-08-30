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
      {/* Unique conteneur parent avec bordure arrondie */}
      <div className="border border-border rounded-2xl bg-secondary p-8 md:p-12">
        {/* Grille à deux colonnes en desktop, une colonne en mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Colonne gauche : titre et paragraphe de présentation */}
          <div className="order-1">
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              {t("mission")}
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground">
              <p className="leading-relaxed">
                {t("description")}
              </p>
              
              <p className="leading-relaxed">
                {t("expertise")}
              </p>
              
              <p className="leading-relaxed">
                {t("approach")}
              </p>
              
              <p className="leading-relaxed font-semibold text-foreground">
                {t("objective")}
              </p>
            </div>
          </div>

          {/* Colonne droite : StaticGlobe centré verticalement */}
          <div className="flex items-center justify-center order-2">
            <StaticGlobe markers={markers} className="mx-auto max-w-xs md:max-w-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
