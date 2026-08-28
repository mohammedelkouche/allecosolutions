import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />
      <main id="accueil" className="flex flex-1 items-center justify-center px-6 py-24">
        <h1 className="text-center text-4xl font-semibold text-slate-950">
          {t("title")}
        </h1>
      </main>
    </div>
  );
}