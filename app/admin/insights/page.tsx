import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { saveInsight } from "../actions";

export default async function InsightsAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase.from("insights").select("id, title, slug, published").order("published_on", { ascending: false });
  return (
    <AdminShell title="Insights">
      <Card>
        <CardHeader>
          <CardTitle>Published and drafts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data || []).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell><Badge variant={item.published ? "default" : "secondary"}>{item.published ? "Published" : "Draft"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button nativeButton={false} render={<Link href={`/admin/insights/${item.id}`} />} variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>New insight</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveInsight}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input id="title" name="title" required placeholder="Title" />
              </Field>
              <Field>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <Input id="slug" name="slug" placeholder="Slug" />
              </Field>
              <Field>
                <FieldLabel htmlFor="published_on">Date</FieldLabel>
                <Input id="published_on" name="published_on" type="date" />
              </Field>
              <Field>
                <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
                <Textarea id="excerpt" name="excerpt" placeholder="Excerpt" />
              </Field>
              <Field>
                <FieldLabel htmlFor="body">Body</FieldLabel>
                <Textarea id="body" name="body" placeholder="Markdown body" className="min-h-40" />
              </Field>
              <Field>
                <FieldLabel htmlFor="cover">Cover</FieldLabel>
                <Input id="cover" name="cover" type="file" accept="image/png,image/jpeg,image/webp" />
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="published" name="published" value="on" />
                <FieldLabel htmlFor="published">Published</FieldLabel>
              </Field>
              <Button type="submit" className="w-fit">Save</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
