import type { Metadata } from "next";
import Link from "next/link";
import { companyLinks, mega, services } from "@/content/site";
import { loc } from "@/lib/paths";

export const metadata: Metadata = { title: "Sitemap" };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const groups = [
    { title: "Firm", links: [{ href: "/", label: "Home" }, ...companyLinks, ...mega.firm.filter((item) => item.href !== "/about")] },
    { title: "Services", links: mega.services },
    { title: "Insights", links: mega.insights },
    { title: "Policies", links: mega.legal },
  ];
  return (
    <article className="mx-auto max-w-6xl px-4 py-12">
      <header className="max-w-3xl">
        <h1 className="font-serif text-4xl text-[#14382c]">Sitemap</h1>
        <p className="mt-4 text-[#3d5248]">Every public page, grouped the way the header presents the firm. Service pages cover {services.length} practices. Insight essays are linked individually.</p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} className="rounded-2xl border border-[#e6e0d4] bg-white p-5">
            <h2 className="font-serif text-2xl text-[#14382c]">{group.title}</h2>
            <ul className="mt-4 space-y-2">
              {group.links.filter((item, index, list) => list.findIndex((other) => other.href === item.href) === index).map((item) => (
                <li key={item.href}>
                  <Link href={loc(locale, item.href)} className="text-[#14382c] underline">{item.label}</Link>
                  <span className="ml-2 text-xs text-[#6b7c74]">{item.href}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
