import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = { title: "Home" };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <HomePage
      locale={locale}
      labels={{
        aboutCta: t("aboutCta"),
        servicesCta: t("servicesCta"),
        learnMore: t("learnMore"),
        dashboard: t("dashboard"),
        allInsights: t("allInsights"),
        engagement: t("engagement"),
      }}
    />
  );
}
