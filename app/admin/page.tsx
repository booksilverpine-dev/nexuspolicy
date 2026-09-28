import { AdminShell } from "@/components/admin-shell";
import { requireStaff } from "@/lib/data";

export default async function AdminHome() {
  await requireStaff();
  return (
    <AdminShell title="Staff home">
      <p className="max-w-xl text-[#3d5248]">Publish insights, correct indicators, add team profiles, read messages, and invite a client organization. Payments stay hidden until Stripe keys are set.</p>
    </AdminShell>
  );
}
