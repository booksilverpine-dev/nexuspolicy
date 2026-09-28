import { signIn } from "@/app/actions";

export default async function PortalLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <h1 className="font-serif text-3xl text-[#14382c]">Client sign in</h1>
      <p className="mt-2 text-sm">Accounts are created by the firm. There is no public registration.</p>
      {error ? <p className="mt-4 text-sm text-red-700">Those details were not accepted.</p> : null}
      <form action={signIn} className="mt-6 space-y-4">
        <input type="hidden" name="next" value="/portal" />
        <label className="block text-sm" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required className="h-10 w-full rounded-md border px-3" />
        <label className="block text-sm" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required className="h-10 w-full rounded-md border px-3" />
        <button className="rounded-full bg-[#14382c] px-5 py-2 text-white" type="submit">Sign in</button>
      </form>
    </main>
  );
}
