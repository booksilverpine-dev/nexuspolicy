import Link from "next/link";
import { signOut } from "@/app/actions";
import { requireClient } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export default async function PortalHome() {
  const { organizationId } = await requireClient();
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("id, name, summary").eq("organization_id", organizationId);
  const { data: invoices } = await supabase.from("invoices").select("id, title, status, amount_cents, currency").eq("organization_id", organizationId);
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl text-[#14382c]">Your projects</h1>
        <form action={signOut}><input type="hidden" name="next" value="/portal/login" /><button className="text-sm underline" type="submit">Sign out</button></form>
      </div>
      <ul className="mt-8 space-y-3">
        {(projects || []).map((project) => (
          <li key={project.id} className="rounded-xl border bg-white p-4">
            <Link href={`/portal/projects/${project.id}`} className="font-medium text-[#14382c] underline">{project.name}</Link>
            <p className="text-sm text-[#4d6258]">{project.summary}</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-10 font-serif text-2xl">Invoices</h2>
      <ul className="mt-4 space-y-2 text-sm">
        {(invoices || []).map((invoice) => (
          <li key={invoice.id}>{invoice.title} · {(invoice.amount_cents / 100).toFixed(2)} {invoice.currency.toUpperCase()} · {invoice.status}</li>
        ))}
      </ul>
    </main>
  );
}
