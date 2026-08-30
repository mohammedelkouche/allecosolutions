import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
