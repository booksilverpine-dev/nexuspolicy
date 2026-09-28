import { AdminShell } from "@/components/admin-shell";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export default async function MessagesAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  return (
    <AdminShell title="Contact inbox">
      <ul className="space-y-4">
        {(data || []).map((message) => (
          <li key={message.id} className="rounded-xl border bg-white p-4">
            <p className="font-medium">{message.name} · {message.email}</p>
            <p className="text-sm text-[#6b7c74]">{message.organization} · {new Date(message.created_at).toLocaleString()}</p>
            <p className="mt-2 whitespace-pre-wrap">{message.message}</p>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
