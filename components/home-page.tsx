import Link from "next/link";
import { ArrowRight, Briefcase, ChartColumn, Globe, Leaf, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { about, firm, heroValues, reasons, services } from "@/content/site";
import { approach, audiences } from "@/content/pages";
import { GlobeFilm } from "@/components/globe-film";
import { PracticeMap, StepRail } from "@/components/visuals";
import { displayValue, getIndicators, getPublishedInsights, publicAssetUrl, type Indicator } from "@/lib/data";
import { loc } from "@/lib/paths";

const icons = { chart: ChartColumn, leaf: Leaf, users: Users, briefcase: Briefcase, globe: Globe, sdg: Globe };

export async function HomePage({ locale, labels }: { locale: string; labels: Record<string, string> }) {
  const [indicators, insights] = await Promise.all([getIndicators(), getPublishedInsights()]);
  return (
    <div>
      <section className="relative min-h-[540px] overflow-hidden">
        <img src="/infographics/work-hero.png" alt="Advisers reviewing charts in a policy meeting" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-xl rounded-2xl bg-[#f6f3ec]/85 p-6">
            <h1 className="font-serif text-4xl leading-tight text-[#14382c] md:text-5xl">Bridging Policy, People and Planet for a Sustainable Tomorrow</h1>
            <p className="mt-4 text-[#243f36]">{firm.description}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button nativeButton={false} render={<Link href={loc(locale, "/about")} />} className="bg-[#e36b1e] text-white hover:bg-[#cf5c12]">{labels.aboutCta} <ArrowRight /></Button>
              <Button nativeButton={false} render={<Link href={loc(locale, "/services")} />} variant="outline">{labels.servicesCta} <ArrowRight /></Button>
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
            <Card key={service.slug}>
              <CardHeader>
                <Icon className={`size-8 ${service.accent}`} />
                <CardTitle className="font-serif text-lg">{service.title}</CardTitle>
                <CardDescription>{service.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button nativeButton={false} render={<Link href={loc(locale, `/services/${service.slug}`)} />} variant="link" className={service.accent}>{labels.learnMore} <ArrowRight /></Button>
              </CardContent>
            </Card>
          );
        })}
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground">ECONOMIC & SOCIAL INDICATORS</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {indicators.slice(0, 8).map((item) => (
              <Stat key={item.id} item={item} />
            ))}
          </div>
          <p className="mt-3 text-xs text-[#6b7c74]">Figures are illustrative or sourced. They are not official government statistics.</p>
          <Button nativeButton={false} render={<Link href={loc(locale, "/indicators")} />} className="mt-4 w-full">{labels.dashboard} <ArrowRight /></Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground">FEATURED INSIGHTS</CardTitle>
          </CardHeader>
          <CardContent>
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
          <Button nativeButton={false} render={<Link href={loc(locale, "/insights")} />} variant="link" className="mt-4">{labels.allInsights} <ArrowRight /></Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground">OUR GLOBAL REACH</CardTitle>
            <CardDescription>Proudly based in Bhutan, we collaborate across Asia and beyond to co-create sustainable, context-specific and impact-driven solutions.</CardDescription>
          </CardHeader>
          <CardContent>
          <GlobeFilm className="mt-4 w-full rounded-xl" />
          <Button nativeButton={false} render={<Link href={loc(locale, "/about#global")} />} variant="link" className="mt-4">{labels.engagement} <ArrowRight /></Button>
          </CardContent>
        </Card>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-serif text-3xl text-[#14382c]">Why this firm</h2>
        <p className="mt-3 max-w-3xl text-[#3d5248]">{about.belief}</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {reasons.map((reason) => (
            <li key={reason.title}>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">{reason.title}</CardTitle>
                  <CardDescription>{reason.body}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl text-[#14382c]">How an assignment moves</h2>
          <p className="mt-3 max-w-3xl text-[#3d5248]">Five steps keep local context, evidence, and delivery in one line of work.</p>
          <div className="mt-6">
            <StepRail steps={approach} />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <h2 className="font-serif text-3xl text-[#14382c]">Who the work is for</h2>
          <ul className="mt-6 space-y-3">
            {audiences.map((audience) => (
              <li key={audience.title}>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">{audience.title}</CardTitle>
                    <CardDescription>{audience.body}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <PracticeMap />
      </section>
    </div>
  );
}

function Stat({ item }: { item: Indicator }) {
  const Icon = icons[item.icon as keyof typeof icons] || ChartColumn;
  return (
    <Card size="sm">
      <CardContent>
      <Icon className="size-4 text-[#2f8f4e]" />
      <p className="mt-2 text-xs text-[#6b7c74]">{item.label}</p>
      <p className="font-serif text-xl text-[#14382c]">{displayValue(item)}</p>
      <p className="text-xs text-muted-foreground">{item.period}</p>
      </CardContent>
    </Card>
  );
}
