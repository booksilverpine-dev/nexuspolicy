import Link from "next/link";
import { signOut } from "@/app/actions";

const links = [
  ["/admin", "Home"],
  ["/admin/insights", "Insights"],
  ["/admin/indicators", "Indicators"],
  ["/admin/team", "Team"],
  ["/admin/messages", "Inbox"],
  ["/admin/organizations", "Organizations"],
  ["/admin/projects", "Projects"],
  ["/admin/invoices", "Invoices"],
];

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f3ec] md:grid md:grid-cols-[220px_1fr]">
      <aside className="border-b border-[#e6e0d4] bg-[#14382c] p-4 text-[#f6f3ec] md:border-r md:border-b-0">
        <p className="font-serif text-lg">Staff</p>
        <nav className="mt-4 flex gap-3 overflow-x-auto md:flex-col">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="text-sm whitespace-nowrap hover:underline">{label}</Link>
          ))}
        </nav>
        <form action={signOut} className="mt-6">
          <input type="hidden" name="next" value="/admin/login" />
          <button className="text-sm underline" type="submit">Sign out</button>
        </form>
      </aside>
      <section className="p-6">
        <h1 className="font-serif text-3xl text-[#14382c]">{title}</h1>
        <div className="mt-6">{children}</div>
      </section>
    </div>
  );
}
