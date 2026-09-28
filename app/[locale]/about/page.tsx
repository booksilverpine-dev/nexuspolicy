import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { about, firm, reasons } from "@/content/site";
import { approach, audiences, capabilities, regions, rolePairs } from "@/content/pages";
import { GlobeFilm } from "@/components/globe-film";
import { PairBridge, RegionBoard, StepRail } from "@/components/visuals";
import { loc } from "@/lib/paths";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <article className="mx-auto max-w-6xl space-y-14 px-4 py-12">
      <header className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#6b7c74]">{firm.serving}</p>
          <h1 className="mt-2 font-serif text-4xl text-[#14382c] md:text-5xl">From Bhutan to the World</h1>
          <p className="mt-4 text-[#3d5248]">{about.established}</p>
          <p className="mt-4 text-[#3d5248]">{about.belief}</p>
        </div>
        <img src="/infographics/story-flow.svg" alt="Bhutan, Knowledge, Solutions, Partnerships, Global Impact" className="w-full rounded-2xl border border-[#e6e0d4] bg-white p-4" />
      </header>

      <section id="vision" className="grid gap-4 md:grid-cols-2">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Our vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7">{about.vision}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Our mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">{about.mission}</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">Why Eco Policy Nexus International</h2>
        <p className="mt-3 max-w-3xl text-[#3d5248]">Five reasons the firm exists as a Bhutanese advisory practice with work that can travel.</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {reasons.map((reason, index) => (
            <li key={reason.title}>
              <Card className="h-full">
                <CardHeader>
                  <CardDescription className="font-serif text-[#e36b1e]">0{index + 1}</CardDescription>
                  <CardTitle className="font-serif text-lg">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{reason.body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-[#14382c]">Our role</h2>
          <p className="mt-3 text-[#3d5248]">The firm sits between analysis and the institution that must act. Each pairing is a piece of work, not a slogan.</p>
          <div className="mt-6">
            <PairBridge pairs={rolePairs} />
          </div>
        </div>
        <div>
          <h2 className="font-serif text-3xl text-[#14382c]">Who we work with</h2>
          <ul className="mt-6 space-y-3">
            {audiences.map((audience) => (
              <li key={audience.title}>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">{audience.title}</CardTitle>
                    <CardDescription>{audience.body}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">Our approach</h2>
        <p className="mt-3 max-w-3xl text-[#3d5248]">Assignments follow the same spine, whether the subject is a budget choice, a climate risk, or a partnership.</p>
        <div className="mt-6">
          <StepRail steps={approach} />
        </div>
      </section>

      <section id="story" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <img src="/infographics/work-firm.png" alt="Bhutanese advisers in gho and kira discussing evidence" className="h-56 w-full rounded-2xl object-cover sm:h-72" />
        <div>
          <h2 className="font-serif text-3xl text-[#14382c]">Our story</h2>
          <p className="mt-3 leading-7 text-[#3d5248]">{about.story}</p>
          <p className="mt-3 leading-7 text-[#3d5248]">Gross National Happiness is the reference point for that experience: prosperity considered together with the environment, culture, wellbeing, and governance. The firm uses that foundation with contemporary economics, data, and project delivery. It does not claim to speak for the Royal Government of Bhutan.</p>
        </div>
      </section>

      <section id="global">
        <h2 className="font-serif text-3xl text-[#14382c]">Global engagement</h2>
        <p className="mt-3 max-w-3xl text-[#3d5248]">The office is in Thimphu. Collaboration outside Bhutan is scoped to the assignment. The film shows that reach. It is not a list of branch offices.</p>
        <GlobeFilm className="mt-6 w-full rounded-2xl" />
        <div className="mt-4">
          <RegionBoard regions={regions} />
        </div>
      </section>

      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">Looking forward</h2>
        <p className="mt-3 max-w-3xl text-[#3d5248]">{about.ambition}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {capabilities.map((item) => (
            <li key={item}><Card><CardContent className="font-serif">{item}</CardContent></Card></li>
          ))}
        </ul>
        <p className="mt-6 font-medium text-[#14382c]">{about.positioning}</p>
        <Button nativeButton={false} render={<Link href={loc(locale, "/contact")} />} className="mt-4 bg-[#e36b1e] text-white hover:bg-[#cf5c12]">Talk to the firm</Button>
      </section>
    </article>
  );
}
