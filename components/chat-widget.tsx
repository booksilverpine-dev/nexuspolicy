"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Ask about Eco Policy Nexus International. This assistant uses public information only and is not formal advice." },
  ]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || pending) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-8) }),
      });
      const data = await response.json();
      setMessages((current) => [...current, { role: "assistant", content: data.message || "Please try again in a moment." }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "Please try again in a moment." }]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-40">
      {open ? (
        <div className="mb-3 flex h-96 w-[min(100vw-2rem,22rem)] flex-col rounded-2xl border border-[#e4ddd0] bg-white shadow-lg">
          <div className="border-b px-4 py-3 text-sm font-medium text-[#14382c]">Ask Eco Policy Nexus</div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((message, index) => (
              <p key={index} className={message.role === "user" ? "text-right text-[#14382c]" : "text-[#3d5248]"}>
                {message.content}
              </p>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2 border-t p-3">
            <label className="sr-only" htmlFor="chat-input">Question</label>
            <input id="chat-input" value={input} onChange={(event) => setInput(event.target.value)} className="h-10 flex-1 rounded-full border px-3 text-sm" maxLength={1000} />
            <Button type="submit" disabled={pending} className="bg-[#14382c] text-white">Send</Button>
          </form>
        </div>
      ) : null}
      <Button type="button" onClick={() => setOpen((value) => !value)} className="bg-[#e36b1e] text-white hover:bg-[#cf5c12]">
        {open ? "Close" : "Ask"}
      </Button>
    </div>
  );
}
