import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidSphere from "@/components/LiquidSphere";
import ScheduleForm from "@/components/ScheduleForm";
import FaqAccordion from "@/components/FaqAccordion";
import StickyCta from "@/components/StickyCta";
import EbookModal from "@/components/EbookModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { track } from "@/lib/tracking";
import { WA_CONTATO, WA_NETFLIX, WA_HERO_ESPECIALISTA } from "@/lib/whatsapp";
import { blogPosts } from "@/data/blogPosts";
import { solucoes } from "@/data/solucoes";


const clients = [
  "Nestlé", "Volvo", "Bradesco", "Santander", "LATAM Airlines", "Burger King",
  "Nivea", "Banco Pan", "Unimed", "Itaipu Binacional", "Paramount", "Betnacional",
  "Algar Telecom", "O Boticário", "GNT", "Beach Park", "Cielo", "Caoa Chery", "FIEP", "SEBRAE PR",
  "Copacol", "Minhoto", "Sonho", "Bem-Te-Vi", "Moura Dubeux", "Sebrae",
];

const problemas = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F45504" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Tráfego mascarado",
    desc: "Impressão entregue a bot ou a usuário mascarado por VPN é verba gasta sem nenhuma chance de resposta. Ela some do resultado, não do relatório.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F45504" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <line x1="8.5" y1="7.5" x2="10.5" y2="15.5" />
        <line x1="15.5" y1="7.5" x2="13.5" y2="15.5" />
      </svg>
    ),
    title: "Fornecedores fragmentados",
    desc: "Um parceiro por canal, um formato de relatório por parceiro, e nenhuma leitura cruzada. A campanha vira seis campanhas que não conversam.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F45504" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="12" y2="18" />
        <line x1="12" y1="18" x2="15" y2="13" />
      </svg>
    ),
    title: "Números que não defendem decisões",
    desc: "Relatório que prova entrega mas não prova efeito. Na reunião de diretoria, isso pesa o mesmo que nada.",
  },
];

const fluxoTecnologia = ["Audiência", "Detecção", "Validação", "Entrega", "Mensuração"];

const motivosTecnologia = [
  {
    tag: "Tecnologia proprietária",
    nome: "Anti-VPN Tech",
    problema: "Você não sabe se sua campanha regional está sendo vista por gente que realmente está na região contratada.",
    solucao: "A Anti-VPN Tech identifica em tempo real quem navega com localização mascarada por VPN e bloqueia a entrega para esse tráfego.",
  },
  {
    tag: "Tecnologia proprietária",
    nome: "Forja",
    problema: "Você só descobre como a campanha foi no fim do mês, quando já não dá mais para corrigir nada.",
    solucao: "O Forja, nosso dashboard, mostra entrega, investimento e indicadores no ritmo da operação — sem pedir relatório para ninguém.",
  },
  {
    tag: "Metodologia exclusiva",
    nome: "Double Check",
    problema: "Você paga por inventário sem saber se ele é seguro até a campanha já estar no ar.",
    solucao: "O Double Check cruza nossa camada própria com verificação de mercado antes, durante e depois da entrega.",
  },
  {
    tag: "Metodologia exclusiva",
    nome: "DoubleVerify",
    problema: "Você precisa de uma verificação que não seja só a nossa palavra.",
    solucao: "O DoubleVerify é uma camada independente de brand safety, viewability e fraude, auditável por você.",
  },
  {
    tag: "De terceiro, exclusiva nossa",
    nome: "Instant Play",
    problema: "Seu vídeo trava ou não carrega a tempo, e a métrica de visualização completa nunca fecha.",
    solucao: "O Instant Play converte o vídeo em player embutido no próprio anúncio, carregando na hora e protegendo o Complete View.",
  },
  {
    tag: "De terceiro, exclusiva nossa",
    nome: "Geo Intelligence",
    problema: "Você não sabe se a campanha regional está de fato gerando deslocamento até a loja.",
    solucao: "A Geo Intelligence ativa e lê a entrega por comportamento geográfico real — praça, deslocamento e visita física.",
  },
];


