import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { requireStaff } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { saveIndicator } from "../actions";

export default async function IndicatorsAdmin() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase.from("indicators").select("*").order("sort");
  return (
    <AdminShell title="Indicators">
      {(data || []).map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={saveIndicator} className="grid gap-4 md:grid-cols-4">
              <input type="hidden" name="id" value={item.id} />
              <Field>
                <FieldLabel htmlFor={`label-${item.id}`}>Label</FieldLabel>
                <Input id={`label-${item.id}`} name="label" defaultValue={item.label} />
              </Field>
              <Field>
                <FieldLabel htmlFor={`value-${item.id}`}>Value</FieldLabel>
                <Input id={`value-${item.id}`} name="value" defaultValue={item.value} />
              </Field>
              <Field>
                <FieldLabel htmlFor={`period-${item.id}`}>Period</FieldLabel>
                <Input id={`period-${item.id}`} name="period" defaultValue={item.period} />
              </Field>
              <Field>
                <FieldLabel htmlFor={`override-${item.id}`}>Override</FieldLabel>
                <Input id={`override-${item.id}`} name="override_value" defaultValue={item.override_value || ""} placeholder="Override" />
              </Field>
              <Button type="submit" className="w-fit">Save</Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </AdminShell>
  );
}
