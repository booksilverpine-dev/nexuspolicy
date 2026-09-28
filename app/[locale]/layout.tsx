import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChatWidget } from "@/components/chat-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { firm } from "@/content/site";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en")) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const labels = {
    home: t("home"),
    contact: t("contact"),
    values: t("values"),
    menu: t("menu"),
    firm: t("firm"),
    services: t("services"),
    insights: t("insights"),
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: firm.name,
    areaServed: "Worldwide",
    address: { "@type": "PostalAddress", addressLocality: "Thimphu", addressCountry: "BT" },
    email: firm.email,
    telephone: firm.phone,
  };
  return (
    <div style={locale === "dz" ? { fontFamily: '"Noto Sans Tibetan", var(--font-source), sans-serif' } : undefined}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader locale={locale} labels={labels} />
      {locale === "dz" && t("draft") ? (
        <p className="bg-[#f3e2c4] px-4 py-2 text-center text-sm text-[#14382c]">{t("draft")}</p>
      ) : null}
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} subscribeLabel={t("subscribe")} />
      <ChatWidget />
    </div>
  );
}
