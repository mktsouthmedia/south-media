import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WA_CONTATO } from "@/lib/whatsapp";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";


const faqs = [
  {
    q: "Qual o investimento mínimo para começar?",
    a: "Não existe investimento mínimo. O valor ideal depende dos seus objetivos, canais desejados e abrangência geográfica. No diagnóstico estratégico gratuito, dimensionamos o investimento ideal para o seu caso.",
  },
  {
    q: "Vocês atendem empresas de qualquer segmento?",
    a: "Sim. Atendemos marcas de diversos segmentos — tecnologia, varejo, educação, saúde, financeiro, turismo, alimentação, mobilidade e mais. Nossa tecnologia se adapta a diferentes verticais e objetivos de negócio.",
  },
  {
    q: "Como funciona o processo de onboarding?",
    a: "O onboarding começa com um diagnóstico estratégico das suas campanhas atuais. Em seguida, desenhamos uma estratégia sob medida e iniciamos a ativação com acompanhamento contínuo. Todo o processo leva de 5 a 10 dias úteis.",
  },
  {
    q: "Em quanto tempo começo a ver resultados?",
    a: "Os primeiros indicadores de performance aparecem já na primeira semana de campanha. Resultados consistentes e otimizados se consolidam entre 30 e 60 dias, com otimização contínua ao longo de toda a parceria.",
  },
  {
    q: "O que é o Double Check antes das campanhas irem ao ar?",
    a: "O Double Check é nossa camada proprietária de verificação prévia. Antes de qualquer campanha ir ao ar, auditamos o inventário, validamos a segurança da marca e verificamos a qualidade do tráfego. Isso garante que seu investimento não seja desperdiçado com impressões fraudulentas.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const segmentos = ["Tecnologia", "Varejo", "Educação", "Saúde", "Financeiro", "Turismo", "Alimentação & Bebidas", "Mobilidade", "Outro"];
const orcamentos = ["Até R$10k", "R$10k–50k", "R$50k–100k", "Acima de R$100k"];
const objetivos = ["Gerar leads", "Branding & awareness", "App downloads", "Drive to store", "Reconhecimento regional", "Expansão LATAM"];

export default function Contato() {
  const scrollRef = useScrollAnimation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedObjetivos, setSelectedObjetivos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    cargo: "",
    telefone: "",
    segmento: "",
    orcamento: "",
    mensagem: "",
  });
 
const [submitted, setSubmitted] = useState(false);
const [contatoConsent, setContatoConsent] = useState(false);

const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.email || !contatoConsent) {
    toast.error("Preencha o e-mail e aceite o consentimento.");
    return;
  }

  const messageLines = [];
  if (formData.cargo) messageLines.push(`Cargo: ${formData.cargo}`);
  if (formData.segmento) messageLines.push(`Segmento: ${formData.segmento}`);
  if (formData.orcamento) messageLines.push(`Orçamento: ${formData.orcamento}`);
  if (selectedObjetivos.length > 0) messageLines.push(`Objetivos: ${selectedObjetivos.join(", ")}`);
  if (formData.mensagem) messageLines.push(`Mensagem: ${formData.mensagem}`);

  try {
    setIsSubmitting(true);

    const response = await fetch("/api/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar lead");
    }

    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setSubmitted(true);

    setFormData({
      nome: "",
      email: "",
      empresa: "",
      cargo: "",
      telefone: "",
      segmento: "",
      orcamento: "",
      mensagem: "",
    });

    setSelectedObjetivos([]);

  } catch (error) {
    toast.error("Erro ao enviar mensagem. Tente novamente.");
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};


  

  const toggleObjetivo = (obj: string) => {
    setSelectedObjetivos((prev) =>
      prev.includes(obj) ? prev.filter((o) => o !== obj) : [...prev, obj]
    );
  };

 

  return (
    <div ref={scrollRef}>
      <Helmet>
        <title>Contato — Fale com a South Media</title>
        <meta name="description" content="Solicite um diagnóstico estratégico gratuito e fale com um especialista da South Media sobre sua operação de mídia programática." />
        <link rel="canonical" href="https://southmedia.com.br/contato" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="South Media" />
        <meta property="og:title" content="Contato — Fale com a South Media" />
        <meta property="og:description" content="Solicite um diagnóstico estratégico gratuito e fale com um especialista da South Media." />
        <meta property="og:url" content="https://southmedia.com.br/contato" />
        <meta property="og:image" content="https://southmedia.com.br/og-southmedia.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contato — Fale com a South Media" />
        <meta name="twitter:description" content="Solicite um diagnóstico estratégico gratuito e fale com um especialista da South Media." />
        <meta name="twitter:image" content="https://southmedia.com.br/og-southmedia.png" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd).replace(/</g, "\\u003c")}</script>
      </Helmet>

      <Navbar />

      <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/50 to-[#000000]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="pill-label mb-6 inline-block animate-on-scroll">Vamos Conversar</span>
            <h1 className="font-['Inter'] font-bold text-white text-4xl md:text-6xl lg:text-7xl mb-6 animate-on-scroll text-balance">
              Pronto para transformar<br />sua estratégia de mídia?
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed animate-on-scroll">
              Receba um diagnóstico estratégico gratuito e identifique oportunidades reais
              de crescimento que sua empresa pode estar deixando passar.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-light py-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:capcol-span-2 animate-on-scroll">
              {submitted ? (
                <div className="glass-card p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F45504] flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h2 className="font-['Inter'] font-bold text-white text-2xl mb-4">Mensagem Enviada!</h2>
                  <p className="text-white/80 text-base mb-6">Recebemos sua solicitação e entraremos em contato em até 24 horas úteis.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline">Enviar outra mensagem</button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <h2 className="font-['Inter'] font-bold text-white text-2xl mb-2">Solicite sua Proposta</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input type="text" id="nome" required value={formData.nome} onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))} className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent" placeholder="Nome completo" />
                    <label htmlFor="nome" className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">Nome completo</label>
                  </div>
                  <div className="relative">
                    <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent" placeholder="E-mail corporativo" />
                    <label htmlFor="email" className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">E-mail corporativo</label>
                  </div>
                  <div className="relative">
                    <input type="text" id="empresa" required value={formData.empresa} onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))} className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent" placeholder="Empresa" />
                    <label htmlFor="empresa" className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">Empresa</label>
                  </div>
                  <div className="relative">
                    <input type="text" id="cargo" value={formData.cargo} onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))} className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent" placeholder="Cargo" />
                    <label htmlFor="cargo" className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">Cargo</label>
                  </div>
                  <div className="relative">
                    <input type="tel" id="telefone" value={formData.telefone} onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))} className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent" placeholder="Telefone / WhatsApp" />
                    <label htmlFor="telefone" className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">Telefone / WhatsApp</label>
                  </div>
                  <div className="relative">
                    <select value={formData.segmento} onChange={(e) => setFormData(prev => ({ ...prev, segmento: e.target.value }))} className="w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] appearance-none">
                      <option value="" className="bg-[#000000]">Selecione o segmento</option>
                      {segmentos.map((s) => (
                        <option key={s} value={s} className="bg-[#000000]">{s}</option>
                      ))}
                    </select>
                    <label className="absolute left-4 top-2 text-white/60 text-xs font-['Inter']">Segmento</label>
                  </div>
                </div>

                <div className="relative">
                  <select value={formData.orcamento} onChange={(e) => setFormData(prev => ({ ...prev, orcamento: e.target.value }))} className="w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] appearance-none">
                    <option value="" className="bg-[#000000]">Selecione o orçamento</option>
                    {orcamentos.map((o) => (
                      <option key={o} value={o} className="bg-[#000000]">{o}</option>
                    ))}
                  </select>
                  <label className="absolute left-4 top-2 text-white/60 text-xs font-['Inter']">Orçamento mensal estimado</label>
                </div>

                <div>
                  <p className="text-white/60 text-sm mb-3 font-['Inter']">Objetivo principal</p>
                  <div className="flex flex-wrap gap-3">
                    {objetivos.map((obj) => (
                      <button
                        key={obj}
                        type="button"
                        onClick={() => toggleObjetivo(obj)}
                        className={`px-4 py-2 rounded-full text-sm font-['Inter'] transition-all ${
                          selectedObjetivos.includes(obj)
                            ? "bg-[#7F31B8] text-white"
                            : "bg-[#141414] text-white/80 border border-[#2A2A2A] hover:border-[#7F31B8]"
                        }`}
                      >
                        {obj}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <textarea id="mensagem" rows={4} value={formData.mensagem} onChange={(e) => setFormData(prev => ({ ...prev, mensagem: e.target.value }))} className="peer w-full px-4 py-3 pt-6 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white focus:border-[#7F31B8] focus:outline-none transition-colors font-['Inter'] placeholder-transparent resize-none" placeholder="Mensagem" />
                  <label htmlFor="mensagem" className="absolute left-4 top-2 text-white/60 text-xs font-['Inter'] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F31B8]">Mensagem (opcional)</label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="contato-consent"
                    checked={contatoConsent}
                    onCheckedChange={(checked) => setContatoConsent(checked === true)}
                    className="mt-0.5 border-[#7F31B8] data-[state=checked]:bg-[#7F31B8] data-[state=checked]:border-[#7F31B8]"
                  />
                  <label htmlFor="contato-consent" className="text-white/70 text-xs leading-relaxed cursor-pointer">
                    Autorizo a South Media a coletar meus dados e concordo em receber novidades, promoções e ofertas por e-mail. Posso cancelar a qualquer momento.
                  </label>
                </div>

                <button type="submit" disabled={!contatoConsent || isSubmitting} className="btn-cta w-full !text-lg !py-4 disabled:opacity-40 disabled:cursor-not-allowed">
                  {isSubmitting ? "Enviando..." : "Agendar Reunião Inicial"}
                </button>
                <p className="text-white/60 text-xs text-center">Entraremos em contato em até 24 horas úteis</p>
              </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-on-scroll">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F45504] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className="font-['Inter'] font-bold text-white text-sm">WhatsApp</p>
                    <a href={WA_CONTATO} target="_blank" rel="noopener noreferrer" className="text-white/80 text-sm hover:text-white transition-colors">+55 41 99691-7857</a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7F31B8] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <p className="font-['Inter'] font-bold text-white text-sm">E-mail</p>
                    <a href="mailto:comercial@southmedia.com.br" className="text-white/80 text-sm hover:text-white transition-colors">comercial@southmedia.com.br</a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7F31B8] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  <div>
                    <p className="font-['Inter'] font-bold text-white text-sm">LinkedIn</p>
                    <a href="https://www.linkedin.com/company/south-media/" target="_blank" rel="noopener noreferrer" className="text-white/80 text-sm hover:text-white transition-colors">/company/south-media</a>
                  </div>
                </div>
              </div>

              {/* Presença Geográfica */}
              <div className="glass-card p-6">
                <p className="font-['Inter'] font-bold text-white text-sm mb-4">Presença Nacional + América Latina</p>
                <div className="flex flex-wrap gap-2">
                  {["São Paulo", "Pernambuco", "Paraná", "Santa Catarina"].map((state) => (
                    <span key={state} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F45504] animate-pulse" />
                      <span className="text-white/80 text-sm">{state}</span>
                    </span>
                  ))}
                  {["Buenos Aires", "Santiago", "Lima"].map((city) => (
                    <span key={city} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7F31B8] animate-pulse" />
                      <span className="text-white/80 text-sm">{city}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-dark py-20">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl text-balance">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden animate-on-scroll">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-['Inter'] font-bold text-white text-base pr-4">{faq.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7F31B8"
                    strokeWidth="2"
                    className={`shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[300px]" : "max-h-0"}`}>
                  <p className="px-6 pb-6 text-white/80 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-orange py-20">
        <div className="container relative z-10 text-center">
          <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-6 animate-on-scroll text-balance">
            Falar diretamente com um especialista agora:
          </h2>
          <a
            href={WA_CONTATO}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta !text-lg !px-10 !py-5 animate-on-scroll inline-flex"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Falar no WhatsApp
          </a>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
