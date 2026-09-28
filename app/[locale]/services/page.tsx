import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/site";
import { loc } from "@/lib/paths";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-4xl text-[#14382c]">Integrated expertise for a rapidly changing world</h1>
      <p className="mt-4 max-w-3xl text-[#3d5248]">Today&apos;s challenges do not exist in isolation. Economic transformation influences employment. Climate risks affect investment. Social inclusion shapes long-term outcomes. Our services are organized across five interrelated practice areas.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Link key={service.slug} href={loc(locale, `/services/${service.slug}`)} className="rounded-2xl border border-[#e6e0d4] bg-white p-5">
            <h2 className="font-serif text-xl text-[#14382c]">{service.title}</h2>
            <p className="mt-2 text-sm text-[#4d6258]">{service.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
