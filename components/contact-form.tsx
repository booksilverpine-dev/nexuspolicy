"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, null);
  return (
    <form action={action}>
      <FieldGroup className="gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" name="name" required maxLength={200} />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" type="email" required maxLength={200} />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="organization">Organization</FieldLabel>
          <Input id="organization" name="organization" maxLength={200} />
        </Field>
        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea id="message" name="message" required minLength={1} maxLength={4000} rows={6} />
        </Field>
        <input name="company_website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {state?.error ? (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        ) : null}
        {state?.ok ? (
          <Alert>
            <AlertDescription>Thank you. Your message has been received.</AlertDescription>
          </Alert>
        ) : null}
        <Button type="submit" disabled={pending} className="w-fit bg-[#e36b1e] text-white hover:bg-[#cf5c12]">
          {pending ? "Sending…" : "Send message"}
        </Button>
      </FieldGroup>
    </form>
  );
}
