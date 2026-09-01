import { getTranslations } from "next-intl/server";
import { DiaTextReveal } from "@/components/magicui/dia-text-reveal";
import { RetroGrid } from "@/components/ui/retro-grid";

export async function AboutHero() {
  const t = await getTranslations("about.hero");

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background min-h-[400px]">
      {/* RetroGrid background - behind the slogan */}
      <RetroGrid
        className="absolute inset-0 w-full h-full"
        angle={0}
        cellSize={80}
        opacity={0.4}
        lightLineColor="#4BA625"
        darkLineColor="#2E7D32"
      />

      {/* Content layer - z-10 keeps text above the grid */}
      <div className="relative z-10 mx-auto flex min-h-[400px] max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {t("eyebrow") && (
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {t("eyebrow")}
            </p>
          )}
          {/* 3-tier slogan hierarchy: same sentence, structurally split (no wording changes). */}
          <DiaTextReveal
            text={t("sloganTier1")}
            // colors={["#4BA625", "#2E7D32"]}
            className="block text-2xl font-bold  text-primary md:text-4xl"
          />
          <p className="mt-4 text-lg font-bold text-primary md:text-3xl">
            {t("sloganTier2")}
          </p>
          <p className="mt-3 text-base font-bold text-primary md:text-2xl">
            {t("sloganTier3")}
          </p>
        </div>
      </div>
    </section>
  );
}
