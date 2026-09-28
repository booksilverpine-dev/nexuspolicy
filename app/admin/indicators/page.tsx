import { AdminShell } from "@/components/admin-shell";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { saveIndicator } from "../actions";

export default async function IndicatorsAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase.from("indicators").select("*").order("sort");
  return (
    <AdminShell title="Indicators">
      <div className="space-y-6">
        {(data || []).map((item) => (
          <form key={item.id} action={saveIndicator} className="grid gap-2 rounded-xl border bg-white p-4 md:grid-cols-4">
            <input type="hidden" name="id" value={item.id} />
            <input name="label" defaultValue={item.label} className="h-10 rounded-md border px-3" />
            <input name="value" defaultValue={item.value} className="h-10 rounded-md border px-3" />
            <input name="period" defaultValue={item.period} className="h-10 rounded-md border px-3" />
            <input name="override_value" defaultValue={item.override_value || ""} placeholder="Override" className="h-10 rounded-md border px-3" />
            <button className="w-fit rounded-full bg-[#14382c] px-4 py-2 text-sm text-white" type="submit">Save</button>
          </form>
        ))}
      </div>
    </AdminShell>
  );
}
