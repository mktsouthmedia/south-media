// Eventos de conversão do pixel da OpenAI Ads. O pixel base (window.oaiq) é
// instalado em client/index.html; aqui só disparamos os eventos, sem nunca
// quebrar a página caso o pixel não tenha carregado.

type OaiqFn = (command: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    oaiq?: OaiqFn;
  }
}

function measure(...args: unknown[]) {
  try {
    if (typeof window !== "undefined" && typeof window.oaiq === "function") {
      window.oaiq("measure", ...args);
    }
  } catch {
    // o pixel nunca pode afetar a navegação
  }
}

/** Lead: clique em WhatsApp ou envio concluído do formulário de agendamento. */
export function trackOpenAiLead() {
  measure("lead_created", { type: "customer_action" });
}

/** Envio concluído do formulário do ebook. */
export function trackOpenAiEbookDownload() {
  measure("custom", { type: "custom" }, { custom_event_name: "ebook_download" });
}

// Links de contato (wa.me/<número>, api.whatsapp.com/send), não os de compartilhar (wa.me/?text=).
function isWhatsappContactLink(href: string): boolean {
  try {
    const url = new URL(href, window.location.href);
    if (url.protocol === "whatsapp:") return true;
    if (url.hostname === "wa.me") return /^\/\d+/.test(url.pathname);
    if (url.hostname === "api.whatsapp.com") return url.pathname.startsWith("/send") && url.searchParams.has("phone");
    return false;
  } catch {
    return false;
  }
}

/**
 * Um único ouvinte de clique cobre todos os botões e links de WhatsApp do site
 * (inclusive o botão flutuante e os de páginas futuras).
 */
export function initOpenAiWhatsappTracking() {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (link && isWhatsappContactLink(link.getAttribute("href") ?? "")) trackOpenAiLead();
    },
    true
  );
}
