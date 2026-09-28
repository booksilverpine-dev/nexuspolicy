"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorPage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-lg items-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Something went wrong</CardTitle>
          <CardDescription>The page could not be shown. You can return home and try again.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button nativeButton={false} render={<Link href="/en" />}>Back to home</Button>
        </CardContent>
      </Card>
    </main>
  );
}
