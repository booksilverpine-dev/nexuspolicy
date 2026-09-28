import { Card, CardContent } from "@/components/ui/card";

export function LegalPage({
  title,
  summary,
  children,
}: {
  title: string;
  summary?: string[];
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <header>
        <h1 className="font-serif text-4xl text-[#14382c]">{title}</h1>
        {summary ? (
          <ul className="mt-6 grid gap-3">
            {summary.map((item) => (
              <li key={item}><Card><CardContent className="text-sm leading-6">{item}</CardContent></Card></li>
            ))}
          </ul>
        ) : null}
      </header>
      <div className="space-y-4 leading-7 text-[#3d5248]">{children}</div>
    </article>
  );
}