const comoTrabalhamos = [
  { n: "01", title: "Diagnóstico", desc: "Entendemos objetivos, público, mercado e desafios." },
  { n: "02", title: "Estratégia", desc: "Definimos canais, audiência, inventário e abordagem." },
  { n: "03", title: "Ativação", desc: "Colocamos a campanha no ar com controle e tecnologia." },
  { n: "04", title: "Mensuração", desc: "Acompanhamos a entrega e os resultados no Forja." },
  { n: "05", title: "Otimização", desc: "Usamos os dados para melhorar a campanha em andamento." },
];

const porQueSouthMedia = [
  { title: "Independência", desc: "Não dependemos de uma DSP única. Compramos nas principais plataformas do mercado (DV360, The Trade Desk, Xandr) e escolhemos a que serve ao objetivo." },
  { title: "Tecnologia própria", desc: "Anti-VPN Tech e o dashboard Forja são nossos, não licenciados. É o que permite dizer com precisão onde e como cada real foi entregue." },
  { title: "Inventário premium", desc: "Mais de 1.330 publishers de CTV e 40.000 publishers premium no Brasil, com Netflix negociada diretamente desde 2022." },
  { title: "Compra direta", desc: "Menos intermediários entre a sua verba e o inventário — mais controle sobre onde e como o anúncio é entregue." },
  { title: "Transparência", desc: "Acompanhamento da campanha no Forja, no ritmo da operação, sem esperar relatório." },
  { title: "Estratégia integrada", desc: "Um único parceiro para display, CTV, DOOH, áudio e drive to store, com leitura cruzada entre canais." },
];

const cases = [
  {
    id: "tecnologia",
    company: "Empresa de Tecnologia",
    metric: "+193%", label: "conversões",
    desafio: "Crescer conversões sustentando a expansão da operação para a América Latina.",
    estrategia: "Investimento 58% maior diluído em CTV, Display e remarketing.",
    resultado: "+86% cliques · +93% CTR · +193% conversões.",
  },
  {
    id: "app",
    company: "BlaBlaCar (App Marketing)",
    metric: "+600%", label: "CTR",
    desafio: "Gerar downloads qualificados e reduzir o custo de aquisição no app.",
    estrategia: "Vídeo, nativos e display, com tracking S2S de 5 eventos pós-download.",
    resultado: "+4.700 downloads · 107% taxa de conversão · 40% redução de CPC.",
  },
  {
    id: "audio",
    company: "Escola de Idiomas (Spotify)",
    metric: "93,7%", label: "taxa de conclusão",
    desafio: "Manter custo por escuta competitivo sem perder volume de entrega.",
    estrategia: "Spotify programático com segmentação avançada por perfil de audiência.",
    resultado: "154k escutas completas · CPE R$0,15 mantido · +23,3% sobre-entrega.",
  },
];

