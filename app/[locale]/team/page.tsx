import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { howWeWork, teamPractices } from "@/content/pages";
import { getTeam, publicAssetUrl } from "@/lib/data";

export const metadata: Metadata = { title: "Team" };

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <article className="mx-auto max-w-6xl space-y-14 px-4 py-12">
      <header className="max-w-3xl">
        <h1 className="font-serif text-4xl text-[#14382c] md:text-5xl">Diverse expertise. Shared purpose.</h1>
        <p className="mt-4 text-[#3d5248]">The team brings together economists, development specialists, data scientists, policy analysts, and business analysts. People are listed here when the firm publishes a profile. Until then, the practice mix below is the public description of how the work is staffed.</p>
      </header>
      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">Practice mix</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-5">
          {teamPractices.map((practice, index) => (
            <li key={practice.title}><Card className="h-full"><CardContent>
              <p className="font-serif text-3xl text-[#e36b1e]">{index + 1}</p>
              <h3 className="mt-3 font-serif text-lg text-[#14382c]">{practice.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{practice.body}</p>
            </CardContent></Card></li>
          ))}
        </ul>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {howWeWork.map((item) => (
          <Card key={item.title} className="bg-primary text-primary-foreground">
            <CardHeader>
            <CardTitle className="font-serif text-2xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
            <p className="text-sm leading-6">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section>
        <h2 className="font-serif text-3xl text-[#14382c]">People</h2>
        {team.length === 0 ? (
          <p className="mt-4 max-w-3xl text-[#3d5248]">No individual profiles are published yet. Staff add a name, role, biography, and photograph from the admin area when a person should appear on this page. The firm does not list placeholder people.</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {team.map((member) => (
              <li key={member.id}><Card><CardContent>
                {member.photo_path ? <img src={publicAssetUrl(member.photo_path) || ""} alt="" className="mb-3 size-16 rounded-full object-cover" /> : <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-[#14382c] text-white">{member.name.slice(0, 1)}</div>}
                <h3 className="font-serif text-xl text-[#14382c]">{member.name}</h3>
                <p className="text-sm text-[#6b7c74]">{member.role}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{member.bio}</p>
              </CardContent></Card></li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
