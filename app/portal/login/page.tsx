import { AuthScreen } from "@/components/auth-screen";

export default async function PortalLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <AuthScreen
      title="Client sign in"
      description="Accounts are created by the firm. There is no public registration."
      error={error ? "Those details were not accepted." : undefined}
      next="/portal"
    />
  );
}
