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
import { saveTeam } from "../actions";

export default async function TeamAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase.from("team_members").select("id, name, role, published").order("sort");
  return (
    <AdminShell title="Team">
      <Card>
        <CardHeader>
          <CardTitle>Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data || []).map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell><Badge variant={member.published ? "default" : "secondary"}>{member.published ? "Published" : "Hidden"}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Add a person</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveTeam}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" name="name" required placeholder="Name" />
              </Field>
              <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <Input id="role" name="role" placeholder="Role" />
              </Field>
              <Field>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <Textarea id="bio" name="bio" placeholder="Bio" />
              </Field>
              <Field>
                <FieldLabel htmlFor="sort">Sort</FieldLabel>
                <Input id="sort" name="sort" type="number" defaultValue={0} />
              </Field>
              <Field>
                <FieldLabel htmlFor="photo">Photo</FieldLabel>
                <Input id="photo" name="photo" type="file" accept="image/png,image/jpeg,image/webp" />
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="published" name="published" value="on" defaultChecked />
                <FieldLabel htmlFor="published">Published</FieldLabel>
              </Field>
              <Button type="submit" className="w-fit">Add</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
