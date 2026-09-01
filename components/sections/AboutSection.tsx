interface AboutSectionProps {
  eyebrow: string;
  title: string;
  body: string;
}

export function AboutSection({ eyebrow, title, body }: AboutSectionProps) {
  return (
    <section id="a-propos" className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-border bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold text-foreground">{title}</h2>
        <div className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          <p>{body}</p>
        </div>
      </div>
    </section>
  );
}
