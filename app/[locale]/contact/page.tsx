import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { firm } from "@/content/site";
import { afterYouWrite, contactPaths } from "@/content/pages";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-6xl space-y-14 px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-serif text-4xl text-[#14382c] md:text-5xl">Contact</h1>
          <p className="mt-4 text-[#3d5248]">Write about advisory work, a research question, or a partnership. Include the decision you need, the timeline, and who the work is for. A short note is enough to start.</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="font-medium text-[#14382c]">{firm.address}</li>
            <li><a href={firm.phoneHref} className="underline">{firm.phone}</a></li>
            <li><a href={`mailto:${firm.email}`} className="underline">{firm.email}</a></li>
            <li className="text-[#6b7c74]">{firm.contactNote}</li>
          </ul>
          <img src="/infographics/work-firm.png" alt="Two advisers discussing evidence at a table" className="mt-8 h-52 w-full rounded-2xl object-cover" />
        </div>
        <Card>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">What you can write about</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-4">
          {contactPaths.map((path) => (
            <li key={path.title}>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{path.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{path.body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">After you send a message</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-3">
          {afterYouWrite.map((step, index) => (
            <li key={step.title}>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{index + 1}. {step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
