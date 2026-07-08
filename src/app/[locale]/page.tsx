import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import HomePageClient from "@/app/[locale]/home-page.client";
import { routing } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <HomePageClient title={t("title")} description={t("description")} />
  );
}
