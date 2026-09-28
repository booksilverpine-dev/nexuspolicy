import { AdminShell } from "@/components/admin-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      {query.error ? (
        <Alert variant="destructive">
          <AlertTitle>Could not create the client</AlertTitle>
          <AlertDescription>The client account could not be created.</AlertDescription>
        </Alert>
      ) : null}
      {query.created ? (
        <Alert>
          <AlertTitle>Client invited</AlertTitle>
          <AlertDescription>Client {query.created} can sign in with password {query.password}. Share it once, then ask them to change it.</AlertDescription>
        </Alert>
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data || []).map((org) => (
                <TableRow key={org.id}>
                  <TableCell>{org.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Invite a client</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createOrganization}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="name">Organization</FieldLabel>
                <Input id="name" name="name" required placeholder="Organization" />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Client email</FieldLabel>
                <Input id="email" name="email" type="email" required placeholder="Client email" />
              </Field>
              <Button type="submit" className="w-fit">Invite client</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
