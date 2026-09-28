import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsight, publicAssetUrl } from "@/lib/data";
import { renderMarkdown } from "@/lib/markdown";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  return { title: insight?.title ?? "Insight" };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-[#6b7c74]">{insight.published_on}</p>
      <h1 className="mt-2 font-serif text-4xl text-[#14382c]">{insight.title}</h1>
      <img src={publicAssetUrl(insight.cover_path) || ""} alt="" className="mt-6 w-full rounded-2xl object-cover" />
      <div className="prose mt-6 max-w-none space-y-4" dangerouslySetInnerHTML={{ __html: renderMarkdown(insight.body) }} />
    </article>
  );
}
