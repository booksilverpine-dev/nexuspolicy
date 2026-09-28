import { AdminShell } from "@/components/admin-shell";
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
      <ul className="space-y-1 text-sm">{(projects || []).map((project) => <li key={project.id}>{project.name}</li>)}</ul>
      <form action={createProject} className="mt-6 grid max-w-md gap-3">
        <select name="organization_id" className="h-10 rounded-md border px-3" required>
          {(orgs || []).map((org) => <option key={org.id} value={org.id}>{org.name}</option>)}
        </select>
        <input name="name" required placeholder="Project name" className="h-10 rounded-md border px-3" />
        <textarea name="summary" placeholder="Summary" className="rounded-md border p-3" />
        <button className="w-fit rounded-full bg-[#14382c] px-4 py-2 text-white" type="submit">Create project</button>
      </form>
      <form action={uploadProjectFile} className="mt-8 grid max-w-md gap-3">
        <select name="project_id" className="h-10 rounded-md border px-3" required>
          {(projects || []).map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
        </select>
        <input name="file" type="file" required />
        <button className="w-fit rounded-full border px-4 py-2" type="submit">Upload file</button>
      </form>
    </AdminShell>
  );
}
