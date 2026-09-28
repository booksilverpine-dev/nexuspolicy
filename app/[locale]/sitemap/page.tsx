import type { Metadata } from "next";
import Link from "next/link";
import { publicPaths } from "@/content/site";
import { loc } from "@/lib/paths";

export const metadata: Metadata = { title: "Sitemap" };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl text-[#14382c]">Sitemap</h1>
      <ul className="mt-6 space-y-2">
        {publicPaths.map((path) => (
          <li key={path}><Link href={loc(locale, path)} className="text-[#14382c] underline">{path}</Link></li>
        ))}
      </ul>
    </section>
  );
}
