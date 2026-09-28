import { AdminShell } from "@/components/admin-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { createInvoice } from "../actions";

export default async function InvoicesAdmin({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  await requireStaff();
  const query = await searchParams;
  const supabase = await createClient();
  const { data: orgs } = await supabase.from("organizations").select("id, name");
  const { data: projects } = await supabase.from("projects").select("id, name");
  const { data: invoices } = await supabase.from("invoices").select("id, title, status, amount_cents, currency");
  const stripeReady = Boolean(process.env.STRIPE_SECRET_KEY);
  return (
    <AdminShell title="Invoices">
      {query.draft ? (
        <Alert>
          <AlertTitle>Saved as a draft</AlertTitle>
          <AlertDescription>Add Stripe keys before a client can pay.</AlertDescription>
        </Alert>
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(invoices || []).map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.title}</TableCell>
                  <TableCell>{(invoice.amount_cents / 100).toFixed(2)} {String(invoice.currency).toUpperCase()}</TableCell>
                  <TableCell><Badge variant="secondary">{invoice.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {stripeReady ? (
        <Card>
          <CardHeader>
            <CardTitle>New invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createInvoice}>
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel>Organization</FieldLabel>
                  <Select name="organization_id" defaultValue={orgs?.[0]?.id} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {(orgs || []).map((org) => (
                        <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Project</FieldLabel>
                  <Select name="project_id" defaultValue="none">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No project</SelectItem>
                      {(projects || []).map((project) => (
                        <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input id="title" name="title" required placeholder="Invoice title" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="amount">Amount in USD</FieldLabel>
                  <Input id="amount" name="amount" type="number" min="0" step="0.01" required placeholder="Amount in USD" />
                </Field>
                <Button type="submit" className="w-fit">Create and open checkout</Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Stripe is not configured</CardTitle>
            <CardDescription>Invoice creation stays hidden until STRIPE_SECRET_KEY is set.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </AdminShell>
  );
}
