import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { deleteInsight, saveInsight } from "../../actions";

export default async function EditInsight({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("insights").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <AdminShell title="Edit insight">
      <form action={saveInsight} className="grid max-w-xl gap-3">
        <input type="hidden" name="id" value={data.id} />
        <input type="hidden" name="cover_path" value={data.cover_path || ""} />
        <input name="title" defaultValue={data.title} className="h-10 rounded-md border px-3" />
        <input name="slug" defaultValue={data.slug} className="h-10 rounded-md border px-3" />
        <input name="published_on" type="date" defaultValue={data.published_on} className="h-10 rounded-md border px-3" />
        <textarea name="excerpt" defaultValue={data.excerpt} className="rounded-md border p-3" />
        <textarea name="body" defaultValue={data.body} className="min-h-40 rounded-md border p-3" />
        <input name="cover" type="file" accept="image/png,image/jpeg,image/webp" />
        <label className="text-sm"><input type="checkbox" name="published" defaultChecked={data.published} /> Published</label>
        <button className="w-fit rounded-full bg-[#14382c] px-4 py-2 text-white" type="submit">Save</button>
      </form>
      <form action={deleteInsight} className="mt-4">
        <input type="hidden" name="id" value={data.id} />
        <button className="text-sm text-red-700" type="submit">Delete</button>
      </form>
    </AdminShell>
  );
}
