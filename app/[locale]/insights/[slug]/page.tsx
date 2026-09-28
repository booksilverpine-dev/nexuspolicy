import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalloutList } from "@/components/visuals";
import { insightEssays, resolveInsightBody } from "@/content/pages";
import { existingPublicAsset, getInsight } from "@/lib/data";
import { renderMarkdown } from "@/lib/markdown";
import { loc } from "@/lib/paths";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  return { title: insight?.title ?? "Insight" };
}

export default async function InsightPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();
  const essay = insightEssays[insight.slug];
  const cover = existingPublicAsset(insight.cover_path);
  const body = resolveInsightBody(insight.slug, insight.body);
  return (
    <article className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-[#6b7c74]">{insight.published_on}</p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl text-[#14382c] md:text-5xl">{insight.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-[#3d5248]">{insight.excerpt}</p>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          {cover ? <img src={cover} alt="" className="w-full rounded-2xl object-cover" /> : null}
          <div className="rich-copy" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
        </div>
        {essay ? <CalloutList title={essay.figureTitle} points={essay.figurePoints} /> : null}
      </div>
      {essay ? (
        <p className="mt-10">
          <Link href={loc(locale, essay.related)} className="text-sm font-medium text-[#14382c] underline">Related practice</Link>
        </p>
      ) : null}
    </article>
  );
}
