import { AuthScreen } from "@/components/auth-screen";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <AuthScreen
      title="Staff sign in"
      description="Public registration is closed. Only a staff profile can enter."
      error={error ? "Those details were not accepted." : undefined}
      next="/admin"
    />
  );
}
