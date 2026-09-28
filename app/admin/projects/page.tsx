import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { createProject, uploadProjectFile } from "../actions";

export default async function ProjectsAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data: orgs } = await supabase.from("organizations").select("id, name");
  const { data: projects } = await supabase.from("projects").select("id, name, organization_id, summary");
  return (
    <AdminShell title="Projects">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(projects || []).map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell className="whitespace-normal">{project.summary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Create a project</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProject}>
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
                <FieldLabel htmlFor="name">Project name</FieldLabel>
                <Input id="name" name="name" required placeholder="Project name" />
              </Field>
              <Field>
                <FieldLabel htmlFor="summary">Summary</FieldLabel>
                <Textarea id="summary" name="summary" placeholder="Summary" />
              </Field>
              <Button type="submit" className="w-fit">Create project</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upload a file</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={uploadProjectFile}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel>Project</FieldLabel>
                <Select name="project_id" defaultValue={projects?.[0]?.id} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    {(projects || []).map((project) => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="file">File</FieldLabel>
                <Input id="file" name="file" type="file" required />
              </Field>
              <Button type="submit" variant="outline" className="w-fit">Upload file</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
