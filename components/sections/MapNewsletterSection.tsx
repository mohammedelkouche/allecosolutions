import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { FrostedCard } from "@/components/ui/FrostedCard";

// Localisation Alleco Solutions (réel) — résolue depuis
// https://maps.app.goo.gl/2pXWgpXxjRo7bcJP7
// Place : Alleco Solutions — 33.5845009, -7.607496 (Casablanca, Maroc).
// L'iframe Google Maps (sans clé API) est le choix le plus performant et sans
// dépendance pour afficher une carte.
// On passe à la fois le nom du lieu (q) et les coordonnées exactes (ll) + zoom
// pour afficher le marqueur exact de l'adresse partagée.
const ALLECO_QUERY = encodeURIComponent("Alleco Solutions");
const ALLECO_LAT = "33.5845009";
const ALLECO_LNG = "-7.607496";

const MAP_EMBED_URL = `https://www.google.com/maps?q=${ALLECO_QUERY}&ll=${ALLECO_LAT},${ALLECO_LNG}&z=16&output=embed`;
const MAP_DIRECT_URL = `https://www.google.com/maps/place/Alleco+Solutions/@${ALLECO_LAT},${ALLECO_LNG},16z`;

export async function MapNewsletterSection() {
  const t = await getTranslations("newsletter");
  const tGlobe = await getTranslations("international.globe");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
        {/* Colonne gauche : carte des zones d'intervention */}
        <FrostedCard className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
            {t("mapEyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            {t("mapTitle")}
          </h2>
          <div className="mt-6 aspect-4/3 w-full overflow-hidden rounded-xl border border-white/10">
            <iframe
              src={MAP_EMBED_URL}
              title={t("mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {tGlobe("subtitle")}{" "}
            <a
              href={MAP_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-primary underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t("openMap")}
            </a>
          </p>
        </FrostedCard>

        {/* Colonne droite : inscription à la newsletter */}
        <FrostedCard className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-white/90">
            {t("subtitle")}
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </FrostedCard>
      </div>
    </section>
  );
}