// Particle component for hero
function HeroParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: (Math.random() * 0.5 + 0.1) * 0.5,
            animation: `particle-float ${Math.random() * 8 + 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const scrollRef = useScrollAnimation();
  const reduceMotion = useReducedMotion();
  const [ebookModalOpen, setEbookModalOpen] = useState(false);
  useScrollDepthTracking();

  const latestPosts = blogPosts.slice(0, 3);

  // Auto-popup: abre o modal do ebook após 10s se não foi exibido nesta sessão
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("ebookPopupShown")) {
        setEbookModalOpen(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Chegada vinda de outra página via link com âncora (ex.: Navbar "/#agendar")
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  // Hero staggered animation
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const children = el.querySelectorAll("[data-hero-animate]");
    children.forEach((child, i) => {
      const htmlChild = child as HTMLElement;
      htmlChild.style.opacity = "0";
      htmlChild.style.transform = "translateY(20px)";
      setTimeout(() => {
        htmlChild.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        htmlChild.style.opacity = "1";
        htmlChild.style.transform = "translateY(0)";
      }, i * 200);
    });
  }, []);

  return (
    <div ref={scrollRef}>
      <Helmet>
        <title>South Media — Mídia Programática, CTV e Dados para Resultado Real</title>
        <meta name="description" content="AdTech brasileira e independente: mídia programática, CTV, DOOH e áudio com tecnologia própria contra tráfego mascarado, compra direta e um dashboard aberto. Agende uma conversa." />
        <link rel="canonical" href="https://southmedia.com.br/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="South Media" />
        <meta property="og:title" content="South Media — Mídia Programática, CTV e Dados para Resultado Real" />
        <meta property="og:description" content="AdTech brasileira e independente: mídia programática, CTV, DOOH e áudio com tecnologia própria, compra direta e um dashboard aberto." />
        <meta property="og:url" content="https://southmedia.com.br/" />
        <meta property="og:image" content="https://southmedia.com.br/og-southmedia.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="South Media — Mídia Programática, CTV e Dados para Resultado Real" />
        <meta name="twitter:description" content="AdTech brasileira e independente: mídia programática, CTV, DOOH e áudio com tecnologia própria, compra direta e um dashboard aberto." />
        <meta name="twitter:image" content="https://southmedia.com.br/og-southmedia.png" />
      </Helmet>

      <Navbar />

      <main>
      {/* ===== 1. HERO (+ marquee de marcas na primeira tela em telas grandes) ===== */}
      <section id="hero" className="relative flex flex-col overflow-hidden pt-24 lg:pt-28 pb-40 lg:pb-[110px] min-h-screen supports-[height:100svh]:min-h-[100svh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/60 to-[#000000]" />
        </div>
        <HeroParticles />
        <div className="flex-1 flex items-center">
          <div className="container relative z-10" ref={heroRef}>
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 lg:gap-8 items-center">
              <div className="order-2 lg:order-1">
                <span data-hero-animate className="pill-label mb-4 lg:mb-6 inline-block">AdTech Brasileira e Independente</span>
                <div className="lg:w-fit">
                  <h1 data-hero-animate className="font-['Inter'] font-bold text-white text-[clamp(1.75rem,8.5vw,2.25rem)] sm:text-4xl md:text-5xl lg:text-[38px] xl:text-[44px] leading-[1.1] mb-4 lg:mb-6 sm:whitespace-nowrap">
                    Programática comprovada.<br />
                    Impressão por impressão.
                  </h1>
                  <p data-hero-animate className="text-white/80 text-lg md:text-xl lg:text-base xl:text-lg lg:w-0 lg:min-w-full leading-relaxed mb-6 lg:mb-8">
                    Display, vídeo, Rich Media, CTV, Streaming Premium (Netflix, Prime Video, HBO Max e Globoplay),
                    áudio digital no Spotify e Deezer, DOOH programático, In-Game e Brand Lift. Com as tecnologias
                    Anti-VPN Tech, Instant Play, Household Sync e Drive to Store — e o Forja, nosso painel próprio,
                    mostrando todos os dias onde cada real da sua verba está gerando resultado.
                  </p>
                </div>
                <div data-hero-animate className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={WA_HERO_ESPECIALISTA}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { placement: "hero_primary" })}
                    className="btn-cta !px-6 !py-4 !text-base sm:!px-8 sm:!py-5 sm:!text-lg whitespace-nowrap"
                  >
                    Falar com um especialista
                  </a>
                  <a
                    href="#solucoes"
                    onClick={(e) => {
                      e.preventDefault();
                      track("solution_click", { placement: "hero_secondary" });
                      document.getElementById("solucoes")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-outline !px-6 !py-4 !text-base sm:!px-8 sm:!py-5 sm:!text-lg whitespace-nowrap"
                  >
                    Ver soluções
                  </a>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <LiquidSphere
                  className="w-[min(42vw,150px)] lg:w-[clamp(320px,32vw,570px)] lg:mr-[-4%]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Marquee de marcas — na base do herói, acima do botão flutuante do WhatsApp */}
        <div className="relative z-10 shrink-0 pt-4">
          <div className="relative overflow-hidden">
            <div className="marquee-track">
              {[...clients, ...clients].map((client, i) => (
                <span key={`${client}-${i}`} className="client-pill">{client}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. PROBLEMA ===== */}
      <section className="section-light py-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="pill-label mb-4 inline-block animate-on-scroll">O problema</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 animate-on-scroll text-balance">
              Verba que não chega em pessoas reais.
            </h2>
            <p className="text-white/80 text-base max-w-2xl mx-auto animate-on-scroll">
              Conheça os principais problemas que drenam a sua verba e prejudicam a performance do seu planejamento de mídia.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {problemas.map((item) => (
              <div key={item.title} className="glass-card p-6 animate-on-scroll">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-['Inter'] font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. TECNOLOGIA E DIFERENCIAIS ===== */}
      <motion.section
        id="tecnologia"
        className="section-dark py-20 overflow-hidden scroll-mt-[104px]"
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container relative z-10">
          <div className="text-center mb-10">
            <span className="pill-label mb-4 inline-block">Tecnologia</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 text-balance">
              Motivos para escolher a South Media na hora de executar a operação do seu planejamento de mídia.
            </h2>
            <p className="text-white/80 text-base max-w-2xl mx-auto">
              Não podemos alterar os sistemas e as plataformas do mercado. Mas podemos criar
              tecnologias que otimizem e melhorem os resultados. Conheça algumas tecnologias
              exclusivas que diferenciam a South Media.
            </p>
          </div>

          {/* Fluxo visual: como a entrega é protegida, ponta a ponta */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-14">
            {fluxoTecnologia.map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:gap-4">
                <div className="px-4 py-3 rounded-xl bg-[#141414] border border-[#2A2A2A] text-center">
                  <p className="font-['Inter'] font-bold text-white text-xs md:text-sm uppercase tracking-wide">{step}</p>
                </div>
                {i < fluxoTecnologia.length - 1 && (
                  <span className="text-[#F45504] font-bold text-xl">&rarr;</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {motivosTecnologia.map((item) => (
              <div key={item.nome} className="glass-card p-6">
                <span
                  className="inline-block text-[10px] font-['Inter'] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3"
                  style={
                    item.tag === "Tecnologia proprietária"
                      ? { background: "#F45504", color: "#fff" }
                      : item.tag === "Metodologia exclusiva"
                      ? { background: "#7F31B8", color: "#fff" }
                      : { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }
                  }
                >
                  {item.tag}
                </span>
                <h3 className="font-['Inter'] font-bold text-white text-lg mb-4">{item.nome}</h3>
                <p className="text-white/60 text-sm mb-3"><strong className="text-white/80">Problema:</strong> {item.problema}</p>
                <p className="text-white/80 text-sm leading-relaxed"><strong className="text-[#F45504]">Solução:</strong> {item.solucao}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#agendar"
              onClick={() => track("technology_click", { placement: "inline_cta" })}
              className="text-white font-['Inter'] font-bold text-base hover:text-[#F45504] transition-colors"
            >
              Quero entender como isso funciona no meu caso &rarr;
            </a>
          </div>
        </div>
      </motion.section>

      {/* ===== 5. SOLUÇÕES ===== */}
      <section id="solucoes" className="section-light relative py-20 overflow-hidden scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="pill-label mb-4 inline-block animate-on-scroll">Soluções</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 animate-on-scroll text-balance">
              Nossas soluções.
            </h2>
            <p className="text-white/80 text-lg animate-on-scroll">Sem fragmentação e sem intermediário a mais entre a sua verba e o inventário.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {solucoes.map((s) => (
              <div key={s.id} className="relative lg:h-[210px] animate-on-scroll">
                <Link
                  href={`/solucoes#${s.id}`}
                  onClick={() => track("solution_click", { solucao: s.id })}
                  className="group block glass-card p-5 flex flex-col items-center text-center gap-2 lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:origin-top transition-transform duration-300 ease-out lg:hover:z-30 lg:hover:scale-110 lg:hover:shadow-2xl lg:hover:shadow-black/50"
                >
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shrink-0 group-hover:bg-[#7F31B8] transition-colors">
                    {s.icon}
                  </div>
                  <p className="font-['Inter'] font-bold text-white text-sm">{s.label}</p>
                  <div className="lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100 lg:group-hover:mt-1 overflow-hidden transition-all duration-300">
                    <p className="text-white/70 text-xs leading-relaxed mb-2">{s.resumo}</p>
                    <span className="text-[#F45504] font-['Inter'] font-semibold text-xs">Ver detalhes &rarr;</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. NETFLIX ===== */}
      <section className="section-dark py-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="pill-label mb-4 inline-block">Netflix Ads</span>
              <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 text-balance">
                Netflix sem mínimo de investimento.
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-4">
                Operamos anúncios diretamente com a Netflix desde 2022, quando a plataforma lançou o
                modelo com anúncios no mundo. Não é inventário novo para nós: é o mesmo que negociamos
                há mais de três anos, com acesso direto e sem intermediário a mais entre a sua verba e
                a tela.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-2">
                No Brasil, o plano com anúncios já alcança mais de 35 milhões de pessoas ativas
                mensais — cerca de 20% a mais que no ano anterior — dentro de uma base global de 250
                milhões. Inventário premium, alta atenção, Complete View, e curadoria mais verificação
                do nosso Double Check antes de qualquer real ir ao ar.
              </p>
              <p className="text-white/40 text-xs mb-6">Fonte: Netflix, Upfront 2026.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={WA_NETFLIX}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("netflix_click", { placement: "section_cta" })}
                  className="btn-cta"
                >
                  Quero conhecer a oportunidade
                </a>
                <Link href="/blog/netflix-sem-minimo-investimento-ctv" className="btn-outline">
                  Entender a mudança
                </Link>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="glass-card p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-[#7F31B8] flex items-center justify-center mx-auto mb-6">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>
                </div>
                <span className="font-['Inter'] font-bold text-3xl text-white block mb-1">+20%</span>
                <p className="text-white/70 text-sm mb-6">crescimento da audiência do plano com anúncios no Brasil em um ano</p>
                <div className="h-px bg-[#141414] mb-6" />
                <span className="font-['Inter'] font-bold text-3xl text-white block mb-1">+35 milhões</span>
                <p className="text-white/70 text-sm mb-2">espectadores mensais no Brasil, no plano com anúncios</p>
                <p className="text-white/40 text-xs">Fonte: Netflix, Upfront 2026.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. CASES ===== */}
      <section id="resultados" className="section-light py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="pill-label mb-4 inline-block animate-on-scroll">Resultados reais</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 animate-on-scroll text-balance">
              Não é promessa. É resultado.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {cases.map((c) => (
              <Link
                key={c.id}
                href="/resultados"
                onClick={() => track("case_click", { case: c.id })}
                className="block overflow-hidden rounded-xl animate-on-scroll hover:-translate-y-1 transition-transform bg-[#141414] border border-[#2A2A2A]"
              >
                <div className="bg-[#7F31B8] p-6 text-center">
                  <span className="font-['Inter'] font-bold text-white text-5xl">{c.metric}</span>
                  <p className="text-white/80 text-sm">{c.label}</p>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-['Inter'] font-bold text-white">{c.company}</h3>
                  <p className="text-white/60 text-xs"><strong className="text-white/80">Desafio:</strong> {c.desafio}</p>
                  <p className="text-white/60 text-xs"><strong className="text-white/80">Estratégia:</strong> {c.estrategia}</p>
                  <p className="text-white/60 text-xs"><strong className="text-white/80">Resultado:</strong> {c.resultado}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center animate-on-scroll">
            <Link href="/resultados" className="text-white font-['Inter'] font-bold text-lg hover:text-[#F45504] transition-colors">
              Ver todos os cases &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 7.5 EBOOK ===== */}
      <section className="section-dark py-20">
        <div className="container relative z-10 max-w-5xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2 md:items-center rounded-xl border border-[#2A2A2A] bg-[#141414] p-6 md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F45504]">Ebook gratuito</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-['Inter'] font-bold leading-tight text-white">
                O Futuro da Inteligência de Mídia
              </h2>
              <p className="mt-4 text-[#BDBDBD] leading-relaxed">
                Reúne, em 4 capítulos curtos, os dados que explicam para onde a atenção está indo e como orquestrar a mídia em um ecossistema fragmentado.
              </p>
              <p className="mt-4 text-sm text-[#BDBDBD]">
                <b className="text-white">4</b> capítulos · <b className="text-white">15</b> páginas · cada número com fonte
              </p>
              <Link
                href="/ebook"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F45504] px-6 py-3 font-['Inter'] font-bold text-black transition-opacity hover:opacity-90"
              >
                Baixar o ebook grátis <span aria-hidden="true">→</span>
              </Link>
            </div>
            <Link href="/ebook" aria-label="Ver o ebook O Futuro da Inteligência de Mídia" className="block">
              <div
                className="relative overflow-hidden rounded-[10px] border border-[#2A2A2A] bg-black text-white"
                style={{ aspectRatio: "16 / 9", containerType: "inline-size" }}
              >
                <img
                  src="/images/brand/southmedia-logo-horizontal-branco.png"
                  alt=""
                  width={949}
                  height={200}
                  loading="lazy"
                  style={{ position: "absolute", left: "6.6cqw", top: "5.6cqw", height: "5.4cqw", width: "auto" }}
                />
                <span style={{ position: "absolute", borderRadius: "50%", width: "12.5cqw", height: "12.5cqw", background: "#7F31B8", right: "15cqw", top: "6.6cqw" }} />
                <span style={{ position: "absolute", borderRadius: "50%", width: "12.5cqw", height: "12.5cqw", background: "#F45504", right: "6.6cqw", top: "10.8cqw" }} />
                <span style={{ position: "absolute", left: "6.6cqw", top: "17.8cqw", fontSize: "1.2cqw", fontWeight: 700, letterSpacing: ".14em", color: "#F45504" }}>EBOOK · 2026</span>
                <span style={{ position: "absolute", left: "6.6cqw", top: "21cqw", fontSize: "5.8cqw", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-.025em" }}>
                  O Futuro da<br />Inteligência de Mídia
                </span>
                <span style={{ position: "absolute", left: "6.6cqw", top: "35.6cqw", fontSize: "1.55cqw", color: "#BDBDBD" }}>
                  Dados, atenção e resultado real na nova era da mídia.
                </span>
                <span style={{ position: "absolute", left: "6.6cqw", bottom: "6.4cqw", fontSize: "1.2cqw", color: "#BDBDBD" }}>
                  AdTech brasileira e independente · southmedia.com.br
                </span>
                <span style={{ position: "absolute", right: "4cqw", bottom: "4cqw", background: "#F45504", color: "#000", fontSize: "2cqw", fontWeight: 800, padding: ".8cqw 1.8cqw", borderRadius: 99 }}>
                  GRÁTIS
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 8. COMO TRABALHAMOS ===== */}
      <section className="section-light py-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="pill-label mb-4 inline-block animate-on-scroll">Como trabalhamos</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl animate-on-scroll text-balance">
              A campanha não termina quando o anúncio vai ao ar.
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-start gap-x-2 gap-y-10">
            {comoTrabalhamos.map((step, i) => (
              <div key={step.n} className="flex items-center">
                <div className="glass-card flex flex-col items-center text-center w-[168px] p-5 animate-on-scroll">
                  <div className="w-16 h-16 rounded-full bg-[#7F31B8] flex items-center justify-center mb-4 shadow-lg shadow-black/30">
                    <span className="font-['Inter'] font-bold text-white text-xl">{step.n}</span>
                  </div>
                  <h3 className="font-['Inter'] font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-white/80 text-xs leading-relaxed">{step.desc}</p>
                </div>
                {i < comoTrabalhamos.length - 1 && (
                  <span className="text-[#F45504] font-bold text-2xl hidden md:block px-3">&rarr;</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. POR QUE SOUTH MEDIA ===== */}
      <section className="section-dark py-20">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="pill-label mb-4 inline-block animate-on-scroll">Diferenciais</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl animate-on-scroll text-balance">
              Por que escolher a South Media?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {porQueSouthMedia.map((item) => (
              <div key={item.title} className="glass-card p-6 animate-on-scroll">
                <h3 className="font-['Inter'] font-bold text-[#F45504] text-base mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. CONTEÚDO / AUTORIDADE ===== */}
      <section className="section-light py-20">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="text-[#F45504] text-xs font-bold uppercase tracking-widest mb-4 inline-block animate-on-scroll">Blog</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 animate-on-scroll text-balance">
              Últimos conteúdos do blog
            </h2>
            <p className="text-white/80 text-base max-w-2xl mx-auto animate-on-scroll">
              Nosso blog é o local ideal para adquirir conhecimento sobre o mercado de mídia e
              marketing — análises, tecnologia e o que muda na prática para quem planeja e compra
              mídia digital no Brasil.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card overflow-hidden animate-on-scroll group cursor-pointer block">
                <div className="relative h-40 overflow-hidden">
                  <img src={post.cover} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-['Inter'] font-bold text-white text-sm mb-2 group-hover:text-[#7F31B8] transition-colors line-clamp-2">{post.title}</h3>
                  <span className="text-[#F45504] font-['Inter'] font-semibold text-xs">Ler mais &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center animate-on-scroll">
            <Link href="/blog" className="text-white font-['Inter'] font-bold text-lg hover:text-[#F45504] transition-colors">
              Explorar insights &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 11. FAQ ===== */}
      <section className="section-dark py-20">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="pill-label mb-4 inline-block animate-on-scroll">Perguntas frequentes</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl animate-on-scroll text-balance">
              Suas dúvidas antes de conversar com a gente.
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ===== 12. CTA FINAL / AGENDAMENTO ===== */}
      <motion.section
        id="agendar"
        className="section-orange relative py-24 overflow-hidden scroll-mt-[104px]"
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <span className="pill-label mb-4 inline-block">Diagnóstico gratuito</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-5xl mb-4 text-balance">
              Vamos encontrar onde sua próxima campanha pode gerar mais resultado?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Conte-nos o que você precisa alcançar. Nossa equipe avalia o cenário e indica uma estratégia de mídia adequada ao seu objetivo.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <h3 className="font-['Inter'] font-bold text-white text-xl mb-5">O que acontece na reunião:</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Você conta o objetivo e o cenário de mídia atual.",
                  "A gente aponta onde há desperdício e qual combinação de canais faz sentido.",
                  "Você recebe uma estimativa de entrega baseada no CPM praticado para o seu caso.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#F45504] font-bold text-lg leading-tight shrink-0">✓</span>
                    <span className="text-white/80 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white font-['Inter'] font-bold text-base mb-8">
                Se não fizer sentido para você, a gente diz. É mais barato para os dois.
              </p>
              <a
                href={WA_CONTATO}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { placement: "cta_final" })}
                className="btn-outline inline-flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Falar pelo WhatsApp
              </a>
            </div>
            <div className="on-light p-6 md:p-8">
              <ScheduleForm />
            </div>
          </div>
        </div>
      </motion.section>
      </main>

      <StickyCta />
      <EbookModal open={ebookModalOpen} onOpenChange={setEbookModalOpen} />

      <Footer />
    </div>
  );
}
