import { AdminShell } from "@/components/admin-shell";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { createOrganization } from "../actions";

export default async function OrganizationsAdmin({ searchParams }: { searchParams: Promise<{ created?: string; password?: string; error?: string }> }) {
  await requireStaff();
  const query = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("organizations").select("id, name").order("created_at", { ascending: false });
  return (
    <AdminShell title="Organizations">
      {query.error ? <p className="mb-4 text-sm text-red-700">The client account could not be created.</p> : null}
      {query.created ? <p className="mb-4 rounded-lg bg-[#f3e2c4] p-3 text-sm">Client {query.created} can sign in with password {query.password}. Share it once, then ask them to change it.</p> : null}
      <ul className="space-y-1">{(data || []).map((org) => <li key={org.id}>{org.name}</li>)}</ul>
      <form action={createOrganization} className="mt-6 grid max-w-md gap-3">
        <input name="name" required placeholder="Organization" className="h-10 rounded-md border px-3" />
        <input name="email" type="email" required placeholder="Client email" className="h-10 rounded-md border px-3" />
        <button className="w-fit rounded-full bg-[#14382c] px-4 py-2 text-white" type="submit">Invite client</button>
      </form>
    </AdminShell>
  );
}
