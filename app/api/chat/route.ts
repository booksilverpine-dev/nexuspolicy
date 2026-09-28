import { generateText } from "ai";
import { assistantContext } from "@/content/site";
import { allowRate } from "@/lib/data";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const allowed = await allowRate("chat", ip, 20_000);
  if (!allowed) {
    return Response.json({ message: "Please wait a moment before asking again." }, { status: 429 });
  }
  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Please try again in a moment." }, { status: 400 });
  }
  const messages = (body.messages || []).slice(-8).filter((item) => item.content && item.content.length < 1000);
  if (JSON.stringify(messages).length > 8000) {
    return Response.json({ message: "Please shorten the question." }, { status: 400 });
  }
  try {
    const result = await generateText({
      model: "openai/gpt-5.4",
      system: `${assistantContext}\nAnswer only from this public description. If asked for invoices, client files, passwords, secrets, or admin data, refuse. Say you are not giving formal advice.`,
      messages: messages.map((item) => ({ role: item.role === "assistant" ? "assistant" : "user", content: item.content })),
    });
    return Response.json({ message: result.text });
  } catch (error) {
    console.error("Assistant failed", error instanceof Error ? error.name : "error");
    return Response.json({ message: "Please try again in a moment." });
  }
}
