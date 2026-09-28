import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { services } from "@/content/site";
import { engagementSteps, serviceGuides } from "@/content/pages";
import { CalloutList, StepRail } from "@/components/visuals";
import { routing } from "@/i18n/routing";
import { loc } from "@/lib/paths";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((service) => ({ locale, slug: service.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return { title: service?.title ?? "Service" };
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const guide = serviceGuides[slug as keyof typeof serviceGuides];
  if (!service || !guide) notFound();
  const others = services.filter((item) => item.slug !== service.slug);
  return (
    <article className="mx-auto max-w-6xl space-y-12 px-4 py-12">
      <header className="max-w-3xl">
        <p className="text-sm text-[#6b7c74]">Our services</p>
        <h1 className="mt-2 font-serif text-4xl text-[#14382c] md:text-5xl">{service.title}</h1>
        <p className="mt-4 text-lg text-[#3d5248]">{service.summary}</p>
        <p className="mt-4 leading-7 text-[#3d5248]">{service.body}</p>
        <p className="mt-4 leading-7 text-[#3d5248]">{guide.lead}</p>
      </header>
      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">What this practice covers</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {guide.offerings.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-[#e6e0d4] bg-white p-5">
              <p className={`font-serif ${service.accent}`}>0{index + 1}</p>
              <h3 className="mt-2 font-serif text-xl text-[#14382c]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#4d6258]">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serif text-3xl text-[#14382c]">How the work proceeds</h2>
          <div className="mt-6">
            <StepRail steps={engagementSteps} />
          </div>
        </div>
        <CalloutList title="Questions we start with" points={guide.questions} />
      </section>
      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">What you leave with</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {guide.deliverables.map((item) => (
            <li key={item} className="rounded-2xl bg-[#14382c] p-5 font-serif text-lg text-[#f6f3ec]">{item}</li>
          ))}
        </ul>
        <Button nativeButton={false} render={<Link href={loc(locale, "/contact")} />} className="mt-6 bg-[#e36b1e] text-white hover:bg-[#cf5c12]">Discuss this practice</Button>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-[#14382c]">Other practices</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={loc(locale, `/services/${item.slug}`)} className="block rounded-2xl border border-[#e6e0d4] bg-white p-4">
                <span className="font-serif text-[#14382c]">{item.title}</span>
                <span className="mt-1 block text-sm text-[#4d6258]">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
