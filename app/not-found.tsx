import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-serif text-4xl text-[#14382c]">Page not found</h1>
      <p className="mt-3 text-[#3d5248]">That address is not on this site.</p>
      <Link href="/en" className="mt-6 inline-flex rounded-full bg-[#e36b1e] px-5 py-3 text-white">Back to home</Link>
    </main>
  );
}
