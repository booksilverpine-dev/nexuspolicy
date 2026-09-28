import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-lg items-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Page not found</CardTitle>
          <CardDescription>That address is not on this site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button nativeButton={false} render={<Link href="/en" />}>Back to home</Button>
        </CardContent>
      </Card>
    </main>
  );
}
