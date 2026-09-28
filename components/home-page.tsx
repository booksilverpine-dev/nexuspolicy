import Link from "next/link";
import { ArrowRight, Briefcase, ChartColumn, Globe, Leaf, Users } from "lucide-react";
import { firm, heroValues, services } from "@/content/site";
import { displayValue, getIndicators, getPublishedInsights, publicAssetUrl, type Indicator, type Insight } from "@/lib/data";
import { loc } from "@/lib/paths";

const icons = { chart: ChartColumn, leaf: Leaf, users: Users, briefcase: Briefcase, globe: Globe, sdg: Globe };

export async function HomePage({ locale, labels }: { locale: string; labels: Record<string, string> }) {
  const [indicators, insights] = await Promise.all([getIndicators(), getPublishedInsights()]);
  return (
    <div>
      <section className="relative min-h-[540px] overflow-hidden">
        <img src="/infographics/hero.webp" alt="Illustrated Bhutanese valley with a dzong, river, and prayer flags" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-xl rounded-2xl bg-[#f6f3ec]/85 p-6">
            <h1 className="font-serif text-4xl leading-tight text-[#14382c] md:text-5xl">Bridging Policy, People and Planet for a Sustainable Tomorrow</h1>
            <p className="mt-4 text-[#243f36]">{firm.description}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={loc(locale, "/about")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e36b1e] px-5 py-3 text-sm font-medium text-white">{labels.aboutCta} <ArrowRight className="size-4" /></Link>
              <Link href={loc(locale, "/services")} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#14382c] bg-white px-5 py-3 text-sm font-medium text-[#14382c]">{labels.servicesCta} <ArrowRight className="size-4" /></Link>
            </div>
          </div>
          <ul className="rounded-2xl bg-[#14382c]/90 p-4 text-[#f6f3ec]">
            {heroValues.map((item) => {
              const Icon = icons[item.icon as keyof typeof icons] || Leaf;
              return (
                <li key={item.title} className="flex items-center gap-3 border-b border-white/10 px-2 py-3 last:border-0">
                  <Icon className="size-5 text-[#b7e0c4]" />
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-2 xl:grid-cols-5">
        {services.map((service) => {
          const Icon = icons[service.icon as keyof typeof icons] || Globe;
          return (
            <article key={service.slug} className="rounded-2xl border border-[#e6e0d4] bg-white p-5">
              <Icon className={`size-8 ${service.accent}`} />
              <h2 className="mt-4 font-serif text-lg text-[#14382c]">{service.title}</h2>
              <p className="mt-2 text-sm text-[#4d6258]">{service.summary}</p>
              <Link href={loc(locale, `/services/${service.slug}`)} className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${service.accent}`}>{labels.learnMore} <ArrowRight className="size-4" /></Link>
            </article>
          );
        })}
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#e6e0d4] bg-white p-5 lg:col-span-1">
          <h2 className="text-xs font-semibold tracking-wide text-[#6b7c74]">ECONOMIC & SOCIAL INDICATORS</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {indicators.slice(0, 8).map((item) => (
              <Stat key={item.id} item={item} />
            ))}
          </div>
          <p className="mt-3 text-xs text-[#6b7c74]">Figures are illustrative or sourced. They are not official government statistics.</p>
          <Link href={loc(locale, "/indicators")} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#14382c] px-4 py-3 text-sm text-white">{labels.dashboard} <ArrowRight className="size-4" /></Link>
        </div>
        <div className="rounded-2xl border border-[#e6e0d4] bg-white p-5">
          <h2 className="text-xs font-semibold tracking-wide text-[#6b7c74]">FEATURED INSIGHTS</h2>
          <ul className="mt-4 space-y-4">
            {insights.slice(0, 3).map((insight) => (
              <li key={insight.id}>
                <Link href={loc(locale, `/insights/${insight.slug}`)} className="flex gap-3">
                  <img src={publicAssetUrl(insight.cover_path) || "/infographics/insight-nature.webp"} alt="" className="size-16 rounded-lg object-cover" />
                  <span>
                    <span className="block text-sm font-medium text-[#14382c]">{insight.title}</span>
                    <span className="text-xs text-[#6b7c74]">{new Date(insight.published_on).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={loc(locale, "/insights")} className="mt-4 inline-flex text-sm font-medium text-[#14382c]">{labels.allInsights} <ArrowRight className="size-4" /></Link>
        </div>
        <div className="rounded-2xl border border-[#e6e0d4] bg-white p-5">
          <h2 className="text-xs font-semibold tracking-wide text-[#6b7c74]">OUR GLOBAL REACH</h2>
          <p className="mt-3 text-sm text-[#4d6258]">Proudly based in Bhutan, we collaborate across Asia and beyond to co-create sustainable, context-specific and impact-driven solutions.</p>
          <img src="/infographics/world-map.svg" alt="Map with pins for Asia, Africa, Europe, Pacific, and the Americas" className="mt-4 w-full" />
          <Link href={loc(locale, "/about#global")} className="mt-4 inline-flex text-sm font-medium text-[#14382c]">{labels.engagement} <ArrowRight className="size-4" /></Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ item }: { item: Indicator }) {
  const Icon = icons[item.icon as keyof typeof icons] || ChartColumn;
  return (
    <div className="rounded-xl border border-[#eee6da] p-3">
      <Icon className="size-4 text-[#2f8f4e]" />
      <p className="mt-2 text-xs text-[#6b7c74]">{item.label}</p>
      <p className="font-serif text-xl text-[#14382c]">{displayValue(item)}</p>
      <p className="text-xs text-[#6b7c74]">{item.period}</p>
    </div>
  );
}
