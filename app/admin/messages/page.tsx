import { AdminShell } from "@/components/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export default async function MessagesAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  return (
    <AdminShell title="Contact inbox">
      {(data || []).length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No messages yet</CardTitle>
            <CardDescription>Messages from the public contact form appear here.</CardDescription>
          </CardHeader>
        </Card>
      ) : null}
      {(data || []).map((message) => (
        <Card key={message.id}>
          <CardHeader>
            <CardTitle>{message.name}</CardTitle>
            <CardDescription>{message.email}{message.organization ? ` · ${message.organization}` : ""} · {new Date(message.created_at).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm">{message.message}</p>
          </CardContent>
        </Card>
      ))}
    </AdminShell>
  );
}
