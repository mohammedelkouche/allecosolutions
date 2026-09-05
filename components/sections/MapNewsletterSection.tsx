import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

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

export async function MapNewsletterSection() {
  const t = await getTranslations("newsletter");

  return (
    // Full-width band in the secondary (light gray) tone.
    <section className="w-full bg-secondary py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Colonne gauche : carte des zones d'intervention (white card). */}
          <div className="flex flex-col rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t("mapTitle")}
            </h2>
            <div className="mt-6 aspect-4/3 w-full overflow-hidden rounded-xl border border-border">
              <iframe
                src={MAP_EMBED_URL}
                title={t("mapTitle")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("mapSubtitle")}
            </p>
          </div>

          {/* Colonne droite : inscription à la newsletter.
              This is the ONLY card that keeps the charcoal background. */}
          <div className="flex flex-col justify-center rounded-2xl bg-[#3d3f3f]/97 p-6 shadow-xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-slate-200">
              {t("subtitle")}
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}