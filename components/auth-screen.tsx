import Link from "next/link";
import { signIn } from "@/app/actions";
import { firm } from "@/content/site";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function AuthScreen({
  title,
  description,
  error,
  next,
}: {
  title: string;
  description: string;
  error?: string;
  next: string;
}) {
  return (
    <main className="grid min-h-svh bg-background lg:grid-cols-2">
      <section className="flex flex-col justify-between bg-primary p-8 text-primary-foreground lg:p-12">
        <Link href="/en" className="flex items-center gap-3">
          <img src="/brand/mark.svg" alt="" className="size-12" />
          <span className="font-serif text-lg leading-tight">Eco Policy Nexus</span>
        </Link>
        <div className="max-w-md py-12">
          <p className="font-serif text-4xl leading-tight">{firm.name}</p>
          <p className="mt-4 text-primary-foreground/80">{firm.tagline}</p>
        </div>
        <p className="text-sm text-primary-foreground/70">{firm.address}</p>
      </section>
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <form action={signIn}>
              <FieldGroup>
                <input type="hidden" name="next" value={next} />
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" name="email" type="email" autoComplete="email" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" autoComplete="current-password" required />
                </Field>
                <Field>
                  <Button type="submit" className="w-full">Sign in</Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
