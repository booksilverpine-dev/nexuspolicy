import type { Metadata } from "next";
import { getTeam, publicAssetUrl } from "@/lib/data";

export const metadata: Metadata = { title: "Team" };

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-4xl text-[#14382c]">Diverse expertise. Shared purpose.</h1>
      <p className="mt-4 max-w-3xl text-[#3d5248]">Our team brings together economists, development experts, data scientists, policy analysts and business analysts. Individual profiles are added by staff.</p>
      {team.length === 0 ? <p className="mt-8 text-sm text-[#6b7c74]">Team profiles will appear here once they are published.</p> : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {team.map((member) => (
            <li key={member.id} className="rounded-2xl border border-[#e6e0d4] bg-white p-5">
              {member.photo_path ? <img src={publicAssetUrl(member.photo_path) || ""} alt="" className="mb-3 size-16 rounded-full object-cover" /> : <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-[#14382c] text-white">{member.name.slice(0, 1)}</div>}
              <h2 className="font-serif text-xl">{member.name}</h2>
              <p className="text-sm text-[#6b7c74]">{member.role}</p>
              <p className="mt-2 text-sm">{member.bio}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
