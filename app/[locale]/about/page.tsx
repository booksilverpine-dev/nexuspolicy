import type { Metadata } from "next";
import { about, reasons } from "@/content/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10 px-4 py-12">
      <header>
        <h1 className="font-serif text-4xl text-[#14382c]">From Bhutan to the World</h1>
        <p className="mt-4 text-[#3d5248]">{about.established}</p>
        <p className="mt-4 text-[#3d5248]">{about.belief}</p>
      </header>
      <section id="vision">
        <h2 className="font-serif text-2xl text-[#14382c]">Our vision</h2>
        <p className="mt-3">{about.vision}</p>
        <h2 className="mt-6 font-serif text-2xl text-[#14382c]">Our mission</h2>
        <p className="mt-3">{about.mission}</p>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-[#14382c]">Why Eco Policy Nexus International</h2>
        <ul className="mt-4 space-y-3">
          {reasons.map((reason) => (
            <li key={reason.title}><strong>{reason.title}.</strong> {reason.body}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-[#14382c]">Our role</h2>
        <img src="/infographics/bridge.svg" alt="Five pairs showing how the firm bridges evidence and policy, strategy and implementation, growth and sustainability, communities and institutions, and Bhutanese experience and international knowledge" className="mt-4 w-full" />
      </section>
      <section>
        <h2 className="font-serif text-2xl text-[#14382c]">Our approach</h2>
        <img src="/infographics/approach.svg" alt="Five steps: local understanding, analytical rigor, strategic thinking, practical implementation, and global perspective" className="mt-4 w-full" />
      </section>
      <section id="story">
        <h2 className="font-serif text-2xl text-[#14382c]">Our story</h2>
        <p className="mt-3">{about.story}</p>
        <img src="/infographics/story-flow.svg" alt="Bhutan, Knowledge, Solutions, Partnerships, Global Impact" className="mt-4 w-full" />
      </section>
      <section id="global">
        <h2 className="font-serif text-2xl text-[#14382c]">Looking forward</h2>
        <p className="mt-3">{about.ambition}</p>
        <p className="mt-4 font-medium text-[#14382c]">{about.positioning}</p>
      </section>
    </article>
  );
}
