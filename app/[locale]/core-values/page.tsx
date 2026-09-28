import type { Metadata } from "next";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { coreValues } from "@/content/site";
import { valueDetails } from "@/content/pages";

export const metadata: Metadata = { title: "Core values" };

export default function CoreValuesPage() {
  return (
    <article className="mx-auto max-w-6xl space-y-12 px-4 py-12">
      <header className="max-w-3xl">
        <h1 className="font-serif text-4xl text-[#14382c] md:text-5xl">Our core values</h1>
        <p className="mt-4 text-[#3d5248]">Integrity, inclusivity, sustainability, and partnership are the tests applied to a brief, a project design, and a public number on this site. Each value below is paired with the practices that make it visible in the work.</p>
      </header>
      <ol className="grid gap-3 sm:grid-cols-4">
        {coreValues.map((value, index) => (
          <li key={value}><Card className="h-full bg-primary text-primary-foreground"><CardContent>
            <p className="font-serif text-[#e39b12]">0{index + 1}</p>
            <CardTitle className="mt-2 font-serif text-2xl">{value}</CardTitle>
          </CardContent></Card></li>
        ))}
      </ol>
      <div className="space-y-6">
        {coreValues.map((value) => {
          const detail = valueDetails[value];
          return (
            <Card key={value}>
            <CardContent className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="font-serif text-3xl text-[#14382c]">{value}</h2>
                <p className="mt-3 leading-7 text-[#3d5248]">{detail.body}</p>
              </div>
              <ul className="space-y-3">
                {detail.practices.map((practice) => (
                  <li key={practice} className="rounded-xl bg-[#f6f3ec] px-4 py-3 text-sm leading-6 text-[#243f36]">{practice}</li>
                ))}
              </ul>
            </CardContent>
            </Card>
          );
        })}
      </div>
    </article>
  );
}
