import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveInsight}>
            <FieldGroup className="gap-4">
              <input type="hidden" name="id" value={data.id} />
              <input type="hidden" name="cover_path" value={data.cover_path || ""} />
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input id="title" name="title" defaultValue={data.title} />
              </Field>
              <Field>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <Input id="slug" name="slug" defaultValue={data.slug} />
              </Field>
              <Field>
                <FieldLabel htmlFor="published_on">Date</FieldLabel>
                <Input id="published_on" name="published_on" type="date" defaultValue={data.published_on} />
              </Field>
              <Field>
                <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
                <Textarea id="excerpt" name="excerpt" defaultValue={data.excerpt} />
              </Field>
              <Field>
                <FieldLabel htmlFor="body">Body</FieldLabel>
                <Textarea id="body" name="body" defaultValue={data.body} className="min-h-40" />
              </Field>
              <Field>
                <FieldLabel htmlFor="cover">Replace cover</FieldLabel>
                <Input id="cover" name="cover" type="file" accept="image/png,image/jpeg,image/webp" />
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="published" name="published" value="on" defaultChecked={data.published} />
                <FieldLabel htmlFor="published">Published</FieldLabel>
              </Field>
              <Button type="submit" className="w-fit">Save</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <form action={deleteInsight}>
        <input type="hidden" name="id" value={data.id} />
        <Button type="submit" variant="destructive">Delete</Button>
      </form>
    </AdminShell>
  );
}
