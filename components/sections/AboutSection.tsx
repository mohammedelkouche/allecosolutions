import { FrostedCard } from "@/components/ui/FrostedCard";

interface AboutSectionProps {
  eyebrow: string;
  title: string;
  body: string;
}

export function AboutSection({ eyebrow, title, body }: AboutSectionProps) {
  return (
    <section id="a-propos" className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <FrostedCard className="rounded-[28px]">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-bold text-white">{title}</h2>
        <div className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">
          <p className="text-justify hyphens-auto">{body}</p>
        </div>
      </FrostedCard>
    </section>
  );
}
