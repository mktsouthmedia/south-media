import { useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { whatsappLink, WA_CONTATO } from "@/lib/whatsapp";
import { track } from "@/lib/tracking";
import { trackOpenAiLead } from "@/lib/openaiPixel";

const orcamentos = ["Até R$10k", "R$10k–50k", "R$50k–100k", "Acima de R$100k"];
const objetivos = ["CTV", "Mídia Programática", "Netflix", "DOOH", "Geolocalização", "Dados", "Outro"];

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

type ScheduleFormProps = {
  source?: string;
};

export default function ScheduleForm({ source = "home-agendamento" }: ScheduleFormProps) {
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    telefone: "",
    cargo: "",
    objetivo: "",
    orcamento: "",
  });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formStarted = useRef(false);

  const onFieldTouched = () => {
    if (!formStarted.current) {
      formStarted.current = true;
      track("form_start", { form: "agendar", source });
    }
  };

  const openWhatsApp = () => {
    const lines = [`Olá! Quero agendar meus 30 minutos de diagnóstico.`];
    if (formData.nome) lines.push(`Nome: ${formData.nome}`);
    if (formData.empresa) lines.push(`Empresa: ${formData.empresa}`);
    if (formData.cargo) lines.push(`Cargo: ${formData.cargo}`);
    if (formData.telefone) lines.push(`Telefone: ${formData.telefone}`);
    if (formData.objetivo) lines.push(`O que procura: ${formData.objetivo}`);
    if (formData.orcamento) lines.push(`Verba mensal aproximada: ${formData.orcamento}`);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !consent) {
      toast.error("Preencha o e-mail e aceite o consentimento.");
      return;
    }

    let leadSaved = false;
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, source }),
      });
      if (response.ok) {
        leadSaved = true;
      } else {
        console.error("[agendamento] falha ao enviar lead:", response.status);
      }
    } catch (error) {
      console.error("[agendamento] erro de rede ao enviar lead:", error);
    } finally {
      setIsSubmitting(false);
    }

    // Não bloqueia o usuário mesmo se a API falhar: o agendamento continua pelo WhatsApp.
    track("form_submit", { form: "agendar", source, objetivo: formData.objetivo || undefined });
    if (leadSaved) trackOpenAiLead();
    openWhatsApp();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F45504] flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-['Inter'] font-bold text-white text-2xl mb-3">Recebemos.</h3>
        <p className="text-white/80 text-base mb-6">Retornamos em até 1 dia útil. Seus dados não são compartilhados.</p>
        <a
          href={WA_CONTATO}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { placement: "form_success", source })}
          className="btn-outline"
        >
          Falar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div>
      {CALENDLY_URL && (
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline w-full mb-6 !flex"
        >
          Escolher horário na agenda
        </a>
      )}
      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative">
            <input
              type="text"
              id={fieldId("nome")}
              value={formData.nome}
              onChange={(e) => { onFieldTouched(); setFormData((prev) => ({ ...prev, nome: e.target.value })); }}
              className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent"
              placeholder="Nome"
            />
            <label htmlFor={fieldId("nome")} className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">Nome</label>
          </div>
          <div className="relative">
            <input
              type="text"
              id={fieldId("empresa")}
              value={formData.empresa}
              onChange={(e) => { onFieldTouched(); setFormData((prev) => ({ ...prev, empresa: e.target.value })); }}
              className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent"
              placeholder="Empresa"
            />
            <label htmlFor={fieldId("empresa")} className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">Empresa</label>
          </div>
          <div className="relative">
            <input
              type="email"
              id={fieldId("email")}
              required
              value={formData.email}
              onChange={(e) => { onFieldTouched(); setFormData((prev) => ({ ...prev, email: e.target.value })); }}
              className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent"
              placeholder="E-mail corporativo"
            />
            <label htmlFor={fieldId("email")} className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">E-mail corporativo</label>
          </div>
          <div className="relative">
            <input
              type="tel"
              id={fieldId("telefone")}
              value={formData.telefone}
              onChange={(e) => { onFieldTouched(); setFormData((prev) => ({ ...prev, telefone: e.target.value })); }}
              className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent"
              placeholder="Telefone / WhatsApp"
            />
            <label htmlFor={fieldId("telefone")} className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">Telefone / WhatsApp</label>
          </div>
          <div className="relative">
            <input
              type="text"
              id={fieldId("cargo")}
              value={formData.cargo}
              onChange={(e) => { onFieldTouched(); setFormData((prev) => ({ ...prev, cargo: e.target.value })); }}
              className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent"
              placeholder="Cargo"
            />
            <label htmlFor={fieldId("cargo")} className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">Cargo</label>
          </div>
          <div className="relative">
            <select
              value={formData.orcamento}
              onChange={(e) => { onFieldTouched(); setFormData((prev) => ({ ...prev, orcamento: e.target.value })); }}
              className="w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] appearance-none"
            >
              <option value="" className="bg-[#000000]">Selecione a verba</option>
              {orcamentos.map((o) => (
                <option key={o} value={o} className="bg-[#000000]">{o}</option>
              ))}
            </select>
            <label className="absolute left-4 top-2 text-white/60 text-xs font-['Inter']">Verba mensal aproximada</label>
          </div>
        </div>

        <div>
          <p className="text-white/60 text-sm mb-3 font-['Inter']">O que você procura?</p>
          <div className="flex flex-wrap gap-2">
            {objetivos.map((obj) => (
              <button
                key={obj}
                type="button"
                onClick={() => { onFieldTouched(); setFormData((prev) => ({ ...prev, objetivo: obj })); }}
                className={`px-4 py-2 rounded-full text-sm font-['Inter'] transition-all ${
                  formData.objetivo === obj
                    ? "bg-[#7F31B8] text-white"
                    : "bg-[#141414] text-white/80 border border-[#2A2A2A] hover:border-[#7F31B8]"
                }`}
              >
                {obj}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id={fieldId("consent")}
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked === true)}
            className="mt-0.5 border-[#7F31B8] data-[state=checked]:bg-[#7F31B8] data-[state=checked]:border-[#7F31B8]"
          />
          <label htmlFor={fieldId("consent")} className="text-white/70 text-xs leading-relaxed cursor-pointer">
            Autorizo a South Media a coletar meus dados para retorno sobre este agendamento. Posso cancelar a qualquer momento.
          </label>
        </div>

        <button
          type="submit"
          disabled={!consent || isSubmitting}
          className="btn-cta w-full !text-lg !py-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Agendar meus 30 minutos"}
        </button>
        <p className="text-white/60 text-xs text-center">Retornamos em até 1 dia útil. Seus dados não são compartilhados.</p>
      </form>

      <p className="text-center text-white/50 text-sm mt-4">
        Prefere WhatsApp?{" "}
        <a
          href={WA_CONTATO}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { placement: "form_alt", source })}
          className="text-white/80 hover:text-white underline"
        >
          Fale com um especialista
        </a>
      </p>
    </div>
  );
}
