import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/site";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((service) => ({ locale, slug: service.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return { title: service?.title ?? "Service" };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-[#6b7c74]">Our services</p>
      <h1 className="mt-2 font-serif text-4xl text-[#14382c]">{service.title}</h1>
      <p className="mt-4 text-lg text-[#3d5248]">{service.summary}</p>
      <p className="mt-6">{service.body}</p>
    </article>
  );
}
