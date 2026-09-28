import { AdminShell } from "@/components/admin-shell";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { saveTeam } from "../actions";

export default async function TeamAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase.from("team_members").select("id, name, role, published").order("sort");
  return (
    <AdminShell title="Team">
      <ul className="space-y-1 text-sm">{(data || []).map((member) => <li key={member.id}>{member.name} — {member.role}</li>)}</ul>
      <form action={saveTeam} className="mt-6 grid max-w-xl gap-3">
        <input name="name" required placeholder="Name" className="h-10 rounded-md border px-3" />
        <input name="role" placeholder="Role" className="h-10 rounded-md border px-3" />
        <textarea name="bio" placeholder="Bio" className="rounded-md border p-3" />
        <input name="sort" type="number" defaultValue={0} className="h-10 rounded-md border px-3" />
        <input name="photo" type="file" accept="image/png,image/jpeg,image/webp" />
        <label className="text-sm"><input type="checkbox" name="published" defaultChecked /> Published</label>
        <button className="w-fit rounded-full bg-[#14382c] px-4 py-2 text-white" type="submit">Add</button>
      </form>
    </AdminShell>
  );
}
