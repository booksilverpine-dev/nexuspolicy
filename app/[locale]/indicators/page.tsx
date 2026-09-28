import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreRing, StatusScale } from "@/components/visuals";
import { figureOrigins, indicatorGroups, indicatorNotes } from "@/content/pages";
import { displayValue, getIndicators, type Indicator } from "@/lib/data";

export const metadata: Metadata = { title: "Indicators" };

export default async function IndicatorsPage() {
  const indicators = await getIndicators();
  const byLabel = new Map(indicators.map((item) => [item.label, item]));
  return (
    <article className="mx-auto max-w-6xl space-y-12 px-4 py-12">
      <header className="max-w-3xl">
        <h1 className="font-serif text-4xl text-[#14382c] md:text-5xl">Economic and social indicators</h1>
        <p className="mt-4 text-[#3d5248]">A public dashboard for reading Bhutan&apos;s development context beside the firm&apos;s commentary. Live series refresh from the World Bank and can be overridden by staff. Other tiles are firm illustrations. None of these figures are official statistics of the Royal Government of Bhutan.</p>
      </header>
      <section className="grid gap-3 md:grid-cols-3">
        {figureOrigins.map((origin, index) => (
          <Card key={origin.title}>
            <CardHeader>
              <CardDescription className="font-serif text-[#e36b1e]">0{index + 1}</CardDescription>
              <CardTitle className="font-serif text-xl">{origin.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{origin.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      {indicatorGroups.map((group) => (
        <section key={group.title}>
          <h2 className="font-serif text-3xl text-[#14382c]">{group.title}</h2>
          <p className="mt-2 max-w-3xl text-[#3d5248]">{group.intro}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {group.labels.map((label) => {
              const item = byLabel.get(label);
              if (!item) return null;
              return <IndicatorCard key={item.id} item={item} />;
            })}
          </div>
        </section>
      ))}
      {indicators.filter((item) => !indicatorGroups.some((group) => group.labels.includes(item.label))).length ? (
        <section>
          <h2 className="font-serif text-3xl text-[#14382c]">Other published figures</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {indicators.filter((item) => !indicatorGroups.some((group) => group.labels.includes(item.label))).map((item) => (
              <IndicatorCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

function IndicatorCard({ item }: { item: Indicator }) {
  const value = displayValue(item);
  const score = item.label === "SDG Progress" ? Number(value.split("/")[0]) : NaN;
  return (
    <Card>
      <CardHeader>
        <CardDescription>{item.label}</CardDescription>
        <CardTitle className="font-serif text-3xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
      <p className="text-xs text-muted-foreground">{item.period || "Illustrative"} · {item.source === "live" ? "World Bank, unless overridden" : "Firm figure"}{item.as_of ? ` · as of ${item.as_of}` : ""}</p>
      {Number.isFinite(score) ? <div className="mt-4"><ScoreRing score={score} label={item.label} /></div> : null}
      {item.label === "Climate Risk" ? <StatusScale value={value} stops={["Low", "Medium", "High"]} /> : null}
      {item.label === "Biodiversity" ? <StatusScale value={value} stops={["Declining", "Stable", "Improving"]} /> : null}
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{indicatorNotes[item.label]}</p>
      </CardContent>
    </Card>
  );
}
