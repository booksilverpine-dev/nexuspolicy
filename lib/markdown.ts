function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderMarkdown(source: string) {
  const escaped = escapeHtml(source.trim());
  const blocks = escaped.split(/\n{2,}/);
  return blocks
    .map((block) => {
      if (block.startsWith("## ")) return `<h2>${inline(block.slice(3))}</h2>`;
      if (block.startsWith("# ")) return `<h2>${inline(block.slice(2))}</h2>`;
      const lines = block.split("\n");
      if (lines.every((line) => line.startsWith("- "))) {
        return `<ul>${lines.map((line) => `<li>${inline(line.slice(2))}</li>`).join("")}</ul>`;
      }
      return `<p>${inline(block.replaceAll("\n", " "))}</p>`;
    })
    .join("");
}

function inline(value: string) {
  return value.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
