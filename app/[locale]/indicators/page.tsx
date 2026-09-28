import type { Metadata } from "next";
import { displayValue, getIndicators } from "@/lib/data";

export const metadata: Metadata = { title: "Indicators" };

export default async function IndicatorsPage() {
  const indicators = await getIndicators();
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-4xl text-[#14382c]">Economic and social indicators</h1>
      <p className="mt-3 max-w-3xl text-sm text-[#4d6258]">Live series are refreshed from the World Bank for Bhutan and can be overridden by staff. Manual figures are firm estimates or mockup seeds. These are not official government statistics.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {indicators.map((item) => (
          <article key={item.id} className="rounded-2xl border border-[#e6e0d4] bg-white p-4">
            {item.icon === "sdg" ? <img src="/infographics/sdg-ring.svg" alt="" className="size-16" /> : null}
            <h2 className="text-sm text-[#6b7c74]">{item.label}</h2>
            <p className="font-serif text-3xl text-[#14382c]">{displayValue(item)}</p>
            <p className="text-xs text-[#6b7c74]">{item.period} · {item.source === "live" ? "World Bank, unless overridden" : "Firm figure"}{item.as_of ? ` · as of ${item.as_of}` : ""}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
