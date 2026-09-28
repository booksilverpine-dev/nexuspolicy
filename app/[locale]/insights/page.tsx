import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedInsights, publicAssetUrl } from "@/lib/data";
import { loc } from "@/lib/paths";

export const metadata: Metadata = { title: "Insights" };

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const insights = await getPublishedInsights();
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-4xl text-[#14382c]">Insights</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {insights.map((insight) => (
          <Link key={insight.slug} href={loc(locale, `/insights/${insight.slug}`)} className="overflow-hidden rounded-2xl border border-[#e6e0d4] bg-white">
            <img src={publicAssetUrl(insight.cover_path) || ""} alt="" className="h-40 w-full object-cover" />
            <span className="block p-4">
              <span className="font-medium text-[#14382c]">{insight.title}</span>
              <span className="mt-2 block text-sm text-[#6b7c74]">{insight.published_on}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
