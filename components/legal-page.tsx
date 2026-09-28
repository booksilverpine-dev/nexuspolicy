export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="font-serif text-4xl text-[#14382c]">{title}</h1>
      <div className="space-y-4 text-[#3d5248]">{children}</div>
    </article>
  );
}
