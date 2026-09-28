import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/content/site";
import { engagementSteps } from "@/content/pages";
import { PracticeMap, StepRail } from "@/components/visuals";
import { loc } from "@/lib/paths";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <article className="mx-auto max-w-6xl space-y-14 px-4 py-12">
      <header className="max-w-3xl">
        <h1 className="font-serif text-4xl text-[#14382c] md:text-5xl">Integrated expertise for a rapidly changing world</h1>
        <p className="mt-4 text-[#3d5248]">Today&apos;s challenges do not exist in isolation. Economic transformation influences employment. Climate risks affect investment. Social inclusion shapes long-term outcomes. The firm organizes its work across five practices that are commissioned separately and read together when the decision requires it.</p>
      </header>
      <PracticeMap />
      <section className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <Link key={service.slug} href={loc(locale, `/services/${service.slug}`)}>
            <Card className="h-full">
              <CardHeader>
                <CardDescription>0{index + 1}</CardDescription>
                <CardTitle className={`font-serif text-2xl ${service.accent}`}>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.body}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">What an engagement looks like</h2>
        <p className="mt-3 max-w-3xl text-[#3d5248]">The subject changes. The sequence is stable, so a client knows what they will receive and when a recommendation is still provisional.</p>
        <div className="mt-6">
          <StepRail steps={engagementSteps} />
        </div>
      </section>
    </article>
  );
}
