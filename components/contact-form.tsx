"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, null);
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Name" />
        <Field name="email" label="Email" type="email" />
      </div>
      <Field name="organization" label="Organization" required={false} />
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required minLength={1} maxLength={4000} rows={6} />
      </div>
      <input name="company_website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state?.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
      {state?.ok ? <p className="text-sm text-[#14382c]">Thank you. Your message has been received.</p> : null}
      <Button type="submit" disabled={pending} className="bg-[#e36b1e] text-white hover:bg-[#cf5c12]">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

function Field({ name, label, type = "text", required = true }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} maxLength={200} />
    </div>
  );
}
