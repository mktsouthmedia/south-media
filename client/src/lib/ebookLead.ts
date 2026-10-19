// Validação e envio do formulário do ebook (LP /ebook, pop-up e seção da Home).
// Envia para /api/lead (→ Brevo, SOURCE: ebook).

// Domínios de e-mail pessoal recusados. Edite aqui para liberar ou bloquear mais.
export const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "yahoo.com.br",
  "bol.com.br",
  "uol.com.br",
  "icloud.com",
  "me.com",
  "terra.com.br",
  "ig.com.br",
  "proton.me",
  "protonmail.com",
];

export const EMAIL_INVALID_MSG = "Digite um e-mail válido.";
export const EMAIL_PERSONAL_MSG = "Use o seu e-mail corporativo, por favor.";
export const SEND_ERROR_MSG = "Não conseguimos enviar agora. Tente de novo em instantes.";

/** Retorna a mensagem de erro, ou "" se o e-mail é válido e corporativo. */
export function validateCorporateEmail(value: string): string {
  const v = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return EMAIL_INVALID_MSG;
  const domain = v.split("@")[1] ?? "";
  if (PERSONAL_EMAIL_DOMAINS.includes(domain)) return EMAIL_PERSONAL_MSG;
  return "";
}

export interface EbookLeadData {
  email: string;
  cargo: string;
  empresa: string;
}

/** true se o lead foi aceito pela API. */
export async function sendEbookLead(data: EbookLeadData): Promise<boolean> {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) return true;
    console.error("[ebook] falha ao enviar lead:", response.status);
    return false;
  } catch (err) {
    console.error("[ebook] falha de rede:", err);
    return false;
  }
}
