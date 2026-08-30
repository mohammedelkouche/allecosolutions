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
        lightLineColor="#c28b2b"
        darkLineColor="#8b6914"
      />

      {/* Content layer - z-10 keeps text above the grid */}
      <div className="relative z-10 mx-auto flex min-h-[400px] max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {t("eyebrow") && (
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {t("eyebrow")}
            </p>
          )}
          <DiaTextReveal
            text={t("slogan")}
            colors={["#c28b2b", "#d9ae5d"]}
            className="block text-4xl font-bold tracking-tight text-primary md:text-6xl"
          />
        </div>
      </div>
    </section>
  );
}
