export type FaqItem = { q: string; a: string };

// Extrai pares pergunta/resposta da secao "## Perguntas Frequentes" para o schema FAQPage.
export function extractFaq(content: string): FaqItem[] {
  const idx = content.search(/^## Perguntas Frequentes\s*$/m);
  if (idx === -1) return [];
  const section = content.slice(idx).split("\n").slice(1);
  const items: FaqItem[] = [];
  for (const line of section) {
    if (line.startsWith("## ")) break;
    if (line.startsWith("### ")) items.push({ q: line.replace("### ", "").trim(), a: "" });
    else if (items.length && line.trim()) {
      const plain = line.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
      const last = items[items.length - 1];
      last.a = last.a ? `${last.a} ${plain}` : plain;
    }
  }
  return items.filter((i) => i.a);
}

export function buildFaqJsonLd(faq: FaqItem[]) {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
