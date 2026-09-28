import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { insightEssays } from "@/content/pages";
import { services } from "@/content/site";
import { existingPublicAsset, getPublishedInsights } from "@/lib/data";
import { loc } from "@/lib/paths";

export const metadata: Metadata = { title: "Insights" };

const themes = [
  { title: "Nature and finance", body: "How conservation capital can respect the livelihoods tied to the same landscape.", slug: "financing-nature" },
  { title: "Inclusive growth", body: "Pathways that keep jobs, equity, and environmental limits in one decision.", slug: "inclusive-green-growth" },
  { title: "Policy coherence", body: "Testing whether energy, fiscal, labour, and social instruments can be delivered together.", slug: "policy-coherence" },
];

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const insights = await getPublishedInsights();
  return (
    <article className="mx-auto max-w-6xl space-y-12 px-4 py-12">
      <header className="max-w-3xl">
        <h1 className="font-serif text-4xl text-[#14382c] md:text-5xl">Insights</h1>
        <p className="mt-4 text-[#3d5248]">Notes from the firm on nature finance, inclusive green growth, and policy coherence. They are commentary to frame a conversation. They are not client reports, forecasts, or official statistics.</p>
      </header>
      <section className="grid gap-3 md:grid-cols-3">
        {themes.map((theme, index) => (
          <Link key={theme.slug} href={loc(locale, `/insights/${theme.slug}`)}>
            <Card className="h-full">
              <CardHeader>
                <CardDescription className="font-semibold text-[#e36b1e]">0{index + 1}</CardDescription>
                <CardTitle className="font-serif text-2xl">{theme.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{theme.body}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {insights.map((insight) => {
          const cover = existingPublicAsset(insight.cover_path);
          return (
            <Link key={insight.slug} href={loc(locale, `/insights/${insight.slug}`)}>
              <Card className="h-full overflow-hidden p-0">
              {cover ? <img src={cover} alt="" className="h-40 w-full object-cover" /> : <InsightBand title={insightEssays[insight.slug]?.figureTitle || insight.title} />}
              <CardHeader>
                <CardTitle className="font-serif text-lg">{insight.title}</CardTitle>
                <CardDescription>{insight.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{insight.published_on}</p>
              </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>
      <section>
        <h2 className="font-serif text-2xl text-[#14382c]">Read alongside the practices</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {services.slice(0, 4).map((service) => (
            <li key={service.slug}>
              <Link href={loc(locale, `/services/${service.slug}`)}><Card><CardContent className="text-sm">{service.title}</CardContent></Card></Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function InsightBand({ title }: { title: string }) {
  return (
    <span className="flex h-40 items-end bg-[#14382c] p-4 font-serif text-lg text-[#f6f3ec]">{title}</span>
  );
}
