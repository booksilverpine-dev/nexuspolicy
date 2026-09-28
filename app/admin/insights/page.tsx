import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { saveInsight } from "../actions";

export default async function InsightsAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase.from("insights").select("id, title, slug, published").order("published_on", { ascending: false });
  return (
    <AdminShell title="Insights">
      <ul className="space-y-2">
        {(data || []).map((item) => (
          <li key={item.id}><Link className="underline" href={`/admin/insights/${item.id}`}>{item.title}</Link> {item.published ? "" : "(unpublished)"}</li>
        ))}
      </ul>
      <form action={saveInsight} className="mt-8 grid max-w-xl gap-3">
        <h2 className="font-serif text-xl">New insight</h2>
        <input name="title" required placeholder="Title" className="h-10 rounded-md border px-3" />
        <input name="slug" placeholder="Slug" className="h-10 rounded-md border px-3" />
        <input name="published_on" type="date" className="h-10 rounded-md border px-3" />
        <textarea name="excerpt" placeholder="Excerpt" className="rounded-md border p-3" />
        <textarea name="body" placeholder="Markdown body" className="min-h-40 rounded-md border p-3" />
        <input name="cover" type="file" accept="image/png,image/jpeg,image/webp" />
        <label className="text-sm"><input type="checkbox" name="published" /> Published</label>
        <button className="w-fit rounded-full bg-[#14382c] px-4 py-2 text-white" type="submit">Save</button>
      </form>
    </AdminShell>
  );
}
